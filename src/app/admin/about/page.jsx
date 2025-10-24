"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { PlusCircle, Trash2, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState({
    journey: { title: "", description: "", image: "" },
    mission: "",
    vision: "",
    values: [],
    team: [],
  });

  const router = useRouter();

  // ---------------- FETCH EXISTING DATA ----------------
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAbout((prev) => ({
            ...prev,
            ...data.data,
            values: data.data.values || [],
            team: data.data.team || [],
          }));
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      const result = await res.json();
      if (result.success) toast.success("About Page updated successfully!");
      else toast.error("Update failed!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FIELD UPDATER ----------------
  const updateField = (section, key, value) => {
    setAbout((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // ---------------- ADD / REMOVE HANDLERS ----------------
  const addValue = () => {
    setAbout((prev) => ({
      ...prev,
      values: [...prev.values, { title: "", desc: "", icon: "" }],
    }));
  };

  const removeValue = (index) => {
    setAbout((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const addTeam = () => {
    setAbout((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", role: "", img: "" }],
    }));
  };

  const removeTeam = (index) => {
    setAbout((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-sky-50 p-10 relative">
      <Toaster />

      {/* ----------- BACK BUTTON ----------- */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-white hover:bg-gray-100 text-blue-600 px-4 py-2 rounded-full shadow flex items-center gap-2 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      {/* ----------- PAGE TITLE ----------- */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-600 mb-8"
      >
        Manage About Page
      </motion.h1>

      {/* ----------- JOURNEY ----------- */}
      <section className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-2xl font-semibold text-sky-600 mb-4">Journey</h2>
        <input
          type="text"
          placeholder="Title"
          value={about.journey.title}
          onChange={(e) => updateField("journey", "title", e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <textarea
          placeholder="Description"
          value={about.journey.description}
          onChange={(e) => updateField("journey", "description", e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          rows="3"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={about.journey.image}
          onChange={(e) => updateField("journey", "image", e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
      </section>

      {/* ----------- MISSION & VISION ----------- */}
      <section className="bg-white p-6 rounded-2xl shadow mb-8 grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-sky-600 mb-4">Mission</h2>
          <textarea
            placeholder="Enter mission"
            value={about.mission}
            onChange={(e) => setAbout({ ...about, mission: e.target.value })}
            className="border p-2 w-full rounded"
            rows="4"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-sky-600 mb-4">Vision</h2>
          <textarea
            placeholder="Enter vision"
            value={about.vision}
            onChange={(e) => setAbout({ ...about, vision: e.target.value })}
            className="border p-2 w-full rounded"
            rows="4"
          />
        </div>
      </section>

      {/* ----------- VALUES ----------- */}
      <section className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-sky-600">Values</h2>
          <button
            type="button"
            onClick={addValue}
            className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded flex items-center gap-1 transition"
          >
            <PlusCircle className="w-4 h-4 text-white" /> Add
          </button>
        </div>

        {about.values?.map((val, i) => (
          <div key={i} className="border rounded p-4 mb-3 bg-gray-50">
            <input
              type="text"
              placeholder="Title"
              value={val.title}
              onChange={(e) => {
                const updated = [...about.values];
                updated[i].title = e.target.value;
                setAbout({ ...about, values: updated });
              }}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={val.desc}
              onChange={(e) => {
                const updated = [...about.values];
                updated[i].desc = e.target.value;
                setAbout({ ...about, values: updated });
              }}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Icon (utensils, heart, sparkles)"
              value={val.icon}
              onChange={(e) => {
                const updated = [...about.values];
                updated[i].icon = e.target.value;
                setAbout({ ...about, values: updated });
              }}
              className="border p-2 w-full mb-2 rounded"
            />
            <button
              onClick={() => removeValue(i)}
              className="text-red-500 flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
        ))}
      </section>

      {/* ----------- TEAM MEMBERS ----------- */}
      <section className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-sky-600">Team Members</h2>
          <button
            type="button"
            onClick={addTeam}
            className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded flex items-center gap-1 transition"
          >
            <PlusCircle className="w-4 h-4 text-white" /> Add
          </button>
        </div>

        {about.team?.map((member, i) => (
          <div key={i} className="border rounded p-4 mb-3 bg-gray-50">
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => {
                const updated = [...about.team];
                updated[i].name = e.target.value;
                setAbout({ ...about, team: updated });
              }}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={member.role}
              onChange={(e) => {
                const updated = [...about.team];
                updated[i].role = e.target.value;
                setAbout({ ...about, team: updated });
              }}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={member.img}
              onChange={(e) => {
                const updated = [...about.team];
                updated[i].img = e.target.value;
                setAbout({ ...about, team: updated });
              }}
              className="border p-2 w-full mb-2 rounded"
            />
            <button
              onClick={() => removeTeam(i)}
              className="text-red-500 flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
        ))}
      </section>

      {/* ----------- SAVE BUTTON ----------- */}
      <div className="text-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition"
        >
          {loading ? "Saving..." : "Save Changes"}
          <Save className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
