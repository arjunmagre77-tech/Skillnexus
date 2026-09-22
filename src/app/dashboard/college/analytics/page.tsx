"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  BarChart3, AlertCircle, TrendingUp, BookOpen, Download,
  Sparkles, ArrowUpRight, ShieldCheck, Zap, Calendar,
  Grid3X3, AlertTriangle, ArrowUp, Filter
} from "lucide-react";

interface HeatmapItem {
  domain: string;
  dept: string;
  score: number;
  industryDemandScore: number;
  gap: number;
  status: "Strong Alignment" | "Moderate Gap" | "Critical Gap";
  syllabusFix: string;
}

const heatmapData: HeatmapItem[] = [
  { dept: "Computer Science", domain: "System Design", score: 68, industryDemandScore: 92, gap: -24, status: "Moderate Gap", syllabusFix: "Add Distributed Cache & Message Queue labs in 6th semester" },
  { dept: "Computer Science", domain: "Vector DBs & RAG", score: 48, industryDemandScore: 88, gap: -40, status: "Critical Gap", syllabusFix: "Integrate Pinecone/Qdrant labs into Advanced AI module" },
  { dept: "Computer Science", domain: "Cloud & DevOps", score: 72, industryDemandScore: 85, gap: -13, status: "Moderate Gap", syllabusFix: "Introduce Docker & Kubernetes in OS/Networking elective" },
  { dept: "Computer Science", domain: "Full Stack Web", score: 92, industryDemandScore: 90, gap: +2, status: "Strong Alignment", syllabusFix: "Maintain current Next.js & React curriculum" },
  { dept: "Computer Science", domain: "Data Engineering", score: 81, industryDemandScore: 84, gap: -3, status: "Strong Alignment", syllabusFix: "Expand SQL & PySpark hands-on workshops" },
  { dept: "Computer Science", domain: "Cybersecurity", score: 75, industryDemandScore: 82, gap: -7, status: "Moderate Gap", syllabusFix: "Include OAuth2 & JWT Security lab practicals" },

  { dept: "AI & Data Science", domain: "System Design", score: 55, industryDemandScore: 92, gap: -37, status: "Critical Gap", syllabusFix: "Include MLOps Infrastructure in 7th sem" },
  { dept: "AI & Data Science", domain: "Vector DBs & RAG", score: 86, industryDemandScore: 88, gap: -2, status: "Strong Alignment", syllabusFix: "Maintain advanced PyTorch & RAG modules" },
  { dept: "AI & Data Science", domain: "Cloud & DevOps", score: 60, industryDemandScore: 85, gap: -25, status: "Critical Gap", syllabusFix: "Add AWS SageMaker & Model Deployment modules" },
  { dept: "AI & Data Science", domain: "Full Stack Web", score: 64, industryDemandScore: 90, gap: -26, status: "Critical Gap", syllabusFix: "Add Streamlit & Fast API integration workshops" },
  { dept: "AI & Data Science", domain: "Data Engineering", score: 89, industryDemandScore: 84, gap: +5, status: "Strong Alignment", syllabusFix: "Curriculum aligned with tier-1 recruiters" },
  { dept: "AI & Data Science", domain: "Cybersecurity", score: 50, industryDemandScore: 82, gap: -32, status: "Critical Gap", syllabusFix: "Add AI Safety & Model Poisoning Defense module" },

  { dept: "Information Tech", domain: "System Design", score: 70, industryDemandScore: 92, gap: -22, status: "Moderate Gap", syllabusFix: "Add REST API Microservices practicals" },
  { dept: "Information Tech", domain: "Vector DBs & RAG", score: 42, industryDemandScore: 88, gap: -46, status: "Critical Gap", syllabusFix: "Mandatory elective on Generative AI Architecture" },
  { dept: "Information Tech", domain: "Cloud & DevOps", score: 84, industryDemandScore: 85, gap: -1, status: "Strong Alignment", syllabusFix: "Solid AWS/GCP cloud foundation" },
  { dept: "Information Tech", domain: "Full Stack Web", score: 88, industryDemandScore: 90, gap: -2, status: "Strong Alignment", syllabusFix: "Up-to-date MERN stack syllabus" },
  { dept: "Information Tech", domain: "Data Engineering", score: 76, industryDemandScore: 84, gap: -8, status: "Moderate Gap", syllabusFix: "Add Snowflake & Airflow pipeline modules" },
  { dept: "Information Tech", domain: "Cybersecurity", score: 78, industryDemandScore: 82, gap: -4, status: "Strong Alignment", syllabusFix: "Network security labs are up to standard" },

  { dept: "Electrical & ECE", domain: "System Design", score: 40, industryDemandScore: 92, gap: -52, status: "Critical Gap", syllabusFix: "Introduce basic software architecture for ECE" },
  { dept: "Electrical & ECE", domain: "Vector DBs & RAG", score: 30, industryDemandScore: 88, gap: -58, status: "Critical Gap", syllabusFix: "Optional multidisciplinary AI track" },
  { dept: "Electrical & ECE", domain: "Cloud & DevOps", score: 45, industryDemandScore: 85, gap: -40, status: "Critical Gap", syllabusFix: "Add Edge Computing & IoT Cloud modules" },
  { dept: "Electrical & ECE", domain: "Full Stack Web", score: 52, industryDemandScore: 90, gap: -38, status: "Critical Gap", syllabusFix: "Web development bridge course" },
  { dept: "Electrical & ECE", domain: "Data Engineering", score: 62, industryDemandScore: 84, gap: -22, status: "Moderate Gap", syllabusFix: "Add Signal Processing Data Analytics" },
  { dept: "Electrical & ECE", domain: "Cybersecurity", score: 72, industryDemandScore: 82, gap: -10, status: "Moderate Gap", syllabusFix: "Hardware security & embedded encryption" },
];

