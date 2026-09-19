"use client";
import React from "react";
import Image from "next/image";
import { X, ShieldCheck, Award, CheckCircle2, Code2, GraduationCap, Briefcase, Mail } from "lucide-react";
import { Candidate } from "./data";

interface CandidateBreakdownModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onInvite: (name: string) => void;
}

export default function CandidateBreakdownModal({
  candidate,
  onClose,
  onInvite,
}: CandidateBreakdownModalProps) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091322] border border-[#172c47] rounded-3xl shadow-2xl shadow-cyan-950/40 p-6 md:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0e1d33] hover:bg-[#162e52] text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Candidate Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#14263f]">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 shrink-0">
            <Image
              src={candidate.avatar}
              alt={candidate.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {candidate.matchScore}% Match
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              {candidate.college} • {candidate.year}
            </p>
            <p className="text-xs text-slate-400">
              Department: <span className="text-slate-200">{candidate.department}</span>
            </p>
          </div>
        </div>

        {/* Intelligence Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          <div className="p-4 rounded-2xl bg-[#060e1a] border border-[#132742]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Target Role</span>
            <p className="text-xs font-bold text-white mt-1 leading-snug">{candidate.targetRole}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#060e1a] border border-[#132742]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              TalentIQ Rating
            </span>
            <p className="text-lg font-black text-cyan-400 mt-1">{candidate.talentIQ} <span className="text-xs font-normal text-slate-400">pts</span></p>
          </div>

          <div className="p-4 rounded-2xl bg-[#060e1a] border border-[#132742] col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Assessment Score
            </span>
            <p className="text-lg font-black text-white mt-1">{candidate.assessmentScore ?? 94} <span className="text-xs font-normal text-slate-400">/ 100</span></p>
          </div>
        </div>

        {/* Verified Skill Vector Analysis */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-cyan-400" />
            Verified Skill Vector Breakdown
          </h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, idx) => (
              <div
                key={skill}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a1b33] border border-[#173966] text-xs font-medium text-cyan-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{skill}</span>
                <span className="text-[10px] text-slate-400 font-bold ml-1">{90 + (idx * 2) % 10}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proctored Coding Vectors Breakdown */}
        <div className="mt-6 p-4 rounded-2xl bg-[#060e1a] border border-[#132742] space-y-3">
          <h5 className="text-xs font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            Proctored Code Integrity & Benchmark
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Algorithmic Problem Solving</span>
              <span className="font-bold text-cyan-400">96 / 100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full w-[96%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>System Design & Architecture</span>
              <span className="font-bold text-cyan-400">92 / 100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[92%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>Code Quality & Production Readiness</span>
              <span className="font-bold text-emerald-400">95 / 100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-[95%]" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#14263f] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0b172a] hover:bg-[#12243d] border border-slate-700/80 text-xs font-medium text-slate-300 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onInvite(candidate.name);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Invite Candidate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
