"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  BarChart3, AlertCircle, TrendingUp, BookOpen, Download, 
  Sparkles, CheckCircle2, ArrowUpRight, Filter, Info, ShieldCheck, Zap
} from "lucide-react";

interface HeatmapItem {
  domain: string;
  dept: string;
  score: number; // 0 to 100
  industryDemandScore: number;
  gap: number;
  status: "Strong Alignment" | "Moderate Gap" | "Critical Gap";
  syllabusFix: string;
}

const heatmapData: HeatmapItem[] = [
  // CSE
  { dept: "Computer Science", domain: "System Design", score: 68, industryDemandScore: 92, gap: -24, status: "Moderate Gap", syllabusFix: "Add Distributed Cache & Message Queue labs in 6th semester" },
  { dept: "Computer Science", domain: "Vector DBs & RAG", score: 48, industryDemandScore: 88, gap: -40, status: "Critical Gap", syllabusFix: "Integrate Pinecone/Qdrant labs into Advanced AI module" },
  { dept: "Computer Science", domain: "Cloud & DevOps", score: 72, industryDemandScore: 85, gap: -13, status: "Moderate Gap", syllabusFix: "Introduce Docker & Kubernetes in OS/Networking elective" },
  { dept: "Computer Science", domain: "Full Stack Web", score: 92, industryDemandScore: 90, gap: +2, status: "Strong Alignment", syllabusFix: "Maintain current Next.js & React curriculum" },
  { dept: "Computer Science", domain: "Data Engineering", score: 81, industryDemandScore: 84, gap: -3, status: "Strong Alignment", syllabusFix: "Expand SQL & PySpark hands-on workshops" },
  { dept: "Computer Science", domain: "Cybersecurity", score: 75, industryDemandScore: 82, gap: -7, status: "Moderate Gap", syllabusFix: "Include OAuth2 & JWT Security lab practicals" },

  // AI & DS
  { dept: "AI & Data Science", domain: "System Design", score: 55, industryDemandScore: 92, gap: -37, status: "Critical Gap", syllabusFix: "Include MLOps Infrastructure in 7th sem" },
  { dept: "AI & Data Science", domain: "Vector DBs & RAG", score: 86, industryDemandScore: 88, gap: -2, status: "Strong Alignment", syllabusFix: "Maintain advanced PyTorch & RAG modules" },
  { dept: "AI & Data Science", domain: "Cloud & DevOps", score: 60, industryDemandScore: 85, gap: -25, status: "Critical Gap", syllabusFix: "Add AWS SageMaker & Model Deployment modules" },
  { dept: "AI & Data Science", domain: "Full Stack Web", score: 64, industryDemandScore: 90, gap: -26, status: "Critical Gap", syllabusFix: "Add Streamlit & Fast API integration workshops" },
  { dept: "AI & Data Science", domain: "Data Engineering", score: 89, industryDemandScore: 84, gap: +5, status: "Strong Alignment", syllabusFix: "Curriculum aligned with tier-1 recruiters" },
  { dept: "AI & Data Science", domain: "Cybersecurity", score: 50, industryDemandScore: 82, gap: -32, status: "Critical Gap", syllabusFix: "Add AI Safety & Model Poisoning Defense module" },

  // IT
  { dept: "Information Tech", domain: "System Design", score: 70, industryDemandScore: 92, gap: -22, status: "Moderate Gap", syllabusFix: "Add REST API Microservices practicals" },
  { dept: "Information Tech", domain: "Vector DBs & RAG", score: 42, industryDemandScore: 88, gap: -46, status: "Critical Gap", syllabusFix: "Mandatory elective on Generative AI Architecture" },
  { dept: "Information Tech", domain: "Cloud & DevOps", score: 84, industryDemandScore: 85, gap: -1, status: "Strong Alignment", syllabusFix: "Solid AWS/GCP cloud foundation" },
  { dept: "Information Tech", domain: "Full Stack Web", score: 88, industryDemandScore: 90, gap: -2, status: "Strong Alignment", syllabusFix: "Up-to-date MERN stack syllabus" },
  { dept: "Information Tech", domain: "Data Engineering", score: 76, industryDemandScore: 84, gap: -8, status: "Moderate Gap", syllabusFix: "Add Snowflake & Airflow pipeline modules" },
  { dept: "Information Tech", domain: "Cybersecurity", score: 78, industryDemandScore: 82, gap: -4, status: "Strong Alignment", syllabusFix: "Network security labs are up to standard" },

  // ECE
  { dept: "Electrical & ECE", domain: "System Design", score: 40, industryDemandScore: 92, gap: -52, status: "Critical Gap", syllabusFix: "Introduce basic software architecture for ECE" },
  { dept: "Electrical & ECE", domain: "Vector DBs & RAG", score: 30, industryDemandScore: 88, gap: -58, status: "Critical Gap", syllabusFix: "Optional multidisciplinary AI track" },
  { dept: "Electrical & ECE", domain: "Cloud & DevOps", score: 45, industryDemandScore: 85, gap: -40, status: "Critical Gap", syllabusFix: "Add Edge Computing & IoT Cloud modules" },
  { dept: "Electrical & ECE", domain: "Full Stack Web", score: 52, industryDemandScore: 90, gap: -38, status: "Critical Gap", syllabusFix: "Web development bridge course" },
  { dept: "Electrical & ECE", domain: "Data Engineering", score: 62, industryDemandScore: 84, gap: -22, status: "Moderate Gap", syllabusFix: "Add Signal Processing Data Analytics" },
  { dept: "Electrical & ECE", domain: "Cybersecurity", score: 72, industryDemandScore: 82, gap: -10, status: "Moderate Gap", syllabusFix: "Hardware security & embedded encryption" },
];

