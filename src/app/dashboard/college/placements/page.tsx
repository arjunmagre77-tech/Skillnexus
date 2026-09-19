"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Briefcase, TrendingUp, Award, Building2, Plus, Download, 
  Calendar, CheckCircle2, Clock, Users, Filter, Search, X, Sparkles
} from "lucide-react";

interface DriveRecord {
  id: string;
  company: string;
  logo: string;
  roles: string;
  ctc: string;
  eligibleBranches: string;
  driveDate: string;
  registeredCount: number;
  selectedCount: number;
  status: "Live" | "Upcoming" | "Completed";
}

const mockDrives: DriveRecord[] = [
  {
    id: "drv_1",
    company: "Google India",
    logo: "🌐",
    roles: "Software Engineer & AI Systems Intern",
    ctc: "₹32.0 LPA (FTE) / ₹1.5 Lakh/mo (Stipend)",
    eligibleBranches: "CSE, AIDS, IT",
    driveDate: "2025-10-15",
    registeredCount: 420,
    selectedCount: 42,
    status: "Live"
  },
  {
    id: "drv_2",
    company: "Microsoft",
    logo: "🪟",
    roles: "Cloud Solutions Architect & Full Stack",
    ctc: "₹28.5 LPA (FTE) / ₹1.4 Lakh/mo (Stipend)",
    eligibleBranches: "CSE, AIDS, IT, ECE",
    driveDate: "2025-10-22",
    registeredCount: 510,
    selectedCount: 38,
    status: "Live"
  },
  {
    id: "drv_3",
    company: "Stripe",
    logo: "💳",
    roles: "Backend Infrastructure Engineer",
    ctc: "₹42.0 LPA (FTE) / ₹1.8 Lakh/mo (Stipend)",
    eligibleBranches: "CSE, IT",
    driveDate: "2025-11-05",
    registeredCount: 280,
    selectedCount: 18,
    status: "Upcoming"
  },
  {
    id: "drv_4",
    company: "Amazon Web Services",
    logo: "☁️",
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
    logo: "⚡",
    roles: "Data Platform & ML Engineer",
    ctc: "₹35.0 LPA (FTE)",
    eligibleBranches: "CSE, AIDS",
    driveDate: "2025-11-12",
    registeredCount: 310,
    selectedCount: 0,
    status: "Upcoming"
  }
];

export default function PlacementTrackerPage() {
  const [drives, setDrives] = useState<DriveRecord[]>(mockDrives);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Drive Form state
  const [newCompany, setNewCompany] = useState("");
  const [newRoles, setNewRoles] = useState("");
  const [newCtc, setNewCtc] = useState("");
  const [newDate, setNewDate] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredDrives = drives.filter(d => {
    const matchesStatus = filterStatus === "All" || d.status === filterStatus;
    const matchesSearch = d.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.roles.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRoles || !newCtc) return;

    const newEntry: DriveRecord = {
      id: `drv_${Date.now()}`,
      company: newCompany,
      logo: "🏢",
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
    setNewCompany("");
    setNewRoles("");
    setNewCtc("");
    showToast(`🚀 New Placement Drive for ${newEntry.company} scheduled!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Institutional Placement Tracker" 
          subtitle="IIT Bombay — Corporate Recruitment Drive Center & Batch Placement Analytics"
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Notification Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
                <span>Placement Rate (2025 Batch)</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">91.5%</div>
              <p className="text-xs text-emerald-400/80 mt-1">1,623 of 1,770 eligible students placed</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase">
                <span>Average Compensation</span>
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">₹18.5 LPA</div>
              <p className="text-xs text-slate-400 mt-1">+14.2% increase vs 2024</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
                <span>Highest Offer CTC</span>
                <Award className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">₹54.0 LPA</div>
              <p className="text-xs text-amber-400/80 mt-1">International AI Systems Offer</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase">
                <span>Active Campus Drives</span>
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black text-white mt-3">28 Drives</div>
              <p className="text-xs text-slate-400 mt-1">Live recruiting pipelines</p>
            </div>
          </div>

          {/* Department Placement Breakdown */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Department-Wise Placement Progress (2025 Batch)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">Computer Science & Engineering</span>
                  <span className="text-emerald-400">98% Placed (470 / 480)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: "98%" }} />
                </div>
                <p className="text-[11px] text-slate-400">Avg Package: ₹24.2 LPA</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">AI & Data Science</span>
                  <span className="text-emerald-400">94% Placed (301 / 320)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: "94%" }} />
                </div>
                <p className="text-[11px] text-slate-400">Avg Package: ₹22.8 LPA</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">Information Technology</span>
                  <span className="text-emerald-400">92% Placed (377 / 410)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full" style={{ width: "92%" }} />
                </div>
                <p className="text-[11px] text-slate-400">Avg Package: ₹19.5 LPA</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">Electrical & Electronics</span>
                  <span className="text-amber-400">85% Placed (476 / 560)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: "85%" }} />
                </div>
                <p className="text-[11px] text-slate-400">Avg Package: ₹15.8 LPA</p>
              </div>
            </div>
          </div>

          {/* Campus Placement Drives Table Section */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                  Corporate Recruitment Drives Matrix
                </h3>
                <p className="text-xs text-slate-400">Manage live, upcoming, and completed campus recruitment drives.</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Placement Drive</span>
                </button>

                <button 
                  onClick={() => showToast("📄 Complete Placement Audit Report exported!")}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search drive by company name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold focus:outline-none"
                >
                  <option value="All">All Drive Statuses</option>
                  <option value="Live">Live / Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Drives Data Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                    <th className="p-4">Recruiting Company</th>
                    <th className="p-4">Hiring Roles</th>
                    <th className="p-4">Compensation / CTC</th>
                    <th className="p-4">Drive Date</th>
                    <th className="p-4 text-center">Registrations / Selections</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredDrives.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-950/40 transition">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl p-1.5 rounded-lg bg-slate-950 border border-slate-800">{d.logo}</span>
                          <span>{d.company}</span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-200">
                        <div className="font-semibold">{d.roles}</div>
                        <div className="text-[11px] text-slate-400">Eligible: {d.eligibleBranches}</div>
                      </td>

                      <td className="p-4 font-black text-cyan-400">{d.ctc}</td>

                      <td className="p-4 text-slate-300 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{d.driveDate}</span>
                        </div>
                      </td>

                      <td className="p-4 text-center font-bold">
                        <span className="text-white">{d.registeredCount} Applied</span>
                        {d.selectedCount > 0 && (
                          <span className="block text-emerald-400 text-[11px]">✓ {d.selectedCount} Selected</span>
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
                          onClick={() => showToast(`Opening roster filter for ${d.company} applicants...`)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition"
                        >
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

      {/* Schedule New Drive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1"
            >
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
                <input 
                  type="text" 
                  required
                  placeholder="e.g. OpenAI / NVIDIA"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Open Roles / Designation</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. AI Systems Engineer Intern"
                  value={newRoles}
                  onChange={(e) => setNewRoles(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Compensation / Package (CTC)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. ₹25.0 LPA / ₹1.2 Lakh/mo"
                  value={newCtc}
                  onChange={(e) => setNewCtc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Drive Date</label>
                <input 
                  type="date" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30"
                >
                  Publish & Schedule Drive
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
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
