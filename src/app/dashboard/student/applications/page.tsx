"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Briefcase, Send, CheckCircle2, Calendar, Gift, 
  SlidersHorizontal, Filter, ArrowRight, Star, Clock, 
  Users, Check, ChevronRight, X, Sparkles, Building2, MapPin
} from "lucide-react";

interface ApplicationItem {
  id: string;
  role: string;
  company: string;
  logo: string;
  logoBg: string;
  type: "Internship" | "Full-time";
  location: string;
  status: "applied" | "shortlisted" | "in_interview" | "offer";
  statusLabel: string;
  statusBadgeColor: string;
  skills: string[];
  extraSkillsCount: number;
  currentStepIndex: number; // 0: Applied, 1: Screened, 2: Shortlisted, 3: Interview, 4: Offer
  timeAgo: string;
  applicantsCount: number;
  matchScore: number;
  matchLabel: string;
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "applied" | "shortlisted" | "interview" | "offers">("all");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const applications: ApplicationItem[] = [
    {
      id: "app_1",
      role: "Software Development Engineer Intern",
      company: "Google",
      logo: "G",
      logoBg: "bg-white text-slate-900 border border-slate-200",
      type: "Internship",
      location: "San Francisco, CA (Hybrid)",
      status: "applied",
      statusLabel: "Applied",
      statusBadgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      skills: ["Python", "Next.js", "PyTorch"],
      extraSkillsCount: 2,
      currentStepIndex: 0,
      timeAgo: "2 days ago",
      applicantsCount: 94,
      matchScore: 92,
      matchLabel: "Top Match"
    },
    {
      id: "app_2",
      role: "ML Engineer Intern",
      company: "Microsoft",
      logo: "MS",
      logoBg: "bg-[#0b182d] text-cyan-400 border border-cyan-500/30",
      type: "Internship",
      location: "Hyderabad, India (Remote)",
      status: "shortlisted",
      statusLabel: "Shortlisted",
      statusBadgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      skills: ["Python", "TensorFlow", "Machine Learning"],
      extraSkillsCount: 1,
      currentStepIndex: 2,
      timeAgo: "5 days ago",
      applicantsCount: 112,
      matchScore: 85,
      matchLabel: "High Match"
    },
    {
      id: "app_3",
      role: "Backend Developer Intern",
      company: "Amazon",
      logo: "amazon",
      logoBg: "bg-slate-900 text-amber-400 border border-slate-700",
      type: "Internship",
      location: "Bengaluru, India (Hybrid)",
      status: "in_interview",
      statusLabel: "In interview",
      statusBadgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      skills: ["Java", "Spring Boot", "MySQL"],
      extraSkillsCount: 2,
      currentStepIndex: 3,
      timeAgo: "1 week ago",
      applicantsCount: 98,
      matchScore: 82,
      matchLabel: "Good Match"
    },
    {
      id: "app_4",
      role: "Full Stack Developer",
      company: "Tata Consultancy Services",
      logo: "tcs",
      logoBg: "bg-gradient-to-br from-indigo-900 to-purple-900 text-white font-bold",
      type: "Full-time",
      location: "Mumbai, India (Hybrid)",
      status: "offer",
      statusLabel: "Offer Received",
      statusBadgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      skills: ["React", "Node.js", "MongoDB"],
      extraSkillsCount: 2,
      currentStepIndex: 4,
      timeAgo: "1 week ago",
      applicantsCount: 150,
      matchScore: 89,
      matchLabel: "Excellent Match"
    },
    {
      id: "app_5",
      role: "Cloud Engineer Intern",
      company: "Cloudflare",
      logo: "☁️",
      logoBg: "bg-sky-950 text-sky-400 border border-sky-500/30",
      type: "Internship",
      location: "Remote (US / India)",
      status: "applied",
      statusLabel: "Applied",
      statusBadgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      skills: ["AWS", "Docker", "Kubernetes"],
      extraSkillsCount: 1,
      currentStepIndex: 0,
      timeAgo: "3 days ago",
      applicantsCount: 74,
      matchScore: 78,
      matchLabel: "Good Match"
    }
  ];

  const steps = ["Applied", "Screened", "Shortlisted", "Interview", "Offer"];

