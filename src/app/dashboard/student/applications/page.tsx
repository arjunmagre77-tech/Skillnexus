"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  CheckCircle2, Clock, Search, Filter, Briefcase, 
  Building2, ChevronRight, X, Calendar, UserCheck, AlertTriangle,
  FileText, ArrowRight, ExternalLink, Sparkles, MessageSquare, Trash2
} from "lucide-react";

type ApplicationStatus = "applied" | "screened" | "shortlisted" | "interview" | "selected" | "rejected";

interface ApplicationItem {
  id: string;
  role: string;
  company: string;
  logo: string;
  type: "Job" | "Internship";
  salary: string;
  location: string;
  appliedDate: string;
  matchScore: number;
  status: ApplicationStatus;
  currentStepIndex: number; // 0: Applied, 1: Screened, 2: Shortlisted, 3: Interview, 4: Offer
  recruiterNote?: string;
  interviewDate?: string;
  nextStepAction?: string;
}

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModalApp, setActiveModalApp] = useState<ApplicationItem | null>(null);
  const [applications, setApplications] = useState<ApplicationItem[]>([
    {
      id: "app_1",
      role: "AI Systems Engineering Intern",
      company: "OpenAI Labs",
      logo: "🤖",
      type: "Internship",
      salary: "$3,500 / month",
      location: "Remote / San Francisco",
      appliedDate: "Yesterday at 4:30 PM",
      matchScore: 94,
      status: "shortlisted",
      currentStepIndex: 2,
      recruiterNote: "Your verified PyTorch & Next.js skill vector scored in the top 5% of candidates. Moved to technical assessment round.",
      nextStepAction: "Complete System Design Take-home Task before Sep 18"
    },
    {
      id: "app_2",
      company: "Stripe",
      logo: "💳",
      role: "Full Stack Platform Engineer",
      type: "Job",
      salary: "₹18 - ₹24 LPA",
      location: "Bengaluru (Hybrid)",
      appliedDate: "3 days ago",
      matchScore: 89,
      status: "interview",
      currentStepIndex: 3,
      interviewDate: "Sep 16, 2026 at 2:00 PM IST",
      recruiterNote: "Initial screening passed with flying colors! 1-on-1 interview scheduled with Engineering Lead Dr. Vikram Sethi.",
      nextStepAction: "Join Zoom Interview Link (Google Calendar Invites Sent)"
    },
    {
      id: "app_3",
      company: "TechCorp India",
      logo: "🏢",
      role: "Frontend Developer Intern",
      type: "Internship",
      salary: "₹25,000 / month",
      location: "Bangalore",
      appliedDate: "1 week ago",
      matchScore: 92,
      status: "selected",
      currentStepIndex: 4,
      recruiterNote: "Congratulations Arjun! Final offer letter generated. Please review and sign your acceptance before Sep 20.",
      nextStepAction: "Review and Sign Offer Letter"
    },
    {
      id: "app_4",
      company: "Databricks",
      logo: "⚡",
      role: "ML Infrastructure Intern",
      type: "Internship",
      salary: "$3,800 / month",
      location: "Remote",
      appliedDate: "1 week ago",
      matchScore: 82,
      status: "applied",
      currentStepIndex: 0,
      recruiterNote: "Application received. AI resume & skill vector index screening in progress.",
    },
    {
      id: "app_5",
      company: "Razorpay",
      logo: "💸",
      role: "Backend Systems Intern",
      type: "Internship",
      salary: "₹65,000 / month",
      location: "Bengaluru",
      appliedDate: "2 weeks ago",
      matchScore: 91,
      status: "shortlisted",
      currentStepIndex: 2,
      recruiterNote: "Shortlisted based on Node.js & SQL verified badge achievements. Waiting for interview scheduling.",
    },
    {
      id: "app_6",
      company: "Swiggy Labs",
      logo: "🛵",
      role: "Data Engineering Intern",
      type: "Internship",
      salary: "₹50,000 / month",
      location: "Bengaluru",
      appliedDate: "3 weeks ago",
      matchScore: 78,
      status: "rejected",
      currentStepIndex: 1,
      recruiterNote: "Thank you for applying. At this time we require candidates with advanced Apache Spark experience.",
    }
  ]);

  const stepsList = [
    { title: "Applied", desc: "Submitted with Skill Vector" },
    { title: "Screened", desc: "AI Profile Indexing" },
    { title: "Shortlisted", desc: "Passed Initial Filter" },
    { title: "Interview", desc: "Live Technical Round" },
    { title: "Offer / Hired", desc: "Final Selection" },
  ];

  const handleWithdraw = (id: string) => {
    if (confirm("Are you sure you want to withdraw this application?")) {
      setApplications(applications.filter(a => a.id !== id));
      setActiveModalApp(null);
    }
  };

  const counts = {
    total: applications.length,
    shortlisted: applications.filter(a => a.status === "shortlisted").length,
    interview: applications.filter(a => a.status === "interview").length,
    selected: applications.filter(a => a.status === "selected").length,
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.role.toLowerCase().includes(search.toLowerCase()) || 
                          app.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = selectedFilter === "all" || app.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "selected":
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">● Selected / Offer</span>;
      case "interview":
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">● Interview Scheduled</span>;
      case "shortlisted":
        return <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1">● Shortlisted</span>;
      case "screened":
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center gap-1">● Profile Screened</span>;
      case "rejected":
        return <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold flex items-center gap-1">● Closed</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1">● Application Under Review</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="My Applications" 
          subtitle="Track application status, interview schedules, and employer responses."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          
          {/* Applications Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Applied */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Total Submitted</span>
                <div className="text-2xl font-black text-white">{counts.total}</div>
                <p className="text-[11px] text-slate-400">Positions in pipeline</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            {/* Shortlisted */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-cyan-900/60 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Shortlisted</span>
                <div className="text-2xl font-black text-cyan-400">{counts.shortlisted}</div>
                <p className="text-[11px] text-slate-400">Top candidate pools</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            {/* Interviews */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-amber-900/60 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">In Interview</span>
                <div className="text-2xl font-black text-amber-400">{counts.interview}</div>
                <p className="text-[11px] text-slate-400">Active sessions scheduled</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            {/* Offers / Selected */}
            <div className="p-4 rounded-2xl bg-[#091022] border border-emerald-900/60 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Offers Received</span>
                <div className="text-2xl font-black text-emerald-400">{counts.selected}</div>
                <p className="text-[11px] text-slate-400">Offers ready for review</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Search & Status Filter Tabs */}
          <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-[#0e1626] border border-slate-800 rounded-xl px-3.5 py-2.5 w-full md:w-96 focus-within:border-cyan-500 transition">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search application by company or role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#0e1626] border border-slate-800 rounded-xl p-1 text-xs">
                {[
                  { id: "all", label: "All" },
                  { id: "shortlisted", label: "Shortlisted" },
                  { id: "interview", label: "Interview" },
                  { id: "selected", label: "Offers" },
                  { id: "applied", label: "Under Review" },
                  { id: "rejected", label: "Closed" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition capitalize ${
                      selectedFilter === tab.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications List */}
          {filteredApps.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#091022] border border-slate-800 text-center space-y-3">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No applications match your filter</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Reset your filter parameters or apply for new roles on the Job Matches tab.
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedFilter("all"); }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 hover:border-cyan-500/50 transition-all space-y-5 shadow-xl group"
                >
                  {/* Top Row Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {app.logo}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                            {app.role}
                          </h3>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                            {app.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">
                          {app.company} • Applied {app.appliedDate} • {app.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-center">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Match Score</div>
                        <div className="text-sm font-black text-cyan-400">{app.matchScore}% Vector</div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </div>

                  {/* 5-Step Visual Stepper Progress */}
                  <div className="p-4 rounded-2xl bg-[#0d162d] border border-slate-800/80 space-y-3">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Pipeline Progress</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Stage {app.currentStepIndex + 1} of 5: {stepsList[app.currentStepIndex]?.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5">
                      {stepsList.map((step, idx) => {
                        const isCompleted = idx < app.currentStepIndex;
                        const isCurrent = idx === app.currentStepIndex;

                        return (
                          <div key={idx} className="space-y-1.5">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isCompleted
                                  ? "bg-cyan-400"
                                  : isCurrent
                                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"
                                  : "bg-slate-800"
                              }`}
                            />
                            <div className="text-center hidden sm:block">
                              <p className={`text-[10px] font-bold ${isCurrent ? "text-cyan-300" : isCompleted ? "text-slate-300" : "text-slate-500"}`}>
                                {step.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recruiter Note / Next Step Alert if present */}
                  {app.recruiterNote && (
                    <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <p className="text-slate-200 font-medium leading-relaxed">
                          <strong className="text-white">Employer Feedback:</strong> {app.recruiterNote}
                        </p>
                        {app.nextStepAction && (
                          <p className="text-cyan-300 font-bold text-[11px] flex items-center gap-1 pt-0.5">
                            ⚡ Action Required: {app.nextStepAction}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800/80">
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Withdraw</span>
                    </button>

                    <button
                      onClick={() => setActiveModalApp(app)}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
                    >
                      <span>View Detailed Timeline</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Detailed Application Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#091022] border border-blue-500/40 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
                  {activeModalApp.logo}
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">{activeModalApp.role}</h2>
                  <p className="text-xs text-cyan-400 font-semibold">{activeModalApp.company} • {activeModalApp.salary}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalApp(null)}
                className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Application Overview Box */}
            <div className="p-4 rounded-2xl bg-[#0d162d] border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Applied Date:</span>
                <span className="font-semibold text-white">{activeModalApp.appliedDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Location & Work Mode:</span>
                <span className="font-semibold text-white">{activeModalApp.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Verified AI Skill Fit:</span>
                <span className="font-bold text-cyan-400">{activeModalApp.matchScore}% Match Index</span>
              </div>
            </div>

            {/* Stepper Timeline Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Application Timeline History</h3>
              <div className="space-y-3 pl-2 border-l-2 border-slate-800 ml-2">
                {stepsList.map((step, idx) => {
                  const isDone = idx <= activeModalApp.currentStepIndex;
                  const isCurrent = idx === activeModalApp.currentStepIndex;

                  return (
                    <div key={idx} className="relative pl-6 space-y-1">
                      <div className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isDone ? "bg-cyan-500 border-cyan-400 text-slate-950" : "bg-slate-900 border-slate-700 text-transparent"
                      }`}>
                        {isDone && <CheckCircle2 className="w-3 h-3 text-slate-950 fill-cyan-400" />}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isCurrent ? "text-cyan-300" : isDone ? "text-white" : "text-slate-500"}`}>
                          {step.title}
                        </span>
                        {isDone && (
                          <span className="text-[10px] text-slate-500">Verified Step</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recruiter Notes / Interview Schedule */}
            {activeModalApp.interviewDate && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Calendar className="w-4 h-4" />
                  <span>Interview Session Details</span>
                </div>
                <p className="text-xs text-slate-200">
                  <strong>Date & Time:</strong> {activeModalApp.interviewDate}
                </p>
                <button className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition flex items-center gap-1.5 mt-2">
                  <span>Open Video Meeting Room</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleWithdraw(activeModalApp.id)}
                className="text-xs text-rose-400 hover:underline font-semibold"
              >
                Withdraw Application
              </button>

              <button
                onClick={() => setActiveModalApp(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
