"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Target, Award, Zap, CheckCircle2, AlertCircle, Sparkles, 
  ArrowRight, ShieldCheck, RefreshCw, BarChart3, Lock, Play, Layers
} from "lucide-react";

export default function SkillIntelligencePage() {
  const [selectedDomain, setSelectedDomain] = useState("AI & Software Engineering");
  const [verifyingSkill, setVerifyingSkill] = useState<string | null>(null);

  const skillsData = [
    { name: "React / Next.js 14", level: 90, target: 85, verified: true, levelTitle: "Expert", date: "Verified 2 days ago", category: "Frontend" },
    { name: "Python & PyTorch", level: 82, target: 90, verified: true, levelTitle: "Advanced", date: "Verified 1 week ago", category: "AI / ML" },
    { name: "TypeScript & Node.js", level: 88, target: 80, verified: true, levelTitle: "Advanced", date: "Verified 2 weeks ago", category: "Backend" },
    { name: "System Design & Microservices", level: 65, target: 82, verified: false, levelTitle: "Intermediate", gap: 17, category: "Architecture" },
    { name: "Vector DBs & RAG Architecture", level: 45, target: 85, verified: false, levelTitle: "Beginner", gap: 40, category: "AI Infra" },
    { name: "Docker & Kubernetes", level: 50, target: 75, verified: false, levelTitle: "Intermediate", gap: 25, category: "DevOps" },
    { name: "GraphQL & REST APIs", level: 92, target: 80, verified: true, levelTitle: "Expert", date: "Verified 3 weeks ago", category: "Backend" },
    { name: "SQL & PostgreSQL", level: 85, target: 80, verified: true, levelTitle: "Advanced", date: "Verified 1 month ago", category: "Database" },
  ];

  const targetRoles = [
    { title: "Senior AI Systems Engineer", companyTarget: "OpenAI / Anthropic", matchScore: 84, gapsCount: 2 },
    { title: "Full Stack Engineer", companyTarget: "Stripe / Meta", matchScore: 92, gapsCount: 1 },
    { title: "ML Infra Engineer", companyTarget: "NVIDIA / Databricks", matchScore: 78, gapsCount: 3 },
  ];

  const startAssessment = (skillName: string) => {
    setVerifyingSkill(skillName);
    setTimeout(() => {
      alert(`Starting live AI Skill Assessment for: ${skillName}`);
      setVerifyingSkill(null);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Skill Intelligence Engine" 
          subtitle="AI-driven mapping of candidate capabilities against real-time industry requirement vectors."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Skill Mapping Domain</span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Target Domain: {selectedDomain}
              </h2>
              <p className="text-xs text-slate-400">Comparing 8 student skills with 12,000+ live industry hiring benchmarks.</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="AI & Software Engineering">AI & Software Engineering</option>
                <option value="Data Science & ML">Data Science & ML</option>
                <option value="Full Stack Web Development">Full Stack Web Development</option>
                <option value="Cloud & DevOps Engineering">Cloud & DevOps Engineering</option>
              </select>

              <button className="px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5" /> Re-Sync Vector
              </button>
            </div>
          </div>

          {/* Role Match Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {targetRoles.map((role) => (
              <div key={role.title} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{role.title}</h3>
                    <p className="text-xs text-slate-400">Target: {role.companyTarget}</p>
                  </div>
                  <span className="text-sm font-black px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {role.matchScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full" style={{ width: `${role.matchScore}%` }} />
                </div>
                <div className="text-xs text-slate-400 flex justify-between pt-1">
                  <span>Skill Gaps: <strong className="text-amber-400">{role.gapsCount} skills</strong></span>
                  <Link href="/dashboard/student/learning" className="text-cyan-400 hover:underline font-semibold">
                    Bridge Gap →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Verified Skills (2 cols) */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Verified Skill Matrix & Proofs
                  </h3>
                  <p className="text-xs text-slate-400">Skills validated through automated coding assessments and peer reviews.</p>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {skillsData.filter(s => s.verified).length} / {skillsData.length} Verified
                </span>
              </div>

              <div className="space-y-4">
                {skillsData.map((sk) => (
                  <div key={sk.name} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{sk.name}</span>
                        {sk.verified ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 font-bold">
                            <AlertCircle className="w-3 h-3" /> Unverified Gap
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {sk.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Level: <strong className="text-slate-200">{sk.levelTitle} ({sk.level}%)</strong> | Target: {sk.target}%
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {sk.verified ? (
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block">{sk.date}</span>
                          <span className="text-[10px] font-mono text-cyan-400">Hash: 0x8f2e...4a1</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => startAssessment(sk.name)}
                          disabled={verifyingSkill === sk.name}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5 shadow-md"
                        >
                          <Play className="w-3 h-3 fill-slate-950" />
                          <span>Take Skill Test</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Gap Action Panel (1 col) */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    AI Gap Remediation Plan
                  </h3>
                  <p className="text-xs text-slate-400">Automated path to close critical gaps in 14 days.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Priority 1: Vector DBs & RAG</span>
                      <span className="text-red-400">High Gap (-40%)</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Required for 85% of AI Engineering internships at Anthropic & OpenAI.
                    </p>
                    <Link
                      href="/dashboard/student/learning"
                      className="text-xs text-cyan-400 hover:underline font-semibold block pt-1"
                    >
                      Start 4-Hour Module →
                    </Link>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Priority 2: System Design</span>
                      <span className="text-amber-400">Medium Gap (-17%)</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Required for Stripe & Meta technical rounds.
                    </p>
                    <Link
                      href="/dashboard/student/learning"
                      className="text-xs text-cyan-400 hover:underline font-semibold block pt-1"
                    >
                      Start Interactive Case Study →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 text-center space-y-2">
                <span className="text-2xl">🎓</span>
                <h4 className="text-xs font-bold text-white">Generate Verified Skill Resume</h4>
                <p className="text-[11px] text-slate-400">Export verified skill matrix for recruiter view.</p>
                <button 
                  onClick={() => alert("Skill Vector Resume PDF generated!")}
                  className="w-full py-2 rounded-xl bg-indigo-500 text-white font-bold text-xs hover:bg-indigo-400 transition"
                >
                  Download PDF Proof
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
