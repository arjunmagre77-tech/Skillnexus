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

/* ── Radar Chart Component ── */
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

        <polygon
          points={dataPoly}
          fill="url(#radarPolyGrad)"
          stroke="#00e5ff"
          strokeWidth="2"
          filter="url(#cyanGlow)"
        />

        {points.map((p, idx) => {
          const { x, y } = getCoord(p.angle, p.value / 100);
          return (
            <g key={idx}>
              <circle cx={x} cy={y} r="8" fill="#00e5ff" fillOpacity="0.25" />
              <circle cx={x} cy={y} r="3.5" fill="#ffffff" stroke="#00e5ff" strokeWidth="2" />
            </g>
          );
        })}

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
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);

  const handleQuickApply = (id: number, role: string, company: string) => {
    if (!appliedJobIds.includes(id)) {
      setAppliedJobIds((prev) => [...prev, id]);
      alert(`Application submitted to ${company} for ${role} with your Verified Skill Vector!`);
    }
  };

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

  const jobMatches = [
    {
      id: 1,
      role: "AI Systems Engineering Intern",
      company: "OpenAI Labs",
      location: "Bengaluru • Remote",
      stipend: "₹35,000 / month",
      matchPct: 94,
      logo: "🤖",
    },
    {
      id: 2,
      role: "Full Stack Platform Engineer",
      company: "Stripe",
      location: "Bengaluru • Hybrid",
      stipend: "₹32,000 / month",
      matchPct: 89,
      logo: "💳",
    },
    {
      id: 3,
      role: "ML Infrastructure Intern",
      company: "Databricks",
      location: "Remote",
      stipend: "₹30,000 / month",
      matchPct: 82,
      logo: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-[#040914] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          {/* HERO BANNER */}
          <div
            className="relative rounded-2xl border border-[#142848] overflow-hidden shadow-2xl p-6 md:p-8"
            style={{
              background: "linear-gradient(135deg, #05142f 0%, #081d3f 50%, #061530 100%)",
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                  Welcome back, Arjun <span className="inline-block animate-bounce">👋</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-300 font-medium">
                  Your skills, your journey. Build what&apos;s next.
                </p>

                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0a1e3f] text-cyan-300 border border-cyan-500/30">
                    #BuildSkills
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0a1e3f] text-cyan-300 border border-cyan-500/30">
                    #GetHired
                  </span>
                </div>
              </div>

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

          {/* TOP METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#071324] border border-[#122642] hover:border-cyan-500/40 transition shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Skills Completed</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-white">14</span>
                    <span className="text-xs text-amber-400 font-semibold">/ 🪙 2,450 Coins</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 bg-[#10233d] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

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
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Keep going! 2 more days for next reward.
              </p>
            </div>

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
                    <span className="text-xl font-black text-white">{6 + appliedJobIds.length}</span>
                    <span className="text-xs text-slate-400 font-semibold">In progress</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">

              {/* Skill Radar Card */}
              <div className="rounded-2xl bg-[#071324] border border-[#112642] p-5 md:p-6 space-y-5">
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

                  <div className="flex items-center gap-2.5 self-start sm:self-auto bg-[#0a182f] border border-[#142949] rounded-xl px-3 py-1.5">
                    <span className="text-xs font-semibold text-slate-400">Overall Progress</span>
                    <span className="text-sm font-black text-cyan-300">78%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex justify-center">
                    <SkillRadarHexagon />
                  </div>

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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Matches */}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  {jobMatches.map((job) => {
                    const isApplied = appliedJobIds.includes(job.id);
                    return (
                      <div
                        key={job.id}
                        className="rounded-xl p-4 bg-[#050e1c] border border-[#112542] hover:border-[#1a3861] transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl">{job.logo}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {job.matchPct}% Match
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{job.role}</h4>
                          <div className="text-[11px] font-bold text-cyan-400">{job.company}</div>
                          <div className="text-[10px] text-slate-400">{job.location}</div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#0e1f37]">
                          <span className="text-xs font-bold text-slate-200">{job.stipend}</span>
                          {isApplied ? (
                            <span className="text-[10px] font-bold text-emerald-400">Applied ✓</span>
                          ) : (
                            <button
                              onClick={() => handleQuickApply(job.id, job.role, job.company)}
                              className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition cursor-pointer"
                            >
                              Quick Apply
                            </button>
                          )}
                        </div>
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
