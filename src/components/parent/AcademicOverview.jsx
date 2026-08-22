import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, Award, Sparkles, CheckCircle2 } from "lucide-react";
import ChildSelectorHeader from "./ChildSelectorHeader";
import { useApp } from "../../context/AppContext";

export default function AcademicOverview() {
  const { selectedChild } = useApp();

  return (
    <div className="space-y-8">
      {/* Child Selector Pill Header */}
      <ChildSelectorHeader />

      {/* Course Grade Cards & Upcoming Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Course Grade Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-extrabold text-white flex items-center">
            <BookOpen className="w-5 h-5 text-indigo-400 mr-2" />
            Enrolled Course Scores ({selectedChild.courses.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedChild.courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {course.code}
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1.5">{course.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Instructor: {course.teacher}</p>
                  </div>
                  <span className="text-lg font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-2xl border border-emerald-500/30">
                    {course.grade}
                  </span>
                </div>

                {/* Score Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-400">Score Percentage</span>
                    <span className="text-indigo-300 font-extrabold">{course.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Tests & Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-white flex items-center">
            <Calendar className="w-5 h-5 text-amber-400 mr-2" />
            Upcoming Test Deadlines
          </h3>

          <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
            {selectedChild.upcomingTests.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No upcoming tests scheduled this week.</p>
            ) : (
              selectedChild.upcomingTests.map((test, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-indigo-400">{test.subject}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      In {test.daysLeft} Days
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white">{test.topic}</p>
                  <div className="flex items-center text-[10px] text-slate-400 pt-1">
                    <Clock className="w-3 h-3 mr-1 text-slate-500" />
                    <span>Scheduled for {test.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
