import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { LoadingState, ErrorState, PrimaryButton, ResultActions, EmptyState } from "../components/Common";
import { runShorts } from "../lib/api";
import { useToast } from "../components/Toast";
import type { ShortIdea } from "../types";

export function Shorts() {
  const location = useLocation() as { state?: { source?: string } };
  const [source, setSource] = useState(location.state?.source || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shorts, setShorts] = useState<ShortIdea[]>([]);
  const { push } = useToast();

  useEffect(() => {
    if (location.state?.source) push("info", "Loaded script from Script Studio.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generate = async () => {
    if (!source.trim()) { push("error", "Paste a script or transcript first."); return; }
    setLoading(true);
    setError(null);
    try {
      const { result, demo } = await runShorts(source);
      setShorts(result);
      push("success", demo ? "5 Shorts generated (Demo Mode sample data)." : "5 Shorts generated.");
    } catch {
      setError("Something went wrong generating Shorts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Shorts Lab" title="Shorts Lab" subtitle="Turn a long-form script or transcript into 5 short-form video ideas." />

      <GlassCard className="p-6 mb-8">
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Paste your long-form script or transcript here..."
          rows={6}
          className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm font-telugu focus:outline-none focus:border-[var(--color-border-strong)] resize-y mb-4"
        />
        <PrimaryButton onClick={generate} loading={loading}>Generate 5 Shorts</PrimaryButton>
      </GlassCard>

      {loading && <LoadingState message="Finding the best short-form moments..." />}
      {error && <ErrorState message={error} onRetry={generate} />}

      {!loading && shorts.length === 0 && !error && (
        <EmptyState icon={Clapperboard} title="No Shorts yet" subtitle="Paste a script or transcript above, or arrive here from Script Studio, to generate 5 short-form ideas." />
      )}

      {!loading && shorts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shorts.map((s) => (
            <GlassCard key={s.id} hover className="p-6 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: "rgba(124,108,240,0.12)", color: "var(--color-violet)" }}>
                  Short #{s.index}
                </span>
                <ResultActions
                  onCopy={() => { navigator.clipboard.writeText(`${s.title}\n\n${s.hook}\n\n${s.script}\n\nCaption: ${s.caption}\n${s.hashtags.join(" ")}`); push("success", "Copied."); }}
                  onRegenerate={generate}
                  onSave={() => push("success", "Saved to history.")}
                />
              </div>
              <h3 className="font-display font-medium mb-2">{s.title}</h3>
              <p className="text-sm font-telugu text-[var(--color-gold)] mb-3 leading-relaxed">{s.hook}</p>
              <p className="text-sm text-[var(--color-text-dim)] font-telugu leading-relaxed mb-3">{s.script}</p>
              <div className="mb-3 rounded-lg border border-dashed border-[var(--color-border)] p-2.5">
                <p className="text-[10px] font-mono uppercase text-[var(--color-teal)] mb-1">Thumbnail Text</p>
                <p className="text-sm font-telugu">{s.thumbnailText}</p>
              </div>
              <p className="text-xs text-[var(--color-text-faint)] mb-2 font-telugu">{s.caption}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.hashtags.map((h) => (
                  <span key={h} className="text-[11px] font-mono text-[var(--color-text-dim)]">{h}</span>
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-dim)] mt-auto pt-2 border-t border-[var(--color-border)] leading-relaxed">
                <span className="text-[var(--color-violet)] font-medium">Why this works: </span>{s.whyItWorks}
              </p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
