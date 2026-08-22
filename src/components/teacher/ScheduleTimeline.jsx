import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Video, CheckCircle2, PlayCircle, Calendar } from "lucide-react";
import { TEACHER_SCHEDULE } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

export default function ScheduleTimeline() {
  const { showToast } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Today's Faculty Schedule & Timetable</h2>
        <p className="text-xs text-slate-400 mt-1">Saturday, August 22, 2026 • Real-Time Lecture Agenda</p>
      </div>

      {/* Timeline List */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
        {TEACHER_SCHEDULE.map((item, idx) => {
          const isOngoing = item.status === "In Progress";
          const isDone = item.status === "Completed";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                isOngoing
                  ? "bg-indigo-950/40 border-indigo-500/50 shadow-xl shadow-indigo-500/10"
                  : "bg-slate-900/60 border-slate-800"
              )}
            >
              <div className="flex items-start space-x-4">
                {/* Status Indicator Icon */}
                <div
                  className={cn(
                    "p-3 rounded-2xl mt-0.5",
                    isOngoing && "bg-indigo-600 text-white animate-pulse",
                    isDone && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
                    !isOngoing && !isDone && "bg-slate-800 text-slate-400"
                  )}
                >
                  {isOngoing ? <PlayCircle className="w-5 h-5" /> : isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-indigo-400">{item.time}</span>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                        isOngoing && "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
                        isDone && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
                        !isOngoing && !isDone && "bg-slate-800 text-slate-400"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-1">{item.title}</h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-slate-300">{item.type}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              {item.link && (
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => showToast(`Connecting to Zoom class session...`, "info")}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Class Stream</span>
                  </button>
                </div>
              )}

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
