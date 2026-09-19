"use client";
import React, { useState, useMemo } from "react";
import { 
  PlusCircle, Search, Building2, Laptop, ShieldCheck, Cpu, 
  MapPin, DollarSign, Calendar, Users, Info, Trash2, ChevronRight, ListFilter
} from "lucide-react";
import { OpportunityListing } from "./data";

interface PostOpportunityViewProps {
  opportunities: OpportunityListing[];
  onOpenPostModal: () => void;
  onNavigateTab: (tab: string, filter?: string) => void;
  onDeleteOpportunity?: (id: string) => void;
}

export default function PostOpportunityView({
  opportunities,
  onOpenPostModal,
  onNavigateTab,
  onDeleteOpportunity,
}: PostOpportunityViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        opp.role.toLowerCase().includes(q) ||
        opp.skills.some((s) => s.toLowerCase().includes(q));

      const matchesType = selectedType === "ALL" || opp.type === selectedType;
      const matchesStatus = selectedStatus === "ALL" || opp.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [opportunities, searchQuery, selectedType, selectedStatus]);

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "building":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#0b2440] border border-[#164273] flex items-center justify-center text-cyan-400 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
        );
      case "laptop":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#1b193d] border border-[#2d2a63] flex items-center justify-center text-indigo-400 shrink-0">
            <Laptop className="w-6 h-6" />
          </div>
        );
      case "shield":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#0b2b2b] border border-[#145252] flex items-center justify-center text-teal-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        );
      case "chip":
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#20183b] border border-[#3b2b69] flex items-center justify-center text-purple-400 shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
            OPPORTUNITY LISTINGS
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Manage Talent Recruitment Pipelines
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Track applicant numbers, skill vector matches, and listing statuses.
          </p>
        </div>

        <button
          onClick={onOpenPostModal}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 self-start sm:self-center shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* Filter Bar matching screenshot */}
      <div className="p-3 rounded-2xl bg-[#081220] border border-[#14263f] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 bg-[#050c18] border border-[#102036] rounded-xl px-3.5 py-2 focus-within:border-cyan-500/50 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search postings by role title or required skill..."
              className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Types</option>
              <option value="Internship" className="bg-[#081220] text-slate-200">Internship</option>
              <option value="Full-Time Job" className="bg-[#081220] text-slate-200">Full-Time Job</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Statuses</option>
              <option value="Active" className="bg-[#081220] text-slate-200">Active</option>
              <option value="Paused" className="bg-[#081220] text-slate-200">Paused</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#14263f]">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Showing {filteredOpportunities.length} Listings
            </span>
            <button className="p-2 rounded-lg bg-[#050c18] hover:bg-[#0c182b] text-slate-400 hover:text-white transition">
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Opportunity Listings List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-5 rounded-3xl bg-[#081220] border border-[#14263f] hover:border-[#1c3961] transition flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-lg group"
          >
            {/* Left side info */}
            <div className="flex items-start gap-4">
              {renderIcon(opp.iconType)}

              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                    {opp.role}
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-[#0c1a2e] text-slate-300 border border-[#173359]">
                    {opp.type}
                  </span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                      opp.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {opp.status}
                  </span>
                </div>

                {/* Metadata Line */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-slate-300">{opp.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span className="text-slate-300">{opp.salary}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{opp.postedDate}</span>
                  </span>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.skills.map((skill) => (
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

            {/* Right side candidates & actions */}
            <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#14263f]">
              <div className="text-left lg:text-right">
                <div className="text-2xl font-black text-white">{opp.candidatesCount}</div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Candidates ({opp.highMatchCount} High-Match)
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateTab("applicants-pipeline", opp.role)}
                  className="px-4 py-2 rounded-xl bg-[#0c2345] hover:bg-[#12366b] border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-cyan-950/20"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Review Pipeline</span>
                </button>

                <button
                  title="Listing Information"
                  className="p-2 rounded-xl bg-[#050c18] hover:bg-[#0c182b] border border-[#14263f] text-slate-400 hover:text-white transition"
                >
                  <Info className="w-4 h-4 text-amber-400" />
                </button>

                {onDeleteOpportunity && (
                  <button
                    onClick={() => onDeleteOpportunity(opp.id)}
                    title="Delete Opportunity"
                    className="p-2 rounded-xl bg-[#050c18] hover:bg-rose-950/30 border border-[#14263f] text-slate-400 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
