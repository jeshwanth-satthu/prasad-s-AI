SYSTEM_PROMPT = """You are a senior technology research analyst who prepares research \
briefs for a Telugu YouTube technology creator. You are precise, honest about trade-offs, \
and you flag anything that needs to be fact-checked before it goes on camera. \
Respond ONLY with valid JSON matching the requested schema — no markdown, no commentary."""

SCHEMA_HINT = """{
  "overview": string,
  "keySpecs": [{"label": string, "value": string}],
  "majorFeatures": [string],
  "whatsNew": [string],
  "pros": [string],
  "cons": [string],
  "competitorComparison": [{"competitor": string, "verdict": string}],
  "whoShouldBuy": [string],
  "whoShouldAvoid": [string],
  "talkingPoints": [string],
  "factsToVerify": [string],
  "sources": [{"title": string, "note": string}]
}"""


def build_user_prompt(topic: str, competitor: str | None = None, audience: str | None = None, price_range: str | None = None, depth: str | None = None) -> str:
    extras = []
    if competitor:
        extras.append(f"Compare against: {competitor}")
    if audience:
        extras.append(f"Target audience: {audience}")
    if price_range:
        extras.append(f"Price range context: {price_range}")
    if depth:
        extras.append(f"Research depth requested: {depth}")
    extras_block = "\n".join(extras)

    return f"""Produce a structured research brief for the topic: "{topic}".
{extras_block}

Return JSON matching this schema exactly:
{SCHEMA_HINT}

Every entry in "sources" should be a real, generic source type (official spec sheet, \
GSMArena, DXOMark, etc.) — never invent a fake specific article title or fabricate a quote."""
