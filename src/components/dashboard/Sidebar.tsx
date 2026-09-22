"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Target, BookOpen, Award, Briefcase, 
  FolderKanban, FileText, Bot, User, Building2, Users, 
  BarChart3, LogOut, CheckCircle2, ShieldCheck,
  Calendar, MessageSquare, PlusCircle, Home, LayoutGrid,
  CreditCard, Code2, Sparkles, ShoppingBag, Wrench
} from "lucide-react";

interface SidebarProps {
  role?: "STUDENT" | "COLLEGE" | "COMPANY" | "MENTOR";
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  user?: {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
    streakDays?: number;
    points?: number;
  };
}

interface NavItem {
  id?: string;
  label: string;
  href: string;
  icon: any;
  badge?: string;
  count?: number;
}

export default function DashboardSidebar({ role = "STUDENT", activeTab, onSelectTab, user }: SidebarProps) {
  const pathname = usePathname();

  const studentLinks: NavItem[] = [
    { label: "Home", href: "/dashboard/student", icon: Home },
    { label: "Skills & Learning", href: "/dashboard/student/skills", icon: LayoutGrid },
    { label: "AI Learning Roadmap", href: "/dashboard/student/learning", icon: Target },
    { label: "Assessments & Quizzes", href: "/dashboard/student/assessments", icon: FileText },
    { label: "Internships", href: "/dashboard/student/internships", icon: Briefcase },
    { label: "Projects", href: "/dashboard/student/projects", icon: FolderKanban },
    { label: "Job Matches", href: "/dashboard/student/jobs", icon: Building2 },
    { label: "My Applications", href: "/dashboard/student/applications", icon: CheckCircle2 },
    { label: "Skill Gap Analyzer", href: "/dashboard/student/ai-tools", icon: Target },
    { label: "Community", href: "/dashboard/student/community", icon: Users },
    { label: "Profile & Badges", href: "/dashboard/student/profile", icon: ShieldCheck },
  ];

  const collegeLinks: NavItem[] = [
    { label: "Institutional Overview", href: "/dashboard/college", icon: LayoutDashboard },
    { label: "Student Roster", href: "/dashboard/college/students", icon: Users },
    { label: "Curriculum Skill Gaps", href: "/dashboard/college/analytics", icon: BarChart3, badge: "Heatmap" },
    { label: "Placement Tracker", href: "/dashboard/college/placements", icon: Briefcase },
    { label: "Industry Partners", href: "/dashboard/college/partners", icon: Building2 },
  ];

  const companyLinks: NavItem[] = [
    { id: "recruiter-hub", label: "Recruiter Hub", href: "/dashboard/company", icon: Briefcase },
    { id: "talent-discovery", label: "Talent Discovery", href: "/dashboard/company/talent-search", icon: Users },
    { id: "post-opportunity", label: "Post Opportunity", href: "/dashboard/company/postings", icon: PlusCircle },
    { id: "applicants-pipeline", label: "Applicants Pipeline", href: "/dashboard/company/applicants", icon: Users },
    { id: "industry-projects", label: "Industry Projects", href: "/dashboard/company/projects", icon: FolderKanban },
  ];

  const mentorLinks: NavItem[] = [
    { label: "Mentor Workspace", href: "/dashboard/mentor", icon: LayoutDashboard },
    { label: "Mentor Sessions", href: "/dashboard/mentor/sessions", icon: Calendar },
    { label: "Project Reviews", href: "/dashboard/mentor/reviews", icon: FolderKanban },
    { label: "Messages", href: "/dashboard/mentor/messages", icon: MessageSquare },
  ];

  const links = role === "COLLEGE" ? collegeLinks 
    : role === "COMPANY" ? companyLinks 
    : role === "MENTOR" ? mentorLinks 
    : studentLinks;

  return (
    <aside className="w-64 bg-[#050c18] border-r border-[#12233b] h-screen sticky top-0 flex flex-col justify-between p-4 z-40 text-slate-300 select-none">
      <div>
        {/* Brand Logo matching screenshot */}
        <Link href="/" className="flex items-center gap-2.5 px-2 py-3 mb-5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <div className="font-extrabold text-xl text-white tracking-tight flex items-center">
            Skill<span className="text-cyan-400">Link</span>
          </div>
        </Link>

        {/* Links List */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            
            // Check active state
            const isActive = role === "COMPANY" && activeTab
              ? activeTab === link.id
              : pathname === link.href;

            const handleClick = (e: React.MouseEvent) => {
              if (role === "COMPANY" && onSelectTab && link.id) {
                e.preventDefault();
                onSelectTab(link.id);
              }
            };

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClick}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-[#0b2240] text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#091526]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span>{link.label}</span>
                </div>
                
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Banner matching screenshot */}
      <div className="pt-3">
        <div className="rounded-2xl bg-[#081528] border border-[#14263f] hover:border-[#1e3c63] p-3 text-white group transition cursor-pointer flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
              <svg className="w-5 h-5 text-white transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-bold text-white leading-snug">
                {role === "MENTOR" ? "Support Your Future Talent" : "Build Your Future"}
              </h4>
              {role === "MENTOR" ? null : <p className="text-[10px] text-slate-300 font-medium">with SkillLink</p>}
              <p className="text-[9px] text-slate-400 mt-0.5">
                {role === "MENTOR" ? "Mentor • Guide • Grow" : "Learn • Build • Grow"}
              </p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
