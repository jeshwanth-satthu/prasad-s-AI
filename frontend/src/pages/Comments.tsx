import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquareText, Upload, ArrowRight } from "lucide-react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { LoadingState, ErrorState, PrimaryButton, GhostButton, EmptyState } from "../components/Common";
import { runCommentAnalysis } from "../lib/api";
import { useToast } from "../components/Toast";
import type { CommentAnalysis } from "../types";

const sample = `Battery ఎన్ని hours వస్తుంది real usage లో?
Chala clear గా explain chesaru bro, best Telugu tech channel
Heating issue వస్తుంది gaming time lo
Ee phone vs OnePlus video cheyandi
Camera app slow గా open avutundi
5G support unda ee phone lo?
Manual camera mode kavali next update lo
Ippudu konte tarvata price తగ్గుతుందా?
1 month review video kavali bro
Which color best అంటారు meeku?`;

export function Comments() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CommentAnalysis | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { push } = useToast();

  const analyze = async (raw?: string) => {
    const content = raw ?? text;
    if (!content.trim()) { push("error", "Paste some comments or upload a file first."); return; }
    setLoading(true);
    setError(null);
    try {
      const { result: r, demo } = await runCommentAnalysis(content);
      setResult(r);
      push("success", demo ? "Comments analyzed (Demo Mode sample data)." : "Comments analyzed.");
    } catch {
      setError("Something went wrong analyzing these comments.");
    } finally {
      setLoading(false);
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const content = await f.text();
    setText(content);
    push("info", `Loaded ${f.name}`);
  };

  const maxMention = result ? Math.max(...result.topicMentions.map((t) => t.value)) : 1;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Comment Intelligence" title="Comment Intelligence" subtitle="Understand what your audience actually wants, straight from the comment section." />

      <GlassCard className="p-6 mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste comments here, one per line..."
          rows={6}
          className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm font-telugu focus:outline-none focus:border-[var(--color-border-strong)] resize-y mb-4"
        />
        <div className="flex items-center gap-3 flex-wrap">
          <PrimaryButton onClick={() => analyze()} loading={loading}>Analyze Comments</PrimaryButton>
          <GhostButton onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> Upload .txt / .csv
          </GhostButton>
          <input ref={fileRef} type="file" accept=".txt,.csv" className="hidden" onChange={onFile} />
          <button onClick={() => { setText(sample); push("info", "Loaded sample comments."); }} className="text-xs text-[var(--color-text-faint)] hover:text-[var(--color-text-dim)] underline decoration-dotted">
            Use sample comments
          </button>
        </div>
      </GlassCard>

      {loading && <LoadingState message="Classifying comments and scoring sentiment..." />}
      {error && <ErrorState message={error} onRetry={() => analyze()} />}

      {!loading && !result && !error && (
        <EmptyState icon={MessageSquareText} title="No analysis yet" subtitle="Paste real comments from your videos, or try the sample set, to see classification, sentiment, and top requests." />
      )}

      {result && !loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SentimentCard label="Positive" value={result.sentiment.positive} color="var(--color-teal)" />
            <SentimentCard label="Neutral" value={result.sentiment.neutral} color="var(--color-text-dim)" />
            <SentimentCard label="Negative" value={result.sentiment.negative} color="var(--color-danger)" />
            <SentimentCard label="Total Analyzed" value={result.totalComments} color="var(--color-gold)" isCount />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard className="p-6">
              <h3 className="font-display font-medium mb-4">Comment Classification</h3>
              <div className="space-y-3">
                {result.buckets.map((b) => (
                  <div key={b.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-dim)]">{b.category}</span>
                      <span className="font-mono text-[var(--color-text-faint)]">{b.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, (b.count / result.totalComments) * 100 * 2)}%`, background: "linear-gradient(90deg, var(--color-gold), var(--color-violet))" }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display font-medium mb-4">Most Mentioned Topics</h3>
              <div className="space-y-3 font-mono text-xs">
                {result.topicMentions.map((t) => (
                  <div key={t.topic} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-[var(--color-text-dim)]">{t.topic}</span>
                    <div className="flex-1 h-4 rounded bg-white/5 overflow-hidden">
                      <div className="h-full rounded" style={{ width: `${(t.value / maxMention) * 100}%`, background: "var(--color-gold)" }} />
                    </div>
                    <span className="w-6 text-right text-[var(--color-text-faint)]">{t.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoBlock title="Top Audience Requests" items={result.topRequests} />
            <InfoBlock title="Common Problems" items={result.commonProblems} accent="danger" />
            <InfoBlock title="Most Asked Questions" items={result.mostAskedQuestions} accent="violet" />
          </div>

          <GlassCard className="p-6">
            <h3 className="font-display font-medium mb-3">Most Mentioned Products</h3>
            <div className="flex flex-wrap gap-2">
              {result.mostMentionedProducts.map((p) => (
                <span key={p.name} className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dim)]">
                  {p.name} <span className="font-mono text-[var(--color-text-faint)]">· {p.mentions}</span>
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover>
            <h3 className="font-display font-medium mb-1">What should we make next?</h3>
            <p className="text-sm text-[var(--color-text-dim)] mb-4">Top 5 video topics recommended from this audience's comments.</p>
            <div className="space-y-2 mb-4">
              {result.recommendedTopics.map((t, i) => (
                <div key={t} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-xs w-5 text-[var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[var(--color-text)]">{t}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(`/app/ideas?topic=${encodeURIComponent(result.recommendedTopics[0])}`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-black"
              style={{ background: "linear-gradient(120deg, var(--color-gold), #f2cf8a)" }}
            >
              Turn into Video Ideas <ArrowRight size={15} />
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

function SentimentCard({ label, value, color, isCount }: { label: string; value: number; color: string; isCount?: boolean }) {
  return (
    <GlassCard className="p-4">
      <p className="font-display text-2xl font-semibold" style={{ color }}>{value}{!isCount && "%"}</p>
      <p className="text-xs text-[var(--color-text-dim)] mt-1">{label}</p>
    </GlassCard>
  );
}

function InfoBlock({ title, items, accent }: { title: string; items: string[]; accent?: "danger" | "violet" }) {
  const color = accent === "danger" ? "var(--color-danger)" : accent === "violet" ? "var(--color-violet)" : "var(--color-text)";
  return (
    <GlassCard className="p-6">
      <h3 className="font-display font-medium mb-3" style={{ color }}>{title}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-[var(--color-text-dim)] flex gap-2 leading-relaxed">
            <span style={{ color }}>•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
