from fastapi import APIRouter
from app.models.idea import ShortsRequest
from app.services import shorts_service

router = APIRouter(prefix="/shorts", tags=["shorts"])


@router.post("")
async def create_shorts(req: ShortsRequest):
    shorts, is_demo = await shorts_service.generate_shorts(req)
    return {"data": [s.model_dump() for s in shorts], "demo_mode": is_demo}
