import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query, db, generateId } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role = "student", institution, department, industry, mentorExpertise } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user exists
    const existing = query.findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = generateId("usr_");
    const now = new Date().toISOString();

    // Insert user into in-memory db
    db.users.push({
      id: userId,
      email,
      password: passwordHash,
      name,
      role: role.toLowerCase() as any,
      created_at: now,
    });

    // Create profile based on role
    if (role.toUpperCase() === "STUDENT") {
      db.student_profiles.push({
        id: generateId("sp_"),
        user_id: userId,
        department: department || "Computer Science",
        year_of_study: 3,
        gpa: 8.8,
        talent_iq: 780,
        placement_readiness: 84,
        nexa_points: 100,
        streak_days: 1,
        is_premium: false,
        is_public: true,
        created_at: now,
      });
    } else if (role.toUpperCase() === "COLLEGE") {
      db.college_profiles.push({
        id: generateId("cp_"),
        user_id: userId,
        college_name: institution || name || "IIT Bombay",
        total_students: 3000,
        created_at: now,
      });
    } else if (role.toUpperCase() === "COMPANY") {
      db.company_profiles.push({
        id: generateId("cmp_"),
        user_id: userId,
        company_name: name,
        industry: industry || "Technology",
        is_verified: true,
        created_at: now,
      });
    }

    return NextResponse.json({ success: true, userId, message: "User registered successfully!" }, { status: 201 });
  } catch (error: any) {
    console.error("Registration API error:", error);
    return NextResponse.json({ error: error.message || "Failed to register" }, { status: 500 });
  }
}
