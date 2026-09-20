"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import {
  Building2, Handshake, Users, Award, Plus, Search,
  Mail, CheckCircle2, Sparkles, X, Send, LayoutGrid, LayoutList, Download,
  Heart
} from "lucide-react";

interface PartnerRecord {
  id: string;
  name: string;
  logoText: string;
  logoColor: string;
  domain: string;
  tier: "Tier-1 Tech" | "Enterprise" | "High-Growth Startup";
  mouStatus: "Active MOU" | "Renewal Pending" | "Guest Partner";
  offersIssued: number;
  avgStipend: string;
  topTechStacks: string[];
  hrContact: string;
}

const mockPartners: PartnerRecord[] = [
  {
    id: "p_1",
    name: "Google",
    logoText: "G",
    logoColor: "bg-white text-[#4285F4] border border-slate-700",
    domain: "AI & Cloud Platforms",
    tier: "Tier-1 Tech",
    mouStatus: "Active MOU",
    offersIssued: 42,
    avgStipend: "₹1.5 Lakh/mo",
    topTechStacks: ["PyTorch", "System Design", "Go", "C++"],
    hrContact: "campus-hiring@google.com"
  },
  {
    id: "p_2",
    name: "Microsoft",
    logoText: "⊞",
    logoColor: "bg-[#0078D4] text-white",
    domain: "Software & Cloud Services",
    tier: "Tier-1 Tech",
    mouStatus: "Active MOU",
    offersIssued: 38,
    avgStipend: "₹1.4 Lakh/mo",
    topTechStacks: ["Azure", "TypeScript", "C#", "React"],
    hrContact: "university-india@microsoft.com"
  },
  {
    id: "p_3",
    name: "Stripe",
    logoText: "S",
    logoColor: "bg-[#6772E5] text-white",
    domain: "FinTech Infrastructure",
    tier: "Tier-1 Tech",
    mouStatus: "Renewal Pending",
    offersIssued: 18,
    avgStipend: "₹1.8 Lakh/mo",
    topTechStacks: ["Ruby", "System Architecture", "Node.js"],
    hrContact: "recruiting@stripe.com"
  },
  {
    id: "p_4",
    name: "TechCorp India",
    logoText: "T",
    logoColor: "bg-blue-700 text-white",
    domain: "Enterprise Software Services",
    tier: "Enterprise",
    mouStatus: "Active MOU",
    offersIssued: 65,
    avgStipend: "₹85,000/mo",
    topTechStacks: ["Java", "Spring Boot", "React", "SQL"],
    hrContact: "hr@techcorp.com"
  },
  {
    id: "p_5",
    name: "CloudSystems Ltd",
    logoText: "☁",
    logoColor: "bg-cyan-700 text-white",
    domain: "Cloud Computing & Migration",
    tier: "Enterprise",
    mouStatus: "Active MOU",
    offersIssued: 30,
    avgStipend: "₹90,000/mo",
    topTechStacks: ["AWS", "Docker", "Kubernetes", "Linux"],
    hrContact: "hr@cloudsystems.com"
  },
  {
    id: "p_6",
    name: "AI Vision Labs",
    logoText: "👁",
    logoColor: "bg-slate-800 text-white",
    domain: "Computer Vision & AI",
    tier: "High-Growth Startup",
    mouStatus: "Renewal Pending",
    offersIssued: 12,
    avgStipend: "₹1.2 Lakh/mo",
    topTechStacks: ["Python", "TensorFlow", "OpenCV", "CUDA"],
    hrContact: "careers@aivision.io"
  },
  {
    id: "p_7",
    name: "NexaStart Tech",
    logoText: "🚀",
    logoColor: "bg-indigo-700 text-white",
    domain: "FinTech & Web3",
    tier: "High-Growth Startup",
    mouStatus: "Guest Partner",
    offersIssued: 15,
    avgStipend: "₹75,000/mo",
    topTechStacks: ["React", "Node.js", "Solidity", "PostgreSQL"],
    hrContact: "talent@nexastart.com"
  },
  {
    id: "p_8",
    name: "Amazon Web Services",
    logoText: "a",
    logoColor: "bg-[#FF9900] text-slate-900",
    domain: "Cloud & Distributed Systems",
    tier: "Tier-1 Tech",
    mouStatus: "Active MOU",
    offersIssued: 55,
    avgStipend: "₹1.3 Lakh/mo",
    topTechStacks: ["Java", "AWS", "Distributed Systems", "Python"],
    hrContact: "aws-campus@amazon.com"
  }
];

