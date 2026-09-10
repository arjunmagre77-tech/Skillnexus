"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

const demoAccounts = [
  { role: "Student", email: "student@demo.com", password: "demo123", color: "#00D4FF", emoji: "🎓" },
  { role: "College", email: "college@demo.com", password: "demo123", color: "#8B5CF6", emoji: "🏫" },
  { role: "Company", email: "company@demo.com", password: "demo123", color: "#10B981", emoji: "🏢" },
  { role: "Mentor",  email: "mentor@demo.com",  password: "demo123", color: "#F59E0B", emoji: "👨‍💼" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) { setError("Invalid email or password. Try a demo account below."); return; }
    router.push("/");
    router.refresh();
  }

  async function demoLogin(account: typeof demoAccounts[0]) {
    setLoading(true);
    setError("");
    setEmail(account.email);
    setPassword(account.password);
    const res = await signIn("credentials", { email: account.email, password: account.password, redirect: false });
    setLoading(false);
    if (res?.error) { setError("Demo login failed. Please try again."); return; }
    const dashMap: Record<string,string> = { Student: "/student/dashboard", College: "/college/dashboard", Company: "/company/dashboard", Mentor: "/mentor/dashboard" };
    router.push(dashMap[account.role] || "/");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", padding: "2rem 1rem" }}>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, background: "var(--gradient-accent)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={20} color="#0A1628" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>SkillNexus</span>
          </Link>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "1.5rem", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Sign in to continue your career journey</p>
        </div>

        {/* Demo Accounts */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textAlign: "center", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Quick Demo Access
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.5rem" }}>
            {demoAccounts.map(a => (
              <button key={a.role} onClick={() => demoLogin(a)} disabled={loading}
                style={{ padding: "0.625rem", background: `${a.color}10`, border: `1px solid ${a.color}30`, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget.style.background = `${a.color}20`); (e.currentTarget.style.borderColor = `${a.color}60`); }}
                onMouseLeave={e => { (e.currentTarget.style.background = `${a.color}10`); (e.currentTarget.style.borderColor = `${a.color}30`); }}>
                <span style={{ fontSize: "1.1rem" }}>{a.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: a.color }}>{a.role}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-subtle)" }}>demo123</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1, height: 1, background: "var(--card-border)" }} />
          <span style={{ color: "var(--text-subtle)", fontSize: "0.78rem" }}>or sign in with email</span>
          <div style={{ flex: 1, height: 1, background: "var(--card-border)" }} />
        </div>

        {/* Form */}
        <div className="card" style={{ padding: "1.75rem" }}>
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, marginBottom: "1rem" }}>
              <AlertCircle size={16} color="#EF4444" />
              <span style={{ color: "#EF4444", fontSize: "0.85rem" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} color="var(--text-subtle)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: 36 }} required />
              </div>
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} color="var(--text-subtle)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input className="input" type={show ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingLeft: 36, paddingRight: 40 }} required />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}>
              {loading ? "Signing in..." : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.25rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}
