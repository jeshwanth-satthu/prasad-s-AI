import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, FileText, Clapperboard, MessageSquareText, Sparkles } from "lucide-react";

const stages = [
  { label: "RESEARCH", te: "పరిశోధన", icon: Search },
  { label: "AI INTELLIGENCE", te: "విశ్లేషణ", icon: Sparkles },
  { label: "TELUGU SCRIPT", te: "స్క్రిప్ట్", icon: FileText },
  { label: "SHORTS", te: "షార్ట్స్", icon: Clapperboard },
  { label: "AUDIENCE INSIGHTS", te: "అభిప్రాయం", icon: MessageSquareText },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full blur-[120px] opacity-20 animate-drift pointer-events-none" style={{ background: "var(--color-gold)" }} />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full blur-[120px] opacity-20 animate-drift pointer-events-none" style={{ background: "var(--color-violet)", animationDelay: "3s" }} />

      {/* Giant faint Telugu glyph watermark — signature element */}
      <div aria-hidden className="absolute top-10 right-4 md:right-24 font-telugu select-none pointer-events-none text-[16rem] md:text-[24rem] leading-none opacity-[0.035]">
        త
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-violet))" }}>
            <Sparkles size={16} className="text-black" />
          </div>
          <span className="font-display font-semibold tracking-wide">PRASAD AI</span>
        </div>
        <Link to="/app" className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors focus-ring rounded">
          Launch Workspace →
        </Link>
      </nav>

      <main className="relative z-10 px-6 md:px-12 pt-16 md:pt-24 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "var(--color-gold)" }}
        >
          AI Content Intelligence for Telugu Tech Creators
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          <span className="text-gradient">PRASAD AI</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="font-display text-2xl md:text-3xl font-medium mt-5 text-[var(--color-text)]"
        >
          Turn Tech Research Into Telugu Content.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
          className="text-[var(--color-text-dim)] mt-5 text-base md:text-lg max-w-xl mx-auto"
        >
          Research faster. Create smarter. Understand your audience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
          className="mt-9 flex items-center justify-center gap-3 flex-wrap"
        >
          <Link to="/app" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-black" style={{ background: "linear-gradient(120deg, var(--color-gold), #f2cf8a)" }}>
            Launch AI Workspace <ArrowRight size={16} />
          </Link>
          <Link to="/app/research" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors">
            Explore Demo
          </Link>
        </motion.div>

        {/* Workflow ribbon — the signature element */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-24 relative"
        >
          <svg viewBox="0 0 1000 90" className="w-full h-16 md:h-20" preserveAspectRatio="none" aria-hidden>
            <line x1="40" y1="45" x2="960" y2="45" stroke="url(#ribbonGrad)" strokeWidth="1.5" className="animate-dash" />
            <defs>
              <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f2a93b" />
                <stop offset="100%" stopColor="#7c6cf0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 -mt-12 md:-mt-10">
            {stages.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full glass flex items-center justify-center" style={{ borderColor: i % 2 === 0 ? "rgba(242,169,59,0.35)" : "rgba(124,108,240,0.35)" }}>
                  <s.icon size={17} style={{ color: i % 2 === 0 ? "var(--color-gold)" : "var(--color-violet)" }} />
                </div>
                <p className="font-mono text-[10px] tracking-widest text-[var(--color-text-dim)]">{s.label}</p>
                <p className="font-telugu text-sm text-[var(--color-text-faint)]">{s.te}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-28 mb-24 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {[
            { title: "Not a ChatGPT wrapper", body: "Every output feeds the next step — research becomes a script, a script becomes Shorts, comments become your next ten video ideas." },
            { title: "Sounds like a real creator", body: "Telugu scripts are written the way Telugu tech creators actually speak — natural code-switching, not robotic translation." },
            { title: "Works without API keys", body: "Demo Mode ships with realistic sample data so you can present the full workflow today, and go live the moment keys are added." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
