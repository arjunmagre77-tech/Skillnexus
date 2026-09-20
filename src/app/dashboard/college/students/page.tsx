"use client";
import { useState, useMemo } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Users, Search, Download, ShieldCheck, AlertTriangle,
  TrendingUp, CheckCircle2, Eye, Mail, X, Sparkles,
  MoreVertical, ChevronDown, Building2
} from "lucide-react";

interface StudentRecord {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  year: string;
  cgpa: number;
  readinessScore: number;
  targetRole: string;
  topSkills: string[];
  missingSkills: string[];
  status: "Placed" | "Interviewing" | "Active / Ready" | "Needs Remediation" | "In Progress";
  companyPlaced?: string;
}

const mockStudents: StudentRecord[] = [
  {
    id: "st_1",
    rollNo: "21BCE0401",
    name: "Arjun Sharma",
    email: "arjun.sharma@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    cgpa: 8.7,
    readinessScore: 88,
    targetRole: "Full Stack Platform Engineer",
    topSkills: ["React", "Node.js", "Python", "System Design"],
    missingSkills: ["Vector DBs", "Kubernetes"],
    status: "Active / Ready"
  },
  {
    id: "st_2",
    rollNo: "21BAI0112",
    name: "Priya Nair",
    email: "priya.nair@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    department: "AI & Data Science",
    year: "3rd Year",
    cgpa: 9.2,
    readinessScore: 94,
    targetRole: "AI / ML Research Engineer",
    topSkills: ["PyTorch", "Python", "TensorFlow", "Pandas"],
    missingSkills: ["CUDA Optimization"],
    status: "Placed",
    companyPlaced: "Google DeepMind"
  },
  {
    id: "st_3",
    rollNo: "20BIT0089",
    name: "Rahul Mehta",
    email: "rahul.mehta@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    department: "Information Technology",
    year: "4th Year",
    cgpa: 7.9,
    readinessScore: 74,
    targetRole: "DevOps & Cloud Engineer",
    topSkills: ["Docker", "AWS", "Linux", "Git"],
    missingSkills: ["Terraform", "System Architecture"],
    status: "In Progress"
  },
  {
    id: "st_4",
    rollNo: "22BCE0215",
    name: "Sneha Patel",
    email: "sneha.patel@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    cgpa: 8.3,
    readinessScore: 62,
    targetRole: "Frontend Developer",
    topSkills: ["JavaScript", "HTML/CSS", "React"],
    missingSkills: ["TypeScript", "Next.js", "State Management"],
    status: "Needs Remediation"
  },
  {
    id: "st_5",
    rollNo: "20BAI0045",
    name: "Karthik Reddy",
    email: "karthik.reddy@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    department: "AI & Data Science",
    year: "4th Year",
    cgpa: 9.1,
    readinessScore: 96,
    targetRole: "Senior ML Engineer",
    topSkills: ["PyTorch", "Vector DBs", "RAG", "System Design"],
    missingSkills: [],
    status: "Placed",
    companyPlaced: "Microsoft AI"
  },
  {
    id: "st_6",
    rollNo: "21BEE0304",
    name: "Anjali Singh",
    email: "anjali.singh@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    department: "Electrical & Electronics",
    year: "3rd Year",
    cgpa: 7.5,
    readinessScore: 55,
    targetRole: "Embedded & Full Stack Dev",
    topSkills: ["C++", "Embedded C", "Git"],
    missingSkills: ["Node.js", "React", "REST APIs", "SQL"],
    status: "Needs Remediation"
  },
  {
    id: "st_7",
    rollNo: "21BCE0589",
    name: "Vikram Gupta",
    email: "vikram.gupta@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    cgpa: 8.1,
    readinessScore: 78,
    targetRole: "Backend Developer",
    topSkills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    missingSkills: ["Microservices", "Kafka"],
    status: "Interviewing"
  },
  {
    id: "st_8",
    rollNo: "22BIT0192",
    name: "Meera Krishnan",
    email: "meera.krishnan@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    department: "Information Technology",
    year: "2nd Year",
    cgpa: 9.3,
    readinessScore: 71,
    targetRole: "Data Engineer",
    topSkills: ["SQL", "Python", "ETL", "Spark"],
    missingSkills: ["Airflow", "Data Warehousing"],
    status: "Active / Ready"
  }
];

function StatusBadge({ status, companyPlaced }: { status: StudentRecord["status"]; companyPlaced?: string }) {
  if (status === "Placed") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] flex items-center gap-1 w-fit whitespace-nowrap">
        <CheckCircle2 className="w-3 h-3 shrink-0" />
        Placed ({companyPlaced})
      </span>
    );
  }
  if (status === "Active / Ready") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-[10px] flex items-center gap-1 w-fit">
        <CheckCircle2 className="w-3 h-3 shrink-0" />
        Active / Ready
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-[10px] w-fit block">
        In Progress
      </span>
    );
  }
  if (status === "Interviewing") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold text-[10px] w-fit block">
        Interviewing
      </span>
    );
  }
  if (status === "Needs Remediation") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-[10px] w-fit block">
        Needs Remediation
      </span>
    );
  }
  return null;
}

