"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Briefcase, TrendingUp, Award, Building2, Plus, Download,
  Calendar, CheckCircle2, Eye, Users, Filter, Search, X, Sparkles,
  ArrowRight, LayoutList
} from "lucide-react";

interface DriveRecord {
  id: string;
  company: string;
  logoText: string;
  logoColor: string;
  roles: string;
  ctc: string;
  stipend?: string;
  eligibleBranches: string;
  driveDate: string;
  registeredCount: number;
  selectedCount: number;
  status: "Live" | "Upcoming" | "Completed";
}

const mockDrives: DriveRecord[] = [
  {
    id: "drv_1",
    company: "Google",
    logoText: "G",
    logoColor: "bg-white text-[#4285F4]",
    roles: "Software Engineer & AI Systems Intern",
    ctc: "₹32.0 LPA (FTE)",
    stipend: "₹1.5 Lakh/mo (Stipend)",
    eligibleBranches: "CSE, AIDS, IT",
    driveDate: "2025-10-15",
    registeredCount: 420,
    selectedCount: 42,
    status: "Live"
  },
  {
    id: "drv_2",
    company: "Microsoft",
    logoText: "⊞",
    logoColor: "bg-[#0078D4] text-white",
    roles: "Cloud Solutions Architect & Full Stack",
    ctc: "₹28.5 LPA (FTE)",
    stipend: "₹1.4 Lakh/mo (Stipend)",
    eligibleBranches: "CSE, AIDS, IT, ECE",
    driveDate: "2025-10-22",
    registeredCount: 510,
    selectedCount: 38,
    status: "Live"
  },
  {
    id: "drv_3",
    company: "Stripe",
    logoText: "S",
    logoColor: "bg-[#6772E5] text-white",
    roles: "Backend Infrastructure Engineer",
    ctc: "₹42.0 LPA (FTE)",
    stipend: "₹1.8 Lakh/mo (Stipend)",
    eligibleBranches: "CSE, IT",
    driveDate: "2025-11-05",
    registeredCount: 280,
    selectedCount: 18,
    status: "Upcoming"
  },
  {
    id: "drv_4",
    company: "Amazon",
    logoText: "a",
    logoColor: "bg-[#FF9900] text-slate-900",
    roles: "DevOps & Cloud Engineer",
    ctc: "₹26.0 LPA (FTE)",
    eligibleBranches: "All Engineering Branches",
    driveDate: "2025-09-10",
    registeredCount: 650,
    selectedCount: 55,
    status: "Completed"
  },
  {
    id: "drv_5",
    company: "Databricks",
    logoText: "⚡",
    logoColor: "bg-red-600 text-white",
    roles: "Data Platform & ML Engineer",
    ctc: "₹35.0 LPA (FTE)",
    eligibleBranches: "CSE, AIDS",
    driveDate: "2025-11-12",
    registeredCount: 310,
    selectedCount: 25,
    status: "Upcoming"
  }
];

const deptPlacements = [
  { dept: "Computer Science & Engineering", placed: 450, eligible: 486, pct: 92, color: "from-cyan-500 to-blue-500", right: true },
  { dept: "AI & Data Science", placed: 301, eligible: 320, pct: 94, color: "from-indigo-500 to-violet-500", right: true },
  { dept: "Information Technology", placed: 377, eligible: 410, pct: 92, color: "from-emerald-500 to-teal-500", right: false },
  { dept: "Mechanical Engineering", placed: 285, eligible: 340, pct: 84, color: "from-amber-500 to-orange-500", right: true },
  { dept: "Electrical & Electronics", placed: 476, eligible: 560, pct: 85, color: "from-purple-500 to-violet-500", right: false },
  { dept: "Civil Engineering", placed: 180, eligible: 240, pct: 75, color: "from-rose-500 to-pink-500", right: true },
];

