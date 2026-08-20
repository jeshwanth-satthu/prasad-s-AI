import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Search, FileText, Lightbulb, MessageSquareText,
  Clapperboard, History, Settings, Sparkles, X,
} from "lucide-react";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/research", label: "Research", icon: Search },
  { to: "/app/script-studio", label: "Script Studio", icon: FileText },
  { to: "/app/ideas", label: "Content Ideas", icon: Lightbulb },
  { to: "/app/comments", label: "Comment Intelligence", icon: MessageSquareText },
  { to: "/app/shorts", label: "Shorts Lab", icon: Clapperboard },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed md:sticky top-0 h-screen z-40 w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-violet))" }}>
              <Sparkles size={16} className="text-black" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-semibold text-sm tracking-wide">PRASAD AI</p>
              <p className="text-[10px] text-[var(--color-text-faint)] font-mono">AI Content Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-[var(--color-text-dim)] focus-ring rounded">
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors focus-ring ${
                  isActive
                    ? "bg-[var(--color-surface-2)] text-[var(--color-text)]"
                    : "text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-white/[0.03]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} style={{ color: isActive ? "var(--color-gold)" : undefined }} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-xl p-3 glass">
            <p className="text-[11px] text-[var(--color-text-dim)] leading-relaxed font-telugu">
              "టెక్ రీసెర్చ్‌ని తెలుగు కంటెంట్‌గా మారుద్దాం."
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
