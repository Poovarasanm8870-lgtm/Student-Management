import React from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Bell, Lock, Database, AlertOctagon, CheckCircle2, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

const PERMISSION_MATRIX = [
  { module: "User Directory Management", admin: true, teacher: false, parent: false },
  { module: "Academic Grading & GPA Input", admin: true, teacher: true, parent: false },
  { module: "Attendance Logger & Records", admin: true, teacher: true, parent: false },
  { module: "Parent Fee Payments & Invoices", admin: true, teacher: false, parent: true },
  { module: "System Maintenance & Backup", admin: true, teacher: false, parent: false },
];

export default function SystemSettings() {
  const { systemSettings, updateSetting } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">System Settings & Role Permissions</h2>
        <p className="text-xs text-slate-400 mt-1">Configure global platform security, backups, and role access controls</p>
      </div>

      {/* Toggles Grid */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-extrabold text-white flex items-center">
          <Settings className="w-4 h-4 text-indigo-400 mr-2" />
          Global Platform Configurations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Maintenance Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">System Maintenance Mode</p>
                <p className="text-[10px] text-slate-400">Restrict access to Admins only</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("maintenanceMode", !systemSettings.maintenanceMode)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative p-1",
                systemSettings.maintenanceMode ? "bg-amber-500" : "bg-slate-800"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform",
                  systemSettings.maintenanceMode ? "translate-x-6" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Email Digest & System Alerts</p>
                <p className="text-[10px] text-slate-400">Automated daily activity summaries</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("emailNotifications", !systemSettings.emailNotifications)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative p-1",
                systemSettings.emailNotifications ? "bg-indigo-600" : "bg-slate-800"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform",
                  systemSettings.emailNotifications ? "translate-x-6" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* 2FA Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Enforce Mandatory 2FA</p>
                <p className="text-[10px] text-slate-400">Two-factor auth for all staff</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("twoFactorAuth", !systemSettings.twoFactorAuth)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative p-1",
                systemSettings.twoFactorAuth ? "bg-emerald-600" : "bg-slate-800"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform",
                  systemSettings.twoFactorAuth ? "translate-x-6" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* Backup Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Automated Daily Cloud Backup</p>
                <p className="text-[10px] text-slate-400">Encrypted snapshot every midnight</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("autoBackupDaily", !systemSettings.autoBackupDaily)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative p-1",
                systemSettings.autoBackupDaily ? "bg-violet-600" : "bg-slate-800"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform",
                  systemSettings.autoBackupDaily ? "translate-x-6" : "translate-x-0"
                )}
              />
            </button>
          </div>

        </div>
      </div>

      {/* Role Permission Matrix Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="pb-3 border-b border-slate-800">
          <h3 className="text-base font-extrabold text-white flex items-center">
            <Shield className="w-4 h-4 text-indigo-400 mr-2" />
            Dynamic Role Permission Matrix
          </h3>
          <p className="text-xs text-slate-400">Feature access control by persona role</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3">Platform Module</th>
                <th className="p-3 text-center">Admin 👑</th>
                <th className="p-3 text-center">Teacher 👨‍🏫</th>
                <th className="p-3 text-center">Parent 👨‍👩‍👧</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {PERMISSION_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">{row.module}</td>
                  <td className="p-3 text-center">
                    {row.admin ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">-</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.teacher ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">-</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.parent ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
