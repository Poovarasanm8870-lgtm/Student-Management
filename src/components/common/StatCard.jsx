import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, CheckCircle2 } from "lucide-react";
import { cn } from "../../utils/helpers";

const ICON_MAP = {
  indigo: Users,
  violet: GraduationCap,
  emerald: DollarSign,
  amber: CheckCircle2,
};

const ACCENT_MAP = {
  indigo: "from-indigo-500/15 via-indigo-600/5 to-transparent text-indigo-400 border-indigo-500/30 shadow-indigo-500/10",
  violet: "from-violet-500/15 via-violet-600/5 to-transparent text-violet-400 border-violet-500/30 shadow-violet-500/10",
  emerald: "from-emerald-500/15 via-emerald-600/5 to-transparent text-emerald-400 border-emerald-500/30 shadow-emerald-500/10",
  amber: "from-amber-500/15 via-amber-600/5 to-transparent text-amber-400 border-amber-500/30 shadow-amber-500/10",
};

export default function StatCard({ title, value, change, isPositive, subtext, color = "indigo", index = 0 }) {
  const Icon = ICON_MAP[color] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "glass-card relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br",
        ACCENT_MAP[color]
      )}
    >
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white dark:text-white group-hover:text-indigo-300 transition-colors">
            {value}
          </h3>
        </div>
        <div className={cn("p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300")}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between pt-3.5 border-t border-slate-800/80">
        <div className="flex items-center space-x-1.5 text-xs font-bold">
          {isPositive ? (
            <span className="flex items-center text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              {change}
            </span>
          ) : (
            <span className="flex items-center text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/25">
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
              {change}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-slate-400">{subtext}</span>
      </div>
    </motion.div>
  );
}
