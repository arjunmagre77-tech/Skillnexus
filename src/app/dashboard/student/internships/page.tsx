"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Briefcase, Search, Filter, Sparkles, CheckCircle2, 
  MapPin, IndianRupee, Clock, ArrowRight, Check, SlidersHorizontal
} from "lucide-react";

type FilterType = "all" | "full-time" | "part-time" | "remote" | "hybrid";
type SortType = "latest" | "match" | "stipend";

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedWorkMode, setSelectedWorkMode] = useState("all");
  const [minStipend, setMinStipend] = useState(0);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const internships = [
    {
      id: "int_1",
      company: "OpenAI Labs",
      logo: "🤖",
      logoColor: "from-emerald-600 to-teal-700",
      role: "AI Systems Engineering Intern",
      stipend: "₹35,000 / mo",
      stipendValue: 35000,
      location: "Remote / San Francisco",
      workMode: "remote",
      type: "Full-Time (6 Mos)",
      matchScore: 94,
      matchingSkills: ["Python", "Next.js", "PyTorch"],
      missingSkills: ["Vector DBs"],
      postedDate: "2 days ago",
      applicantsCount: 142,
      status: "hot" as const,
      filterType: "remote" as FilterType,
    },
    {
      id: "int_2",
      company: "Stripe",
      logo: "💳",
      logoColor: "from-violet-600 to-purple-700",
      role: "Full Stack Platform Engineer Intern",
      stipend: "₹32,000 / mo",
      stipendValue: 32000,
      location: "Bengaluru, India",
      workMode: "hybrid",
      type: "Summer 2026",
      matchScore: 89,
      matchingSkills: ["React", "Node.js"],
      missingSkills: ["Kafka"],
      postedDate: "1 week ago",
      applicantsCount: 98,
      status: "new" as const,
      filterType: "hybrid" as FilterType,
    },
    {
      id: "int_3",
      company: "Databricks",
      logo: "⚡",
      logoColor: "from-amber-600 to-orange-700",
      role: "ML Infrastructure Intern",
      stipend: "₹38,000 / mo",
      stipendValue: 38000,
      location: "Remote",
      workMode: "remote",
      type: "6 Months Co-op",
      matchScore: 82,
      matchingSkills: ["Python", "PyTorch"],
      missingSkills: ["System Design"],
      postedDate: "1 week ago",
      applicantsCount: 210,
      status: "in-progress" as const,
      filterType: "remote" as FilterType,
    },
    {
      id: "int_4",
      company: "Razorpay",
      logo: "💸",
      logoColor: "from-blue-600 to-cyan-700",
      role: "Backend Systems Intern",
      stipend: "₹65,000 / mo",
      stipendValue: 65000,
      location: "Bengaluru",
      workMode: "onsite",
      type: "6 Months",
      matchScore: 91,
      matchingSkills: ["Node.js", "SQL"],
      missingSkills: ["Redis"],
      postedDate: "2 weeks ago",
      applicantsCount: 45,
      status: "in-progress" as const,
      filterType: "full-time" as FilterType,
    },
    {
      id: "int_5",
      company: "Swiggy Labs",
      logo: "🛵",
      logoColor: "from-rose-600 to-pink-700",
      role: "Data Engineering Intern",
      stipend: "₹50,000 / mo",
      stipendValue: 50000,
      location: "Bengaluru",
      workMode: "hybrid",
      type: "3 Months",
      matchScore: 78,
      matchingSkills: ["Python", "SQL"],
      missingSkills: ["Airflow"],
      postedDate: "4 days ago",
      applicantsCount: 120,
      status: "new" as const,
      filterType: "full-time" as FilterType,
    },
  ];

  const handleApply = (id: string, role: string, company: string) => {
    setAppliedIds([...appliedIds, id]);
    alert(`Application submitted to ${company} for ${role} with your Verified Skill Vector!`);
  };

  const filteredInternships = internships.filter(i => {
    const matchesSearch = i.role.toLowerCase().includes(search.toLowerCase()) || 
                          i.company.toLowerCase().includes(search.toLowerCase()) ||
                          i.matchingSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesLocation = selectedLocation === "all" || i.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesWorkMode = selectedWorkMode === "all" || i.workMode === selectedWorkMode;
    const matchesStipend = i.stipendValue >= minStipend;
    return matchesSearch && matchesLocation && matchesWorkMode && matchesStipend;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Industry Internships & Opportunities"
          subtitle="Explore verified internship roles matched with your Skill Vector."
        />

        <main className="p-6 space-y-5 overflow-y-auto">
          {/* COMPACT FILTER BAR */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 w-full lg:w-72 focus-within:border-cyan-500 transition">
                <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search role, skill, or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <select
                  value={selectedWorkMode}
                  onChange={(e) => setSelectedWorkMode(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">Work Mode: All</option>
                  <option value="remote">Remote Only</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </select>

                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">Location: All</option>
                  <option value="remote">Remote</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="san francisco">San Francisco</option>
                </select>

                <select
                  value={minStipend}
                  onChange={(e) => setMinStipend(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                >
                  <option value={0}>Min Stipend: Any</option>
                  <option value={30000}>₹30,000+/mo</option>
                  <option value={40000}>₹40,000+/mo</option>
                  <option value={50000}>₹50,000+/mo</option>
                </select>

                <button
                  onClick={() => { setSearch(""); setSelectedLocation("all"); setSelectedWorkMode("all"); setMinStipend(0); }}
                  className="text-xs text-cyan-400 hover:underline px-2 py-1 font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <div className="text-xs text-slate-400 font-semibold shrink-0">
                Found <span className="text-cyan-400 font-bold">{filteredInternships.length}</span> Opportunities
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredInternships.map((opp) => {
              const isApplied = appliedIds.includes(opp.id);

              return (
                <div 
                  key={opp.id} 
                  className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-md"
                >
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0">
                        {opp.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{opp.role}</h3>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {opp.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{opp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-bold text-emerald-400">
                        <IndianRupee className="w-3.5 h-3.5" /> {opp.stipend}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {opp.location} ({opp.workMode})
                      </span>
                      <span className="text-slate-400">{opp.applicantsCount} applicants</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {opp.matchingSkills.map((sk) => (
                        <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                          ✓ {sk}
                        </span>
                      ))}
                      {opp.missingSkills.map((sk) => (
                        <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                          Missing: {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-slate-800/80 pt-3 md:pt-0 md:pl-5 shrink-0">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Skill Vector Match</div>
                      <div className="text-xl font-black text-cyan-400">{opp.matchScore}%</div>
                    </div>

                    {isApplied ? (
                      <button disabled className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-1.5 cursor-default">
                        <Check className="w-4 h-4" />
                        <span>Applied</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(opp.id, opp.role, opp.company)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Quick Apply</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
