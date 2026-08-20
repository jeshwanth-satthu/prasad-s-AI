import type { HistoryItem, HistoryKind } from "../types";

const KEY = "prasad-ai-history";
const STORE_PREFIX = "prasad-ai-store-";

export function addHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  const items = getHistory();
  const entry: HistoryItem = {
    ...item,
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
  };
  items.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200)));
  return entry;
}

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function deleteHistory(id: string) {
  const items = getHistory().filter((i) => i.id !== id);
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function storeItem<T>(kind: HistoryKind, refId: string, data: T) {
  try {
    localStorage.setItem(`${STORE_PREFIX}${kind}-${refId}`, JSON.stringify(data));
  } catch {
    /* storage full or unavailable — non-fatal */
  }
}

export function getStoredItem<T>(kind: HistoryKind, refId: string): T | null {
  try {
    const raw = localStorage.getItem(`${STORE_PREFIX}${kind}-${refId}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function getSavedIdeas<T>(): T[] {
  try {
    const raw = localStorage.getItem("prasad-ai-saved-ideas");
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveIdea<T extends { id: string }>(idea: T) {
  const items = getSavedIdeas<T>();
  if (items.find((i) => i.id === idea.id)) return;
  items.unshift(idea);
  localStorage.setItem("prasad-ai-saved-ideas", JSON.stringify(items));
}
