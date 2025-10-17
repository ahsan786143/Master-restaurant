"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // done all
import { Utensils, DollarSign, FileText, ImageIcon } from "lucide-react";

const AddFoodItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !image) {
      setError(true);
      return;
    }

    const restaurantData = JSON.parse(localStorage.getItem("user"));
    const resto_id = restaurantData?._id;

    try {
      const response = await fetch("https://master-restaurant-713y.vercel.app/api/restaurant/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          img_URL: image,
          resto_id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Food added successfully!");
        setName("");
        setPrice("");
        setDescription("");
        setImage("");
        window.location.href = "/restaurant/dashboard";
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Add Food Item
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Food Name */}
          <div className="relative">
            <Utensils className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Food Name"
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !name && (
              <p className="text-red-500 text-sm mt-1">Please enter food name</p>
            )}
          </div>

          {/* Price */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !price && (
              <p className="text-red-500 text-sm mt-1">Please enter price</p>
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
            {error && !description && (
              <p className="text-red-500 text-sm mt-1">
                Please enter description
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter Image URL"
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !image && (
              <p className="text-red-500 text-sm mt-1">
                Please enter image URL
              </p>
            )}
          </div>

          {/* Image Preview */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg shadow-md border"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-6 bg-blue-600 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
          >
            Add Food
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFoodItems;
