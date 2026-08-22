import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getGpaBadgeColor(gpa) {
  if (gpa >= 3.8) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (gpa >= 3.2) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
  if (gpa >= 2.5) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  return "bg-rose-500/10 text-rose-400 border-rose-500/30";
}

export function getGradeColor(grade) {
  if (grade.startsWith("A")) return "text-emerald-400 font-bold";
  if (grade.startsWith("B")) return "text-indigo-400 font-bold";
  if (grade.startsWith("C")) return "text-amber-400 font-semibold";
  return "text-rose-400 font-semibold";
}

export function downloadCSV(data, filename = "export.csv") {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
