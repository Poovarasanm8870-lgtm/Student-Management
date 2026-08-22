import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_USERS,
  CLASS_ROSTER,
  PARENT_CHILDREN,
  MESSAGES_FEED,
  PARENT_INVOICES,
  SYSTEM_SETTINGS_MOCK,
} from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Global Role: 'admin' | 'teacher' | 'parent'
  const [currentRole, setCurrentRole] = useState("admin");
  const [theme, setTheme] = useState("dark");
  
  // Tab navigation by role
  const [adminTab, setAdminTab] = useState("overview");
  const [teacherTab, setTeacherTab] = useState("classes");
  const [parentTab, setParentTab] = useState("academic");

  // Selected Child for Parent Panel
  const [selectedChild, setSelectedChild] = useState(PARENT_CHILDREN[0]);

  // Data states
  const [users, setUsers] = useState(INITIAL_USERS);
  const [roster, setRoster] = useState(CLASS_ROSTER);
  const [messages, setMessages] = useState(MESSAGES_FEED);
  const [invoices, setInvoices] = useState(PARENT_INVOICES);
  const [systemSettings, setSystemSettings] = useState(SYSTEM_SETTINGS_MOCK);

  // Command Palette & Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [activeReplyMsg, setActiveReplyMsg] = useState(null);
  const [activePaymentInvoice, setActivePaymentInvoice] = useState(null);

  // Toasts system
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme to document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  // Toggle Dark/Light Theme
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme`, "info");
  };

  // Role switching helper
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    showToast(`Switched role view to ${newRole.toUpperCase()}`, "info");
  };

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Action methods
  const addUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: new Date().toISOString().split("T")[0],
      avatar: newUser.avatar || `https://images.unsplash.com/photo-1534528741775?w=150&auto=format&fit=crop&q=80`,
    };
    setUsers((prev) => [userWithId, ...prev]);

    // If added user is a student, sync into classroom roster for Teacher Panel
    if (newUser.role === "Student") {
      const newRosterItem = {
        id: `STU-${Math.floor(100 + Math.random() * 900)}`,
        name: newUser.name,
        avatar: userWithId.avatar,
        rollNo: `10A-${Math.floor(10 + Math.random() * 90)}`,
        status: "Present",
        midterm: 90,
        assignment: 92,
        quiz: 88,
        finalGpa: "3.7 (A-)",
      };
      setRoster((prev) => [newRosterItem, ...prev]);
    }

    showToast(`Student / User ${newUser.name} created successfully!`, "success");
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User deleted from directory", "warning");
  };

  const toggleStudentAttendance = (studentId, status) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
    showToast(`Attendance updated for student`, "info");
  };

  const markMessageAsRead = (msgId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, unread: false } : m))
    );
  };

  const replyToMessage = (msgId, replyText) => {
    markMessageAsRead(msgId);
    showToast(`Reply sent successfully!`, "success");
    setActiveReplyMsg(null);
  };

  const payInvoice = (invoiceId) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, status: "Paid", paidDate: new Date().toLocaleDateString() }
          : inv
      )
    );
    showToast(`Invoice ${invoiceId} paid successfully! Payment receipt generated.`, "success");
    setActivePaymentInvoice(null);
  };

  const updateSetting = (key, val) => {
    setSystemSettings((prev) => ({ ...prev, [key]: val }));
    showToast(`System setting updated`, "info");
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole: handleRoleChange,
        theme,
        toggleTheme,
        adminTab,
        setAdminTab,
        teacherTab,
        setTeacherTab,
        parentTab,
        setParentTab,
        selectedChild,
        setSelectedChild,
        users,
        addUser,
        deleteUser,
        roster,
        toggleStudentAttendance,
        messages,
        markMessageAsRead,
        replyToMessage,
        invoices,
        payInvoice,
        systemSettings,
        updateSetting,
        toasts,
        showToast,
        removeToast,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isAddUserModalOpen,
        setIsAddUserModalOpen,
        activeReplyMsg,
        setActiveReplyMsg,
        activePaymentInvoice,
        setActivePaymentInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
