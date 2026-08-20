import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { LoadingState, ErrorState, PrimaryButton, ResultActions } from "../components/Common";
import { runScript } from "../lib/api";
import { storeItem } from "../lib/history";
import { useToast } from "../components/Toast";
import type { Script, VideoType, Duration, ScriptLanguage, Tone } from "../types";

const videoTypes: VideoType[] = ["Review", "Comparison", "News", "Explainer", "Buying Guide", "Shorts"];
const durations: Duration[] = ["30 seconds", "60 seconds", "3 minutes", "5 minutes", "8 minutes", "10 minutes"];
const languages: ScriptLanguage[] = ["Telugu", "Telugu + English Tech Terms", "English"];
const tones: Tone[] = ["Energetic", "Friendly", "Professional", "Educational", "Storytelling"];

function Chip<T extends string>({ value, current, onClick }: { value: T; current: T; onClick: (v: T) => void }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
        current === value
          ? "border-[var(--color-violet)] text-[var(--color-violet)] bg-[rgba(124,108,240,0.1)]"
          : "border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-border-strong)]"
      }`}
    >
      {value}
    </button>
  );
}

export function ScriptStudio() {
  const [params] = useSearchParams();
  const [topic, setTopic] = useState(params.get("topic") || "");
  const [videoType, setVideoType] = useState<VideoType>("Review");
  const [duration, setDuration] = useState<Duration>("3 minutes");
  const [language, setLanguage] = useState<ScriptLanguage>("Telugu + English Tech Terms");
  const [tone, setTone] = useState<Tone>("Energetic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Script | null>(null);
  const navigate = useNavigate();
  const { push } = useToast();

  const generate = async () => {
    if (!topic.trim()) { push("error", "Enter a topic first."); return; }
    setLoading(true);
    setError(null);
    try {
      const { result: r, demo } = await runScript({ topic, videoType, duration, language, tone });
      setResult(r);
      storeItem("script", r.id, r);
      push("success", demo ? "Script generated (Demo Mode sample data)." : "Script generated.");
    } catch {
      setError("Something went wrong generating this script.");
    } finally {
      setLoading(false);
    }
  };

  const fullScriptText = result
    ? `HOOK\n${result.hook}\n\nINTRO\n${result.intro}\n\nMAIN CONTENT\n${result.mainContent.join("\n")}\n${result.comparison ? `\nCOMPARISON\n${result.comparison}\n` : ""}\nVERDICT\n${result.verdict}\n\nCTA\n${result.cta}`
    : "";

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Script Studio" title="Script Studio" subtitle="Turn research into a natural Telugu technology script." />

      <GlassCard className="p-6 mb-8">
        <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. iPhone 17 Pro review"
          className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-border-strong)] mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-2 block">Video Type</label>
            <div className="flex gap-2 flex-wrap">{videoTypes.map((v) => <Chip key={v} value={v} current={videoType} onClick={setVideoType} />)}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-2 block">Duration</label>
            <div className="flex gap-2 flex-wrap">{durations.map((v) => <Chip key={v} value={v} current={duration} onClick={setDuration} />)}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-2 block">Language</label>
            <div className="flex gap-2 flex-wrap">{languages.map((v) => <Chip key={v} value={v} current={language} onClick={setLanguage} />)}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-2 block">Tone</label>
            <div className="flex gap-2 flex-wrap">{tones.map((v) => <Chip key={v} value={v} current={tone} onClick={setTone} />)}</div>
          </div>
        </div>

        <div className="mt-6">
          <PrimaryButton onClick={generate} loading={loading}>Generate Script</PrimaryButton>
        </div>
      </GlassCard>

      {loading && <LoadingState message="Writing a natural Telugu script..." />}
      {error && <ErrorState message={error} onRetry={generate} />}

      {result && !loading && (
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
              <div>
                <h2 className="font-display text-xl font-semibold">{result.topic}</h2>
                <p className="text-xs text-[var(--color-text-faint)] font-mono mt-1">{result.videoType} · {result.duration} · {result.language} · {result.tone}</p>
              </div>
              <ResultActions
                onCopy={() => { navigator.clipboard.writeText(fullScriptText); push("success", "Script copied to clipboard."); }}
                onRegenerate={generate}
                onSave={() => push("success", "Saved to history.")}
              />
            </div>
          </GlassCard>

          <ScriptBlock label="HOOK" text={result.hook} accent="gold" />
          <ScriptBlock label="INTRO" text={result.intro} />
          <GlassCard className="p-6">
            <h3 className="font-display font-medium mb-3" style={{ color: "var(--color-violet)" }}>MAIN CONTENT</h3>
            <div className="space-y-3">
              {result.mainContent.map((line, i) => (
                <p key={i} className="text-sm font-telugu leading-relaxed text-[var(--color-text)]">{line}</p>
              ))}
            </div>
          </GlassCard>
          {result.comparison && <ScriptBlock label="COMPARISON" text={result.comparison} />}
          <ScriptBlock label="VERDICT" text={result.verdict} accent="teal" />
          <ScriptBlock label="CTA" text={result.cta} accent="gold" />

          <GlassCard className="p-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-display font-medium">Ready to slice it up?</p>
              <p className="text-sm text-[var(--color-text-dim)]">Send this script to Shorts Lab.</p>
            </div>
            <button
              onClick={() => navigate("/app/shorts", { state: { source: fullScriptText } })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-black"
              style={{ background: "linear-gradient(120deg, var(--color-gold), #f2cf8a)" }}
            >
              Generate Shorts <ArrowRight size={15} />
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

function ScriptBlock({ label, text, accent }: { label: string; text: string; accent?: "gold" | "teal" }) {
  const color = accent === "gold" ? "var(--color-gold)" : accent === "teal" ? "var(--color-teal)" : "var(--color-violet)";
  return (
    <GlassCard className="p-6">
      <h3 className="font-display font-medium mb-3 font-mono text-sm tracking-wide" style={{ color }}>{label}</h3>
      <p className="text-sm font-telugu leading-relaxed">{text}</p>
    </GlassCard>
  );
}
