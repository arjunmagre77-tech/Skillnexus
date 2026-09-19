"use client";
import React, { useState, useMemo } from "react";
import { 
  Trophy, PlusCircle, Search, Code2, Cpu, Cloud, 
  Calendar, Eye, ChevronRight, ListFilter, CheckCircle2, X
} from "lucide-react";
import CompanyLogo from "./CompanyLogo";
import { IndustryChallenge } from "./data";

interface IndustryProjectsViewProps {
  challenges: IndustryChallenge[];
  onOpenSponsorModal: () => void;
}

export default function IndustryProjectsView({
  challenges,
  onOpenSponsorModal,
}: IndustryProjectsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [activeDetailsModal, setActiveDetailsModal] = useState<IndustryChallenge | null>(null);
  const [appliedModal, setAppliedModal] = useState<IndustryChallenge | null>(null);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((chal) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        chal.title.toLowerCase().includes(q) ||
        chal.company.toLowerCase().includes(q) ||
        chal.skills.some((s) => s.toLowerCase().includes(q));

      const matchesDomain =
        selectedDomain === "ALL" || chal.skills.some((s) => s.toLowerCase().includes(selectedDomain.toLowerCase()));

      const matchesStatus = selectedStatus === "ALL" || chal.status === selectedStatus;

      return matchesSearch && matchesDomain && matchesStatus;
    });
  }, [challenges, searchQuery, selectedDomain, selectedStatus]);

  const renderIconBox = (iconType: string) => {
    if (iconType === "code") {
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#1b173b] border border-[#2d2663] flex items-center justify-center text-indigo-400 shrink-0">
          <Code2 className="w-6 h-6" />
        </div>
      );
    }
    if (iconType === "chip") {
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#26153b] border border-[#44236b] flex items-center justify-center text-purple-400 shrink-0">
          <Cpu className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-[#092925] border border-[#135249] flex items-center justify-center text-teal-400 shrink-0">
        <Cloud className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>INDUSTRY PROJECTS</span>
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Company Sponsored Industry Challenges
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
            Work on real-world problems, build your skills, and make an impact. Explore industry-backed projects from top companies and put your knowledge to the test.
          </p>
        </div>

        <button
          onClick={onOpenSponsorModal}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>Sponsor New Challenge</span>
        </button>
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
              placeholder="Search by domain, title, or tech stack..."
              className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#050c18] border border-[#102036] rounded-xl px-3 py-2 text-xs text-slate-300">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL" className="bg-[#081220] text-slate-200">All Domains</option>
              <option value="Vector" className="bg-[#081220] text-slate-200">Vector Search / DBs</option>
              <option value="LLM" className="bg-[#081220] text-slate-200">Agentic AI & LLMs</option>
              <option value="ZK" className="bg-[#081220] text-slate-200">Cryptography & ZK</option>
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
              <option value="Judging" className="bg-[#081220] text-slate-200">Judging</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#14263f]">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Showing {filteredChallenges.length} Projects
            </span>
            <button className="p-2 rounded-lg bg-[#050c18] hover:bg-[#0c182b] text-slate-400 hover:text-white transition">
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {filteredChallenges.map((chal) => {
          const progressPercent = Math.round((chal.submissions / chal.maxSubmissions) * 100);

          return (
            <div
              key={chal.id}
              className="p-6 rounded-3xl bg-[#081220] border border-[#14263f] hover:border-[#1c3a63] transition flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6 shadow-xl group"
            >
              {/* Left Section: Icon + Title + Meta + Description */}
              <div className="flex items-start gap-4 flex-1">
                {renderIconBox(chal.iconType)}

                <div className="space-y-2 flex-1">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                    {chal.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <CompanyLogo type={chal.companyLogoType} className="w-4 h-4 shrink-0" />
                      <span>{chal.company}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{chal.deadline}</span>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {chal.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#050c18] text-cyan-300 border border-[#142947] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed pt-1">
                    {chal.description}
                  </p>

                  <div className="pt-1">
                    <button
                      onClick={() => setActiveDetailsModal(chal)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#050c18] hover:bg-[#0c182b] border border-[#14263f] text-slate-300 hover:text-white text-xs font-semibold transition inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section: Company + Status + Reward + Progress + Action */}
              <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end justify-between xl:justify-center gap-4 pt-4 xl:pt-0 border-t xl:border-t-0 border-[#14263f] shrink-0 min-w-[220px]">
                {/* Company & Status */}
                <div className="flex items-center gap-2">
                  <CompanyLogo type={chal.companyLogoType} className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold text-white">{chal.company}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 ${
                      chal.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        chal.status === "Active" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    <span>{chal.status}</span>
                  </span>
                </div>

                {/* Reward and Progress */}
                <div className="flex items-center gap-6 xl:text-right">
                  <div>
                    <div className="text-lg font-black text-white">{chal.rewardAmount}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{chal.rewardType}</div>
                  </div>

                  <div className="min-w-[100px]">
                    <div className="text-xs font-bold text-white">
                      {chal.submissions}/{chal.maxSubmissions}
                    </div>
                    <div className="text-[10px] text-slate-400">Submissions</div>
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action button */}
                {chal.status === "Active" ? (
                  <button
                    onClick={() => setAppliedModal(chal)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveDetailsModal(chal)}
                    className="px-5 py-2.5 rounded-full bg-[#050c18] hover:bg-[#0c182b] border border-[#172c47] text-slate-200 hover:text-white font-semibold text-xs transition flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Status</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {activeDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#091322] border border-[#172c47] rounded-3xl shadow-2xl p-6 md:p-8 text-slate-100">
            <button
              onClick={() => setActiveDetailsModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#0e1d33] hover:bg-[#162e52] text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4" />
              <span>Challenge Overview</span>
            </div>

            <h3 className="text-xl font-bold text-white">{activeDetailsModal.title}</h3>

            <div className="flex items-center gap-3 my-3 text-xs text-slate-400">
              <span className="text-white font-semibold flex items-center gap-1">
                <CompanyLogo type={activeDetailsModal.companyLogoType} className="w-4 h-4" />
                {activeDetailsModal.company}
              </span>
              <span>•</span>
              <span>{activeDetailsModal.deadline}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{activeDetailsModal.rewardAmount} {activeDetailsModal.rewardType}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#060e1a] border border-[#132742] my-4 text-xs text-slate-300 leading-relaxed space-y-2">
              <p className="font-semibold text-white">Problem Statement & Scope:</p>
              <p>{activeDetailsModal.description}</p>
              <p className="pt-2 font-semibold text-white">Deliverables:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Production-grade source repository with automated benchmark tests.</li>
                <li>Documentation explaining vector throughput, p99 latency, and memory footprint.</li>
                <li>Docker container setup for reproducible validation.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeDetailsModal.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-[#0c1e36] text-cyan-300 text-xs font-medium border border-cyan-500/30">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#14263f] flex items-center justify-end">
              <button
                onClick={() => setActiveDetailsModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0b172a] hover:bg-[#12243d] border border-slate-700/80 text-xs font-medium text-slate-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applied Confirmation Modal */}
      {appliedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#091322] border border-[#172c47] rounded-3xl shadow-2xl p-6 text-center text-slate-100">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">Application Started!</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              You are applying for <span className="text-cyan-400 font-semibold">{appliedModal.title}</span> sponsored by {appliedModal.company}.
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Your verified skill vectors and test sandbox will be initialized.
            </p>

            <button
              onClick={() => setAppliedModal(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
            >
              Continue to Project Sandbox
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
