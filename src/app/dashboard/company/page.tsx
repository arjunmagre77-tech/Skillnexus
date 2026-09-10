"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Building2, Users, Search, PlusCircle, Target, 
  CheckCircle2, Sparkles, ArrowRight, Briefcase
} from "lucide-react";

export default function CompanyDashboardPage() {
  const companyData = {
    name: "OpenAI Labs Recruiter Hub",
    activePostings: 4,
    totalApplicants: 184,
    verifiedMatches: 32,
    hiredCount: 6,
  };

  const activePostings = [
    {
      id: "int_1",
      role: "AI Systems Engineering Intern",
      type: "Internship",
      applicants: 142,
      topMatchScore: "94%",
      status: "Active",
      skills: ["Python", "PyTorch", "Next.js", "Vector DBs"]
    },
    {
      id: "job_1",
      role: "Full Stack Engineer (New Grad 2026)",
      type: "Full-Time Job",
      applicants: 42,
      topMatchScore: "96%",
      status: "Active",
      skills: ["TypeScript", "Next.js", "System Design"]
    }
  ];

  const topCandidates = [
    {
      name: "Aarav Sharma",
      college: "IIT Bombay",
      talentIQ: 780,
      matchScore: 94,
      skills: ["React", "PyTorch", "TypeScript", "SQL"],
      status: "Verified Top Candidate"
    },
    {
      name: "Ananya Patel",
      college: "BITS Pilani",
      talentIQ: 810,
      matchScore: 92,
      skills: ["Python", "Vector DBs", "Docker", "System Design"],
      status: "Verified Top Candidate"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COMPANY" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Recruiter Intelligence Hub" 
          subtitle={`${companyData.name} — Direct Talent Discovery powered by Verified Skill Vectors`}
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Top Actions & Quick Stats */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Recruiter Portal</span>
              <h2 className="text-xl font-extrabold text-white">Source Verified Talent Without Resume Spam</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rank candidates based on proven, automated coding assessment vectors.</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/company/postings"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Opportunity</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase">Active Postings</div>
              <div className="text-3xl font-black text-white mt-2">{companyData.activePostings}</div>
              <p className="text-xs text-slate-400 mt-1">Internships & Jobs</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase">Total Applicants</div>
              <div className="text-3xl font-black text-white mt-2">{companyData.totalApplicants}</div>
              <p className="text-xs text-slate-400 mt-1">Direct applications</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-cyan-400 font-bold uppercase">High-Match Talent</div>
              <div className="text-3xl font-black text-white mt-2">{companyData.verifiedMatches}</div>
              <p className="text-xs text-cyan-400 mt-1">&gt;85% Skill Vector match</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-emerald-400 font-bold uppercase">Offers Extended</div>
              <div className="text-3xl font-black text-white mt-2">{companyData.hiredCount}</div>
              <p className="text-xs text-emerald-400 mt-1">Verified hires made</p>
            </div>
          </div>

          {/* Active Postings & Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  Your Active Talent Postings
                </h3>
                <Link href="/dashboard/company/postings" className="text-xs text-cyan-400 hover:underline font-semibold">
                  Manage All →
                </Link>
              </div>

              <div className="space-y-3">
                {activePostings.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{p.role}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                          {p.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{p.applicants} Candidates • Top Match: {p.topMatchScore}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.skills.map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/dashboard/company/applicants"
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition text-center whitespace-nowrap"
                    >
                      Review Candidates ({p.applicants})
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Top Candidate Discovery Widget */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  AI Recommended Student Discovery
                </h3>
                <p className="text-xs text-slate-400 mt-1">Pre-screened candidates matching your AI Systems Engineering vector.</p>

                <div className="space-y-3 mt-4">
                  {topCandidates.map((c) => (
                    <div key={c.name} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white text-xs">{c.name}</h4>
                          <p className="text-[11px] text-slate-400">{c.college} • TalentIQ: {c.talentIQ}</p>
                        </div>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {c.matchScore}% Match
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {c.skills.map((sk) => (
                          <span key={sk} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard/company/talent-search"
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs text-center hover:bg-cyan-400 transition block mt-2"
              >
                Search 3,400+ Verified Students
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
