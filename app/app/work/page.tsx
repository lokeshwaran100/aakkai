"use client";

import React, { useState } from "react";
import Image from "next/image";

// type Project = {
//   id: number;
//   title: string;
//   thumbnail: string;
//   category: string;
// };

const clientCategories = [
  { id: 1, name: "Arts & Culture", thumbnail: "/dummy.gif" },
  {
    id: 2,
    name: "Banking & Finance",
    thumbnail: "/dummy.gif",
  },
  { id: 3, name: "Civic & Public", thumbnail: "/dummy.gif" },
  // Add more categories as needed
];

const workCategories = [
  {
    id: 1,
    name: "Brand Identity",
    projects: [
      {
        id: 101,
        title: "Logo Redesign",
        thumbnail: "/dummy.jpg",
      },
      {
        id: 102,
        title: "Visual Identity",
        thumbnail: "/dummy.jpg",
      },
      {
        id: 103,
        title: "Rebranding Project",
        thumbnail: "/dummy.jpg",
      },
      {
        id: 104,
        title: "Stationery Design",
        thumbnail: "/dummy.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Book Design",
    projects: [
      {
        id: 201,
        title: "Children’s Book",
        thumbnail: "/dummy.jpg",
      },
      {
        id: 202,
        title: "Coffee Table Book",
        thumbnail: "/dummy.jpg",
      },
      {
        id: 203,
        title: "Academic Book",
        thumbnail: "/dummy.jpg",
      },
      { id: 204, title: "Magazine Layout", thumbnail: "/dummy.jpg" },
    ],
  },
  // Add more categories as needed
];

const allProjects = [
  { id: 301, title: "Campaign Design", thumbnail: "/dummy.jpg" },
  { id: 302, title: "Website Redesign", thumbnail: "/dummy.jpg" },
  {
    id: 303,
    title: "Social Media Graphics",
    thumbnail: "/dummy.jpg",
  },
  { id: 304, title: "Product Packaging", thumbnail: "/dummy.jpg" },
  // Add more projects as needed
];

const Work = () => {
  const [activeTab, setActiveTab] = useState("client"); // Set default tab

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Our Work
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("client")}
          className={`text-lg ${
            activeTab === "client"
              ? "text-gray-800 font-semibold"
              : "text-gray-600"
          }`}
        >
          Type of Client
        </button>
        <button
          onClick={() => setActiveTab("work")}
          className={`text-lg ${
            activeTab === "work"
              ? "text-gray-800 font-semibold"
              : "text-gray-600"
          }`}
        >
          Type of Work
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`text-lg ${
            activeTab === "projects"
              ? "text-gray-800 font-semibold"
              : "text-gray-600"
          }`}
        >
          All Projects
        </button>
      </div>

      {/* Content for each tab */}
      <div>
        {activeTab === "client" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientCategories.map((category) => (
              <div key={category.id} className="text-center">
                <Image
                  src={category.thumbnail}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}

        {activeTab === "work" && (
          <div className="space-y-12">
            {workCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.projects.slice(0, 4).map((project) => (
                    <div key={project.id} className="text-center">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                        width={100}
                        height={100}
                      />
                      <p className="text-lg text-gray-700">{project.title}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-blue-500 hover:text-blue-600 font-medium">
                  View All
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProjects.map((project) => (
              <div key={project.id} className="text-center">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                  width={100}
                  height={100}
                />
                <p className="text-lg text-gray-700">{project.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
