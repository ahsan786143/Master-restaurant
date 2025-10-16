import connectToDatabase from "@/app/lib/db";
import User from "@/app/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

// ---------------- SIGNUP ----------------
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, password, confirmPassword, city, phone , address, img_URL} = body || {};

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return NextResponse.json({ error: "Phone number already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      city,
      phone,
      address,
      img_URL
    });

    const safeUser = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      city: newUser.city,
      phone: newUser.phone,
      address: newUser.address,
      img_URL: newUser.img_URL,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ---------------- LOGIN ----------------
export async function PUT(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      phone: user.phone,
      address: user.address,
      img_URL: user.img_URL,
      createdAt: user.createdAt,
      token,
    };

    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ---------------- GET USERS ----------------
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().select("-password").limit(50);
    return NextResponse.json(users);
  } catch (err) {
    console.error("Get users error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
