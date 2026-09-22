"use client";
import React, { useState, useRef } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  FileText, Upload, ArrowRight, Search, BarChart2, 
  TrendingUp, Rocket, Lightbulb, ChevronRight, CheckCircle2, 
  Clock, Star, Target, UserCheck
} from "lucide-react";

export default function CareerToolsPage() {
  const [pasteMode, setPasteMode] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState(78);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setScore(84);
      setAnalyzing(false);
      alert("Resume analysis complete! ATS score updated.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Skill Gap Analyzer & Career Tools" 
          subtitle="Compare your verified skills against industry benchmarks and optimize your ATS resume score."
        />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#0a1228] shadow-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">
                  Skill Intelligence
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Skill Gap<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Analyzer Engine
                </span>
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Compare your current verified skills against industry target roles and get automated resume ATS suggestions.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative w-32 h-36 rounded-2xl border border-blue-400/40 bg-[#0d1b3e]/80 backdrop-blur-md flex flex-col p-3 shadow-2xl shadow-blue-500/20">
                <div className="space-y-1.5">
                  <div className="h-1.5 w-16 rounded bg-slate-600/80" />
                  <div className="h-1 w-12 rounded bg-slate-700/60" />
                  <div className="h-1 w-14 rounded bg-slate-700/60" />
                  <div className="h-px w-full bg-slate-700/40 my-1.5" />
                  <div className="h-1 w-10 rounded bg-blue-500/60" />
                  <div className="h-1 w-14 rounded bg-slate-700/60" />
                </div>
                <div className="text-[9px] font-bold text-slate-400 mt-auto">ATS RESUME</div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 backdrop-blur-md">
                  <span className="text-lg font-black text-cyan-300">ATS</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-8 space-y-6">

              {/* Central Section: Resume Analyzer */}
              <div className="p-6 rounded-2xl bg-[#061224] border border-[#132c4e] shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Resume Analyzer</h2>
                    <p className="text-xs text-slate-400">Get ATS score & improve your resume</p>
                  </div>
                </div>

                {/* Upload / Paste Area */}
                <div className="border border-dashed border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-8 bg-[#040c1a]/60 text-center relative transition-all duration-300">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                  />

                  {!pasteMode ? (
                    <div className="space-y-3">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 cursor-pointer hover:bg-cyan-500/20 transition-all shadow-inner"
                      >
                        <Upload className="w-7 h-7" />
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-slate-200">
                          {fileName ? (
                            <span className="text-cyan-300 font-bold">Selected: {fileName}</span>
                          ) : (
                            <>
                              Upload your resume (PDF/DOCX) or{" "}
                              <button
                                type="button"
                                onClick={() => setPasteMode(true)}
                                className="text-cyan-400 hover:underline font-bold"
                              >
                                Paste your text
                              </button>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          Max file size: 5MB
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-semibold">Paste Resume Text</span>
                        <button
                          type="button"
                          onClick={() => setPasteMode(false)}
                          className="text-cyan-400 hover:underline"
                        >
                          Switch back to file upload
                        </button>
                      </div>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume sections here (Skills, Experience, Projects)..."
                        rows={4}
                        className="w-full rounded-xl bg-[#07172e] border border-[#142847] p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  )}

                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {analyzing ? "Analyzing Resume..." : "Analyze Resume"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Popular Career Tools Section */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-cyan-400 fill-current" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Popular Career Tools</h3>
                    <p className="text-[11px] text-slate-400">Tools to help you grow, get noticed and land your dream job.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer shadow-md">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Resume Analyzer
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Get ATS score & improve your resume
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-end">
                      <div className="w-7 h-7 rounded-full bg-[#0b1f3b] border border-[#173a66] group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 transition-all">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer shadow-md">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                          ATS Keyword Match
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Find missing keywords for better shortlisting
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-end">
                      <div className="w-7 h-7 rounded-full bg-[#0b1f3b] border border-[#173a66] group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 transition-all">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer shadow-md">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <BarChart2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                          Skill Gap Analysis
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Know what skills to learn next
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-end">
                      <div className="w-7 h-7 rounded-full bg-[#0b1f3b] border border-[#173a66] group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 transition-all">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer shadow-md">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                          Career Roadmap
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Personalized roadmap for your goals
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-end">
                      <div className="w-7 h-7 rounded-full bg-[#0b1f3b] border border-[#173a66] group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 transition-all">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-4 space-y-5">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#07172e] to-[#0a2347] border border-[#163354] flex items-center justify-between gap-4 shadow-lg group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Rocket className="w-5 h-5 -rotate-45" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-semibold">
                      Your skills today, <span className="text-cyan-400 font-bold block">your opportunities tomorrow.</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0d2748] border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <BarChart2 className="w-4 h-4 text-cyan-400" />
                    Your Resume Analysis
                  </div>
                  <button className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-5 pt-1">
                  <div className="relative w-20 h-20 rounded-full border-4 border-cyan-400 flex flex-col items-center justify-center bg-[#071933] shadow-lg shadow-cyan-500/20 shrink-0">
                    <span className="text-lg font-black text-white">{score}%</span>
                    <span className="text-[8px] uppercase font-bold text-slate-400">ATS Score</span>
                  </div>

                  <div className="space-y-1.5 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Keyword Match
                      </span>
                      <span className="font-bold text-white">8/10</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        Skills Match
                      </span>
                      <span className="font-bold text-white">7/10</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Experience Match
                      </span>
                      <span className="font-bold text-white">6/10</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Formatting
                      </span>
                      <span className="font-bold text-white">9/10</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#091f3a] border border-cyan-500/20 flex items-start gap-2.5 text-xs text-slate-300">
                  <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Good start!</strong>
                    Add more relevant keywords and improve formatting for a higher score.
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Recent Activity
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white">Resume Analysis Completed</div>
                      <div className="text-[11px] text-slate-400 leading-tight">Your resume has been analyzed. Check your score!</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">2 hours ago</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white">New Skill Recommendation</div>
                      <div className="text-[11px] text-slate-400 leading-tight">You might want to learn System Design</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">5 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
