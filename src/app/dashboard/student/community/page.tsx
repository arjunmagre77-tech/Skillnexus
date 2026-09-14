"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Users, MessageSquare, ThumbsUp, PlusCircle, Sparkles, 
  Search, Filter, Flame, Trophy, Award, Tag, Code2, 
  Share2, CheckCircle2, UserPlus, ArrowRight, MessageCircle, X
} from "lucide-react";

interface DiscussionPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  commentsCount: number;
  timeAgo: string;
  isUpvoted?: boolean;
}

interface ProjectCollab {
  id: string;
  title: string;
  leader: string;
  avatar: string;
  description: string;
  requiredSkills: string[];
  membersJoined: number;
  maxMembers: number;
  isJoined?: boolean;
}

interface StudyCircle {
  id: string;
  name: string;
  icon: string;
  members: number;
  schedule: string;
  focusTopic: string;
  isMember?: boolean;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"discussions" | "projects" | "circles" | "leaderboard">("discussions");
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New post modal form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("WebDev");

  const [posts, setPosts] = useState<DiscussionPost[]>([
    {
      id: "post_1",
      author: "Priya Nair",
      avatar: "PN",
      role: "AI Student • Pune",
      title: "How to effectively fine-tune PyTorch models for retrieval-augmented generation (RAG)?",
      content: "I am building a domain-specific Q&A bot using LangChain and Qdrant. What are the best quantization practices when running on single T4 GPUs?",
      tags: ["AIML", "PyTorch", "RAG"],
      upvotes: 42,
      commentsCount: 18,
      timeAgo: "2 hours ago",
      isUpvoted: false
    },
    {
      id: "post_2",
      author: "Rahul Mehta",
      avatar: "RM",
      role: "DevOps Engineer Aspirant",
      title: "Docker vs Podman in 2026 enterprise microservices — What should freshers focus on?",
      content: "Many modern cloud internships ask for rootless containerization. Should I prioritize Podman CLI over traditional Docker Desktop?",
      tags: ["DevOps", "Docker", "CareerAdvice"],
      upvotes: 28,
      commentsCount: 11,
      timeAgo: "5 hours ago",
      isUpvoted: false
    },
    {
      id: "post_3",
      author: "Sneha Patel",
      avatar: "SP",
      role: "Frontend Dev • NITK",
      title: "Mastering Next.js 15 Server Actions & Optimistic UI State",
      content: "Just published a step-by-step breakdown on building zero-lag UI updates using optimistic updates in React 19 server components!",
      tags: ["WebDev", "Nextjs", "React"],
      upvotes: 65,
      commentsCount: 24,
      timeAgo: "1 day ago",
      isUpvoted: true
    }
  ]);

  const [collabs, setCollabs] = useState<ProjectCollab[]>([
    {
      id: "collab_1",
      title: "AI Resume & Portfolio Synthesizer (SIH Hackathon)",
      leader: "Arjun Magre",
      avatar: "AM",
      description: "Building an automated vector embedding parser for student github profiles and live resume generation.",
      requiredSkills: ["Next.js", "Python", "Vector DBs"],
      membersJoined: 3,
      maxMembers: 4,
      isJoined: true
    },
    {
      id: "collab_2",
      title: "Distributed Redis Clone in Go",
      leader: "Karthik Reddy",
      avatar: "KR",
      description: "Creating an open-source high-concurrency key-value store supporting RESP protocol and TCP clustering.",
      requiredSkills: ["Go / Systems", "Networking", "System Design"],
      membersJoined: 2,
      maxMembers: 3,
      isJoined: false
    },
    {
      id: "collab_3",
      title: "FinTech Automated Expense Tracker Chrome Extension",
      leader: "Anjali Singh",
      avatar: "AS",
      description: "Building a lightweight browser plugin that parses transaction receipts into categorized budget analytics.",
      requiredSkills: ["TypeScript", "React", "TailwindCSS"],
      membersJoined: 1,
      maxMembers: 3,
      isJoined: false
    }
  ]);

