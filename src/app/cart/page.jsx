"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <CustomerHeader />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img_URL}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">
                        Rs {item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <h2 className="text-2xl font-bold">Total: Rs {getTotal()}</h2>
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full"
              onClick={()=> window.location.href = "/checkout"}
              >
                Checkout 
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
