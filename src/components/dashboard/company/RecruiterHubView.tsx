"use client";
import React from "react";
import Image from "next/image";
import { 
  Users, FileText, Star, Calendar, Briefcase, PlusCircle, 
  Search, ChevronRight, Target, Sparkles, UserCheck
} from "lucide-react";
import { Candidate, OpportunityListing } from "./data";

interface RecruiterHubViewProps {
  onNavigateTab: (tab: string, filter?: string) => void;
  onOpenPostModal: () => void;
  onSelectCandidate: (candidate: Candidate) => void;
  candidates: Candidate[];
  opportunities: OpportunityListing[];
}

export default function RecruiterHubView({
  onNavigateTab,
  onOpenPostModal,
  onSelectCandidate,
  candidates,
  opportunities,
}: RecruiterHubViewProps) {
  // Top recommended candidates from data
  const recommendedCandidates = candidates.slice(0, 3);

  // Active postings
  const activePostings = opportunities.filter((o) => o.status === "Active").slice(0, 2);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
            RECRUITER PORTAL & TALENT INTELLIGENCE
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Source Verified Talent Without Resume Spam
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Rank candidates based on proven automated coding assessment vectors & TalentIQ metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPostModal}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Post Opportunity</span>
          </button>

          <button
            onClick={() => onNavigateTab("talent-discovery")}
            className="px-4 py-2.5 rounded-full bg-[#091526] hover:bg-[#102038] border border-[#1b3252] text-slate-200 font-semibold text-xs transition flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search 3,400+ Candidates</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Postings */}
        <div 
          onClick={() => onNavigateTab("post-opportunity")}
          className="p-5 rounded-2xl bg-[#091322] border border-[#14263f] hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0b2440] border border-[#164273] flex items-center justify-center text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ACTIVE POSTINGS</div>
              <div className="text-3xl font-black text-white mt-0.5">4</div>
              <div className="text-[11px] text-slate-400">Internships & Full-Time Jobs</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition" />
        </div>

        {/* Card 2: Total Applicants */}
        <div 
          onClick={() => onNavigateTab("applicants-pipeline")}
          className="p-5 rounded-2xl bg-[#091322] border border-[#14263f] hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0c2045] border border-[#1d3d7a] flex items-center justify-center text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TOTAL APPLICANTS</div>
              <div className="text-3xl font-black text-white mt-0.5">184</div>
              <div className="text-[11px] text-slate-400">Direct applications submitted</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition" />
        </div>

        {/* Card 3: High-Match Talent */}
        <div 
          onClick={() => onNavigateTab("talent-discovery")}
          className="p-5 rounded-2xl bg-[#091322] border border-[#14263f] hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0b2742] border border-[#174e7d] flex items-center justify-center text-cyan-300">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">HIGH-MATCH TALENT</div>
              <div className="text-3xl font-black text-white mt-0.5">32</div>
              <div className="text-[11px] text-cyan-400">&gt;85% Skill Vector match</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition" />
        </div>

        {/* Card 4: Offers Extended */}
        <div 
          onClick={() => onNavigateTab("applicants-pipeline", "Offer Extended")}
          className="p-5 rounded-2xl bg-[#091322] border border-[#14263f] hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#08292e] border border-[#10525c] flex items-center justify-center text-emerald-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">OFFERS EXTENDED</div>
              <div className="text-3xl font-black text-white mt-0.5">6</div>
              <div className="text-[11px] text-emerald-400">Verified hires made</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition" />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Your Active Talent Postings (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#081220] border border-[#14263f] space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-8 h-8 rounded-lg bg-[#0c2442] flex items-center justify-center text-cyan-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">Your Active Talent Postings</h2>
          </div>

          <div className="space-y-3">
            {activePostings.map((posting) => (
              <div
                key={posting.id}
                className="p-5 rounded-2xl bg-[#050c18] border border-[#102036] hover:border-[#1a385f] transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white">{posting.role}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#0e1d33] text-slate-300 border border-[#1b3459]">
                        {posting.type}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {posting.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        {posting.candidatesCount} Candidates
                      </span>
                      <span>•</span>
                      <span>Top Match: {posting.topMatchScore}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateTab("applicants-pipeline", posting.role)}
                    className="px-4 py-2 rounded-xl bg-[#091526] hover:bg-[#102038] border border-[#1c3559] text-xs font-semibold text-slate-200 transition shrink-0 flex items-center gap-1.5 self-start sm:self-center"
                  >
                    <span>Review Candidates ({posting.candidatesCount})</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Skill Vector Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {posting.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-[#091a30] text-cyan-300 border border-[#153a69] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Recommended Candidates (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#081220] border border-[#14263f] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0b292e] flex items-center justify-center text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">AI Recommended Candidates</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Pre-screened candidates matching your AI Systems Engineering vector.
            </p>

            <div className="space-y-3 mt-4">
              {recommendedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate)}
                  className="p-3.5 rounded-2xl bg-[#050c18] border border-[#102036] hover:border-[#1a385f] transition cursor-pointer space-y-2.5 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-500/40 shrink-0">
                        <Image
                          src={candidate.avatar}
                          alt={candidate.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                          {candidate.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {candidate.college} • TalentIQ: {candidate.talentIQ}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {candidate.matchScore}% Match
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-[#0c182b] text-slate-300 border border-[#162742]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("talent-discovery")}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 mt-4"
          >
            <UserCheck className="w-4 h-4 text-slate-950" />
            <span>Search 3,400+ Verified Students</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
}
