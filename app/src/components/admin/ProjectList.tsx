import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadPdfToStorage, deletePdfFromStorage } from '../../lib/storage';
import { PlusCircle, Pencil, Trash2, Calendar, Tag, Clock, CheckCircle, Pause, Play, User, Eye, FileText, Upload, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { PROJECT_CATEGORIES } from '../../types';
import type { MemberProject, TeamMember } from '../../types';

export const ProjectList = () => {
  const { isAdmin } = useAuthStore();
  const [projects, setProjects] = useState<MemberProject[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<MemberProject | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: '',
    status: 'planning' as 'planning' | 'in_progress' | 'completed' | 'on_hold',
    startDate: '',
    endDate: '',
    memberId: '',
    category: 'Others',
    pdfUrl: '',
    pdfFilename: '',
  });

  const statusOptions = [
    { value: 'planning', label: 'Planning', icon: <Clock size={16} />, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { value: 'in_progress', label: 'In Progress', icon: <Play size={16} />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { value: 'completed', label: 'Completed', icon: <CheckCircle size={16} />, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { value: 'on_hold', label: 'On Hold', icon: <Pause size={16} />, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  ];

  useEffect(() => {
    if (isAdmin) {
      fetchTeamMembers();
      fetchProjects();
    }
  }, [isAdmin]);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('role');
      
      if (error) throw error;
      setTeamMembers(data || []);
    } catch (err: any) {
      console.error('Error fetching team members:', err);
      setError(err.message || 'Failed to fetch team members');
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('member_projects')
        .select(`
          *,
          team_members (
            id,
            role,
            user_id
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('PDF file size must be less than 10MB');
      return;
    }

    setUploadingPdf(true);
    setError(null);

    try {
      const result = await uploadPdfToStorage(file, editingProject?.id);
      
      if (result) {
        setFormData(prev => ({
          ...prev,
          pdfUrl: result.url,
          pdfFilename: result.filename,
        }));
      } else {
        throw new Error('Failed to upload PDF');
      }
    } catch (err: any) {
      console.error('Error uploading PDF:', err);
      setError('Failed to upload PDF. Please try again.');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        image_url: formData.imageUrl || null,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: formData.status,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        member_id: formData.memberId,
        category: formData.category,
        pdf_url: formData.pdfUrl || null,
        pdf_filename: formData.pdfFilename || null,
      };

      if (editingProject) {
        // If we're editing and there's a new PDF, delete the old one
        if (editingProject.pdf_url && formData.pdfUrl && editingProject.pdf_url !== formData.pdfUrl) {
          await deletePdfFromStorage(editingProject.pdf_url);
        }

        const { error } = await supabase
          .from('member_projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('member_projects')
          .insert([projectData]);

        if (error) throw error;
      }

      setIsAddingProject(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        tags: '',
        status: 'planning',
        startDate: '',
        endDate: '',
        memberId: '',
        category: 'Others',
        pdfUrl: '',
        pdfFilename: '',
      });
      fetchProjects();
    } catch (err: any) {
      console.error('Error saving project:', err);
      setError(err.message || 'Failed to save project');
    }
  };

  const handleEdit = (project: MemberProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.image_url || '',
      tags: project.tags.join(', '),
      status: project.status,
      startDate: project.start_date || '',
      endDate: project.end_date || '',
      memberId: project.member_id,
      category: project.category || 'Others',
      pdfUrl: project.pdf_url || '',
      pdfFilename: project.pdf_filename || '',
    });
    setIsAddingProject(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      // Find the project to get PDF URL for deletion
      const project = projects.find(p => p.id === id);
      
      const { error } = await supabase
        .from('member_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Delete PDF from storage if it exists
      if (project?.pdf_url) {
        await deletePdfFromStorage(project.pdf_url);
      }

      fetchProjects();
    } catch (err: any) {
      console.error('Error deleting project:', err);
      setError(err.message || 'Failed to delete project');
    }
  };

  const getStatusConfig = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const getTeamMemberName = (project: any) => {
    if (project.team_members?.role === 'Creative Director') {
      return 'Admin User';
    } else if (project.team_members?.role === 'Senior Designer') {
      return 'Team Member';
    }
    return project.team_members?.role || 'Unknown';
  };

  const handleViewPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  const filteredProjects = projects.filter(project => {
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
    const memberMatch = selectedMember === 'all' || project.member_id === selectedMember;
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    return statusMatch && memberMatch && categoryMatch;
  });

  const getStatusCounts = () => {
    return {
      all: projects.length,
      planning: projects.filter(p => p.status === 'planning').length,
      in_progress: projects.filter(p => p.status === 'in_progress').length,
      completed: projects.filter(p => p.status === 'completed').length,
      on_hold: projects.filter(p => p.status === 'on_hold').length,
    };
  };

  const statusCounts = getStatusCounts();

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all team member projects
          </p>
        </div>
        <button
          onClick={() => setIsAddingProject(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Status ({statusCounts.all})</option>
          <option value="planning">Planning ({statusCounts.planning})</option>
          <option value="in_progress">In Progress ({statusCounts.in_progress})</option>
          <option value="completed">Completed ({statusCounts.completed})</option>
          <option value="on_hold">On Hold ({statusCounts.on_hold})</option>
        </select>

        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Team Members</option>
          {teamMembers.map(member => (
            <option key={member.id} value={member.id}>
              {member.role}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          {PROJECT_CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusOptions.map((status) => (
          <div key={status.value} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${status.color.split(' ')[0]}-100 dark:${status.color.split(' ')[0]}-900`}>
                {status.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{status.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {statusCounts[status.value as keyof typeof statusCounts]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Project Form */}
      {isAddingProject && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAddingProject(false);
                setEditingProject(null);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Member</label>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select team member</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {PROJECT_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* PDF Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project PDF (Optional)
            </label>
            <div className="space-y-3">
              {formData.pdfUrl && (
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="text-red-500" size={20} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {formData.pdfFilename || 'Project PDF'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pdfUrl: '', pdfFilename: '' }))}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Upload size={16} />
                  <span>{uploadingPdf ? 'Uploading...' : 'Upload PDF'}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                    disabled={uploadingPdf}
                  />
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Max 10MB, PDF only
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Branding, UI Design, Mobile App"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingProject(false);
                setEditingProject(null);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              {editingProject ? 'Update' : 'Add'} Project
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Eye size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {selectedStatus === 'all' && selectedMember === 'all' && selectedCategory === 'all'
              ? 'No projects have been created yet.'
              : 'No projects match the selected filters.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => {
            const statusConfig = getStatusConfig(project.status);
            return (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {project.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                      {statusConfig.icon}
                      <span className="ml-1">{statusConfig.label}</span>
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <User size={14} className="text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {getTeamMemberName(project)}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
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
                            <Tag size={12} className="mr-1" />
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
                    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
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

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                        title="Edit project"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {project.pdf_url && (
                      <button
                        onClick={() => handleViewPdf(project.pdf_url!)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        title="View PDF"
                      >
                        <FileText size={14} />
                        <span>PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};