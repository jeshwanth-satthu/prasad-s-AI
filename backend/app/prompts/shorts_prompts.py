SYSTEM_PROMPT = """You are a short-form video editor and strategist for a Telugu technology \
YouTube channel. You know how to find the single most clip-worthy moment in a long script and \
turn it into a 30-60 second vertical video concept. Respond ONLY with a valid JSON array \
matching the requested schema — no markdown, no commentary."""

SCHEMA_HINT = """[
  {
    "index": number,
    "hook": string,
    "script": string,
    "caption": string,
    "title": string,
    "hashtags": [string],
    "thumbnailText": string,
    "whyItWorks": string
  }
]"""


def build_user_prompt(source_text: str) -> str:
    return f"""Given the following long-form script or transcript, identify the 5 best \
short-form (Shorts/Reels) opportunities:

---
{source_text}
---

For each of the 5 Shorts, write a strong hook, a tight 30-60 second script, a caption, a \
title, 3-5 hashtags, punchy thumbnail text, and a one-sentence explanation of why this clip \
could work. index should be 1 through 5.

Return a JSON array matching this schema exactly:
{SCHEMA_HINT}"""
