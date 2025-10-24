"use client";
import React, { useEffect, useState } from "react";
import {
  Mail,
  User,
  Calendar,
  Loader2,
  ArrowLeft,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all contact messages
  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) setContacts(data.contacts);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact message
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Message deleted!");
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.message || "Failed to delete message.");
      }
    } catch (err) {
      toast.error("Error deleting message.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleBack = () => router.push("/admin/dashboard");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading messages...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 p-10">
      <Toaster position="top-right" />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-8 flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center justify-center mb-10 gap-3">
        <MessageSquare className="w-8 h-8 text-blue-600" />
        <h1 className="text-4xl font-extrabold text-blue-700">
          Contact Messages
        </h1>
      </div>

      {/* No Messages */}
      {contacts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No messages received yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition"
            >
              {/* Name */}
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-500 w-5 h-5" />
                <h3 className="text-lg font-semibold">{contact.name}</h3>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 mb-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-400" />
                <p>{contact.email}</p>
              </div>

              {/* Message */}
              <p className="text-gray-600 mb-4 border-l-4 border-blue-300 pl-3 italic">
                {contact.message}
              </p>

              {/* Date */}
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(contact.createdAt).toLocaleString()}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
