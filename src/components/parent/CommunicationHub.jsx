import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Reply, CheckCheck, Filter, Clock } from "lucide-react";
import ChildSelectorHeader from "./ChildSelectorHeader";
import ReplyMessageModal from "./ReplyMessageModal";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/helpers";

export default function CommunicationHub() {
  const { messages, markMessageAsRead, setActiveReplyMsg, selectedChild } = useApp();
  const [filterUnread, setFilterUnread] = useState(false);

  const filteredMessages = messages.filter((msg) => {
    if (filterUnread && !msg.unread) return false;
    return msg.childName === selectedChild.name;
  });

  return (
    <div className="space-y-8">
      <ChildSelectorHeader />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center">
            <MessageSquare className="w-5 h-5 text-indigo-400 mr-2" />
            Direct Messages & Notes Feed ({filteredMessages.length})
          </h3>
          <p className="text-xs text-slate-400">Communication log with faculty & administrators</p>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setFilterUnread((prev) => !prev)}
          className={cn(
            "px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5",
            filterUnread
              ? "bg-indigo-600 border-indigo-500 text-white"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
          )}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{filterUnread ? "Showing Unread Only" : "Filter Unread"}</span>
        </button>
      </div>

      {/* Messages Feed List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center text-slate-400 italic">
            No messages found for {selectedChild.name}.
          </div>
        ) : (
          filteredMessages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              onClick={() => markMessageAsRead(msg.id)}
              className={cn(
                "glass-card p-6 rounded-3xl border transition-all duration-200 relative overflow-hidden space-y-3 cursor-pointer",
                msg.unread
                  ? "bg-indigo-950/30 border-indigo-500/40 shadow-xl shadow-indigo-500/10"
                  : "border-slate-800"
              )}
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <img src={msg.avatar} alt={msg.sender} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-extrabold text-white">{msg.sender}</h4>
                      {msg.unread && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                          UNREAD
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{msg.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{msg.time}</span>
                </div>
              </div>

              {/* Subject & Full Text */}
              <div>
                <h5 className="text-sm font-bold text-indigo-300">{msg.subject}</h5>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{msg.fullMessage}</p>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold">Regarding Student: <strong className="text-white">{msg.childName}</strong></span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveReplyMsg(msg);
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold border border-indigo-500/30"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply Direct</span>
                </button>
              </div>

            </motion.div>
          ))
        )}
      </div>

      <ReplyMessageModal />
    </div>
  );
}
