import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function GlassCard({
  children, className = "", hover = false, delay = 0,
}: { children: ReactNode; className?: string; hover?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass rounded-2xl ${hover ? "transition-all duration-300 hover:border-[var(--color-border-strong)] hover:-translate-y-0.5" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--color-gold)" }}>
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="text-[var(--color-text-dim)] mt-2 text-base max-w-2xl">{subtitle}</p>}
    </div>
  );
}
