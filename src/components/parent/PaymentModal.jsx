import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ShieldCheck, Check, DollarSign, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers";

export default function PaymentModal() {
  const { activePaymentInvoice, setActivePaymentInvoice, payInvoice } = useApp();
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!activePaymentInvoice) return null;

  const handlePaySubmit = (e) => {
    e.preventDefault();
    payInvoice(activePaymentInvoice.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Tuition & Fee Payment Gateway</h3>
                <p className="text-xs text-slate-400">Invoice Ref: {activePaymentInvoice.id}</p>
              </div>
            </div>
            <button
              onClick={() => setActivePaymentInvoice(null)}
              className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fee Invoice Summary */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{activePaymentInvoice.term}</p>
                <p className="text-[10px] text-slate-400">Student: {activePaymentInvoice.student}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Due</span>
                <span className="text-xl font-extrabold text-emerald-400">
                  {formatCurrency(activePaymentInvoice.amount)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Select Payment Option</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    paymentMethod === "card"
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple")}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    paymentMethod === "apple"
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    paymentMethod === "bank"
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Bank Transfer
                </button>
              </div>
            </div>

            <form onSubmit={handlePaySubmit} className="space-y-4">
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      defaultValue="David Chen"
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="888"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Pay {formatCurrency(activePaymentInvoice.amount)}</span>
                </button>
              </div>
            </form>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
