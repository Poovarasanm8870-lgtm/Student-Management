import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  GraduationCap,
  CalendarDays,
  MessageSquare,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

const ADMIN_NAV = [
  { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, badge: "Live" },
  { id: "users", label: "User Management", icon: Users, badge: "Directory" },
  { id: "analytics", label: "Academic Analytics", icon: BarChart3, badge: "Recharts" },
  { id: "settings", label: "System Settings", icon: Settings, badge: "Config" },
];

const TEACHER_NAV = [
  { id: "classes", label: "Classroom Grid", icon: BookOpen, badge: "3 Classes" },
  { id: "attendance", label: "Attendance Logger", icon: CalendarCheck, badge: "Today" },
  { id: "grading", label: "Grading & Scorebook", icon: Award, badge: "GPA" },
  { id: "schedule", label: "Schedule Timeline", icon: Clock, badge: "5 Events" },
];

const PARENT_NAV = [
  { id: "academic", label: "Academic Dashboard", icon: GraduationCap, badge: "Report" },
  { id: "attendance", label: "Attendance Summary", icon: CalendarDays, badge: "98%" },
  { id: "messages", label: "Message Hub", icon: MessageSquare, badge: "Feed" },
  { id: "fees", label: "Fee Payment Tracker", icon: CreditCard, badge: "Invoices" },
];

export default function Sidebar() {
  const { currentRole, adminTab, setAdminTab, teacherTab, setTeacherTab, parentTab, setParentTab } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  let navItems = ADMIN_NAV;
  let activeTab = adminTab;
  let setActiveTab = setAdminTab;

  if (currentRole === "teacher") {
    navItems = TEACHER_NAV;
    activeTab = teacherTab;
    setActiveTab = setTeacherTab;
  } else if (currentRole === "parent") {
    navItems = PARENT_NAV;
    activeTab = parentTab;
    setActiveTab = setParentTab;
  }

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-16 z-30 flex h-[calc(100vh-4rem)] flex-col justify-between border-r border-slate-800/80 bg-slate-950/60 backdrop-blur-xl transition-all duration-300 shadow-xl"
    >
      {/* Top Section */}
      <div className="p-4">
        {/* Sidebar Header & Collapse Toggle */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/60">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Navigation</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 capitalize">
                {currentRole}
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors mx-auto"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 group relative",
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110", isActive ? "text-white" : "text-indigo-400")} />

                {!isCollapsed && (
                  <div className="ml-3 flex flex-1 items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      {!isCollapsed ? (
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-slate-800/80">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold">System Status</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            All servers operational. Security protocol v4.8 active.
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-emerald-400 font-semibold">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
              99.99% Uptime
            </span>
            <span className="text-slate-400">v4.2.8</span>
          </div>
        </div>
      ) : (
        <div className="p-3 text-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto animate-pulse" title="System Online" />
        </div>
      )}
    </motion.aside>
  );
}
