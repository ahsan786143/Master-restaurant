"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // all done 
import { Trash2, Edit3, Utensils } from "lucide-react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("user"));
    if (!restaurantData) return;
    const resto_id = restaurantData._id;

    try {
      const response = await fetch(`/api/restaurant/foods/${resto_id}`);
      const data = await response.json();
      if (data.success) {
        setFoodItems(data.result);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const deleteFoodItem = async (id) => {
    if (!confirm("Are you sure you want to delete this food item?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        loadFoodItems();
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 flex justify-center items-center gap-3">
          <Utensils className="text-blue-600" /> Food Items
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Manage your restaurant’s delicious menu items 
        </p>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="overflow-x-auto max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200"
      >
        <table className="min-w-full text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foodItems.length > 0 ? (
              foodItems.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 font-medium">{index + 1}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6 text-green-600 font-semibold">
                    Rs {item.price}
                  </td>
                  <td className="py-3 px-6 text-gray-700">{item.description}</td>
                  <td className="py-3 px-6">
                    <img
                      src={item.img_URL}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <button
                      onClick={() => router.push(`/restaurant/dashboard/${item._id}`)}
                      className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition"
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                   <div className="py-2">
                     <button
                      onClick={() => deleteFoodItem(item._id)}
                      className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                   </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500 text-lg">
                  No food items found 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default FoodItemList;
