import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lightbulb, Copy, Bookmark, FileText } from "lucide-react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { LoadingState, ErrorState, PrimaryButton, EmptyState } from "../components/Common";
import { runIdeas } from "../lib/api";
import { saveIdea } from "../lib/history";
import { useToast } from "../components/Toast";
import type { VideoIdea } from "../types";

export function Ideas() {
  const [params] = useSearchParams();
  const [topic, setTopic] = useState(params.get("topic") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const navigate = useNavigate();
  const { push } = useToast();

  const generate = async () => {
    if (!topic.trim()) { push("error", "Enter a technology category, product, or topic first."); return; }
    setLoading(true);
    setError(null);
    try {
      const { result, demo } = await runIdeas(topic);
      setIdeas(result);
      push("success", demo ? "10 ideas generated (Demo Mode sample data)." : "10 ideas generated.");
    } catch {
      setError("Something went wrong generating ideas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Idea Generator" title="Content Ideas" subtitle="Generate click-worthy video ideas from a technology category, product, or trend." />

      <GlassCard className="p-2 mb-8">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Smartphones under ₹30,000"
            className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-[var(--color-text-faint)]"
          />
          <div className="p-1">
            <PrimaryButton onClick={generate} loading={loading}>Generate Ideas</PrimaryButton>
          </div>
        </div>
      </GlassCard>

      {loading && <LoadingState message="Brainstorming click-worthy angles..." />}
      {error && <ErrorState message={error} onRetry={generate} />}

      {!loading && ideas.length === 0 && !error && (
        <EmptyState icon={Lightbulb} title="No ideas yet" subtitle="Enter a category, product, or trend above and generate 10 video ideas with hooks and thumbnail concepts." />
      )}

      {!loading && ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ideas.map((idea, i) => (
            <GlassCard key={idea.id} hover delay={i * 0.03} className="p-6 flex flex-col">
              <p className="font-telugu font-medium text-base mb-1 leading-snug">{idea.titleTelugu}</p>
              <p className="text-xs text-[var(--color-text-faint)] mb-3">{idea.titleEnglish}</p>

              <div className="mb-3">
                <p className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-gold)] mb-1">Hook</p>
                <p className="text-sm font-telugu text-[var(--color-text-dim)] leading-relaxed">{idea.hook}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <p className="text-[var(--color-text-faint)] mb-0.5">Audience</p>
                  <p className="text-[var(--color-text-dim)]">{idea.audience}</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-faint)] mb-0.5">Format</p>
                  <p className="text-[var(--color-text-dim)]">{idea.format}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-violet)] mb-1">Why it could work</p>
                <p className="text-xs text-[var(--color-text-dim)] leading-relaxed">{idea.whyItWorks}</p>
              </div>

              <div className="mb-4 rounded-lg border border-dashed border-[var(--color-border)] p-2.5">
                <p className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-teal)] mb-1">Thumbnail concept</p>
                <p className="text-xs text-[var(--color-text-dim)]">{idea.thumbnailConcept}</p>
              </div>

              <div className="mt-auto flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
                <button
                  onClick={() => navigate(`/app/script-studio?topic=${encodeURIComponent(idea.titleEnglish)}`)}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-black font-medium"
                  style={{ background: "var(--color-gold)" }}
                >
                  <FileText size={12} /> Generate Script
                </button>
                <button
                  onClick={() => { saveIdea(idea); push("success", "Idea saved."); }}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                >
                  <Bookmark size={12} /> Save
                </button>
                <button
                  onClick={() => { navigator.clipboard.writeText(`${idea.titleTelugu}\n${idea.hook}`); push("success", "Copied."); }}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
