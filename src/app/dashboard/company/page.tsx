"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Building2, Users, Search, PlusCircle, Target, 
  CheckCircle2, Sparkles, ArrowRight, Briefcase, X,
  ShieldCheck, Award, Filter, Mail, ExternalLink, TrendingUp
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  college: string;
  avatar: string;
  talentIQ: number;
  matchScore: number;
  skills: string[];
  status: string;
  email: string;
  github: string;
}

export default function CompanyDashboardPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeCandidateModal, setActiveCandidateModal] = useState<Candidate | null>(null);

  // Form State for Post Opportunity Modal
  const [newPosting, setNewPosting] = useState({
    title: "",
    type: "Internship",
    location: "Remote / Hybrid",
    stipend: "$2,500 / month",
    skills: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [companyData, setCompanyData] = useState({
    name: "OpenAI Labs Recruiter Hub",
    activePostingsCount: 4,
    totalApplicants: 184,
    verifiedMatches: 32,
    hiredCount: 6,
  });

  const [activePostings, setActivePostings] = useState([
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
  ]);

  const topCandidates: Candidate[] = [
    {
      id: "cand_1",
      name: "Aarav Sharma",
      college: "IIT Bombay",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      talentIQ: 780,
      matchScore: 94,
      skills: ["React", "PyTorch", "TypeScript", "SQL"],
      status: "Verified Top Candidate",
      email: "aarav.sharma@iitb.ac.in",
      github: "github.com/aaravsharma"
    },
    {
      id: "cand_2",
      name: "Ananya Patel",
      college: "BITS Pilani",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      talentIQ: 810,
      matchScore: 92,
      skills: ["Python", "Vector DBs", "Docker", "System Design"],
      status: "Verified Top Candidate",
      email: "ananya.patel@bits.ac.in",
      github: "github.com/ananyapatel"
    },
    {
      id: "cand_3",
      name: "Karthik Varma",
      college: "IIIT Hyderabad",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      talentIQ: 845,
      matchScore: 96,
      skills: ["C++", "PyTorch", "CUDA", "LLM Fine-Tuning"],
      status: "Top TalentIQ Scholar",
      email: "karthik.v@iiit.ac.in",
      github: "github.com/karthikv"
    }
  ];

  const handleCreatePosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosting.title.trim()) return;

    const created = {
      id: `post_${Date.now()}`,
      role: newPosting.title,
      type: newPosting.type,
      applicants: 0,
      topMatchScore: "New",
      status: "Active",
      skills: newPosting.skills ? newPosting.skills.split(",").map(s => s.trim()) : ["AI/ML", "Full Stack"]
    };

    setActivePostings([created, ...activePostings]);
    setCompanyData(prev => ({ ...prev, activePostingsCount: prev.activePostingsCount + 1 }));
    setShowPostModal(false);
    setNewPosting({ title: "", type: "Internship", location: "Remote / Hybrid", stipend: "$2,500 / month", skills: "" });
    showToast(`🚀 Posted opportunity "${created.role}" successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COMPANY" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Recruiter Intelligence Hub" 
          subtitle={`${companyData.name} — Direct Talent Discovery powered by Verified Skill Vectors`}
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

          {/* Top Actions & Quick Stats Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Recruiter Portal & Talent Intelligence
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">Source Verified Talent Without Resume Spam</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rank candidates based on proven automated coding assessment vectors & TalentIQ metrics.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPostModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Opportunity</span>
              </button>

              <Link
                href="/dashboard/company/talent-search"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition flex items-center gap-2 border border-cyan-500/30"
              >
                <Search className="w-4 h-4" />
                <span>Search 3,400+ Candidates</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase">Active Postings</div>
              <div className="text-3xl font-black text-white mt-2">{companyData.activePostingsCount}</div>
              <p className="text-xs text-slate-400 mt-1">Internships & Full-Time Jobs</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase">Total Applicants</div>
              <div className="text-3xl font-black text-white mt-2">{companyData.totalApplicants}</div>
              <p className="text-xs text-slate-400 mt-1">Direct applications submitted</p>
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
                <Link href="/dashboard/company/postings" className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                  Manage All ({companyData.activePostingsCount}) <ArrowRight className="w-3.5 h-3.5" />
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
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                          {p.status}
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
                  AI Recommended Candidates
                </h3>
                <p className="text-xs text-slate-400 mt-1">Pre-screened candidates matching your AI Systems Engineering vector.</p>

                <div className="space-y-3 mt-4">
                  {topCandidates.map((c) => (
                    <div 
                      key={c.id} 
                      onClick={() => setActiveCandidateModal(c)}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover border border-cyan-500/30" />
                          <div>
                            <h4 className="font-bold text-white text-xs group-hover:text-cyan-300 transition">{c.name}</h4>
                            <p className="text-[11px] text-slate-400">{c.college} • TalentIQ: {c.talentIQ}</p>
                          </div>
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

      {/* Post Opportunity Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setShowPostModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                Post New Opportunity
              </h3>
              <p className="text-xs text-slate-400 mt-1">Publish a job or internship listing to SkillLink's verified student talent pool.</p>
            </div>

            <form onSubmit={handleCreatePosting} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Role Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. LLM Systems Engineer Intern"
                  value={newPosting.title}
                  onChange={(e) => setNewPosting({ ...newPosting, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Opportunity Type</label>
                  <select 
                    value={newPosting.type}
                    onChange={(e) => setNewPosting({ ...newPosting, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-Time Job">Full-Time Job</option>
                    <option value="Contract / Project">Contract / Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Stipend / Salary</label>
                  <input 
                    type="text"
                    placeholder="e.g. $3,000 / month"
                    value={newPosting.stipend}
                    onChange={(e) => setNewPosting({ ...newPosting, stipend: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Required Core Skills (comma separated)</label>
                <input 
                  type="text"
                  placeholder="e.g. Python, PyTorch, Vector DBs, Next.js"
                  value={newPosting.skills}
                  onChange={(e) => setNewPosting({ ...newPosting, skills: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition cursor-pointer"
                >
                  Publish Opportunity
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidate Breakdown Modal */}
      {activeCandidateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setActiveCandidateModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img src={activeCandidateModal.avatar} alt={activeCandidateModal.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500" />
              <div>
                <h3 className="text-lg font-black text-white">{activeCandidateModal.name}</h3>
                <p className="text-xs text-slate-400">{activeCandidateModal.college} • {activeCandidateModal.email}</p>
                <div className="text-xs text-emerald-400 font-bold mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> TalentIQ Score: {activeCandidateModal.talentIQ}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-slate-400">Match Vector Score:</div>
                  <div className="text-2xl font-black text-emerald-400">{activeCandidateModal.matchScore}%</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {activeCandidateModal.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Verified Assessment Competencies:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCandidateModal.skills.map((s) => (
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
                  showToast(`⚡ Interview invitation dispatched to ${activeCandidateModal.name}`);
                  setActiveCandidateModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Send Interview Invite
              </button>
              <button 
                onClick={() => setActiveCandidateModal(null)}
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
