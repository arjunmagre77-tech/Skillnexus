"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Building2, Search, Filter, Sparkles, CheckCircle2, 
  MapPin, DollarSign, Clock, ArrowRight, Check, X,
  AlertCircle, Briefcase, ChevronRight, Bookmark, Share2,
  TrendingUp, Award, ExternalLink
} from "lucide-react";

interface JobMatch {
  id: string;
  company: string;
  logo: string;
  role: string;
  category: "fullstack" | "aiml" | "devops" | "cloud";
  salary: string;
  location: string;
  workMode: "remote" | "hybrid" | "onsite";
  experience: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  postedDate: string;
  description: string;
  requirements: string[];
  perks: string[];
}

export default function JobMatchesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMode, setSelectedMode] = useState<string>("all");
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [activeModalJob, setActiveModalJob] = useState<JobMatch | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  const jobMatches: JobMatch[] = [
    {
      id: "job_1",
      company: "OpenAI Labs",
      logo: "🤖",
      role: "AI Systems Engineer",
      category: "aiml",
      salary: "$140,000 - $180,000 / yr",
      location: "San Francisco, CA (Hybrid)",
      workMode: "hybrid",
      experience: "0-2 Years (Entry / Grad)",
      matchScore: 94,
      matchingSkills: ["Python", "Next.js", "PyTorch", "TypeScript", "REST APIs"],
      missingSkills: ["Vector DBs (Qdrant)"],
      postedDate: "1 day ago",
      description: "Join OpenAI Labs to design microservice APIs, optimize deep learning inferencing infrastructure, and construct scalable frontend developer dashboards.",
      requirements: [
        "Strong proficiency in Python, PyTorch, and Next.js / TypeScript",
        "Experience building high-throughput REST APIs and asynchronous microservices",
        "Familiarity with Vector databases (Pinecone, Qdrant, ChromaDB)",
        "Passionate about foundation models, modern AI applications, and robust developer UI"
      ],
      perks: ["$150K Equity Package", "Comprehensive Healthcare", "Unlimited PTO", "Remote Workspace Stipend"]
    },
    {
      id: "job_2",
      company: "Stripe",
      logo: "💳",
      role: "Full Stack Platform Engineer",
      category: "fullstack",
      salary: "₹18 - ₹24 LPA",
      location: "Bengaluru, India",
      workMode: "hybrid",
      experience: "Freshers & New Grads",
      matchScore: 89,
      matchingSkills: ["TypeScript", "Next.js", "Node.js", "SQL", "React"],
      missingSkills: ["Kafka & Event Streaming"],
      postedDate: "2 days ago",
      description: "Stripe is looking for innovative Full Stack Engineers to build financial infrastructure powering millions of businesses around the world.",
      requirements: [
        "Solid foundation in Data Structures, Algorithms, and System Design",
        "Hands-on expertise with React, TypeScript, Node.js, and SQL databases",
        "Interest in payment processing pipelines, security standards, and high-concurrency systems",
        "Strong collaboration skills and product-first engineering mindset"
      ],
      perks: ["Performance Bonus", "Wellness Allowance", "Top-tier Health Insurance", "Learning & Development Budget"]
    },
    {
      id: "job_3",
      company: "Databricks",
      logo: "⚡",
      role: "ML Infrastructure Engineer",
      category: "aiml",
      salary: "$130,000 - $165,000 / yr",
      location: "Remote (Global)",
      workMode: "remote",
      experience: "0-1 Years",
      matchScore: 82,
      matchingSkills: ["Python", "PyTorch", "Git", "SQL"],
      missingSkills: ["Kubernetes & Ray Distributed Compute"],
      postedDate: "3 days ago",
      description: "Databricks ML Infra team develops scalable GPU clusters and distributed model training engines powering enterprise AI deployments.",
      requirements: [
        "Proficiency with Python, CUDA/PyTorch runtime optimization",
        "Understanding of distributed data processing concepts",
        "Comfortable with Git workflows, Docker containerization, and Linux environments"
      ],
      perks: ["Remote Work Freedom", "Stock Options", "Home Office Setup Allowance", "Annual Global Retreat"]
    },
    {
      id: "job_4",
      company: "Razorpay",
      logo: "💸",
      role: "Backend Systems Developer",
      category: "fullstack",
      salary: "₹14 - ₹18 LPA",
      location: "Bengaluru, India",
      workMode: "onsite",
      experience: "0-2 Years",
      matchScore: 91,
      matchingSkills: ["Node.js", "TypeScript", "SQL", "REST APIs", "Git"],
      missingSkills: ["Redis Caching"],
      postedDate: "Just now",
      description: "Build robust, low-latency financial API services handling tens of millions of daily checkout transactions across India.",
      requirements: [
        "Experience in Node.js, Express/NestJS, and relational databases (PostgreSQL/MySQL)",
        "Understanding of API security, OAuth, and distributed transactions",
        "Strong problem-solving and debugging skills"
      ],
      perks: ["Annual Health Checkups", "Relocation Support", "Flexible Work Hours", "Free Meals & Snacks"]
    },
    {
      id: "job_5",
      company: "Cloudflare",
      logo: "☁️",
      role: "Cloud Edge & DevOps Engineer",
      category: "cloud",
      salary: "$125,000 - $150,000 / yr",
      location: "Remote (US / India)",
      workMode: "remote",
      experience: "Freshers / 2026 Batch",
      matchScore: 86,
      matchingSkills: ["TypeScript", "Docker", "Git", "REST APIs"],
      missingSkills: ["Terraform & Cloudflare Workers"],
      postedDate: "4 days ago",
      description: "Architect ultra-fast edge computing runtimes and global DNS distribution networks serving millions of Web requests per second.",
      requirements: [
        "Proficiency in Docker, CI/CD pipelines, and cloud networking basics",
        "Strong scripting abilities in TypeScript/JavaScript or Go/Python",
        "Eagerness to tackle web performance and cybersecurity challenges"
      ],
      perks: ["Competitive Pay", "Flexible PTO", "Mental Health Support", "Generous Parent Leaves"]
    },
    {
      id: "job_6",
      company: "Swiggy Labs",
      logo: "🛵",
      role: "Full Stack Innovation Engineer",
      category: "fullstack",
      salary: "₹12 - ₹16 LPA",
      location: "Bengaluru, India (Hybrid)",
      workMode: "hybrid",
      experience: "0-1 Years",
      matchScore: 88,
      matchingSkills: ["React", "Node.js", "JavaScript", "SQL"],
      missingSkills: ["GraphQL & Micro-frontends"],
      postedDate: "5 days ago",
      description: "Work directly inside Swiggy's experimental R&D wing building next-gen hyper-local logistics and AI recommendation widgets.",
      requirements: [
        "Demonstrated project portfolio built with MERN stack or modern Next.js",
        "Understanding of responsive mobile-first UI design principles",
        "Comfortable conducting rapid prototyping and A/B experiments"
      ],
      perks: ["Swiggy One VIP Access", "Skill Learning Reimbursements", "Regular Hackathons", "Gym Membership"]
    }
  ];

  const handleApply = (job: JobMatch) => {
    if (!appliedIds.includes(job.id)) {
      setAppliedIds([...appliedIds, job.id]);
      setShowToast(`Application successfully submitted to ${job.company} for ${job.role}!`);
      setTimeout(() => setShowToast(null), 4000);
    }
  };

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(item => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const filteredJobs = jobMatches.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(search.toLowerCase()) || 
                          job.company.toLowerCase().includes(search.toLowerCase()) ||
                          job.matchingSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesMode = selectedMode === "all" || job.workMode === selectedMode;

    return matchesSearch && matchesCategory && matchesMode;
  });

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="AI Job Matches" 
          subtitle="Explore full-time career opportunities tailored to your verified skill vector."
        />

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-cyan-400/40 animate-in fade-in slide-in-from-bottom-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-200" />
            <span className="text-xs font-bold">{showToast}</span>
          </div>
        )}

        <main className="p-6 space-y-6 overflow-y-auto">
          
          {/* Top Banner: Skill Compatibility Summary */}
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 p-6 bg-gradient-to-r from-[#09152e] via-[#0b1c3e] to-[#071126] shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    AI Vector Match Active
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Updated 5m ago</span>
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  High-Compatibility Career Opportunities
                </h1>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Our matching engine cross-references your verified skill scores with active job requirements across top technology companies.
                </p>
              </div>

              {/* Match Stats */}
              <div className="flex items-center gap-3 self-start lg:self-center">
                <div className="p-3.5 rounded-2xl bg-[#0e1b38] border border-cyan-500/40 text-center min-w-[100px]">
                  <div className="text-2xl font-black text-cyan-400">92%</div>
                  <div className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">Average Fit</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0e1b38] border border-blue-500/40 text-center min-w-[100px]">
                  <div className="text-2xl font-black text-blue-400">{filteredJobs.length}</div>
                  <div className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">Positions</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0e1b38] border border-emerald-500/40 text-center min-w-[100px]">
                  <div className="text-2xl font-black text-emerald-400">{appliedIds.length}</div>
                  <div className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">Applied</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filtering Control Bar */}
          <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-[#0e1626] border border-slate-800 rounded-xl px-3.5 py-2.5 w-full md:w-96 focus-within:border-cyan-500 transition">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-slate-500 hover:text-slate-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Select Work Mode */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1.5 bg-[#0e1626] border border-slate-800 rounded-xl p-1 text-xs">
                  <span className="text-slate-400 px-2 font-semibold">Mode:</span>
                  {(["all", "remote", "hybrid", "onsite"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setSelectedMode(mode)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                        selectedMode === mode
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-semibold mr-1">Category:</span>
              {[
                { id: "all", label: "All Roles" },
                { id: "fullstack", label: "Full Stack & Web" },
                { id: "aiml", label: "AI & Machine Learning" },
                { id: "devops", label: "DevOps & SRE" },
                { id: "cloud", label: "Cloud & Security" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                    selectedCategory === cat.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                      : "bg-[#0e1626] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Matches Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#091022] border border-slate-800 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No job matches found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try adjusting your search criteria or resetting filters to view more recommendations.
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("all"); setSelectedMode("all"); }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const isApplied = appliedIds.includes(job.id);
                const isSaved = savedIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-5 shadow-xl group relative overflow-hidden"
                  >
                    {/* Background accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 opacity-60 group-hover:opacity-100 transition" />

                    <div className="space-y-4">
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner shrink-0">
                            {job.logo}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                              {job.role}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">{job.company}</p>
                          </div>
                        </div>

                        {/* Save bookmark button */}
                        <button
                          onClick={() => toggleSave(job.id)}
                          className={`p-2 rounded-xl border transition ${
                            isSaved 
                              ? "bg-amber-500/20 border-amber-500/40 text-amber-400" 
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-amber-400" : ""}`} />
                        </button>
                      </div>

                      {/* Salary & Location */}
                      <div className="p-3 rounded-2xl bg-[#0d162d] border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Package:</span>
                          <span className="font-bold text-emerald-400">{job.salary}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400" /> Location:
                          </span>
                          <span className="text-slate-200 font-semibold truncate max-w-[160px]">
                            {job.location}
                          </span>
                        </div>
                      </div>

                      {/* Match Score Badge & Experience */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {job.matchScore}% Match Fit
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-semibold">{job.experience}</span>
                      </div>

                      {/* Matching Skills */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Verified Skill Alignment:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {job.matchingSkills.map((sk) => (
                            <span key={sk} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              ✓ {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing Skill Gaps */}
                      {job.missingSkills.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[10px] uppercase font-bold text-rose-400 tracking-wider flex items-center justify-between">
                            <span>Skill Gap to Close:</span>
                            <Link href="/dashboard/student/skills" className="text-cyan-400 hover:underline font-normal capitalize">
                              Bridge Gap →
                            </Link>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.missingSkills.map((sk) => (
                              <span key={sk} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                ⚠️ {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalJob(job)}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition"
                      >
                        Details
                      </button>

                      {isApplied ? (
                        <button disabled className="flex-1 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 cursor-default">
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApply(job)}
                          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Apply with Skill Vector</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Detailed Job Match & Application Modal */}
      {activeModalJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#091022] border border-blue-500/40 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
                  {activeModalJob.logo}
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">{activeModalJob.role}</h2>
                  <p className="text-xs text-cyan-400 font-semibold">{activeModalJob.company} • {activeModalJob.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalJob(null)}
                className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Fit Highlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 font-medium">Your Vector Match Rating</span>
                <div className="text-xl font-black text-cyan-400">{activeModalJob.matchScore}% Match Score</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                High Qualification Tier
              </span>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Role Overview</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeModalJob.description}</p>
            </div>

            {/* Key Requirements */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Key Requirements</h3>
              <ul className="space-y-1.5">
                {activeModalJob.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Perks & Compensation</h3>
              <div className="flex flex-wrap gap-2">
                {activeModalJob.perks.map((perk, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-xl bg-[#0d162d] border border-slate-800 text-slate-200 font-medium">
                    🎁 {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalJob(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
              
              {appliedIds.includes(activeModalJob.id) ? (
                <button disabled className="px-6 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Application Submitted</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleApply(activeModalJob);
                    setActiveModalJob(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs hover:opacity-90 transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Application with Skill Profile</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
