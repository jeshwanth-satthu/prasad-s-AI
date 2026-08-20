import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowRight, LinkIcon } from "lucide-react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { LoadingState, ErrorState, PrimaryButton, ResultActions } from "../components/Common";
import { runResearch } from "../lib/api";
import { storeItem } from "../lib/history";
import { useToast } from "../components/Toast";
import type { ResearchBrief } from "../types";

const depths = ["Quick Overview", "Standard Brief", "Deep Dive"];

export function Research() {
  const [params] = useSearchParams();
  const [topic, setTopic] = useState(params.get("topic") || "");
  const [competitor, setCompetitor] = useState("");
  const [audience, setAudience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [depth, setDepth] = useState(depths[1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchBrief | null>(null);
  const navigate = useNavigate();
  const { push } = useToast();

  const generate = async () => {
    if (!topic.trim()) {
      push("error", "Enter a product or topic first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { result: r, demo } = await runResearch(topic, { competitor, audience, priceRange, depth });
      setResult(r);
      storeItem("research", r.id, r);
      push("success", demo ? "Research generated (Demo Mode sample data)." : "Research generated.");
    } catch {
      setError("Something went wrong generating this research brief.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Research" title="AI Research" subtitle="Turn a product or technology topic into a structured research brief." />

      <GlassCard className="p-6 mb-8">
        <label className="text-xs font-medium text-[var(--color-text-dim)] mb-2 block">Product / Topic</label>
        <div className="flex gap-2 mb-5">
          <div className="flex-1 relative">
            <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]" />
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Samsung Galaxy S26 Ultra"
              className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--color-border-strong)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Competitor (optional)</label>
            <input value={competitor} onChange={(e) => setCompetitor(e.target.value)} placeholder="e.g. iPhone 17 Pro" className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-border-strong)]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Target Audience (optional)</label>
            <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. college students" className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-border-strong)]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Price Range (optional)</label>
            <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="e.g. under ₹50,000" className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-border-strong)]" />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Research Depth</label>
          <div className="flex gap-2 flex-wrap">
            {depths.map((d) => (
              <button key={d} onClick={() => setDepth(d)} className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${depth === d ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[rgba(242,169,59,0.08)]" : "border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-border-strong)]"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <PrimaryButton onClick={generate} loading={loading}>Generate Research</PrimaryButton>
      </GlassCard>

      {loading && <LoadingState message="Researching specs, reviews and comparisons..." />}
      {error && <ErrorState message={error} onRetry={generate} />}

      {result && !loading && (
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <h2 className="font-display text-xl font-semibold">{result.topic}</h2>
              <ResultActions
                onCopy={() => { navigator.clipboard.writeText(JSON.stringify(result, null, 2)); push("success", "Copied to clipboard."); }}
                onRegenerate={generate}
                onSave={() => push("success", "Saved to history.")}
              />
            </div>
            <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{result.overview}</p>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResearchBlock title="Key Specifications">
              <div className="space-y-2">
                {result.keySpecs.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-xs font-mono text-[var(--color-text-faint)]">{s.label}</span>
                    <span className="text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </ResearchBlock>

            <ResearchBlock title="Major Features">
              <BulletList items={result.majorFeatures} />
            </ResearchBlock>

            <ResearchBlock title="What's New">
              <BulletList items={result.whatsNew} />
            </ResearchBlock>

            <ResearchBlock title="Video Talking Points">
              <BulletList items={result.talkingPoints} />
            </ResearchBlock>

            <ResearchBlock title="Pros" accent="teal">
              <BulletList items={result.pros} />
            </ResearchBlock>

            <ResearchBlock title="Cons" accent="danger">
              <BulletList items={result.cons} />
            </ResearchBlock>

            <ResearchBlock title="Who Should Buy?" accent="teal">
              <BulletList items={result.whoShouldBuy} />
            </ResearchBlock>

            <ResearchBlock title="Who Should Avoid?" accent="danger">
              <BulletList items={result.whoShouldAvoid} />
            </ResearchBlock>
          </div>

          <ResearchBlock title="Competitor Comparison">
            <div className="space-y-3">
              {result.competitorComparison.map((c) => (
                <div key={c.competitor} className="border-l-2 pl-3" style={{ borderColor: "var(--color-violet)" }}>
                  <p className="text-sm font-medium">{c.competitor}</p>
                  <p className="text-sm text-[var(--color-text-dim)]">{c.verdict}</p>
                </div>
              ))}
            </div>
          </ResearchBlock>

          <ResearchBlock title="Important Facts To Verify" accent="danger">
            <BulletList items={result.factsToVerify} />
          </ResearchBlock>

          <ResearchBlock title="Sources">
            <div className="space-y-2">
              {result.sources.map((s) => (
                <div key={s.title} className="flex items-start gap-2 text-sm">
                  <LinkIcon size={13} className="mt-1 shrink-0 text-[var(--color-text-faint)]" />
                  <div>
                    <span className="font-medium">{s.title}</span>
                    <span className="text-[var(--color-text-dim)]"> — {s.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </ResearchBlock>

          <GlassCard className="p-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-display font-medium">Ready for the next step?</p>
              <p className="text-sm text-[var(--color-text-dim)]">Turn this research into a Telugu script.</p>
            </div>
            <button
              onClick={() => navigate(`/app/script-studio?topic=${encodeURIComponent(result.topic)}`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-black"
              style={{ background: "linear-gradient(120deg, var(--color-gold), #f2cf8a)" }}
            >
              Generate Script <ArrowRight size={15} />
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

function ResearchBlock({ title, children, accent }: { title: string; children: React.ReactNode; accent?: "teal" | "danger" }) {
  const color = accent === "teal" ? "var(--color-teal)" : accent === "danger" ? "var(--color-danger)" : "var(--color-text)";
  return (
    <GlassCard className="p-6">
      <h3 className="font-display font-medium mb-3" style={{ color }}>{title}</h3>
      {children}
    </GlassCard>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="text-sm text-[var(--color-text-dim)] flex gap-2 leading-relaxed">
          <span className="text-[var(--color-gold)] mt-1">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
