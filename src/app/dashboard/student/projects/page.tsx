"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Code2, Calendar, Users, Trophy, Play, ExternalLink, 
  ArrowRight, CheckCircle2, Clock, Lightbulb, BarChart2, 
  Tag, SlidersHorizontal, ChevronRight, Sparkles, Plus,
  Layers, Brain, Image as ImageIcon, Check, X
} from "lucide-react";

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
  extraSkillsCount?: number;
  timeLeft: string;
  applicantsCount: number;
  xpReward: number;
  progress: number;
  status: "in-progress" | "completed" | "not-started";
  statusLabel: string;
  iconType: "ai" | "database" | "image";
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ongoing" | "completed">("all");
  const [sortBy, setSortBy] = useState<"latest" | "xp" | "progress">("latest");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "prj_1",
      category: "AI / ML",
      title: "Build an Enterprise RAG Pipeline with Qdrant & Vertex AI",
      description: "Create a real-world RAG system using Qdrant for vector search and Vertex AI for LLM integration.",
      skills: ["Python", "Qdrant", "Vertex AI", "FastAPI"],
      extraSkillsCount: 2,
      timeLeft: "2 weeks left",
      applicantsCount: 142,
      xpReward: 500,
      progress: 60,
      status: "in-progress",
      statusLabel: "In Progress",
      iconType: "ai"
    },
    {
      id: "prj_2",
      category: "Backend",
      title: "Implement Idempotent Payment Webhook Dispatcher",
      description: "Build a robust webhook system to handle duplicate requests and ensure idempotent processing.",
      skills: ["TypeScript", "Redis", "Node.js", "Kafka"],
      extraSkillsCount: 1,
      timeLeft: "1 week ago",
      applicantsCount: 98,
      xpReward: 600,
      progress: 100,
      status: "completed",
      statusLabel: "Completed",
      iconType: "database"
    },
    {
      id: "prj_3",
      category: "Frontend",
      title: "Edge Cached Dynamic Image Generation Microservice",
      description: "Build a microservice that generates and caches dynamic images with edge caching for better performance.",
      skills: ["Next.js", "WebAssembly", "TailwindCSS"],
      extraSkillsCount: 1,
      timeLeft: "3 days left",
      applicantsCount: 56,
      xpReward: 400,
      progress: 0,
      status: "not-started",
      statusLabel: "Not Started",
      iconType: "image"
    }
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "ongoing") return p.status === "in-progress" || p.status === "not-started";
    if (activeTab === "completed") return p.status === "completed";
    return true;
  });

  const allCount = projects.length;
  const ongoingCount = projects.filter(p => p.status === "in-progress" || p.status === "not-started").length;
  const completedCount = projects.filter(p => p.status === "completed").length;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans">
      {/* Sidebar */}
      <DashboardSidebar role="STUDENT" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          {/* Main 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN: Hero + Filters + Project Cards (approx 8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-[#163354] bg-gradient-to-r from-[#07152b] via-[#091e3d] to-[#0a2347] p-6 md:p-8 shadow-xl">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
                        <Code2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
                          Projects
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                          Build Real Projects, Gain Real Skills
                        </h1>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-1">
                      Work on industry-relevant projects, enhance your portfolio, and stand out in the job market.
                    </p>
                  </div>

                  {/* 3D Laptop Graphic */}
                  <div className="hidden sm:flex shrink-0 relative pr-4">
                    <div className="relative w-44 h-28 bg-[#0b1b36] rounded-xl border border-cyan-500/40 shadow-2xl flex flex-col items-center justify-center p-3 group hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full bg-[#050c18] rounded-lg border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                        <Code2 className="w-10 h-10 text-cyan-400 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
                      </div>
                      {/* Floating Badge Nodes */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-blue-600/80 border border-blue-400 flex items-center justify-center text-xs shadow-md">
                        ⚡
                      </div>
                      <div className="absolute -bottom-2 -left-3 w-8 h-8 rounded-lg bg-cyan-600/80 border border-cyan-400 flex items-center justify-center text-xs shadow-md">
                        📦
                      </div>
                      <div className="absolute top-1/2 -right-5 w-7 h-7 rounded-lg bg-indigo-600/80 border border-indigo-400 flex items-center justify-center text-xs shadow-md">
                        🛠️
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs & Filter / Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-[#050e1d] p-1 rounded-xl border border-[#142847]">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "all"
                        ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Projects ({allCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("ongoing")}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "ongoing"
                        ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Ongoing ({ongoingCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "completed"
                        ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Completed ({completedCount})
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 bg-[#050e1d] border border-[#142847] px-3 py-1.5 rounded-xl text-xs text-slate-300">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="latest" className="bg-[#050e1d] text-white">Latest</option>
                    <option value="xp" className="bg-[#050e1d] text-white">Highest XP</option>
                    <option value="progress" className="bg-[#050e1d] text-white">Progress</option>
                  </select>
                </div>
              </div>

              {/* Project Cards List */}
              <div className="space-y-4">
                {filteredProjects.map((project) => {
                  return (
                    <div
                      key={project.id}
                      className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all duration-300 shadow-lg group relative overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        
                        {/* Custom Project Logo / Icon */}
                        <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg relative overflow-hidden border border-white/10"
                          style={{
                            background: project.iconType === "ai"
                              ? "linear-gradient(135deg, #1e3a8a, #0284c7)"
                              : project.iconType === "database"
                              ? "linear-gradient(135deg, #581c87, #7c3aed)"
                              : "linear-gradient(135deg, #0369a1, #0d9488)"
                          }}
                        >
                          {project.iconType === "ai" && (
                            <div className="flex flex-col items-center justify-center">
                              <Brain className="w-6 h-6 text-white" />
                              <span className="text-[10px] font-black text-cyan-200 uppercase tracking-tighter">AI</span>
                            </div>
                          )}
                          {project.iconType === "database" && (
                            <Layers className="w-7 h-7 text-purple-200" />
                          )}
                          {project.iconType === "image" && (
                            <ImageIcon className="w-7 h-7 text-teal-200" />
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 min-w-0 space-y-3">
                          
                          {/* Category & Status Badge Row */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#0e2748] text-cyan-300 border border-cyan-500/20">
                              {project.category}
                            </span>

                            {/* Status Badges matching screenshot */}
                            {project.status === "in-progress" && (
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                {project.statusLabel}
                              </span>
                            )}
                            {project.status === "completed" && (
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                {project.statusLabel}
                              </span>
                            )}
                            {project.status === "not-started" && (
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                                <span className="w-2 h-2 rounded-full bg-purple-400" />
                                {project.statusLabel}
                              </span>
                            )}
                          </div>

                          {/* Title & Description */}
                          <div>
                            <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {project.title}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {/* Skills Pills */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {project.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#0b1e38] text-slate-300 border border-[#163354]"
                              >
                                {skill}
                              </span>
                            ))}
                            {project.extraSkillsCount && (
                              <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-[#0e2748] text-cyan-400 border border-cyan-500/20">
                                +{project.extraSkillsCount}
                              </span>
                            )}
                          </div>

                          {/* Meta & Actions Row */}
                          <div className="pt-2 border-t border-[#122844] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {project.timeLeft}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                {project.applicantsCount} applicants
                              </span>
                              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                                +{project.xpReward} XP
                              </span>
                            </div>

                            {/* Progress & CTA Button */}
                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              {/* Action Button */}
                              {project.status === "in-progress" && (
                                <button 
                                  onClick={() => setSelectedProject(project)}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  Continue
                                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                                </button>
                              )}
                              {project.status === "completed" && (
                                <button 
                                  onClick={() => setSelectedProject(project)}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#091b33] hover:bg-[#0e2748] border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
                                >
                                  View Project
                                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                                </button>
                              )}
                              {project.status === "not-started" && (
                                <button 
                                  onClick={() => setSelectedProject(project)}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#091b33] hover:bg-[#0e2748] border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
                                >
                                  View Details
                                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex-1 h-1.5 rounded-full bg-[#0d223f] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-medium text-slate-400 shrink-0">
                              {project.progress}% Completed
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT COLUMN: Idea Card + Project Stats + Techs + Portfolio CTA (approx 4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card 1: Turn Your Ideas Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#07172e] to-[#0a2347] border border-[#163354] flex items-center justify-between gap-4 shadow-lg group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                    <Lightbulb className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Turn Your Ideas</div>
                    <div className="text-sm font-extrabold text-white tracking-tight">into <span className="text-cyan-400">Real Projects</span></div>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Idea-to-Project AI Generator launched! Submit your concept.")}
                  className="w-9 h-9 rounded-full bg-[#0d2748] border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 flex items-center justify-center transition-all shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card 2: Project Stats Widget */}
              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  Project Stats
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#08182f] border border-[#142f52]">
                    <div className="text-2xl font-black text-white tracking-tight">3</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Total Projects</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#08182f] border border-[#142f52]">
                    <div className="text-2xl font-black text-cyan-400 tracking-tight">2</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">In Progress</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#08182f] border border-[#142f52]">
                    <div className="text-2xl font-black text-emerald-400 tracking-tight">1</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Completed</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#08182f] border border-[#142f52]">
                    <div className="text-2xl font-black text-blue-400 tracking-tight">142</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Total Applicants</div>
                  </div>
                </div>
              </div>

              {/* Card 3: Popular Technologies */}
              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-3.5 shadow-lg">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  Popular Technologies
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "React", "Node.js", "Docker", "AWS", "MongoDB", "PostgreSQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-[#091b33] border border-[#153457] text-xs font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 cursor-pointer transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 rounded-xl bg-[#0e294d] border border-cyan-500/30 text-xs font-bold text-cyan-300">
                    +5
                  </span>
                </div>
              </div>

              {/* Card 4: Complete Projects / Build Portfolio Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#091e3d] via-[#081831] to-[#040c1a] border border-cyan-500/20 text-center relative overflow-hidden shadow-xl space-y-3">
                {/* Background Mountain Graphics */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  <Trophy className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    Complete Projects
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    Build Your Portfolio
                  </h3>
                  <p className="text-xs text-slate-300 px-2 leading-relaxed">
                    Showcase your skills, gain experience and get noticed by top recruiters.
                  </p>
                </div>

                <button
                  onClick={() => alert("Browsing all 50+ industry project repositories")}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Explore More Projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Project Details / Workspace Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#07152b] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedProject.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {selectedProject.statusLabel}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {selectedProject.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#040c1a] border border-[#142e4e] space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Progress</span>
                <span className="text-cyan-400 font-bold">{selectedProject.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#0d223f] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${selectedProject.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Reward: <strong className="text-amber-400">+{selectedProject.xpReward} XP</strong></span>
              <span>Deadline: <strong className="text-white">{selectedProject.timeLeft}</strong></span>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                onClick={() => {
                  alert(`Project repo launched for: ${selectedProject.title}`);
                  setSelectedProject(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                Launch Dev Workspace
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
