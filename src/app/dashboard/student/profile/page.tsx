"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  MapPin, CheckCircle2, Trophy, BookOpen, FolderOpen,
  Briefcase, Clock, Star, ArrowRight, ChevronRight, User,
  Award, Code2, Sparkles, TrendingUp, FileText, Lightbulb,
  Rocket, Users, ShieldCheck, Circle
} from "lucide-react";

function HexBadge({
  gradient,
  icon,
  label,
  desc,
  date,
}: {
  gradient: [string, string];
  icon: React.ReactNode;
  label: string;
  desc: string;
  date: string;
}) {
  const gradId = `hex-grad-${label.replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col items-center gap-2.5 group cursor-pointer text-center select-none p-2 rounded-xl hover:bg-[#061122]/60 transition">
      <div className="relative w-20 h-22 flex items-center justify-center">
        <svg viewBox="0 0 100 115" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
            <filter id={`glow-${gradId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <polygon
            points="50,4 94,28 94,84 50,108 6,84 6,28"
            fill={`url(#${gradId})`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            className="group-hover:stroke-cyan-300 transition-colors"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
          {icon}
        </div>
      </div>

      <div className="space-y-0.5">
        <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition leading-tight">
          {label}
        </p>
        <p className="text-[10px] text-slate-400 leading-tight max-w-[100px] mx-auto line-clamp-2">
          {desc}
        </p>
        <p className="text-[9px] text-slate-500 flex items-center justify-center gap-1 pt-0.5 font-medium">
          <Clock className="w-2.5 h-2.5" /> {date}
        </p>
      </div>
    </div>
  );
}

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "skills" | "projects" | "experience">("overview");

  const student = {
    name: "Arjun Magre",
    initials: "AM",
    title: "Student • Pune",
    bio: "Learning today, building tomorrow.",
    skills: ["Web Development", "Python", "AI/ML"],
    extraSkills: 2,
    totalBadges: 6,
    skillCount: 4,
    projects: 3,
    internships: 2,
    profilePct: 78,
    level: "Level 4 (Master Developer)",
    points: 2450,
  };

  const badges = [
    {
      label: "Code Explorer",
      desc: "Completed your first coding challenge.",
      date: "Sep 2026",
      gradient: ["#1e1b4b", "#3b82f6"] as [string, string],
      icon: <Code2 className="w-6 h-6 text-blue-300" />,
    },
    {
      label: "Quick Learner",
      desc: "Completed 5 learning modules.",
      date: "Aug 2026",
      gradient: ["#064e3b", "#10b981"] as [string, string],
      icon: <Lightbulb className="w-6 h-6 text-emerald-300" />,
    },
    {
      label: "Project Builder",
      desc: "Built your first project submission.",
      date: "Jul 2026",
      gradient: ["#78350f", "#f59e0b"] as [string, string],
      icon: <Star className="w-6 h-6 text-amber-300 fill-amber-300/40" />,
    },
    {
      label: "Community Star",
      desc: "Actively participated in community discussions.",
      date: "Jun 2026",
      gradient: ["#581c87", "#a855f7"] as [string, string],
      icon: <Users className="w-6 h-6 text-purple-300" />,
    },
    {
      label: "Goal Getter",
      desc: "Completed your career roadmap.",
      date: "May 2026",
      gradient: ["#0c4a6e", "#06b6d4"] as [string, string],
      icon: <Rocket className="w-6 h-6 text-cyan-300" />,
    },
  ];

  const profileChecklist = [
    { label: "Personal Information", done: true },
    { label: "Skills & Interests", done: true },
    { label: "Education", done: true },
    { label: "Experience", done: false },
    { label: "Resume Upload", done: false },
  ];

  const recentActivity = [
    {
      title: "Resume Analysis Completed",
      desc: "Your resume has been analyzed. Check your score!",
      time: "2 hours ago",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      iconBg: "bg-emerald-500/15 border-emerald-500/30",
    },
    {
      title: "New Skill Recommendation",
      desc: "You might want to learn System Design",
      time: "5 hours ago",
      icon: <Star className="w-4 h-4 text-purple-400" />,
      iconBg: "bg-purple-500/15 border-purple-500/30",
    },
    {
      title: "ATS Tips Available",
      desc: "View 5 tips to improve your resume",
      time: "6 hours ago",
      icon: <TrendingUp className="w-4 h-4 text-cyan-400" />,
      iconBg: "bg-cyan-500/15 border-cyan-500/30",
    },
    {
      title: "Profile Updated",
      desc: "Your career profile is now more complete",
      time: "1 day ago",
      icon: <User className="w-4 h-4 text-amber-400" />,
      iconBg: "bg-amber-500/15 border-amber-500/30",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="w-3.5 h-3.5" /> },
    { id: "badges", label: "Badges", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "skills", label: "Skills", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "projects", label: "Projects", icon: <FolderOpen className="w-3.5 h-3.5" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
  ] as const;

  const stats = [
    { label: "Total Badges", value: student.totalBadges, icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> },
    { label: "Skills", value: student.skillCount, icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Projects", value: student.projects, icon: <FolderOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Internships", value: student.internships, icon: <Briefcase className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#040914] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          {/* 1. MAIN PROFILE HEADER BANNER */}
          <div
            className="relative rounded-2xl border border-[#142848] overflow-hidden shadow-2xl p-6 md:p-7"
            style={{
              background: "linear-gradient(135deg, #06132d 0%, #091c3d 45%, #05142f 100%)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <svg
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                className="absolute bottom-0 right-0 w-full h-full opacity-25"
              >
                <polygon
                  points="200,200 420,50 560,140 720,30 860,130 1000,60 1000,200"
                  fill="#00d4ff"
                  opacity="0.3"
                />
                <polygon
                  points="350,200 520,80 660,160 800,60 950,150 1000,100 1000,200"
                  fill="#3b82f6"
                  opacity="0.35"
                />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative shrink-0">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-2xl border-2 border-cyan-400/40"
                    style={{
                      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #8b5cf6 100%)",
                    }}
                  >
                    {student.initials}
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#06132d] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                      {student.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {student.title}
                  </p>

                  <p className="text-xs text-slate-300 font-medium">
                    {student.bio}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {student.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#091a38] text-slate-200 border border-[#142d54] flex items-center gap-1"
                      >
                        {sk === "Web Development" && <Code2 className="w-3 h-3 text-cyan-400" />}
                        {sk === "Python" && <span className="text-[10px]">🐍</span>}
                        {sk === "AI/ML" && <Sparkles className="w-3 h-3 text-violet-400" />}
                        {sk}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#091a38] text-slate-400 border border-[#142d54]">
                      +{student.extraSkills} more
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 bg-[#040d20]/70 border border-[#102444] rounded-2xl px-5 py-3.5 shrink-0 self-stretch sm:self-auto justify-around sm:justify-start">
                {stats.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="w-px h-8 bg-[#132847]" />}
                    <div className="flex flex-col items-center text-center min-w-[54px] space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-400">
                        {stat.icon}
                        <span className="text-base md:text-lg font-black text-white">{stat.value}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Gamification Level Progress */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-400">Gamification Progression</span>
                <h3 className="text-lg font-bold text-white">{student.level}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total Skill Balance</span>
                <div className="text-xl font-black text-amber-400">🪙 {student.points.toLocaleString()} Skill Coins</div>
              </div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 h-3 rounded-full" style={{ width: "75%" }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Current Level 4 (1,250 Skill Coins)</span>
              <span>Level 5 Master (1,500 Skill Coins Needed)</span>
            </div>
          </div>

          {/* 2. TAB NAVIGATION ROW */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#071324] border border-[#112642] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-[#0a1b33]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3. MAIN TWO-COLUMN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">

              {/* My Badges Card */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 md:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <h2 className="text-sm md:text-base font-black text-white">My Badges</h2>
                    </div>
                    <p className="text-xs text-slate-400">
                      Showcase your achievements and skills earned.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                  {badges.map((badge) => (
                    <HexBadge key={badge.label} {...badge} />
                  ))}
                </div>
              </div>

              {/* Profile Completion Card */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-6 md:p-7">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <defs>
                        <linearGradient id="profileRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00e5ff" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#102542"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#profileRingGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${student.profilePct * 2.513} ${251.3 - student.profilePct * 2.513}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">{student.profilePct}%</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 text-center sm:text-left">
                    <div>
                      <h3 className="text-sm md:text-base font-black text-white">Profile Completion</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Complete your profile to unlock better opportunities.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                      {profileChecklist.map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          {item.done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              item.done ? "text-slate-200" : "text-slate-500"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1">
                      <Link
                        href="/dashboard/student/profile"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30"
                      >
                        Complete Profile <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="space-y-6">

              {/* Recent Activity Card */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-black text-white">Recent Activity</h3>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {recentActivity.map((act) => (
                    <div
                      key={act.title}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#050e1c] border border-[#112542] hover:border-[#1a3861] transition cursor-pointer group"
                    >
                      <div
                        className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${act.iconBg}`}
                      >
                        {act.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                          {act.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                          {act.desc}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {act.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keep Going! Card */}
              <div
                className="rounded-2xl border border-[#142848] p-5 space-y-3 relative overflow-hidden shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #05142e 0%, #091e3d 50%, #05132d 100%)",
                }}
              >
                <div className="relative z-10 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Keep Going!</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      You&apos;re doing great. More skills, more opportunities await!
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-end justify-between pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-[10px] text-slate-400">
                        Skills earned: <span className="text-white font-bold">14</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-slate-400">
                        Badges earned: <span className="text-white font-bold">6</span>
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/student/learning"
                    className="w-8 h-8 rounded-full bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-cyan-300 hover:text-white flex items-center justify-center transition shadow-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