  const [circles, setCircles] = useState<StudyCircle[]>([
    {
      id: "circle_1",
      name: "LeetCode 75 & DSA Daily Challenge",
      icon: "🧠",
      members: 420,
      schedule: "Daily at 8:00 PM IST",
      focusTopic: "Arrays, Dynamic Programming & Graphs",
      isMember: true
    },
    {
      id: "circle_2",
      name: "System Design & Microservices Workshop",
      icon: "🏗️",
      members: 310,
      schedule: "Every Saturday at 5:00 PM IST",
      focusTopic: "Load Balancing, Caching & Kafka Queues",
      isMember: true
    },
    {
      id: "circle_3",
      name: "LLM Fine-Tuning & Vector DB Explorers",
      icon: "🤖",
      members: 245,
      schedule: "Bi-weekly Wednesdays",
      focusTopic: "Qdrant, LangChain, Transformers",
      isMember: false
    }
  ]);

  const leaderboard = [
    { rank: 1, name: "Karthik Reddy", college: "NITK Surathkal", iq: 93, points: 4100, streak: 45, badge: "👑 Top Performer" },
    { rank: 2, name: "Priya Nair", college: "COEP Pune", iq: 91, points: 3200, streak: 24, badge: "⭐ AI Champion" },
    { rank: 3, name: "Arjun Magre (You)", college: "NITK Surathkal", iq: 84, points: 2450, streak: 12, badge: "🔥 Placement Ready" },
    { rank: 4, name: "Dev Kapoor", college: "IIT Bombay", iq: 79, points: 2080, streak: 18, badge: "💻 Full Stack Pro" },
    { rank: 5, name: "Rahul Mehta", college: "VJTI Mumbai", iq: 74, points: 1680, streak: 5, badge: "⚡ Cloud Novice" }
  ];

