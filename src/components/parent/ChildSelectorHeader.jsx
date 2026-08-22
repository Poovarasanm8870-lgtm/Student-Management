import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, ChevronRight } from "lucide-react";
import { PARENT_CHILDREN } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

export default function ChildSelectorHeader() {
  const { selectedChild, setSelectedChild, showToast } = useApp();

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Family Portal • Enrolled Students
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Child Academic Overview
          </h2>
          <p className="text-xs text-slate-400">Select child profile to view grades, attendance, messages & fees</p>
        </div>

        {/* Children Tabs */}
        <div className="flex items-center space-x-3">
          {PARENT_CHILDREN.map((child) => {
            const isSelected = selectedChild.id === child.id;
            return (
              <button
                key={child.id}
                onClick={() => {
                  setSelectedChild(child);
                  showToast(`Switched view to ${child.name}`, "info");
                }}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-200",
                  isSelected
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-500/40 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <img src={child.avatar} alt={child.name} className="w-8 h-8 rounded-full object-cover border border-white/20" />
                <div className="text-left">
                  <p className="font-extrabold">{child.name}</p>
                  <p className={cn("text-[10px]", isSelected ? "text-indigo-200" : "text-slate-500")}>
                    {child.grade.split(" - ")[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Quick Summary Pill Bar for Selected Child */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Grade Level</p>
          <p className="text-xs font-extrabold text-white mt-0.5">{selectedChild.grade}</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Overall Cumulative GPA</p>
          <p className="text-sm font-extrabold text-emerald-400 mt-0.5">{selectedChild.gpa} / 4.0</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Academic Class Rank</p>
          <p className="text-xs font-extrabold text-indigo-400 mt-0.5">{selectedChild.rank}</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Faculty Advisor</p>
          <p className="text-xs font-extrabold text-slate-200 mt-0.5">{selectedChild.advisor}</p>
        </div>
      </div>

    </div>
  );
}
