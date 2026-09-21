"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Users, MessageSquare, ThumbsUp, Image as ImageIcon, Link as LinkIcon, 
  Send, SlidersHorizontal, Filter, MoreVertical, ArrowRight, 
  Code2, Brain, Database, Cloud, Shield, ChevronRight, Sparkles, 
  X, Check, Flame, MessageCircle, Trophy
} from "lucide-react";

interface PostItem {
  id: string;
  author: string;
  avatarInitials: string;
  avatarBg: string;
  timeAgo: string;
  category: "Discussion" | "Question" | "Project Share" | "Mentorship" | "Events";
  tags: string[];
  title: string;
  content: string;
  upvotes: number;
  commentsCount: number;
  actionLabel: string;
  isUpvoted?: boolean;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<string>("All Posts");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [newPostText, setNewPostText] = useState("");
  const [activePostModal, setActivePostModal] = useState<PostItem | null>(null);

  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: "post_1",
      author: "Priya Nair",
      avatarInitials: "PN",
      avatarBg: "bg-purple-600",
      timeAgo: "2h ago",
      category: "Discussion",
      tags: ["#AI"],
      title: "How to effectively fine-tune Pytfch models for retrieval-augmented generation (RAG)?",
      content: "I am building a domain-specific Q&A bot using LangChain and Qdrant. What are the best quantization practices when running on single T4 GPUs?",
      upvotes: 42,
      commentsCount: 18,
      actionLabel: "Join Discussion"
    },
    {
      id: "post_2",
      author: "Rahul Mehta",
      avatarInitials: "RM",
      avatarBg: "bg-blue-600",
      timeAgo: "5h ago",
      category: "Question",
      tags: ["#DevOps", "#Docker", "#CareerAdvice"],
      title: "Docker vs Podman in 2026 enterprise microservices – What should freshers focus on?",
      content: "Many modern cloud internships ask for rootless containerization. Should I prioritize Podman CLI over traditional Docker Desktop?",
      upvotes: 28,
      commentsCount: 11,
      actionLabel: "View Answers"
    },
    {
      id: "post_3",
      author: "Sneha Patel",
      avatarInitials: "SP",
      avatarBg: "bg-violet-600",
      timeAgo: "1d ago",
      category: "Project Share",
      tags: ["#WebDev", "#Nextjs", "#React"],
      title: "Mastering Next.js 15 Server Actions & Optimistic UI State",
      content: "Just published a step-by-step breakdown on building zero-lag UI updates using optimistic updates in React 19 server components!",
      upvotes: 65,
      commentsCount: 24,
      actionLabel: "Read More"
    }
  ]);

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1,
          isUpvoted: !post.isUpvoted
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: PostItem = {
      id: `post_${Date.now()}`,
      author: "Anjani Magre",
      avatarInitials: "AM",
      avatarBg: "bg-blue-600",
      timeAgo: "Just now",
      category: "Discussion",
      tags: ["#Community"],
      title: newPostText.slice(0, 60) + (newPostText.length > 60 ? "..." : ""),
      content: newPostText,
      upvotes: 1,
      commentsCount: 0,
      actionLabel: "Join Discussion",
      isUpvoted: true
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const tabs = ["All Posts", "Discussions", "Q&A", "Project Sharing", "Mentorship", "Events"];

  const filteredPosts = posts.filter(post => {
    if (activeTab === "All Posts") return true;
    if (activeTab === "Discussions") return post.category === "Discussion";
    if (activeTab === "Q&A") return post.category === "Question";
    if (activeTab === "Project Sharing") return post.category === "Project Share";
    if (activeTab === "Mentorship") return post.category === "Mentorship";
    if (activeTab === "Events") return post.category === "Events";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="p-5 md:p-7 space-y-6 overflow-y-auto">
          
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN: Hero + Composer + Posts Feed (approx 8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-[#163354] bg-gradient-to-r from-[#07152b] via-[#091e3d] to-[#0a2347] p-6 md:p-8 shadow-xl">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  
                  <div className="space-y-2 max-w-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                          Community
                        </h1>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-1">
                      Connect, discuss, and grow with fellow learners, experts, and industry professionals.
                    </p>
                  </div>

                  {/* Right speech bubbles badge */}
                  <div className="hidden sm:flex shrink-0 p-3.5 rounded-2xl bg-[#0a1f3d] border border-cyan-500/30 flex items-center gap-3 shadow-lg">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      <div>Real Questions.</div>
                      <div className="text-cyan-400">Real People.</div>
                      <div className="text-white">Real Growth.</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Filter Tabs & Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-[#050e1d] p-1 rounded-xl border border-[#142847] overflow-x-auto max-w-full">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        activeTab === tab
                          ? "bg-[#0b284d] text-cyan-300 border border-cyan-500/30 shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-[#050e1d] border border-[#142847] px-3 py-1.5 rounded-xl text-xs text-slate-300">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium"
                    >
                      <option value="latest" className="bg-[#050e1d] text-white">Latest</option>
                      <option value="popular" className="bg-[#050e1d] text-white">Most Popular</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => alert("Filters dialog opened")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#050e1d] border border-[#142847] hover:border-cyan-500/40 rounded-xl text-xs text-slate-300 transition-colors"
                  >
                    <Filter className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Post Composer Bar */}
              <form 
                onSubmit={handleCreatePost}
                className="p-3.5 rounded-2xl bg-[#061224] border border-[#132c4e] flex items-center gap-3 shadow-lg"
              >
                {/* User Avatar */}
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  AM
                </div>

                <input
                  type="text"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share your thoughts, ask a question, or start a discussion..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                />

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => alert("Upload image attached")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#0b1f3b] transition"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Attach link")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#0b1f3b] transition"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-md shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Feed Post List */}
              <div className="space-y-4">
                {filteredPosts.map((post) => {
                  return (
                    <div
                      key={post.id}
                      className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] hover:border-cyan-500/40 transition-all duration-300 shadow-lg space-y-3"
                    >
                      {/* Post Header: Avatar, Name, Time, Category, Tag, Menu */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${post.avatarBg} flex items-center justify-center text-xs font-bold text-white shadow shrink-0`}>
                            {post.avatarInitials}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              {post.author}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {post.timeAgo} • {post.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#0b254a] text-cyan-300 border border-cyan-500/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button className="text-slate-400 hover:text-white p-1">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Post Title & Content */}
                      <div>
                        <h2 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                          onClick={() => setActivePostModal(post)}
                        >
                          {post.title}
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      {/* Post Footer: Upvotes, Comments, Action Button */}
                      <div className="pt-2 border-t border-[#122844] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <button
                            onClick={() => handleUpvote(post.id)}
                            className={`flex items-center gap-1.5 font-medium transition-colors ${
                              post.isUpvoted ? "text-cyan-400" : "hover:text-white"
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${post.isUpvoted ? "fill-current" : ""}`} />
                            <span>{post.upvotes} Upvotes</span>
                          </button>

                          <button 
                            onClick={() => setActivePostModal(post)}
                            className="flex items-center gap-1.5 font-medium hover:text-white transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{post.commentsCount} Comments</span>
                          </button>
                        </div>

                        <button
                          onClick={() => setActivePostModal(post)}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {post.actionLabel}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT COLUMN: Featured Communities + Top Contributors + CTA (approx 4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Widget 1: Featured Communities */}
              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Featured Communities
                  </div>
                  <button className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Comm 1 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#091b36] transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Web Development</div>
                        <div className="text-[10px] text-slate-400">12.4k members</div>
                      </div>
                    </div>
                  </div>

                  {/* Comm 2 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#091b36] transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">AI & Machine Learning</div>
                        <div className="text-[10px] text-slate-400">10.8k members</div>
                      </div>
                    </div>
                  </div>

                  {/* Comm 3 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#091b36] transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Data Science</div>
                        <div className="text-[10px] text-slate-400">8.2k members</div>
                      </div>
                    </div>
                  </div>

                  {/* Comm 4 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#091b36] transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Cloud & DevOps</div>
                        <div className="text-[10px] text-slate-400">6.7k members</div>
                      </div>
                    </div>
                  </div>

                  {/* Comm 5 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#091b36] transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Cybersecurity</div>
                        <div className="text-[10px] text-slate-400">5.3k members</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 2: Top Contributors */}
              <div className="p-5 rounded-2xl bg-[#061224] border border-[#132c4e] space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    Top Contributors
                  </div>
                  <button className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Rank 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600/80 flex items-center justify-center text-xs font-bold text-white">
                        RM
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Rahul Mehta</div>
                        <div className="text-[10px] text-slate-400">320 contributions</div>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                      1
                    </div>
                  </div>

                  {/* Rank 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600/80 flex items-center justify-center text-xs font-bold text-white">
                        SP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Sneha Patel</div>
                        <div className="text-[10px] text-slate-400">280 contributions</div>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                      2
                    </div>
                  </div>

                  {/* Rank 3 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-600/80 flex items-center justify-center text-xs font-bold text-white">
                        AD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Arjun Desai</div>
                        <div className="text-[10px] text-slate-400">210 contributions</div>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                      3
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 3: Be a Part of Something Bigger Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#091e3d] via-[#081831] to-[#040c1a] border border-cyan-500/20 text-center relative overflow-hidden shadow-xl space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Be a part of something bigger
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Share. Learn. Grow.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Discussion Modal */}
      {activePostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#07152b] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActivePostModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${activePostModal.avatarBg} flex items-center justify-center text-xs font-bold text-white`}>
                {activePostModal.avatarInitials}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{activePostModal.author}</div>
                <div className="text-[10px] text-slate-400">{activePostModal.timeAgo} • {activePostModal.category}</div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">{activePostModal.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{activePostModal.content}</p>

            {/* Simulated comments */}
            <div className="space-y-2 pt-2 border-t border-[#142e4e]">
              <div className="text-xs font-bold text-white">Responses ({activePostModal.commentsCount})</div>
              <div className="p-3 rounded-xl bg-[#040c1a] border border-[#142e4e] space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-cyan-300">Sneha Patel</span>
                  <span className="text-slate-500">1h ago</span>
                </div>
                <p className="text-xs text-slate-300">
                  Great question! For single T4 instances, definitely consider 4-bit AWQ or bitsandbytes quantization with fp16 activations.
                </p>
              </div>
            </div>

            {/* Quick response form */}
            <div className="flex gap-2 pt-2">
              <input 
                type="text" 
                placeholder="Write your response..." 
                className="flex-1 bg-[#040c1a] border border-[#142e4e] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button 
                onClick={() => {
                  alert("Comment posted!");
                  setActivePostModal(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
