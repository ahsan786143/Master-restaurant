import connectToDatabase from "@/app/lib/db";
import Foods from "@/app/models/foodsModels";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
  // const { name, email, password, confirmPassword, city, phone } = body || {};

    if (!body) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }


    console.log(" Incoming body:", body);

    const newFood = await Foods.create(body); 

    console.log("Saved Food:", newFood);


    return NextResponse.json({ success: true, food: newFood });
  } catch (err) {
    console.error(" Add food error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
