"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  FileText, Code, Brain, Database, Link as LinkIcon, Users, 
  MessageSquare, ChevronRight, CheckCircle2, AlertCircle, Sparkles,
  X, Check, Send, Globe, Star
} from "lucide-react";

interface ProjectSubmission {
  id: string;
  title: string;
  submittedBy: string;
  submittedWhen: string;
  status: "Pending Review" | "Reviewed";
  iconType: "code" | "brain";
  iconBg: string;
  tags: string[];
  type: string;
  typeIcon: "database" | "globe";
  domain: string;
  team: string;
  reviewNotes: string;
  repoUrl?: string;
  architectureScore?: number;
  testCoverage?: string;
}

const mockProjects: ProjectSubmission[] = [
  {
    id: "rev_1",
    title: "Distributed Key-Value Store",
    submittedBy: "Aarav Sharma",
    submittedWhen: "Today",
    status: "Pending Review",
    iconType: "code",
    iconBg: "bg-[#162747] text-cyan-400 border border-[#224075]",
    tags: ["Go", "Raft", "Docker"],
    type: "Backend System",
    typeIcon: "database",
    domain: "Distributed Systems",
    team: "1 Member",
    reviewNotes: "Please review the code structure, error handling and documentation.",
    repoUrl: "github.com/aaravsharma/distributed-kv",
    architectureScore: 88,
    testCoverage: "84%"
  },
  {
    id: "rev_2",
    title: "AI Resume & Portfolio Analyzer",
    submittedBy: "Priya Sundaram",
    submittedWhen: "Yesterday",
    status: "Reviewed",
    iconType: "brain",
    iconBg: "bg-[#0b3338] text-emerald-400 border border-[#14575f]",
    tags: ["React", "Python", "OpenAI API"],
    type: "Web Application",
    typeIcon: "globe",
    domain: "AI/ML",
    team: "1 Member",
    reviewNotes: "Looks good! Follow the suggested improvements in the documentation.",
    repoUrl: "github.com/priyasundaram/ai-portfolio-eval",
    architectureScore: 94,
    testCoverage: "91%"
  }
];

export default function ProjectReviewsPage() {
  const [projects, setProjects] = useState<ProjectSubmission[]>(mockProjects);
  const [activeReviewProject, setActiveReviewProject] = useState<ProjectSubmission | null>(null);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [approvalGrade, setApprovalGrade] = useState("Verified - Exemplary (Grade A)");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenReview = (proj: ProjectSubmission) => {
    setActiveReviewProject(proj);
    setFeedbackNote(proj.status === "Reviewed" ? proj.reviewNotes : "");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewProject) return;

    setProjects(projects.map(p => {
      if (p.id === activeReviewProject.id) {
        return {
          ...p,
          status: "Reviewed",
          reviewNotes: feedbackNote || "Code verified successfully with architecture and test benchmarks met."
        };
      }
      return p;
    }));

    showToast(`Feedback submitted & verified for ${activeReviewProject.title}!`);
    setActiveReviewProject(null);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 md:p-8 space-y-6 overflow-y-auto">
          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Header Title + Review Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  PROJECT REVIEWS
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Submitted Projects for Verification ({projects.length})
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Review code architecture, test coverage, and documentation.
              </p>
            </div>

            <button
              onClick={() => {
                const pending = projects.find(p => p.status === "Pending Review") || projects[0];
                handleOpenReview(pending);
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition self-start md:self-auto"
            >
              <FileText className="w-4 h-4" />
              <span>Review Code &amp; Feedback</span>
            </button>
          </div>

          {/* Project Review Cards */}
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-[#071324] border border-[#112642] hover:border-[#1e3e6b] transition-all overflow-hidden shadow-sm"
              >
                {/* Main Content Row */}
                <div className="p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                  {/* Left: Icon + Title + Status + Tags */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${project.iconBg}`}>
                      {project.iconType === "code" ? (
                        <Code className="w-7 h-7 font-bold" />
                      ) : (
                        <Brain className="w-7 h-7" />
                      )}
                    </div>

                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {project.title}
                        </h3>
                        {project.status === "Pending Review" ? (
                          <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            Pending Review
                          </span>
                        ) : (
                          <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Reviewed
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400">
                        Submitted by <span className="text-slate-200 font-medium">{project.submittedBy}</span> • {project.submittedWhen}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#0b1b30] text-slate-300 border border-[#162d4e]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center: Metadata Columns (Type, Domain, Team) */}
                  <div className="grid grid-cols-3 gap-6 text-left shrink-0 xl:px-6 border-y xl:border-y-0 xl:border-x border-[#112642] py-3 xl:py-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        {project.typeIcon === "database" ? (
                          <Database className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Globe className="w-4 h-4 text-slate-400" />
                        )}
                        <span>Type</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {project.type}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <LinkIcon className="w-4 h-4 text-slate-400" />
                        <span>Domain</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {project.domain}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>Team</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {project.team}
                      </div>
                    </div>
                  </div>

                  {/* Right Action Button */}
                  <div className="shrink-0 flex items-center xl:justify-end">
                    <button
                      onClick={() => handleOpenReview(project)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs transition"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Review Code &amp; Feedback &gt;</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Review Notes Strip */}
                <div className="px-6 py-3.5 bg-[#050e1c] border-t border-[#112642] flex items-start gap-2.5 text-xs text-slate-300">
                  <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-bold text-slate-300 mr-2">Review Notes</span>
                    <span className="text-slate-400">{project.reviewNotes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Code Review & Feedback Modal */}
      {activeReviewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#071324] border border-[#14263f] rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#14263f] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-lg text-white">Code Review &amp; Feedback</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{activeReviewProject.title} • {activeReviewProject.submittedBy}</p>
              </div>
              <button
                onClick={() => setActiveReviewProject(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              {/* Repository & Metadata Summary */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#040a14] border border-[#12233b]">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Repository Source</span>
                  <span className="text-cyan-400 font-semibold truncate block mt-0.5">{activeReviewProject.repoUrl}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Automated Test Coverage</span>
                  <span className="text-emerald-400 font-bold block mt-0.5">{activeReviewProject.testCoverage} Passed</span>
                </div>
              </div>

              {/* Assessment Grade */}
              <div>
                <label className="text-slate-300 font-bold block mb-1.5">Verification Verdict</label>
                <select
                  value={approvalGrade}
                  onChange={(e) => setApprovalGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Verified - Exemplary (Grade A)">Verified - Exemplary (Grade A)</option>
                  <option value="Verified - Minor Adjustments (Grade B)">Verified - Minor Adjustments (Grade B)</option>
                  <option value="Changes Requested (Action Required)">Changes Requested (Action Required)</option>
                </select>
              </div>

              {/* Feedback Note Input */}
              <div>
                <label className="text-slate-300 font-bold block mb-1.5">Mentor Feedback &amp; Architecture Notes</label>
                <textarea
                  rows={4}
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Provide concrete architectural recommendations, code modularity notes, and praise..."
                  required
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#14263f]">
                <button
                  type="button"
                  onClick={() => setActiveReviewProject(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Code Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
