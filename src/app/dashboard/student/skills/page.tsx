"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Target, Award, Zap, CheckCircle2, AlertCircle, Sparkles, 
  ArrowRight, ShieldCheck, RefreshCw, BarChart3, Lock, Play, Layers,
  FileCheck, Upload, X, Check, FileText
} from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  level: number;
  target: number;
  verificationStatus: "self_declared" | "assessed" | "industry_verified";
  levelTitle: string;
  date?: string;
  category: string;
  credentialId?: string;
  issuer?: string;
}

export default function SkillIntelligencePage() {
  const [selectedDomain, setSelectedDomain] = useState("AI & Software Engineering");
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "self_declared" | "assessed" | "industry_verified">("all");
  
  const [skillsList, setSkillsList] = useState<SkillItem[]>([
    { id: "s1", name: "React / Next.js 14", level: 90, target: 85, verificationStatus: "assessed", levelTitle: "Expert", date: "Verified 2 days ago", category: "Frontend" },
    { id: "s2", name: "Python & PyTorch", level: 82, target: 90, verificationStatus: "industry_verified", levelTitle: "Advanced", date: "Cert: Coursera #CY-8492", category: "AI / ML", issuer: "DeepLearning.AI" },
    { id: "s3", name: "TypeScript & Node.js", level: 88, target: 80, verificationStatus: "assessed", levelTitle: "Advanced", date: "Verified 2 weeks ago", category: "Backend" },
    { id: "s4", name: "System Design & Microservices", level: 65, target: 82, verificationStatus: "self_declared", levelTitle: "Intermediate", category: "Architecture" },
    { id: "s5", name: "Vector DBs & RAG Architecture", level: 45, target: 85, verificationStatus: "self_declared", levelTitle: "Beginner", category: "AI Infra" },
    { id: "s6", name: "Docker & Kubernetes", level: 50, target: 75, verificationStatus: "self_declared", levelTitle: "Intermediate", category: "DevOps" },
    { id: "s7", name: "GraphQL & REST APIs", level: 92, target: 80, verificationStatus: "assessed", levelTitle: "Expert", date: "Verified 3 weeks ago", category: "Backend" },
    { id: "s8", name: "SQL & PostgreSQL", level: 85, target: 80, verificationStatus: "industry_verified", levelTitle: "Advanced", date: "Cert: AWS #DB-9921", category: "Database", issuer: "AWS Training" },
  ]);

  // Assessment Quiz Modal state
  const [testModalSkill, setTestModalSkill] = useState<SkillItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // Certificate Modal state
  const [certModalSkill, setCertModalSkill] = useState<SkillItem | null>(null);
  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialId: "",
    url: "",
  });
  const [certUploadedFile, setCertUploadedFile] = useState<string | null>(null);

  const mockQuestions = [
    {
      q: "What is the primary benefit of React Server Components (RSC) in Next.js?",
      options: [
        "Eliminates client-side JavaScript bundle for server-rendered UI",
        "Increases browser memory usage",
        "Replaces Redux for local component state",
        "Enforces client-side rendering only"
      ],
      correct: 0
    },
    {
      q: "How does vector similarity search work in RAG architectures?",
      options: [
        "Matches exact SQL string strings",
        "Computes cosine distance or dot product between embedding vectors",
        "Scans HTML DOM nodes recursively",
        "Calculates HTTP header latency"
      ],
      correct: 1
    },
    {
      q: "What is the purpose of Docker containerization in microservices?",
      options: [
        "To compile C++ code into machine bytecode",
        "To package applications with their dependencies into isolated runtimes",
        "To compress image files for web delivery",
        "To replace Git version control"
      ],
      correct: 1
    }
  ];

  const handleOpenAssessment = (sk: SkillItem) => {
    setTestModalSkill(sk);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setTestCompleted(false);
    setEarnedCoins(0);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIdx;
    setSelectedAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let correctCount = 0;
      selectedAnswers.forEach((ans, idx) => {
        if (ans === mockQuestions[idx].correct) correctCount++;
      });
      const scorePct = Math.round((correctCount / mockQuestions.length) * 100);
      setTestCompleted(true);
      
      if (scorePct >= 66) {
        setEarnedCoins(100);
        setSkillsList(prev => prev.map(s => {
          if (s.id === testModalSkill?.id) {
            return {
              ...s,
              verificationStatus: "assessed",
              level: Math.min(100, s.level + 20),
              levelTitle: s.level + 20 >= 80 ? "Advanced" : "Intermediate",
              date: "Verified just now"
            };
          }
          return s;
        }));
      }
    }
  };

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certModalSkill || !certForm.title) return;
    
    setSkillsList(prev => prev.map(s => {
      if (s.id === certModalSkill.id) {
        return {
          ...s,
          verificationStatus: "industry_verified",
          level: Math.min(100, s.level + 25),
          levelTitle: "Industry Verified",
          date: `Cert: ${certForm.issuer || "Verified"} #${certForm.credentialId || "ID-1002"}`,
          issuer: certForm.issuer
        };
      }
      return s;
    }));
    
    setCertModalSkill(null);
    setCertForm({ title: "", issuer: "", issueDate: "", credentialId: "", url: "" });
    setCertUploadedFile(null);
    alert(`Certificate for ${certModalSkill.name} submitted successfully! Skill marked as Certificate Verified (100 Skill Coins awarded 🪙).`);
  };

  const filteredSkills = skillsList.filter(s => {
    if (activeTabFilter === "all") return true;
    return s.verificationStatus === activeTabFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Skill Intelligence & Verification Engine" 
          subtitle="Prove your abilities through automated skill tests or upload authentic industry certificates."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Skill Mapping & Verification</span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Target Domain: {selectedDomain}
              </h2>
              <p className="text-xs text-slate-400">Benchmarked against 12,000+ live industry developer requirements.</p>
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

              <button 
                onClick={() => alert("Skill Vectors synchronized with industry benchmarks.")}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Sync Vectors
              </button>
            </div>
          </div>

          {/* Verification Status Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Filter Status:</span>
              {(["all", "self_declared", "assessed", "industry_verified"] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setActiveTabFilter(filterKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTabFilter === filterKey
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {filterKey === "all" && "All Skills"}
                  {filterKey === "self_declared" && "Self-Declared"}
                  {filterKey === "assessed" && "Assessment Verified"}
                  {filterKey === "industry_verified" && "Certificate Verified"}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 font-semibold">
              Verified: <span className="text-cyan-400 font-bold">{skillsList.filter(s => s.verificationStatus !== "self_declared").length}</span> / {skillsList.length} Skills
            </div>
          </div>

          {/* Skills Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skills List (2 cols) */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Verified Skill Matrix & Proofs
                  </h3>
                  <p className="text-xs text-slate-400">Self-declared, Assessment-tested, and Certificate-verified skills.</p>
                </div>
              </div>

              <div className="space-y-4">
                {filteredSkills.map((sk) => (
                  <div key={sk.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-sm">{sk.name}</span>
                        
                        {sk.verificationStatus === "self_declared" && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1 font-bold">
                            Self-Declared Skill
                          </span>
                        )}
                        {sk.verificationStatus === "assessed" && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Assessment Verified
                          </span>
                        )}
                        {sk.verificationStatus === "industry_verified" && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-bold">
                            <FileCheck className="w-3 h-3 text-emerald-400" /> Certificate Verified
                          </span>
                        )}

                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {sk.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>Level: <strong className="text-slate-200">{sk.levelTitle} ({sk.level}%)</strong></span>
                        <span>Target: {sk.target}%</span>
                        {sk.date && <span className="text-slate-500 font-mono text-[11px]">{sk.date}</span>}
                      </div>

                      <div className="w-full bg-slate-900 rounded-full h-1.5 mt-1 border border-slate-800">
                        <div 
                          className={`h-1.5 rounded-full ${
                            sk.verificationStatus === "industry_verified" ? "bg-emerald-400" :
                            sk.verificationStatus === "assessed" ? "bg-cyan-400" : "bg-slate-600"
                          }`}
                          style={{ width: `${sk.level}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenAssessment(sk)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-cyan-200 font-bold text-xs transition border border-blue-500/30 flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>Take Skill Test</span>
                      </button>

                      <button
                        onClick={() => setCertModalSkill(sk)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3 h-3 text-emerald-400" />
                        <span>Add Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Stats & Proof Export Panel (1 col) */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Verification Scorecard
                  </h3>
                  <p className="text-xs text-slate-400">Earn Skill Coins 🪙 for every skill verified.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Method A: Skill Test</span>
                      <span className="text-cyan-400">+100 Coins</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Complete live 3-question skill quizzes to upgrade from Self-Declared to Assessment Verified.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Method B: Upload Certificate</span>
                      <span className="text-emerald-400">+150 Coins</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Add issuing org, credential ID, and URL to earn Certificate Verified status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 text-center space-y-2">
                <span className="text-2xl">🎓</span>
                <h4 className="text-xs font-bold text-white">Verified Skill Transcript</h4>
                <p className="text-[11px] text-slate-400">Export official verified vector proof PDF.</p>
                <button 
                  onClick={() => alert("Verified Skill Vector Transcript PDF generated!")}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer"
                >
                  Download Proof PDF
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: SKILL ASSESSMENT QUIZ */}
      {testModalSkill && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in">
            <button 
              onClick={() => setTestModalSkill(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!testCompleted ? (
              <>
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    Live Skill Assessment ({currentQuestionIndex + 1}/{mockQuestions.length})
                  </span>
                  <h3 className="text-lg font-bold text-white">{testModalSkill.name} Test</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-200">
                    {mockQuestions[currentQuestionIndex].q}
                  </p>

                  <div className="space-y-2 pt-2">
                    {mockQuestions[currentQuestionIndex].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition ${
                          selectedAnswers[currentQuestionIndex] === idx
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}. {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition flex items-center gap-1.5"
                  >
                    <span>{currentQuestionIndex === mockQuestions.length - 1 ? "Submit Assessment" : "Next Question"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Assessment Passed!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your {testModalSkill.name} status is now upgraded to <strong className="text-cyan-400">Assessment Verified</strong>.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold text-sm">
                  🪙 +{earnedCoins} Skill Coins Claimed
                </div>
                <button
                  onClick={() => setTestModalSkill(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                >
                  Return to Skill Matrix
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: CERTIFICATE UPLOAD */}
      {certModalSkill && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in">
            <button 
              onClick={() => setCertModalSkill(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Certificate Proof Verification
              </span>
              <h3 className="text-lg font-bold text-white">Add Certificate for {certModalSkill.name}</h3>
            </div>

            <form onSubmit={handleSaveCertificate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Certificate Title</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Developer Associate"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. AWS / Coursera / DeepLearning.AI"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Credential ID</label>
                  <input
                    type="text"
                    placeholder="e.g. AWS-8921-X"
                    value={certForm.credentialId}
                    onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Upload Certificate (PDF / Image)</label>
                <div 
                  onClick={() => setCertUploadedFile("certificate_document.pdf")}
                  className="border border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 text-center cursor-pointer bg-slate-950 transition"
                >
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <span className="text-slate-300 font-medium">
                    {certUploadedFile ? `Selected: ${certUploadedFile}` : "Click to select certificate file"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCertModalSkill(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md shadow-emerald-600/20"
                >
                  Save & Verify Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
