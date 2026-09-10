"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles, 
  GraduationCap, Building2, Building, Users, CheckCircle2 
} from "lucide-react";

const demoAccounts = [
  { role: "Student", email: "student@demo.com", password: "demo123", color: "cyan", icon: GraduationCap, bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
  { role: "College", email: "college@demo.com", password: "demo123", color: "purple", icon: Building2, bg: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  { role: "Company", email: "company@demo.com", password: "demo123", color: "emerald", icon: Building, bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  { role: "Mentor",  email: "mentor@demo.com",  password: "demo123", color: "amber", icon: Users, bg: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const defaultEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) { 
      setError("Invalid email or password. Try a demo account below."); 
      return; 
    }
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
    if (res?.error) { 
      setError("Demo login failed. Please try again."); 
      return; 
    }
    const dashMap: Record<string,string> = { 
      Student: "/dashboard/student", 
      College: "/dashboard/college", 
      Company: "/dashboard/company", 
      Mentor: "/dashboard/mentor" 
    };
    router.push(dashMap[account.role] || "/dashboard/student");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
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
          <span className="text-xs text-slate-400 hidden sm:inline">Don't have an account?</span>
          <Link
            href="/register"
            className="px-4 py-2 rounded-full border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-semibold text-xs transition flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
          >
            <span>Create Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 z-10 flex-1 flex flex-col justify-center">
        
        {registered && (
          <div className="mb-6 max-w-xl mx-auto p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Account created successfully! Please sign in with your credentials.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Form Box */}
          <div className="lg:col-span-6 bg-[#070d1d]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold mb-3">
                <Sparkles className="w-3 h-3" />
                Welcome Back
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Sign in to <span className="text-cyan-400">SkillLink</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials or choose a quick demo role to access your dashboard.
              </p>
            </div>

            {/* Quick Demo Access Grid */}
            <div className="mb-6">
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2.5">
                Quick Demo Sign-In
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {demoAccounts.map((acc) => {
                  const Icon = acc.icon;
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      disabled={loading}
                      onClick={() => demoLogin(acc)}
                      className={`p-2.5 rounded-xl border ${acc.bg} hover:scale-[1.02] active:scale-95 transition-all text-left flex items-center gap-2.5 cursor-pointer shadow-sm`}
                    >
                      <div className="p-1.5 rounded-lg bg-slate-900/60 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">{acc.role}</div>
                        <div className="text-[10px] text-slate-400">demo123</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[11px] text-slate-500 font-medium">or email credentials</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@institution.edu / company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#030712] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="pt-2 flex items-center justify-between">
                <div className="text-cyan-400 font-doodle text-xl transform -rotate-12 hidden sm:block">
                  \ \
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-extrabold text-sm hover:opacity-95 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In to SkillLink</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>

                <div className="text-purple-400 font-doodle text-xl transform rotate-12 hidden sm:block">
                  / /
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Hero Graphic */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 group">
              <Image
                src="/images/skilllink_hero.png"
                alt="SkillLink Platform Sign In"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" /> AI Skill Intelligence
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  Empowering your career with verified skill intelligence.
                </h3>
                <p className="text-xs text-slate-300">
                  Track skill progress, gap analysis, and industry internship matches in real-time.
                </p>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-2 text-cyan-300">
              <span className="font-doodle text-xl font-bold">Skills Build Futures</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>Next-Gen Career OS</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-[11px] text-slate-500 border-t border-slate-900/80 z-20">
        © 2026 SkillLink Platform Inc. All rights reserved. Powered by AI Skill Intelligence Engine.
      </footer>
    </div>
  );
}
