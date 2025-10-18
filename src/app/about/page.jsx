"use client";
import React from "react";
import { motion } from "framer-motion";
import { Utensils, HeartHandshake, Sparkles } from "lucide-react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-sky-50 text-gray-800 overflow-hidden">
      {/* Header */}
      <CustomerHeader />

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-4 drop-shadow-lg"
        >
          About <span className="text-yellow-300">Master Restaurant</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
        >
          Discover the story behind our flavors — where passion, creativity, and
          community come together to make every meal special.
        </motion.p>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-6 text-blue-600"
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg"
        >
          Master Restaurant began as a small food venture rooted in a dream — to
          bring authentic taste and heartwarming hospitality to every plate.
          Today, we continue that journey, serving food that connects people and
          celebrates every flavor.
        </motion.p>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
          alt="Restaurant Story"
          className="mt-10 w-40 h-40 mx-auto rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-lg hover:bg-white/20 transition"
          >
            <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
            <p className="text-blue-50 leading-relaxed">
              To craft dishes that tell a story — made with love, inspired by
              culture, and served with warmth — creating experiences worth
              remembering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-lg hover:bg-white/20 transition"
          >
            <h3 className="text-3xl font-semibold mb-4">Our Vision</h3>
            <p className="text-blue-50 leading-relaxed">
              To be a trusted name in dining — known for quality, innovation, and
              the joy of bringing people together over great food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-600 mb-12"
        >
          What We Stand For
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Authenticity",
              desc: "We preserve real recipes and timeless flavors — because great food starts with honesty.",
              icon: <Utensils className="w-12 h-12 text-sky-500" />,
            },
            {
              title: "Hospitality",
              desc: "Every guest is family — we serve with smiles, warmth, and care that feels like home.",
              icon: <HeartHandshake className="w-12 h-12 text-sky-500" />,
            },
            {
              title: "Innovation",
              desc: "Blending creativity with culinary expertise to reimagine classic dishes in new ways.",
              icon: <Sparkles className="w-12 h-12 text-sky-500" />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h4 className="text-2xl font-semibold text-blue-600 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-blue-600 mb-10"
          >
            Meet Our Culinary Artists
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            The heart of Master Restaurant — our chefs bring creativity,
            passion, and perfection to every dish.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                name: "Chef Adeel",
                role: "Executive Chef",
                img: "https://pbs.twimg.com/media/Fs4GF2NWAAAtI1y?format=jpg&name=large",
              },
              {
                name: "Sara Khan",
                role: "Restaurant Manager",
                img: "https://img.freepik.com/premium-photo/smiling-female-chef-preparing-meal-professional-kitchen_123rf-29564469.jpg",
              },
              {
                name: "Ali Raza",
                role: "Pastry Specialist",
                img: "https://lookaside.fbsbx.com/lookaside/crawler/instagram/chef_ali_raza_/profile_pic.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-transform"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-blue-600">
                    {member.name}
                  </h4>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
