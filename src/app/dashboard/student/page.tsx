"use client";
import React from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import RadarChart from "@/components/dashboard/RadarChart";
import { 
  Target, Flame, Star, ChevronRight, ArrowRight,
  Trophy, Code, FileText, Users, Clock, Briefcase
} from "lucide-react";

export default function StudentDashboardPage() {
  const studentData = {
    name: "Arjun",
    fullName: "Arjun Magre",
    location: "Student • Pune",
    skillsCompleted: 14,
    totalXp: 1250,
    streakDays: 5,
    verifiedBadges: 14,
    level: "Level 4",
    applicationsCount: 6,
    overallProgress: 78,
  };

  const radarData = [
    { label: "AI & ML", value: 78 },
    { label: "Web Dev", value: 82 },
    { label: "System Design", value: 65 },
    { label: "DS & RAG", value: 45 },
    { label: "TypeScript & Node.js", value: 80 },
    { label: "Python / PyTorch", value: 82 },
  ];

  const skillBreakdown = [
    { name: "AI & ML", level: 94, status: "Industry Ready", color: "emerald" },
    { name: "Full Stack (MERN)", level: 89, status: "Industry Ready", color: "emerald" },
    { name: "ML Infrastructure", level: 82, status: "Industry Ready", color: "emerald" },
    { name: "System Design", level: 65, status: "In Progress", color: "amber" },
    { name: "TypeScript & Node.js", level: 88, status: "Industry Ready", color: "emerald" },
    { name: "Vector DBs & RAG", level: 45, status: "High Priority", color: "rose" },
  ];

  const jobMatches = [
    {
      id: 1,
      role: "AI Systems Engineering Intern",
      company: "OpenAI Labs",
      logo: "🤖",
      matchScore: 94,
      salary: "$3,500 / month",
      location: "Remote / San Francisco",
      skills: ["Python", "Next.js", "PyTorch"],
      missing: "Vector DBs",
    },
    {
      id: 2,
      role: "Full Stack Platform Engineer",
      company: "Stripe",
      logo: "💳",
      matchScore: 89,
      salary: "$3,200 / month",
      location: "Bengaluru (Hybrid)",
      skills: ["TypeScript", "Next.js", "System Design"],
      missing: "Kafka",
    },
    {
      id: 3,
      role: "ML Infrastructure Intern",
      company: "Databricks",
      logo: "⚡",
      matchScore: 82,
      salary: "$3,800 / month",
      location: "Remote",
      skills: ["Python", "PyTorch"],
      missing: "Distributed Systems",
    },
    {
      id: 4,
      role: "Product Engineer Intern",
      company: "Replit",
      logo: "🚀",
      matchScore: 76,
      salary: "$3,500 / month",
      location: "Pune (Hybrid)",
      skills: ["React", "Node.js"],
      missing: "Docker",
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
      tag: "Tag: AI Infra +1",
    },
    {
      title: "Microservices Architecture & System Design",
      progress: 30,
      timeLeft: "6 hours left",
      tag: "Tag: Backend +1",
    },
    {
      title: "Production LLM Fine-Tuning & Quantization",
      progress: 0,
      timeLeft: "6 hours left",
      tag: "Tag: ML",
    },
  ];

  const recentActivity = [
    { id: 1, icon: Trophy, iconBg: "bg-amber-500/20 text-amber-400", title: 'Completed "Python Basics" course', time: "2 hours ago" },
    { id: 2, icon: Code, iconBg: "bg-blue-500/20 text-blue-400", title: 'Started "Web Development" course', time: "5 hours ago" },
    { id: 3, icon: FileText, iconBg: "bg-cyan-500/20 text-cyan-400", title: "Applied to AI Systems Engineering Intern", time: "6 hours ago" },
    { id: 4, icon: Star, iconBg: "bg-purple-500/20 text-purple-400", title: "Reached 80% in TypeScript & Node.js", time: "1 day ago" },
    { id: 5, icon: Users, iconBg: "bg-emerald-500/20 text-emerald-400", title: "Joined SkillNexus community", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <DashboardSidebar role="STUDENT" user={{ name: studentData.fullName }} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6 overflow-y-auto">
          
          {/* Welcome Banner matching screenshot */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 p-6 md:p-8 bg-[#0a1228] shadow-2xl">
            {/* Background image & gradient overlays */}
            <div 
              className="absolute inset-0 bg-cover bg-right opacity-40 mix-blend-luminosity"
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
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                    #BuildSkills
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                    #GetHired
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                    #Limitless
                  </span>
                </div>
              </div>

              {/* Right infinity badge */}
              <div className="flex flex-col items-end justify-center self-start md:self-center">
                <div className="p-3 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-right backdrop-blur-md shadow-lg flex items-center gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">Small steps.</div>
                    <div className="text-xs font-bold text-cyan-400">Big goals.</div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-xl font-bold">
                    <svg className="w-5 h-5 text-cyan-400 fill-current" viewBox="0 0 24 24">
                      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.96 9.17 8.15C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12.02c0 2.98 2.42 5.4 5.4 5.4 1.44 0 2.8-.56 3.77-1.53L12 13.08l2.83 2.81c.97.97 2.33 1.53 3.77 1.53 2.98 0 5.4-2.42 5.4-5.4 0-2.98-2.42-5.4-5.4-5.4zm-13.2 9c-1.98 0-3.6-1.62-3.6-3.6 0-1.98 1.62-3.6 3.6-3.6 1.01 0 1.97.41 2.65 1.09l1.83 1.83-1.83 1.83C7.37 15.21 6.41 15.62 5.4 15.62zm13.2 0c-1.01 0-1.97-.41-2.65-1.09L14.12 12.7l1.83-1.83c.68-.68 1.64-1.09 2.65-1.09 1.98 0 3.6 1.62 3.6 3.6 0 1.98-1.62 3.6-3.6 3.6z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Skills Completed */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Skills Completed</span>
                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white">{studentData.skillsCompleted}</span>
                  <span className="text-xs text-slate-400 font-semibold">/ {studentData.totalXp} XP</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full" style={{ width: "65%" }} />
                </div>
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
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    ● Active
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
                  <Star className="w-4 h-4" />
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
            <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Applications</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{studentData.applicationsCount}</span>
                  <span className="text-[11px] text-slate-400 font-medium">In progress</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center hover:bg-blue-600/40 cursor-pointer transition">
                <ChevronRight className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Skill Intelligence Radar Box */}
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
                    <div className="text-xs font-bold text-slate-400">
                      Overall Progress
                    </div>
                    <div className="text-lg font-black text-cyan-400">
                      {studentData.overallProgress}%
                    </div>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-2 rounded-full" 
                    style={{ width: `${studentData.overallProgress}%` }} 
                  />
                </div>

                {/* Radar Grid (Radar SVG Left, Skill Breakdown Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-2">
                  {/* Left Radar Chart */}
                  <div className="flex justify-center">
                    <RadarChart data={radarData} size={290} />
                  </div>

                  {/* Right Skill Breakdown List */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                      Skill Breakdown
                    </h3>
                    {skillBreakdown.map((sk) => (
                      <div key={sk.name} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0d162d] border border-slate-800/80">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-blue-600/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                            ⚡
                          </div>
                          <span className="text-xs font-bold text-slate-200">{sk.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">{sk.level}%</span>
                          {sk.color === "emerald" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              ● Industry Ready
                            </span>
                          )}
                          {sk.color === "amber" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              ● In Progress
                            </span>
                          )}
                          {sk.color === "rose" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              ● High Priority
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Internship & Job Matches for You */}
              <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-6">
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
                  <Link href="/dashboard/student/internships" className="text-xs text-cyan-400 hover:underline font-bold flex items-center gap-1">
                    View All
                  </Link>
                </div>

                {/* 4 Job Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {jobMatches.map((job) => (
                    <div key={job.id} className="p-4 rounded-2xl bg-[#0d162d] border border-slate-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 group">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-lg shadow-inner">
                              {job.logo}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                                {job.role}
                              </h4>
                              <p className="text-[11px] text-slate-400">{job.company}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {job.matchScore}% Match
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-300 space-y-1">
                          <p>💵 <strong className="text-white">{job.salary}</strong></p>
                          <p>📍 {job.location}</p>
                        </div>

                        {/* Skill Pills */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {job.skills.map((sk) => (
                            <span key={sk} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                              {sk}
                            </span>
                          ))}
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Missing: {job.missing}
                          </span>
                        </div>
                      </div>

                      <button className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md">
                        <span>Quick Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level Up Your Career Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 via-[#0a142e] to-indigo-950/80 border border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Level Up Your Career</h4>
                    <p className="text-[11px] text-slate-300">Complete your skill roadmap, earn badges and unlock better opportunities.</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5">
                  <span>Continue Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN (1 Col) */}
            <div className="space-y-6">
              
              {/* Your Learning Path Card */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-white">Your Learning Path</h3>
                  <Link href="/dashboard/student/learning" className="text-xs text-cyan-400 hover:underline font-bold">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {mainLearningPath.map((item) => (
                    <div key={item.num} className="p-3 rounded-2xl bg-[#0d162d] border border-slate-800/80 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {item.num}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.title}</p>
                          <div className="flex items-center justify-between text-[10px] mt-1">
                            <span className="text-cyan-400 font-bold">{item.progress}%</span>
                            {item.color === "emerald" && (
                              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                                ✓ Completed
                              </span>
                            )}
                            {item.color === "amber" && (
                              <span className="text-amber-400 font-bold">
                                ● In Progress
                              </span>
                            )}
                            {item.color === "rose" && (
                              <span className="text-rose-400 font-bold">
                                ● High Priority
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard/student/learning"
                  className="w-full py-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 mt-2 block"
                >
                  <span>View Complete 6-Step Roadmap</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Active AI Learning Path Card */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
                        <Target className="w-3.5 h-3.5" />
                      </span>
                      Active AI Learning Path
                    </h3>
                    <p className="text-[10px] text-slate-400">Customized for AI Engineer Target</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> 4 hours left
                  </span>
                </div>

                <div className="space-y-3">
                  {activeAiPath.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-[#0d162d] border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white leading-tight">{item.title}</h4>
                        <span className="text-[10px] font-bold text-cyan-400 shrink-0 ml-2">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[10px] pt-1">
                        <span className="text-slate-400 font-semibold">{item.tag}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30 font-semibold flex items-center gap-0.5 cursor-pointer">
                          {item.timeLeft} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard/student/learning"
                  className="w-full py-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 mt-2 block"
                >
                  <span>View Complete 6-Step Roadmap</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Recent Activity Card */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-white">Recent Activity</h3>
                  <span className="text-xs text-cyan-400 hover:underline font-bold cursor-pointer">
                    View All
                  </span>
                </div>

                <div className="space-y-3">
                  {recentActivity.map((act) => {
                    const IconComp = act.icon;
                    return (
                      <div key={act.id} className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full ${act.iconBg} flex items-center justify-center shrink-0 text-xs`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{act.title}</p>
                          <p className="text-[10px] text-slate-400">{act.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Your Next Goal Widget */}
              <div className="p-4 rounded-2xl bg-[#0d162d] border border-blue-900/60 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Next Goal</p>
                    <p className="text-xs font-bold text-white truncate">Get ready for TCS Internships</p>
                    
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-1.5">
                      <div className="bg-cyan-400 h-1 rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                  <span className="text-xs font-bold text-cyan-400">65%</span>
                  <div className="w-7 h-7 rounded-full bg-blue-600/30 text-cyan-300 flex items-center justify-center hover:bg-blue-600/60 cursor-pointer transition">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