export default function IndustryPartnersPage() {
  const [partners, setPartners] = useState<PartnerRecord[]>(mockPartners);
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedMou, setSelectedMou] = useState("All MOUs");
  const [selectedTier, setSelectedTier] = useState("All Partner Tiers");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newTier, setNewTier] = useState<PartnerRecord["tier"]>("Tier-1 Tech");
  const [newContact, setNewContact] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.domain.toLowerCase().includes(search.toLowerCase());
    const matchesMou = selectedMou === "All MOUs" || p.mouStatus === selectedMou;
    const matchesTier = selectedTier === "All Partner Tiers" || p.tier === selectedTier;
    return matchesSearch && matchesMou && matchesTier;
  });

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDomain) return;
    const newEntry: PartnerRecord = {
      id: `p_${Date.now()}`,
      name: newName,
      logoText: newName.charAt(0),
      logoColor: "bg-slate-700 text-white",
      domain: newDomain,
      tier: newTier,
      mouStatus: "Active MOU",
      offersIssued: 0,
      avgStipend: "₹1.0 Lakh/mo",
      topTechStacks: ["Full Stack", "Cloud"],
      hrContact: newContact || "hr@partner.com"
    };
    setPartners([newEntry, ...partners]);
    setIsModalOpen(false);
    setNewName(""); setNewDomain("");
    showToast(`🤝 Strategic MOU signed with ${newEntry.name}!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="COLLEGE" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Industry Partners"
          subtitle="Collaborate with leading companies and organizations to create better opportunities for your students."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Page Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Industry Partners</span>
              </div>
              <h1 className="text-2xl font-black text-white">Our Industry Partners</h1>
              <p className="text-sm text-slate-400 mt-0.5">Collaborate with leading companies and organizations to create better opportunities for your students.</p>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recruiter Partners</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">150+</div>
              <p className="text-xs text-cyan-400 font-semibold cursor-pointer hover:underline">Active corporate partners ↗</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active MOUs</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Handshake className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">42</div>
              <p className="text-xs text-emerald-400 font-semibold cursor-pointer hover:underline">Curriculum co-design & hiring ↗</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry Mentors</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">85</div>
              <p className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline">Engaged in mock reviews ↗</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Internship Stipend</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">₹1.4 Lakh/mo</div>
              <p className="text-xs text-amber-400 font-semibold cursor-pointer hover:underline">Offered across network ↗</p>
            </div>
          </div>

          {/* Search + Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search partner company or domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)} className="py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none">
                <option>All Domains</option>
                <option>AI & Cloud</option>
                <option>FinTech</option>
                <option>Enterprise Software</option>
              </select>
              <select value={selectedMou} onChange={(e) => setSelectedMou(e.target.value)} className="py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none">
                <option>All MOUs</option>
                <option value="Active MOU">Active MOU</option>
                <option value="Renewal Pending">Renewal Pending</option>
                <option value="Guest Partner">Guest Partner</option>
              </select>
              <select value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)} className="py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none">
                <option>All Partner Tiers</option>
                <option value="Tier-1 Tech">Tier-1 Tech</option>
                <option value="Enterprise">Enterprise</option>
                <option value="High-Growth Startup">High-Growth Startup</option>
              </select>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-xl border transition ${viewMode === "grid" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-xl border transition ${viewMode === "list" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPartners.map((p) => (
              <div key={p.id} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  {/* Company header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${p.logoColor} font-black text-lg flex items-center justify-center shadow-md shrink-0`}>
                        {p.logoText}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition">{p.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{p.domain}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      p.mouStatus === "Active MOU"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : p.mouStatus === "Renewal Pending"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                    }`}>
                      {p.mouStatus}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Campus Offers</span>
                      <strong className="text-white text-sm">{p.offersIssued} Offers</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Avg Stipend</span>
                      <strong className="text-cyan-400 text-sm">{p.avgStipend}</strong>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Skill Requirements:</span>
                    <div className="flex flex-wrap gap-1">
                      {p.topTechStacks.map((st) => (
                        <span key={st} className="px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30 text-[10px] font-semibold">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => showToast(`Invitation dispatched to ${p.name} campus recruiting team!`)}
                    className="flex-1 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600/60 text-cyan-300 font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Invite to Drive
                  </button>
                  <a
                    href={`mailto:${p.hrContact}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title={`Contact HR: ${p.hrContact}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}

            {/* Grow Together CTA Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 hover:border-indigo-400/60 transition flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">Grow Together</h4>
                    <p className="text-xs text-slate-400">Partner with us to shape industry-ready talent and build a stronger future.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => showToast("📄 Partner Brochure PDF generated!")}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Download className="w-3.5 h-3.5" />
                Download Partner Brochure (PDF)
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Add MOU Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Handshake className="w-5 h-5 text-emerald-400" />
                Register New Industry Partner MOU
              </h3>
              <p className="text-xs text-slate-400 mt-1">Formalize corporate recruitment & curriculum partnership agreement.</p>
            </div>
            <form onSubmit={handleAddPartner} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Company / Industry Partner Name</label>
                <input type="text" required placeholder="e.g. Anthropic / Snowflake" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Industry Domain</label>
                <input type="text" required placeholder="e.g. Generative AI / Cloud Data Warehousing" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Partner Tier Category</label>
                <select value={newTier} onChange={(e) => setNewTier(e.target.value as PartnerRecord["tier"])} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none">
                  <option value="Tier-1 Tech">Tier-1 Tech Giant</option>
                  <option value="Enterprise">Enterprise MNC</option>
                  <option value="High-Growth Startup">High-Growth Startup</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Corporate Contact Email</label>
                <input type="email" placeholder="e.g. campus@company.com" value={newContact} onChange={(e) => setNewContact(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="pt-3 flex gap-3">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30">Sign & Register MOU</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
