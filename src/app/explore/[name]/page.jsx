"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";

const Page = ({ params, searchParams }) => {
  const { name } = React.use(params);
  const { id } = React.use(searchParams);

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    if (id) loadRestaurantDetails();
  }, [id]);

  // Fetch restaurant details
  const loadRestaurantDetails = async () => {
    try {
      console.log(" Restaurant:", name);
      console.log(" ID:", id);

      const response = await fetch(`/api/customer/${id}`);
      const data = await response.json();

      if (data.success) {
        setRestaurantDetails(data.details);
        setFoodItems(data.foodItem);
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const decodedName = decodeURI(restaurantDetails?.name || "");

  // Add to Cart Function
  const addToCart = (item) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in cart
    const itemExists = existingCart.find((cartItem) => cartItem._id === item._id);

    let updatedCart;
    if (itemExists) {
      // If exists, increase quantity
      updatedCart = existingCart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // Add new item
      updatedCart = [...existingCart, { ...item, quantity: 1 }];
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Trigger header update
    window.dispatchEvent(new Event("cartUpdated"));

   
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <CustomerHeader />

      {/* Hero Section */}
      <section className="relative w-full py-16 px-6 md:px-16 text-center bg-white shadow-sm">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
        >
          {decodedName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          {restaurantDetails.description || "Delicious food served fresh!"}
        </motion.p>
      </section>

      {/*  Restaurant Info */}
      <section className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg"
        >
          <p>
            <strong> Restaurant Name:</strong> {restaurantDetails?.name}
          </p>
          <p>
            <strong>Restaurant Email:</strong> {restaurantDetails?.email}
          </p>
          <p>
            <strong>Restaurant Phone:</strong> {restaurantDetails?.phone}
          </p>
          <p>
            <strong> Restaurant Address:</strong> {restaurantDetails?.address}
          </p>
        </motion.div>
      </section>

      {/*  Food Items */}
      <section className="max-w-6xl mx-auto mt-16 px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-semibold text-center mb-10"
        >
          Our Menu
        </motion.h2>

        {foodItems.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {foodItems.map((item) => (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={item.img_URL}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      

                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No food items available yet.
          </p>
        )}
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
};

export default Page;
