"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Briefcase, PlusCircle, Search, Filter, Users, 
  CheckCircle2, PauseCircle, Trash2, Edit3, X, Sparkles,
  ArrowRight, ShieldCheck, DollarSign, MapPin
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  type: "Internship" | "Full-Time Job" | "Contract";
  location: string;
  stipend: string;
  applicants: number;
  highMatchCount: number;
  status: "Active" | "Paused" | "Closed";
  skills: string[];
  postedDate: string;
}

const initialPostings: JobPosting[] = [
  {
    id: "post_1",
    title: "AI Systems Engineering Intern",
    type: "Internship",
    location: "San Francisco, CA (Hybrid)",
    stipend: "$4,500 / month",
    applicants: 142,
    highMatchCount: 28,
    status: "Active",
    skills: ["Python", "PyTorch", "Next.js", "Vector DBs"],
    postedDate: "Sep 10, 2026"
  },
  {
    id: "post_2",
    title: "Full Stack Platform Engineer (New Grad 2026)",
    type: "Full-Time Job",
    location: "Remote",
    stipend: "$140,000 / year",
    applicants: 42,
    highMatchCount: 14,
    status: "Active",
    skills: ["TypeScript", "Next.js", "System Design", "PostgreSQL"],
    postedDate: "Sep 04, 2026"
  },
  {
    id: "post_3",
    title: "LLM Safety & Alignment Research Fellow",
    type: "Internship",
    location: "Remote",
    stipend: "$5,000 / month",
    applicants: 89,
    highMatchCount: 19,
    status: "Active",
    skills: ["Python", "PyTorch", "Transformers", "RLHF"],
    postedDate: "Aug 28, 2026"
  },
  {
    id: "post_4",
    title: "GPU Kernel Optimization Engineer",
    type: "Full-Time Job",
    location: "San Francisco, CA",
    stipend: "$165,000 / year",
    applicants: 18,
    highMatchCount: 5,
    status: "Paused",
    skills: ["C++", "CUDA", "PyTorch Internal", "Triton"],
    postedDate: "Aug 15, 2026"
  }
];

export default function OpportunityManagementPage() {
  const [postings, setPostings] = useState<JobPosting[]>(initialPostings);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    type: "Internship" as JobPosting["type"],
    location: "Remote / Hybrid",
    stipend: "$3,500 / month",
    skills: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPostings = postings.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === "All" || p.type === selectedType;
    const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    setPostings(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === "Active" ? "Paused" : "Active";
        showToast(`Status updated for "${p.title}" to ${nextStatus}`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleDeletePosting = (id: string, title: string) => {
    setPostings(prev => prev.filter(p => p.id !== id));
    showToast(`🗑️ Removed posting "${title}"`);
  };

  const handleCreatePosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newPostingItem: JobPosting = {
      id: `post_${Date.now()}`,
      title: formData.title,
      type: formData.type,
      location: formData.location,
      stipend: formData.stipend,
      applicants: 0,
      highMatchCount: 0,
      status: "Active",
      skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : ["Software Engineering"],
      postedDate: "Just now"
    };

    setPostings([newPostingItem, ...postings]);
    setShowModal(false);
    setFormData({ title: "", type: "Internship", location: "Remote / Hybrid", stipend: "$3,500 / month", skills: "" });
    showToast(`🎉 Opportunity "${newPostingItem.title}" created successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COMPANY" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Opportunity Management" 
          subtitle="Post & Manage Internships, Entry-Level Positions & High-Impact Industry Roles"
          user={{
            name: "Elena Rostova",
            email: "elena@openai.com",
            role: "Head of Talent • OpenAI Labs"
          }}
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Action Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Opportunity Listings</span>
              <h2 className="text-xl font-extrabold text-white mt-1">Manage Talent Recruitment Pipelines</h2>
              <p className="text-xs text-slate-400 mt-0.5">Track applicant numbers, skill vector matches, and listing statuses.</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-extrabold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Post New Opportunity</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search postings by role title or required skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Types</option>
                  <option value="Internship">Internship</option>
                  <option value="Full-Time Job">Full-Time Job</option>
                </select>

                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Opportunity Cards List */}
          <div className="space-y-4">
            {filteredPostings.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-3xl text-slate-400">
                No job or internship postings match your query.
              </div>
            ) : (
              filteredPostings.map((p) => (
                <div 
                  key={p.id} 
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition shadow-xl"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-white text-base">{p.title}</h3>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                        {p.type}
                      </span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        p.status === "Active" 
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {p.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {p.stipend}
                      </span>
                      <span className="text-slate-500">Posted {p.postedDate}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.skills.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Applicants Stat & Actions */}
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                    <div className="text-right pr-4 md:border-r border-slate-800">
                      <div className="text-xl font-black text-white">{p.applicants}</div>
                      <div className="text-[11px] text-slate-400">Candidates ({p.highMatchCount} High-Match)</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/dashboard/company/applicants"
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Review Pipeline</span>
                      </Link>

                      <button
                        onClick={() => handleToggleStatus(p.id)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                        title={p.status === "Active" ? "Pause Posting" : "Activate Posting"}
                      >
                        {p.status === "Active" ? <PauseCircle className="w-4 h-4 text-amber-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>

                      <button
                        onClick={() => handleDeletePosting(p.id, p.title)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                        title="Delete Posting"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Post Opportunity Form Modal */}
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
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                Post Opportunity to Student Pool
              </h3>
              <p className="text-xs text-slate-400 mt-1">Specify required skill vectors and compensation to match top-rated students.</p>
            </div>

            <form onSubmit={handleCreatePosting} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Opportunity Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. LLM & Systems Optimization Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Role Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as JobPosting["type"] })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-Time Job">Full-Time Job</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Location / Work Mode</label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Stipend / Salary Package</label>
                <input 
                  type="text"
                  placeholder="e.g. $4,000 / month"
                  value={formData.stipend}
                  onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Required Core Skills (comma separated)</label>
                <input 
                  type="text"
                  placeholder="e.g. PyTorch, CUDA, Vector DBs, C++"
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
                  Publish Opportunity
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
    </div>
  );
}
