"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Trash2,
  Save,
  X,
  ArrowLeft,
  Users,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function ManageUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [activeRestaurants, setActiveRestaurants] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Load all users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/restaurant");
      const data = await res.json();

      if (data.success) {
        setUsers(data.restaurants || []);
        setTotalRestaurants(data.totalRestaurants);
        setActiveRestaurants(data.activeRestaurants);
      } else {
        toast.error(data.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error loading users");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditedData({
      name: user.name,
      email: user.email,
      city: user.city,
      phone: user.phone,
      address: user.address,
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedData({});
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch("/api/restaurant", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editedData }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User updated successfully");
        loadUsers();
        handleCancelEdit();
      } else {
        toast.error(data.error || "Failed to update");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating user");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/restaurant?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User deleted successfully");
        loadUsers();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center gap-2 justify-center text-gray-800">
            <Users size={28} /> Manage Restaurants
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: {totalRestaurants} | Active: {activeRestaurants}
          </p>
        </div>
        <div></div>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No users found</p>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {users.map((user) => (
              <motion.div
                key={user._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white shadow-lg rounded-2xl p-5 flex flex-col gap-3 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.img_URL || "/default-user.png"}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    {editingUser === user._id ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <h2 className="font-semibold text-lg">{user.name}</h2>
                    )}
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail size={14} /> {user.email}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  {editingUser === user._id ? (
                    <>
                      <input
                        type="text"
                        value={editedData.city}
                        onChange={(e) =>
                          setEditedData({ ...editedData, city: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={editedData.phone}
                        onChange={(e) =>
                          setEditedData({ ...editedData, phone: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                        placeholder="Phone"
                      />
                      <input
                        type="text"
                        value={editedData.address}
                        onChange={(e) =>
                          setEditedData({ ...editedData, address: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                        placeholder="Address"
                      />
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2">
                        <MapPin size={14} /> {user.city || "N/A"}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} /> {user.phone || "N/A"}
                      </p>
                      <p className="text-gray-500">{user.address || "—"}</p>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>

                  <div className="flex gap-2">
                    {editingUser === user._id ? (
                      <>
                        <button
                          onClick={() => handleSave(user._id)}
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
