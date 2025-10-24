import connectToDatabase from "@/app/lib/db";
import Contact from "@/app/models/contactModels";
import { NextResponse } from "next/server";

// ---------------- POST (when user submits contact form) ----------------
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({ name, email, message });
    return NextResponse.json(
      { success: true, message: "Message sent successfully!", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}

// ---------------- GET (for admin dashboard) ----------------
export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
