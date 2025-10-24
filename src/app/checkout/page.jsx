"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Loader2,
  CheckCircle2,
  Package,
  Home,
  Wallet,
  ShoppingCart,
  Truck,
  ArrowLeftCircle,
  Smile,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import CustomerHeader from "../_components/CustomerHeader";
import Confetti from "react-confetti";

const Page = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
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
      toast.error(" Please enter your delivery address!", { duration: 3000 });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const order = {
        items: cart,
        total,
        address,
        paymentMethod,
        date: new Date().toLocaleString(),
      };

      localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("cart");

      setLoading(false);
      setOrderPlaced(true);

      toast.success("Order placed successfully!", { duration: 2500 });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4 sm:px-8 relative overflow-hidden">
      {orderPlaced && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <CustomerHeader />

      {/* Toasts at Top Center */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#333",
            fontWeight: 600,
            borderRadius: "12px",
            padding: "12px 18px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          },
        }}
      />

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6 sm:p-10 relative">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <ShoppingCart className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Order Summary</h1>
        </div>

        {/* Order Placed Screen */}
        {orderPlaced ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle2 className="text-green-500 w-20 h-20 animate-bounce" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mt-2 flex flex-col items-center gap-1">
              <Smile className="text-yellow-500" size={20} />
              Thank you for shopping with us 
              <br />
              <Truck className="text-blue-600 mt-2 animate-pulse" size={22} />
              Your order is on its way...
            </p>
            <p className="text-gray-500 mt-4 italic">
              Redirecting to home page shortly...
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-center bg-blue-50 rounded-lg p-4 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <Package className="text-blue-500" size={24} />
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
                <div className="flex flex-col items-center py-10 text-gray-500">
                  <ShoppingBag size={40} className="text-blue-400 mb-3" />
                  <p>Your cart is empty 🛒</p>
                </div>
              )}
            </div>

            {/* Total */}
            {cart.length > 0 && (
              <div className="mt-8 border-t pt-4 flex justify-between items-center text-lg font-semibold text-gray-800">
                <div className="flex items-center gap-2">
                  <Wallet size={20} className="text-blue-600" />
                  <span>Total Amount:</span>
                </div>
                <span className="text-blue-700">Rs {total}</span>
              </div>
            )}

            {/* Address */}
            <div className="mt-8">
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                <Home size={20} className="text-blue-600" /> Delivery Address
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

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all font-medium"
              >
                <ArrowLeftCircle size={20} /> Back to Cart
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Placing Order...
                  </>
                ) : (
                  <>
                    <Truck size={20} /> Place Order
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
