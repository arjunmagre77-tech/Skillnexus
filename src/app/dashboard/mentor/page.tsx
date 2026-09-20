"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Users, Calendar, Star, DollarSign, Video, Eye,
  Clock, Filter, ChevronDown, CheckCircle2, Sparkles, X,
  LayoutList, LayoutGrid, MessageSquare, Target
} from "lucide-react";

interface MentorshipSession {
  id: string;
  name: string;
  role: "Mentee";
  institution: string;
  year: string;
  topic: string;
  date: string;
  avatarType: "initials" | "image";
  avatarValue: string;
  avatarBg?: string;
  skills: string[];
  status: "Scheduled" | "Upcoming" | "Confirmed";
  domain: string;
  sessionType: "1:1 Session";
}

const mockSessions: MentorshipSession[] = [
  {
    id: "ses_1",
    name: "Aarav Sharma",
    role: "Mentee",
    institution: "IIT Bombay",
    year: "3rd Year",
    topic: "Code Review: Vector Search Engine Micro-Project",
    date: "Today @ 5:00 PM IST",
    avatarType: "initials",
    avatarValue: "AS",
    avatarBg: "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40",
    skills: ["C++", "CUDA", "Vector Search", "HNSW"],
    status: "Scheduled",
    domain: "Distributed Systems & AI",
    sessionType: "1:1 Session"
  },
  {
    id: "ses_2",
    name: "Priya Sundaram",
    role: "Mentee",
    institution: "BITS Pilani",
    year: "4th Year",
    topic: "System Design Mock Interview & Feedback",
    date: "Tomorrow @ 3:00 PM IST",
    avatarType: "initials",
    avatarValue: "PS",
    avatarBg: "bg-purple-600/30 text-purple-300 border border-purple-500/40",
    skills: ["System Design", "LLM APIs", "AST Parsing"],
    status: "Upcoming",
    domain: "System Design",
    sessionType: "1:1 Session"
  },
  {
    id: "ses_3",
    name: "Ananya Patel",
    role: "Mentee",
    institution: "BITS Pilani",
    year: "4th Year",
    topic: "Project Review: Real-Time Agentic CLI Tool",
    date: "Sep 12, 2026 @ 11:00 AM IST",
    avatarType: "image",
    avatarValue: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    skills: ["Python", "FastAPI", "React"],
    status: "Confirmed",
    domain: "Full-Stack AI",
    sessionType: "1:1 Session"
  }
];

