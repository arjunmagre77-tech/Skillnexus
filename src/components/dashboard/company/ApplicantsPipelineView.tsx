"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Users, FileText, Code2, MessageSquare, Star, Search, 
  Eye, MoreVertical, Briefcase, Calendar, CheckCircle2, ChevronDown, ListFilter
} from "lucide-react";
import { Candidate } from "./data";

interface ApplicantsPipelineViewProps {
  candidates: Candidate[];
  initialRoleFilter?: string;
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateStage: (candidateId: string, newStage: Candidate["recruitmentStage"]) => void;
}

export default function ApplicantsPipelineView({
  candidates,
  initialRoleFilter = "ALL",
  onSelectCandidate,
  onUpdateStage,
}: ApplicantsPipelineViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(initialRoleFilter);
  const [selectedStage, setSelectedStage] = useState("ALL");

  // Calculate stats dynamically
  const totalCount = candidates.length;
  const underReviewCount = candidates.filter((c) => c.recruitmentStage === "Under Review").length;
  const inAssessmentCount = candidates.filter((c) => c.recruitmentStage === "In Assessment").length;
  const interviewingCount = candidates.filter((c) => c.recruitmentStage === "Interviewing").length;
  const offerExtendedCount = candidates.filter((c) => c.recruitmentStage === "Offer Extended").length;

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.college.toLowerCase().includes(q) ||
        (c.appliedOpportunity && c.appliedOpportunity.toLowerCase().includes(q));

      const matchesOpp =
        selectedOpportunity === "ALL" ||
        (c.appliedOpportunity && c.appliedOpportunity.toLowerCase().includes(selectedOpportunity.toLowerCase()));

      const matchesStage = selectedStage === "ALL" || c.recruitmentStage === selectedStage;

      return matchesSearch && matchesOpp && matchesStage;
    });
  }, [candidates, searchQuery, selectedOpportunity, selectedStage]);

  const renderStageBadge = (stage: Candidate["recruitmentStage"], candidateId: string) => {
    let style = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    let dotColor = "bg-cyan-400";

    if (stage === "Offer Extended" || stage === "Hired") {
      style = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      dotColor = "bg-emerald-400";
    } else if (stage === "In Assessment") {
      style = "bg-purple-500/10 text-purple-300 border-purple-500/30";
      dotColor = "bg-purple-400";
    } else if (stage === "Under Review") {
      style = "bg-amber-500/10 text-amber-400 border-amber-500/30";
      dotColor = "bg-amber-400";
    }

    return (
      <div className="relative inline-block">
        <select
          value={stage}
          onChange={(e) => onUpdateStage(candidateId, e.target.value as any)}
          className={`appearance-none pl-6 pr-6 py-1.5 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none transition ${style}`}
        >
          <option value="Under Review" className="bg-[#081220] text-amber-400">Under Review</option>
          <option value="In Assessment" className="bg-[#081220] text-purple-300">In Assessment</option>
          <option value="Interviewing" className="bg-[#081220] text-cyan-400">Interviewing</option>
          <option value="Offer Extended" className="bg-[#081220] text-emerald-400">Offer Extended</option>
          <option value="Hired" className="bg-[#081220] text-emerald-400">Hired</option>
          <option value="Rejected" className="bg-[#081220] text-rose-400">Rejected</option>
        </select>
        <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${dotColor} pointer-events-none`} />
        <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-80" />
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
          APPLICANTS PIPELINE
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Track & Manage Your Applicants
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          View, review and take action on candidates for your opportunities.
        </p>
      </div>

      {/* 5 Stage Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: All Applicants */}
        <div
          onClick={() => setSelectedStage("ALL")}
          className={`p-4 rounded-2xl bg-[#081220] border transition cursor-pointer ${
            selectedStage === "ALL" ? "border-cyan-500/60 shadow-lg shadow-cyan-950/30" : "border-[#14263f] hover:border-[#1e3961]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b2440] border border-[#164273] flex items-center justify-center text-cyan-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ALL APPLICANTS</div>
              <div className="text-2xl font-black text-white">{totalCount}</div>
              <div className="text-[10px] text-slate-400">Total applicants</div>
            </div>
          </div>
        </div>

        {/* Card 2: Under Review */}
        <div
          onClick={() => setSelectedStage("Under Review")}
          className={`p-4 rounded-2xl bg-[#081220] border transition cursor-pointer ${
            selectedStage === "Under Review" ? "border-amber-500/60 shadow-lg shadow-amber-950/30" : "border-[#14263f] hover:border-[#1e3961]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2e230a] border border-[#523e12] flex items-center justify-center text-amber-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">UNDER REVIEW</div>
              <div className="text-2xl font-black text-white">{underReviewCount}</div>
              <div className="text-[10px] text-slate-400">Needs your attention</div>
            </div>
          </div>
        </div>

        {/* Card 3: Code Assessment */}
        <div
          onClick={() => setSelectedStage("In Assessment")}
          className={`p-4 rounded-2xl bg-[#081220] border transition cursor-pointer ${
            selectedStage === "In Assessment" ? "border-purple-500/60 shadow-lg shadow-purple-950/30" : "border-[#14263f] hover:border-[#1e3961]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#201538] border border-[#3c246b] flex items-center justify-center text-purple-300 shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">CODE ASSESSMENT</div>
              <div className="text-2xl font-black text-white">{inAssessmentCount}</div>
              <div className="text-[10px] text-slate-400">In progress</div>
            </div>
          </div>
        </div>

        {/* Card 4: Interviewing */}
        <div
          onClick={() => setSelectedStage("Interviewing")}
          className={`p-4 rounded-2xl bg-[#081220] border transition cursor-pointer ${
            selectedStage === "Interviewing" ? "border-cyan-500/60 shadow-lg shadow-cyan-950/30" : "border-[#14263f] hover:border-[#1e3961]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a262e] border border-[#134957] flex items-center justify-center text-teal-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">INTERVIEWING</div>
              <div className="text-2xl font-black text-white">{interviewingCount}</div>
              <div className="text-[10px] text-slate-400">In interviews</div>
            </div>
          </div>
        </div>

        {/* Card 5: Offers Extended */}
        <div
          onClick={() => setSelectedStage("Offer Extended")}
          className={`p-4 rounded-2xl bg-[#081220] border transition cursor-pointer col-span-2 sm:col-span-1 ${
            selectedStage === "Offer Extended" ? "border-emerald-500/60 shadow-lg shadow-emerald-950/30" : "border-[#14263f] hover:border-[#1e3961]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#09291b] border border-[#125235] flex items-center justify-center text-emerald-400 shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">OFFERS EXTENDED</div>
              <div className="text-2xl font-black text-white">{offerExtendedCount}</div>
              <div className="text-[10px] text-slate-400">Offers sent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3 rounded-2xl bg-[#081220] border border-[#14263f] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 bg-[#050c18] border border-[#102036] rounded-xl px-3.5 py-2 focus-within:border-cyan-500/50 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicant name, email, or institution..."
              className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <select
              value={selectedOpportunity}
              onChange={(e) => setSelectedOpportunity(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Applied Opportunities</option>
              <option value="AI Systems Engineering Intern" className="bg-[#081220] text-slate-200">AI Systems Engineering Intern</option>
              <option value="Full Stack Engineer (New Grad 2026)" className="bg-[#081220] text-slate-200">Full Stack Engineer (New Grad 2026)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Stages</option>
              <option value="Under Review" className="bg-[#081220] text-slate-200">Under Review</option>
              <option value="In Assessment" className="bg-[#081220] text-slate-200">In Assessment</option>
              <option value="Interviewing" className="bg-[#081220] text-slate-200">Interviewing</option>
              <option value="Offer Extended" className="bg-[#081220] text-slate-200">Offer Extended</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#14263f]">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Showing {filteredCandidates.length} Applicants
            </span>
            <button className="p-2 rounded-lg bg-[#050c18] hover:bg-[#0c182b] text-slate-400 hover:text-white transition">
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-3xl bg-[#081220] border border-[#14263f] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#14263f] text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-[#050c18]">
                <th className="py-3.5 px-6">APPLICANT</th>
                <th className="py-3.5 px-6">OPPORTUNITY APPLIED</th>
                <th className="py-3.5 px-6">VECTOR MATCH %</th>
                <th className="py-3.5 px-6">ASSESSMENT SCORE</th>
                <th className="py-3.5 px-6">RECRUITMENT STAGE</th>
                <th className="py-3.5 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102036] text-xs">
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="hover:bg-[#0c1a2e]/60 transition group"
                >
                  {/* APPLICANT */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-500/40 shrink-0">
                        <Image
                          src={candidate.avatar}
                          alt={candidate.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-cyan-300 transition text-sm">
                          {candidate.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{candidate.email}</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {candidate.college} • {candidate.year}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* OPPORTUNITY APPLIED */}
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-white font-semibold">
                        <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{candidate.appliedOpportunity}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>Applied {candidate.appliedDate}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {candidate.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] px-2 py-0.5 rounded-md bg-[#050c18] text-cyan-300 border border-[#142947]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* VECTOR MATCH % */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {candidate.matchScore}%
                    </span>
                  </td>

                  {/* ASSESSMENT SCORE */}
                  <td className="py-4 px-6">
                    <span className="font-bold text-white text-sm">
                      {candidate.assessmentScore}
                    </span>
                    <span className="text-slate-400 text-xs">/100</span>
                  </td>

                  {/* RECRUITMENT STAGE */}
                  <td className="py-4 px-6">
                    {renderStageBadge(candidate.recruitmentStage, candidate.id)}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelectCandidate(candidate)}
                        className="px-3 py-1.5 rounded-xl bg-[#050c18] hover:bg-[#0c182b] border border-[#14263f] text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View Profile</span>
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-[#0c182b] transition">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
