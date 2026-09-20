"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  BookOpen, CheckCircle2, Play, Clock, ArrowRight,
  ChevronRight, Download, Check, Code
} from "lucide-react";

export default function LearningRoadmapPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const roadmapModules = [
    {
      step: 1,
      title: "Python / Data Structures & Algorithms",
      desc: "Build strong programming fundamentals and problem-solving skills.",
      skills: ["Python", "DSA", "Problem Solving"],
      status: "Completed",
      hours: 4,
      color: "emerald",
    },
    {
      step: 2,
      title: "Web Development (HTML, CSS, JS, React)",
      desc: "Build dynamic web applications with modern frontend technologies.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      status: "In Progress",
      hours: 6,
      color: "amber",
    },
    {
      step: 3,
      title: "Backend Development (Node.js, Express)",
      desc: "Create REST APIs and handle databases with Node.js and Express.",
      skills: ["Node.js", "Express", "MongoDB"],
      status: "In Progress",
      hours: 5,
      color: "amber",
    },
    {
      step: 4,
      title: "AI & Machine Learning",
      desc: "Understand ML concepts and build simple models.",
      skills: ["ML Basics", "Pandas", "Scikit-learn"],
      status: "Not Started",
      hours: 6,
      color: "slate",
    },
    {
      step: 5,
      title: "System Design & Microservices",
      desc: "Learn scalable architecture and microservices with real-world patterns.",
      skills: ["Docker", "Kubernetes", "System Design"],
      status: "Not Started",
      hours: 5,
      color: "slate",
    },
    {
      step: 6,
      title: "Deploy & Build Real Projects",
      desc: "Deploy your applications and build a complete project portfolio.",
      skills: ["CI/CD", "AWS", "Project"],
      status: "Not Started",
      hours: 4,
      color: "slate",
    },
  ];

  const rightPanelPath = [
    { num: 1, title: "Python / Data Structures & Algorithms", status: "Completed", color: "emerald", hours: "4h" },
    { num: 2, title: "Web Development (HTML, CSS, JS, React)", status: "In Progress", color: "amber", hours: "6h" },
    { num: 3, title: "Backend Development (Node.js, Express)", status: "In Progress", color: "amber", hours: "5h" },
    { num: 4, title: "AI & Machine Learning", status: "Not Started", color: "slate", hours: "6h" },
    { num: 5, title: "System Design & Microservices", status: "Not Started", color: "slate", hours: "5h" },
    { num: 6, title: "Deploy & Build Real Projects", status: "Not Started", color: "slate", hours: "4h" },
  ];

  const completedCount = completedSteps.length;
  const totalCount = roadmapModules.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const toggleStep = (step: number) => {
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter(s => s !== step));
    } else {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const StatusBadge = ({ status, color }: { status: string; color: string }) => {
    const map: Record<string, string> = {
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      slate: "bg-slate-700/50 text-slate-400 border-slate-600/30",
    };
    return (
      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${map[color]}`}>
        {status}
      </span>
    );
  };

  const ActionButton = ({ step, status }: { step: number; status: string }) => {
    const isDone = completedSteps.includes(step);
    if (status === "Completed" || isDone) {
      return (
        <button
          onClick={() => toggleStep(step)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs hover:bg-emerald-500/30 transition"
        >
          <Check className="w-3.5 h-3.5" /> Review Module →
        </button>
      );
    }
    if (status === "In Progress") {
      return (
        <button
          onClick={() => toggleStep(step)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20"
        >
          Continue →
        </button>
      );
    }
    return (
      <button
        onClick={() => toggleStep(step)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0d162d] border border-blue-800/50 hover:border-cyan-500/40 text-slate-300 font-bold text-xs transition"
      >
        Start Module →
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 space-y-6 overflow-y-auto">

          {/* Hero Banner */}
          <div className="relative p-6 md:p-8 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#071126] via-[#091533]/80 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  AI Learning Roadmap
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  6-Phase Customized Gap Bridge Path
                </h1>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This roadmap adapts automatically as you complete interactive coding challenges
                  and pass verified skill tests.
                </p>

                {/* Phase chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { icon: "✅", label: "Foundations of LLMs & Embeddings Vectors", cls: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" },
                    { icon: "🐍", label: "Python & OpenAI API", cls: "bg-blue-500/10 border-blue-500/30 text-blue-300" },
                    { icon: "🔨", label: "Hands-on Projects & Real World Practice", cls: "bg-purple-500/10 border-purple-500/30 text-purple-300" },
                  ].map((chip) => (
                    <div
                      key={chip.label}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold ${chip.cls}`}
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress donut */}
              <div className="flex flex-col items-center gap-1 bg-[#0d162d] rounded-2xl border border-blue-800/60 p-4 shrink-0">
                <div className="text-xs text-slate-400 font-semibold">Total Progress</div>
                <div className="text-2xl font-black text-white mt-1">{progressPct}%</div>
                <div className="relative w-16 h-16 my-1">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22d3ee" strokeWidth="3"
                      strokeDasharray={`${progressPct} ${100 - progressPct}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-cyan-400">
                    {completedCount}/{totalCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen, label: "Total Modules", value: `${completedCount} / ${totalCount} Completed`,
                sub: `${progressPct}%`, note: "Keep going! You're on track.", barColor: "cyan", bar: progressPct
              },
              {
                icon: Clock, label: "Estimated Time", value: "12 Days",
                badge: "On Track", note: null, barColor: null, bar: null
              },
              {
                icon: "🛡️", label: "Skill Gaps", value: "2",
                note: "Focus on these areas.", barColor: null, bar: null
              },
              {
                icon: "📍", label: "Learning Path", value: "6 Phases",
                note: "Structured & personalized", barColor: null, bar: null
              },
            ].map((card, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg space-y-2">
                <div className="text-xs font-semibold text-slate-400">{card.label}</div>
                <div className="text-lg font-black text-white">{card.value}</div>
                {card.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {card.badge}
                  </span>
                )}
                {card.bar !== null && card.bar !== undefined && (
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="h-1.5 rounded-full bg-cyan-400" style={{ width: `${card.bar}%` }} />
                  </div>
                )}
                {card.note && <p className="text-[10px] text-slate-400">{card.note}</p>}
              </div>
            ))}
          </div>

          {/* Main 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: Roadmap list */}
            <div className="lg:col-span-2 space-y-3">
              {roadmapModules.map((module) => {
                const isDone = completedSteps.includes(module.step);
                return (
                  <div
                    key={module.step}
                    className={`p-5 rounded-2xl border transition-all ${
                      isDone
                        ? "bg-[#091022] border-emerald-500/30"
                        : module.status === "In Progress"
                        ? "bg-[#091022] border-cyan-500/50 shadow-lg shadow-cyan-500/5"
                        : "bg-[#091022] border-blue-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Step number + info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                          isDone
                            ? "bg-emerald-500 text-slate-950"
                            : module.status === "In Progress"
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : module.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-white text-sm">{module.title}</h3>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{module.desc}</p>
                          {/* Skill tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {module.skills.map((sk) => (
                              <span key={sk} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: status + hours + action */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <StatusBadge status={isDone ? "Completed" : module.status} color={isDone ? "emerald" : module.color} />
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{module.hours} Hours</span>
                        </div>
                        <ActionButton step={module.step} status={isDone ? "Completed" : module.status} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT Panel */}
            <div className="space-y-4">

              {/* Your Learning Path */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-extrabold text-white">Your Learning Path</h3>
                  <Link href="/dashboard/student/learning" className="text-xs text-cyan-400 font-bold hover:underline">View All</Link>
                </div>

                {rightPanelPath.map((item) => (
                  <div key={item.num} className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      item.color === "emerald" ? "bg-emerald-500 text-slate-950" :
                      item.color === "amber" ? "bg-blue-600/30 border border-cyan-500/40 text-cyan-300" :
                      "bg-slate-800 text-slate-500"
                    }`}>
                      {item.color === "emerald" ? <Check className="w-3 h-3 stroke-[3]" /> : item.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className={`text-[10px] font-bold ${
                          item.color === "emerald" ? "text-emerald-400" :
                          item.color === "amber" ? "text-amber-400" : "text-slate-500"
                        }`}>
                          {item.color === "emerald" ? "✓ Completed" :
                           item.color === "amber" ? "⊙ In Progress" : "○ Not Started"}
                        </span>
                        <span className="text-[10px] text-slate-500">{item.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivational Quote Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0e1f3d] to-[#091022] border border-blue-500/30 shadow-xl">
                <div className="text-3xl mb-3">🏔️</div>
                <p className="text-xs font-bold text-white">Small steps.</p>
                <p className="text-xs font-bold text-cyan-400">Big goals.</p>
                <p className="text-[11px] text-slate-400 mt-2 italic">
                  "The future belongs to those who learn, build and grow."
                </p>
              </div>

              {/* Download Roadmap PDF */}
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#091022] border border-blue-900/60 hover:border-cyan-500/40 transition group shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Download className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Download Roadmap PDF</div>
                    <div className="text-[10px] text-slate-400">Get your personalized roadmap</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
              </button>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
