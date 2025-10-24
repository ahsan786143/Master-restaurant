"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  // Save and update cart
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  // Increase / Decrease quantity
  const changeQuantity = (id, type) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );
    updateCart(updatedCart);
  };

  // Calculate total
  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <CustomerHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            Your Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="mx-auto w-16 h-16 text-gray-400" />
              <p className="mt-4 text-gray-600 text-lg">
                Your cart is empty — start adding products!
              </p>
              <a
                href="/"
                className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md"
              >
                Shop Now
              </a>
            </div>
          ) : (
            <>
              <ul className="space-y-6">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.li
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.img_URL}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover border"
                        />
                        <div>
                          <h2 className="font-bold text-lg text-gray-800">
                            {item.name}
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Rs {item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mt-4 md:mt-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => changeQuantity(item._id, "dec")}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                          >
                            <Minus size={18} className="text-gray-700" />
                          </button>
                          <span className="font-semibold text-lg text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => changeQuantity(item._id, "inc")}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                          >
                            <Plus size={18} className="text-gray-700" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item._id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-all"
                        >
                          <Trash2 size={18} />
                          <span className="hidden md:inline font-medium">
                            Remove
                          </span>
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                  Total:{" "}
                  <span className="text-green-600">
                    Rs {getTotal().toFixed(2)}
                  </span>
                </h2>
                <button
                  onClick={() => (window.location.href = "/checkout")}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md transition-all"
                >
                  Proceed to Checkout
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
