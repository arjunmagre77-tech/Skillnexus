"use client";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Users, TrendingUp, Calendar, DollarSign,
  BarChart3, ArrowRight, Download, Target, Building2,
  Lightbulb, ShieldCheck, Award
} from "lucide-react";

const collegeData = {
  name: "Cummins College of Engineering for Women",
  institutionalReadiness: 86,
  totalStudents: 3450,
  placementRate: 92,
  activePartners: 150,
};

const departmentHeatmap = [
  { dept: "Computer Science & Engineering", students: 480, readiness: 92, topSkill: "Full Stack Web", mainGap: "System Design" },
  { dept: "Artificial Intelligence & Data Science", students: 320, readiness: 88, topSkill: "Data Engineering", mainGap: "Vector DBs & RAG" },
  { dept: "Information Technology", students: 410, readiness: 85, topSkill: "Cloud & DevOps", mainGap: "System Design" },
  { dept: "Electrical & Electronics", students: 560, readiness: 81, topSkill: "Cybersecurity", mainGap: "Full Stack Web" },
];

const hiringPartners = [
  { name: "Google", logo: "G", color: "from-red-500 via-yellow-400 to-green-500", offers: 42, avgStipend: "₹1.5 Lakh/mo" },
  { name: "Microsoft", logo: "M", color: "from-blue-500 to-cyan-400", offers: 38, avgStipend: "₹1.4 Lakh/mo" },
  { name: "Stripe", logo: "S", color: "from-indigo-600 to-violet-500", offers: 18, avgStipend: "₹1.8 Lakh/mo" },
  { name: "Amazon", logo: "A", color: "from-orange-500 to-amber-400", offers: 55, avgStipend: "₹1.2 Lakh/mo" },
];

export default function CollegeDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Institutional Overview"
          subtitle="Track your placement progress, skill readiness, and key insights at a glance."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Header block */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Institutional Overview</span>
              </div>
              <h1 className="text-2xl font-black text-white">{collegeData.name}</h1>
              <p className="text-sm text-slate-400 mt-1">Track placement readiness and curriculum alignment across all branches.</p>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Academic Year 2025–26
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/dashboard/college/analytics" className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 transition group">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase">
                <span>Placement Readiness</span>
                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.institutionalReadiness}%</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                Institutional Skill Matrix <ArrowRight className="w-3 h-3 text-indigo-400" />
              </p>
            </Link>

            <Link href="/dashboard/college/students" className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition group">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase">
                <span>Total Tracked Students</span>
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.totalStudents}</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                View Student Roster <ArrowRight className="w-3 h-3 text-cyan-400" />
              </p>
            </Link>

            <Link href="/dashboard/college/placements" className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition group">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
                <span>Placement Rate</span>
                <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.placementRate}%</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                View Placement Tracker <ArrowRight className="w-3 h-3 text-emerald-400" />
              </p>
            </Link>

            <Link href="/dashboard/college/partners" className="p-5 rounded-xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 hover:border-purple-400 transition group">
              <div className="flex items-center justify-between text-xs text-purple-400 font-bold uppercase">
                <span>Hiring Partners</span>
                <Building2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.activePartners}+</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                View Partner Directory <ArrowRight className="w-3 h-3 text-purple-400" />
              </p>
            </Link>
          </div>

          {/* 100-Point Placement Score Model */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Transparent Placement Readiness Score Engine (100-Point Model)
                </h2>
                <p className="text-xs text-slate-400">Measurable career-readiness factors based on platform student data.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Institutional Avg: 86 / 100
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { factor: "Skill Proficiency", weight: "30%", desc: "Core technical mastery", score: "88/100" },
                { factor: "Skill Verification", weight: "20%", desc: "Assessed & certified skills", score: "82/100" },
                { factor: "Assessment Score", weight: "15%", desc: "Platform test results", score: "85/100" },
                { factor: "Certifications", weight: "15%", desc: "Verified credentials", score: "84/100" },
                { factor: "Industry Projects", weight: "10%", desc: "Real PR submissions", score: "90/100" },
                { factor: "Internship & Resume", weight: "10%", desc: "Work history & ATS quality", score: "87/100" },
              ].map((m) => (
                <div key={m.factor} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-center">
                  <div className="text-[10px] uppercase font-bold text-cyan-400">{m.weight} Weight</div>
                  <h4 className="font-extrabold text-white text-xs">{m.factor}</h4>
                  <p className="text-[10px] text-slate-400">{m.desc}</p>
                  <div className="text-xs font-black text-emerald-400 pt-1 border-t border-slate-800">{m.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Readiness Heatmap */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Departmental Skill Gap & Readiness Heatmap
                </h2>
                <p className="text-xs text-slate-400">Institutional comparison of curriculum alignment across engineering branches.</p>
              </div>
              <Link href="/dashboard/college/analytics" className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                Full Analytics Heatmap Matrix <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departmentHeatmap.map((d) => (
                <div key={d.dept} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm">{d.dept}</h3>
                      <p className="text-xs text-slate-400">{d.students} Registered Students</p>
                    </div>
                    <span className="text-sm font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {d.readiness}% Ready
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full" style={{ width: `${d.readiness}%` }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Strongest Skills:</span>
                      <strong className="text-emerald-400">{d.topSkill}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Primary Skill Gap:</span>
                      <strong className="text-red-400">{d.mainGap}</strong>
                    </div>
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
