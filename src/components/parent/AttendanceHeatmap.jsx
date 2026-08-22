import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, AlertCircle, Clock, Info } from "lucide-react";
import ChildSelectorHeader from "./ChildSelectorHeader";
import { PARENT_ATTENDANCE_DONUT, PARENT_ATTENDANCE_HEATMAP } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "../../utils/helpers";

export default function AttendanceHeatmap() {
  const { selectedChild } = useApp();

  return (
    <div className="space-y-8">
      <ChildSelectorHeader />

      {/* Grid: Donut Chart & Monthly Calendar Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts Donut Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-extrabold text-white flex items-center">
              <CalendarDays className="w-4 h-4 text-emerald-400 mr-2" />
              Overall Attendance Ratio
            </h3>
            <p className="text-xs text-slate-400">Current Semester Breakdown</p>
          </div>

          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PARENT_ATTENDANCE_DONUT}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PARENT_ATTENDANCE_DONUT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-white">{selectedChild.attendanceRate}%</span>
              <span className="text-[10px] text-slate-400 uppercase">Presence Rate</span>
            </div>
          </div>
        </div>

        {/* Monthly Activity Calendar Heatmap */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center">
                <CalendarDays className="w-4 h-4 text-indigo-400 mr-2" />
                August 2026 Monthly Attendance Heatmap
              </h3>
              <p className="text-xs text-slate-400">Hover over any day to read specific daily logs</p>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-emerald-500 mr-1" /> Present</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-amber-500 mr-1" /> Late</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-sky-500 mr-1" /> Excused</span>
            </div>
          </div>

          {/* Grid Days */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {PARENT_ATTENDANCE_HEATMAP.map((item, idx) => {
              const isPresent = item.status === "Present";
              const isLate = item.status === "Late";
              const isExcused = item.status === "Excused";
              const isWeekend = item.status === "Weekend";

              return (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-2xl border text-center transition-all duration-200 group relative cursor-pointer",
                    isPresent && "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400",
                    isLate && "bg-amber-500/10 border-amber-500/30 hover:border-amber-400",
                    isExcused && "bg-sky-500/10 border-sky-500/30 hover:border-sky-400",
                    isWeekend && "bg-slate-900/40 border-slate-800/60 opacity-50"
                  )}
                >
                  <p className="text-xs font-bold text-white">{item.day}</p>
                  <p
                    className={cn(
                      "text-[10px] font-semibold mt-1",
                      isPresent && "text-emerald-400",
                      isLate && "text-amber-400",
                      isExcused && "text-sky-400",
                      isWeekend && "text-slate-500"
                    )}
                  >
                    {item.status}
                  </p>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-200 shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-30">
                    <p className="font-bold text-indigo-300">{item.day} Log</p>
                    <p className="mt-0.5 text-slate-300">{item.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