export default function StudentRosterPage() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [activeStudent, setActiveStudent] = useState<StudentRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.targetRole.toLowerCase().includes(search.toLowerCase());
      const matchesDept = selectedDept === "All" || student.department === selectedDept;
      const matchesYear = selectedYear === "All" || student.year === selectedYear;
      let matchesTier = true;
      if (selectedTier === "high") matchesTier = student.readinessScore >= 80;
      else if (selectedTier === "medium") matchesTier = student.readinessScore >= 65 && student.readinessScore < 80;
      else if (selectedTier === "risk") matchesTier = student.readinessScore < 65;
      return matchesSearch && matchesDept && matchesYear && matchesTier;
    });
  }, [search, selectedDept, selectedYear, selectedTier]);

  const stats = {
    total: mockStudents.length,
    highReadiness: mockStudents.filter(s => s.readinessScore >= 80).length,
    avgCgpa: (mockStudents.reduce((acc, s) => acc + s.cgpa, 0) / mockStudents.length).toFixed(2),
    atRisk: mockStudents.filter(s => s.readinessScore < 65).length
  };

  const handleExportCSV = () => {
    const headers = "RollNo,Name,Email,Department,Year,CGPA,ReadinessScore,TargetRole,Status\n";
    const rows = filteredStudents.map(s =>
      `"${s.rollNo}","${s.name}","${s.email}","${s.department}","${s.year}",${s.cgpa},${s.readinessScore},"${s.targetRole}","${s.status}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Student_Roster_Export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    showToast("✅ Student Roster exported successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Student Roster"
          subtitle="View and manage your student profiles, track progress and skills, and take action where needed."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Toast */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Page Header with Actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Institutional Overview</span>
              </div>
              <h1 className="text-2xl font-black text-white">Student Roster</h1>
              <p className="text-sm text-slate-400 mt-0.5">View and manage your student profiles, track progress and skills, and take action where needed.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                Export Roster (CSV)
              </button>
              <button
                onClick={() => showToast("🔔 Batch remedial skill notices dispatched to at-risk students.")}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Skill Reminder
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled Students</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">{stats.total}</div>
              <p className="text-xs text-slate-400">Verified active profiles</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Ready (&gt;80%)</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">{stats.highReadiness}</div>
              <p className="text-xs text-emerald-400">{((stats.highReadiness / stats.total) * 100).toFixed(1)}% of total roster</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Institutional CGPA</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">{stats.avgCgpa}</div>
              <p className="text-xs text-slate-400">Across all branches</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">At-Risk (&lt;65% Score)</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">{stats.atRisk}</div>
              <p className="text-xs text-rose-400">Requires targeted remedial modules</p>
            </div>
          </div>

          {/* Search + Filters Row */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search student by name, roll no, email, or target role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electrical & Electronics">Electrical & Electronics</option>
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
              >
                <option value="All">All Academic Years</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
              >
                <option value="All">All Placement Tiers</option>
                <option value="high">High Readiness (&gt;80%)</option>
                <option value="medium">Moderate Readiness (65-79%)</option>
                <option value="risk">At Risk (&lt;65%)</option>
              </select>
              <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                    <th className="p-4">Student</th>
                    <th className="p-4">Department & Year</th>
                    <th className="p-4 text-center">CGPA</th>
                    <th className="p-4">Skills</th>
                    <th className="p-4">Readiness Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No student records match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-900/60 transition group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={st.avatar}
                              alt={st.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white group-hover:text-cyan-300 transition">{st.name}</div>
                              <div className="text-[11px] text-slate-400">{st.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-medium text-slate-200 text-[11px] leading-snug">{st.department}</div>
                          <div className="text-[11px] text-slate-400">{st.year}</div>
                        </td>

                        <td className="p-4 text-center">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-extrabold text-white">
                            {st.cgpa}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {st.topSkills.slice(0, 3).map((sk) => (
                              <span key={sk} className="px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30 text-[10px] font-semibold">
                                {sk}
                              </span>
                            ))}
                            {st.topSkills.length > 3 && (
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-semibold">
                                +{st.topSkills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-4 min-w-[140px]">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-black ${st.readinessScore >= 80 ? "text-emerald-400" : st.readinessScore >= 65 ? "text-amber-400" : "text-rose-400"}`}>
                              {st.readinessScore}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${st.readinessScore >= 80
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                                : st.readinessScore >= 65
                                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                                : "bg-gradient-to-r from-rose-500 to-red-400"
                              }`}
                              style={{ width: `${st.readinessScore}%` }}
                            />
                          </div>
                        </td>

                        <td className="p-4">
                          <StatusBadge status={st.status} companyPlaced={st.companyPlaced} />
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setActiveStudent(st)}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs transition flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Breakdown</span>
                            </button>
                            <button className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Student Skill Breakdown Modal */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setActiveStudent(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img src={activeStudent.avatar} alt={activeStudent.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500" />
              <div>
                <h3 className="text-lg font-black text-white">{activeStudent.name}</h3>
                <p className="text-xs text-slate-400">{activeStudent.rollNo} • {activeStudent.department}</p>
                <div className="text-xs text-cyan-400 font-bold mt-1">Target Role: {activeStudent.targetRole}</div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-400">Institutional Placement Readiness:</span>
                  <span className="text-emerald-400 text-sm font-black">{activeStudent.readinessScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-2 rounded-full" style={{ width: `${activeStudent.readinessScore}%` }} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Verified Skill Competencies:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeStudent.topSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">✓ {s}</span>
                  ))}
                </div>
              </div>

              {activeStudent.missingSkills.length > 0 && (
                <div>
                  <h4 className="font-bold text-white mb-2">Recommended Skill Remediation:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStudent.missingSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">⚠️ Missing: {s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => { showToast(`Assigned target learning module to ${activeStudent.name}`); setActiveStudent(null); }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
              >
                Assign Remedial Learning Path
              </button>
              <button
                onClick={() => setActiveStudent(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
