import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import User from "@/app/models/Admin";

export async function GET() {
  try {
    await connectToDatabase();

    const users = await User.find();

    let result = users
      .filter((item) => item.city && typeof item.city === "string")
      .map(
        (item) =>
          item.city.charAt(0).toUpperCase() + item.city.slice(1).toLowerCase()
      );

    result = [...new Set(result)];

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
