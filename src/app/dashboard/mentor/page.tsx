"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Users, Calendar, MessageSquare, Star, Award, 
  CheckCircle2, Clock, DollarSign, ArrowRight, Video
} from "lucide-react";

export default function MentorDashboardPage() {
  const mentorData = {
    name: "Dr. Vikram Sethi",
    title: "Principal AI Architect @ TechCorp",
    rating: 4.9,
    reviewsCount: 48,
    totalMentees: 124,
    upcomingSessionsCount: 3,
    earningsThisMonth: "$1,850",
  };

  const upcomingSessions = [
    {
      id: "ses_1",
      studentName: "Aarav Sharma",
      college: "IIT Bombay",
      topic: "Code Review: Vector Search Engine Micro-Project",
      date: "Today @ 5:00 PM IST",
      avatar: "AS",
      status: "Confirmed",
    },
    {
      id: "ses_2",
      studentName: "Priya Sundaram",
      college: "BITS Pilani",
      topic: "System Design Mock Interview & Feedback",
      date: "Tomorrow @ 3:00 PM IST",
      avatar: "PS",
      status: "Confirmed",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Industry Mentor Workspace" 
          subtitle={`Welcome back, ${mentorData.name} — ${mentorData.title}`}
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Top Banner Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-amber-400 font-bold uppercase flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> Mentor Rating
              </div>
              <div className="text-3xl font-black text-white mt-2">{mentorData.rating} / 5.0</div>
              <p className="text-xs text-slate-400 mt-1">{mentorData.reviewsCount} verified student reviews</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-cyan-400 font-bold uppercase">Total Mentees</div>
              <div className="text-3xl font-black text-white mt-2">{mentorData.totalMentees}</div>
              <p className="text-xs text-slate-400 mt-1">Guided through SkillLink</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-purple-400 font-bold uppercase">Upcoming Sessions</div>
              <div className="text-3xl font-black text-white mt-2">{mentorData.upcomingSessionsCount}</div>
              <p className="text-xs text-purple-400 mt-1">Scheduled for this week</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-emerald-400 font-bold uppercase">Mentorship Earnings</div>
              <div className="text-3xl font-black text-white mt-2">{mentorData.earningsThisMonth}</div>
              <p className="text-xs text-emerald-400 mt-1">Earned this month</p>
            </div>
          </div>

          {/* Upcoming Sessions List */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                Upcoming 1-on-1 Mentorship Sessions
              </h3>
              <button className="text-xs text-cyan-400 hover:underline font-semibold">
                Set Availability Calendar →
              </button>
            </div>

            <div className="space-y-3">
              {upcomingSessions.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm border border-cyan-500/30">
                      {s.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{s.studentName}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {s.college}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{s.topic}</p>
                      <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {s.date}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Launching video room for session with ${s.studentName}`)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Video Room</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
