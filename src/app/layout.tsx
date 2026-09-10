import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillNexus — AI-Powered Academia–Industry Collaboration Platform",
  description: "Bridge the gap between campus skills and industry careers. SkillNexus uses AI to map skills, identify gaps, build personalized roadmaps, and connect students with internships.",
  keywords: "skill mapping, internship, placement readiness, career guidance, AI, academia industry",
  openGraph: {
    title: "SkillNexus",
    description: "AI-Powered Academia–Industry Collaboration Platform",
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
