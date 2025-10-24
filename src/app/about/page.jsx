"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Utensils, HeartHandshake, Sparkles } from "lucide-react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAboutData(data.data);
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  if (!aboutData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const iconMap = {
    utensils: <Utensils className="w-12 h-12 text-sky-500" />,
    heart: <HeartHandshake className="w-12 h-12 text-sky-500" />,
    sparkles: <Sparkles className="w-12 h-12 text-sky-500" />,
  };

  return (
    <div className="bg-gradient-to-b from-white to-sky-50 text-gray-800 overflow-hidden">
      <CustomerHeader />

      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          About <span className="text-yellow-300">Master Restaurant</span>
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Discover the story behind our flavors — where passion and creativity meet.
        </p>
      </section>

      {/* Journey */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-blue-600">
          {aboutData.journey.title}
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          {aboutData.journey.description}
        </p>
        <img
          src={aboutData.journey.image}
          alt="Journey"
          className="mt-10 w-40 h-40 mx-auto rounded-3xl shadow-lg"
        />
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
            <p>{aboutData.mission}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Our Vision</h3>
            <p>{aboutData.vision}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-12">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {aboutData.values.map((val, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="flex justify-center mb-4">{iconMap[val.icon]}</div>
              <h4 className="text-2xl font-semibold text-blue-600 mb-2">
                {val.title}
              </h4>
              <p className="text-gray-600">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-10">
            Meet Our Culinary Artists
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {aboutData.team.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-md overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-blue-600">{member.name}</h4>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