const departments = ["Computer Science", "AI & Data Science", "Information Tech", "Electrical & ECE"];
const deptStudents: Record<string, number> = {
  "Computer Science": 480,
  "AI & Data Science": 320,
  "Information Tech": 410,
  "Electrical & ECE": 560,
};
const domains = ["System Design", "Vector DBs & RAG", "Cloud & DevOps", "Full Stack Web", "Data Engineering", "Cybersecurity"];

const curriculumDirectives = [
  {
    priority: "Priority 1 • Semester 5 DBMS",
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    title: "Vector Databases & Neural Search Lab",
    desc: "Introduce 3-week practical module on Qdrant, Pinecone, and RAG architectures in the DBMS laboratory.",
    lift: "+24% CTC"
  },
  {
    priority: "Priority 2 • Semester 6 Software Eng",
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    title: "Microservices System Architecture",
    desc: "Replace traditional monolithic project work with Dockerized microservices and API gateway assignments.",
    lift: "+19% CTC"
  },
  {
    priority: "Priority 3 • Semester 7 Elective",
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    title: "Cloud-Native DevOps & CI/CD",
    desc: "Offer AWS & Kubernetes deployment capstone projects in collaboration with corporate industry partners.",
    lift: "+20% CTC"
  },
];

export default function CurriculumAnalyticsPage() {
  const [selectedCell, setSelectedCell] = useState<HeatmapItem | null>(heatmapData[1]);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("all");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const getHeatmapItem = (dept: string, domain: string) => {
    return heatmapData.find(h => h.dept === dept && h.domain === domain) || {
      dept, domain, score: 50, industryDemandScore: 85, gap: -35, status: "Moderate Gap" as const, syllabusFix: "Update syllabus"
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Curriculum Skill Gaps"
          subtitle="Identify skill gaps across your curriculum and align with industry demands for better placement outcomes."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-indigo-500 text-white font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Curriculum Alignment</span>
              </div>
              <h1 className="text-2xl font-black text-white">Curriculum Skill Gaps & Readiness Heatmap</h1>
              <p className="text-sm text-slate-400 mt-0.5">Identify skill gaps across your curriculum and align with industry demands for better placement outcomes.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => showToast("📄 Academic Council PDF Report successfully generated!")}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Council Report (PDF)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-bold text-slate-400">Branch:</span>
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3 py-1.5 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">All Departments</option>
                  <option value="Computer Science">Computer Science & Eng</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Information Tech">Information Technology</option>
                  <option value="Electrical & ECE">Electrical & ECE</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Target Role:</span>
                <select
                  value={selectedRoleFilter}
                  onChange={(e) => setSelectedRoleFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3 py-1.5 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">All Target Industry Roles</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Curriculum Alignment</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-black text-white">78.4%</span>
                <ArrowUp className="w-4 h-4 text-emerald-400 mb-1" />
              </div>
              <p className="text-xs text-slate-400">Average alignment with tech market</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Ready (&gt;80%)</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">3</div>
              <p className="text-xs text-slate-400">of 8 programs</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Institutional CGPA</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">8.51</div>
              <p className="text-xs text-slate-400">Across all branches</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">At-Risk (&lt;65% Score)</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">2</div>
              <p className="text-xs text-rose-400">Requires targeted remedial modules</p>
            </div>
          </div>

          {/* Heatmap Section */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h2 className="text-base font-bold text-white">Departmental Skill Gap & Readiness Heatmap</h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Click any matrix cell to inspect market demand gap and view recommended syllabus adjustments.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-bold text-slate-400">
                    <th className="p-3 text-left">
                      <span className="text-slate-500 text-[11px] uppercase tracking-wider">Department / Year</span>
                    </th>
                    {domains.map(d => (
                      <th key={d} className="p-3 text-center min-w-[110px] text-[11px]">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs font-bold">
                  {departments.map((dept) => (
                    <tr key={dept} className="hover:bg-slate-950/40">
                      <td className="p-3 text-left">
                        <p className="text-white font-extrabold text-xs">{dept}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{deptStudents[dept]} Registered Students</p>
                      </td>
                      {domains.map((domain) => {
                        const item = getHeatmapItem(dept, domain);
                        const isSelected = selectedCell?.dept === dept && selectedCell?.domain === domain;
                        return (
                          <td key={domain} className="p-1.5">
                            <button
                              onClick={() => setSelectedCell(item)}
                              className={`w-full py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center border cursor-pointer ${
                                isSelected ? "ring-2 ring-cyan-400 scale-105 shadow-xl shadow-cyan-900/30" : ""
                              } ${
                                item.score >= 80
                                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80"
                                  : item.score >= 65
                                  ? "bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/80"
                                  : "bg-rose-950/60 border-rose-500/40 text-rose-300 hover:bg-rose-900/80"
                              }`}
                            >
                              <span className="text-sm font-black">{item.score}%</span>
                              <span className="text-[10px] opacity-80 font-medium">({item.gap > 0 ? `+${item.gap}%` : `${item.gap}%`})</span>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedCell && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border border-cyan-500/30 space-y-4 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Detailed Gap Audit</span>
                  <h3 className="text-base font-black text-white mt-0.5">
                    {selectedCell.dept} — <span className="text-slate-300">{selectedCell.domain}</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-400">Skill Gap Delta Progress</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                      {selectedCell.score}% vs {selectedCell.industryDemandScore}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1.5">
                      <span>Campus Student Average Score</span>
                      <span className="text-white font-bold">{selectedCell.score}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${selectedCell.score}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1.5">
                      <span>Recruiter Benchmark Requirement</span>
                      <span className="text-cyan-400 font-bold">{selectedCell.industryDemandScore}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${selectedCell.industryDemandScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Recommended Academic Syllabus Fix
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{selectedCell.syllabusFix}</p>
                  <button
                    onClick={() => showToast(`Added syllabus amendment item for ${selectedCell.domain}`)}
                    className="mt-1 text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Submit to Academic Board</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              High-Impact AI Curriculum Upgrade Directives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {curriculumDirectives.map((d) => (
                <div key={d.title} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className={`px-2.5 py-1 rounded-md ${d.bg} ${d.color} text-[11px] font-bold`}>
                    {d.priority}
                  </span>
                  <h4 className="font-bold text-white text-sm">{d.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
                  <div className="text-xs text-emerald-400 font-bold pt-2 border-t border-slate-800">
                    Expected Placement Lift: {d.lift}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
