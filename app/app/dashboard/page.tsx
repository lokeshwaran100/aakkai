"use client";

import React from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check-auth");
      if (!res.ok) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow py-4 px-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Team Members */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Team Members</h3>
            <p className="text-4xl font-bold mb-4">15</p>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
              Add Team Member
            </button>
          </div>

          {/* Card: Projects Completed */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Projects Completed</h3>
            <p className="text-4xl font-bold mb-4">120</p>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
              Add New Project
            </button>
          </div>

          {/* Card: Clients */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Clients</h3>
            <p className="text-4xl font-bold mb-4">50</p>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg">
              View All Clients
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
