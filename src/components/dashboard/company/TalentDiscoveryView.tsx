"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Search, SlidersHorizontal, Building2, Star, Eye, 
  Mail, MoreHorizontal, ShieldCheck, CheckCircle2, LayoutGrid, ListFilter
} from "lucide-react";
import { Candidate } from "./data";

interface TalentDiscoveryViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onInvite: (name: string) => void;
}

export default function TalentDiscoveryView({
  candidates,
  onSelectCandidate,
  onInvite,
}: TalentDiscoveryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("ALL");
  const [selectedInstitution, setSelectedInstitution] = useState("ALL");
  const [selectedIQ, setSelectedIQ] = useState("ALL");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.college.toLowerCase().includes(q) ||
        c.targetRole.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q));

      const matchesSkill =
        selectedSkill === "ALL" || c.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase());

      const matchesInstitution =
        selectedInstitution === "ALL" || c.college.toLowerCase().includes(selectedInstitution.toLowerCase());

      const matchesIQ =
        selectedIQ === "ALL" ||
        (selectedIQ === "800+" && c.talentIQ >= 800) ||
        (selectedIQ === "750+" && c.talentIQ >= 750);

      return matchesSearch && matchesSkill && matchesInstitution && matchesIQ;
    });
  }, [candidates, searchQuery, selectedSkill, selectedInstitution, selectedIQ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
          TALENT DISCOVERY
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Find the Right Talent for Your Team
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Explore and connect with skilled candidates from top institutions and diverse backgrounds.
        </p>
      </div>

      {/* Filter Bar matching screenshot */}
      <div className="p-3 rounded-2xl bg-[#081220] border border-[#14263f] flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        {/* Search input */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 bg-[#050c18] border border-[#102036] rounded-xl px-3.5 py-2 focus-within:border-cyan-500/50 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name, college, skill (e.g. PyTorch, Vector DBs), or role..."
              className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Core Skills Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Core Skills</option>
              <option value="Python" className="bg-[#081220] text-slate-200">Python</option>
              <option value="PyTorch" className="bg-[#081220] text-slate-200">PyTorch</option>
              <option value="TypeScript" className="bg-[#081220] text-slate-200">TypeScript</option>
              <option value="React" className="bg-[#081220] text-slate-200">React</option>
              <option value="C++" className="bg-[#081220] text-slate-200">C++</option>
              <option value="Vector DBs" className="bg-[#081220] text-slate-200">Vector DBs</option>
            </select>
          </div>

          {/* Partner Institutions Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Partner Institutions</option>
              <option value="IIT Bombay" className="bg-[#081220] text-slate-200">IIT Bombay</option>
              <option value="BITS Pilani" className="bg-[#081220] text-slate-200">BITS Pilani</option>
              <option value="IIT Hyderabad" className="bg-[#081220] text-slate-200">IIT Hyderabad</option>
              <option value="NIT Trichy" className="bg-[#081220] text-slate-200">NIT Trichy</option>
              <option value="DTU Delhi" className="bg-[#081220] text-slate-200">DTU Delhi</option>
              <option value="IIT Madras" className="bg-[#081220] text-slate-200">IIT Madras</option>
            </select>
          </div>

          {/* TalentIQ Scores Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <Star className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedIQ}
              onChange={(e) => setSelectedIQ(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All TalentIQ Scores</option>
              <option value="800+" className="bg-[#081220] text-slate-200">&gt; 800 pts</option>
              <option value="750+" className="bg-[#081220] text-slate-200">&gt; 750 pts</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#14263f]">
            <span className="text-xs text-slate-400 font-medium">
              Showing {filteredCandidates.length} Candidates
            </span>
            <button className="p-2 rounded-lg bg-[#050c18] hover:bg-[#0c182b] text-slate-400 hover:text-white transition">
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6 Candidate Cards Grid (3 cols x 2 rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="p-5 rounded-3xl bg-[#081220] border border-[#14263f] hover:border-[#1e3c63] transition flex flex-col justify-between space-y-4 group shadow-lg"
          >
            <div>
              {/* Top Row: Avatar + Name + School + Match Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/40 shrink-0">
                    <Image
                      src={candidate.avatar}
                      alt={candidate.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                      {candidate.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {candidate.college} • {candidate.year}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {candidate.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {candidate.matchScore}% Match
                  </span>
                  <button className="text-slate-500 hover:text-slate-300 p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Middle Information: Target Role & TalentIQ */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Target Role:</span>
                  <span className="text-slate-200 font-semibold text-right">{candidate.targetRole}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>TalentIQ Rating:</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    {candidate.talentIQ} pts
                  </span>
                </div>
              </div>

              {/* Verified Skill Vector section */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  VERIFIED SKILL VECTOR
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#050c18] text-cyan-300 border border-[#142947] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#122036] flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectCandidate(candidate)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#050c18] hover:bg-[#0c192e] border border-[#142a47] text-slate-300 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Breakdown</span>
              </button>

              <button
                onClick={() => onInvite(candidate.name)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0c2447] hover:bg-[#13376b] border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950/20"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Invite</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
