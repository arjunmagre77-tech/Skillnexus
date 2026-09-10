"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Briefcase, Search, Filter, Sparkles, CheckCircle2, 
  MapPin, DollarSign, Clock, ArrowRight, Building2, Check
} from "lucide-react";

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const internships = [
    {
      id: "int_1",
      company: "OpenAI Labs",
      logo: "🤖",
      role: "AI Systems Engineering Intern",
      stipend: "$3,500 / mo",
      location: "Remote / San Francisco",
      type: "Full-Time Internship (6 Mos)",
      matchScore: 94,
      matchingSkills: ["Python", "Next.js", "PyTorch"],
      missingSkills: ["Vector DBs"],
      postedDate: "2 days ago",
      applicantsCount: 142,
    },
    {
      id: "int_2",
      company: "Stripe",
      logo: "💳",
      role: "Full Stack Platform Engineer Intern",
      stipend: "$3,200 / mo",
      location: "Bengaluru, India (Hybrid)",
      type: "Summer 2026",
      matchScore: 89,
      matchingSkills: ["TypeScript", "Next.js", "System Design"],
      missingSkills: ["Kafka"],
      postedDate: "3 days ago",
      applicantsCount: 98,
    },
    {
      id: "int_3",
      company: "Databricks",
      logo: "⚡",
      role: "ML Infrastructure Intern",
      stipend: "$3,800 / mo",
      location: "Remote",
      type: "6 Months Co-op",
      matchScore: 82,
      matchingSkills: ["Python", "PyTorch"],
      missingSkills: ["Distributed Systems"],
      postedDate: "1 week ago",
      applicantsCount: 210,
    },
    {
      id: "int_4",
      company: "Razorpay",
      logo: "💸",
      role: "Backend Systems Intern",
      stipend: "₹65,000 / mo",
      location: "Bengaluru",
      type: "6 Months",
      matchScore: 91,
      matchingSkills: ["Node.js", "TypeScript", "SQL"],
      missingSkills: ["Redis"],
      postedDate: "Just now",
      applicantsCount: 45,
    },
    {
      id: "int_5",
      company: "Swiggy Labs",
      logo: "🛵",
      role: "Data Engineering Intern",
      stipend: "₹50,000 / mo",
      location: "Bengaluru",
      type: "3 Months",
      matchScore: 78,
      matchingSkills: ["Python", "SQL"],
      missingSkills: ["Spark", "Airflow"],
      postedDate: "4 days ago",
      applicantsCount: 120,
    }
  ];

  const handleApply = (id: string, role: string, company: string) => {
    setAppliedIds([...appliedIds, id]);
    alert(`Application submitted to ${company} for ${role} with your Verified Skill Vector!`);
  };

  const filteredInternships = internships.filter(i => 
    (i.role.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase())) &&
    (selectedLocation === "all" || i.location.toLowerCase().includes(selectedLocation.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Skill-Matched Internship Marketplace" 
          subtitle="Explore verified industry internships ranked by AI compatibility vector."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 w-full md:w-96 focus-within:border-cyan-500 transition">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by role, skill or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote Only</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="san francisco">San Francisco</option>
              </select>

              <div className="text-xs text-slate-400 font-semibold px-3 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {filteredInternships.length} Available
              </div>
            </div>
          </div>

          {/* Internships List */}
          <div className="space-y-4">
            {filteredInternships.map((opp) => {
              const isApplied = appliedIds.includes(opp.id);

              return (
                <div 
                  key={opp.id} 
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0">
                        {opp.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-lg">{opp.role}</h3>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {opp.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{opp.company} • Posted {opp.postedDate}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" /> {opp.stipend}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {opp.location}
                      </span>
                      <span className="text-slate-400">{opp.applicantsCount} applicants</span>
                    </div>

                    {/* Skill Match Breakdown */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {opp.matchingSkills.map((sk) => (
                        <span key={sk} className="text-[10px] px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                          ✓ {sk}
                        </span>
                      ))}
                      {opp.missingSkills.map((sk) => (
                        <span key={sk} className="text-[10px] px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                          Missing: {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Match Score & Action */}
                  <div className="flex flex-col md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                    <div className="text-left md:text-right">
                      <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">AI Skill Match</div>
                      <div className="text-2xl font-black text-cyan-400">{opp.matchScore}%</div>
                    </div>

                    {isApplied ? (
                      <button disabled className="px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-2 cursor-default">
                        <Check className="w-4 h-4" />
                        <span>Applied</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(opp.id, opp.role, opp.company)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Apply with Skill Vector</span>
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
