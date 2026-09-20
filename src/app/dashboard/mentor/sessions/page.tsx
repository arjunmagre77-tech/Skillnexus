"use client";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { Calendar, Clock, Video, CheckCircle2, User, Star } from "lucide-react";

export default function MentorSessionsPage() {
  const sessions = [
    {
      id: "ses_1",
      studentName: "Aarav Sharma",
      college: "IIT Bombay",
      topic: "Code Review: Vector Search Engine Micro-Project",
      date: "Today @ 5:00 PM IST",
      avatar: "AS",
      status: "Confirmed",
      type: "Code Review",
    },
    {
      id: "ses_2",
      studentName: "Priya Sundaram",
      college: "BITS Pilani",
      topic: "System Design Mock Interview & Feedback",
      date: "Tomorrow @ 3:00 PM IST",
      avatar: "PS",
      status: "Confirmed",
      type: "Mock Interview",
    },
    {
      id: "ses_3",
      studentName: "Rohan Gupta",
      college: "NIT Trichy",
      topic: "Career Guidance: Transitioning to AI Engineer",
      date: "Sep 24 @ 4:00 PM IST",
      avatar: "RG",
      status: "Upcoming",
      type: "Career Advisory",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Mentee Sessions" 
          subtitle="Manage scheduled 1-on-1 sessions, code reviews, and mock interviews"
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  All Scheduled Sessions ({sessions.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">Connect with students and conduct live evaluations</p>
              </div>
            </div>

            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm border border-cyan-500/30">
                      {s.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{s.studentName}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {s.college}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {s.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{s.topic}</p>
                      <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 mt-1">
                        <Clock className="w-3.5 h-3.5" /> {s.date}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Launching session for ${s.studentName}`)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Session</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