export default function MentorDashboardPage() {
  const [sessions, setSessions] = useState<MentorshipSession[]>(mockSessions);
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<MentorshipSession | null>(null);
  const [activeDetailModal, setActiveDetailModal] = useState<MentorshipSession | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesDomain = selectedDomain === "All Domains" || s.domain === selectedDomain || s.skills.some(sk => sk.toLowerCase().includes(selectedDomain.toLowerCase()));
    const matchesStatus = selectedStatus === "All Statuses" || s.status === selectedStatus;
    return matchesDomain && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-6 md:p-8 space-y-6 overflow-y-auto">
          {/* Toast Notification */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Top Title Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  MENTOR WORKSPACE
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Mentorship & Guidance
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Help students grow, share your expertise, and make an impact through mentorship.
              </p>
            </div>

            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition self-start md:self-auto"
            >
              <Calendar className="w-4 h-4" />
              <span>Set Availability Calendar</span>
            </button>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Mentor Rating */}
            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-cyan-500/30 transition shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  MENTOR RATING
                </span>
                <div className="text-2xl font-black text-white mt-1">
                  4.9 <span className="text-slate-400 font-semibold text-lg">/ 5.0</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">48 verified student reviews</p>
              </div>
            </div>

            {/* Card 2: Total Mentees */}
            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-emerald-500/30 transition shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  TOTAL MENTEES
                </span>
                <div className="text-2xl font-black text-white mt-1">124</div>
                <p className="text-xs text-slate-400 mt-1">Guided through SkillLink</p>
              </div>
            </div>

            {/* Card 3: Upcoming Sessions */}
            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-purple-500/30 transition shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                  UPCOMING SESSIONS
                </span>
                <div className="text-2xl font-black text-white mt-1">3</div>
                <p className="text-xs text-slate-400 mt-1">Scheduled for this week</p>
              </div>
            </div>

            {/* Card 4: Mentorship Earnings */}
            <div className="p-5 rounded-2xl bg-[#071324] border border-[#112642] hover:border-teal-500/30 transition shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Target className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                  MENTORSHIP EARNINGS
                </span>
                <div className="text-2xl font-black text-white mt-1">$1,850</div>
                <p className="text-xs text-slate-400 mt-1">Earned this month</p>
              </div>
            </div>
          </div>

          {/* Upcoming 1-on-1 Mentorship Sessions Section */}
          <div className="p-6 rounded-3xl bg-[#071324] border border-[#112642] space-y-5">
            {/* Section Header & Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#112642] pb-5">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white tracking-wide">
                  Upcoming 1-on-1 Mentorship Sessions
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Domains Dropdown */}
                <div className="relative">
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="appearance-none bg-[#091a30] border border-[#142c4c] text-xs text-slate-300 font-medium rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="All Domains">All Domains</option>
                    <option value="Distributed Systems & AI">Distributed Systems & AI</option>
                    <option value="System Design">System Design</option>
                    <option value="Full-Stack AI">Full-Stack AI</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>

                {/* Statuses Dropdown */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none bg-[#091a30] border border-[#142c4c] text-xs text-slate-300 font-medium rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>

                {/* Layout icon */}
                <div className="p-2 rounded-xl bg-[#091a30] border border-[#142c4c] text-cyan-400 cursor-pointer hover:bg-[#0c2240] transition">
                  <LayoutList className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Sessions List */}
            <div className="space-y-3.5">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-5 rounded-2xl bg-[#050d1a] border border-[#12233b] hover:border-[#1a3860] transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-5 group shadow-sm"
                >
                  {/* Left: Student info + Topic + Time */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    {session.avatarType === "initials" ? (
                      <div className={`w-12 h-12 rounded-2xl font-bold text-sm flex items-center justify-center shrink-0 ${session.avatarBg}`}>
                        {session.avatarValue}
                      </div>
                    ) : (
                      <img
                        src={session.avatarValue}
                        alt={session.name}
                        className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-700"
                      />
                    )}

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">{session.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {session.role}
                        </span>
                        <span className="text-xs text-slate-400">
                          {session.institution} • {session.year}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-200">
                        {session.topic}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{session.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Skill Pills */}
                  <div className="flex flex-wrap items-center gap-2 xl:px-4">
                    {session.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#0b192e] text-slate-300 border border-[#172c47]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Right: Status badge + Action CTA */}
                  <div className="flex items-center justify-between xl:justify-end gap-5 shrink-0 border-t xl:border-t-0 border-[#12233b] pt-3 xl:pt-0">
                    <div className="text-left xl:text-right space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {session.status === "Scheduled" && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            Scheduled
                          </span>
                        )}
                        {session.status === "Upcoming" && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            Upcoming
                          </span>
                        )}
                        {session.status === "Confirmed" && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Confirmed
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {session.sessionType}
                      </span>
                    </div>

                    {session.status === "Confirmed" ? (
                      <button
                        onClick={() => setActiveDetailModal(session)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details &gt;</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveVideoModal(session)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Video Room &gt;</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Set Availability Calendar Modal */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#071324] border border-[#14263f] rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#14263f] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">Set Availability Calendar</h3>
              </div>
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Weekly Active Days</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <button
                      key={day}
                      className="py-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-bold hover:bg-cyan-500/20 transition"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Time Slots (IST)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium">
                    10:00 AM - 01:00 PM
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium">
                    04:00 PM - 08:00 PM
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Max Sessions Per Day</label>
                <input
                  type="number"
                  defaultValue={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCalendarModalOpen(false);
                  showToast("Availability calendar synced successfully!");
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
              >
                Save Availability
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#071324] border border-[#14263f] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Join 1:1 Video Room</h3>
              <p className="text-xs text-slate-400 mt-1">Connecting with {activeVideoModal.name}</p>
              <p className="text-xs text-cyan-400 font-semibold mt-1">{activeVideoModal.topic}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#040a14] border border-[#12233b] text-xs text-slate-300 space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="font-semibold text-white">{activeVideoModal.institution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="font-semibold text-cyan-400">{activeVideoModal.date}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold text-xs"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setActiveVideoModal(null);
                  showToast(`Connected to video room with ${activeVideoModal.name}`);
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Launch Video Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#071324] border border-[#14263f] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#14263f] pb-3">
              <h3 className="font-bold text-base text-white">Session Dossier</h3>
              <button
                onClick={() => setActiveDetailModal(null)}
                className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Mentee</span>
                <div className="text-sm font-bold text-white">{activeDetailModal.name}</div>
                <div className="text-slate-400">{activeDetailModal.institution} • {activeDetailModal.year}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Topic Focus</span>
                <div className="text-white font-semibold">{activeDetailModal.topic}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Tags</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeDetailModal.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] border border-cyan-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveDetailModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
