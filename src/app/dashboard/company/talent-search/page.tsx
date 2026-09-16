"use client";
import { useState, useMemo } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Users, Search, Filter, ShieldCheck, Sparkles, Target, 
  Award, Mail, Eye, CheckCircle2, X, ExternalLink, ArrowUpRight,
  TrendingUp, Code, BookOpen
} from "lucide-react";

interface StudentCandidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  department: string;
  year: string;
  talentIQ: number;
  matchScore: number;
  targetRole: string;
  skills: string[];
  status: "Seeking Opportunities" | "Interviewing" | "Placed";
  github: string;
  assessmentsCompleted: number;
}

const mockCandidates: StudentCandidate[] = [
  {
    id: "cand_1",
    name: "Aarav Sharma",
    email: "aarav.sharma@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    college: "IIT Bombay",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    talentIQ: 780,
    matchScore: 96,
    targetRole: "AI Systems Engineering Intern",
    skills: ["Python", "PyTorch", "Next.js", "Vector DBs", "TypeScript"],
    status: "Seeking Opportunities",
    github: "github.com/aaravsharma",
    assessmentsCompleted: 14
  },
  {
    id: "cand_2",
    name: "Ananya Patel",
    email: "ananya.patel@bits.ac.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    college: "BITS Pilani",
    department: "AI & Data Science",
    year: "4th Year",
    talentIQ: 810,
    matchScore: 94,
    targetRole: "Full Stack ML Engineer",
    skills: ["Python", "Vector DBs", "Docker", "System Design", "React"],
    status: "Seeking Opportunities",
    github: "github.com/ananyapatel",
    assessmentsCompleted: 18
  },
  {
    id: "cand_3",
    name: "Karthik Varma",
    email: "karthik.v@iiit.ac.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    college: "IIIT Hyderabad",
    department: "Computer Science",
    year: "4th Year",
    talentIQ: 845,
    matchScore: 98,
    targetRole: "LLM & GPU Systems Engineer",
    skills: ["C++", "PyTorch", "CUDA", "System Design", "Python"],
    status: "Interviewing",
    github: "github.com/karthikv",
    assessmentsCompleted: 22
  },
  {
    id: "cand_4",
    name: "Sneha Reddy",
    email: "sneha.reddy@nitt.edu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    college: "NIT Trichy",
    department: "Information Technology",
    year: "3rd Year",
    talentIQ: 730,
    matchScore: 88,
    targetRole: "Frontend Platform Engineer",
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    status: "Seeking Opportunities",
    github: "github.com/snehareddy",
    assessmentsCompleted: 11
  },
  {
    id: "cand_5",
    name: "Rohan Kapoor",
    email: "rohan.k@dtu.ac.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    college: "DTU Delhi",
    department: "Software Engineering",
    year: "4th Year",
    talentIQ: 795,
    matchScore: 91,
    targetRole: "Backend Distributed Systems Engineer",
    skills: ["Go", "Kubernetes", "PostgreSQL", "System Design", "Docker"],
    status: "Seeking Opportunities",
    github: "github.com/rohankapoor",
    assessmentsCompleted: 16
  },
  {
    id: "cand_6",
    name: "Priya Sundaram",
    email: "priya.s@iitm.ac.in",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    college: "IIT Madras",
    department: "Computer Science",
    year: "3rd Year",
    talentIQ: 825,
    matchScore: 95,
    targetRole: "AI Alignment & Safety Researcher",
    skills: ["Python", "PyTorch", "Transformers", "Math", "RAG"],
    status: "Seeking Opportunities",
    github: "github.com/priyasun",
    assessmentsCompleted: 19
  }
];

