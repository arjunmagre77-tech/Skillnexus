"use client";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { FolderKanban, CheckCircle2, Star, Clock, FileText } from "lucide-react";

export default function MentorReviewsPage() {
  const reviews = [
    {
      id: "rev_1",
      projectTitle: "Distributed Key-Value Store",
      studentName: "Aarav Sharma",
      submittedDate: "Today",
      skillsTested: ["Go", "Raft Consensus", "Docker"],
      status: "Pending Review",
    },
    {
      id: "rev_2",
      projectTitle: "AI Resume & Portfolio Analyzer",
      studentName: "Priya Sundaram",
      submittedDate: "Yesterday",
      skillsTested: ["React", "Python", "OpenAI API"],
      status: "Reviewed",
      score: "94/100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Project Reviews" 
          subtitle="Review student project submissions and issue industry skill verifications"
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-purple-400" />
                Submitted Projects for Verification ({reviews.length})
              </h3>
              <p className="text-xs text-slate-400 mt-1">Review code architecture, test coverage, and documentation</p>
            </div>

            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{r.projectTitle}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${r.status === "Reviewed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}>
                        {r.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Submitted by <span className="font-semibold text-white">{r.studentName}</span> · {r.submittedDate}</p>
                    <div className="flex gap-2 mt-2">
                      {r.skillsTested.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Opening submission for ${r.projectTitle}`)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs transition flex items-center justify-center gap-2 border border-slate-700 shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Review Code & Feedback</span>
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
