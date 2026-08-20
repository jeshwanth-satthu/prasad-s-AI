from fastapi import APIRouter
from app.models.research import ResearchRequest
from app.services import research_service

router = APIRouter(prefix="/research", tags=["research"])


@router.post("")
async def create_research(req: ResearchRequest):
    brief, is_demo = await research_service.generate_research(req)
    return {"data": brief.model_dump(), "demo_mode": is_demo}
