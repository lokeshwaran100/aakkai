import React from 'react';
import { ArrowRight, Palette, Lightbulb, Target, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    company: "DesignCraft Studios",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    quote: "Aakkai transformed our brand identity completely. Their strategic approach and attention to detail exceeded our expectations."
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "TechFlow",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    quote: "The UI/UX design they delivered increased our user engagement by 200%. Their team is incredibly talented and professional."
  },
  {
    name: "Emily Watson",
    role: "Marketing Director",
    company: "Innovate Inc",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    quote: "Working with Aakkai was a game-changer for our digital presence. They truly understand modern design trends."
  }
];

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive brand strategy, UI/UX design, digital product design, and brand identity development. Our services are tailored to help businesses create compelling digital experiences and strong brand presence."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A typical brand identity project takes 4-6 weeks, while a comprehensive digital product design might take 8-12 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you work with startups?",
    answer: "Yes! We love working with startups and have special packages designed for early-stage companies. We understand the unique challenges startups face and can help establish a strong brand foundation for growth."
  },
  {
    question: "What is your design process?",
    answer: "Our design process includes discovery, research, conceptualization, design, iteration, and implementation. We maintain clear communication throughout and involve clients in key decision points to ensure alignment with business goals."
  },
  {
    question: "How do you handle revisions?",
    answer: "Our process includes two rounds of revisions for each deliverable. We believe in getting things right and work closely with clients to ensure complete satisfaction with the final product."
  }
];

export const Home = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-conic from-primary-600 via-accent-600 to-neon-500 opacity-10 dark:opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-50/40 via-neutral-50 to-neutral-50 dark:from-accent-900/40 dark:via-gray-900 dark:to-gray-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-8">
            <Sparkles className="text-neon-500 dark:text-neon-400 animate-pulse-slow" size={24} />
            <span className="text-neon-500 dark:text-neon-400 font-medium tracking-wide">INNOVATION MEETS DESIGN</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400 animate-gradient">
              Transform Your Brand
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-400 via-accent-400 to-primary-400">
              Design Your Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            We craft exceptional brand experiences through strategic design and innovative UI/UX solutions.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-neon-500 hover:from-primary-600 hover:via-accent-600 hover:to-neon-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-500/20 text-white"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-primary-50/10 to-neutral-50 dark:from-gray-900 dark:via-primary-900/10 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We offer comprehensive solutions to elevate your brand and create meaningful connections with your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800/30 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:border-primary-500/50 transition-all duration-300 hover:shadow-primary">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Brand Strategy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Develop a compelling brand identity that resonates with your target audience and sets you apart from competitors.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800/30 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:border-accent-500/50 transition-all duration-300 hover:shadow-accent">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                UI Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create visually stunning interfaces that capture attention and deliver exceptional user experiences.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800/30 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:border-neon-500/50 transition-all duration-300 hover:shadow-neon">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-500 to-neon-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                UX Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimize user journeys and interactions to maximize engagement and conversion rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-accent-50/10 to-neutral-50 dark:from-gray-900 dark:via-accent-900/10 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400">
              Client Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-accent-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-accent-500">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-primary-50/10 to-neutral-50 dark:from-gray-900 dark:via-primary-900/10 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-conic from-primary-600 via-accent-600 to-neon-500 opacity-10 dark:opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-50/40 via-neutral-50 to-neutral-50 dark:from-accent-900/40 dark:via-gray-900 dark:to-gray-900"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's collaborate to create exceptional digital experiences that drive results.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-neon-500 hover:from-primary-600 hover:via-accent-600 hover:to-neon-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-500/20 text-white"
          >
            Contact Us
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};