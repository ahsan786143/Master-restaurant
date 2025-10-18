"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, SendHorizonal, Clock, CheckCircle } from "lucide-react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

export default function ContactPage() {
  // ✅ Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Submit handler (connected to /api/contact)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("❌ " + (data.error || "Something went wrong!"));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("⚠️ Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-sky-100 text-gray-800 overflow-hidden min-h-screen">
      <CustomerHeader />

      {/* ✅ HERO SECTION */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543352634-5932bcbda27a?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center mix-blend-overlay opacity-40"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white px-6"
        >
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg mt-10">
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            We’d love to hear from you — whether it’s feedback, reservations, or catering inquiries.
            Let’s connect and make something delicious together.
          </p>
        </motion.div>
      </section>

      {/* ✅ CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40"
        >
          <h2 className="text-4xl font-bold text-sky-600 mb-6">Visit or Reach Us</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Come dine with us, plan your event, or just drop us a message.
            We promise a quick response and a warm welcome!
          </p>

          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <MapPin className="text-sky-600 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sky-700">Address</h4>
                <p>123 Food Street, Clifton, Okara</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <Phone className="text-sky-600 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sky-700">Phone</h4>
                <p>+92 300 1234567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <Mail className="text-sky-600 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sky-700">Email</h4>
                <p>hello@masterrestaurant.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <Clock className="text-sky-600 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sky-700">Hours</h4>
                <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ✅ Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/40 relative"
        >
          <h3 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Send Us a Message
          </h3>

          <div className="space-y-5">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 outline-none bg-white/70 transition"
            />

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 outline-none bg-white/70 transition"
            />

            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 outline-none bg-white/70 resize-none transition"
            ></motion.textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSending}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-white shadow-md transition
                ${isSending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700"
                }`}
            >
              {isSending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <SendHorizonal className="w-5 h-5" /> Send Message
                </>
              )}
            </motion.button>
          </div>

          {/* ✅ Success message overlay */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center text-center p-8"
            >
              <CheckCircle className="text-green-500 w-14 h-14 mb-3" />
              <h4 className="text-2xl font-semibold text-green-700 mb-2">
                Message Sent Successfully!
              </h4>
              <p className="text-gray-600">We’ll get back to you as soon as possible.</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-sky-600 hover:to-indigo-700"
              >
                Send Another
              </button>
            </motion.div>
          )}
        </motion.form>
      </section>

      <Footer />
    </div>
  );
}
