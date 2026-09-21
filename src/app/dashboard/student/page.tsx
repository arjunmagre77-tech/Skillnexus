"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  GraduationCap,
  Calendar,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Database,
  Network,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

/* ── Radar Chart Component matching Image 2 ── */
function SkillRadarHexagon() {
  const points = [
    { label: "AI & ML", value: 78, angle: -Math.PI / 2 },
    { label: "Web Dev", value: 82, angle: -Math.PI / 6 },
    { label: "System Design", value: 65, angle: Math.PI / 6 },
    { label: "DS & RAG", value: 45, angle: Math.PI / 2 },
    { label: "Script & Node.js", value: 80, angle: (5 * Math.PI) / 6 },
    { label: "Python / PyTorch", value: 82, angle: (-5 * Math.PI) / 6 },
  ];

  const center = 150;
  const maxR = 90;
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoord = (angle: number, radiusRatio: number) => {
    const x = center + maxR * radiusRatio * Math.cos(angle);
    const y = center + maxR * radiusRatio * Math.sin(angle);
    return { x, y };
  };

  const dataPoly = points
    .map((p) => {
      const { x, y } = getCoord(p.angle, p.value / 100);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative flex items-center justify-center select-none py-2">
      <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
        <defs>
          <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
          </linearGradient>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Hexagons */}
        {levels.map((lvl, idx) => {
          const hexPoints = points
            .map((p) => {
              const { x, y } = getCoord(p.angle, lvl);
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <polygon
              key={idx}
              points={hexPoints}
              fill="none"
              stroke="#132742"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Spoke lines from center to outer ring */}
        {points.map((p, idx) => {
          const { x, y } = getCoord(p.angle, 1.0);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#173154"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={dataPoly}
          fill="url(#radarPolyGrad)"
          stroke="#00e5ff"
          strokeWidth="2"
          filter="url(#cyanGlow)"
        />

        {/* Vertex Glowing Dots */}
        {points.map((p, idx) => {
          const { x, y } = getCoord(p.angle, p.value / 100);
          return (
            <g key={idx}>
              <circle cx={x} cy={y} r="8" fill="#00e5ff" fillOpacity="0.25" />
              <circle cx={x} cy={y} r="3.5" fill="#ffffff" stroke="#00e5ff" strokeWidth="2" />
            </g>
          );
        })}

        {/* Metric Labels positioned around the hexagon */}
        {points.map((p, idx) => {
          const labelDist = 1.34;
          const { x, y } = getCoord(p.angle, labelDist);
          const isLeft = Math.cos(p.angle) < -0.2;
          const isRight = Math.cos(p.angle) > 0.2;
          const anchor = isLeft ? "end" : isRight ? "start" : "middle";

          return (
            <g key={idx}>
              <text
                x={x}
                y={y - 4}
                textAnchor={anchor}
                fill="#94a3b8"
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {p.label}
              </text>
              <text
                x={x}
                y={y + 9}
                textAnchor={anchor}
                fill="#00e5ff"
                fontSize="11"
                fontWeight="800"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {p.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function StudentDashboardHomePage() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  // Skill breakdown items
  const skillBreakdown = [
    {
      name: "AI & ML",
      pct: 94,
      status: "Industry Ready",
      statusColor: "emerald",
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      iconBg: "bg-blue-600/20 border-blue-500/30",
    },
    {
      name: "Full Stack (MERN)",
      pct: 89,
      status: "Industry Ready",
      statusColor: "emerald",
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      iconBg: "bg-cyan-600/20 border-cyan-500/30",
    },
    {
      name: "ML Infrastructure",
      pct: 82,
      status: "Industry Ready",
      statusColor: "emerald",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      iconBg: "bg-amber-600/20 border-amber-500/30",
    },
    {
      name: "System Design",
      pct: 65,
      status: "In Progress",
      statusColor: "amber",
      icon: <Network className="w-4 h-4 text-yellow-400" />,
      iconBg: "bg-yellow-600/20 border-yellow-500/30",
    },
    {
      name: "TypeScript & Node.js",
      pct: 88,
      status: "Industry Ready",
      statusColor: "emerald",
      icon: <Code2 className="w-4 h-4 text-sky-400" />,
      iconBg: "bg-sky-600/20 border-sky-500/30",
    },
    {
      name: "Vector DBs & RAG",
      pct: 45,
      status: "High Priority",
      statusColor: "rose",
      icon: <Database className="w-4 h-4 text-purple-400" />,
      iconBg: "bg-purple-600/20 border-purple-500/30",
    },
  ];

  // Learning path steps
  const learningPath = [
    {
      step: 1,
      title: "Python / Data Structures & Algorithms",
      pct: 82,
      status: "Completed",
      statusType: "completed",
      stepBg: "bg-blue-600/20 text-blue-400 border-blue-500/40",
    },
    {
      step: 2,
      title: "Web Development (HTML, CSS, JS, React)",
      pct: 66,
      status: "In Progress",
      statusType: "inprogress",
      stepBg: "bg-amber-600/20 text-amber-400 border-amber-500/40",
    },
    {
      step: 3,
      title: "Backend Development (Node.js, Express)",
      pct: 30,
      status: "In Progress",
      statusType: "inprogress",
      stepBg: "bg-amber-600/20 text-amber-400 border-amber-500/40",
    },
    {
      step: 4,
      title: "AI & Machine Learning",
      pct: 0,
      status: "High Priority",
      statusType: "priority",
      stepBg: "bg-purple-600/20 text-purple-400 border-purple-500/40",
    },
  ];

  // Active AI Learning path modules
  const activeAiModules = [
    {
      title: "Mastering Vector DBs (Qdrant & Pinecone)",
      pct: 75,
      timeLeft: "4 hours left",
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      iconBg: "bg-cyan-600/20 border-cyan-500/30",
    },
    {
      title: "Microservices Architecture & System Design",
      pct: 20,
      timeLeft: "6 hours left",
      icon: <Network className="w-4 h-4 text-blue-400" />,
      iconBg: "bg-blue-600/20 border-blue-500/30",
    },
    {
      title: "Production LLM Fine-Tuning & Quantization",
      pct: 0,
      timeLeft: "6 hours left",
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      iconBg: "bg-purple-600/20 border-purple-500/30",
    },
  ];

  // Top Internship & Job Matches
  const jobMatches = [
    {
      id: 1,
      role: "AI Systems Engineering Intern",
      company: "OpenAI Labs",
      location: "Bengaluru • Remote",
      stipend: "$3,500 / month",
      matchPct: 94,
      logo: (
        <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-md shadow-emerald-950/50">
          <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.28 9.29c-.19-.66-.56-1.25-1.07-1.7-.58-.52-1.3-.85-2.08-.95-.3-.9-1.04-1.61-1.95-1.89-1-.31-2.09-.1-2.92.54-.64-.5-1.44-.78-2.26-.78-.85 0-1.68.3-2.33.85-.8-.57-1.84-.73-2.78-.42-.94.3-1.68 1.02-1.99 1.95-.82.12-1.57.48-2.14 1.04-.58.56-.95 1.3-1.04 2.11-.79.37-1.42 1.03-1.74 1.84-.33.84-.28 1.77.13 2.56.23.44.55.82.93 1.11-.05.37-.03.74.07 1.1.19.66.56 1.25 1.07 1.7.58.52 1.3.85 2.08.95.3.9 1.04 1.61 1.95 1.89.54.17 1.11.18 1.66.05.41.3.89.52 1.4.63.85.2 1.74.06 2.49-.39.77.56 1.76.73 2.68.45.92-.28 1.66-.96 2-1.85.83-.11 1.58-.47 2.16-1.03.58-.56.95-1.3 1.04-2.11.82-.37 1.46-1.05 1.78-1.88.33-.86.27-1.81-.15-2.61-.22-.43-.54-.8-.92-1.08.06-.38.04-.76-.06-1.13z" />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      role: "Full Stack Platform Engineer",
      company: "Stripe",
      location: "Bengaluru • Hybrid",
      stipend: "$3,200 / month",
      matchPct: 89,
      logo: (
        <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center shadow-md shadow-indigo-950/50">
          <span className="text-indigo-400 font-black text-lg">S</span>
        </div>
      ),
    },
    {
      id: 3,
      role: "Machine Learning Intern",
      company: "Google",
      location: "Remote",
      stipend: "$3,000 / month",
      matchPct: 86,
      logo: (
        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
          <span className="text-base font-black bg-gradient-to-r from-blue-400 via-red-400 to-amber-300 bg-clip-text text-transparent">
            G
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#040914] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          {/* ═══════════════════════════════════════════
              1. HERO BANNER WITH MOUNTAIN SILHOUETTE
          ═══════════════════════════════════════════ */}
          <div
            className="relative rounded-2xl border border-[#142848] overflow-hidden shadow-2xl p-6 md:p-8"
            style={{
              background: "linear-gradient(135deg, #05142f 0%, #081d3f 50%, #061530 100%)",
            }}
          >
            {/* Background Mountain Skyline SVG */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              <svg
                viewBox="0 0 1200 240"
                preserveAspectRatio="none"
                className="absolute bottom-0 right-0 w-full h-full opacity-35"
              >
                <defs>
                  <linearGradient id="mtnGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#05142f" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="mtnGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#081d3f" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                {/* Back Mountain Range */}
                <polygon
                  points="300,240 520,70 680,180 840,40 1020,160 1200,80 1200,240"
                  fill="url(#mtnGrad2)"
                />
                {/* Front Mountain Range */}
                <polygon
                  points="450,240 640,110 760,200 920,90 1080,190 1200,120 1200,240"
                  fill="url(#mtnGrad1)"
                />
              </svg>

              {/* Glowing Stars / Nebula */}
              <div className="absolute top-4 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping opacity-60" />
              <div className="absolute top-10 right-1/3 w-1 h-1 rounded-full bg-blue-300 opacity-80" />
              <div className="absolute top-6 right-16 w-1 h-1 rounded-full bg-cyan-200 opacity-70" />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                  Welcome back, Arjun <span className="inline-block animate-bounce">👋</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-300 font-medium">
                  Your skills, your journey. Build what&apos;s next.
                </p>

                {/* Hashtags */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0a1e3f] text-cyan-300 border border-cyan-500/30">
                    #BuildSkills
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0a1e3f] text-cyan-300 border border-cyan-500/30">
                    #GetHired
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0a1e3f] text-cyan-300 border border-cyan-500/30">
                    #Limitless
                  </span>
                </div>
              </div>

              {/* Right Floating Motivational Badge */}
              <div className="bg-[#061836]/90 border border-cyan-500/40 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md flex items-center gap-3 shrink-0">
                <div className="text-left">
                  <div className="text-[11px] text-slate-300 font-medium">Small steps.</div>
                  <div className="text-sm font-black text-cyan-400 tracking-tight">Big goals.</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              2. FOUR TOP METRIC CARDS
          ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Skills Completed */}
            <div className="p-4 rounded-2xl bg-[#071324] border border-[#122642] hover:border-cyan-500/40 transition shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Skills Completed</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-white">14</span>
                    <span className="text-xs text-slate-400 font-semibold">/ 1250 XP</span>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 bg-[#10233d] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full" style={{ width: "8%" }} />
                </div>
                <span className="text-[10px] font-bold text-cyan-400">1%</span>
              </div>
            </div>

            {/* Card 2: Current Streak */}
            <div className="p-4 rounded-2xl bg-[#071324] border border-[#122642] hover:border-cyan-500/40 transition shadow-lg space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Current Streak</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-black text-white">5 Days</span>
                    <span className="text-amber-400 text-sm">🔥</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Keep going! 2 more days for next reward.
              </p>
            </div>

            {/* Card 3: Verified Badges */}
            <div className="p-4 rounded-2xl bg-[#071324] border border-[#122642] hover:border-indigo-500/40 transition shadow-lg space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Verified Badges</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-black text-white">14</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      Level 4
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Skills verified • Level 4
              </p>
            </div>

            {/* Card 4: Applications */}
            <Link
              href="/dashboard/student/applications"
              className="p-4 rounded-2xl bg-[#071324] border border-[#122642] hover:border-cyan-500/40 transition shadow-lg flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Applications</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-white">6</span>
                    <span className="text-xs text-slate-400 font-semibold">In progress</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ═══════════════════════════════════════════
              3. MAIN CONTENT GRID (2 COLUMNS)
          ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ──────────────────────────────────────────
                LEFT COLUMN (2/3 width)
            ────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* ── Skill Intelligence Radar Card ── */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 md:p-6 space-y-5">
                {/* Header with Overall Progress 78% */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Network className="w-4 h-4" />
                      </div>
                      <h2 className="text-sm md:text-base font-black text-white">
                        Skill Intelligence Radar
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400">
                      Your skill profile at a glance. Identify strengths and focus on growth areas.
                    </p>
                  </div>

                  {/* Circular 78% mini gauge */}
                  <div className="flex items-center gap-2.5 self-start sm:self-auto bg-[#0a182f] border border-[#142949] rounded-xl px-3 py-1.5">
                    <span className="text-xs font-semibold text-slate-400">Overall Progress</span>
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-7 h-7">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#132742"
                            strokeWidth="3.5"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#00e5ff"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray={`${78 * 0.88} ${88 - 78 * 0.88}`}
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-black text-cyan-300">78%</span>
                    </div>
                  </div>
                </div>

                {/* Sub-grid: Radar Hexagon + Skill Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left: Radar SVG */}
                  <div className="flex justify-center">
                    <SkillRadarHexagon />
                  </div>

                  {/* Right: Skill Breakdown Table */}
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Skill Breakdown
                    </div>

                    <div className="space-y-2">
                      {skillBreakdown.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#040c19] border border-[#0f213b] hover:border-[#19365e] transition"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${item.iconBg}`}>
                              {item.icon}
                            </div>
                            <span className="text-xs font-semibold text-slate-200 truncate">
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-black text-white">{item.pct}%</span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${
                                item.statusColor === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : item.statusColor === "amber"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                              }`}
                            >
                              {item.statusColor === "emerald" ? "✓" : "•"} {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Top Internship & Job Matches for You ── */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 md:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-black text-white">
                        Top Internship & Job Matches for You
                      </h3>
                      <p className="text-xs text-slate-400">
                        Real opportunities from companies looking for candidates with your verified skill profile.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/student/jobs"
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition shrink-0"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 3 Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  {jobMatches.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedMatch(job.id)}
                      className={`rounded-xl p-4 bg-[#050e1c] border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                        selectedMatch === job.id
                          ? "border-cyan-500 shadow-lg shadow-cyan-950/60 bg-[#08172e]"
                          : "border-[#112542] hover:border-[#1a3861]"
                      }`}
                    >
                      {/* Top: Logo + Match Badge */}
                      <div className="flex items-start justify-between gap-2">
                        {job.logo}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {job.matchPct}% Match
                        </span>
                      </div>

                      {/* Title & Info */}
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                          {job.role}
                        </h4>
                        <div className="text-[11px] font-bold text-cyan-400">
                          {job.company}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {job.location}
                        </div>
                      </div>

                      {/* Bottom row: Salary + Chevron button */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#0e1f37]">
                        <span className="text-xs font-bold text-slate-200">
                          {job.stipend}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#0a1b33] group-hover:bg-cyan-500 group-hover:text-white text-cyan-400 flex items-center justify-center transition shadow-sm">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ──────────────────────────────────────────
                RIGHT COLUMN (1/3 width)
            ────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* ── Your Learning Path Card ── */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-black text-white">Your Learning Path</h3>
                  </div>
                  <Link
                    href="/dashboard/student/learning"
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Steps List */}
                <div className="space-y-3.5 pt-1">
                  {learningPath.map((step) => (
                    <div
                      key={step.step}
                      className="p-3 rounded-xl bg-[#050e1c] border border-[#112542] hover:border-[#1a3861] transition space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-black shrink-0 ${step.stepBg}`}
                          >
                            {step.step}
                          </div>
                          <span className="text-xs font-semibold text-slate-200 leading-snug line-clamp-1">
                            {step.title}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-bold shrink-0 ${
                            step.statusType === "completed"
                              ? "text-emerald-400"
                              : step.statusType === "inprogress"
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {step.statusType === "completed" ? "✓" : "•"} {step.status}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="w-full bg-[#0d1d33] rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              step.statusType === "completed"
                                ? "bg-cyan-400"
                                : step.statusType === "inprogress"
                                ? "bg-amber-400"
                                : "bg-slate-700"
                            }`}
                            style={{ width: `${step.pct}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-slate-400 text-right font-medium">
                          {step.pct}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Complete 6-Step Roadmap button */}
                <Link
                  href="/dashboard/student/learning"
                  className="w-full py-2.5 rounded-xl border border-blue-500/40 bg-blue-600/10 hover:bg-blue-600/25 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  View Complete 6-Step Roadmap <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* ── Active AI Learning Path Card ── */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Network className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-black text-white">Active AI Learning Path</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> 4 hours left
                  </span>
                </div>

                {/* Modules list */}
                <div className="space-y-3 pt-1">
                  {activeAiModules.map((mod) => (
                    <div
                      key={mod.title}
                      className="p-3 rounded-xl bg-[#050e1c] border border-[#112542] hover:border-[#1a3861] transition space-y-2 group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${mod.iconBg}`}>
                          {mod.icon}
                        </div>
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition leading-snug line-clamp-1">
                          {mod.title}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px]">
                        <div className="w-32 bg-[#0d1d33] rounded-full h-1 overflow-hidden">
                          <div
                            className="bg-cyan-400 h-1 rounded-full"
                            style={{ width: `${mod.pct}%` }}
                          />
                        </div>
                        <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5">
                          {mod.timeLeft} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Complete 6-Step Roadmap button */}
                <Link
                  href="/dashboard/student/learning"
                  className="w-full py-2.5 rounded-xl border border-blue-500/40 bg-blue-600/10 hover:bg-blue-600/25 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  View Complete 6-Step Roadmap <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
