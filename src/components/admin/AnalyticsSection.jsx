import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, Award, Download } from "lucide-react";
import { ENROLLMENT_GROWTH_DATA, DEPARTMENT_PERFORMANCE_DATA } from "../../data/mockData";
import { formatCurrency } from "../../utils/helpers";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AnalyticsSection() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Institutional Analytics & Growth</h2>
          <p className="text-xs text-slate-400 mt-1">Cross-departmental academic performance & revenue trajectory</p>
        </div>
      </div>

      {/* Primary Enrollment & Financial Area Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center">
              <TrendingUp className="w-4 h-4 text-indigo-400 mr-2" />
              Enrollment Headcount & Tuition Revenue Trajectory
            </h3>
            <p className="text-xs text-slate-400">Monthly breakdown for academic year 2026</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ENROLLMENT_GROWTH_DATA}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorStudents2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" stroke="#818cf8" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#34d399" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area yAxisId="left" type="monotone" dataKey="students" name="Students Enrolled" stroke="#6366f1" strokeWidth={3} fill="url(#colorStudents2)" />
              <Area yAxisId="right" type="monotone" dataKey="revenue" name="Tuition Revenue ($)" stroke="#10b981" strokeWidth={3} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Grid: Department GPA & Pass Rate Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Department GPA Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-base font-extrabold text-white flex items-center">
              <Award className="w-4 h-4 text-violet-400 mr-2" />
              Departmental Average GPA Comparison
            </h3>
            <p className="text-xs text-slate-400">4.0 grading scale distribution</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTMENT_PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis domain={[2.0, 4.0]} stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }} />
                <Bar dataKey="avgGpa" name="Average GPA" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Budget Allocation Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-base font-extrabold text-white flex items-center">
              <DollarSign className="w-4 h-4 text-emerald-400 mr-2" />
              Department Financial Budget Allocation
            </h3>
            <p className="text-xs text-slate-400">Semester operating expenditure</p>
          </div>

          <div className="space-y-3">
            {DEPARTMENT_PERFORMANCE_DATA.map((dept, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div>
                  <p className="text-xs font-bold text-white">{dept.department}</p>
                  <p className="text-[10px] text-slate-400">Pass Rate: <strong className="text-emerald-400">{dept.passRate}%</strong></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-emerald-400">{formatCurrency(dept.budget)}</p>
                  <p className="text-[10px] text-slate-400">GPA: {dept.avgGpa}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
