"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white p-4 text-xl font-bold shadow-md flex justify-between">
        <span>Admin Dashboard</span>
        
      </nav>
      
      <main className="p-6">{children}</main>
    </div>
  );
}
