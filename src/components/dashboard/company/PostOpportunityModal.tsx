"use client";
import React, { useState } from "react";
import { X, PlusCircle, Building2, MapPin, DollarSign, Calendar, Sparkles } from "lucide-react";
import { OpportunityListing } from "./data";

interface PostOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (opportunity: OpportunityListing) => void;
}

export default function PostOpportunityModal({
  isOpen,
  onClose,
  onAddOpportunity,
}: PostOpportunityModalProps) {
  const [role, setRole] = useState("");
  const [type, setType] = useState<"Internship" | "Full-Time Job">("Internship");
  const [location, setLocation] = useState("San Francisco, CA (Hybrid)");
  const [salary, setSalary] = useState("$5,000 / month");
  const [skillsInput, setSkillsInput] = useState("Python, PyTorch, Next.js, Vector DBs");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;

    const newListing: OpportunityListing = {
      id: `opp_${Date.now()}`,
      role: role.trim(),
      type,
      status: "Active",
      location,
      salary,
      postedDate: `Posted Sep ${new Date().getDate()}, 2026`,
      skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
      candidatesCount: 0,
      highMatchCount: 0,
      topMatchScore: "95%",
      iconType: type === "Internship" ? "building" : "laptop",
    };

    onAddOpportunity(newListing);
    onClose();
    setRole("");
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
            <PlusCircle className="w-4 h-4" />
            <span>Recruiter Opportunity Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white">Post New Talent Opportunity</h3>
          <p className="text-xs text-slate-400">
            Publish verified roles to match directly with top university student skill vectors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Role Title</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. AI Systems Engineering Intern"
              className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Employment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white focus:outline-none focus:border-cyan-500/60"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time Job">Full-Time Job</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA (Hybrid)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Compensation</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. $4,500 / month or $140,000 / year"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Skill Vector Tags</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Comma-separated skills"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e1a] border border-[#132742] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
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
              <span>Publish Opportunity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
