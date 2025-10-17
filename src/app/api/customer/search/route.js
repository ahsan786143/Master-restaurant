import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import User from "@/app/models/Admin"; // Restaurant model
import Food from "@/app/models/foodsModels"; // Food model

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const restaurant = searchParams.get("restaurant"); // This can be food or restaurant name

    console.log(" Search Query:", { location, restaurant });

    await connectToDatabase();

    // --- RESTAURANT SEARCH ---
    let restaurantFilter = {};
    if (location) restaurantFilter.city = { $regex: new RegExp(location, "i") };
    if (restaurant) {
      restaurantFilter.$or = [
        { name: { $regex: new RegExp(restaurant, "i") } },
        { restaurantName: { $regex: new RegExp(restaurant, "i") } },
      ];
    }

    const restaurants = await User.find(restaurantFilter).select(
      "name city restaurantName img_URL description _id"
    );

    // --- FOOD SEARCH ---
    let foodFilter = {};
    if (restaurant) {
      foodFilter.name = { $regex: new RegExp(restaurant, "i") };
    }
    if (location) {
      foodFilter.city = { $regex: new RegExp(location, "i") };
    }

    const foods = await Food.find(foodFilter).select(
      "name price img_URL description restaurantId city _id"
    );

    return NextResponse.json({
      success: true,
      restaurants,
      foods,
    });
  } catch (error) {
    console.error(" Error in /search API:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
