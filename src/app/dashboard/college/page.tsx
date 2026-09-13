"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Building2, Users, BarChart3, TrendingUp, Target, 
  Award, ShieldCheck, ArrowRight, Download, RefreshCw
} from "lucide-react";

export default function CollegeDashboardPage() {
  const collegeData = {
    name: "IIT Bombay — Institutional Portal",
    accreditation: "NAAC A++",
    totalStudents: 3450,
    placementRate: 91.5,
    avgPackage: "₹18.5 LPA",
    institutionalReadiness: 86,
    topGapSkill: "Vector Databases & AI System Architecture (-32% gap)"
  };

  const departmentHeatmap = [
    { dept: "Computer Science & Engineering", students: 480, readiness: 92, topSkill: "Next.js, PyTorch", mainGap: "System Design" },
    { dept: "Artificial Intelligence & Data Science", students: 320, readiness: 88, topSkill: "Python, TensorFlow", mainGap: "Vector DBs & RAG" },
    { dept: "Electrical & Electronics", students: 560, readiness: 81, topSkill: "C++, Embedded Systems", mainGap: "Full Stack Web" },
    { dept: "Information Technology", students: 410, readiness: 85, topSkill: "Java, Node.js", mainGap: "Cloud & DevOps" },
  ];

  const hiringPartners = [
    { name: "Google", offers: 42, avgStipend: "₹1.5 Lakh/mo" },
    { name: "Microsoft", offers: 38, avgStipend: "₹1.4 Lakh/mo" },
    { name: "Stripe", offers: 18, avgStipend: "₹1.8 Lakh/mo" },
    { name: "Amazon", offers: 55, avgStipend: "₹1.2 Lakh/mo" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Institutional Skill Intelligence Center" 
          subtitle={`${collegeData.name} — Real-Time Curriculum Alignment & Placement Readiness Matrix`}
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/dashboard/college/analytics" className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 transition group">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase">
                <span>Placement Readiness</span>
                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.institutionalReadiness}%</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                Institutional Skill Matrix <ArrowRight className="w-3 h-3 text-indigo-400" />
              </p>
            </Link>

            <Link href="/dashboard/college/students" className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition group">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase">
                <span>Total Tracked Students</span>
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.totalStudents}</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                View Student Roster <ArrowRight className="w-3 h-3 text-cyan-400" />
              </p>
            </Link>

            <Link href="/dashboard/college/placements" className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition group">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
                <span>Placement Rate</span>
                <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">{collegeData.placementRate}%</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                View Placement Tracker <ArrowRight className="w-3 h-3 text-emerald-400" />
              </p>
            </Link>

            <Link href="/dashboard/college/partners" className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 hover:border-purple-400 transition group">
              <div className="flex items-center justify-between text-xs text-purple-400 font-bold uppercase">
                <span>Hiring Partners</span>
                <Building2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-white mt-3">150+</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                View Partner Directory <ArrowRight className="w-3 h-3 text-purple-400" />
              </p>
            </Link>
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

          {/* Hiring Partners & Placement Tracker Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  Top Campus Recruiters & Offer Count
                </h3>
                <Link href="/dashboard/college/partners" className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                  View All Partners <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                {hiringPartners.map((p) => (
                  <div key={p.name} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white text-sm">{p.name}</span>
                      <p className="text-slate-400">Avg Stipend: {p.avgStipend}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold">
                      {p.offers} Campus Offers
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  Curriculum Update Recommendation
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Based on Q3 hiring data from 120 recruiters, introducing <strong>Vector Databases & Microservices System Design</strong> into the 3rd year syllabus will increase average placement compensation by <strong>24%</strong>.
                </p>
              </div>

              <div className="space-y-2 pt-4">
                <Link 
                  href="/dashboard/college/analytics"
                  className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>View Full Curriculum Gap Analytics Report</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
