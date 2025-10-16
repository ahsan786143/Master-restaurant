import connectToDatabase from "@/app/lib/db";
import { NextResponse } from "next/server";
import User from "@/app/models/Admin";
import Foods from "@/app/models/foodsModels";

export async function GET(request, content){
const { id } = await content.params
  
 await connectToDatabase();
  const details = await User.findOne({_id : id});
  const foodItem = await Foods.find({"resto_id" : id});   
if (!details) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }
if(!foodItem){
  return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
}
  return NextResponse.json({ success: true, details, foodItem });
}

