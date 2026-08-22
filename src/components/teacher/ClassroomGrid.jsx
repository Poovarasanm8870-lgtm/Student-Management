import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, CalendarCheck, Award, Clock, ArrowRight, Video, AlertTriangle } from "lucide-react";
import { TEACHER_CLASSES } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

export default function ClassroomGrid() {
  const { setTeacherTab, showToast } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Active Classroom Roster & Courses</h2>
          <p className="text-xs text-slate-400 mt-1">Prof. Marcus Thorne • Department of Mathematics & Sciences</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTeacherTab("attendance")}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Launch Attendance Logger</span>
          </button>
        </div>
      </div>

      {/* Classroom Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEACHER_CLASSES.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between group hover:border-indigo-500/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              {/* Class Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {cls.code}
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-2 group-hover:text-indigo-200 transition-colors">
                    {cls.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{cls.room}</p>
                </div>
              </div>

              {/* Schedule pill */}
              <div className="mt-4 flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span>{cls.schedule} • {cls.time}</span>
              </div>

              {/* Stats Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Students</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">{cls.totalStudents}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Present</p>
                  <p className="text-sm font-extrabold text-emerald-400 mt-0.5">{cls.presentCount}/{cls.totalStudents}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Avg Grade</p>
                  <p className="text-sm font-extrabold text-indigo-400 mt-0.5">{cls.avgGrade}</p>
                </div>
              </div>

              {/* At Risk Alert if present */}
              {cls.atRiskStudents > 0 && (
                <div className="mt-3 flex items-center space-x-2 text-xs text-rose-400 bg-rose-500/10 p-2 rounded-xl border border-rose-500/20 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{cls.atRiskStudents} student at risk of failing</span>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setTeacherTab("grading")}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Gradebook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => showToast(`Launching virtual room for ${cls.code}...`, "info")}
                className="p-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors border border-indigo-500/30"
                title="Start Virtual Zoom Session"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}
