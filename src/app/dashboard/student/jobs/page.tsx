"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Target, Search, Filter, Bookmark, Check, ArrowRight,
  Briefcase, MapPin, Clock, Star, SlidersHorizontal, 
  ChevronLeft, ChevronRight, Sparkles, Building2, CheckCircle2,
  Calendar, DollarSign, X
} from "lucide-react";

interface JobCard {
  id: string;
  company: string;
  logo: string;
  logoBg: string;
  role: string;
  type: "Internship" | "Full-time";
  badge: "Top Match" | "Recommended" | "Trending" | "New" | "Hot Job";
  badgeColor: string;
  location: string;
  workMode: "On-site" | "Hybrid" | "Remote";
  durationOrExp: string;
  skills: string[];
  extraSkillsCount: number;
  salary: string;
  matchScore: number;
  postedDate: string;
  isSaved?: boolean;
  isApplied?: boolean;
}

export default function JobMatchesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "recommended" | "applied" | "saved">("all");
  const [sortBy, setSortBy] = useState<string>("best");
  const [savedIds, setSavedIds] = useState<string[]>(["job_1"]);
  const [appliedIds, setAppliedIds] = useState<string[]>(["job_2", "job_4"]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedJob, setSelectedJob] = useState<JobCard | null>(null);

  const initialJobs: JobCard[] = [
    {
      id: "job_1",
      company: "Google",
      logo: "G",
      logoBg: "bg-white text-slate-900 border border-slate-200",
      role: "Software Development Engineer Intern",
      type: "Internship",
      badge: "Top Match",
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
      location: "Bengaluru, India",
      workMode: "On-site",
      durationOrExp: "3 months",
      skills: ["Python", "Data Structures", "Algorithms", "System Design"],
      extraSkillsCount: 2,
      salary: "₹ 80,000 / month",
      matchScore: 92,
      postedDate: "Posted 2 days ago"
    },
    {
      id: "job_2",
      company: "Tata Consultancy Services",
      logo: "tcs",
      logoBg: "bg-gradient-to-br from-indigo-900 to-purple-900 text-white font-black",
      role: "Full Stack Developer",
      type: "Full-time",
      badge: "Recommended",
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      location: "Mumbai, India",
      workMode: "Hybrid",
      durationOrExp: "1-3 years",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      extraSkillsCount: 3,
      salary: "₹ 6,50,000 - ₹ 10,000,000 / yr",
      matchScore: 88,
      postedDate: "Posted 3 days ago"
    },
    {
      id: "job_3",
      company: "Microsoft",
      logo: "MS",
      logoBg: "bg-[#0b182d] text-cyan-400 font-black border border-cyan-500/30",
      role: "ML Engineer Intern",
      type: "Internship",
      badge: "Trending",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      location: "Hyderabad, India",
      workMode: "Remote",
      durationOrExp: "6 months",
      skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"],
      extraSkillsCount: 2,
      salary: "₹ 70,000 / month",
      matchScore: 85,
      postedDate: "Posted 4 days ago"
    },
    {
      id: "job_4",
      company: "Amazon",
      logo: "amazon",
      logoBg: "bg-slate-900 text-amber-400 font-bold border border-slate-700",
      role: "Backend Developer",
      type: "Full-time",
      badge: "New",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      location: "Bengaluru, India",
      workMode: "On-site",
      durationOrExp: "1-2 years",
      skills: ["Java", "Spring Boot", "MySQL", "REST APIs"],
      extraSkillsCount: 2,
      salary: "₹ 5,00,000 - ₹ 8,00,000 / yr",
      matchScore: 82,
      postedDate: "Posted 5 days ago"
    },
    {
      id: "job_5",
      company: "Zomato",
      logo: "Z",
      logoBg: "bg-rose-600 text-white font-black",
      role: "Frontend Developer",
      type: "Full-time",
      badge: "Hot Job",
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      location: "Gurgaon, India",
      workMode: "Hybrid",
      durationOrExp: "1-3 years",
      skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
      extraSkillsCount: 2,
      salary: "₹ 4,50,000 - ₹ 7,50,000 / yr",
      matchScore: 80,
      postedDate: "Posted 6 days ago"
    },
    {
      id: "job_6",
      company: "Adobe",
      logo: "A",
      logoBg: "bg-red-700 text-white font-black",
      role: "Cloud Engineer",
      type: "Full-time",
      badge: "Recommended",
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      location: "Noida, India",
      workMode: "Remote",
      durationOrExp: "2-4 years",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      extraSkillsCount: 2,
      salary: "₹ 8,00,000 - ₹ 12,00,000 / yr",
      matchScore: 78,
      postedDate: "Posted 1 week ago"
    }
  ];

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleApply = (job: JobCard) => {
    if (!appliedIds.includes(job.id)) {
      setAppliedIds(prev => [...prev, job.id]);
    }
    alert(`Application submitted successfully for ${job.role} at ${job.company}!`);
  };

  const filteredJobs = initialJobs.filter(job => {
    if (activeTab === "recommended") return job.badge === "Recommended" || job.badge === "Top Match";
    if (activeTab === "applied") return appliedIds.includes(job.id);
    if (activeTab === "saved") return savedIds.includes(job.id);
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
              
              {/* Left Title & Description */}
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
                      Job Matches
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      Your Personalized Job Matches
                    </h1>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-300 pl-1 leading-relaxed">
                  Jobs that match your skills, interests and career goals. Apply, grow and build your future.
                </p>
              </div>

              {/* Right Stats & Gauge */}
              <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-[#153457] pt-4 md:pt-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Matches Found</div>
                  <div className="text-3xl font-black text-white">12</div>
                  <div className="text-[11px] text-cyan-400">New opportunities</div>
                </div>

                {/* Circular Match Gauge */}
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center border-4 border-cyan-500 shadow-lg shadow-cyan-500/20 bg-[#061427]">
                  <div className="text-center">
                    <span className="text-base font-black text-white">75%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Filter Tabs & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 bg-[#050e1d] p-1 rounded-xl border border-[#142847]">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All Matches ({initialJobs.length})
              </button>
              <button
                onClick={() => setActiveTab("recommended")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "recommended"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Recommended (8)
              </button>
              <button
                onClick={() => setActiveTab("applied")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "applied"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Applied ({appliedIds.length})
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "saved"
                    ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Saved ({savedIds.length})
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
                  <option value="best" className="bg-[#050e1d] text-white">Best Match</option>
                  <option value="latest" className="bg-[#050e1d] text-white">Latest</option>
                  <option value="salary" className="bg-[#050e1d] text-white">Highest Compensation</option>
                </select>
              </div>

              <button 
                onClick={() => alert("Advanced filter drawer opened")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#050e1d] border border-[#142847] hover:border-cyan-500/40 rounded-xl text-xs text-slate-300 transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* 2-Column Job Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const isSaved = savedIds.includes(job.id);
              const isApplied = appliedIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all duration-300 shadow-lg flex flex-col justify-between group relative"
                >
                  {/* Top Row: Logo, Title, Badge, Bookmark */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        {/* Company Logo */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-extrabold shadow shrink-0 ${job.logoBg}`}>
                          {job.company === "Google" && (
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                              G
                            </span>
                          )}
                          {job.company === "Microsoft" && (
                            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                              <span className="bg-red-500 rounded-[1px]" />
                              <span className="bg-green-500 rounded-[1px]" />
                              <span className="bg-blue-500 rounded-[1px]" />
                              <span className="bg-yellow-500 rounded-[1px]" />
                            </div>
                          )}
                          {job.company === "Amazon" && (
                            <span className="text-xs tracking-tighter text-amber-400">amazon</span>
                          )}
                          {job.company === "Tata Consultancy Services" && (
                            <span className="text-xs uppercase tracking-tight text-white">tcs</span>
                          )}
                          {job.company === "Zomato" && (
                            <span className="text-lg italic font-black text-white">z</span>
                          )}
                          {job.company === "Adobe" && (
                            <span className="text-lg font-black text-white">A</span>
                          )}
                        </div>

                        {/* Role & Company info */}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${job.badgeColor}`}>
                              {job.badge}
                            </span>
                          </div>
                          <h2 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                            {job.role}
                          </h2>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {job.company} • <span className="text-slate-300">{job.type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Match Score circular badge & Bookmark */}
                      <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-full border-2 border-cyan-400 flex flex-col items-center justify-center bg-[#071933] shadow-md shadow-cyan-500/20 shrink-0">
                          <span className="text-[11px] font-black text-cyan-300 leading-none">{job.matchScore}%</span>
                          <span className="text-[7px] uppercase font-bold text-slate-400 tracking-tighter">Match</span>
                        </div>
                        <button
                          onClick={() => toggleSave(job.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isSaved 
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" 
                              : "border-[#142847] text-slate-500 hover:text-white"
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current text-cyan-400" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Metadata items: Location, Mode, Duration/Exp */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>{job.workMode}</span>
                      <span>•</span>
                      <span>{job.durationOrExp}</span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#0b1e38] text-slate-300 border border-[#163354]"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#0e2748] text-cyan-400 border border-cyan-500/20">
                        +{job.extraSkillsCount}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Salary, Posted Date & Apply Button */}
                  <div className="pt-4 mt-4 border-t border-[#122844] flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
                        <Star className="w-3 h-3 fill-current text-amber-400" />
                        {job.salary}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {job.postedDate}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApply(job)}
                      disabled={isApplied}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        isApplied
                          ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
                      }`}
                    >
                      {isApplied ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg bg-[#050e1d] border border-[#142847] flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === page
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-[#050e1d] border border-[#142847] text-slate-400 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(3, p + 1))}
              className="w-8 h-8 rounded-lg bg-[#050e1d] border border-[#142847] flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
