"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, Zap, Target, TrendingUp, Award, Users, Building2, 
  ChevronDown, Star, CheckCircle, BarChart3, BookOpen, Briefcase,
  Brain, Flame, Trophy, Shield, Sparkles, Globe, ChevronRight,
  PlayCircle, Share2
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Students Upskilled" },
  { value: "200+", label: "Industry Partners" },
  { value: "1.2K+", label: "Internships Posted" },
  { value: "94%", label: "Placement Rate" },
];

const features = [
  { icon: Brain, title: "AI Skill Intelligence Engine", desc: "Automatically extract and map your skills from resume, projects, and experience using advanced AI.", color: "#00D4FF" },
  { icon: Target, title: "Skill Gap Analysis", desc: "Compare your current skills with real industry requirements and get prioritized improvement plans.", color: "#8B5CF6" },
  { icon: TrendingUp, title: "Personalized Career Roadmap", desc: "Get a custom learning path from your current state to your target role with resource recommendations.", color: "#10B981" },
  { icon: Briefcase, title: "AI Internship Matching", desc: "See your match score for every internship with detailed skill-by-skill breakdown.", color: "#F59E0B" },
  { icon: BarChart3, title: "Placement Readiness Score", desc: "A comprehensive 100-point score across technical skills, projects, communication, and interview readiness.", color: "#EF4444" },
  { icon: Trophy, title: "Gamified Learning", desc: "Maintain streaks, earn NexaPoints, unlock badges, and climb leaderboards as you grow your skills.", color: "#D97706" },
];

const testimonials = [
  { name: "Priya Nair", role: "Student, NITK", img: "PN", quote: "SkillNexus showed me exactly which skills I was missing for Data Science roles. Got my first internship at DataWorks in 3 months!", rating: 5, color: "#00D4FF" },
  { name: "Dr. Ramesh Kumar", role: "Placement Officer, IIT Bombay", img: "RK", quote: "The department-wise skill gap heatmap is incredible. We can now target training programs where students need it most.", rating: 5, color: "#8B5CF6" },
  { name: "Anika Shah", role: "HR Lead, TechCorp India", img: "AS", quote: "We find much better candidates through SkillNexus talent search than traditional resume screening. Verified skills actually mean something.", rating: 5, color: "#10B981" },
];

const pricingPlans = [
  {
    name: "Free", price: "₹0", period: "forever",
    features: ["Basic Skill Mapping", "Basic Skill Gap Analysis", "5 Assessments/month", "Internship Marketplace", "Basic Career Roadmap", "Basic AI Assistant (10 messages)"],
    cta: "Get Started Free", highlight: false,
  },
  {
    name: "Premium", price: "₹199", period: "per month",
    features: ["Advanced AI Skill Analysis", "Unlimited AI Career Assistant", "Advanced Resume Analyzer", "Unlimited Mock Interviews", "Advanced InternshipMatching", "CareerPilot + SkillPilot", "Premium Learning Resources", "Detailed Placement Insights", "Priority Support"],
    cta: "Start Premium", highlight: true, badge: "Most Popular",
  },
];

