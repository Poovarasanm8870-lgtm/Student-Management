import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Users, BookOpen, GraduationCap, Settings, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, users, setCurrentRole, setAdminTab, setTeacherTab, setParentTab } = useApp();
  const [query, setQuery] = useState("");

  if (!isCommandPaletteOpen) return null;

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.role.toLowerCase().includes(query.toLowerCase()) || u.department.toLowerCase().includes(query.toLowerCase())
  );

  const quickActions = [
    { label: "Switch to Admin View", role: "admin", tab: "overview", icon: ShieldCheck },
    { label: "Switch to Teacher View", role: "teacher", tab: "classes", icon: BookOpen },
    { label: "Switch to Parent View", role: "parent", tab: "academic", icon: GraduationCap },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/40">
            <Search className="w-5 h-5 text-indigo-400 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command, student name, or role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Results / Content */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            
            {/* Quick Actions */}
            {!query && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">Quick Role Shortcuts</p>
                <div className="space-y-1">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentRole(action.role);
                          if (action.role === "admin") setAdminTab(action.tab);
                          if (action.role === "teacher") setTeacherTab(action.tab);
                          if (action.role === "parent") setParentTab(action.tab);
                          setIsCommandPaletteOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-200 transition-all border border-transparent hover:border-indigo-500/30"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 text-indigo-400" />
                          <span>{action.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Matching Directory Users */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Directory Search ({filteredUsers.length})
              </p>
              {filteredUsers.length === 0 ? (
                <p className="text-xs text-slate-400 italic px-2 py-3">No matching users or records found.</p>
              ) : (
                <div className="space-y-1">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setIsCommandPaletteOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 transition-all cursor-pointer border border-transparent hover:border-slate-700"
                    >
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                        <div>
                          <p className="text-xs font-semibold text-white">{user.name}</p>
                          <p className="text-[10px] text-slate-400">{user.email} • {user.department}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Navigation Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Esc</kbd> to exit command modal</span>
            <span className="text-indigo-400 font-semibold">AuraSMS Search Index</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
