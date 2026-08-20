import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";
interface ToastMsg { id: string; kind: ToastKind; message: string }

const ToastContext = createContext<{ push: (kind: ToastKind, message: string) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const iconFor: Record<ToastKind, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-teal-400" style={{ color: "var(--color-teal)" }} />,
  error: <XCircle size={18} style={{ color: "var(--color-danger)" }} />,
  info: <Info size={18} style={{ color: "var(--color-violet)" }} />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  const dismiss = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              className="glass rounded-xl px-4 py-3 flex items-start gap-3 shadow-2xl"
            >
              {iconFor[t.kind]}
              <p className="text-sm text-[var(--color-text)] flex-1 leading-snug">{t.message}</p>
              <button onClick={() => dismiss(t.id)} className="text-[var(--color-text-faint)] hover:text-[var(--color-text)] focus-ring rounded">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
