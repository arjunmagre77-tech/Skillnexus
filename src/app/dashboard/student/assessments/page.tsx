"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Award, Play, CheckCircle2, Clock, ShieldCheck, 
  Sparkles, Trophy, FileText, Star, Lock
} from "lucide-react";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");

  const assessments = [
    {
      id: "ass_1",
      title: "Advanced React & Next.js 14 System Test",
      category: "Frontend Architecture",
      duration: "45 Mins",
      questionsCount: 20,
      difficulty: "Advanced",
      passingScore: 80,
      rewardXP: 300,
      badgeIcon: "⚛️",
      completed: true,
      score: 94,
    },
    {
      id: "ass_2",
      title: "Vector DBs & RAG System Optimization",
      category: "AI Infrastructure",
      duration: "60 Mins",
      questionsCount: 15,
      difficulty: "Hard",
      passingScore: 85,
      rewardXP: 500,
      badgeIcon: "🤖",
      completed: false,
    },
    {
      id: "ass_3",
      title: "Python Data Science & PyTorch Tensor Ops",
      category: "Machine Learning",
      duration: "50 Mins",
      questionsCount: 25,
      difficulty: "Intermediate",
      passingScore: 75,
      rewardXP: 250,
      badgeIcon: "🔥",
      completed: true,
      score: 88,
    },
    {
      id: "ass_4",
      title: "System Design for High Scale Services",
      category: "Software Architecture",
      duration: "90 Mins",
      questionsCount: 10,
      difficulty: "Expert",
      passingScore: 85,
      rewardXP: 600,
      badgeIcon: "⚡",
      completed: false,
    }
  ];

  const handleStartTest = (title: string) => {
    alert(`Launching live proctored coding test environment for: "${title}". Good luck!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Skill Assessments & Certifications" 
          subtitle="Automated AI evaluation center to verify your engineering capabilities."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Proctored Verification</span>
              <h2 className="text-2xl font-black text-white">Verified Skill Badges & Certificates</h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Earn cryptographic skill verification tokens accepted by 150+ top tech hiring partners.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-center">
                <Trophy className="w-6 h-6 mx-auto mb-1 text-amber-400" />
                <span className="text-xs font-bold block">14 Badges Unlocked</span>
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab("available")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "available" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Available Tests ({assessments.filter(a => !a.completed).length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "completed" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Passed & Verified ({assessments.filter(a => a.completed).length})
            </button>
          </div>

          {/* Assessment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessments
              .filter((a) => (activeTab === "available" ? !a.completed : a.completed))
              .map((item) => (
                <div 
                  key={item.id} 
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl">
                          {item.badgeIcon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">{item.title}</h3>
                          <p className="text-xs text-slate-400">{item.category}</p>
                        </div>
                      </div>

                      {item.completed ? (
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.score}% Score
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {item.difficulty}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.duration}
                      </span>
                      <span>{item.questionsCount} Questions / Tasks</span>
                      <span className="text-amber-400 font-bold">+{item.rewardXP} XP</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    {item.completed ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-mono">Verify Hash: 0x9a4f...7b2</span>
                        <button 
                          onClick={() => alert(`Certificate generated for ${item.title}`)}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Download Cert</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartTest(item.title)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Launch Proctored Assessment</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
