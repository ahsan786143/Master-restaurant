import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Admin from "@/app/models/adminModel";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, password } = body;

    // ✅ Replace with your real credentials
    const ADMIN_EMAIL = "ch158261@gmail.com";
    const ADMIN_PASSWORD = "Chahsan786@@";

    console.log("📩 Admin Login Attempt:", email, password);

    // ✅ Simple validation (for demo)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = "admin_" + Date.now();
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (err) {
    console.error("❌ Admin Login Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