export default function PlacementTrackerPage() {
  const [drives, setDrives] = useState<DriveRecord[]>(mockDrives);
  const [filterDept, setFilterDept] = useState("All Departments");
  const [filterYear, setFilterYear] = useState("All Academic Years");
  const [filterTier, setFilterTier] = useState("All Placement Tiers");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newCompany, setNewCompany] = useState("");
  const [newRoles, setNewRoles] = useState("");
  const [newCtc, setNewCtc] = useState("");
  const [newDate, setNewDate] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredDrives = drives.filter(d => {
    const matchesSearch = d.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.roles.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRoles || !newCtc) return;
    const newEntry: DriveRecord = {
      id: `drv_${Date.now()}`,
      company: newCompany,
      logoText: newCompany.charAt(0),
      logoColor: "bg-slate-700 text-white",
      roles: newRoles,
      ctc: newCtc,
      eligibleBranches: "CSE, AIDS, IT",
      driveDate: newDate || "2025-11-30",
      registeredCount: 0,
      selectedCount: 0,
      status: "Upcoming"
    };
    setDrives([newEntry, ...drives]);
    setIsModalOpen(false);
    setNewCompany(""); setNewRoles(""); setNewCtc(""); setNewDate("");
    showToast(`🚀 New Placement Drive for ${newEntry.company} scheduled!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Placement Tracker"
          subtitle="Track placement statistics, company drives, and student progress in real time."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Page Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Placement Tracker</span>
              </div>
              <h1 className="text-2xl font-black text-white">Placement Progress</h1>
              <p className="text-sm text-slate-400 mt-0.5">Track placement statistics, company drives, and student progress in real time.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Academic Year 2025–26
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Rate (2025 Batch)</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">91.5%</div>
              <p className="text-xs text-emerald-400">1,623 of 1,770 eligible students placed</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Compensation</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">₹18.5 LPA</div>
              <p className="text-xs text-slate-400">+14.2% increase vs 2024</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highest Offer CTC</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">₹54.0 LPA</div>
              <p className="text-xs text-amber-400">International AI Systems Offer</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Campus Drives</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">28 Drives</div>
              <p className="text-xs text-slate-400">Live recruiting pipelines</p>
            </div>
          </div>

          {/* Department-wise Placement Progress */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Department-wise Placement Progress (2025 Batch)</h2>
              </div>
              <button
                onClick={() => showToast("📊 Generating detailed placement report...")}
                className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                View Detailed Report <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {deptPlacements.map((d) => (
                <div key={d.dept} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${d.color} opacity-80 flex items-center justify-center shrink-0`}>
                        <Building2 className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">{d.dept}</p>
                        <p className="text-[10px] text-slate-400">{d.placed} Placed / {d.eligible} Eligible</p>
                      </div>
                    </div>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                      d.pct >= 90
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : d.pct >= 80
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}>{d.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${d.color} transition-all duration-700`}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drives Table */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <h2 className="text-base font-bold text-white">Top Campus Recruiters & Offer Count</h2>
              </div>
            </div>

            {/* Filter row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
              <div className="relative flex-1 w-full max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search company or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex items-center gap-2 ml-auto shrink-0">
                <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
                  <option>All Departments</option>
                  <option>CSE</option>
                  <option>AI & DS</option>
                  <option>IT</option>
                  <option>ECE</option>
                </select>
                <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
                  <option>All Academic Years</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
                <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)} className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
                  <option>All Placement Tiers</option>
                  <option>Tier-1</option>
                  <option>Tier-2</option>
                </select>
                <button className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition">
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                    <th className="p-4">Company</th>
                    <th className="p-4">Hiring Roles</th>
                    <th className="p-4">Compensation / CTC</th>
                    <th className="p-4">Drive Date</th>
                    <th className="p-4">Registrations / Selections</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredDrives.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-950/40 transition">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${d.logoColor} font-black text-sm flex items-center justify-center border border-slate-700 shrink-0`}>
                            {d.logoText}
                          </div>
                          <span>{d.company}</span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-200">
                        <div className="font-semibold text-white text-xs">{d.roles}</div>
                        <div className="text-[11px] text-slate-400">Eligible: {d.eligibleBranches}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-black text-cyan-400 text-xs">{d.ctc}</div>
                        {d.stipend && <div className="text-[10px] text-slate-400">{d.stipend}</div>}
                      </td>

                      <td className="p-4 text-slate-300 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{d.driveDate}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{d.registeredCount} Applied</div>
                        {d.selectedCount > 0 && (
                          <div className="text-[11px] text-emerald-400 font-semibold">{d.selectedCount} Selected</div>
                        )}
                      </td>

                      <td className="p-4">
                        {d.status === "Live" && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] flex items-center gap-1 w-fit animate-pulse">
                            ● Live Now
                          </span>
                        )}
                        {d.status === "Upcoming" && (
                          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-[10px] w-fit block">
                            Upcoming
                          </span>
                        )}
                        {d.status === "Completed" && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-bold text-[10px] w-fit block">
                            Completed
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => showToast(`Opening candidate roster for ${d.company}...`)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition flex items-center gap-1.5 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Candidates
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Schedule Drive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Schedule Campus Recruitment Drive
              </h3>
              <p className="text-xs text-slate-400 mt-1">Register a new recruiter hiring drive for institutional students.</p>
            </div>
            <form onSubmit={handleAddDrive} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Recruiting Company Name</label>
                <input type="text" required placeholder="e.g. OpenAI / NVIDIA" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Open Roles / Designation</label>
                <input type="text" required placeholder="e.g. AI Systems Engineer Intern" value={newRoles} onChange={(e) => setNewRoles(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Compensation / Package (CTC)</label>
                <input type="text" required placeholder="e.g. ₹25.0 LPA / ₹1.2 Lakh/mo" value={newCtc} onChange={(e) => setNewCtc(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Drive Date</label>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="pt-3 flex gap-3">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30">
                  Publish & Schedule Drive
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
