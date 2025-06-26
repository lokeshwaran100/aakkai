import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  type: string;
  thumbnail: string;
  client: string;
  clientCategory: string;
}

const workData: WorkItem[] = [
  {
    id: '1',
    title: 'National Gallery Exhibition',
    category: 'Brand Identity',
    type: 'Arts & Culture',
    thumbnail: 'https://images.unsplash.com/photo-1594968973184-9040a5a79963?auto=format&fit=crop&q=80',
    client: 'National Gallery',
    clientCategory: 'Arts & Culture'
  },
  {
    id: '2',
    title: 'FinTech Mobile App',
    category: 'Digital Design',
    type: 'Banking & Finance',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
    client: 'Digital Bank',
    clientCategory: 'Banking & Finance'
  },
  {
    id: '3',
    title: 'City Library Rebrand',
    category: 'Brand Identity',
    type: 'Civic & Public',
    thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80',
    client: 'City Library',
    clientCategory: 'Civic & Public'
  },
];

const clientCategories = [
  { name: 'Arts & Culture', image: 'https://images.unsplash.com/photo-1594968973184-9040a5a79963?auto=format&fit=crop&q=80' },
  { name: 'Banking & Finance', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80' },
  { name: 'Civic & Public', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80' },
];

const workCategories = [
  { name: 'Brand Identity', count: 12 },
  { name: 'Book Design', count: 8 },
  { name: 'Campaigns', count: 15 },
  { name: 'Digital Design', count: 10 },
];

export const Work = () => {
  const [selectedTab, setSelectedTab] = useState('client');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-neon-400 dark:bg-none dark:text-white">
          Our Work
        </h1>

        <Tabs defaultValue="client" className="space-y-8">
          <TabsList className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger
              value="client"
              className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                selectedTab === 'client'
                  ? 'text-gray-900 dark:text-white border-b-2 border-primary-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setSelectedTab('client')}
            >
              Type of Client
            </TabsTrigger>
            <TabsTrigger
              value="work"
              className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                selectedTab === 'work'
                  ? 'text-gray-900 dark:text-white border-b-2 border-primary-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setSelectedTab('work')}
            >
              Type of Work
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                selectedTab === 'all'
                  ? 'text-gray-900 dark:text-white border-b-2 border-primary-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setSelectedTab('all')}
            >
              All Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {clientCategories.map((category) => (
                <motion.div
                  key={category.name}
                  variants={item}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-300">
                        {workData.filter(item => item.clientCategory === category.name).length} Projects
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="work">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {workCategories.map((category) => (
                <motion.div
                  key={category.name}
                  variants={item}
                  className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-lg p-6 space-y-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                    <span className="text-gray-500 dark:text-gray-400">{category.count} Projects</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {workData
                      .filter(item => item.category === category.name)
                      .slice(0, 4)
                      .map(work => (
                        <div key={work.id} className="relative overflow-hidden rounded-lg">
                          <img
                            src={work.thumbnail}
                            alt={work.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                            <div className="absolute bottom-0 left-0 p-3">
                              <h4 className="text-sm font-medium text-white">{work.title}</h4>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <button className="flex items-center space-x-2 text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors">
                    <span>View All</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="all">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {workData.map((work) => (
                <motion.div
                  key={work.id}
                  variants={item}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{work.title}</h3>
                      <p className="text-gray-300">{work.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};