import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag, User, Clock, CheckCircle, Pause, Play, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { MemberProject } from '../types';

export const Work = () => {
  const [selectedTab, setSelectedTab] = useState('client');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projects, setProjects] = useState<MemberProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('member_projects')
        .select(`
          *,
          team_members (
            id,
            role,
            expertise
          )
        `)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTeamMemberName = (project: any) => {
    if (project.team_members?.role === 'Creative Director') {
      return 'Admin User';
    } else if (project.team_members?.role === 'Senior Designer') {
      return 'Team Member';
    }
    return project.team_members?.role || 'Team Member';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'in_progress':
        return <Play size={16} className="text-yellow-500" />;
      case 'on_hold':
        return <Pause size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-blue-500" />;
    }
  };

  const handleViewPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  // Group projects by client category (based on team member expertise)
  const clientCategories = [
    { 
      name: 'Branding Projects', 
      image: 'https://images.unsplash.com/photo-1594968973184-9040a5a79963?auto=format&fit=crop&q=80',
      projects: projects.filter(p => p.tags.some(tag => tag.toLowerCase().includes('brand')))
    },
    { 
      name: 'UI/UX Projects', 
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
      projects: projects.filter(p => p.tags.some(tag => tag.toLowerCase().includes('ui') || tag.toLowerCase().includes('ux')))
    },
    { 
      name: 'Digital Design', 
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80',
      projects: projects.filter(p => p.tags.some(tag => tag.toLowerCase().includes('web') || tag.toLowerCase().includes('mobile')))
    },
  ];

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

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const renderProjectCards = (categoryProjects: MemberProject[]) => (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {categoryProjects.map((project) => (
        <motion.div
          key={project.id}
          variants={item}
          className="group bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="relative overflow-hidden">
            <img
              src={project.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'}
              alt={project.title}
              className="object-cover w-full h-48 transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4">
              {getStatusIcon(project.status)}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {project.title}
              </h3>
              {project.pdf_url && (
                <button
                  onClick={() => handleViewPdf(project.pdf_url!)}
                  className="flex items-center space-x-1 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full text-xs hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  title="View PDF"
                >
                  <FileText size={12} />
                  <span>PDF</span>
                </button>
              )}
            </div>

            <div className="flex items-center mb-3">
              <User size={14} className="text-gray-400 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {getTeamMemberName(project)}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                    >
                      <Tag size={10} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {(project.start_date || project.end_date) && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {project.start_date && (
                    <span>{new Date(project.start_date).toLocaleDateString()}</span>
                  )}
                  {project.start_date && project.end_date && <span className="mx-1">-</span>}
                  {project.end_date && (
                    <span>{new Date(project.end_date).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading our work...</span>
          </div>
        </div>
      </div>
    );
  }

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
            {selectedCategory ? (
              <div className="space-y-6">
                {/* Back button and category header */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToCategories}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                    <span>Back to Categories</span>
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedCategory}
                  </h2>
                </div>

                {/* Project cards for selected category */}
                {(() => {
                  const category = clientCategories.find(cat => cat.name === selectedCategory);
                  return category && category.projects.length > 0 ? (
                    renderProjectCards(category.projects)
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No projects found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        No completed projects in this category yet.
                      </p>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* Category overview */
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
                    className="group relative overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-64 transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent group-hover:from-gray-900/90 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                        <p className="text-gray-300 mb-3">
                          {category.projects.length} Projects
                        </p>
                        <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium">View Projects</span>
                          <ArrowRight size={16} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="all">
            {renderProjectCards(projects)}
          </TabsContent>
        </Tabs>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No completed projects yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Check back soon to see our latest work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};