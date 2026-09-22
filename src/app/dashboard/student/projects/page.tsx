"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Code2, Calendar, Users, Trophy, Play, ExternalLink, 
  ArrowRight, CheckCircle2, Clock, Lightbulb, BarChart2, 
  Tag, SlidersHorizontal, ChevronRight, Sparkles, Plus,
  Layers, Brain, Image as ImageIcon, Check, X, Code
} from "lucide-react";

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  bounty?: string;
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
      bounty: "₹1,20,000 Bounty + Direct Interview",
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
      bounty: "₹80,000 Bounty",
      skills: ["TypeScript", "Redis", "Node.js", "Kafka"],
      extraSkillsCount: 1,
      timeLeft: "1 week left",
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
      bounty: "₹65,000 Bounty + Swag",
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Industry Projects & Company Bounties" 
          subtitle="Solve real company code problems, submit PRs, and earn cash bounties."
        />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          {/* Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Industry Collaboration</span>
              <h2 className="text-2xl font-black text-white">Solve Real Company Code Problems</h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Submit working pull requests, get peer reviewed by senior industry engineers, and skip initial recruitment screens.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center hidden md:block">
              <Code className="w-6 h-6 mx-auto mb-1 text-cyan-400" />
              <span className="text-xs font-bold block">100% Verifiable Proof of Work</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "all"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Projects ({allCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("ongoing")}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "ongoing"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Ongoing ({ongoingCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "completed"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Completed ({completedCount})
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="latest" className="bg-slate-900 text-white">Latest</option>
                    <option value="xp" className="bg-slate-900 text-white">Highest XP</option>
                    <option value="progress" className="bg-slate-900 text-white">Progress</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg group relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      
                      <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg border border-white/10"
                        style={{
                          background: project.iconType === "ai"
                            ? "linear-gradient(135deg, #1e3a8a, #0284c7)"
                            : project.iconType === "database"
                            ? "linear-gradient(135deg, #581c87, #7c3aed)"
                            : "linear-gradient(135deg, #0369a1, #0d9488)"
                        }}
                      >
                        {project.iconType === "ai" && <Brain className="w-7 h-7 text-white" />}
                        {project.iconType === "database" && <Layers className="w-7 h-7 text-purple-200" />}
                        {project.iconType === "image" && <ImageIcon className="w-7 h-7 text-teal-200" />}
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                            {project.category}
                          </span>

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

                        <div>
                          <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h2>
                          {project.bounty && (
                            <span className="text-xs font-bold text-emerald-400 block mt-0.5">🏆 {project.bounty}</span>
                          )}
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <button 
                              onClick={() => setSelectedProject(project)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                            >
                              <span>{project.status === "in-progress" ? "Continue" : "View Workspace"}</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
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
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  Project Metrics
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-white tracking-tight">3</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Total Projects</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-cyan-400 tracking-tight">2</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">In Progress</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400 tracking-tight">1</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Completed</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-blue-400 tracking-tight">142</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Applicants</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
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

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
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
