"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, Building2, Building, Users, ArrowRight, ArrowLeft, 
  Check, CheckCircle2, Lock, Mail, User, Eye, EyeOff, Sparkles, Zap, 
  TrendingUp, Target, Award, Home, LayoutGrid, Info, MessageSquare
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<"STUDENT" | "COLLEGE" | "COMPANY" | "MENTOR">("STUDENT");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    department: "",
    companyName: "",
    industry: "",
    mentorExpertise: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    {
      id: "STUDENT",
      title: "Student / Learner",
      badge: "MOST POPULAR",
      desc: "Discover skill gaps, get AI learning roadmaps, build projects, and track your internships.",
      icon: GraduationCap,
      color: "cyan",
      boxGlow: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
      activeCardStyle: "border-cyan-500 shadow-lg shadow-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-[#0a1226] to-[#0a1226]",
      arrowBg: "bg-cyan-500/20 text-cyan-400"
    },
    {
      id: "COLLEGE",
      title: "College / University",
      badge: null,
      desc: "Track curriculum alignment, map institutional skill matrices, and boost placements.",
      icon: Building2,
      color: "purple",
      boxGlow: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      activeCardStyle: "border-purple-500 shadow-lg shadow-purple-500/20 bg-gradient-to-r from-purple-950/40 via-[#0a1226] to-[#0a1226]",
      arrowBg: "bg-purple-500/20 text-purple-400"
    },
    {
      id: "COMPANY",
      title: "Company / Recruiter",
      badge: null,
      desc: "Source pre-verified skill talent, run industry projects, and hire faster.",
      icon: Building,
      color: "emerald",
      boxGlow: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      activeCardStyle: "border-emerald-500 shadow-lg shadow-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-[#0a1226] to-[#0a1226]",
      arrowBg: "bg-emerald-500/20 text-emerald-400"
    },
    {
      id: "MENTOR",
      title: "Industry Mentor",
      badge: null,
      desc: "Guide ambitious students, conduct mock reviews, and share real-world expertise.",
      icon: Users,
      color: "amber",
      boxGlow: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      activeCardStyle: "border-amber-500 shadow-lg shadow-amber-500/20 bg-gradient-to-r from-amber-950/40 via-[#0a1226] to-[#0a1226]",
      arrowBg: "bg-amber-500/20 text-amber-400"
    }
  ];

  const roleSummaryFeatures = [
    {
      id: "STUDENT",
      title: "Personalized Learning",
      desc: "Get AI-powered roadmaps, build projects, and track your progress.",
      icon: GraduationCap,
      color: "cyan"
    },
    {
      id: "COLLEGE",
      title: "College & University",
      desc: "Track curriculum alignment, map institutional skill matrices, and boost placements.",
      icon: Building2,
      color: "purple"
    },
    {
      id: "COMPANY",
      title: "Company / Recruiter",
      desc: "Source pre-verified skill talent, run industry projects, and hire faster.",
      icon: Building,
      color: "emerald"
    },
    {
      id: "MENTOR",
      title: "Industry Mentor",
      desc: "Guide ambitious students, conduct mock reviews, and share real-world expertise.",
      icon: Users,
      color: "amber"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
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

      router.push(`/login?registered=true&email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <header className="px-6 py-4 max-w-7xl mx-auto w-full flex items-center justify-between z-20 border-b border-slate-800/60 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
            Skill<span className="text-cyan-400">Link</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:inline">Already have an account?</span>
          <Link
            href="/login"
            className="px-4 py-2 rounded-full border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-semibold text-xs transition flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* STEP 1: Select Role UI */}
      {step === 1 && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 z-10 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Menu */}
            <div className="lg:col-span-2 hidden lg:flex flex-col gap-6 pt-4 border-r border-slate-800/80 pr-6 min-h-[500px]">
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold text-xs shadow-md shadow-cyan-500/10"
                >
                  <Home className="w-4 h-4 text-cyan-400" />
                  <span>Home</span>
                </Link>
                <a
                  href="#features"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/60 font-semibold text-xs transition"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Features</span>
                </a>
                <a
                  href="#about"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/60 font-semibold text-xs transition"
                >
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/60 font-semibold text-xs transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </div>

              {/* Left Sidebar Doodle Annotations */}
              <div className="mt-auto pt-6 space-y-6">
                <div className="relative transform -rotate-6">
                  <span className="font-doodle text-xl text-cyan-300 tracking-wide font-bold leading-tight block">
                    Learn<br />Grow<br />Achieve
                  </span>
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-1" />
                </div>

                <div className="relative">
                  <div className="flex items-start gap-2 text-slate-400">
                    <svg className="w-5 h-5 text-cyan-400 shrink-0 transform rotate-45 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      The right skills create brighter opportunities.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Role Selector */}
            <div className="lg:col-span-6 space-y-6">
              {/* Top Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
                <span className="text-amber-400">⭐</span>
                <span>Your Skills · Our Platform · A Better Tomorrow</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Join <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">SkillLink</span> Platform
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  Choose your profile role to personalize your skill intelligence dashboard and experience.
                </p>
              </div>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Personalized Learning Paths</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300">
                  <Target className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI-Powered Recommendations</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track Progress & Get Certified</span>
                </div>
              </div>

              {/* 2x2 Grid of Role Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {roleOptions.map((r) => {
                  const Icon = r.icon;
                  const isSelected = role === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setRole(r.id as any)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? r.activeCardStyle
                          : "bg-[#080d1a]/80 border-slate-800/90 hover:border-slate-700 hover:bg-[#0c1428]"
                      }`}
                    >
                      {r.badge && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-extrabold tracking-wider text-cyan-300 uppercase">
                          <span>⭐</span> {r.badge}
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className={`p-3 rounded-xl border ${r.boxGlow} shadow-inner`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border border-slate-700 ${isSelected ? r.arrowBg : "bg-slate-800 text-slate-400"}`}>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2">
                          {r.title}
                          {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                        </h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-4 flex items-center justify-center sm:justify-start gap-4">
                <div className="hidden sm:block text-cyan-400 font-doodle text-xl transform -rotate-12">
                  \ \
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-extrabold text-sm hover:opacity-95 transition-transform active:scale-95 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-slate-950" />
                  <span>Continue as {role}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="hidden sm:block text-purple-400 font-doodle text-xl transform rotate-12">
                  / /
                </div>
              </div>
            </div>

            {/* Right Side Illustration */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative pt-4">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 group">
                <Image
                  src="/images/skilllink_hero.png"
                  alt="SkillLink Platform Illustration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

                {/* Floating Badge Overlay */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-bold text-white">AI Skill Engine</span>
                </div>
              </div>

              {/* Doodle Annotation */}
              <div className="mt-4 text-right w-full pr-6">
                <span className="font-doodle text-2xl text-cyan-300 font-bold block transform rotate-3">
                  Skills Build Futures
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 2: Account Details UI */}
      {step === 2 && (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 z-10 flex-1 flex flex-col justify-center">
          
          {/* Stepper Progress Bar */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                ✓
              </span>
              Select Role
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              Account Details
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Box */}
            <div className="lg:col-span-7 bg-[#070d1d]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                      Create Your <span className="text-cyan-400">{role}</span> Account
                    </h2>
                    <p className="text-xs text-slate-400">Step 2 of 2 — Account Credentials</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name / Org Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name / Org Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="you@institution.edu / company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                    />
                  </div>
                </div>

                {/* Dynamic Role Fields */}
                {role === "STUDENT" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        College / Institution
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                        <input
                          type="text"
                          placeholder="e.g. IIT Bombay"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Department / Major
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                        <input
                          type="text"
                          placeholder="e.g. Computer Science"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {role === "COLLEGE" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        University / Institution
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Stanford University"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Designation / Role
                      </label>
                      <input
                        type="text"
                        placeholder="Placement Director / HOD"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                )}

                {role === "COMPANY" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TechCorp Solutions"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Industry Sector
                      </label>
                      <input
                        type="text"
                        placeholder="Artificial Intelligence / FinTech"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                )}

                {role === "MENTOR" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Primary Domain Expertise
                    </label>
                    <input
                      type="text"
                      placeholder="Full Stack Architecture, Machine Learning, DevOps"
                      value={formData.mentorExpertise}
                      onChange={(e) => setFormData({ ...formData, mentorExpertise: e.target.value })}
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition"
                    />
                  </div>
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button with Doodle Accents */}
                <div className="pt-4 flex items-center gap-3">
                  <div className="text-cyan-400 font-doodle text-xl transform -rotate-12 hidden sm:block">
                    \ \
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-extrabold text-sm hover:opacity-95 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Creating Account...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Create Account & Launch Skill Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-purple-400 font-doodle text-xl transform rotate-12 hidden sm:block">
                    / /
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Hero Graphic & Role Summary List */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Illustration Card */}
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 group">
                <Image
                  src="/images/skilllink_hero.png"
                  alt="SkillLink Account Registration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-doodle text-2xl text-cyan-300 font-bold">
                    Build Your Future
                  </span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Stacked Summary Boxes matching Image 2 */}
              <div className="space-y-3">
                {roleSummaryFeatures.map((item) => {
                  const Icon = item.icon;
                  const isSelectedRole = role === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setRole(item.id as any)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelectedRole
                          ? "bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10"
                          : "bg-[#070c1a]/70 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Doodle Annotation */}
              <div className="flex items-center justify-end gap-2 pr-2 text-cyan-300">
                <span className="font-doodle text-xl font-bold">Learn Connect Grow</span>
                <svg className="w-5 h-5 text-cyan-400 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-[11px] text-slate-500 border-t border-slate-900/80 z-20">
        © 2026 SkillLink Platform Inc. All rights reserved. Powered by AI Skill Intelligence Engine.
      </footer>
    </div>
  );
}
