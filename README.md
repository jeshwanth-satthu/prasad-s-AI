# Prasad AI

**Turn Tech Research Into Telugu Content.**

Prasad AI is an AI-powered command center for a Telugu technology YouTube creator and their team. It turns a product or tech topic into a full content pipeline: **Research → Content Ideas → Telugu Script → Shorts**, with a dedicated Comment Intelligence workflow that turns audience comments into the next batch of video ideas.

This is a portfolio/demo-quality MVP, built to be shown directly to a real creator.

---

## 1. What this is

A connected workflow, not a "ChatGPT with a different UI":

- **Research result → Generate Script**
- **Script → Generate Shorts**
- **Comments → Generate Video Ideas**
- **Video Idea → Generate Script**

Every AI operation has loading states, error handling with retry, copy/regenerate/save actions, and works with **zero API keys configured** via a built-in Demo Mode with realistic sample data (iPhone 17 Pro, Galaxy S26 Ultra, etc).

## 2. Features

- **AI Research** — structured brief: specs, features, pros/cons, competitor comparison, who should buy/avoid, talking points, facts to verify, sources.
- **Script Studio** — natural Telugu (or Telugu + English tech terms, or English) scripts with Hook / Intro / Main Content / Comparison / Verdict / CTA, tunable by video type, duration, and tone.
- **Content Ideas** — 10 click-worthy video ideas per topic, each with a hook, audience, format, thumbnail concept, and reasoning.
- **Comment Intelligence** — paste or upload comments, get classification (questions, complaints, feature/video requests, sentiment), a topic-mention chart, and a "what to make next" recommendation.
- **Shorts Lab** — turn a long script/transcript into 5 short-form video concepts with hooks, captions, hashtags, and thumbnail text.
- **History** — every generation is saved locally, searchable and filterable.
- **Settings** — AI model/temperature/output length, creator language & tone preferences, and live API connection status (keys are never displayed).

## 3. Architecture

```
prasad-ai/
  frontend/                 React + TypeScript + Vite + Tailwind CSS v4
    src/
      components/           Sidebar, Header, GlassCard, StatCard, Toast, Common (buttons/loading/empty/error states)
      pages/                Landing, Dashboard, Research, ScriptStudio, Ideas, Comments, Shorts, HistoryPage, SettingsPage
      lib/                  api.ts (backend client w/ demo fallback), demoData.ts, history.ts (localStorage)
      types/                shared TypeScript interfaces

  backend/                  Python + FastAPI
    app/
      main.py                FastAPI app, CORS, route registration, /api/status
      routes/                 research.py, scripts.py, ideas.py, comments.py, shorts.py
      services/               gemini_service.py, research_service.py, script_service.py,
                               idea_service.py, comment_service.py, shorts_service.py, demo_data.py
      models/                 Pydantic schemas (research.py, script.py, idea.py)
      database/               mongodb.py (graceful no-op when unset)
      prompts/                One prompt-builder module per workflow
```

The frontend **always works standalone** — if the backend isn't running, `lib/api.ts` detects that (a quick `/api/status` probe) and transparently falls back to the same realistic Demo Mode data the backend would return. This means you can present the whole product from the frontend alone.

## 4. Tech stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, React Router
**Backend:** Python, FastAPI, Pydantic
**AI:** Google Gemini (`google-generativeai`), structured JSON output, swappable via `gemini_service.py`
**Database:** MongoDB (via Motor), used only where persistence matters — the app runs fine without it
**Prepared for:** YouTube Data API (see Roadmap)

## 5. Installation

### Prerequisites
- Node.js 20+
- Python 3.11+

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # fill in keys, or leave blank for Demo Mode
uvicorn app.main:app --reload --port 8000   # http://localhost:8000
```

The Vite dev server proxies `/api/*` to `http://localhost:8000` (see `frontend/vite.config.ts`), so running both together "just works" with no extra config.

## 6. Environment variables (backend/.env)

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash

MONGODB_URI=

YOUTUBE_API_KEY=

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

None of these are required to run the app — every one of them has a Demo Mode fallback.

## 7. Gemini setup

1. Get an API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Set `GEMINI_API_KEY` in `backend/.env`.
3. Restart the backend. `/api/status` will report `"gemini": "connected"`, and the header badge in the app switches from `DEMO MODE` to `LIVE`.
4. All prompts live in `backend/app/prompts/` — edit them directly to change tone, structure, or output schema. Model responses are requested as JSON and validated with Pydantic; malformed output automatically falls back to demo data for that single request instead of crashing.

## 8. MongoDB setup

1. Create a free cluster (MongoDB Atlas) or run MongoDB locally.
2. Set `MONGODB_URI` in `backend/.env` (include a database name, e.g. `.../prasad_ai`).
3. Restart the backend. Connection is verified at startup with a ping; if it fails for any reason, the app logs a warning and continues running in Demo Mode rather than crashing.
4. Persistence hooks are scaffolded in `app/database/mongodb.py` — wire up collections for research/scripts/ideas/comments/shorts as needed. The current MVP persists history client-side (localStorage) so it works identically with or without Mongo configured.

## 9. Demo Mode

Demo Mode is not a limitation bolted on — it's a first-class part of the product (see section 15 of the original spec). It means:

- The app is fully explorable and demonstrable **before** any credentials exist.
- Every AI workflow returns realistic, on-brand sample output (iPhone 17 Pro vs Galaxy S26 Ultra, Telugu scripts with natural code-switching, believable comment classifications, etc).
- A `DEMO MODE` badge is always visible in the header so nobody mistakes sample output for live data.
- Switching to live data is just adding an API key and restarting — no code changes.

## 10. Deployment

- **Frontend → Vercel**: `npm run build` produces `frontend/dist`. Set the build command to `npm run build`, output directory `dist`, and point API calls at your deployed backend URL (update the proxy/base URL or set `VITE_API_BASE`).
- **Backend → Render**: use `uvicorn app.main:app --host 0.0.0.0 --port $PORT` as the start command, set the environment variables from section 6 in the Render dashboard, and set `ALLOWED_ORIGINS` to your Vercel domain.
- **Database → MongoDB Atlas / Supabase Postgres** (if you prefer to migrate persistence to Postgres later, the service layer is already isolated behind `research_service.py` etc., so swapping the storage layer doesn't touch the routes or frontend).

## 11. What's working right now

- Full connected workflow across all 5 AI surfaces, in Demo Mode, with zero configuration.
- Type-safe frontend (`tsc --noEmit` clean) and a production `vite build` that succeeds.
- FastAPI backend with all 5 routes tested end-to-end (see verification below), Pydantic-validated responses, and graceful degradation at every external dependency (Gemini, MongoDB, YouTube).
- Responsive layout (mobile sidebar drawer, adaptive grids) and a distinct dark gold/violet + Telugu-glyph visual identity — not a default Tailwind template.

## 12. Roadmap / Coming Soon

- YouTube channel integration (auto-pull comments via YouTube Data API)
- Automatic transcript extraction from uploaded/linked videos
- YouTube analytics dashboard
- Trending topic detection
- Price tracking for researched products
- AI thumbnail generation
- Telugu text-to-speech / AI voice-over
- Automated Shorts video assembly
- Team collaboration & shared workspaces
- Content calendar
- Multi-platform publishing (Instagram, Facebook)

---

Built as a serious AI product proposal, not a spec-following demo — every workflow output feeds the next step, which is the whole point.