  const handleToggleUpvote = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          upvotes: p.isUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          isUpvoted: !p.isUpvoted
        };
      }
      return p;
    }));
  };

  const handleToggleCollab = (id: string) => {
    setCollabs(collabs.map(c => {
      if (c.id === id) {
        const nextJoined = !c.isJoined;
        return {
          ...c,
          isJoined: nextJoined,
          membersJoined: nextJoined ? c.membersJoined + 1 : c.membersJoined - 1
        };
      }
      return c;
    }));
  };

  const handleToggleCircle = (id: string) => {
    setCircles(circles.map(c => {
      if (c.id === id) {
        const nextJoined = !c.isMember;
        return {
          ...c,
          isMember: nextJoined,
          members: nextJoined ? c.members + 1 : c.members - 1
        };
      }
      return c;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const created: DiscussionPost = {
      id: "post_" + Date.now(),
      author: "Arjun Magre",
      avatar: "AM",
      role: "Student • Pune",
      title: newTitle,
      content: newContent,
      tags: [newTag],
      upvotes: 1,
      commentsCount: 0,
      timeAgo: "Just now",
      isUpvoted: true
    };

    setPosts([created, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowCreateModal(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "all" || post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Student Community & Circles" 
          subtitle="Connect with peers, collaborate on projects, join study groups, and showcase skills."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          
          {/* Community Hero Card */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 p-6 bg-gradient-to-r from-[#0a142e] via-[#0d1c42] to-[#071126] shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    2,450+ Active Engineers & Students
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  Learn Together, Build Faster
                </h1>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Join specialized skill circles, ask technical questions, find hackathon teammates, and get real-time feedback from top industry mentors.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0 self-start lg:self-center"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Start Discussion / Project</span>
              </button>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: "discussions", label: "Discussions & Q&A", icon: MessageSquare },
                { id: "projects", label: "Project Collaborations", icon: Code2 },
                { id: "circles", label: "Study Circles", icon: Users },
                { id: "leaderboard", label: "Talent Leaderboard", icon: Trophy },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      isActive
                        ? "bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: DISCUSSIONS & Q&A */}
          {activeTab === "discussions" && (
            <div className="space-y-6">
              
              {/* Search & Tag Filter Bar */}
              <div className="p-4 rounded-2xl bg-[#091022] border border-blue-900/60 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-[#0e1626] border border-slate-800 rounded-xl px-3.5 py-2.5 w-full md:w-96 focus-within:border-cyan-500 transition">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search discussions or questions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {["all", "WebDev", "AIML", "DevOps", "CareerAdvice"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                        selectedTag === tag
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "bg-[#0e1626] text-slate-400 border border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed List */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-3xl bg-[#091022] border border-blue-900/60 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
                          {post.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{post.author}</h4>
                          <p className="text-[10px] text-slate-400">{post.role} • {post.timeAgo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {post.tags.map((t) => (
                          <span key={t} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-white hover:text-cyan-300 cursor-pointer transition leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center gap-4 text-xs text-slate-400">
                      <button
                        onClick={() => handleToggleUpvote(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
                          post.isUpvoted
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-[#0e1626] border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${post.isUpvoted ? "fill-cyan-400" : ""}`} />
                        <span className="font-bold">{post.upvotes} Upvotes</span>
                      </button>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0e1626] border border-slate-800">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.commentsCount} Comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECT COLLABORATIONS */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collabs.map((collab) => (
                <div
                  key={collab.id}
                  className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
                          {collab.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{collab.leader}</h4>
                          <p className="text-[10px] text-slate-400">Project Owner</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                        {collab.membersJoined}/{collab.maxMembers} Members
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{collab.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{collab.description}</p>

                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Required Skill Set:</p>
                      <div className="flex flex-wrap gap-1">
                        {collab.requiredSkills.map((sk) => (
                          <span key={sk} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            ⚡ {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleCollab(collab.id)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                      collab.isJoined
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                    }`}
                  >
                    {collab.isJoined ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Joined Team</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Apply to Join Team</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: STUDY CIRCLES */}
          {activeTab === "circles" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {circles.map((circle) => (
                <div
                  key={circle.id}
                  className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl text-center"
                >
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-cyan-500/40 text-3xl flex items-center justify-center mx-auto shadow-inner">
                      {circle.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">{circle.name}</h3>
                      <p className="text-xs text-cyan-400 font-medium mt-1">{circle.members} Active Peers</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#0d162d] border border-slate-800 text-left space-y-1 text-xs text-slate-300">
                      <p><strong className="text-white">Schedule:</strong> {circle.schedule}</p>
                      <p><strong className="text-white">Focus:</strong> {circle.focusTopic}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleCircle(circle.id)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                      circle.isMember
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                    }`}
                  >
                    {circle.isMember ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Member Joined</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        <span>Join Study Circle</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: TALENT LEADERBOARD */}
          {activeTab === "leaderboard" && (
            <div className="p-6 rounded-3xl bg-[#091022] border border-blue-900/60 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Institutional Talent Leaderboard
                  </h2>
                  <p className="text-xs text-slate-400">Ranked by Talent IQ, verified assessment scores, and streak consistency.</p>
                </div>
                <span className="text-xs text-cyan-400 font-bold px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                  Weekly Refresh
                </span>
              </div>

              <div className="space-y-3">
                {leaderboard.map((item) => (
                  <div
                    key={item.rank}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition ${
                      item.name.includes("You")
                        ? "bg-blue-950/60 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                        : "bg-[#0d162d] border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center ${
                        item.rank === 1 ? "bg-amber-500 text-slate-950" : item.rank === 2 ? "bg-slate-300 text-slate-950" : item.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400"
                      }`}>
                        #{item.rank}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                            {item.badge}
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400">{item.college}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Talent IQ</div>
                        <div className="text-sm font-black text-cyan-400">{item.iq}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
                        <div className="text-sm font-black text-amber-400 flex items-center gap-1 justify-end">
                          <Flame className="w-3.5 h-3.5 fill-amber-400" /> {item.streak}d
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Create Discussion / Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#091022] border border-blue-500/40 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-base font-extrabold text-white">Start New Discussion / Post</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Topic / Question Title</label>
                <input
                  type="text"
                  placeholder="e.g. Best practices for optimizing Next.js server actions..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0e1626] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tag / Category</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-[#0e1626] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="WebDev">Web Development</option>
                  <option value="AIML">AI & Machine Learning</option>
                  <option value="DevOps">DevOps & Cloud</option>
                  <option value="CareerAdvice">Career & Placements</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Details & Question Description</label>
                <textarea
                  rows={4}
                  placeholder="Share details, code snippets or project goals..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#0e1626] border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
