"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  FolderKanban, Sparkles, Users, Award, Code, 
  ExternalLink, CheckCircle2, Clock, Play
} from "lucide-react";

export default function IndustryProjectsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active">("all");

  const projects = [
    {
      id: "prj_1",
      company: "Google Cloud",
      title: "Build an Enterprise RAG Pipeline with Qdrant & Vertex AI",
      bounty: "$1,500 Bounty + Direct Interview",
      duration: "2 Weeks",
      domain: "AI Engineering",
      difficulty: "Advanced",
      skills: ["Python", "Qdrant", "Vertex AI", "FastAPI"],
      participantsCount: 84,
      status: "Open for Submissions",
      deadline: "5 days left",
    },
    {
      id: "prj_2",
      company: "Stripe",
      title: "Implement Idempotent Payment Webhook Dispatcher",
      bounty: "$1,000 Bounty",
      duration: "1 Week",
      domain: "Backend Systems",
      difficulty: "Intermediate",
      skills: ["TypeScript", "Redis", "Node.js"],
      participantsCount: 120,
      status: "Open for Submissions",
      deadline: "8 days left",
    },
    {
      id: "prj_3",
      company: "Vercel",
      title: "Edge Cached Dynamic Image Generation Microservice",
      bounty: "$800 Bounty + Vercel Swag",
      duration: "3 Days",
      domain: "Frontend Infra",
      difficulty: "Intermediate",
      skills: ["Next.js", "WebAssembly", "TailwindCSS"],
      participantsCount: 230,
      status: "Open for Submissions",
      deadline: "2 days left",
    }
  ];

  const handleJoinProject = (title: string) => {
    alert(`Enrolled in Industry Micro-Project: "${title}". GitHub repository instructions sent to email!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Industry Live Micro-Projects & Bounties" 
          subtitle="Gain real-world experience building production features for tech companies."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Industry Collaboration</span>
              <h2 className="text-2xl font-black text-white">Solve Real Company Code Problems</h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Submit working pull requests, get peer reviewed by senior industry engineers, and skip initial recruitment screens.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center">
              <Code className="w-6 h-6 mx-auto mb-1 text-cyan-400" />
              <span className="text-xs font-bold block">100% Verifiable Proof of Work</span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col justify-between space-y-4 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">{p.company}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {p.domain}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">{p.title}</h3>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-xs font-extrabold text-emerald-400">🏆 {p.bounty}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span><Clock className="w-3 h-3 text-cyan-400 inline" /> {p.duration}</span>
                      <span>• {p.deadline}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] text-slate-400 font-semibold">Tech Stack Required:</div>
                    <div className="flex flex-wrap gap-1">
                      {p.skills.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinProject(p.title)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Join Project & Claim Spec</span>
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
