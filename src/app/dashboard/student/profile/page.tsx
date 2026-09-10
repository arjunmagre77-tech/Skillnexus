"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  User, Award, Flame, Target, ShieldCheck, 
  ExternalLink, Share2, Mail, GraduationCap
} from "lucide-react";

export default function StudentProfilePage() {
  const student = {
    name: "Aarav Sharma",
    email: "aarav@iitb.ac.in",
    college: "IIT Bombay",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    cgpa: "8.8 / 10.0",
    talentIQ: 780,
    readinessScore: 84,
    points: 1250,
    streakDays: 5,
    level: "Level 4 — Advanced AI Systems Builder",
    verifiedSkills: ["React / Next.js", "Python / PyTorch", "TypeScript", "SQL & Postgres", "GraphQL"],
    badges: [
      { name: "React Virtuoso", icon: "⚛️", date: "Sep 2026", desc: "Top 2% in Next.js 14 System Test" },
      { name: "5-Day Streak Master", icon: "🔥", date: "Sep 2026", desc: "Completed daily coding challenges 5 days in a row" },
      { name: "Python PyTorch Expert", icon: "🐍", date: "Aug 2026", desc: "Passed PyTorch Tensor Ops Assessment" },
      { name: "Hackathon Finalist", icon: "🏆", date: "Aug 2026", desc: "Built RAG search engine micro-project" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Student Verified Profile & TalentIQ Showcase" 
          subtitle="Your public verified skill resume card for recruiters and mentors."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Main Profile Header Card */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left z-10">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-3xl flex items-center justify-center shadow-xl shadow-cyan-500/20">
                AS
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h2 className="text-2xl font-black text-white">{student.name}</h2>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold">
                    ✓ Verified Student Vector
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center justify-center md:justify-start gap-1">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  {student.college} • {student.department} ({student.year})
                </p>
                <p className="text-xs text-slate-400">CGPA: {student.cgpa} | Email: {student.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 z-10">
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Verified Profile Link
              </button>
            </div>
          </div>

          {/* Gamification Level Progress */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-400">Gamification Progression</span>
                <h3 className="text-lg font-bold text-white">{student.level}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Monthly XP</span>
                <div className="text-xl font-black text-amber-400">{student.points} XP</div>
              </div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 h-3 rounded-full" style={{ width: "75%" }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Current Level 4 (1,250 XP)</span>
              <span>Level 5 Master (1,500 XP Needed)</span>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Unlocked Skill Badges & Trophies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {student.badges.map((b) => (
                <div key={b.name} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center">
                  <div className="text-4xl my-2">{b.icon}</div>
                  <h4 className="font-bold text-white text-sm">{b.name}</h4>
                  <p className="text-xs text-slate-400">{b.desc}</p>
                  <span className="text-[10px] text-cyan-400 block pt-1">{b.date}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
