import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import AboutPage from "@/app/models/AboutPage";

// ------------------ GET ------------------
export async function GET() {
  try {
    await connectToDatabase();
    const about = await AboutPage.findOne();
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ------------------ POST (Admin Only) ------------------
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const existing = await AboutPage.findOne();
    let about;

    if (existing) {
      about = await AboutPage.findByIdAndUpdate(existing._id, body, { new: true });
    } else {
      about = await AboutPage.create(body);
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error("POST /api/about error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
