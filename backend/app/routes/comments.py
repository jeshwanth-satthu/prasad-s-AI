from fastapi import APIRouter
from app.models.idea import CommentRequest
from app.services import comment_service

router = APIRouter(prefix="/comments", tags=["comments"])


@router.post("")
async def analyze(req: CommentRequest):
    analysis, is_demo = await comment_service.analyze_comments(req)
    return {"data": analysis.model_dump(), "demo_mode": is_demo}
