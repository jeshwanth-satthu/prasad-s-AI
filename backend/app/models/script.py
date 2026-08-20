from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid


class ScriptRequest(BaseModel):
    topic: str
    videoType: str = "Review"
    duration: str = "3 minutes"
    language: str = "Telugu + English Tech Terms"
    tone: str = "Energetic"


class Script(BaseModel):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex[:8])
    topic: str
    videoType: str
    duration: str
    language: str
    tone: str
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    hook: str
    intro: str
    mainContent: list[str]
    comparison: Optional[str] = None
    verdict: str
    cta: str
