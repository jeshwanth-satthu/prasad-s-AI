import logging
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import mongodb
from app.services import gemini_service
from app.routes import research, scripts, ideas, comments, shorts

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("prasad-ai")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await mongodb.connect()
    logger.info("Gemini configured: %s", gemini_service.is_available())
    logger.info("MongoDB configured: %s", mongodb.is_configured())
    yield
    await mongodb.disconnect()


app = FastAPI(
    title="Prasad AI API",
    description="AI-powered Telugu tech content assistant — research, scripts, ideas, comment intelligence, and Shorts.",
    version="1.0.0",
    lifespan=lifespan,
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(research.router, prefix="/api")
app.include_router(scripts.router, prefix="/api")
app.include_router(ideas.router, prefix="/api")
app.include_router(comments.router, prefix="/api")
app.include_router(shorts.router, prefix="/api")


@app.get("/api/status")
async def status():
    return {
        "gemini": "connected" if gemini_service.is_available() else "demo",
        "mongodb": "connected" if mongodb.get_db() is not None else "demo",
        "youtube": "connected" if os.getenv("YOUTUBE_API_KEY") else "demo",
    }


@app.get("/api/health")
async def health():
    return {"status": "ok"}
