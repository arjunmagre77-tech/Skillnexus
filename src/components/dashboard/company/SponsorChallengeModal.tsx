"use client";
import React, { useState } from "react";
import { X, Award, PlusCircle, Building2, Calendar, DollarSign, Trophy } from "lucide-react";
import { IndustryChallenge } from "./data";

interface SponsorChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChallenge: (challenge: IndustryChallenge) => void;
}

export default function SponsorChallengeModal({
  isOpen,
  onClose,
  onAddChallenge,
}: SponsorChallengeModalProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("Cognizant");
  const [rewardAmount, setRewardAmount] = useState("$10,000");
  const [rewardType, setRewardType] = useState<"Grant" | "Prize Pool">("Grant");
  const [deadline, setDeadline] = useState("Nov 15, 2026");
  const [skillsInput, setSkillsInput] = useState("Python, LLMs, Vector DBs, System Design");
  const [description, setDescription] = useState(
    "Build a production-grade benchmark and demonstration evaluating generative AI model safety and latency."
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newChallenge: IndustryChallenge = {
      id: `chal_${Date.now()}`,
      title: title.trim(),
      company,
      companyLogoType: company.toLowerCase() === "microsoft" ? "microsoft" : company.toLowerCase() === "google" ? "google" : "cognizant",
      deadline: `Deadline: ${deadline}`,
      skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
      description: description.trim(),
      rewardAmount,
      rewardType,
      submissions: 0,
      maxSubmissions: 100,
      status: "Active",
      iconType: "code",
    };

    onAddChallenge(newChallenge);
    onClose();
    setTitle("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#091322] border border-[#172c47] rounded-3xl shadow-2xl shadow-cyan-950/40 p-6 md:p-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0e1d33] hover:bg-[#162e52] text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            <span>Industry Sponsorship Hub</span>
          </div>
          <h3 className="text-xl font-bold text-white">Sponsor New Industry Challenge</h3>
          <p className="text-xs text-slate-400">
            Provide students with hands-on company projects, grant funding, and direct hiring pipelines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Challenge Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Vector Database Indexing Challenge"
              className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Sponsoring Enterprise</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white focus:outline-none focus:border-cyan-500/60"
              >
                <option value="Cognizant">Cognizant</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Google">Google</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Nov 15, 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Grant / Prize Amount</label>
              <input
                type="text"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
                placeholder="e.g. $10,000"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Reward Category</label>
              <select
                value={rewardType}
                onChange={(e) => setRewardType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white focus:outline-none focus:border-cyan-500/60"
              >
                <option value="Grant">Grant</option>
                <option value="Prize Pool">Prize Pool</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Required Tech Stack (comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. C++, CUDA, Vector Search, HNSW"
              className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Challenge Description & Problem Statement</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 resize-none"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-[#14263f] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#0b172a] hover:bg-[#12243d] border border-slate-700/80 text-xs font-medium text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Challenge</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
