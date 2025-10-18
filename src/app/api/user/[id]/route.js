import connectToDatabase from "@/app/lib/db";
import UserSignUp from "@/app/models/UserSignUp";
import { NextResponse } from "next/server";

// ---------------- DELETE USER ----------------
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedUser = await UserSignUp.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully ✅" });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ---------------- UPDATE USER ----------------
export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    const { name, city, phone } = body;

    const updatedUser = await UserSignUp.findByIdAndUpdate(
      id,
      { name, city, phone },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully ✅",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
