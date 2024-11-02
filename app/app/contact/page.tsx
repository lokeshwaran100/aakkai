"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Add form submission logic here, such as API call
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Contact Us
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        We would love to hear from you! Whether you have a question about our
        services, want to discuss a potential project, or just want to say
        hello, feel free to reach out using the form below.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="text-lg text-gray-700 mt-8">
          Thank you for reaching out! We will get back to you as soon as
          possible.
        </div>
      )}
    </div>
  );
};

export default Contact;
