"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  FolderKanban, PlusCircle, Search, Award, Users, Code, 
  Sparkles, X, CheckCircle2, DollarSign, Calendar, Eye,
  Trophy, ExternalLink
} from "lucide-react";

interface IndustryProject {
  id: string;
  title: string;
  domain: string;
  grantBounty: string;
  submissionsCount: number;
  status: "Active" | "Judging" | "Completed";
  deadline: string;
  skills: string[];
  topStudentSubmission?: {
    studentName: string;
    college: string;
    score: number;
  };
}

const mockProjects: IndustryProject[] = [
  {
    id: "proj_1",
    title: "Distributed Vector Database Indexing Challenge",
    domain: "Distributed Systems & AI",
    grantBounty: "$10,000 Grants & Interview Fast-Track",
    submissionsCount: 48,
    status: "Active",
    deadline: "Oct 15, 2026",
    skills: ["C++", "CUDA", "Vector Search", "HNSW"],
    topStudentSubmission: {
      studentName: "Karthik Varma & Team",
      college: "IIIT Hyderabad",
      score: 98
    }
  },
  {
    id: "proj_2",
    title: "Real-Time Agentic Code Refactoring CLI Tool",
    domain: "Developer Tools / AI",
    grantBounty: "$7,500 Prize Pool",
    submissionsCount: 32,
    status: "Active",
    deadline: "Oct 01, 2026",
    skills: ["TypeScript", "Node.js", "LLM APIs", "AST Parsing"],
    topStudentSubmission: {
      studentName: "Aarav Sharma",
      college: "IIT Bombay",
      score: 95
    }
  },
  {
    id: "proj_3",
    title: "Zero-Knowledge Proof Verification for Skill Badges",
    domain: "Web3 / Cryptography",
    grantBounty: "$5,000 Grant",
    submissionsCount: 19,
    status: "Judging",
    deadline: "Sep 01, 2026",
    skills: ["Rust", "ZK-Snarks", "Smart Contracts"],
    topStudentSubmission: {
      studentName: "Ananya Patel",
      college: "BITS Pilani",
      score: 92
    }
  }
];

export default function IndustryProjectsPage() {
  const [projects, setProjects] = useState<IndustryProject[]>(mockProjects);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeProjectDetail, setActiveProjectDetail] = useState<IndustryProject | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    domain: "AI / Machine Learning",
    grantBounty: "$5,000 Grant",
    deadline: "Oct 30, 2026",
    skills: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.domain.toLowerCase().includes(search.toLowerCase()) ||
    p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newProject: IndustryProject = {
      id: `proj_${Date.now()}`,
      title: formData.title,
      domain: formData.domain,
      grantBounty: formData.grantBounty,
      submissionsCount: 0,
      status: "Active",
      deadline: formData.deadline,
      skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : ["Software Engineering"]
    };

    setProjects([newProject, ...projects]);
    setShowModal(false);
    setFormData({ title: "", domain: "AI / Machine Learning", grantBounty: "$5,000 Grant", deadline: "Oct 30, 2026", skills: "" });
    showToast(`🏆 Industry Challenge "${newProject.title}" launched successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COMPANY" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Industry Sponsored Projects & Challenges" 
          subtitle="Sponsor Real-World Capstone Projects, Hackathons & Bounties to Recruit Proven Student Builders"
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

          {/* Top Banner Action & Metrics */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> Company Sponsored Industry Challenges
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">Discover Top Engineering Teams in Action</h2>
              <p className="text-xs text-slate-400 mt-0.5">Evaluate working code repositories, architecture decisions, and bench scores directly.</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-extrabold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Sponsor New Challenge</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search industry projects by domain, title, or tech stack..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-slate-900/90 border border-slate-800 rounded-3xl text-slate-400">
                No sponsored industry challenges found matching search.
              </div>
            ) : (
              filteredProjects.map((p) => (
                <div 
                  key={p.id}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        {p.domain}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-cyan-300 transition">
                      {p.title}
                    </h3>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="text-emerald-400 font-bold flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" /> {p.grantBounty}
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Deadline: {p.deadline}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {p.skills.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>

                    {p.topStudentSubmission && (
                      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs">
                        <span className="text-slate-400 text-[11px] block">Top Submitting Team:</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-bold text-white text-xs">{p.topStudentSubmission.studentName} ({p.topStudentSubmission.college})</span>
                          <span className="text-xs font-black text-emerald-400">{p.topStudentSubmission.score}/100</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">{p.submissionsCount} Submissions</span>

                    <button
                      onClick={() => setActiveProjectDetail(p)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Submissions</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Sponsor New Challenge Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-cyan-400" />
                Sponsor Industry Challenge
              </h3>
              <p className="text-xs text-slate-400 mt-1">Launch a real-world problem statement for university student builders.</p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Challenge Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Next-Gen GPU Memory Allocation Benchmark"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Domain</label>
                  <select 
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI / Machine Learning">AI / Machine Learning</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Web3 / Security">Web3 / Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Bounty / Grant Amount</label>
                  <input 
                    type="text"
                    value={formData.grantBounty}
                    onChange={(e) => setFormData({ ...formData, grantBounty: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Required Tech Stack (comma separated)</label>
                <input 
                  type="text"
                  placeholder="e.g. PyTorch, CUDA, C++, Docker"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition cursor-pointer"
                >
                  Launch Industry Challenge
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Submissions Detail Modal */}
      {activeProjectDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setActiveProjectDetail(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">{activeProjectDetail.domain}</span>
              <h3 className="text-lg font-black text-white mt-0.5">{activeProjectDetail.title}</h3>
              <p className="text-xs text-slate-400">{activeProjectDetail.submissionsCount} Student Team Code Submissions</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Top Evaluated Repository</span>
                  <span className="text-emerald-400 font-extrabold">{activeProjectDetail.topStudentSubmission?.score || 95}/100</span>
                </div>
                <div className="text-slate-300">
                  {activeProjectDetail.topStudentSubmission?.studentName || "Aarav Sharma"} ({activeProjectDetail.topStudentSubmission?.college || "IIT Bombay"})
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button 
                onClick={() => {
                  showToast(`Direct interview invite sent to top submission lead.`);
                  setActiveProjectDetail(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Fast-Track Top Team to Interview
              </button>
              <button 
                onClick={() => setActiveProjectDetail(null)}
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
