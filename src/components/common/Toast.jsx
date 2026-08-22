import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

const TOAST_STYLES = {
  success: {
    bg: "bg-emerald-950/90 border-emerald-500/30 text-emerald-200",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
  },
  warning: {
    bg: "bg-amber-950/90 border-amber-500/30 text-amber-200",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
  },
  info: {
    bg: "bg-indigo-950/90 border-indigo-500/30 text-indigo-200",
    icon: Info,
    iconColor: "text-indigo-400",
  },
  error: {
    bg: "bg-rose-950/90 border-rose-500/30 text-rose-200",
    icon: XCircle,
    iconColor: "text-rose-400",
  },
};

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
          const Icon = style.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border backdrop-blur-md shadow-2xl ${style.bg}`}
            >
              <div className="flex items-center space-x-3 pr-2">
                <Icon className={`w-5 h-5 flex-shrink-0 ${style.iconColor}`} />
                <span className="text-sm font-medium leading-snug">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
