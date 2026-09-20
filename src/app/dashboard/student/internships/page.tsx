"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Briefcase, MapPin, DollarSign, Clock, ArrowRight,
  Check, ChevronRight, SlidersHorizontal, TrendingUp,
  Flame, Zap, CheckCircle2, Filter
} from "lucide-react";

type FilterType = "all" | "full-time" | "part-time" | "remote" | "hybrid";
type SortType = "latest" | "match" | "stipend";

export default function InternshipsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const internships = [
    {
      id: "int_1",
      company: "OpenAI Labs",
      logo: "🤖",
      logoColor: "from-emerald-600 to-teal-700",
      role: "AI Systems Engineering Intern",
      stipend: "$3,500 / mo",
      stipendVerified: true,
      location: "Remote / San Francisco",
      type: "Full-time",
      duration: "6 months",
      matchScore: 94,
      matchingSkills: ["Python", "Next.js", "PyTorch", "+2"],
      postedDate: "2 days ago",
      applicantsCount: 142,
      status: "hot" as const,
      filterType: "remote" as FilterType,
    },
    {
      id: "int_2",
      company: "Stripe",
      logo: "S",
      logoColor: "from-violet-600 to-purple-700",
      role: "Full Stack Platform Engineer Intern",
      stipend: "$3,200 / mo",
      stipendVerified: true,
      location: "Bengaluru, India (Hybrid)",
      type: "Summer 2026",
      duration: "3 months",
      matchScore: 89,
      matchingSkills: ["React", "Node.js", "Kafka", "+1"],
      postedDate: "1 week ago",
      applicantsCount: 98,
      status: "new" as const,
      filterType: "hybrid" as FilterType,
    },
    {
      id: "int_3",
      company: "Databricks",
      logo: "⚡",
      logoColor: "from-amber-600 to-orange-700",
      role: "ML Infrastructure Intern",
      stipend: "$3,800 / mo",
      stipendVerified: true,
      location: "Remote",
      type: "6 months",
      duration: "Co-op",
      matchScore: 82,
      matchingSkills: ["Python", "PyTorch", "System Design", "+1"],
      postedDate: "1 week ago",
      applicantsCount: 210,
      status: "in-progress" as const,
      filterType: "remote" as FilterType,
    },
    {
      id: "int_4",
      company: "Razorpay",
      logo: "💸",
      logoColor: "from-blue-600 to-cyan-700",
      role: "Backend Systems Intern",
      stipend: "₹65,000 / mo",
      stipendVerified: true,
      location: "Bengaluru, India",
      type: "6 months",
      duration: "",
      matchScore: 91,
      matchingSkills: ["Node.js", "SQL", "Redis", "+1"],
      postedDate: "2 weeks ago",
      applicantsCount: 45,
      status: "in-progress" as const,
      filterType: "full-time" as FilterType,
    },
    {
      id: "int_5",
      company: "Swiggy Labs",
      logo: "🛵",
      logoColor: "from-rose-600 to-pink-700",
      role: "Data Engineering Intern",
      stipend: "₹50,000 / mo",
      stipendVerified: true,
      location: "Bengaluru, India",
      type: "3 months",
      duration: "",
      matchScore: 78,
      matchingSkills: ["Python", "SQL", "Airflow", "+1"],
      postedDate: "4 days ago",
      applicantsCount: 120,
      status: "new" as const,
      filterType: "full-time" as FilterType,
    },
  ];

  const handleApply = (id: string, role: string, company: string) => {
    setAppliedIds([...appliedIds, id]);
    alert(`Application submitted to ${company} for ${role} with your Verified Skill Vector!`);
  };

  const filtered = internships.filter((i) =>
    activeFilter === "all" ? true : i.filterType === activeFilter
  );

  const filterTabs: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const StatusBadge = ({ status }: { status: "hot" | "new" | "in-progress" }) => {
    if (status === "hot") return (
      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
        🔥 Hot
      </span>
    );
    if (status === "new") return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
        New
      </span>
    );
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
        In Progress
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
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#0a1228]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#071126] via-[#091533]/90 to-transparent" />
            <div className="absolute right-0 inset-y-0 w-64 opacity-30"
              style={{ background: "radial-gradient(ellipse at right, #1e40af55, transparent)" }} />

            <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Internships</h1>
                    <p className="text-xs text-slate-300 mt-0.5">Gain real-world experience, build your skills, and kickstart your career.</p>
                  </div>
                </div>
              </div>

              {/* Right laptop/badge */}
              <div className="hidden md:flex flex-col items-end">
                <div className="p-3 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-right backdrop-blur-md shadow-lg flex items-center gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">Gain real experience,</div>
                    <div className="text-xs font-bold text-cyan-400">Build your <span className="text-white">future.</span></div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-lg border border-cyan-500/30">
                    💻
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: Filter + List */}
            <div className="lg:col-span-2 space-y-4">

              {/* Filter Tabs + Sort */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-[#0a1228] p-1 rounded-2xl border border-blue-900/40">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveFilter(tab.value)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeFilter === tab.value
                          ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a1228] border border-blue-900/40 text-xs text-slate-300 cursor-pointer hover:border-cyan-500/40 transition">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="latest">Latest First</option>
                    <option value="match">Best Match</option>
                    <option value="stipend">Highest Stipend</option>
                  </select>
                </div>
              </div>

              {/* Internship Cards */}
              <div className="space-y-3">
                {filtered.map((opp) => {
                  const isApplied = appliedIds.includes(opp.id);
                  return (
                    <div
                      key={opp.id}
                      className="p-4 rounded-2xl bg-[#091022] border border-blue-900/50 hover:border-cyan-500/40 transition-all shadow-lg group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Logo */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opp.logoColor} flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg`}>
                          {opp.logo}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition">{opp.role}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {opp.type}
                            </span>
                            {opp.duration && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {opp.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {opp.company} • {opp.location} • {opp.applicantsCount} applicants
                          </p>
                          {/* Skill tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {opp.matchingSkills.map((sk) => (
                              <span key={sk} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: stipend + action */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 justify-end">
                              <span className="text-sm font-black text-emerald-400">💲 {opp.stipend}</span>
                            </div>
                            <div className="flex items-center gap-1 justify-end mt-0.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span className="text-[10px] text-emerald-400 font-semibold">Verified</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>{opp.postedDate}</span>
                            </div>
                            <StatusBadge status={opp.status} />
                          </div>

                          {isApplied ? (
                            <button disabled className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs cursor-default">
                              <Check className="w-3.5 h-3.5" />
                              Applied
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApply(opp.id, opp.role, opp.company)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 font-bold text-xs transition"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-4">

              {/* Your Internship Progress */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-extrabold text-white">Your Internship Progress</h3>
                </div>

                {/* Donut */}
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22d3ee" strokeWidth="3"
                        strokeDasharray="25 75" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-base font-black text-white">25%</span>
                      <span className="text-[9px] text-slate-400">Completed</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />Applied</span>
                      <span className="font-bold text-white">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />In Progress</span>
                      <span className="font-bold text-white">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-slate-600 inline-block" />Not Started</span>
                      <span className="font-bold text-white">7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-extrabold text-white">Quick Filters</h3>
                </div>

                {[
                  { icon: MapPin, label: "Location", sub: "Remote / On-site / Hybrid" },
                  { icon: Clock, label: "Duration", sub: "1-3 months / 3-6 months / 6+ months" },
                  { icon: DollarSign, label: "Stipend", sub: "Any amount" },
                ].map(({ icon: Icon, label, sub }) => (
                  <button key={label} className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#0d162d] border border-slate-800/80 hover:border-cyan-500/30 transition group text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{label}</div>
                        <div className="text-[10px] text-slate-400">{sub}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                  </button>
                ))}
              </div>

              {/* Mountain Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0e1f3d] to-[#091022] border border-blue-500/30 overflow-hidden relative">
                <div className="text-xs font-bold text-white mb-0.5">Small steps.</div>
                <div className="text-xs font-bold text-cyan-400">Big opportunities.</div>
                <div className="text-3xl mt-2 mb-3">🏔️</div>
                <Link
                  href="/dashboard/student/learning"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
                >
                  View Recommended Internships <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Featured */}
              <div className="p-4 rounded-2xl bg-[#091022] border border-yellow-500/30 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-extrabold text-white">Featured</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">Get noticed by top companies with a complete profile.</p>
                <Link
                  href="/dashboard/student/profile"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-bold hover:bg-yellow-500/20 transition"
                >
                  Complete Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
