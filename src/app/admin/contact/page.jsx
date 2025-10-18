"use client";
import React, { useEffect, useState } from "react";
import { Mail, User, Calendar, Loader2 } from "lucide-react";

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) setContacts(data.contacts);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600">
        <Loader2 className="animate-spin w-8 h-8 mr-2" /> Loading messages...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 p-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
        📬 Contact Messages
      </h1>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-600">No messages yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-500 w-5 h-5" />
                <h3 className="text-lg font-semibold">{contact.name}</h3>
              </div>

              <div className="flex items-center gap-3 mb-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-400" />
                <p>{contact.email}</p>
              </div>

              <p className="text-gray-600 mb-4 border-l-4 border-blue-300 pl-3 italic">
                {contact.message}
              </p>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(contact.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
