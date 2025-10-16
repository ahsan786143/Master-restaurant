"use client";

import AddFoodItems from "@/app/_components/AddFoodItems";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantHeader from "@/app/_components/AdminHeader";
import React, { useState } from "react";
import { PlusCircle, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <RestaurantHeader />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setAddItem(true)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl shadow-md transition-all duration-300 
              ${
                addItem
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
          >
            <PlusCircle size={20} />
            Add Food Items
          </button>

          <button
            onClick={() => setAddItem(false)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl shadow-md transition-all duration-300 
              ${
                !addItem
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
        </div>

        {/* Animated Switch between Components */}
        <AnimatePresence mode="wait">
          {addItem ? (
            <motion.div
              key="addFood"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <AddFoodItems />
            </motion.div>
          ) : (
            <motion.div
              key="foodList"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <FoodItemList />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
};

export default Dashboard;
