import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Trash2,
  Download,
  MoreVertical,
  CheckSquare,
  Square,
  Shield,
  User,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { downloadCSV, cn } from "../../utils/helpers";

const ROLE_TABS = ["All", "Student", "Teacher", "Parent", "Admin"];

export default function UserManagementTable() {
  const { users, deleteUser, setIsAddUserModalOpen, showToast } = useApp();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Filtered users list
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Multi-select handlers
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedUsers.map((u) => u.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteUser(id));
    setSelectedIds([]);
    showToast(`Bulk deleted ${selectedIds.length} users`, "warning");
  };

  const handleExportSelected = () => {
    const exportData = users.filter((u) => selectedIds.includes(u.id));
    downloadCSV(exportData.length ? exportData : filteredUsers, "Users_Export.csv");
    showToast("CSV Exported successfully", "success");
  };

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">User Directory & Role Control</h2>
          <p className="text-xs text-slate-400 mt-1">Manage accounts, dynamic permissions, and institutional access</p>
        </div>

        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Account</span>
        </button>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Role Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedRole(tab);
                setCurrentPage(1);
              }}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                selectedRole === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              {tab} {tab === "All" ? `(${users.length})` : `(${users.filter((u) => u.role === tab).length})`}
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, email, department..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Multi-Select Action Bar (Shows when items are selected) */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-between text-xs text-indigo-200"
          >
            <span className="font-semibold">Selected {selectedIds.length} users</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportSelected}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center space-x-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Selected</span>
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center space-x-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Data Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4 w-10">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-white">
                    {selectedIds.length === paginatedUsers.length && paginatedUsers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department / Class</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 italic">
                    No users match your current filter query.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isSelected = selectedIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={cn(
                        "hover:bg-slate-900/40 transition-colors group",
                        isSelected && "bg-indigo-950/20"
                      )}
                    >
                      <td className="p-4">
                        <button onClick={() => toggleSelectOne(user.id)} className="text-slate-400 hover:text-white">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-indigo-400" /> : <Square className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                          <div>
                            <p className="font-bold text-white group-hover:text-indigo-300 transition-colors">{user.name}</p>
                            <p className="text-[11px] text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-extrabold border",
                            user.role === "Admin" && "bg-amber-500/10 text-amber-400 border-amber-500/30",
                            user.role === "Teacher" && "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
                            user.role === "Student" && "bg-violet-500/10 text-violet-400 border-violet-500/30",
                            user.role === "Parent" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">{user.department}</td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                            user.status === "Active" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                            user.status === "At Risk" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", user.status === "Active" ? "bg-emerald-400" : "bg-rose-400")} />
                          <span>{user.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{user.joinedDate}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong>{paginatedUsers.length}</strong> of <strong>{filteredUsers.length}</strong> accounts
          </span>
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
