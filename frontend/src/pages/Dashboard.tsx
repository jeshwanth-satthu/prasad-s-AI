import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, FileText, Lightbulb, MessageSquareText, Clapperboard,
  Sparkles, FolderOpenDot, ScrollText, Film, ArrowRight,
} from "lucide-react";
import { GlassCard, SectionHeading } from "../components/GlassCard";
import { StatCard } from "../components/StatCard";

const quickActions = [
  { to: "/app/research", icon: Search, title: "Product Research", body: "Research any smartphone, laptop, gadget or technology topic.", accent: "gold" as const },
  { to: "/app/script-studio", icon: FileText, title: "Script Studio", body: "Turn research into a natural Telugu tech script.", accent: "violet" as const },
  { to: "/app/ideas", icon: Lightbulb, title: "Idea Generator", body: "Generate video ideas based on technology trends.", accent: "teal" as const },
  { to: "/app/comments", icon: MessageSquareText, title: "Comment Intelligence", body: "Understand what the audience actually wants.", accent: "gold" as const },
  { to: "/app/shorts", icon: Clapperboard, title: "Shorts Lab", body: "Turn long-form content into short-form ideas.", accent: "violet" as const },
];

const colorMap = { gold: "var(--color-gold)", violet: "var(--color-violet)", teal: "var(--color-teal)" };

export function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const go = (path: string) => navigate(query ? `${path}?topic=${encodeURIComponent(query)}` : path);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-10">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl font-semibold">
          Good morning <span className="inline-block">👋</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-[var(--color-text-dim)] mt-2 text-lg">
          What are we creating today?
        </motion.p>
      </div>

      <GlassCard className="p-2 mb-8" delay={0.1}>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Research a product, generate a script, or discover your next video idea..."
            className="flex-1 bg-transparent px-4 py-3.5 text-sm focus:outline-none placeholder:text-[var(--color-text-faint)]"
          />
          <div className="flex gap-2 p-1">
            <button onClick={() => go("/app/research")} className="px-4 py-2.5 rounded-xl text-sm font-medium text-black whitespace-nowrap" style={{ background: "linear-gradient(120deg, var(--color-gold), #f2cf8a)" }}>
              Research Topic
            </button>
            <button onClick={() => go("/app/script-studio")} className="px-4 py-2.5 rounded-xl text-sm font-medium border border-[var(--color-border)] hover:border-[var(--color-border-strong)] whitespace-nowrap">
              Generate Script
            </button>
            <button onClick={() => go("/app/ideas")} className="px-4 py-2.5 rounded-xl text-sm font-medium border border-[var(--color-border)] hover:border-[var(--color-border-strong)] whitespace-nowrap">
              Find Video Ideas
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard icon={FolderOpenDot} label="Content Generated" value={42} accent="gold" delay={0.1} />
        <StatCard icon={ScrollText} label="Research Reports" value={18} accent="violet" delay={0.16} />
        <StatCard icon={FileText} label="Scripts Created" value={31} accent="teal" delay={0.22} />
        <StatCard icon={Film} label="Shorts Generated" value={76} accent="gold" delay={0.28} />
      </div>

      <SectionHeading eyebrow="Get Started" title="Quick Actions" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((qa, i) => (
          <GlassCard key={qa.title} hover delay={0.1 + i * 0.05} className="p-6 cursor-pointer group" >
            <button onClick={() => navigate(qa.to)} className="text-left w-full focus-ring rounded-xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${colorMap[qa.accent]}1A` }}>
                <qa.icon size={18} style={{ color: colorMap[qa.accent] }} />
              </div>
              <h3 className="font-display font-medium mb-1.5 flex items-center gap-1.5">
                {qa.title}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colorMap[qa.accent] }} />
              </h3>
              <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{qa.body}</p>
            </button>
          </GlassCard>
        ))}
        <GlassCard className="p-6 flex flex-col justify-center items-center text-center gap-2" delay={0.4}>
          <Sparkles size={20} style={{ color: "var(--color-gold)" }} />
          <p className="text-sm text-[var(--color-text-dim)]">Try the connected demo workflow:</p>
          <button onClick={() => navigate("/app/research?topic=" + encodeURIComponent("iPhone 17 Pro vs Samsung Galaxy S26 Ultra"))} className="text-sm font-medium underline decoration-dotted" style={{ color: "var(--color-gold)" }}>
            iPhone 17 Pro vs Galaxy S26 Ultra →
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
