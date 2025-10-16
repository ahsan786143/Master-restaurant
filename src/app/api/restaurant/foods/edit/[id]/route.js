import connectToDatabase from "@/app/lib/db";
import Foods from "@/app/models/foodsModels";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const food = await Foods.findById(params.id);
    if (!food) {
      return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: food });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

//update the food
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const food = await Foods.findByIdAndUpdate(params.id, body, { new: true });
    if (!food) {
      return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: food });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