export default function TalentDiscoveryPage() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [selectedMinIQ, setSelectedMinIQ] = useState("All");
  const [activeModalCandidate, setActiveModalCandidate] = useState<StudentCandidate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.college.toLowerCase().includes(search.toLowerCase()) ||
        c.targetRole.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));

      const matchesSkill = selectedSkill === "All" || c.skills.includes(selectedSkill);
      const matchesCollege = selectedCollege === "All" || c.college === selectedCollege;

      let matchesIQ = true;
      if (selectedMinIQ === "800") matchesIQ = c.talentIQ >= 800;
      else if (selectedMinIQ === "750") matchesIQ = c.talentIQ >= 750;
      else if (selectedMinIQ === "700") matchesIQ = c.talentIQ >= 700;

      return matchesSearch && matchesSkill && matchesCollege && matchesIQ;
    });
  }, [search, selectedSkill, selectedCollege, selectedMinIQ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COMPANY" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Verified Talent Discovery" 
          subtitle="Explore 3,400+ Students Screened via Automated Code Vector Assessments & TalentIQ Ratings"
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

          {/* Search & Multi-Filter Bar */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search candidate name, college, skill (e.g. PyTorch, Vector DBs), or role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span>Showing {filteredCandidates.length} Candidates</span>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select 
                  value={selectedSkill} 
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Core Skills</option>
                  <option value="PyTorch">PyTorch</option>
                  <option value="Vector DBs">Vector DBs</option>
                  <option value="Python">Python</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Next.js">Next.js</option>
                  <option value="System Design">System Design</option>
                  <option value="C++">C++</option>
                  <option value="Go">Go</option>
                </select>
              </div>

              <div>
                <select 
                  value={selectedCollege} 
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Partner Institutions</option>
                  <option value="IIT Bombay">IIT Bombay</option>
                  <option value="BITS Pilani">BITS Pilani</option>
                  <option value="IIIT Hyderabad">IIIT Hyderabad</option>
                  <option value="IIT Madras">IIT Madras</option>
                  <option value="NIT Trichy">NIT Trichy</option>
                  <option value="DTU Delhi">DTU Delhi</option>
                </select>
              </div>

              <div>
                <select 
                  value={selectedMinIQ} 
                  onChange={(e) => setSelectedMinIQ(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All TalentIQ Scores</option>
                  <option value="800">&gt;800 TalentIQ (Top 5%)</option>
                  <option value="750">&gt;750 TalentIQ (Top 15%)</option>
                  <option value="700">&gt;700 TalentIQ (Top 30%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Candidate Grid Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-slate-900/90 border border-slate-800 rounded-3xl text-slate-400">
                No verified candidates match the selected filter criteria. Try adjusting your search.
              </div>
            ) : (
              filteredCandidates.map((c) => (
                <div 
                  key={c.id} 
                  className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition shadow-xl group"
                >
                  <div className="space-y-3">
                    {/* Header profile info */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={c.avatar} 
                          alt={c.name} 
                          className="w-11 h-11 rounded-2xl object-cover border-2 border-cyan-500/40 shrink-0" 
                        />
                        <div>
                          <h4 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition">
                            {c.name}
                          </h4>
                          <p className="text-[11px] text-slate-400">{c.college} • {c.year}</p>
                          <span className="text-[10px] text-slate-500 font-medium">{c.department}</span>
                        </div>
                      </div>

                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                        {c.matchScore}% Match
                      </span>
                    </div>

                    {/* Target Role & TalentIQ */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-[11px]">Target Role:</span>
                        <span className="font-bold text-white text-[11px] truncate max-w-[150px]">{c.targetRole}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-800/60">
                        <span className="text-slate-400 text-[11px]">TalentIQ Rating:</span>
                        <span className="font-black text-cyan-400 text-xs flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> {c.talentIQ} pts
                        </span>
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">Verified Skill Vector</div>
                      <div className="flex flex-wrap gap-1">
                        {c.skills.map((sk) => (
                          <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalCandidate(c)}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Breakdown</span>
                    </button>

                    <button
                      onClick={() => showToast(`⚡ Fast-track invite sent to ${c.name}`)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-slate-950 font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Invite</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Full Profile & Vector Modal */}
      {activeModalCandidate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setActiveModalCandidate(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img src={activeModalCandidate.avatar} alt={activeModalCandidate.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500" />
              <div>
                <h3 className="text-lg font-black text-white">{activeModalCandidate.name}</h3>
                <p className="text-xs text-slate-400">{activeModalCandidate.college} • {activeModalCandidate.department}</p>
                <p className="text-xs text-cyan-400 font-semibold mt-0.5">{activeModalCandidate.email}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">TalentIQ Index</span>
                  <div className="text-xl font-black text-cyan-400 mt-1">{activeModalCandidate.talentIQ} / 900</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Vector Match Score</span>
                  <div className="text-xl font-black text-emerald-400 mt-1">{activeModalCandidate.matchScore}% Match</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-300">Automated Skill Vector Competency</span>
                  <span className="text-cyan-400">{activeModalCandidate.assessmentsCompleted} Assessments Passed</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeModalCandidate.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">GitHub Verified Profile:</span>
                <span className="text-cyan-400 font-mono font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  {activeModalCandidate.github} <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button 
                onClick={() => {
                  showToast(`🚀 Assessment challenge link sent to ${activeModalCandidate.email}`);
                  setActiveModalCandidate(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Send Assessment Challenge
              </button>
              <button 
                onClick={() => setActiveModalCandidate(null)}
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
