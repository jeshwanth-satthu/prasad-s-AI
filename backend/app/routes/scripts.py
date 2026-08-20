from fastapi import APIRouter
from app.models.script import ScriptRequest
from app.services import script_service

router = APIRouter(prefix="/scripts", tags=["scripts"])


@router.post("")
async def create_script(req: ScriptRequest):
    script, is_demo = await script_service.generate_script(req)
    return {"data": script.model_dump(), "demo_mode": is_demo}
