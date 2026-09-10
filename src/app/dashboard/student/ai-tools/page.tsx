"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  FileText, Search, BarChart2, TrendingUp, Target,
  Sparkles, Upload, ArrowRight, CheckCircle2, Clock,
  ChevronRight, Bot, Star
} from "lucide-react";

type ActiveTab = "all" | "resume" | "ats" | "insights" | "growth";

export default function CareerToolsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [resumeText, setResumeText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState<{
    score: number;
    keywordMatch: number | null;
    skillsMatch: number | null;
    experienceMatch: number | null;
    formatting: number | null;
  }>({
    score: 0,
    keywordMatch: null,
    skillsMatch: null,
    experienceMatch: null,
    formatting: null,
  });
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAtsResult({
        score: 86,
        keywordMatch: 82,
        skillsMatch: 91,
        experienceMatch: 78,
        formatting: 95,
      });
      setHasAnalyzed(true);
      setAnalyzing(false);
    }, 1400);
  };

  const tabs: { id: ActiveTab; label: string; icon: any }[] = [
    { id: "all", label: "All Tools", icon: Target },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "ats", label: "ATS Analysis", icon: Search },
    { id: "insights", label: "Career Insights", icon: BarChart2 },
    { id: "growth", label: "Growth", icon: TrendingUp },
  ];

  const popularTools = [
    {
      icon: FileText,
      iconBg: "bg-blue-600/20 text-blue-400",
      title: "Resume Analyzer",
      desc: "Get ATS score & improve your resume",
      color: "border-blue-500/30",
    },
    {
      icon: Search,
      iconBg: "bg-cyan-600/20 text-cyan-400",
      title: "ATS Keyword Match",
      desc: "Find missing keywords for better shortlisting",
      color: "border-cyan-500/30",
    },
    {
      icon: BarChart2,
      iconBg: "bg-purple-600/20 text-purple-400",
      title: "Skill Gap Analysis",
      desc: "Know what skills to learn next",
      color: "border-purple-500/30",
    },
    {
      icon: TrendingUp,
      iconBg: "bg-emerald-600/20 text-emerald-400",
      title: "Career Roadmap",
      desc: "Personalized roadmap for your goals",
      color: "border-emerald-500/30",
    },
  ];

  const recentActivity = [
    {
      icon: FileText,
      iconBg: "bg-emerald-500/20 text-emerald-400",
      title: "Resume Analysis Completed",
      desc: "Your resume has been analyzed. Check your score!",
      time: "2 hours ago",
    },
    {
      icon: Star,
      iconBg: "bg-purple-500/20 text-purple-400",
      title: "New Skill Recommendation",
      desc: "You might want to learn System Design",
      time: "5 hours ago",
    },
    {
      icon: Target,
      iconBg: "bg-cyan-500/20 text-cyan-400",
      title: "ATS Tips Available",
      desc: "View 5 tips to improve your resume",
      time: "6 hours ago",
    },
    {
      icon: Bot,
      iconBg: "bg-amber-500/20 text-amber-400",
      title: "You completed AI Resume Analyzer",
      desc: "Great job! Keep building your profile.",
      time: "1 day ago",
    },
    {
      icon: CheckCircle2,
      iconBg: "bg-blue-500/20 text-blue-400",
      title: "New Internship Match",
      desc: "React Developer Intern — 3 new matches",
      time: "2 days ago",
    },
  ];

  // Circular arc for ATS score gauge
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const scorePercent = hasAnalyzed ? atsResult.score / 100 : 0;
  const dashOffset = circumference * (1 - scorePercent * 0.75); // 75% arc

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 space-y-6 overflow-y-auto">

          {/* ── Hero Banner ─────────────────────────────────────────── */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#0a1228] shadow-2xl">
            {/* BG artwork */}
            <div
              className="absolute inset-0 bg-cover bg-right opacity-35"
              style={{ backgroundImage: `url('/images/career_tools_hero.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07112b]/95 via-[#091533]/80 to-transparent" />

            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="space-y-2 max-w-lg">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">
                    Career Tools
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Turn Your Skills into<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Opportunities
                  </span>
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Use our career tools to analyze your resume, get ATS insights,<br className="hidden md:block" />
                  find skill gaps and build a stronger profile for your dream jobs.
                </p>
              </div>

              {/* Right floating resume graphic representation */}
              <div className="ml-auto hidden md:flex items-center gap-4 mr-4">
                <div className="relative w-32 h-36 rounded-2xl border border-blue-400/40 bg-[#0d1b3e]/80 backdrop-blur-md flex flex-col p-3 shadow-2xl shadow-blue-500/20">
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-16 rounded bg-slate-600/80" />
                    <div className="h-1 w-12 rounded bg-slate-700/60" />
                    <div className="h-1 w-14 rounded bg-slate-700/60" />
                    <div className="h-px w-full bg-slate-700/40 my-1.5" />
                    <div className="h-1 w-10 rounded bg-blue-500/60" />
                    <div className="h-1 w-14 rounded bg-slate-700/60" />
                    <div className="h-1 w-12 rounded bg-slate-700/60" />
                    <div className="h-px w-full bg-slate-700/40 my-1.5" />
                    <div className="h-1 w-16 rounded bg-slate-700/60" />
                    <div className="h-1 w-10 rounded bg-slate-700/60" />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 mt-auto">RESUME</div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 backdrop-blur-md">
                    <span className="text-lg font-black text-cyan-300">ATS</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main 2-column grid ───────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT (2 cols) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Tab Bar */}
              <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#0d162d] border border-slate-800 w-fit">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? "bg-blue-600/40 text-white border border-blue-500/40 shadow-md"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${active ? "text-cyan-400" : "text-slate-500"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Resume Paste Panel */}
              <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-white">
                      # Paste Resume Content or Bullet Points
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Paste your resume text here and get instant ATS match scores, keyword suggestions and improvement tips.
                    </p>
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative rounded-2xl border border-slate-700/80 bg-[#0d162d] overflow-hidden">
                  <textarea
                    rows={7}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    maxLength={5000}
                    placeholder={`Example:\nSenior Software Developer with 2 years of experience in React, Node.js, and Python...\n• Developed and maintained web applications...\n• Worked with cross-functional teams...`}
                    className="w-full bg-transparent px-4 pt-4 pb-10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none resize-none"
                  />

                  {/* Bottom bar inside textarea */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-[#0d162d] border-t border-slate-800/60">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-cyan-400 transition font-semibold">
                        <Upload className="w-3.5 h-3.5" />
                        Upload File (PDF/DOCX)
                      </button>
                      <span className="text-slate-600 text-xs">or</span>
                      <button className="text-[11px] text-slate-400 hover:text-cyan-400 transition font-semibold">
                        Paste text
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {resumeText.length}/5000
                    </span>
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || !resumeText.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-extrabold text-sm hover:opacity-90 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "1s" }} />
                      <span>Analyzing Resume...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Resume</span>
                    </>
                  )}
                </button>
              </div>

              {/* Popular Career Tools Grid */}
              <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-5">
                <h3 className="text-sm font-extrabold text-white">Popular Career Tools</h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {popularTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.title}
                        className={`p-4 rounded-2xl bg-[#0d162d] border ${tool.color} hover:border-opacity-80 transition-all group text-left space-y-3`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition leading-snug">
                            {tool.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-1 leading-snug">{tool.desc}</p>
                        </div>
                        <div className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT (1 col) */}
            <div className="space-y-6">

              {/* Your Resume Analysis card */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-white">Your Resume Analysis</h3>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    ATS Match Score
                  </span>
                </div>

                {/* Circular Gauge */}
                <div className="flex justify-center">
                  <div className="relative w-44 h-44">
                    <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 180 180">
                      {/* Track arc */}
                      <circle
                        cx="90" cy="90" r={radius}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="12"
                        strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
                        strokeLinecap="round"
                      />
                      {/* Value arc */}
                      <circle
                        cx="90" cy="90" r={radius}
                        fill="none"
                        stroke="url(#gaugeGrad)"
                        strokeWidth="12"
                        strokeDasharray={`${circumference * 0.75 * scorePercent} ${circumference * (1 - 0.75 * scorePercent)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">
                        {hasAnalyzed ? atsResult.score : "—"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="space-y-3 pt-1">
                  {[
                    { label: "Keyword Match", color: "bg-cyan-400", value: atsResult.keywordMatch },
                    { label: "Skills Match", color: "bg-blue-400", value: atsResult.skillsMatch },
                    { label: "Experience Match", color: "bg-purple-400", value: atsResult.experienceMatch },
                    { label: "Formatting", color: "bg-amber-400", value: atsResult.formatting },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-slate-300 font-medium">{item.label}</span>
                      </div>
                      <span className="font-bold text-white">
                        {item.value !== null ? `${item.value}%` : "—"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA hint */}
                <button className="w-full p-3 rounded-2xl bg-[#0d162d] border border-slate-800 hover:border-cyan-500/40 transition flex items-center gap-3 text-left group">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Paste your resume to get a detailed ATS score, keyword analysis and personalized suggestions.
                  </p>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 transition" />
                </button>
              </div>

              {/* Recent Activity */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-white">Recent Activity</h3>
                  <span className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer">
                    View All
                  </span>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((act, idx) => {
                    const Icon = act.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white leading-tight">{act.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{act.desc}</p>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0 whitespace-nowrap mt-0.5">
                          {act.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
