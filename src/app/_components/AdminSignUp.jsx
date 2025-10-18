"use client";
import React, { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const RestaurantSignUp = ({ onToggle }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [img_URL, setImg_URL] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          city,
          phone,
          img_URL,
          address,
        }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/restaurant/dashboard");
      } else {
        setErrorMsg(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-8 rounded-2xl shadow-xl bg-white"
    >
      <h3 className="text-3xl font-bold text-center text-purple-700 mb-2">
        Sign Up
      </h3>
      <p className="text-center text-gray-500 mb-6">
        Join us today! Create an account to explore amazing food delivery.
      </p>

      {/* Error Message */}
      {errorMsg && (
        <p className="text-center text-red-500 mb-4 font-medium">{errorMsg}</p>
      )}

      {/* Name */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <User size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <Mail size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <Lock size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <Lock size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {/* City */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <MapPin size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <MapPin size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="text"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <Phone size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      {/* Image URL */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-lg px-4">
        <ImageIcon size={18} className="text-gray-500 mr-2" />
        <input
          className="bg-transparent outline-none py-2 flex-1"
          type="text"
          placeholder="Image URL (Restaurant Logo or Photo)"
          value={img_URL}
          onChange={(e) => setImg_URL(e.target.value)}
          required
        />
      </div>

      {/* Preview Image */}
      {img_URL && (
        <div className="mb-4">
          <img
            src={img_URL}
            alt="Preview"
            className="rounded-lg shadow-md w-full h-40 object-cover"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
        }`}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {/* Toggle Login */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-purple-600 font-medium hover:underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default RestaurantSignUp;
