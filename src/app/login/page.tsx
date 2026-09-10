"use client";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles,
  GraduationCap, Building2, Building, Users, CheckCircle2
} from "lucide-react";

const demoAccounts = [
  { role: "Student", email: "student@demo.com", password: "demo123", icon: GraduationCap, bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
  { role: "College", email: "college@demo.com", password: "demo123", icon: Building2,      bg: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  { role: "Company", email: "company@demo.com", password: "demo123", icon: Building,       bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  { role: "Mentor",  email: "mentor@demo.com",  password: "demo123", icon: Users,          bg: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const defaultEmail = searchParams.get("email") || "";

  const [email, setEmail]             = useState(defaultEmail);
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) { setError("Invalid email or password. Try a demo account below."); return; }
    router.push("/dashboard/student");
    router.refresh();
  }

  async function demoLogin(account: typeof demoAccounts[0]) {
    setLoading(true);
    setError("");
    setEmail(account.email);
    setPassword(account.password);
    const res = await signIn("credentials", { email: account.email, password: account.password, redirect: false });
    setLoading(false);
    if (res?.error) { setError("Demo login failed. Please try again."); return; }
    const dashMap: Record<string, string> = {
      Student: "/dashboard/student",
      College: "/dashboard/college",
      Company: "/dashboard/company",
      Mentor:  "/dashboard/mentor",
    };
    router.push(dashMap[account.role] || "/dashboard/student");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">

      {/* Background Orbs */}
      <div className="fixed top-0 left-1/3 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/3 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* ── Header ── */}
      <header className="px-8 py-5 max-w-7xl mx-auto w-full flex items-center justify-between z-20 border-b border-slate-800/60 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Skill<span className="text-cyan-400">Link</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <span className="text-sm text-slate-400 hidden sm:inline">Don't have an account?</span>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-full border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-semibold text-sm transition flex items-center gap-2 shadow-md shadow-cyan-500/10"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-10 py-14 z-10 flex-1 flex flex-col justify-center">

        {/* Success Banner */}
        {registered && (
          <div className="mb-10 max-w-2xl mx-auto p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Account created successfully! Please sign in with your credentials.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Form Card ── */}
          <div className="bg-[#070d1d]/90 border border-cyan-500/30 rounded-3xl p-10 sm:p-12 shadow-2xl backdrop-blur-xl">

            {/* Heading block */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-5">
                <Sparkles className="w-4 h-4" />
                Welcome Back
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                Sign in to <span className="text-cyan-400">SkillLink</span>
              </h1>
              <p className="text-base text-slate-400 mt-3 leading-relaxed">
                Enter your credentials or choose a quick demo role to access your dashboard.
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mb-9">
              <span className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">
                Quick Demo Sign-In
              </span>
              <div className="grid grid-cols-2 gap-4">
                {demoAccounts.map((acc) => {
                  const Icon = acc.icon;
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      disabled={loading}
                      onClick={() => demoLogin(acc)}
                      className={`p-4 rounded-2xl border ${acc.bg} hover:scale-[1.02] active:scale-95 transition-all text-left flex items-center gap-3.5 cursor-pointer`}
                    >
                      <div className="p-2.5 rounded-xl bg-slate-900/60 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-sm">{acc.role}</div>
                        <div className="text-xs text-slate-400">demo123</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-sm text-slate-500 font-medium">or email credentials</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@institution.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl pl-12 pr-5 py-3.5 text-base text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl pl-12 pr-12 py-3.5 text-base text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-extrabold text-base hover:opacity-90 transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to SkillLink</span>
                      <ArrowRight className="w-5 h-5 text-slate-950" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* ── Right: Hero Image ── */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 group">
              <Image
                src="/images/skilllink_hero.png"
                alt="SkillLink Platform Sign In"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> AI Skill Intelligence
                </div>
                <h3 className="text-xl font-extrabold text-white leading-snug">
                  Empowering your career with verified skill intelligence.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Track skill progress, gap analysis, and industry internship matches in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-base font-bold text-cyan-300">Skills Build Futures</span>
              <span className="text-sm text-slate-400">Next-Gen Career OS</span>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-6 px-8 text-center text-sm text-slate-500 border-t border-slate-900/80 z-20">
        © 2026 SkillLink Platform Inc. All rights reserved. Powered by AI Skill Intelligence Engine.
      </footer>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
