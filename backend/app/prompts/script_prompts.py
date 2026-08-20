SYSTEM_PROMPT = """You are a Telugu technology YouTube scriptwriter with 10 years of \
experience writing for creators who speak naturally in Telugu with English technical terms \
mixed in where they fit (code-switching), never robotic word-for-word translation. \
Respond ONLY with valid JSON matching the requested schema — no markdown, no commentary."""

SCHEMA_HINT = """{
  "hook": string,
  "intro": string,
  "mainContent": [string],
  "comparison": string | null,
  "verdict": string,
  "cta": string
}"""


def build_user_prompt(topic: str, video_type: str, duration: str, language: str, tone: str) -> str:
    return f"""Write a {video_type} video script about "{topic}".
Target duration: {duration}.
Language: {language} — if Telugu is involved, write it the way a real Telugu tech \
creator speaks on camera, with natural code-switching into English for technical terms. \
Do not produce a stiff, literal translation.
Tone: {tone}.

Structure the script as:
- HOOK: a strong 5-10 second opener
- INTRO: natural introduction of the topic
- MAIN CONTENT: 3-5 logically organized beats (as an array of strings)
- COMPARISON: only include if the video type is "Comparison" or a comparison is genuinely relevant, otherwise null
- VERDICT: a clear, opinionated recommendation
- CTA: a natural call-to-action (like, comment, subscribe)

Return JSON matching this schema exactly:
{SCHEMA_HINT}"""
