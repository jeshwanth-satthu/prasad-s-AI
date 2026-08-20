import type {
  ResearchBrief, Script, VideoIdea, CommentAnalysis, ShortIdea, ApiStatus,
  VideoType, Duration, ScriptLanguage, Tone,
} from "../types";
import { generateResearch, generateScript, generateIdeas, analyzeComments, generateShorts } from "./demoData";
import { addHistory } from "./history";

const BASE = import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE.replace(/\/$/, "")
  : "/api";
let backendChecked = false;
let backendAvailable = false;

async function checkBackend(): Promise<boolean> {
  if (backendChecked) return backendAvailable;
  try {
    const res = await fetch(`${BASE}/status`, { signal: AbortSignal.timeout(1500) });
    backendAvailable = res.ok;
  } catch {
    backendAvailable = false;
  }
  backendChecked = true;
  return backendAvailable;
}

async function tryBackend<T>(path: string, body: unknown): Promise<{ data: T; demo: boolean } | null> {
  const ok = await checkBackend();
  if (!ok) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return { data: json.data as T, demo: !!json.demo_mode };
  } catch {
    return null;
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getApiStatus(): Promise<ApiStatus> {
  const ok = await checkBackend();
  if (!ok) return { gemini: "demo", mongodb: "demo", youtube: "demo" };
  try {
    const res = await fetch(`${BASE}/status`);
    const json = await res.json();
    return json as ApiStatus;
  } catch {
    return { gemini: "demo", mongodb: "demo", youtube: "demo" };
  }
}

export async function runResearch(topic: string, opts?: { competitor?: string; audience?: string; priceRange?: string; depth?: string }): Promise<{ result: ResearchBrief; demo: boolean }> {
  const backend = await tryBackend<ResearchBrief>("/research", { topic, ...opts });
  if (backend) {
    addHistory({ kind: "research", title: topic, refId: backend.data.id });
    return { result: backend.data, demo: backend.demo };
  }
  await delay(900);
  const result = generateResearch(topic);
  addHistory({ kind: "research", title: topic, refId: result.id });
  return { result, demo: true };
}

export async function runScript(params: { topic: string; videoType: VideoType; duration: Duration; language: ScriptLanguage; tone: Tone }): Promise<{ result: Script; demo: boolean }> {
  const backend = await tryBackend<Script>("/scripts", params);
  if (backend) {
    addHistory({ kind: "script", title: params.topic, refId: backend.data.id });
    return { result: backend.data, demo: backend.demo };
  }
  await delay(1100);
  const result = generateScript(params);
  addHistory({ kind: "script", title: params.topic, refId: result.id });
  return { result, demo: true };
}

export async function runIdeas(topic: string): Promise<{ result: VideoIdea[]; demo: boolean }> {
  const backend = await tryBackend<VideoIdea[]>("/ideas", { topic });
  if (backend) {
    addHistory({ kind: "idea", title: topic, refId: backend.data[0]?.id ?? topic });
    return { result: backend.data, demo: backend.demo };
  }
  await delay(1000);
  const result = generateIdeas(topic);
  addHistory({ kind: "idea", title: topic, refId: result[0].id });
  return { result, demo: true };
}

export async function runCommentAnalysis(rawText: string): Promise<{ result: CommentAnalysis; demo: boolean }> {
  const backend = await tryBackend<CommentAnalysis>("/comments", { text: rawText });
  if (backend) {
    addHistory({ kind: "comments", title: `Comment analysis (${backend.data.totalComments})`, refId: backend.data.id });
    return { result: backend.data, demo: backend.demo };
  }
  await delay(1000);
  const result = analyzeComments(rawText);
  addHistory({ kind: "comments", title: `Comment analysis (${result.totalComments})`, refId: result.id });
  return { result, demo: true };
}

export async function runShorts(sourceText: string): Promise<{ result: ShortIdea[]; demo: boolean }> {
  const backend = await tryBackend<ShortIdea[]>("/shorts", { source: sourceText });
  if (backend) {
    addHistory({ kind: "shorts", title: `${backend.data.length} shorts generated`, refId: backend.data[0]?.id ?? "shorts" });
    return { result: backend.data, demo: backend.demo };
  }
  await delay(1000);
  const result = generateShorts(sourceText);
  addHistory({ kind: "shorts", title: `${result.length} shorts generated`, refId: result[0].id });
  return { result, demo: true };
}
