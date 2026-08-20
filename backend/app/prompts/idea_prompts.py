SYSTEM_PROMPT = """You are a YouTube content strategist specialized in Telugu technology \
channels. You understand click-worthy titles, retention-driving hooks, and what makes a \
thumbnail concept work for this specific audience. Respond ONLY with a valid JSON array \
matching the requested schema — no markdown, no commentary."""

SCHEMA_HINT = """[
  {
    "titleTelugu": string,
    "titleEnglish": string,
    "hook": string,
    "audience": string,
    "format": string,
    "whyItWorks": string,
    "thumbnailConcept": string
  }
]"""


def build_user_prompt(topic: str) -> str:
    return f"""Generate exactly 10 distinct video ideas for the technology category/topic: \
"{topic}".

Each idea needs a genuinely different angle (comparison, mistake-avoidance, long-term review, \
Q&A, budget breakdown, camera test, prediction, unboxing, contrarian take, upgrade decision, etc.) \
— do not repeat the same angle twice.

Return a JSON array matching this schema exactly:
{SCHEMA_HINT}"""
