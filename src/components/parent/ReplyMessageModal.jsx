import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Paperclip, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ReplyMessageModal() {
  const { activeReplyMsg, setActiveReplyMsg, replyToMessage } = useApp();
  const [replyText, setReplyText] = useState("");

  if (!activeReplyMsg) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    replyToMessage(activeReplyMsg.id, replyText);
    setReplyText("");
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
              <img src={activeReplyMsg.avatar} alt={activeReplyMsg.sender} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
              <div>
                <h3 className="text-base font-extrabold text-white">Reply to {activeReplyMsg.sender}</h3>
                <p className="text-xs text-slate-400">{activeReplyMsg.role}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveReplyMsg(null)}
              className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Original Message Preview */}
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 text-xs space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase">Subject: {activeReplyMsg.subject}</span>
            <p className="text-slate-300 line-clamp-2 italic">"{activeReplyMsg.fullMessage}"</p>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Direct Reply</label>
              <textarea
                required
                rows={4}
                placeholder="Type your message to the instructor..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Attach File</span>
              </button>

              <button
                type="submit"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Send Reply</span>
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
