"use client";
import { useState, useMemo } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Users, Search, Filter, ShieldCheck, CheckCircle2, Clock, 
  XCircle, Award, Eye, Mail, Sparkles, X, ChevronRight,
  TrendingUp, FileText, Check, AlertTriangle
} from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  roleApplied: string;
  appliedDate: string;
  matchScore: number;
  talentIQ: number;
  assessmentScore: number;
  stage: "Under Review" | "In Assessment" | "Interviewing" | "Offer Extended" | "Rejected";
  skills: string[];
}

const mockApplicants: Applicant[] = [
  {
    id: "app_1",
    name: "Aarav Sharma",
    email: "aarav.sharma@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    college: "IIT Bombay",
    roleApplied: "AI Systems Engineering Intern",
    appliedDate: "Sep 12, 2026",
    matchScore: 96,
    talentIQ: 780,
    assessmentScore: 94,
    stage: "Interviewing",
    skills: ["Python", "PyTorch", "Next.js", "Vector DBs"]
  },
  {
    id: "app_2",
    name: "Ananya Patel",
    email: "ananya.patel@bits.ac.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    college: "BITS Pilani",
    roleApplied: "AI Systems Engineering Intern",
    appliedDate: "Sep 11, 2026",
    matchScore: 94,
    talentIQ: 810,
    assessmentScore: 92,
    stage: "Offer Extended",
    skills: ["Python", "Vector DBs", "Docker", "System Design"]
  },
  {
    id: "app_3",
    name: "Karthik Varma",
    email: "karthik.v@iiit.ac.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    college: "IIIT Hyderabad",
    roleApplied: "Full Stack Engineer (New Grad 2026)",
    appliedDate: "Sep 10, 2026",
    matchScore: 98,
    talentIQ: 845,
    assessmentScore: 98,
    stage: "Offer Extended",
    skills: ["TypeScript", "Next.js", "System Design", "C++"]
  },
  {
    id: "app_4",
    name: "Sneha Reddy",
    email: "sneha.reddy@nitt.edu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    college: "NIT Trichy",
    roleApplied: "Full Stack Engineer (New Grad 2026)",
    appliedDate: "Sep 09, 2026",
    matchScore: 88,
    talentIQ: 730,
    assessmentScore: 86,
    stage: "In Assessment",
    skills: ["React", "TypeScript", "Next.js"]
  },
  {
    id: "app_5",
    name: "Rohan Kapoor",
    email: "rohan.k@dtu.ac.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    college: "DTU Delhi",
    roleApplied: "AI Systems Engineering Intern",
    appliedDate: "Sep 08, 2026",
    matchScore: 91,
    talentIQ: 795,
    assessmentScore: 90,
    stage: "Under Review",
    skills: ["Go", "Kubernetes", "PostgreSQL", "Docker"]
  },
  {
    id: "app_6",
    name: "Priya Sundaram",
    email: "priya.s@iitm.ac.in",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    college: "IIT Madras",
    roleApplied: "AI Systems Engineering Intern",
    appliedDate: "Sep 07, 2026",
    matchScore: 95,
    talentIQ: 825,
    assessmentScore: 96,
    stage: "Interviewing",
    skills: ["Python", "PyTorch", "Transformers", "RAG"]
  }
];

