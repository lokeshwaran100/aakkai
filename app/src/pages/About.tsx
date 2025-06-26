import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  {
    icon: <Users size={24} />,
    value: '50+',
    label: 'Happy Clients',
  },
  {
    icon: <Award size={24} />,
    value: '15+',
    label: 'Awards Won',
  },
  {
    icon: <Clock size={24} />,
    value: '10+',
    label: 'Years Experience',
  },
];

const team = [
  {
    name: 'Emma Thompson',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    bio: 'With over 15 years of experience in brand strategy and design, Emma leads our creative vision.',
  },
  {
    name: 'David Chen',
    role: 'Lead UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    bio: 'David specializes in creating intuitive and beautiful user experiences that drive results.',
  },
  {
    name: 'Sarah Miller',
    role: 'Brand Strategist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    bio: 'Sarah helps businesses discover and articulate their unique brand story and position in the market.',
  },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-primary-50/10 to-neutral-50 dark:from-gray-900 dark:via-primary-900/10 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400 dark:bg-none dark:text-white">
              About Aakkai
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're a team of passionate designers and strategists dedicated to transforming brands through innovative design solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 text-center border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
              >
                <div className="flex justify-center mb-4 text-primary-500">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400 dark:bg-none dark:text-white">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-primary-500 mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-conic from-primary-600 via-accent-600 to-neon-500 opacity-10 dark:opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-50/40 via-neutral-50 to-neutral-50 dark:from-accent-900/40 dark:via-gray-900 dark:to-gray-900"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400 dark:bg-none dark:text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary together.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl 
                      text-white bg-gradient-to-r from-primary-500 via-accent-500 to-neon-500 
                      hover:from-primary-600 hover:via-accent-600 hover:to-neon-600 
                      dark:bg-white dark:text-black dark:bg-none dark:hover:bg-gray-100 dark:shadow-none"
          >
            Get in Touch
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};