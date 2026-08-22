import React from "react";
import { motion } from "framer-motion";
import { Plus, Download, ShieldCheck, TrendingUp, Users, UserPlus, Sparkles, Activity } from "lucide-react";
import StatCard from "../common/StatCard";
import { ADMIN_STATS, ENROLLMENT_GROWTH_DATA } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { downloadCSV } from "../../utils/helpers";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminOverview() {
  const { users, setIsAddUserModalOpen, setAdminTab, showToast } = useApp();

  const handleExportCSV = () => {
    downloadCSV(users, "AuraSMS_Directory_Export.csv");
    showToast("Directory exported to CSV successfully", "success");
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black border border-indigo-500/25 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Executive Admin Suite
            </span>
            <span className="text-xs font-bold text-slate-400">Fall Semester 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2.5">
            Institutional Performance Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1 max-w-xl leading-relaxed">
            Real-time analytics across 2,845 students, 142 faculty members, and campus administrative operations.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-extrabold shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User Account</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Animated Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMIN_STATS.map((stat, idx) => (
          <StatCard key={idx} index={idx} {...stat} />
        ))}
      </div>

      {/* Overview Analytics & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrollment Trend Chart */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="text-base font-black text-white flex items-center">
                <TrendingUp className="w-4 h-4 text-indigo-400 mr-2" />
                Enrollment Growth & Performance Trends
              </h3>
              <p className="text-xs font-medium text-slate-400">Monthly student headcount progression</p>
            </div>
            <button
              onClick={() => setAdminTab("analytics")}
              className="text-xs font-extrabold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View Analytics →
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENROLLMENT_GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                  itemStyle={{ color: "#818cf8" }}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Directory Snapshot & Activity */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
              <h3 className="text-base font-black text-white flex items-center">
                <Activity className="w-4 h-4 text-emerald-400 mr-2" />
                Recent User Activity
              </h3>
              <button
                onClick={() => setAdminTab("users")}
                className="text-xs font-extrabold text-indigo-400 hover:text-indigo-300"
              >
                Manage All
              </button>
            </div>

            <div className="space-y-3">
              {users.slice(0, 4).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60 hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                    <div>
                      <p className="text-xs font-extrabold text-white">{user.name}</p>
                      <p className="text-[11px] font-medium text-slate-400">{user.department}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Status: <strong className="text-emerald-400">Operational</strong></span>
            <span>Security: <strong className="text-indigo-400">v4.8 Active</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}
