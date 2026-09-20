"use client";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Users, TrendingUp, Calendar, DollarSign,
  BarChart3, ArrowRight, Download, Target, Building2,
  Lightbulb
} from "lucide-react";

const departmentSkillGaps = [
  { dept: "Computer Science & Engineering", students: 480, readiness: 92, gap: "System Design", color: "from-cyan-500 to-blue-500" },
  { dept: "Artificial Intelligence & Data Science", students: 320, readiness: 88, gap: "Vector DBs & RAG", color: "from-indigo-500 to-purple-500" },
  { dept: "Electrical & Electronics", students: 560, readiness: 81, gap: "Full Stack Web", color: "from-amber-500 to-orange-500" },
  { dept: "Information Technology", students: 410, readiness: 85, gap: "Cloud & DevOps", color: "from-emerald-500 to-teal-500" },
];

const hiringPartners = [
  { name: "Google", logo: "G", color: "from-red-500 via-yellow-400 to-green-500", offers: 42, avgStipend: "₹1.5 Lakh/mo" },
  { name: "Microsoft", logo: "M", color: "from-blue-500 to-cyan-400", offers: 38, avgStipend: "₹1.4 Lakh/mo" },
  { name: "Stripe", logo: "S", color: "from-indigo-600 to-violet-500", offers: 18, avgStipend: "₹1.8 Lakh/mo" },
  { name: "Amazon", logo: "A", color: "from-orange-500 to-amber-400", offers: 55, avgStipend: "₹1.2 Lakh/mo" },
];

export default function CollegeDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Institutional Overview"
          subtitle="Track your placement progress, skill readiness, and key insights at a glance."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Page Title Block */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Institutional Overview</span>
              </div>
              <h1 className="text-2xl font-black text-white">Cummins College of Engineering for Women</h1>
              <p className="text-sm text-slate-400 mt-1">Track your placement progress, skill readiness, and key insights at a glance.</p>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Academic Year 2025–26
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placement Readiness */}
            <Link href="/dashboard/college/analytics" className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition group space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Readiness</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">86%</div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: "86%" }} />
              </div>
              <p className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                Institutional Skill Matrix <ArrowRight className="w-3 h-3" />
              </p>
            </Link>

            {/* Total Tracked Students */}
            <Link href="/dashboard/college/students" className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition group space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tracked Students</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">3450</div>
              <p className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                View Student Roster <ArrowRight className="w-3 h-3" />
              </p>
            </Link>

            {/* Upcoming Sessions */}
            <Link href="/dashboard/college/placements" className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition group space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Sessions</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">3</div>
              <p className="text-xs text-purple-400 font-semibold flex items-center gap-1">
                Scheduled for this week <ArrowRight className="w-3 h-3" />
              </p>
            </Link>

            {/* Placement Earnings */}
            <Link href="/dashboard/college/placements" className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition group space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Earnings</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">$1,850</div>
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                Earned this month <ArrowRight className="w-3 h-3" />
              </p>
            </Link>
          </div>

          {/* Main Content — 2 column */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Skill Gap Analysis */}
            <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-base font-bold text-white">Skill Gap Analysis</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Compare current student skills with industry requirements.</p>
                </div>
                <Link
                  href="/dashboard/college/analytics"
                  className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 text-indigo-400 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  View Full Report <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-4">
                {departmentSkillGaps.map((d) => (
                  <div key={d.dept} className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${d.color} opacity-80 flex items-center justify-center shrink-0`}>
                            <BarChart3 className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">{d.dept}</p>
                            <p className="text-[10px] text-slate-400">{d.students} Registered Students</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pl-8">
                          <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${d.color} transition-all duration-700`}
                              style={{ width: `${d.readiness}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-emerald-400 shrink-0">{d.readiness}% Ready</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold shrink-0 whitespace-nowrap">
                        Primary Gap: {d.gap}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Top Recruiters + Curriculum Recommendation */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Top Recruiters */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">Top Campus Recruiters & Offer Count</h3>
                  </div>
                  <Link href="/dashboard/college/partners" className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                    View All Partners <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {hiringPartners.map((p) => (
                    <div key={p.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition group">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0`}>
                          {p.logo}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{p.name}</p>
                          <p className="text-[10px] text-slate-400">Avg Stipend: {p.avgStipend}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-[10px] whitespace-nowrap">
                        {p.offers} Campus Offers
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Recommendation */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Curriculum Update Recommendation</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Based on Q3 hiring data from 120 recruiters, introducing{" "}
                  <strong className="text-white">Vector Databases & Microservices System Design</strong> into the 3rd year syllabus will increase average placement compensation by{" "}
                  <strong className="text-emerald-400">24%</strong>.
                </p>
                <Link
                  href="/dashboard/college/analytics"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  View Full Curriculum Gap Analytics Report
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
