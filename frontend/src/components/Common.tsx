import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2, Copy, RotateCcw, Bookmark, type LucideIcon } from "lucide-react";

export function LoadingState({ message = "Working on it..." }: { message?: string }) {
  return (
    <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center">
      <Loader2 className="animate-spin" size={26} style={{ color: "var(--color-gold)" }} />
      <p className="text-sm text-[var(--color-text-dim)]">{message}</p>
      <div className="w-full max-w-sm flex flex-col gap-2 mt-2">
        {[100, 80, 60].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-white/5 overflow-hidden" style={{ width: `${w}%`, marginInline: "auto" }}>
            <div className="h-full w-1/3 rounded-full animate-pulse" style={{ background: "linear-gradient(90deg, var(--color-gold), var(--color-violet))" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon, title, subtitle, action,
}: { icon: LucideIcon; title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="glass rounded-2xl p-12 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,108,240,0.12)" }}>
        <Icon size={22} style={{ color: "var(--color-violet)" }} />
      </div>
      <h3 className="font-display font-medium text-lg">{title}</h3>
      <p className="text-sm text-[var(--color-text-dim)] max-w-sm">{subtitle}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl p-6 border flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: "rgba(239,90,118,0.3)", background: "rgba(239,90,118,0.06)" }}>
      <p className="text-sm" style={{ color: "var(--color-danger)" }}>{message}</p>
      <button onClick={onRetry} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus-ring">
        <RotateCcw size={14} /> Retry
      </button>
    </div>
  );
}

export function PrimaryButton({
  children, onClick, disabled, loading, className = "", type = "button",
}: { children: ReactNode; onClick?: () => void; disabled?: boolean; loading?: boolean; className?: string; type?: "button" | "submit" }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-black transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus-ring ${className}`}
      style={{ background: "linear-gradient(120deg, var(--color-gold), #f2cf8a)" }}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </motion.button>
  );
}

export function GhostButton({
  children, onClick, className = "",
}: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-white/[0.03] transition-colors focus-ring ${className}`}
    >
      {children}
    </button>
  );
}

export function IconActionButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} title={label} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-white/5 focus-ring">
      <Icon size={13} />
      {label}
    </button>
  );
}

export function ResultActions({ onCopy, onRegenerate, onSave }: { onCopy?: () => void; onRegenerate?: () => void; onSave?: () => void }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {onCopy && <IconActionButton icon={Copy} label="Copy" onClick={onCopy} />}
      {onRegenerate && <IconActionButton icon={RotateCcw} label="Regenerate" onClick={onRegenerate} />}
      {onSave && <IconActionButton icon={Bookmark} label="Save" onClick={onSave} />}
    </div>
  );
}
