"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Save, X, LogOut, Users } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Load users
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [router]);

  // ✅ Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/user/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
        toast.success("User deleted ✅");
      } else {
        toast.error("Delete failed ❌");
      }
    } catch {
      toast.error("Server error ❌");
    }
  };

  // ✅ Save edited user
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user/${editingUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        const updated = await res.json();
        setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
        setEditingUser(null);
        toast.success("User updated ✅");
      } else {
        toast.error("Update failed ❌");
      }
    } catch {
      toast.error("Server error ❌");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading users...
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Users className="text-blue-700" size={32} />
          <h1 className="text-3xl font-bold text-blue-800">
            Manage Registered Users
          </h1>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            toast.success("Logged out successfully 👋");
            setTimeout(() => router.push("/admin"), 1000);
          }}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Edit User Form */}
      <AnimatePresence>
        {editingUser && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white/80 backdrop-blur-md border border-blue-100 p-6 rounded-xl shadow-lg mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              ✏️ Edit User
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={editingUser.city}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, city: e.target.value })
                }
                placeholder="City"
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={editingUser.phone}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, phone: e.target.value })
                }
                placeholder="Phone Number"
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User List */}
      <motion.div
        layout
        className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {users.length === 0 ? (
          <p className="text-gray-600 text-center mt-10 text-lg">
            No users found 😕
          </p>
        ) : (
          users.map((user) => (
            <motion.div
              key={user._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 border border-blue-100 shadow-sm hover:shadow-lg rounded-2xl p-5 transition backdrop-blur-md"
            >
              <h3 className="text-lg font-semibold text-blue-800 mb-1">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mb-3">
                {user.city} • {user.phone}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingUser(user)}
                  className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
