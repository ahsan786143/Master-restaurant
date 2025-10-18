import connectToDatabase from "@/app/lib/db";
import Contact from "@/app/models/contactModels";
import { NextResponse } from "next/server";

// ✅ Save Contact
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    console.log("📩 Incoming Contact Body:", body);

    const newContact = await Contact.create(body);
    console.log("✅ Saved Contact:", newContact);

    return NextResponse.json({ success: true, contact: newContact });
  } catch (err) {
    console.error("❌ Contact Save Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ✅ Get All Contacts (for Admin)
export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (err) {
    console.error("❌ Fetch Contacts Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
