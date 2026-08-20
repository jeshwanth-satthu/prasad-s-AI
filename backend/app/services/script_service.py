import logging
from pydantic import ValidationError

from app.models.script import Script, ScriptRequest
from app.services import gemini_service, demo_data
from app.prompts import script_prompts

logger = logging.getLogger("prasad-ai.script")


async def generate_script(req: ScriptRequest) -> tuple[Script, bool]:
    if gemini_service.is_available():
        try:
            raw = await gemini_service.call_json(
                script_prompts.SYSTEM_PROMPT,
                script_prompts.build_user_prompt(req.topic, req.videoType, req.duration, req.language, req.tone),
            )
            raw.update({"topic": req.topic, "videoType": req.videoType, "duration": req.duration, "language": req.language, "tone": req.tone})
            return Script(**raw), False
        except (gemini_service.GeminiOutputError, ValidationError) as exc:
            logger.warning("Falling back to demo script data: %s", exc)

    demo = demo_data.generate_script(req.topic, req.videoType, req.language)
    demo.update({"topic": req.topic, "videoType": req.videoType, "duration": req.duration, "language": req.language, "tone": req.tone})
    return Script(**demo), True
