import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertCircle, Search, Check, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

const STATUS_OPTIONS = [
  { label: "Present", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", icon: CheckCircle2 },
  { label: "Absent", color: "bg-rose-500/10 text-rose-400 border-rose-500/30", icon: XCircle },
  { label: "Late", color: "bg-amber-500/10 text-amber-400 border-amber-500/30", icon: Clock },
  { label: "Excused", color: "bg-sky-500/10 text-sky-400 border-sky-500/30", icon: AlertCircle },
];

export default function AttendanceTracker() {
  const { roster, toggleStudentAttendance, showToast, setIsAddUserModalOpen } = useApp();
  const [search, setSearch] = useState("");

  const presentCount = roster.filter((s) => s.status === "Present").length;
  const absentCount = roster.filter((s) => s.status === "Absent").length;
  const lateCount = roster.filter((s) => s.status === "Late").length;
  const totalCount = roster.length;
  const attendancePercentage = Math.round((presentCount / totalCount) * 100);

  const filteredRoster = roster.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleMarkAllPresent = () => {
    roster.forEach((s) => toggleStudentAttendance(s.id, "Present"));
    showToast("Marked all students as Present for today", "success");
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Daily Attendance Logger</h2>
          <p className="text-xs text-slate-400 mt-1">Grade 10-A Advanced Mathematics • Today, Aug 22, 2026</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Add Student</span>
          </button>
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Mark All Present</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Quick Stats */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Live Session Roster Progress</p>
              <h3 className="text-xl font-extrabold text-white">
                {presentCount} of {totalCount} Students Present ({attendancePercentage}%)
              </h3>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-xs font-semibold">
            <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {presentCount} Present
            </span>
            <span className="text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              {absentCount} Absent
            </span>
            <span className="text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {lateCount} Late
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${attendancePercentage}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 rounded-full"
          />
        </div>
      </div>

      {/* Roster Logger List */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        
        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter student name or roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredRoster.map((student) => (
            <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
              
              <div className="flex items-center space-x-3">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-white">{student.name}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">{student.rollNo}</span>
                  </div>
                  <p className="text-xs text-slate-400">Current GPA: <strong className="text-indigo-400">{student.finalGpa}</strong></p>
                </div>
              </div>

              {/* Status Selector Buttons */}
              <div className="flex items-center space-x-2">
                {STATUS_OPTIONS.map((opt) => {
                  const isSelected = student.status === opt.label;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => toggleStudentAttendance(student.id, opt.label)}
                      className={cn(
                        "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                        isSelected
                          ? opt.color + " shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