const faqs = [
  { q: "How does the Skill Gap Analysis work?", a: "SkillNexus compares your self-declared and assessed skills against the requirements of real job postings and internships you're targeting, then generates a prioritized gap report with recommended actions." },
  { q: "What is the Placement Readiness Score?", a: "It's a composite score out of 100 calculated across 7 dimensions: Technical Skills, Projects, Internships, Communication, Problem Solving, Resume Quality, and Interview Readiness." },
  { q: "Can I use NexaPoints to pay for Premium?", a: "Yes! NexaPoints can reduce your Premium cost. 500 points = ₹50 off, 1000 points = ₹100 off, and 2000 points = free Premium for one month. Points have no cash value." },
  { q: "How are skills verified?", a: "Skills go through 3 verification levels: Self-Declared (you claim it), Assessed (you pass our platform test), and Industry-Verified (a company or mentor confirms it from real work)." },
  { q: "Is SkillNexus free for colleges?", a: "Yes! College admin dashboards including skill analytics, department heatmaps, and placement tracking are completely free. Enterprise plans are available for advanced features." },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const duration = 1500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "var(--primary)", color: "var(--text)", minHeight: "100vh" }}>
      {/* ─── NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.3s ease",
        padding: "0 1.5rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, background: "var(--gradient-accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="#0A1628" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>SkillNexus</span>
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem" }} className="desktop-nav">
            {[["Features", "#features"], ["For Students", "/dashboard/student"], ["For Colleges", "/dashboard/college"], ["Pricing", "#pricing"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                {label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/login" className="btn btn-secondary btn-sm">Sign In</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>
        {/* Background effects */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="animate-fade-in">
            <div className="section-tag" style={{ margin: "0 auto 1.5rem" }}>
              <Sparkles size={12} /> AI-Powered Career Intelligence
            </div>

            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: 900, margin: "0 auto 1.5rem" }}>
              Bridge the Gap Between{" "}
              <span className="text-gradient">Campus Skills</span>{" "}
              and Industry Careers
            </h1>

            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--text-muted)", maxWidth: 680, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
              SkillNexus uses AI to map your skills, identify industry gaps, build personalized career paths, connect you with real internships, and help you become placement-ready.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Link href="/register" className="btn btn-primary btn-lg">
                Start Your Career Journey <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard/college" className="btn btn-secondary btn-lg">
                Explore for Colleges
              </Link>
            </div>

            {/* Journey Visual */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", padding: "1.25rem 2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, maxWidth: 800, margin: "0 auto" }}>
              {["Skill Map", "Gap Analysis", "Roadmap", "Assessments", "Projects", "Internship", "Placement"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ padding: "4px 12px", background: i < 3 ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${i < 3 ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 100, fontSize: "0.8rem", fontWeight: 600, color: i < 3 ? "var(--accent)" : "var(--text-muted)" }}>
                    {step}
                  </span>
                  {i < 6 && <ChevronRight size={14} color="var(--text-subtle)" />}
                </div>
              ))}
            </div>
          </div>

          {/* Demo Card Preview */}
          <div className="animate-fade-in delay-300" style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 900, margin: "4rem auto 0" }}>
            <div className="card" style={{ textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 4 }}>PLACEMENT READINESS</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif" }}>82<span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>/100</span></div>
                </div>
                <div style={{ width: 48, height: 48, background: "rgba(16,185,129,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target size={22} color="#10B981" />
                </div>
              </div>
              <div className="progress-bar" style={{ marginBottom: 8 }}><div className="progress-fill" style={{ width: "82%" }} /></div>
              <div style={{ fontSize: "0.75rem", color: "#10B981" }}>↑ +4 this week</div>
            </div>

            <div className="card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8 }}>SKILL GAP ANALYSIS</div>
              {[{ skill: "React", curr: 5, req: 8 }, { skill: "Docker", curr: 2, req: 7 }, { skill: "Python", curr: 8, req: 8 }].map(s => (
                <div key={s.skill} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: 3 }}>
                    <span>{s.skill}</span>
                    <span style={{ color: s.curr >= s.req ? "#10B981" : "#EF4444" }}>{s.curr >= s.req ? "✓ Ready" : `Gap: ${s.req - s.curr}`}</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className={`progress-fill${s.curr >= s.req ? "-success" : ""}`} style={{ width: `${(s.curr / 10) * 100}%`, height: "100%", borderRadius: 100, background: s.curr >= s.req ? "#10B981" : "var(--gradient-accent)" }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8 }}>INTERNSHIP MATCH</div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                <div className="match-score high" style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "2px solid rgba(16,185,129,0.4)", color: "#10B981", fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.1rem" }}>92%</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>Frontend Dev Intern</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>TechCorp India · Bangalore</div>
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8 }}>Skills matched:</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["React", "JS", "Git", "TypeScript"].map(s => (
                  <span key={s} className="tag" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid var(--card-border)", borderBottom: "1px solid var(--card-border)", background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", textAlign: "center" }}>
            {stats.map(s => (
              <div key={s.label} className="animate-fade-in">
                <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-tag" style={{ margin: "0 auto 1rem" }}>The Problem</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1rem", maxWidth: 700, margin: "0 auto 1rem" }}>
            The Academia–Industry Gap is{" "}
            <span className="text-gradient-warm">Costing Students</span>
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 600, margin: "0 auto 3rem", lineHeight: 1.7 }}>
            Students graduate with degrees but lack the specific skills industries need. Companies struggle to find job-ready candidates. This gap creates wasted potential and missed opportunities.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", maxWidth: 900, margin: "0 auto" }}>
            {[
              { icon: "😔", stat: "72%", label: "of graduates feel unprepared for their first job" },
              { icon: "🏢", stat: "68%", label: "of companies say fresh graduates lack practical skills" },
              { icon: "⏱️", stat: "8 months", label: "average time to find first job after graduation" },
            ].map(p => (
              <div key={p.stat} className="card" style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{p.icon}</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", color: "#EF4444", marginBottom: "0.5rem" }}>{p.stat}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────────────────── */}
      <section className="section" id="features" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-tag" style={{ margin: "0 auto 1rem" }}>Platform Features</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700 }}>
              Everything You Need to Go from{" "}
              <span className="text-gradient">Student to Professional</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <div key={f.title} className="card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-tag" style={{ margin: "0 auto 1rem" }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700 }}>
              Your Journey from <span className="text-gradient">Day One to Dream Job</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem" }}>
            {[
              { step: "01", icon: Brain, title: "Map Skills", desc: "Upload resume or add skills manually. AI extracts your skill profile automatically.", color: "#00D4FF" },
              { step: "02", icon: Target, title: "Find Gaps", desc: "AI compares your skills with real industry requirements for your target role.", color: "#8B5CF6" },
              { step: "03", icon: BookOpen, title: "Learn & Build", desc: "Follow your personalized roadmap, take assessments, and build industry projects.", color: "#10B981" },
              { step: "04", icon: Briefcase, title: "Get Matched", desc: "Apply to internships and jobs with AI match scores. Track your applications.", color: "#F59E0B" },
              { step: "05", icon: Trophy, title: "Get Placed", desc: "Convert internships to full-time roles. Earn badges and rewards throughout.", color: "#EF4444" },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: "center", position: "relative" }}>
                {i < 4 && <div style={{ position: "absolute", top: 24, left: "60%", right: "-40%", height: 2, background: "linear-gradient(90deg, var(--card-border), transparent)", zIndex: 0 }} />}
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${s.color}18`, border: `2px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", position: "relative", zIndex: 1 }}>
                  <s.icon size={22} color={s.color} />
                </div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: s.color, marginBottom: 4, letterSpacing: "0.05em" }}>{s.step}</div>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 4 }}>{s.title}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR STAKEHOLDERS ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {[
              { icon: Users, title: "For Students", color: "#00D4FF", points: ["Know exactly which skills you're missing", "Get a personalized learning roadmap", "Find internships that match your profile", "Track your placement readiness daily", "Earn rewards for meaningful learning"] },
              { icon: Building2, title: "For Colleges", color: "#8B5CF6", points: ["See where your students have skill gaps", "Department-wise skill heatmaps", "Track placement readiness trends", "Connect with industry partners", "Free dashboards for all colleges"] },
              { icon: Briefcase, title: "For Companies", color: "#10B981", points: ["Search candidates by verified skills", "Post internships and industry projects", "Get AI-matched candidate shortlists", "Conduct platform assessments", "Build your employer brand on campus"] },
            ].map(s => (
              <div key={s.title} className="card" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <s.icon size={20} color={s.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{s.title}</h3>
                </div>
                {s.points.map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.625rem" }}>
                    <CheckCircle size={14} color={s.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
                <Link href="/register" className="btn btn-secondary btn-sm" style={{ marginTop: "1.25rem", width: "100%", justifyContent: "center" }}>
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GAMIFICATION ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="section-tag" style={{ marginBottom: "1rem" }}>Gamification</div>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
                Learning That Feels Like{" "}
                <span className="text-gradient">Winning</span>
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Career growth shouldn't feel like a chore. SkillNexus rewards meaningful learning activity with NexaPoints, streaks, and badges — not just logging in.
              </p>
              {[
                { icon: "🔥", title: "Daily Streaks", desc: "Maintain your streak by completing real learning tasks" },
                { icon: "⭐", title: "NexaPoints", desc: "Earn points for assessments, projects, and verifications" },
                { icon: "🏆", title: "Badges", desc: "Unlock achievement badges that appear on your profile" },
                { icon: "👑", title: "Leaderboard", desc: "Compete with peers in your college and department" },
              ].map(g => (
                <div key={g.title} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{g.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{g.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ARJUN SHARMA</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Career Dashboard</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 100 }}>
                  <span className="flame">🔥</span>
                  <span style={{ fontWeight: 700, color: "#EF4444", fontSize: "0.9rem" }}>12 Day Streak</span>
                </div>
              </div>
              <div className="nexa-badge" style={{ marginBottom: "1.5rem", width: "fit-content" }}>⭐ 2,450 NexaPoints</div>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.875rem" }}>Placement Readiness</span>
                  <span style={{ fontWeight: 700, color: "#10B981" }}>82%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: "82%", background: "#10B981" }} /></div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {[{ icon: "🏆", name: "First Assessment" }, { icon: "🔥", name: "30 Day Streak" }, { icon: "💻", name: "First Project" }, { icon: "🎯", name: "Placement Ready" }].map(b => (
                  <div key={b.name} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", borderRadius: 100, fontSize: "0.75rem" }}>{b.icon} {b.name}</div>
                ))}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontStyle: "italic" }}>
                "+5 TalentIQ because you completed an industry project 🚀"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-tag" style={{ margin: "0 auto 1rem" }}>Testimonials</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 700 }}>Trusted by Students, Colleges & Companies</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {testimonials.map(t => (
              <div key={t.name} className="card" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: "1rem" }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem", fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${t.color}20`, border: `2px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: t.color }}>
                    {t.img}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────────────────── */}
      <section className="section" id="pricing">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-tag" style={{ margin: "0 auto 1rem" }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 700 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Use NexaPoints to reduce or eliminate your Premium cost</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem", maxWidth: 760, margin: "0 auto" }}>
            {pricingPlans.map(p => (
              <div key={p.name} className="card" style={{ padding: "2rem", border: p.highlight ? "1px solid rgba(0,212,255,0.4)" : undefined, position: "relative", boxShadow: p.highlight ? "0 0 30px rgba(0,212,255,0.1)" : undefined }}>
                {p.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "2px 16px", background: "var(--gradient-accent)", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, color: "#0A1628", whiteSpace: "nowrap" }}>{p.badge}</div>}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif" }}>{p.price}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>/{p.period}</span>
                  </div>
                </div>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
                    <CheckCircle size={14} color={p.highlight ? "#00D4FF" : "#10B981"} />
                    <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{f}</span>
                  </div>
                ))}
                <Link href="/register" className={`btn ${p.highlight ? "btn-primary" : "btn-secondary"} btn-lg`} style={{ width: "100%", justifyContent: "center", marginTop: "1.5rem" }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
            💡 Earn NexaPoints through learning activities. Use up to ₹199 in points to get Premium free.<br />
            <span style={{ fontSize: "0.73rem", opacity: 0.7 }}>Points have no cash value and cannot be withdrawn.</span>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-tag" style={{ margin: "0 auto 1rem" }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 700 }}>Frequently Asked Questions</h2>
          </div>
          {faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: "0.75rem", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "none", border: "none", cursor: "pointer", color: "var(--text)", textAlign: "left" }}>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{f.q}</span>
                <ChevronDown size={16} style={{ transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "none", flexShrink: 0, color: "var(--text-muted)" }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 1.25rem 1rem", color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6, borderTop: "1px solid var(--card-border)", paddingTop: "1rem" }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(139,92,246,0.06) 100%)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 24 }}>
            <div className="section-tag" style={{ margin: "0 auto 1rem" }}>
              <Sparkles size={12} /> Get Started Today
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1rem" }}>
              Your Career Journey Starts{" "}
              <span className="text-gradient">Right Now</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Join 50,000+ students already using SkillNexus to become placement-ready and land their dream internships.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" className="btn btn-primary btn-lg">
                Start Free — No Credit Card <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="btn btn-secondary btn-lg">
                Demo Login
              </Link>
            </div>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
              {["✓ Free forever plan", "✓ No credit card required", "✓ 10 students onboarded in 5 minutes"].map(t => (
                <span key={t} style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--card-border)", padding: "3rem 0 2rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: 28, height: 28, background: "var(--gradient-accent)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={15} color="#0A1628" />
                </div>
                <span style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>SkillNexus</span>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 280 }}>
                AI-powered Academia–Industry Collaboration Platform bridging the gap between campus skills and industry careers.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                {[Globe, Share2, Sparkles].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, background: "var(--surface-2)", border: "1px solid var(--card-border)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "var(--transition)" }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["Features", "How It Works", "Pricing", "Changelog"] },
              { title: "For You", links: ["For Students", "For Colleges", "For Companies", "For Mentors"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.875rem" }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: "0.5rem" }}>
                    <Link href="#" style={{ color: "var(--text-muted)", fontSize: "0.875rem", textDecoration: "none" }}>{l}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ color: "var(--text-subtle)", fontSize: "0.8rem" }}>© 2024 SkillNexus. All rights reserved.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <Link key={l} href="#" style={{ color: "var(--text-subtle)", fontSize: "0.8rem", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(5"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 2fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
