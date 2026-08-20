import { useEffect, useState } from "react";
import { Menu, CircleUserRound, Radio } from "lucide-react";
import { getApiStatus } from "../lib/api";
import type { ApiStatus } from "../types";

export function Header({ onMenu }: { onMenu: () => void }) {
  const [status, setStatus] = useState<ApiStatus | null>(null);

  useEffect(() => {
    getApiStatus().then(setStatus);
  }, []);

  const isDemo = !status || status.gemini === "demo";

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 md:px-8 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="md:hidden text-[var(--color-text-dim)] focus-ring rounded">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border"
          style={{
            borderColor: isDemo ? "rgba(242,169,59,0.3)" : "rgba(63,214,192,0.3)",
            color: isDemo ? "var(--color-gold)" : "var(--color-teal)",
            background: isDemo ? "rgba(242,169,59,0.08)" : "rgba(63,214,192,0.08)",
          }}
          title={isDemo ? "Running on realistic sample data — connect a Gemini API key to go live." : "Connected to live AI backend."}
        >
          <Radio size={11} />
          {isDemo ? "DEMO MODE" : "LIVE"}
        </div>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-white/5 focus-ring">
          <CircleUserRound size={20} />
        </button>
      </div>
    </header>
  );
}
