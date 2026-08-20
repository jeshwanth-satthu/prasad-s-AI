from fastapi import APIRouter
from app.models.idea import IdeaRequest
from app.services import idea_service

router = APIRouter(prefix="/ideas", tags=["ideas"])


@router.post("")
async def create_ideas(req: IdeaRequest):
    ideas, is_demo = await idea_service.generate_ideas(req)
    return {"data": [i.model_dump() for i in ideas], "demo_mode": is_demo}
