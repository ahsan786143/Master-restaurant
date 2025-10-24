"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BannerPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center  mb-60">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 backdrop-blur-md p-10 px-20 rounded-3xl shadow-2xl max-w-xl w-[90%]"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 drop-shadow-md">
          Welcome to <span className="text-yellow-300">Master Restaurant</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Restaurant Owner Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 p-3 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer w-full sm:w-1/2"
            onClick={() => router.push("/restaurant")}
          >
            <h2 className="text-xl font-semibold text-yellow-300 mb-2">
              Own a Restaurant?
            </h2>
            <p className="text-white mb-4">
              Click below to log in and manage your restaurant.
            </p>
            <button className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full transition">
               Login
            </button>
          </motion.div>

          {/* Customer Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 p-3 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer w-full sm:w-1/2"
            onClick={() => router.push("/user_auth")}
          >
            <h2 className="text-xl font-semibold text-green-300 mb-2">
              Want to Order Food?
            </h2>
            <p className="text-white mb-4">
              Click below to explore menus and order delicious food.
            </p>
            <button className="px-5 py-2 bg-green-400 hover:bg-green-500 text-black font-bold rounded-full transition">
              Order Now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerPage;
