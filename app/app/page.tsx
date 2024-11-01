// page.tsx
import React from "react";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("/logo.png")' }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center px-6">
            <h1 className="text-5xl font-bold text-white mb-4">AAKKAI</h1>
            <p className="text-lg text-white mb-6">
              Crafting Visual Identities with Impactful Branding & Illustration
            </p>
            <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded hover:bg-gray-100">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">About Aakkai</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Aakkai is dedicated to bringing brands to life through visually
          stunning illustrations and memorable branding experiences. Our team of
          creative experts combines art and strategy to create unique identities
          for modern brands.
        </p>
        <img
          src="/images/about-image.jpg"
          alt="About Aakkai"
          className="mx-auto rounded-lg shadow-lg max-w-lg"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Brand Strategy</h3>
            <p>
              We create strategic plans that define and express brand identities
              effectively.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Custom Illustrations</h3>
            <p>
              Beautiful, hand-crafted illustrations tailored to represent your
              brand's story.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Identity Design</h3>
            <p>
              Crafting cohesive visuals that make your brand recognizable and
              memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p>
              "Aakkai transformed our brand vision into something truly
              remarkable!"
            </p>
            <p className="mt-4 font-semibold">- Jane Doe, CEO of CreativeCo</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p>
              "Their illustrations have made our marketing stand out. Highly
              recommend!"
            </p>
            <p className="mt-4 font-semibold">
              - John Smith, Head of Marketing
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Step 1</h3>
            <p>Connect with us to discuss your brand's needs and vision.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Step 2</h3>
            <p>Our team designs unique concepts that align with your goals.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Step 3</h3>
            <p>
              Finalize your brand identity with stunning visuals and
              illustrations.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Elevate Your Brand?
        </h2>
        <p className="text-lg mb-6">
          Let’s make your brand unforgettable. Reach out to us to get started!
        </p>
        <button className="px-8 py-3 bg-white text-gray-800 font-semibold rounded hover:bg-gray-100">
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-gray-900 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Aakkai. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="mx-2 hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="mx-2 hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="mx-2 hover:text-white">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
