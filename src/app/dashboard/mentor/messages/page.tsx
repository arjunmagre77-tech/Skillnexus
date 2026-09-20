"use client";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";

export default function MentorMessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Aarav Sharma", text: "Hello Dr. Sethi! I submitted the Raft implementation PR. Looking forward to our session!", time: "10:30 AM" },
    { id: 2, sender: "You", text: "Hi Aarav, looks good! I will review the log replication logic before our 5 PM call.", time: "11:15 AM" },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: inputMsg, time: "Just now" }]);
    setInputMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Mentor Messages" 
          subtitle="Direct communication with your mentees"
        />

        <main className="p-6 space-y-6 overflow-y-auto flex-1 flex flex-col">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex-1 flex flex-col justify-between space-y-4 min-h-[450px]">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                  AS
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Aarav Sharma</h3>
                  <p className="text-[11px] text-slate-400">IIT Bombay · Mentee</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                Active Now
              </span>
            </div>

            {/* Chat List */}
            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === "You" ? "items-end" : "items-start"}`}>
                  <div className={`p-3.5 rounded-2xl text-xs max-w-md ${m.sender === "You" ? "bg-cyan-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none"}`}>
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Send Input */}
            <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-slate-800">
              <input 
                type="text"
                placeholder="Type your message to Aarav..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
