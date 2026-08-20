import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon, label, value, accent = "gold", delay = 0,
}: { icon: LucideIcon; label: string; value: number; accent?: "gold" | "violet" | "teal"; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const colorVar = accent === "gold" ? "var(--color-gold)" : accent === "violet" ? "var(--color-violet)" : "var(--color-teal)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-2xl p-5 flex items-center gap-4"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${colorVar}1A` }}>
        <Icon size={20} style={{ color: colorVar }} />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold tabular-nums">{display}</p>
        <p className="text-xs text-[var(--color-text-dim)] mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}