  const filteredApps = applications.filter((app) => {
    if (activeTab === "applied") return app.status === "applied";
    if (activeTab === "shortlisted") return app.status === "shortlisted";
    if (activeTab === "interview") return app.status === "in_interview";
    if (activeTab === "offers") return app.status === "offer";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          
          {/* Top Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-[#163354] bg-gradient-to-r from-[#07152b] via-[#091e3d] to-[#0a2347] p-6 md:p-8 shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      My Applications
                    </h1>
                    <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
                      Track your internship and job applications, view status, and stay on top of your opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Motivational Card */}
              <div className="p-4 rounded-2xl bg-[#091b36] border border-cyan-500/30 flex items-center gap-3.5 shadow-lg max-w-sm">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Send className="w-5 h-5 -rotate-12" />
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  Every application brings you closer to your dream!
                </div>
              </div>

            </div>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Total Submitted</div>
                <div className="text-2xl font-black text-white">6</div>
                <div className="text-[11px] text-slate-500">Applications sent</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Shortlisted</div>
                <div className="text-2xl font-black text-white">2</div>
                <div className="text-[11px] text-emerald-400">Moving forward</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">In Interview</div>
                <div className="text-2xl font-black text-white">1</div>
                <div className="text-[11px] text-amber-400">Active sessions</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Offers Received</div>
                <div className="text-2xl font-black text-white">1</div>
                <div className="text-[11px] text-purple-400">Great news!</div>
              </div>
            </div>
          </div>

          {/* Filter Pills & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#050e1d] p-1 rounded-xl border border-[#142847]">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All Applications (6)
              </button>
              <button
                onClick={() => setActiveTab("applied")}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "applied"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Applied (4)
              </button>
              <button
                onClick={() => setActiveTab("shortlisted")}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "shortlisted"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Shortlisted (2)
              </button>
              <button
                onClick={() => setActiveTab("interview")}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "interview"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                In Interview (1)
              </button>
              <button
                onClick={() => setActiveTab("offers")}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "offers"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Offers (1)
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#050e1d] border border-[#142847] px-3 py-1.5 rounded-xl text-xs text-slate-300">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium"
                >
                  <option value="latest" className="bg-[#050e1d] text-white">Latest</option>
                  <option value="match" className="bg-[#050e1d] text-white">Match Score</option>
                </select>
              </div>

              <button 
                onClick={() => alert("Filter options opened")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#050e1d] border border-[#142847] hover:border-cyan-500/40 rounded-xl text-xs text-slate-300 transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApps.map((app) => {
              return (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all duration-300 shadow-lg group relative"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    
                    {/* Left: Logo & Job Details */}
                    <div className="flex items-start gap-4 lg:w-4/12 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-extrabold shadow shrink-0 ${app.logoBg}`}>
                        {app.company === "Google" && (
                          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            G
                          </span>
                        )}
                        {app.company === "Microsoft" && (
                          <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                            <span className="bg-red-500 rounded-[1px]" />
                            <span className="bg-green-500 rounded-[1px]" />
                            <span className="bg-blue-500 rounded-[1px]" />
                            <span className="bg-yellow-500 rounded-[1px]" />
                          </div>
                        )}
                        {app.company === "Amazon" && (
                          <span className="text-xs tracking-tighter text-amber-400">amazon</span>
                        )}
                        {app.company === "Tata Consultancy Services" && (
                          <span className="text-xs uppercase tracking-tight text-white">tcs</span>
                        )}
                        {app.company === "Cloudflare" && (
                          <span className="text-xl">☁️</span>
                        )}
                      </div>

                      <div className="min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${app.statusBadgeColor}`}>
                            {app.statusLabel}
                          </span>
                        </div>
                        <h2 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {app.role}
                        </h2>
                        <div className="text-xs text-slate-400 truncate">
                          {app.company} • {app.type} • {app.location}
                        </div>

                        {/* Skill Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {app.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#0b1e38] text-slate-300 border border-[#163354]"
                            >
                              {skill}
                            </span>
                          ))}
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#0e2748] text-cyan-400 border border-cyan-500/20">
                            +{app.extraSkillsCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Stepper Pipeline */}
                    <div className="lg:w-5/12 space-y-2">
                      <div className="flex items-center justify-between relative px-2">
                        {/* Connecting Line behind dots */}
                        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#0d2342] -translate-y-1/2 z-0" />
                        
                        {steps.map((step, sIdx) => {
                          const isDone = sIdx <= app.currentStepIndex;
                          const isCurrent = sIdx === app.currentStepIndex;

                          return (
                            <div key={step} className="flex flex-col items-center gap-1.5 relative z-10">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                                  isDone
                                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                                    : "bg-[#061427] border border-[#1a3860] text-slate-500"
                                }`}
                              >
                                {isDone ? (
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                )}
                              </div>
                              <span
                                className={`text-[10px] font-semibold ${
                                  isCurrent
                                    ? "text-cyan-300 font-bold"
                                    : isDone
                                    ? "text-slate-300"
                                    : "text-slate-500"
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Sub-text below stepper: e.g. "2 days ago • 94 applicants" */}
                      <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {app.timeAgo}
                        </span>
                        <span>•</span>
                        <span>{app.applicantsCount} applicants</span>
                      </div>
                    </div>

                    {/* Right: Match Score & View Details Button */}
                    <div className="lg:w-3/12 flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#122844]">
                      {/* Match Score Indicator */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-[#071933] shadow-md shadow-cyan-500/20 shrink-0">
                          <span className="text-[11px] font-black text-cyan-300">{app.matchScore}%</span>
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] text-slate-400 font-medium leading-none">Match</div>
                          <div className="text-[11px] text-cyan-300 font-bold flex items-center gap-0.5 mt-0.5">
                            <Star className="w-3 h-3 fill-current text-cyan-400" />
                            {app.matchLabel}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#07152b] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedApp.statusBadgeColor}`}>
                {selectedApp.statusLabel}
              </span>
              <span className="text-xs text-slate-400 font-medium">Applied {selectedApp.timeAgo}</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {selectedApp.role}
            </h3>
            <p className="text-xs text-slate-300">
              {selectedApp.company} • {selectedApp.type} • {selectedApp.location}
            </p>

            {/* Stepper overview */}
            <div className="p-4 rounded-xl bg-[#040c1a] border border-[#142e4e] space-y-3">
              <div className="text-xs font-bold text-white">Application Pipeline Stage</div>
              <div className="flex items-center justify-between text-xs">
                {steps.map((st, i) => (
                  <div key={st} className="flex flex-col items-center gap-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${
                      i <= selectedApp.currentStepIndex ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-500"
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-[9px] text-slate-400">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Match Rating: <strong className="text-cyan-400">{selectedApp.matchScore}% ({selectedApp.matchLabel})</strong></span>
              <span>Total Applicants: <strong className="text-white">{selectedApp.applicantsCount}</strong></span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  alert(`Withdraw request submitted for ${selectedApp.role}`);
                  setSelectedApp(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Withdraw Application
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
