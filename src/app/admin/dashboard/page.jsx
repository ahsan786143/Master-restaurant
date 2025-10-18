"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, Mail, LogOut } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/admin/dashboard" },
    { name: "Manage Users", icon: <Users className="w-5 h-5" />, path: "/admin/manage-users" },
    { name: "Contact Messages", icon: <Mail className="w-5 h-5" />, path: "/admin/contact" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 🔹 Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-blue-300 mt-1">Welcome, Super Admin 👋</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 🔹 Main Content Area */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Dashboard Overview</h2>
        <p className="text-gray-600 mb-8">
          You have successfully logged in with your admin credentials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Stat Cards */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">120</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700">Messages</h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">35</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700">Active Sessions</h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">8</p>
          </div>
        </div>
      </main>
    </div>
  );
}
