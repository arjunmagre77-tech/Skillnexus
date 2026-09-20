"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  ClipboardList, Play, Clock, CheckCircle2, ArrowRight,
  ChevronRight, Award
} from "lucide-react";

type TabType = "available" | "completed";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("available");

  const assessments = [
    {
      id: "ass_1",
      title: "Vector DBs & RAG System Optimization",
      category: "AI Infrastructure",
      duration: "60 mins",
      questionsCount: 15,
      difficulty: "Technical",
      difficultyColor: "violet",
      rewardXP: 500,
      badgeIcon: "⚙️",
      badgeColor: "from-violet-600 to-indigo-700",
      completed: false,
      description: "Test your knowledge on vector databases, RAG architecture and optimization techniques.",
      tags: ["RAG", "Vector DBs", "Embeddings", "+2"],
    },
    {
      id: "ass_2",
      title: "System Design for High Scale Services",
      category: "Software Architecture",
      duration: "90 mins",
      questionsCount: 10,
      difficulty: "Advanced",
      difficultyColor: "amber",
      rewardXP: 600,
      badgeIcon: "⚡",
      badgeColor: "from-amber-600 to-orange-700",
      completed: false,
      description: "Evaluate your understanding of scaling systems, microservices, load balancing and high availability.",
      tags: ["Architecture", "Microservices", "Scalability", "+2"],
    },
    {
      id: "ass_3",
      title: "Advanced React & Next.js 14 System Test",
      category: "Frontend Architecture",
      duration: "45 mins",
      questionsCount: 20,
      difficulty: "Advanced",
      difficultyColor: "cyan",
      rewardXP: 300,
      badgeIcon: "⚛️",
      badgeColor: "from-cyan-600 to-blue-700",
      completed: true,
      score: 94,
      description: "Deep dive into React 18 concurrent features, Next.js App Router and performance patterns.",
      tags: ["React", "Next.js", "TypeScript", "+1"],
    },
    {
      id: "ass_4",
      title: "Python Data Science & PyTorch Tensor Ops",
      category: "Machine Learning",
      duration: "50 mins",
      questionsCount: 25,
      difficulty: "Intermediate",
      difficultyColor: "emerald",
      rewardXP: 250,
      badgeIcon: "🐍",
      badgeColor: "from-emerald-600 to-teal-700",
      completed: true,
      score: 88,
      description: "Validate your Python ML skills including NumPy, Pandas and PyTorch fundamentals.",
      tags: ["Python", "PyTorch", "ML", "+1"],
    },
  ];

  const recentActivity = [
    { icon: "🐍", name: "Python & PyTorch", status: "Passed", statusColor: "emerald", score: "85%", time: "2 days ago" },
    { icon: "⚛️", name: "React / Next.js", status: "In Progress", statusColor: "amber", score: "60%", time: "1 week ago" },
    { icon: "🗄️", name: "System Design", status: "Passed", statusColor: "emerald", score: "82%", time: "2 weeks ago" },
    { icon: "💾", name: "Vector DBs & RAG", status: "In Progress", statusColor: "amber", score: "45%", time: "3 weeks ago" },
  ];

  const available = assessments.filter(a => !a.completed);
  const completed = assessments.filter(a => a.completed);
  const displayed = activeTab === "available" ? available : completed;

  const DifficultyBadge = ({ difficulty, color }: { difficulty: string; color: string }) => {
    const map: Record<string, string> = {
      violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    };
    return (
      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${map[color]}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 space-y-6 overflow-y-auto">

          {/* Hero Banner */}
          <div className="relative p-6 rounded-3xl bg-[#091022] border border-blue-900/60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#071126] via-[#091533]/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-48 opacity-20"
              style={{ background: "radial-gradient(ellipse at right top, #7c3aed50, transparent)" }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Assessments & Quizzes</span>
                  <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">
                    Test Your Skills, Track Your Progress
                  </h1>
                  <p className="text-xs text-slate-300 mt-1 max-w-lg">
                    Take quizzes, complete assessments and earn certifications to showcase your skills and stand out.
                  </p>
                </div>
              </div>

              {/* Mini stat cards */}
              <div className="flex items-center gap-4 shrink-0">
                {[
                  { value: 3, label: "Completed", icon: "✅" },
                  { value: 2, label: "In Progress", icon: "⏳" },
                  { value: 1, label: "Certificates Earned", icon: "🏆" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}

                {/* Mountain badge */}
                <div className="hidden lg:flex flex-col items-center p-3 rounded-2xl bg-blue-950/80 border border-blue-500/30 text-center">
                  <div className="text-2xl">🏔️</div>
                  <div className="text-[10px] font-bold text-white mt-1">Small steps.</div>
                  <div className="text-[10px] font-bold text-cyan-400">Big achievements.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: Tabs + Assessment list */}
            <div className="lg:col-span-2 space-y-4">

              {/* Tab Pills */}
              <div className="flex items-center gap-2">
                {[
                  { label: `Available Tests (${available.length})`, value: "available" as TabType },
                  { label: `Passed & Verified (${completed.length})`, value: "completed" as TabType },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.value
                        ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                        : "bg-[#091022] text-slate-400 border border-blue-900/50 hover:text-white hover:border-cyan-500/30"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Assessment Cards */}
              <div className="space-y-4">
                {displayed.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#091022] border border-blue-900/50 hover:border-cyan-500/30 transition-all shadow-lg group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.badgeColor} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                        {item.badgeIcon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <DifficultyBadge difficulty={item.difficulty} color={item.difficultyColor} />
                          {item.completed && item.score && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              ✓ Passed — {item.score}%
                            </span>
                          )}
                          <span className="ml-auto text-xs font-black text-amber-400">⭐ +{item.rewardXP} XP</span>
                        </div>
                        <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition">{item.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta + Actions */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-cyan-400" />
                              {item.duration}
                            </span>
                            <span>{item.questionsCount} Questions</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                              View Details <ArrowRight className="w-3 h-3" />
                            </button>
                            {!item.completed ? (
                              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20">
                                <Play className="w-3.5 h-3.5 fill-white" />
                                Start Test
                              </button>
                            ) : (
                              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                View Certificate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Progress + Recent Activity */}
            <div className="space-y-4">

              {/* Your Progress */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-extrabold text-white">Your Progress</h3>
                  </div>
                  <Link href="#" className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Donut */}
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22d3ee" strokeWidth="3"
                        strokeDasharray="25 75" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-black text-white">25%</span>
                      <span className="text-[9px] text-slate-400">Overall</span>
                      <span className="text-[9px] text-slate-400">Completion</span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />Completed
                      </span>
                      <span className="font-bold text-white">3</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />In Progress
                      </span>
                      <span className="font-bold text-white">2</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block" />Not Started
                      </span>
                      <span className="font-bold text-white">7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-extrabold text-white">Recent Activity</h3>
                </div>

                {recentActivity.map((act) => (
                  <div key={act.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0d162d] border border-slate-800 flex items-center justify-center text-base shrink-0">
                      {act.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{act.name}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-semibold ${act.statusColor === "emerald" ? "text-emerald-400" : "text-amber-400"}`}>
                          {act.status} • {act.score}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
