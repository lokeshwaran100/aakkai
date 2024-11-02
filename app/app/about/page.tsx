// pages/about.tsx
import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        About Us
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Welcome to Aakkai! We are a creative studio specializing in branding and
        illustration that brings ideas to life. Our team is passionate about
        transforming your vision into captivating visual stories that resonate
        and inspire. With a focus on innovation, creativity, and quality, we
        deliver designs that make an impact and connect with audiences.
      </p>

      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Our Mission
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        At Aakkai, our mission is to empower brands and individuals through
        exceptional design. We believe in the power of creativity to make a
        difference and are committed to crafting solutions that are not only
        visually stunning but also strategically sound. Whether you’re a
        startup, an established brand, or an individual, we’re here to help you
        express yourself in the most authentic way.
      </p>

      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Why Choose Us?
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-8 space-y-2">
        <li>
          High-quality, personalized designs tailored to your brand’s needs
        </li>
        <li>Experienced team of illustrators and brand strategists</li>
        <li>Commitment to creativity, detail, and excellence</li>
        <li>Collaborative process to bring your vision to life</li>
      </ul>

      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Meet the Team
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Our team is made up of skilled designers, illustrators, and strategists
        who are dedicated to helping brands tell their unique stories. We pride
        ourselves on our collaborative approach, ensuring that each project is
        handled with care, creativity, and professionalism.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Thank you for considering Aakkai for your branding and illustration
        needs. We look forward to partnering with you and helping you bring your
        vision to life.
      </p>
    </div>
  );
};

export default About;
