import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sun,
  Moon,
  Bell,
  Crown,
  GraduationCap,
  Users,
  Check,
  ChevronDown,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

const ROLES = [
  { id: "admin", label: "Admin Panel", icon: Crown, badge: "👑 Principal", color: "from-amber-500 to-indigo-600" },
  { id: "teacher", label: "Teacher Panel", icon: GraduationCap, badge: "👨‍🏫 Faculty", color: "from-indigo-500 to-violet-600" },
  { id: "parent", label: "Parent Panel", icon: Users, badge: "👨‍👩‍👧 Family", color: "from-emerald-500 to-teal-600" },
];

export default function Header() {
  const { currentRole, setCurrentRole, theme, toggleTheme, setIsCommandPaletteOpen, messages } = useApp();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const activeRoleObj = ROLES.find((r) => r.id === currentRole) || ROLES[0];
  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                Aura<span className="text-indigo-400">SMS</span>
              </span>
              <span className="hidden sm:inline-block rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                PRO v4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">Next-Gen Academic Dashboard</p>
          </div>
        </div>

        {/* Global Search Bar (Triggers Command Palette) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all duration-200 group shadow-inner"
          >
            <div className="flex items-center space-x-2.5">
              <Search className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>Search students, classes, records...</span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded-md">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Role Switcher Pill Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen((prev) => !prev)}
              className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-md",
                "bg-slate-900/90 border-indigo-500/30 text-white hover:border-indigo-400 hover:shadow-indigo-500/10"
              )}
            >
              <activeRoleObj.icon className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">{activeRoleObj.label}</span>
              <span className="sm:hidden">{activeRoleObj.badge}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", isRoleDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isRoleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl p-2 z-50"
                >
                  <div className="px-3 py-2 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Select Active Persona
                  </div>
                  <div className="mt-1 space-y-1">
                    {ROLES.map((role) => {
                      const Icon = role.icon;
                      const isSelected = currentRole === role.id;
                      return (
                        <button
                          key={role.id}
                          onClick={() => {
                            setCurrentRole(role.id);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150",
                            isSelected
                              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          )}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className={cn("p-1.5 rounded-lg bg-slate-800 text-indigo-400", isSelected && "bg-indigo-600 text-white")}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">{role.label}</p>
                              <p className="text-[10px] text-slate-400">{role.badge}</p>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200"
            title="Toggle Light/Dark Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl p-3 z-50"
                >
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                      {unreadCount} Unread
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {messages.slice(0, 3).map((msg) => (
                      <div
                        key={msg.id}
                        className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-indigo-300">{msg.sender}</span>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-200 mt-1 line-clamp-1">{msg.subject}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{msg.preview}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Pill Avatar */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-indigo-500/50 object-cover shadow-sm"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-200 leading-none">Dr. E. Vance</p>
              <p className="text-[10px] text-slate-400 leading-tight capitalize mt-0.5">{currentRole} Mode</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
