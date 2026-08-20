import { useMemo, useState } from "react";
import { Search, Trash2, FolderOpenDot } from "lucide-react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { EmptyState } from "../components/Common";
import { getHistory, deleteHistory } from "../lib/history";
import { useToast } from "../components/Toast";
import type { HistoryItem, HistoryKind } from "../types";

const kindLabel: Record<HistoryKind, string> = {
  research: "Research", script: "Script", idea: "Ideas", comments: "Comments", shorts: "Shorts",
};
const kindColor: Record<HistoryKind, string> = {
  research: "var(--color-gold)", script: "var(--color-violet)", idea: "var(--color-teal)",
  comments: "var(--color-gold)", shorts: "var(--color-violet)",
};

export function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>(getHistory());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HistoryKind | "all">("all");
  const { push } = useToast();

  const filtered = useMemo(() => {
    return items
      .filter((i) => (filter === "all" ? true : i.kind === filter))
      .filter((i) => i.title.toLowerCase().includes(query.toLowerCase()));
  }, [items, filter, query]);

  const remove = (id: string) => {
    deleteHistory(id);
    setItems(getHistory());
    push("info", "Removed from history.");
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <SectionHeading eyebrow="History" title="History" subtitle="Everything you've generated, searchable and filterable." />

      <GlassCard className="p-2 mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search history..." className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm focus:outline-none" />
          </div>
          <div className="flex gap-1 p-1 flex-wrap">
            {(["all", "research", "script", "idea", "comments", "shorts"] as const).map((k) => (
              <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === k ? "bg-[var(--color-surface-2)] text-[var(--color-text)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {filtered.length === 0 ? (
        <EmptyState icon={FolderOpenDot} title="Nothing here yet" subtitle="Generate research, scripts, ideas, comment analyses, or Shorts and they'll show up here automatically." />
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <GlassCard key={item.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono px-2 py-1 rounded-md shrink-0" style={{ background: `${kindColor[item.kind]}1A`, color: kindColor[item.kind] }}>
                  {kindLabel[item.kind]}
                </span>
                <div className="min-w-0">
                  <p className="text-sm truncate">{item.title}</p>
                  <p className="text-[11px] text-[var(--color-text-faint)] font-mono">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => remove(item.id)} className="text-[var(--color-text-faint)] hover:text-[var(--color-danger)] focus-ring rounded p-1.5">
                <Trash2 size={15} />
              </button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
