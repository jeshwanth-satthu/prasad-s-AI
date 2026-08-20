"""
Thin wrapper around the Google Gemini API.

Design goals:
  - Every route can be swapped to a different model/provider by editing
    only this file (call_json / call_text) — nothing else in the app
    needs to know which model is behind it.
  - If GEMINI_API_KEY is not set, is_available() is False and callers
    should fall back to their local Demo Mode generator instead of
    calling this service.
  - Malformed / non-JSON model output never crashes a route: call_json
    raises GeminiOutputError, which routes catch and convert into a
    graceful fallback to demo data.
"""
import asyncio
import json
import os
import re
import logging
from typing import Any

logger = logging.getLogger("prasad-ai.gemini")

DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")


class GeminiOutputError(Exception):
    pass


def is_available() -> bool:
    return bool(os.getenv("GEMINI_API_KEY"))


def _extract_json(raw_text: str) -> Any:
    """Gemini sometimes wraps JSON in markdown fences — strip them before parsing."""
    cleaned = raw_text.strip()
    cleaned = re.sub(r"^```(json)?", "", cleaned).strip()
    cleaned = re.sub(r"```$", "", cleaned).strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as exc:
        # Try to salvage the largest {...} or [...] block in the text.
        match = re.search(r"(\{.*\}|\[.*\])", cleaned, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(1))
            except json.JSONDecodeError:
                pass
        raise GeminiOutputError(f"Could not parse JSON from model output: {exc}") from exc


async def call_json(system_prompt: str, user_prompt: str, temperature: float = 0.8) -> Any:
    """
    Calls Gemini and returns parsed JSON. Raises GeminiOutputError on malformed output,
    which the calling route should catch and handle (typically: fall back to demo data).
    """
    if not is_available():
        raise GeminiOutputError("GEMINI_API_KEY not configured.")

    try:
        import google.generativeai as genai
    except ImportError as exc:
        raise GeminiOutputError("google-generativeai package not installed.") from exc

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel(
        DEFAULT_MODEL,
        system_instruction=system_prompt,
        generation_config={"temperature": temperature, "response_mime_type": "application/json"},
    )

    try:
        response = await asyncio.to_thread(model.generate_content, user_prompt)
        return _extract_json(response.text)
    except GeminiOutputError:
        raise
    except Exception as exc:  # noqa: BLE001
        logger.exception("Gemini call failed")
        raise GeminiOutputError(str(exc)) from exc
