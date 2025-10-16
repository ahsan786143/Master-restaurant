import connectToDatabase from "@/app/lib/db";
import Foods from "@/app/models/foodsModels";
import { NextResponse } from "next/server";


// GET food items by restaurant ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params; // restaurant id
    const result = await Foods.find({ resto_id: id });
    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("GET Foods error:", err.message);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// DELETE food item by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params; // food id
    const result = await Foods.findByIdAndDelete(id);
    return NextResponse.json({ success: !!result, result });
  } catch (err) {
    console.error("DELETE Foods error:", err.message);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
