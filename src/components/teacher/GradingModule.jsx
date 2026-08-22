import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, FileText, CheckCircle2, Save, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { downloadCSV, getGradeColor } from "../../utils/helpers";

export default function GradingModule() {
  const { roster, showToast } = useApp();
  const [grades, setGrades] = useState(roster);

  const handleScoreChange = (id, field, val) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    setGrades((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          const updated = { ...student, [field]: num };
          const avg = Math.round((updated.midterm + updated.assignment + updated.quiz) / 3);
          let gpa = "4.0 (A+)";
          if (avg < 70) gpa = "2.1 (C-)";
          else if (avg < 80) gpa = "3.0 (B)";
          else if (avg < 90) gpa = "3.4 (B+)";
          else if (avg < 95) gpa = "3.8 (A-)";
          return { ...updated, finalGpa: gpa };
        }
        return student;
      })
    );
  };

  const handleSaveGrades = () => {
    showToast("Gradebook saved and synced with student portals!", "success");
  };

  const handleExportReportCard = () => {
    downloadCSV(grades, "Grade10A_Mathematics_ReportCards.csv");
    showToast("Report cards exported to CSV", "success");
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Gradebook & Assessment Scorecard</h2>
          <p className="text-xs text-slate-400 mt-1">Grade 10-A Mathematics • Term 1 Evaluation Grid</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportReportCard}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs transition-all"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export Report Cards</span>
          </button>
          <button
            onClick={handleSaveGrades}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Gradebook Data Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Roll No</th>
                <th className="p-4">Midterm Exam (40%)</th>
                <th className="p-4">Assignment (30%)</th>
                <th className="p-4">Quiz Average (30%)</th>
                <th className="p-4">Calculated GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {grades.map((student) => (
                <tr key={student.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                      <span className="font-bold text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400 font-bold">{student.rollNo}</td>
                  
                  {/* Midterm Input */}
                  <td className="p-4">
                    <input
                      type="number"
                      value={student.midterm}
                      onChange={(e) => handleScoreChange(student.id, "midterm", e.target.value)}
                      className="w-20 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-extrabold focus:outline-none focus:border-indigo-500"
                    />
                  </td>

                  {/* Assignment Input */}
                  <td className="p-4">
                    <input
                      type="number"
                      value={student.assignment}
                      onChange={(e) => handleScoreChange(student.id, "assignment", e.target.value)}
                      className="w-20 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-extrabold focus:outline-none focus:border-indigo-500"
                    />
                  </td>

                  {/* Quiz Input */}
                  <td className="p-4">
                    <input
                      type="number"
                      value={student.quiz}
                      onChange={(e) => handleScoreChange(student.id, "quiz", e.target.value)}
                      className="w-20 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-extrabold focus:outline-none focus:border-indigo-500"
                    />
                  </td>

                  {/* Calculated Badge */}
                  <td className="p-4">
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 font-extrabold border border-indigo-500/30">
                      {student.finalGpa}
                    </span>
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
