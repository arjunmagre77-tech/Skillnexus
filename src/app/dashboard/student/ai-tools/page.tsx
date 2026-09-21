"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  FileText, Upload, ArrowRight, Search, BarChart2, 
  TrendingUp, Rocket, Lightbulb, ChevronRight, CheckCircle2, 
  Clock, Star, Sparkles, SlidersHorizontal, Check, 
  FileCode, ShieldCheck, UserCheck, X
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
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN: Hero + Resume Analyzer Dropzone + Popular Career Tools (approx 8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-[#163354] bg-gradient-to-r from-[#07152b] via-[#091e3d] to-[#0a2347] p-6 md:p-8 shadow-xl">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-lg">
                    <div className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
                      Career Tools
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      Turn Your Skills into <span className="text-cyan-400">Opportunities</span>
                    </h1>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      Use our powerful career tools to build your resume, analyze your skills, and get personalized insights for a better tomorrow.
                    </p>
                  </div>

                  {/* 3D Resume Sheet Graphic */}
                  <div className="hidden sm:flex shrink-0 relative pr-4">
                    <div className="w-40 h-28 bg-gradient-to-br from-[#0c2242] to-[#081831] rounded-xl border border-cyan-500/40 shadow-2xl p-3 flex flex-col justify-between relative group hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                        <div className="text-[10px] font-bold text-white tracking-wider">RESUME</div>
                        <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center text-[9px] text-cyan-400">✓</div>
                      </div>
                      <div className="space-y-1.5 py-1">
                        <div className="h-1.5 w-3/4 rounded bg-cyan-400/40" />
                        <div className="h-1.5 w-1/2 rounded bg-blue-500/40" />
                        <div className="h-1.5 w-2/3 rounded bg-slate-600" />
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[9px] text-cyan-300 font-bold">
                        <span>ATS Optimized</span>
                        <span>98%</span>
                      </div>
                      {/* Floating mini badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-blue-600 border border-cyan-400 flex items-center justify-center text-xs shadow-lg">
                        📈
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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

                  {/* Analyze Button */}
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
                  {/* Tool 1 */}
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

                  {/* Tool 2 */}
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

                  {/* Tool 3 */}
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

                  {/* Tool 4 */}
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

            {/* RIGHT COLUMN: Rocket Banner + Resume Analysis Score + Quick Tips + Recent Activity (approx 4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card 1: Rocket Motivational Card */}
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

              {/* Card 2: Your Resume Analysis Widget */}
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
                  {/* Circular Gauge */}
                  <div className="relative w-20 h-20 rounded-full border-4 border-cyan-400 flex flex-col items-center justify-center bg-[#071933] shadow-lg shadow-cyan-500/20 shrink-0">
                    <span className="text-lg font-black text-white">{score}%</span>
                    <span className="text-[8px] uppercase font-bold text-slate-400">ATS Score</span>
                  </div>

                  {/* Metrics list */}
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

                {/* Recommendation Box */}
                <div className="p-3 rounded-xl bg-[#091f3a] border border-cyan-500/20 flex items-start gap-2.5 text-xs text-slate-300">
                  <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Good start!</strong>
                    Add more relevant keywords and improve formatting for a higher score.
                  </div>
                </div>
              </div>

              {/* Card 3: Quick Tips */}
              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Lightbulb className="w-4 h-4 text-cyan-400" />
                    Quick Tips
                  </div>
                  <button className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5">
                    View Tips <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Add relevant keywords",
                    "Use clean formatting",
                    "Highlight key skills",
                    "Keep it concise"
                  ].map((tip) => (
                    <span
                      key={tip}
                      className="px-3 py-1.5 rounded-xl bg-[#091b33] border border-[#153457] text-xs font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 cursor-pointer transition-all"
                    >
                      {tip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4: Recent Activity */}
              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Recent Activity
                  </div>
                  <button className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Activity 1 */}
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

                  {/* Activity 2 */}
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

                  {/* Activity 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white">ATS Tips Available</div>
                      <div className="text-[11px] text-slate-400 leading-tight">View 5 tips to improve your resume</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">6 hours ago</div>
                    </div>
                  </div>

                  {/* Activity 4 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white">Profile Updated</div>
                      <div className="text-[11px] text-slate-400 leading-tight">Your career profile is now more complete</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">1 day ago</div>
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
