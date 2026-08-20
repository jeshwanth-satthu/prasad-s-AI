from pydantic import BaseModel, Field
import uuid


class IdeaRequest(BaseModel):
    topic: str


class VideoIdea(BaseModel):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex[:8])
    titleTelugu: str
    titleEnglish: str
    hook: str
    audience: str
    format: str
    whyItWorks: str
    thumbnailConcept: str


class CommentRequest(BaseModel):
    text: str


class CommentBucket(BaseModel):
    category: str
    count: int
    examples: list[str]


class TopicMention(BaseModel):
    topic: str
    value: int


class Sentiment(BaseModel):
    positive: int
    neutral: int
    negative: int


class ProductMention(BaseModel):
    name: str
    mentions: int


class CommentAnalysis(BaseModel):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex[:8])
    totalComments: int
    buckets: list[CommentBucket]
    topRequests: list[str]
    mostMentionedProducts: list[ProductMention]
    commonProblems: list[str]
    mostAskedQuestions: list[str]
    sentiment: Sentiment
    topicMentions: list[TopicMention]
    recommendedTopics: list[str]


class ShortsRequest(BaseModel):
    source: str


class ShortIdea(BaseModel):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex[:8])
    index: int
    hook: str
    script: str
    caption: str
    title: str
    hashtags: list[str]
    thumbnailText: str
    whyItWorks: str