const departments = ["Computer Science", "AI & Data Science", "Information Tech", "Electrical & ECE"];
const domains = ["System Design", "Vector DBs & RAG", "Cloud & DevOps", "Full Stack Web", "Data Engineering", "Cybersecurity"];

export default function CurriculumAnalyticsPage() {
  const [selectedCell, setSelectedCell] = useState<HeatmapItem | null>(heatmapData[1]); // Default Vector DB CSE
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const getHeatmapItem = (dept: string, domain: string) => {
    return heatmapData.find(h => h.dept === dept && h.domain === domain) || {
      dept, domain, score: 50, industryDemandScore: 85, gap: -35, status: "Moderate Gap", syllabusFix: "Update syllabus"
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Curriculum Skill Gap Analytics & Heatmap" 
          subtitle="Real-time matrix comparing campus syllabus outcomes with Q3 corporate recruiting demands"
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Notification Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-indigo-500 text-white font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase">
                <span>Curriculum Alignment</span>
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">78.4%</div>
              <p className="text-xs text-slate-400 mt-1">Average alignment with tech market</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30">
              <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase">
                <span>Primary Skill Gap</span>
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-rose-400 mt-3 truncate">Vector DBs & RAG (-32%)</div>
              <p className="text-xs text-slate-400 mt-1">Highest corporate hiring demand delta</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase">
                <span>Industry Stacks Matched</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">18 / 24</div>
              <p className="text-xs text-slate-400 mt-1">Syllabus modules up to date</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
                <span>Syllabus Action Items</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">4 Modules</div>
              <p className="text-xs text-emerald-400 mt-1">AI-recommended curriculum updates</p>
            </div>
          </div>

          {/* Departmental Skill Heatmap Grid */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Departmental Skill Gap Heatmap Matrix
                </h2>
                <p className="text-xs text-slate-400">Click any matrix cell to inspect market demand gap and view recommended syllabus adjustments.</p>
              </div>

              <button 
                onClick={() => showToast("📄 Academic Council PDF Report successfully generated for download!")}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Council Report (PDF)</span>
              </button>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-slate-400">Alignment Key:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-slate-300">Strong Alignment (&gt;80%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span className="text-slate-300">Moderate Gap (65-79%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500" />
                <span className="text-slate-300">Critical Gap (&lt;65%)</span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-bold text-slate-400">
                    <th className="p-3 text-left w-48">Engineering Branch</th>
                    {domains.map(d => (
                      <th key={d} className="p-3 text-center min-w-[120px]">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs font-bold">
                  {departments.map((dept) => (
                    <tr key={dept} className="hover:bg-slate-950/40">
                      <td className="p-3 text-left text-white font-extrabold">{dept}</td>
                      {domains.map((domain) => {
                        const item = getHeatmapItem(dept, domain);
                        const isSelected = selectedCell?.dept === dept && selectedCell?.domain === domain;
                        return (
                          <td key={domain} className="p-2">
                            <button
                              onClick={() => setSelectedCell(item)}
                              className={`w-full py-3 px-2 rounded-xl transition flex flex-col items-center justify-center border ${
                                isSelected ? "ring-2 ring-cyan-400 scale-105 shadow-xl" : ""
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

          {/* Selected Heatmap Inspection & AI Recommendation Card */}
          {selectedCell && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border border-cyan-500/30 space-y-4 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Detailed Gap Audit</span>
                  <h3 className="text-lg font-black text-white">
                    {selectedCell.dept} — {selectedCell.domain}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Campus Avg vs Industry Target</span>
                    <span className="text-base font-black text-white">
                      {selectedCell.score}% vs <span className="text-cyan-400">{selectedCell.industryDemandScore}%</span>
                    </span>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full font-bold text-xs border ${
                    selectedCell.score >= 80 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                      : selectedCell.score >= 65 
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30" 
                      : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                  }`}>
                    {selectedCell.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase">Skill Gap Delta Progress</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Campus Student Average Score</span>
                        <span className="text-white font-bold">{selectedCell.score}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${selectedCell.score}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Recruiter Benchmark Requirement</span>
                        <span className="text-cyan-400 font-bold">{selectedCell.industryDemandScore}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${selectedCell.industryDemandScore}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Recommended Academic Syllabus Fix
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {selectedCell.syllabusFix}
                  </p>
                  <button 
                    onClick={() => showToast(`Added syllabus amendment item for ${selectedCell.domain}`)}
                    className="mt-2 text-xs text-cyan-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Submit to Academic Board</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Curriculum Reform Directives */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              High-Impact AI Curriculum Upgrade Directives
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-400 text-[11px] font-bold">
                  Priority 1 • Semester 5 DBMS
                </span>
                <h4 className="font-bold text-white text-sm">Vector Databases & Neural Search Lab</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Introduce 3-week practical module on Qdrant, Pinecone, and RAG architectures in the DBMS laboratory.
                </p>
                <div className="text-xs text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  Expected Placement Lift: +24% CTC
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-400 text-[11px] font-bold">
                  Priority 2 • Semester 6 Software Eng
                </span>
                <h4 className="font-bold text-white text-sm">Microservices System Architecture</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Replace traditional monolithic project work with Dockerized microservices and API gateway assignments.
                </p>
                <div className="text-xs text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  Expected Placement Lift: +18% CTC
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-400 text-[11px] font-bold">
                  Priority 3 • Semester 7 Elective
                </span>
                <h4 className="font-bold text-white text-sm">Cloud-Native DevOps & CI/CD</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Offer AWS & Kubernetes deployment capstone projects in collaboration with corporate industry partners.
                </p>
                <div className="text-xs text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  Expected Placement Lift: +20% CTC
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
