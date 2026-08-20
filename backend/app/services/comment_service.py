import logging
from pydantic import ValidationError

from app.models.idea import CommentAnalysis, CommentRequest
from app.services import gemini_service, demo_data
from app.prompts import comment_prompts

logger = logging.getLogger("prasad-ai.comments")


async def analyze_comments(req: CommentRequest) -> tuple[CommentAnalysis, bool]:
    if gemini_service.is_available():
        try:
            raw = await gemini_service.call_json(
                comment_prompts.SYSTEM_PROMPT,
                comment_prompts.build_user_prompt(req.text),
            )
            return CommentAnalysis(**raw), False
        except (gemini_service.GeminiOutputError, ValidationError) as exc:
            logger.warning("Falling back to demo comment analysis: %s", exc)

    demo = demo_data.analyze_comments(req.text)
    return CommentAnalysis(**demo), True
