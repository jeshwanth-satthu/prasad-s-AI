import logging
from pydantic import ValidationError

from app.models.idea import VideoIdea, IdeaRequest
from app.services import gemini_service, demo_data
from app.prompts import idea_prompts

logger = logging.getLogger("prasad-ai.ideas")


async def generate_ideas(req: IdeaRequest) -> tuple[list[VideoIdea], bool]:
    if gemini_service.is_available():
        try:
            raw = await gemini_service.call_json(
                idea_prompts.SYSTEM_PROMPT,
                idea_prompts.build_user_prompt(req.topic),
            )
            if not isinstance(raw, list) or not raw:
                raise gemini_service.GeminiOutputError("Expected a non-empty JSON array of ideas.")
            return [VideoIdea(**item) for item in raw], False
        except (gemini_service.GeminiOutputError, ValidationError) as exc:
            logger.warning("Falling back to demo idea data: %s", exc)

    demo = demo_data.generate_ideas(req.topic)
    return [VideoIdea(**item) for item in demo], True
