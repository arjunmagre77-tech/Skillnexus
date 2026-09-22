"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import VideoCallModal from "@/components/dashboard/mentor/VideoCallModal";
import { 
  Calendar, Users, Clock, Star, Plus, Search, 
  SlidersHorizontal, ChevronDown, Video, Eye, MoreVertical,
  ChevronLeft, ChevronRight, Sparkles, X, User as UserIcon, Tag
} from "lucide-react";

interface MentorSessionItem {
  id: string;
  name: string;
  college: string;
  topic: string;
  date: string;
  avatarUrl: string;
  mentorName: string;
  domain: string;
  duration: string;
  status: "Upcoming" | "Scheduled" | "Completed";
  statusType: "green-glow" | "blue-pill" | "slate-pill";
}

const mockSessionsData: MentorSessionItem[] = [
  {
    id: "ms_1",
    name: "Aarav Sharma",
    college: "IIT Bombay",
    topic: "Code Review: Vector Search Engine Micro-Project",
    date: "Today @ 5:00 PM IST",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
    mentorName: "Aarav Sharma",
    domain: "System Design",
    duration: "60 mins",
    status: "Upcoming",
    statusType: "green-glow"
  },
  {
    id: "ms_2",
    name: "Priya Nair",
    college: "BITS Pilani",
    topic: "System Design Mock Interview & Feedback",
    date: "Tomorrow @ 3:00 PM IST",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    mentorName: "Priya Nair",
    domain: "System Design",
    duration: "60 mins",
    status: "Scheduled",
    statusType: "blue-pill"
  },
  {
    id: "ms_3",
    name: "Rohan Gupta",
    college: "NIT Trichy",
    topic: "Career Guidance: Transitioning to AI Engineer",
    date: "Sep 24 @ 4:00 PM IST",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    mentorName: "Rohan Gupta",
    domain: "Career Guidance",
    duration: "45 mins",
    status: "Scheduled",
    statusType: "blue-pill"
  }
];

export default function MentorSessionsPage() {
  const [sessions, setSessions] = useState<MentorSessionItem[]>(mockSessionsData);
  const [search, setSearch] = useState("");
  const [sessionFilter, setSessionFilter] = useState("All Sessions");
  const [timeFilter, setTimeFilter] = useState("Upcoming & Past");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [activeDetailSession, setActiveDetailSession] = useState<MentorSessionItem | null>(null);
  const [activeVideoCallSession, setActiveVideoCallSession] = useState<MentorSessionItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New session form state
  const [newTopic, setNewTopic] = useState("");
  const [newMentor, setNewMentor] = useState("Aarav Sharma");
  const [newDomain, setNewDomain] = useState("System Design");
  const [newDate, setNewDate] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.topic.toLowerCase().includes(search.toLowerCase()) ||
                          s.college.toLowerCase().includes(search.toLowerCase()) ||
                          s.domain.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = sessionFilter === "All Sessions" || s.domain === sessionFilter;
    const matchesTime = timeFilter === "Upcoming & Past" || 
                        (timeFilter === "Upcoming Only" && s.status === "Upcoming") ||
                        (timeFilter === "Scheduled Only" && s.status === "Scheduled");
    return matchesSearch && matchesDomain && matchesTime;
  });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const newSession: MentorSessionItem = {
      id: `ms_${Date.now()}`,
      name: newMentor,
      college: "IIT Bombay",
      topic: newTopic,
      date: newDate || "Tomorrow @ 4:00 PM IST",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      mentorName: newMentor,
      domain: newDomain,
      duration: "45 mins",
      status: "Scheduled",
      statusType: "blue-pill"
    };
    setSessions([newSession, ...sessions]);
    setIsScheduleModalOpen(false);
    setNewTopic("");
    showToast("New mentor session scheduled successfully!");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 md:p-8 space-y-6 overflow-y-auto">
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  MENTOR SESSIONS
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Mentor Sessions
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Connect with industry experts and get guidance for your career and skill development.
              </p>
            </div>

            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule New Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-cyan-500/30 transition shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  TOTAL SESSIONS
                </span>
                <div className="text-2xl font-black text-white mt-1">{sessions.length}</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-blue-500/30 transition shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  MENTORS ENGAGED
                </span>
                <div className="text-2xl font-black text-white mt-1">3</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-purple-500/30 transition shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  UPCOMING SESSIONS
                </span>
                <div className="text-2xl font-black text-white mt-1">1</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-violet-500/30 transition shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  COMPLETED SESSIONS
                </span>
                <div className="text-2xl font-black text-white mt-1">2</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by mentor name, email, or institution..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071324] border border-[#112642] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-[#1c385e] transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-5 shadow-sm"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <img
                    src={session.avatarUrl}
                    alt={session.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-700 shadow-md"
                  />
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white">{session.name}</span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#14233c] text-indigo-300 border border-indigo-500/20">
                        {session.college}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {session.topic}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{session.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between xl:justify-end gap-3 shrink-0">
                  {session.status === "Upcoming" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                      Upcoming
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Scheduled
                    </span>
                  )}

                  <button
                    onClick={() => setActiveVideoCallSession(session)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Call</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#071324] border border-[#14263f] rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#14263f] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">Schedule Mentor Session</h3>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Select Mentor</label>
                <select
                  value={newMentor}
                  onChange={(e) => setNewMentor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Aarav Sharma">Aarav Sharma (IIT Bombay)</option>
                  <option value="Priya Nair">Priya Nair (BITS Pilani)</option>
                  <option value="Rohan Gupta">Rohan Gupta (NIT Trichy)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Session Topic &amp; Goals</label>
                <input
                  type="text"
                  placeholder="e.g., Code Review: Raft Consensus Engine"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#14263f]">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition"
                >
                  Confirm &amp; Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeVideoCallSession && (
        <VideoCallModal
          isOpen={!!activeVideoCallSession}
          onClose={() => setActiveVideoCallSession(null)}
          sessionDetails={{
            sessionId: activeVideoCallSession.id,
            studentName: activeVideoCallSession.name,
            mentorName: activeVideoCallSession.mentorName,
            topic: activeVideoCallSession.topic,
          }}
        />
      )}
    </div>
  );
}
