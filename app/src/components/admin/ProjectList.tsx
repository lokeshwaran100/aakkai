import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import type { Project } from '../../types';

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }
    
    setProjects(data || []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    const { error } = editingProject
      ? await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
      : await supabase
          .from('projects')
          .insert([projectData]);

    if (error) {
      console.error('Error saving project:', error);
      return;
    }

    setIsAddingProject(false);
    setEditingProject(null);
    setFormData({ title: '', description: '', imageUrl: '', tags: '' });
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      tags: project.tags.join(', '),
    });
    setIsAddingProject(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return;
    }

    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={() => setIsAddingProject(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          <PlusCircle size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {isAddingProject && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingProject(false);
                setEditingProject(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {editingProject ? 'Update' : 'Add'} Project
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {project.description}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};