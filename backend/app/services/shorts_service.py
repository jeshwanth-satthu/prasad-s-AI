import logging
from pydantic import ValidationError

from app.models.idea import ShortIdea, ShortsRequest
from app.services import gemini_service, demo_data
from app.prompts import shorts_prompts

logger = logging.getLogger("prasad-ai.shorts")


async def generate_shorts(req: ShortsRequest) -> tuple[list[ShortIdea], bool]:
    if gemini_service.is_available():
        try:
            raw = await gemini_service.call_json(
                shorts_prompts.SYSTEM_PROMPT,
                shorts_prompts.build_user_prompt(req.source),
            )
            if not isinstance(raw, list) or not raw:
                raise gemini_service.GeminiOutputError("Expected a non-empty JSON array of shorts.")
            return [ShortIdea(**item) for item in raw], False
        except (gemini_service.GeminiOutputError, ValidationError) as exc:
            logger.warning("Falling back to demo shorts data: %s", exc)

    demo = demo_data.generate_shorts(req.source)
    return [ShortIdea(**item) for item in demo], True
