import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Toast from "./components/common/Toast";
import CommandPalette from "./components/common/CommandPalette";

// Admin Views
import AdminOverview from "./components/admin/AdminOverview";
import UserManagementTable from "./components/admin/UserManagementTable";
import AddUserModal from "./components/admin/AddUserModal";
import AnalyticsSection from "./components/admin/AnalyticsSection";
import SystemSettings from "./components/admin/SystemSettings";

// Teacher Views
import ClassroomGrid from "./components/teacher/ClassroomGrid";
import AttendanceTracker from "./components/teacher/AttendanceTracker";
import GradingModule from "./components/teacher/GradingModule";
import ScheduleTimeline from "./components/teacher/ScheduleTimeline";

// Parent Views
import AcademicOverview from "./components/parent/AcademicOverview";
import AttendanceHeatmap from "./components/parent/AttendanceHeatmap";
import CommunicationHub from "./components/parent/CommunicationHub";
import FeeTracker from "./components/parent/FeeTracker";

function DashboardContent() {
  const { currentRole, adminTab, teacherTab, parentTab } = useApp();

  const renderView = () => {
    if (currentRole === "admin") {
      switch (adminTab) {
        case "overview": return <AdminOverview />;
        case "users": return <UserManagementTable />;
        case "analytics": return <AnalyticsSection />;
        case "settings": return <SystemSettings />;
        default: return <AdminOverview />;
      }
    }

    if (currentRole === "teacher") {
      switch (teacherTab) {
        case "classes": return <ClassroomGrid />;
        case "attendance": return <AttendanceTracker />;
        case "grading": return <GradingModule />;
        case "schedule": return <ScheduleTimeline />;
        default: return <ClassroomGrid />;
      }
    }

    if (currentRole === "parent") {
      switch (parentTab) {
        case "academic": return <AcademicOverview />;
        case "attendance": return <AttendanceHeatmap />;
        case "messages": return <CommunicationHub />;
        case "fees": return <FeeTracker />;
        default: return <AcademicOverview />;
      }
    }

    return <AdminOverview />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${currentRole}-${adminTab}-${teacherTab}-${parentTab}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        
        {/* Fixed Header */}
        <Header />

        {/* Layout Body */}
        <div className="flex flex-1 relative">
          
          {/* Collapsible Sidebar */}
          <Sidebar />

          {/* Main Dashboard Workspace */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
            <DashboardContent />
          </main>

        </div>

        {/* Global Floating Components & Modals */}
        <AddUserModal />
        <CommandPalette />
        <Toast />

      </div>
    </AppProvider>
  );
}
