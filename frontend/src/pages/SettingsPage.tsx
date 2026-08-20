import { useEffect, useState } from "react";
import { SectionHeading, GlassCard } from "../components/GlassCard";
import { getApiStatus } from "../lib/api";
import type { ApiStatus } from "../types";

function StatusRow({ label, status }: { label: string; status: "connected" | "demo" }) {
  const isConnected = status === "connected";
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
      <span className="text-sm text-[var(--color-text-dim)]">{label}</span>
      <span className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full" style={{
        color: isConnected ? "var(--color-teal)" : "var(--color-gold)",
        background: isConnected ? "rgba(63,214,192,0.1)" : "rgba(242,169,59,0.1)",
      }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: isConnected ? "var(--color-teal)" : "var(--color-gold)" }} />
        {isConnected ? "Connected" : "Demo Mode"}
      </span>
    </div>
  );
}

export function SettingsPage() {
  const [status, setStatus] = useState<ApiStatus>({ gemini: "demo", mongodb: "demo", youtube: "demo" });
  const [model, setModel] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState(0.7);
  const [maxLength, setMaxLength] = useState(2048);
  const [langPref, setLangPref] = useState<"Telugu" | "Telugu + English">("Telugu + English");
  const [defaultTone, setDefaultTone] = useState("Energetic");
  const [defaultLength, setDefaultLength] = useState("3 minutes");

  useEffect(() => {
    getApiStatus().then(setStatus);
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <SectionHeading eyebrow="Settings" title="Settings" subtitle="Configure AI behavior, creator preferences, and connected services." />

      <GlassCard className="p-6 mb-5">
        <h3 className="font-display font-medium mb-4">AI Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Gemini Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-border-strong)]">
              <option value="gemini-2.5-flash">gemini-2.5-flash</option>
              <option value="gemini-2.5-pro">gemini-2.5-pro</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 flex justify-between"><span>Temperature</span><span className="font-mono">{temperature.toFixed(1)}</span></label>
            <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full accent-[#f2a93b]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 flex justify-between"><span>Max Output Length</span><span className="font-mono">{maxLength} tokens</span></label>
            <input type="range" min={512} max={8192} step={256} value={maxLength} onChange={(e) => setMaxLength(Number(e.target.value))} className="w-full accent-[#7c6cf0]" />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 mb-5">
        <h3 className="font-display font-medium mb-4">Creator Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Language Preference</label>
            <div className="flex gap-2">
              {(["Telugu", "Telugu + English"] as const).map((v) => (
                <button key={v} onClick={() => setLangPref(v)} className={`px-3.5 py-2 rounded-lg text-xs font-medium border ${langPref === v ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[rgba(242,169,59,0.08)]" : "border-[var(--color-border)] text-[var(--color-text-dim)]"}`}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Default Script Tone</label>
            <select value={defaultTone} onChange={(e) => setDefaultTone(e.target.value)} className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
              {["Energetic", "Friendly", "Professional", "Educational", "Storytelling"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-dim)] mb-1.5 block">Default Video Length</label>
            <select value={defaultLength} onChange={(e) => setDefaultLength(e.target.value)} className="w-full bg-white/[0.03] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
              {["30 seconds", "60 seconds", "3 minutes", "5 minutes", "8 minutes", "10 minutes"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="font-display font-medium mb-2">API Configuration</h3>
        <p className="text-xs text-[var(--color-text-faint)] mb-3">API keys are never shown here — they're configured via environment variables on the backend.</p>
        <StatusRow label="Gemini API" status={status.gemini} />
        <StatusRow label="MongoDB" status={status.mongodb} />
        <StatusRow label="YouTube Data API" status={status.youtube} />
      </GlassCard>
    </div>
  );
}
