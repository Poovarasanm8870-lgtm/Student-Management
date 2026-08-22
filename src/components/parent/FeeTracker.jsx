import React from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Download, CheckCircle2, Clock, ShieldCheck, FileText } from "lucide-react";
import ChildSelectorHeader from "./ChildSelectorHeader";
import PaymentModal from "./PaymentModal";
import { useApp } from "../../context/AppContext";
import { formatCurrency, cn } from "../../utils/helpers";

export default function FeeTracker() {
  const { invoices, setActivePaymentInvoice, selectedChild, showToast } = useApp();

  const childInvoices = invoices.filter((inv) => inv.student === selectedChild.name);
  const pendingTotal = childInvoices
    .filter((inv) => inv.status === "Pending")
    .reduce((acc, inv) => acc + inv.amount, 0);

  const handleDownloadInvoice = (invId) => {
    showToast(`Downloading PDF Invoice #${invId}...`, "success");
  };

  return (
    <div className="space-y-8">
      <ChildSelectorHeader />

      {/* Hero Financial Balance Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Account Balance Summary
          </span>
          <h3 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            {formatCurrency(pendingTotal)}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Outstanding tuition balance for {selectedChild.name}</p>
        </div>

        {pendingTotal > 0 ? (
          <button
            onClick={() => setActivePaymentInvoice(childInvoices.find((i) => i.status === "Pending"))}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Outstanding Invoice Now</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>All Semester Fees Paid Up</span>
          </div>
        )}
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center">
          <FileText className="w-5 h-5 text-indigo-400 mr-2" />
          Semester Tuition Statements & Receipts ({childInvoices.length})
        </h3>

        <div className="space-y-4">
          {childInvoices.map((inv, idx) => {
            const isPaid = inv.status === "Paid";

            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-indigo-400">{inv.id}</span>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase",
                          isPaid ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        )}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-white mt-1">{inv.term}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Due Date: {inv.dueDate}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-extrabold text-white">{formatCurrency(inv.amount)}</span>
                    {isPaid && <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Paid on {inv.paidDate}</p>}
                  </div>
                </div>

                {/* Itemized Cost Breakdown */}
                <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/60 text-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fee Itemization</p>
                  {inv.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <span>{item.item}</span>
                      <span className="font-semibold">{formatCurrency(item.cost)}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => handleDownloadInvoice(inv.id)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Download Receipt</span>
                  </button>

                  {!isPaid && (
                    <button
                      onClick={() => setActivePaymentInvoice(inv)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Invoice</span>
                    </button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      <PaymentModal />
    </div>
  );
}
