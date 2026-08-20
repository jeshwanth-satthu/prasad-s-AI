import logging
from pydantic import ValidationError

from app.models.research import ResearchBrief, ResearchRequest
from app.services import gemini_service, demo_data
from app.prompts import research_prompts

logger = logging.getLogger("prasad-ai.research")


async def generate_research(req: ResearchRequest) -> tuple[ResearchBrief, bool]:
    """Returns (brief, is_demo)."""
    if gemini_service.is_available():
        try:
            raw = await gemini_service.call_json(
                research_prompts.SYSTEM_PROMPT,
                research_prompts.build_user_prompt(req.topic, req.competitor, req.audience, req.priceRange, req.depth),
            )
            raw["topic"] = req.topic
            return ResearchBrief(**raw), False
        except (gemini_service.GeminiOutputError, ValidationError) as exc:
            logger.warning("Falling back to demo research data: %s", exc)

    demo = demo_data.generate_research(req.topic, req.competitor)
    demo["topic"] = req.topic
    return ResearchBrief(**demo), True
