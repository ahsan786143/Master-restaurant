"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, MapPin, CreditCard } from "lucide-react";
import CustomerHeader from "../_components/CustomerHeader";

const Page = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const router = useRouter();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setCart(parsedCart);
      const sum = parsedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(sum);
    }
  }, []);

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter your delivery address!");
      return;
    }

    const order = {
      items: cart,
      total,
      address,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    // ✅ Save order (demo purpose)
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem("cart");

    alert("🎉 Order placed successfully!");
    router.push("/"); // redirect to home
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4 sm:px-8">
      <CustomerHeader />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <ShoppingBag className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Order Summary</h1>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center bg-blue-50 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img_URL}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-blue-700 font-bold text-lg mt-2 sm:mt-0">
                  Rs {item.price * item.quantity}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              Your cart is empty 🛒
            </p>
          )}
        </div>

        {/* Total */}
        {cart.length > 0 && (
          <div className="mt-8 border-t pt-4 flex justify-between items-center text-lg font-semibold text-gray-800">
            <span>Total Amount:</span>
            <span className="text-blue-700">Rs {total}</span>
          </div>
        )}

        {/* Address */}
        <div className="mt-8">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
            <MapPin size={20} className="text-blue-600" /> Delivery Address
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your full address..."
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="mt-6">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
            <CreditCard size={20} className="text-blue-600" /> Payment Method
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>Credit/Debit Card</option>
            <option>EasyPaisa / JazzCash</option>
          </select>
        </div>

        {/* Place Order Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handlePlaceOrder}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
