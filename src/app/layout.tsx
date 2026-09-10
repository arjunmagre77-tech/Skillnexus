import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillLink — AI-Powered Skill Intelligence Platform",
  description: "Bridge the gap between campus skills and industry careers. SkillLink uses AI to map skills, identify gaps, build personalized roadmaps, and connect students with internships.",
  keywords: "skill mapping, internship, placement readiness, career guidance, AI, academia industry, SkillLink",
  openGraph: {
    title: "SkillLink",
    description: "AI-Powered Skill Intelligence Platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
