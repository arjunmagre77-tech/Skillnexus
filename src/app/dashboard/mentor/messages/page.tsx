"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  Phone, Video, MoreVertical, Paperclip, Smile, Send, 
  FileText, Download, CheckCheck, Building2, Cloud, 
  Rocket, Server, Search, Sparkles, X
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "peer" | "user";
  text: string;
  time: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

interface ConversationItem {
  id: string;
  name: string;
  roleType: "Mentor" | "Mentee" | "Company" | "Partner";
  affiliation: string;
  preview: string;
  time: string;
  unreadCount?: number;
  avatarType: "image" | "icon" | "aws";
  avatarUrl?: string;
  iconBg?: string;
  category: "Mentors" | "Mentees" | "Groups" | "Companies";
  messages: ChatMessage[];
}

const mockConversations: ConversationItem[] = [
  {
    id: "conv_1",
    name: "Aarav Sharma",
    roleType: "Mentor",
    affiliation: "IIT Bombay",
    preview: "Great! Looking forward to your session...",
    time: "11:15 AM",
    unreadCount: 1,
    avatarType: "image",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
    category: "Mentors",
    messages: [
      {
        id: "m_1",
        sender: "peer",
        text: "Hi Anjani! 👋\n\nI reviewed your project code. It looks good overall! I've added a few suggestions to improve the structure and performance. Let me know if you'd like to discuss them in detail.",
        time: "10:30 AM"
      },
      {
        id: "m_2",
        sender: "user",
        text: "Hi Aarav, looks good! I will review the log replication logic before our 5 PM call. Thanks for the feedback!",
        time: "11:15 AM"
      },
      {
        id: "m_3",
        sender: "peer",
        text: "Great! Feel free to reach out if you get stuck.\nAlso, I've shared some resources on distributed systems that might help.",
        time: "11:20 AM",
        attachment: {
          name: "Distributed Systems Resources",
          size: "2.4 MB • PDF",
          type: "pdf"
        }
      }
    ]
  },
  {
    id: "conv_2",
    name: "Priya Nair",
    roleType: "Mentee",
    affiliation: "BITS Pilani",
    preview: "Thank you for the guidance! Could you...",
    time: "10:42 AM",
    unreadCount: 2,
    avatarType: "image",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    category: "Mentees",
    messages: [
      {
        id: "m_201",
        sender: "peer",
        text: "Thank you for the guidance! Could you review my revised system architecture diagram for the mock interview?",
        time: "10:42 AM"
      }
    ]
  },
  {
    id: "conv_3",
    name: "Rohan Gupta",
    roleType: "Mentor",
    affiliation: "NIT Trichy",
    preview: "Sure, I'll share the resources today.",
    time: "Yesterday",
    avatarType: "image",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    category: "Mentors",
    messages: [
      {
        id: "m_301",
        sender: "peer",
        text: "Sure, I'll share the resources today. Focus on the vector quantization modules first.",
        time: "Yesterday"
      }
    ]
  },
  {
    id: "conv_4",
    name: "TechCorp India",
    roleType: "Company",
    affiliation: "Enterprise Software",
    preview: "We are excited to share the new intern...",
    time: "Yesterday",
    avatarType: "icon",
    iconBg: "bg-blue-600",
    category: "Companies",
    messages: [
      {
        id: "m_401",
        sender: "peer",
        text: "We are excited to share the new internship opportunities for your students.",
        time: "Yesterday"
      }
    ]
  },
  {
    id: "conv_5",
    name: "CloudSystems Ltd",
    roleType: "Company",
    affiliation: "Cloud & Migration",
    preview: "Thank you for applying. We will get back ...",
    time: "2 days ago",
    avatarType: "icon",
    iconBg: "bg-cyan-600",
    category: "Companies",
    messages: [
      {
        id: "m_501",
        sender: "peer",
        text: "Thank you for applying. We will get back with interview dates for your cohort.",
        time: "2 days ago"
      }
    ]
  },
  {
    id: "conv_6",
    name: "NexaStart Tech",
    roleType: "Partner",
    affiliation: "FinTech & Web3",
    preview: "Your profile looks great. Let's schedule ...",
    time: "3 days ago",
    avatarType: "icon",
    iconBg: "bg-indigo-600",
    category: "Companies",
    messages: [
      {
        id: "m_601",
        sender: "peer",
        text: "Your profile looks great. Let's schedule a partnership discussion next Tuesday.",
        time: "3 days ago"
      }
    ]
  },
  {
    id: "conv_7",
    name: "Amazon Web Services",
    roleType: "Company",
    affiliation: "Cloud & Distributed Systems",
    preview: "Here are the next steps for the interview...",
    time: "4 days ago",
    avatarType: "aws",
    iconBg: "bg-slate-900",
    category: "Companies",
    messages: [
      {
        id: "m_701",
        sender: "peer",
        text: "Here are the next steps for the upcoming campus recruitment drive.",
        time: "4 days ago"
      }
    ]
  }
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ConversationItem[]>(mockConversations);
  const [activeConvId, setActiveConvId] = useState<string>("conv_1");
  const [activeCategory, setActiveCategory] = useState<"All" | "Mentors" | "Mentees" | "Groups">("All");
  const [inputText, setInputText] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [callActive, setCallActive] = useState<"audio" | "video" | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Mentors") return c.roleType === "Mentor";
    if (activeCategory === "Mentees") return c.roleType === "Mentee";
    if (activeCategory === "Groups") return c.category === "Groups";
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: inputText,
      time: "Just now"
    };

    setConversations(conversations.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          preview: inputText,
          time: "Just now",
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setInputText("");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex">
      <DashboardSidebar role="MENTOR" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 flex min-w-0 overflow-hidden">
          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Left Column: Conversations List */}
          <div className="w-80 md:w-96 bg-[#040b17] border-r border-[#10223b] flex flex-col shrink-0">
            {/* Header & Tabs */}
            <div className="p-5 border-b border-[#10223b] space-y-4">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Messages
              </h1>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {(["All", "Mentors", "Mentees", "Groups"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                      activeCategory === tab
                        ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                        : "bg-[#09182d] text-slate-400 hover:text-slate-200 border border-[#142d4f]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#0c1a2e]">
              {filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full p-4 flex items-start gap-3.5 text-left transition-all group ${
                      isSelected
                        ? "bg-[#081b33] border-l-4 border-cyan-400"
                        : "hover:bg-[#061224]"
                    }`}
                  >
                    {/* Avatar */}
                    {conv.avatarType === "image" ? (
                      <img
                        src={conv.avatarUrl}
                        alt={conv.name}
                        className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-700"
                      />
                    ) : conv.avatarType === "aws" ? (
                      <div className="w-11 h-11 rounded-full bg-[#131f2e] border border-[#23354a] flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-black text-amber-500 tracking-tight">aws</span>
                      </div>
                    ) : (
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white shadow ${conv.iconBg}`}>
                        {conv.name.includes("TechCorp") ? (
                          <Server className="w-5 h-5 text-white" />
                        ) : conv.name.includes("CloudSystems") ? (
                          <Cloud className="w-5 h-5 text-white" />
                        ) : (
                          <Rocket className="w-5 h-5 text-white" />
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                          {conv.name}
                        </span>
                        <span className="text-[10px] text-slate-500 shrink-0">
                          {conv.time}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        <span className="font-medium text-slate-300">{conv.roleType}</span> • {conv.affiliation}
                      </div>

                      <div className="text-xs text-slate-400 truncate mt-1 flex items-center justify-between">
                        <span className="truncate">{conv.preview}</span>
                        {conv.unreadCount && (
                          <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 ml-2">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Chat Thread */}
          <div className="flex-1 flex flex-col bg-[#030712] min-w-0">
            {/* Top Chat Header */}
            <div className="px-6 py-4 border-b border-[#10223b] bg-[#040b17] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {activeConversation.avatarType === "image" ? (
                  <img
                    src={activeConversation.avatarUrl}
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-xs">
                    {activeConversation.name.substring(0, 2).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white truncate">
                      {activeConversation.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {activeConversation.roleType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {activeConversation.affiliation} • Code Review &amp; Architecture
                  </div>
                </div>
              </div>

              {/* Action Buttons: Audio call, Video call, More */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCallActive("audio")}
                  className="p-2.5 rounded-full bg-[#08182f] border border-[#142d4f] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                  title="Audio Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCallActive("video")}
                  className="p-2.5 rounded-full bg-[#08182f] border border-[#142d4f] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast(`Settings opened for ${activeConversation.name}`)}
                  className="p-2.5 rounded-full bg-[#08182f] border border-[#142d4f] text-slate-300 hover:text-white transition"
                  title="More Options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Date Separator */}
              <div className="flex items-center justify-center my-2">
                <span className="px-3.5 py-1 rounded-full bg-[#09172a] border border-[#122744] text-[11px] font-semibold text-slate-400">
                  Today
                </span>
              </div>

              {/* Messages */}
              {activeConversation.messages.map((msg) => {
                const isPeer = msg.sender === "peer";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isPeer ? "justify-start" : "justify-end"}`}
                  >
                    {isPeer && (
                      activeConversation.avatarType === "image" ? (
                        <img
                          src={activeConversation.avatarUrl}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-700 mt-1"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-[10px] mt-1">
                          {activeConversation.name.substring(0, 2)}
                        </div>
                      )
                    )}

                    <div className={`space-y-1.5 max-w-xl ${isPeer ? "items-start" : "items-end flex flex-col"}`}>
                      {/* Bubble */}
                      <div
                        className={`p-4 rounded-2xl text-xs leading-relaxed ${
                          isPeer
                            ? "bg-[#091930] border border-[#142d4f] text-slate-200 rounded-tl-sm"
                            : "bg-[#0070c9] text-white font-medium rounded-tr-sm shadow-md"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Optional Attachment Card */}
                      {msg.attachment && (
                        <div className="p-3 rounded-2xl bg-[#071426] border border-[#142d4f] flex items-center justify-between gap-4 max-w-sm mt-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <div className="text-xs font-bold text-white">
                                {msg.attachment.name}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {msg.attachment.size}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => showToast(`Downloaded ${msg.attachment?.name}.pdf`)}
                            className="p-2 rounded-xl hover:bg-slate-800 text-cyan-400 transition"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 px-1">
                        <span>{msg.time}</span>
                        {!isPeer && <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                    </div>

                    {!isPeer && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-1 shadow-md">
                        AM
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 bg-[#040b17] border-t border-[#10223b]">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2.5 bg-[#071324] border border-[#112642] focus-within:border-cyan-500/60 rounded-full px-4 py-2 transition"
              >
                <button
                  type="button"
                  onClick={() => showToast("File attachment dialog opened")}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 transition"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setInputText(prev => prev + " 👍")}
                  className="p-1.5 text-slate-400 hover:text-amber-400 transition"
                >
                  <Smile className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 flex items-center justify-center transition shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Call Dialog */}
      {callActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#071324] border border-[#14263f] rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 animate-pulse">
              {callActive === "video" ? <Video className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {callActive === "video" ? "Starting Video Call" : "Calling Mentor"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{activeConversation.name} ({activeConversation.affiliation})</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setCallActive(null)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
