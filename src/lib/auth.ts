import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db, query } from "@/lib/db";
import { seedDatabase } from "@/lib/db/seed";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await seedDatabase();

        const user = query.findUserByEmail(credentials.email as string);
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password as string, user.password);
        if (!valid) return null;

        let profileId: string | null = null;
        let displayName = user.name;

        if (user.role === "student") {
          const p = query.findStudentByUserId(user.id);
          profileId = p?.id ?? null;
        } else if (user.role === "college") {
          const p = query.findCollegeByUserId(user.id);
          profileId = p?.id ?? null;
          displayName = p?.college_name ?? user.name;
        } else if (user.role === "company") {
          const p = query.findCompanyByUserId(user.id);
          profileId = p?.id ?? null;
          displayName = p?.company_name ?? user.name;
        } else if (user.role === "mentor") {
          const p = query.findMentorByUserId(user.id);
          profileId = p?.id ?? null;
        }

        return { id: user.id, email: user.email, name: displayName, role: user.role, profileId };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.profileId = (user as any).profileId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).profileId = token.profileId;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "skillnexus-demo-secret-2024",
});
