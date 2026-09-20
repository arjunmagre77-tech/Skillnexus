"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Target, RefreshCw, CheckCircle2, AlertCircle, Play,
  ShieldCheck, ChevronRight, ArrowRight, Download, Code2, Eye
} from "lucide-react";

export default function SkillIntelligencePage() {
  const [selectedDomain, setSelectedDomain] = useState("AI & Software Engineering");

  const skillsData = [
    {
      name: "React / Next.js",
      icon: "⚛️",
      iconBg: "bg-cyan-500/20",
      level: 90, target: 85, verified: true,
      levelTitle: "Expert",
      date: "Verified 2 days ago",
      tags: ["Frontend", "Web Development"],
      tagColors: ["bg-cyan-500/20 text-cyan-300", "bg-blue-500/20 text-blue-300"],
    },
    {
      name: "Python & PyTorch",
      icon: "🐍",
      iconBg: "bg-blue-500/20",
      level: 82, target: 90, verified: true,
      levelTitle: "Advanced",
      date: "Verified 1 week ago",
      tags: ["AI / ML", "Data Science"],
      tagColors: ["bg-purple-500/20 text-purple-300", "bg-indigo-500/20 text-indigo-300"],
    },
    {
      name: "TypeScript & Node.js",
      icon: "🟨",
      iconBg: "bg-yellow-500/20",
      level: 88, target: 80, verified: true,
      levelTitle: "Advanced",
      date: "Verified 2 weeks ago",
      tags: ["Backend", "Web Development"],
      tagColors: ["bg-green-500/20 text-green-300", "bg-blue-500/20 text-blue-300"],
    },
    {
      name: "System Design & Microservices",
      icon: "☁️",
      iconBg: "bg-slate-500/20",
      level: 65, target: 82, verified: false,
      levelTitle: "Intermediate",
      gap: 17,
      tags: ["Architecture", "DevOps"],
      tagColors: ["bg-orange-500/20 text-orange-300", "bg-slate-500/20 text-slate-300"],
    },
    {
      name: "Docker & Kubernetes",
      icon: "🐳",
      iconBg: "bg-blue-500/20",
      level: 50, target: 75, verified: false,
      levelTitle: "Intermediate",
      gap: 25,
      tags: ["DevOps", "Cloud"],
      tagColors: ["bg-orange-500/20 text-orange-300", "bg-sky-500/20 text-sky-300"],
    },
    {
      name: "GraphQL & REST APIs",
      icon: "🔮",
      iconBg: "bg-pink-500/20",
      level: 92, target: 80, verified: true,
      levelTitle: "Expert",
      date: "Verified 3 weeks ago",
      tags: ["Backend", "APIs"],
      tagColors: ["bg-green-500/20 text-green-300", "bg-pink-500/20 text-pink-300"],
    },
    {
      name: "SQL & PostgreSQL",
      icon: "🗄️",
      iconBg: "bg-emerald-500/20",
      level: 85, target: 80, verified: true,
      levelTitle: "Advanced",
      date: "Verified 1 month ago",
      tags: ["Database", "Data Management"],
      tagColors: ["bg-emerald-500/20 text-emerald-300", "bg-teal-500/20 text-teal-300"],
    },
    {
      name: "Vector DBs & RAG",
      icon: "🧠",
      iconBg: "bg-rose-500/20",
      level: 45, target: 85, verified: false,
      levelTitle: "Beginner",
      gap: 40,
      tags: ["AI Infra", "ML"],
      tagColors: ["bg-rose-500/20 text-rose-300", "bg-violet-500/20 text-violet-300"],
    },
  ];

  const learningPath = [
    { num: 1, title: "Python / Data Structures & Algorithms", progress: 82, status: "Completed", color: "emerald" },
    { num: 2, title: "Web Development (HTML, CSS, JS, React)", progress: 65, status: "In Progress", color: "amber" },
    { num: 3, title: "Backend Development (Node.js, Express)", progress: 30, status: "In Progress", color: "amber" },
    { num: 4, title: "AI & Machine Learning", progress: 0, status: "High Priority", color: "rose" },
  ];

  const verifiedCount = skillsData.filter(s => s.verified).length;
  const gapCount = skillsData.filter(s => !s.verified).length;

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 space-y-6 overflow-y-auto">

          {/* Header */}
          <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Skill Mapping Domain
                </span>
                <h1 className="text-2xl font-black text-white">
                  Target Domain: {selectedDomain}
                </h1>
                <p className="text-xs text-slate-400 max-w-xl">
                  Compare your skills with industry benchmarks, track your progress and get personalized
                  recommendations to bridge the gaps.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-[#0d162d] border border-blue-800/60 text-xs text-white rounded-xl px-4 py-2.5 focus:border-cyan-500 focus:outline-none"
                >
                  <option>AI & Software Engineering</option>
                  <option>Data Science & ML</option>
                  <option>Full Stack Web Development</option>
                  <option>Cloud & DevOps Engineering</option>
                </select>

                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Re-sync Vector
                </button>
              </div>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "🎯", label: "Total Skills", value: skillsData.length,
                sub: `/ ${skillsData.length} Mapped`, bar: 100, color: "cyan",
                desc: "100%"
              },
              {
                icon: "✅", label: "Verified Skills", value: verifiedCount,
                sub: "50%", bar: 50, color: "emerald",
                desc: `Keep going! ${gapCount} more to verify.`
              },
              {
                icon: "🛡️", label: "Skill Gaps", value: gapCount,
                sub: "50%", bar: 50, color: "rose",
                desc: "Focus on these areas."
              },
              {
                icon: "📈", label: "Learning Path", value: 3,
                sub: "Recommended", bar: null, color: "blue",
                desc: null, link: true
              },
            ].map((card) => (
              <div key={card.label} className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{card.label}</span>
                  <span className="text-lg">{card.icon}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white">{card.value}</span>
                  <span
                    className={`text-xs font-bold ${
                      card.color === "cyan"
                        ? "text-cyan-400"
                        : card.color === "emerald"
                        ? "text-emerald-400"
                        : card.color === "rose"
                        ? "text-rose-400"
                        : "text-blue-400"
                    }`}
                  >
                    {card.sub}
                  </span>
                </div>
                {card.bar !== null && (
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        card.color === "cyan"
                          ? "bg-cyan-500"
                          : card.color === "emerald"
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${card.bar}%` }}
                    />
                  </div>
                )}
                {card.desc && <p className="text-[10px] text-slate-400">{card.desc}</p>}
                {card.link && (
                  <Link href="/dashboard/student/learning" className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
                    Recommended <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Main 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: Skill Matrix (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h2 className="text-base font-extrabold text-white">Verified Skill Matrix & Proofs</h2>
                      <p className="text-xs text-slate-400">Your skills validated through assessments, peer reviews and real project work.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">{verifiedCount} / {skillsData.length} Verified</span>
                    <button className="text-cyan-400 font-bold hover:underline flex items-center gap-1">
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {skillsData.map((sk) => (
                    <div
                      key={sk.name}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0d162d] border border-slate-800/80 hover:border-blue-700/40 transition"
                    >
                      {/* Left: icon + name + tags */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-xl ${sk.iconBg} flex items-center justify-center text-base shrink-0 border border-white/5`}>
                          {sk.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white">{sk.name}</span>
                            {sk.tags.map((tag, i) => (
                              <span key={tag} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sk.tagColors[i]}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Level: <strong className="text-slate-200">{sk.levelTitle} ({sk.level}%)</strong>
                            {" | "}Target: {sk.target}%
                          </p>
                        </div>
                      </div>

                      {/* Middle: verified badge */}
                      <div className="shrink-0">
                        {sk.verified ? (
                          <div className="text-right">
                            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                            <p className="text-[9px] text-slate-500 mt-1">{sk.date}</p>
                          </div>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <AlertCircle className="w-3 h-3" /> Unverified Gap
                          </span>
                        )}
                      </div>

                      {/* Right: action button */}
                      <div className="shrink-0">
                        {sk.verified ? (
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a1228] border border-blue-800/60 hover:border-cyan-500/40 text-cyan-300 font-bold text-xs transition">
                            <Eye className="w-3.5 h-3.5" />
                            View Proofs
                          </button>
                        ) : (
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition shadow-md">
                            <Play className="w-3 h-3 fill-slate-950" />
                            Take Skill Test
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-4">

              {/* Your Learning Path */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-extrabold text-white">Your Learning Path</h3>
                  <Link href="/dashboard/student/learning" className="text-xs text-cyan-400 font-bold hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {learningPath.map((item) => (
                    <div key={item.num} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.num}
                        </div>
                        <span className="text-xs font-semibold text-white flex-1 truncate">{item.title}</span>
                      </div>
                      <div className="ml-7">
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${item.color === "emerald" ? "bg-emerald-400" : item.color === "amber" ? "bg-amber-400" : "bg-rose-400"}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[10px] text-slate-400">{item.progress}%</span>
                          <span className={`text-[10px] font-bold ${item.color === "emerald" ? "text-emerald-400" : item.color === "amber" ? "text-amber-400" : "text-rose-400"}`}>
                            {item.color === "emerald" ? "✓ Completed" : item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard/student/learning"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/40 hover:from-blue-600/50 hover:to-indigo-600/50 text-cyan-300 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 block"
                >
                  View Complete 6-Step Roadmap <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <span className="text-yellow-400">⚡</span>
                  <h3 className="text-sm font-extrabold text-white">Quick Actions</h3>
                </div>

                {[
                  { icon: Code2, label: "Review Code & Feedback", sub: "AI-powered suggestions", bg: "bg-cyan-500/20", color: "text-cyan-400" },
                  { icon: Play, label: "Take Skill Test", sub: "Validate your knowledge", bg: "bg-indigo-500/20", color: "text-indigo-400" },
                  { icon: Download, label: "Download Progress Report", sub: "PDF report of your skill mapping", bg: "bg-emerald-500/20", color: "text-emerald-400" },
                ].map(({ icon: Icon, label, sub, bg, color }) => (
                  <button key={label} className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#0d162d] border border-slate-800/80 hover:border-cyan-500/30 transition group text-left">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{label}</div>
                        <div className="text-[10px] text-slate-400">{sub}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                  </button>
                ))}
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
