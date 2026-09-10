"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, User, Building2, GraduationCap, Users, ArrowRight, ArrowLeft, 
  CheckCircle, Lock, Mail, ShieldCheck, Sparkles, Building, Briefcase 
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"STUDENT" | "COLLEGE" | "COMPANY" | "MENTOR">("STUDENT");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    department: "",
    year: "3rd Year",
    companyName: "",
    industry: "",
    mentorExpertise: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: "STUDENT",
      title: "Student / Learner",
      desc: "Discover skill gaps, get AI learning roadmaps, build projects, & land internships.",
      icon: GraduationCap,
      badge: "Most Popular",
      color: "from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-500/30 text-cyan-400"
    },
    {
      id: "COLLEGE",
      title: "College / University",
      desc: "Track curriculum alignment, map institutional skill matrix, and boost placements.",
      icon: Building2,
      badge: "Institutional",
      color: "from-indigo-500/20 via-purple-500/10 to-transparent border-indigo-500/30 text-indigo-400"
    },
    {
      id: "COMPANY",
      title: "Company / Recruiter",
      desc: "Source pre-verified skill talent, run industry projects, and hire faster.",
      icon: Building,
      badge: "Enterprise",
      color: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-400"
    },
    {
      id: "MENTOR",
      title: "Industry Mentor",
      desc: "Guide ambitious students, conduct mock reviews, and share real-world expertise.",
      icon: Users,
      badge: "Expert",
      color: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || !formData.name) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to register account.");
        setLoading(false);
        return;
      }

      // Success redirect to login or dashboard
      router.push(`/login?registered=true&email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <span className="font-bold text-xl text-white tracking-tight">SkillNexus</span>
        </Link>
        <div className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full px-6 py-8 z-10">
        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 text-sm font-semibold ${step === 1 ? "text-cyan-400" : "text-slate-500"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>1</span>
            Select Role
          </div>
          <div className="w-12 h-0.5 bg-slate-800" />
          <div className={`flex items-center gap-2 text-sm font-semibold ${step === 2 ? "text-cyan-400" : "text-slate-500"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>2</span>
            Account Details
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Join SkillNexus Platform</h2>
              <p className="text-sm text-slate-400 mt-2">
                Choose your profile role to personalize your skill intelligence dashboard and experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setRole(r.id as any)}
                    className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-slate-900/80 backdrop-blur-md ${
                      isSelected
                        ? "border-cyan-400 shadow-xl shadow-cyan-500/10 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 scale-[1.01]"
                        : "border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    {r.badge && (
                      <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {r.badge}
                      </span>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${r.color} border`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 pr-12">
                        <h3 className="font-bold text-lg text-white flex items-center gap-2">
                          {r.title}
                          {isSelected && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-sm hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Continue as {role}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Account Details Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Create Your {role} Account</h2>
                <p className="text-xs text-slate-400">Step 2 of 2 — Account Credentials</p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name / Org Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@institution.edu / company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Role Fields */}
              {role === "STUDENT" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / Institution</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department / Major</label>
                    <input
                      type="text"
                      placeholder="Computer Science"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {role === "COMPANY" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Industry Sector</label>
                  <input
                    type="text"
                    placeholder="Artificial Intelligence / Software / FinTech"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              )}

              {role === "MENTOR" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Domain Expertise</label>
                  <input
                    type="text"
                    placeholder="Full Stack Architecture, Machine Learning, DevOps"
                    value={formData.mentorExpertise}
                    onChange={(e) => setFormData({ ...formData, mentorExpertise: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-slate-950 font-extrabold text-sm hover:opacity-90 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Create Account & Launch Skill Nexus</span>
                </>
              )}
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 border-t border-slate-900 z-10">
        © 2026 SkillNexus Platform Inc. All rights reserved. Powered by AI Skill Intelligence Engine.
      </footer>
    </div>
  );
}