export default function ApplicantsPipelinePage() {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [activeModalApplicant, setActiveModalApplicant] = useState<Applicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredApplicants = useMemo(() => {
    return applicants.filter((a) => {
      const matchesSearch = 
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.college.toLowerCase().includes(search.toLowerCase());
      const matchesRole = selectedRole === "All" || a.roleApplied === selectedRole;
      const matchesStage = selectedStage === "All" || a.stage === selectedStage;
      return matchesSearch && matchesRole && matchesStage;
    });
  }, [applicants, search, selectedRole, selectedStage]);

  const handleStageChange = (id: string, newStage: Applicant["stage"]) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === id) {
        showToast(`Moved ${a.name} to "${newStage}" stage.`);
        return { ...a, stage: newStage };
      }
      return a;
    }));
  };

  const stageCounts = {
    total: applicants.length,
    review: applicants.filter(a => a.stage === "Under Review").length,
    assessment: applicants.filter(a => a.stage === "In Assessment").length,
    interview: applicants.filter(a => a.stage === "Interviewing").length,
    offer: applicants.filter(a => a.stage === "Offer Extended").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COMPANY" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Applicants Recruitment Pipeline" 
          subtitle="Track Candidate Progression, Automated Code Vector Assessments & Extended Offers"
          user={{
            name: "Elena Rostova",
            email: "elena@openai.com",
            role: "Head of Talent • OpenAI Labs"
          }}
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Notification Toast */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Top Metric Stage Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div 
              onClick={() => setSelectedStage("All")}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                selectedStage === "All" ? "bg-slate-800 border-cyan-500/50" : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] text-slate-400 font-bold uppercase">All Applicants</div>
              <div className="text-2xl font-black text-white mt-1">{stageCounts.total}</div>
            </div>

            <div 
              onClick={() => setSelectedStage("Under Review")}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                selectedStage === "Under Review" ? "bg-slate-800 border-amber-500/50" : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] text-amber-400 font-bold uppercase">Under Review</div>
              <div className="text-2xl font-black text-white mt-1">{stageCounts.review}</div>
            </div>

            <div 
              onClick={() => setSelectedStage("In Assessment")}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                selectedStage === "In Assessment" ? "bg-slate-800 border-indigo-500/50" : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] text-indigo-400 font-bold uppercase">Code Assessment</div>
              <div className="text-2xl font-black text-white mt-1">{stageCounts.assessment}</div>
            </div>

            <div 
              onClick={() => setSelectedStage("Interviewing")}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                selectedStage === "Interviewing" ? "bg-slate-800 border-cyan-500/50" : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] text-cyan-400 font-bold uppercase">Interviewing</div>
              <div className="text-2xl font-black text-white mt-1">{stageCounts.interview}</div>
            </div>

            <div 
              onClick={() => setSelectedStage("Offer Extended")}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                selectedStage === "Offer Extended" ? "bg-slate-800 border-emerald-500/50" : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] text-emerald-400 font-bold uppercase">Offers Extended</div>
              <div className="text-2xl font-black text-white mt-1">{stageCounts.offer}</div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search applicant name, email, or institution..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Applied Opportunities</option>
                  <option value="AI Systems Engineering Intern">AI Systems Engineering Intern</option>
                  <option value="Full Stack Engineer (New Grad 2026)">Full Stack Engineer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applicant Pipeline Table */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Opportunity Applied</th>
                    <th className="p-4 text-center">Vector Match %</th>
                    <th className="p-4 text-center">Assessment Score</th>
                    <th className="p-4">Recruitment Stage</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredApplicants.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        No applicants found matching the active filters.
                      </td>
                    </tr>
                  ) : (
                    filteredApplicants.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-900/60 transition group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={app.avatar} alt={app.name} className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0" />
                            <div>
                              <div className="font-bold text-white group-hover:text-cyan-300 transition">
                                {app.name}
                              </div>
                              <div className="text-[11px] text-slate-400">{app.college} • {app.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-medium text-slate-200">{app.roleApplied}</div>
                          <div className="text-[11px] text-slate-400">Applied {app.appliedDate}</div>
                        </td>

                        <td className="p-4 text-center">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30">
                            {app.matchScore}%
                          </span>
                        </td>

                        <td className="p-4 text-center font-extrabold text-white">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                            {app.assessmentScore}/100
                          </span>
                        </td>

                        <td className="p-4">
                          <select 
                            value={app.stage}
                            onChange={(e) => handleStageChange(app.id, e.target.value as Applicant["stage"])}
                            className={`py-1.5 px-2.5 rounded-xl border text-xs font-bold focus:outline-none ${
                              app.stage === "Offer Extended" 
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                                : app.stage === "Interviewing" 
                                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" 
                                : app.stage === "In Assessment" 
                                ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" 
                                : "bg-slate-800 text-slate-300 border-slate-700"
                            }`}
                          >
                            <option value="Under Review">Under Review</option>
                            <option value="In Assessment">In Assessment</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer Extended">Offer Extended</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setActiveModalApplicant(app)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs transition flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Vector Profile</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Applicant Vector Details Modal */}
      {activeModalApplicant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setActiveModalApplicant(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img src={activeModalApplicant.avatar} alt={activeModalApplicant.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500" />
              <div>
                <h3 className="text-lg font-black text-white">{activeModalApplicant.name}</h3>
                <p className="text-xs text-slate-400">{activeModalApplicant.college} • {activeModalApplicant.email}</p>
                <div className="text-xs text-cyan-400 font-bold mt-1">
                  Applied for: {activeModalApplicant.roleApplied}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Skill Vector Match</span>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">{activeModalApplicant.matchScore}%</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Code Benchmark Score</span>
                  <div className="text-2xl font-black text-cyan-400 mt-0.5">{activeModalApplicant.assessmentScore} / 100</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Verified Competencies:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalApplicant.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button 
                onClick={() => {
                  handleStageChange(activeModalApplicant.id, "Offer Extended");
                  setActiveModalApplicant(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Extend Official Offer
              </button>
              <button 
                onClick={() => setActiveModalApplicant(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
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
