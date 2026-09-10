"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Search, Bell, Sparkles, ChevronDown, User, Settings, 
  HelpCircle, ShieldCheck, Flame, BookOpen, Briefcase
} from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
}

export default function DashboardHeader({ 
  title = "Welcome back", 
  subtitle = "Here is your skill intelligence overview",
  user = { name: "Arjun Magre", email: "arjun@skilllink.com", role: "Student • Pune" }
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const mockNotifications = [
    { id: 1, title: "New Skill Verification Badge!", desc: "You passed the React.js Advanced assessment with 94%", time: "10m ago", icon: "🏆", type: "badge" },
    { id: 2, title: "Internship Match Alert", desc: "OpenAI Labs matched 94% with your skill vector", time: "1h ago", icon: "⚡", type: "match" },
    { id: 3, title: "Mentorship Request Accepted", desc: "Dr. Vikram Sethi accepted your 1-on-1 code review session", time: "3h ago", icon: "👨‍🏫", type: "session" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 flex items-center justify-between gap-4">
      {/* Search Bar matching screenshot */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-2 bg-[#0e1626] border border-slate-800 rounded-full px-4 py-2 focus-within:border-cyan-500/60 transition shadow-inner">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, internships, projects, courses, or people..."
            className="bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none w-full"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-300" />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-sm text-white">Notifications</span>
                <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-3 mt-3">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="flex gap-3 p-2.5 rounded-xl bg-slate-850/50 hover:bg-slate-800 transition">
                    <span className="text-xl">{n.icon}</span>
                    <div className="space-y-0.5 text-left">
                      <div className="text-xs font-semibold text-white">{n.title}</div>
                      <div className="text-[11px] text-slate-400 leading-tight">{n.desc}</div>
                      <div className="text-[10px] text-slate-500 pt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Moon Icon */}
        <button className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        {/* User Profile Pill matching screenshot */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1 pl-1 pr-3 rounded-full bg-[#0e1626] border border-slate-800 hover:border-slate-700 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
              AM
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white leading-tight">Arjun Magre</div>
              <div className="text-[10px] text-slate-400 font-medium">Student • Pune</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <p className="font-bold text-white">Arjun Magre</p>
                <p className="text-[11px] text-slate-400">arjun@skilllink.com</p>
              </div>
              <Link href="/dashboard/student/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>My Profile</span>
              </Link>
              <Link href="/dashboard/student/skills" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Verified Skills Matrix</span>
              </Link>
              <div className="my-1 border-t border-slate-800" />
              <Link href="/api/auth/signout" className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition">
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
