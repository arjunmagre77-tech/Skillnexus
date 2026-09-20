"use client";
import React from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import RadarChart from "@/components/dashboard/RadarChart";
import {
  Target, Flame, Star, ChevronRight, ArrowRight,
  Trophy, Clock, Briefcase, GraduationCap, ShieldCheck,
  TrendingUp, CheckCircle2
} from "lucide-react";

export default function StudentDashboardPage() {
  const [appliedJobIds, setAppliedJobIds] = React.useState<number[]>([]);

  const handleQuickApply = (id: number, role: string, company: string) => {
    if (!appliedJobIds.includes(id)) {
      setAppliedJobIds((prev) => [...prev, id]);
      alert(`Application submitted to ${company} for ${role} with your Verified Skill Vector!`);
    }
  };

  const studentData = {
    name: "Arjun",
    fullName: "Arjun Magre",
    location: "Student • Pune",
    skillsCompleted: 14,
    totalXp: 1250,
    streakDays: 5,
    verifiedBadges: 14,
    level: "Level 4",
    applicationsCount: 6 + appliedJobIds.length,
    overallProgress: 78,
  };

  const radarData = [
    { label: "AI & ML", value: 78 },
    { label: "Web Dev", value: 82 },
    { label: "System Design", value: 65 },
    { label: "DS & RAG", value: 45 },
    { label: "Script & Node.js", value: 80 },
    { label: "Python / PyTorch", value: 82 },
  ];

  const skillBreakdown = [
    { name: "AI & ML", icon: "🤖", level: 94, status: "Industry Ready", color: "emerald" },
    { name: "Full Stack (MERN)", icon: "⚛️", level: 89, status: "Industry Ready", color: "emerald" },
    { name: "ML Infrastructure", icon: "⚡", level: 82, status: "Industry Ready", color: "emerald" },
    { name: "System Design", icon: "⚙️", level: 65, status: "In Progress", color: "amber" },
    { name: "TypeScript & Node.js", icon: "🟨", level: 88, status: "Industry Ready", color: "emerald" },
    { name: "Vector DBs & RAG", icon: "🧠", level: 45, status: "High Priority", color: "rose" },
  ];

  const jobMatches = [
    {
      id: 1,
      role: "AI Systems Engineering Intern",
      company: "OpenAI Labs",
      logo: "🤖",
      logoBg: "from-emerald-600 to-teal-700",
      matchScore: 94,
      salary: "$3,500 / month",
      location: "Bengaluru • Remote",
    },
    {
      id: 2,
      role: "Full Stack Platform Engineer",
      company: "Stripe",
      logo: "S",
      logoBg: "from-violet-600 to-purple-700",
      matchScore: 89,
      salary: "$3,200 / month",
      location: "Bengaluru • Hybrid",
    },
    {
      id: 3,
      role: "Machine Learning Intern",
      company: "Google",
      logo: "G",
      logoBg: "from-blue-600 to-cyan-700",
      matchScore: 86,
      salary: "$3,000 / month",
      location: "Remote",
    },
  ];

  const mainLearningPath = [
    { num: 1, title: "Python / Data Structures & Algorithms", progress: 82, status: "Completed", color: "emerald" },
    { num: 2, title: "Web Development (HTML, CSS, JS, React)", progress: 65, status: "In Progress", color: "amber" },
    { num: 3, title: "Backend Development (Node.js, Express)", progress: 30, status: "In Progress", color: "amber" },
    { num: 4, title: "AI & Machine Learning", progress: 0, status: "High Priority", color: "rose" },
  ];

  const activeAiPath = [
    {
      title: "Mastering Vector DBs (Qdrant & Pinecone)",
      progress: 65,
      timeLeft: "4 hours left",
    },
    {
      title: "Microservices Architecture & System Design",
      progress: 30,
      timeLeft: "6 hours left",
    },
    {
      title: "Production LLM Fine-Tuning & Quantization",
      progress: 0,
      timeLeft: "6 hours left",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      {/* Sidebar */}
      <DashboardSidebar role="STUDENT" user={{ name: studentData.fullName }} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 space-y-6 overflow-y-auto">

          {/* Welcome Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 p-6 md:p-8 bg-[#0a1228] shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-right opacity-30 mix-blend-luminosity"
              style={{ backgroundImage: `url('/images/hero_banner.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071126] via-[#091533]/90 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  Welcome back, {studentData.name} <span className="animate-bounce inline-block">👋</span>
                </h1>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  Your skills, your journey. Build what's next.
                </p>

                {/* Hashtag Pills */}
                <div className="flex items-center gap-2 pt-1">
                  {["#BuildSkills", "#GetHired", "#Limitless"].map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Badge */}
              <div className="flex flex-col items-end justify-center self-start md:self-center">
                <div className="p-3 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-right backdrop-blur-md shadow-lg flex items-center gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">Small steps.</div>
                    <div className="text-xs font-bold text-cyan-400">Big goals.</div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1: Skills Completed */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Skills Completed</span>
                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white">{studentData.skillsCompleted}</span>
                  <span className="text-xs text-slate-400 font-semibold">/ {studentData.totalXp} XP</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full" style={{ width: "1%" }} />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">1%</span>
              </div>
            </div>

            {/* Card 2: Current Streak */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Current Streak</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-amber-400/30" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white">{studentData.streakDays} Days</span>
                  <Flame className="w-5 h-5 text-amber-400 fill-amber-400/30" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Keep going! 2 more days for next reward.</p>
              </div>
            </div>

            {/* Card 3: Verified Badges */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Verified Badges</span>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white">{studentData.verifiedBadges}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40">
                    {studentData.level}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Skills verified - {studentData.level}</p>
              </div>
            </div>

            {/* Card 4: Applications */}
            <Link
              href="/dashboard/student/applications"
              className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg flex items-center justify-between hover:border-cyan-500/50 transition group"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Applications</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{studentData.applicationsCount}</span>
                  <span className="text-[11px] text-slate-400 font-medium">In progress</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600/40 transition">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN (2 cols) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Skill Intelligence Radar */}
              <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                        <Target className="w-4 h-4" />
                      </span>
                      Skill Intelligence Radar
                    </h2>
                    <p className="text-xs text-slate-400">
                      Your skill profile at a glance. Identify strengths and focus on growth areas.
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-400">Overall Progress</div>
                    <div className="text-lg font-black text-cyan-400">{studentData.overallProgress}%</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-2 rounded-full"
                    style={{ width: `${studentData.overallProgress}%` }}
                  />
                </div>

                {/* Radar + Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-2">
                  <div className="flex justify-center">
                    <RadarChart data={radarData} size={290} />
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                      Skill Breakdown
                    </h3>
                    {skillBreakdown.map((sk) => (
                      <div key={sk.name} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0d162d] border border-slate-800/80">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-blue-600/20 flex items-center justify-center text-sm">
                            {sk.icon}
                          </div>
                          <span className="text-xs font-bold text-slate-200">{sk.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">{sk.level}%</span>
                          {sk.color === "emerald" && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                              ✓ Industry Ready
                            </span>
                          )}
                          {sk.color === "amber" && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 whitespace-nowrap">
                              ⊙ In Progress
                            </span>
                          )}
                          {sk.color === "rose" && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 whitespace-nowrap">
                              ● High Priority
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Internship & Job Matches */}
              <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-blue-600/20 text-cyan-400">
                        <Briefcase className="w-4 h-4" />
                      </span>
                      Top Internship & Job Matches for You
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Real opportunities from companies looking for candidates with your verified skill profile.
                    </p>
                  </div>
                  <Link href="/dashboard/student/jobs" className="text-xs text-cyan-400 hover:underline font-bold flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* 3 Job Cards horizontal */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {jobMatches.map((job) => {
                    const isApplied = appliedJobIds.includes(job.id);
                    return (
                      <div key={job.id} className="p-4 rounded-2xl bg-[#0d162d] border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col gap-3 group">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${job.logoBg} flex items-center justify-center text-base font-bold text-white shadow`}>
                            {job.logo}
                          </div>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {job.matchScore}% Match
                          </span>
                        </div>

                        {/* Info */}
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition leading-tight">
                            {job.role}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{job.company}</p>
                        </div>

                        <div className="text-[10px] text-slate-400 space-y-0.5">
                          <p className="text-emerald-400 font-bold">{job.salary}</p>
                          <p>{job.location}</p>
                        </div>

                        {isApplied ? (
                          <button disabled className="w-full py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1 cursor-default">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                          </button>
                        ) : (
                          <button
                            onClick={() => handleQuickApply(job.id, job.role, job.company)}
                            className="w-full py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-1 shadow-md"
                          >
                            Quick Apply <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">

              {/* Your Learning Path */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-white">Your Learning Path</h3>
                  <Link href="/dashboard/student/learning" className="text-xs text-cyan-400 hover:underline font-bold">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {mainLearningPath.map((item) => (
                    <div key={item.num} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.num}
                        </div>
                        <p className="text-xs font-bold text-white flex-1 truncate">{item.title}</p>
                      </div>
                      <div className="ml-7">
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${item.color === "emerald" ? "bg-emerald-400" : item.color === "amber" ? "bg-amber-400" : "bg-rose-400"}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[10px] text-slate-500">{item.progress}%</span>
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
                  className="w-full py-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 block"
                >
                  View Complete 6-Step Roadmap <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Active AI Learning Path */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
                        <Target className="w-3.5 h-3.5" />
                      </span>
                      Active AI Learning Path
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Customized for AI Engineer Target</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> 4 hours left
                  </span>
                </div>

                <div className="space-y-3">
                  {activeAiPath.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-[#0d162d] border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white leading-tight flex-1 pr-2">{item.title}</h4>
                        <span className="text-[10px] font-bold text-cyan-400 shrink-0">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-[10px] pt-0.5">
                        <span className="text-slate-400">{item.timeLeft}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30 font-semibold flex items-center gap-0.5 cursor-pointer">
                          {item.timeLeft} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard/student/learning"
                  className="w-full py-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 block"
                >
                  View Complete 6-Step Roadmap <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
