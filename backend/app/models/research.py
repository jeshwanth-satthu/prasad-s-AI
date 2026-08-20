from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid


class ResearchRequest(BaseModel):
    topic: str
    competitor: Optional[str] = None
    audience: Optional[str] = None
    priceRange: Optional[str] = None
    depth: Optional[str] = "Standard Brief"


class KeySpec(BaseModel):
    label: str
    value: str


class CompetitorComparison(BaseModel):
    competitor: str
    verdict: str


class Source(BaseModel):
    title: str
    note: str


class ResearchBrief(BaseModel):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex[:8])
    topic: str
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    overview: str
    keySpecs: list[KeySpec]
    majorFeatures: list[str]
    whatsNew: list[str]
    pros: list[str]
    cons: list[str]
    competitorComparison: list[CompetitorComparison]
    whoShouldBuy: list[str]
    whoShouldAvoid: list[str]
    talkingPoints: list[str]
    factsToVerify: list[str]
    sources: list[Source]
