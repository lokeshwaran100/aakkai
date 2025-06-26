import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import type { TeamMember } from '../../types';

export const TeamMemberList = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    role: '',
    expertise: '',
    experience: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*');
    
    if (error) {
      console.error('Error fetching team members:', error);
      return;
    }
    
    setMembers(data || []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const memberData = {
      ...formData,
      expertise: formData.expertise.split(',').map(item => item.trim()),
      is_available: true,
    };

    const { error } = editingMember
      ? await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id)
      : await supabase
          .from('team_members')
          .insert([memberData]);

    if (error) {
      console.error('Error saving team member:', error);
      return;
    }

    setIsAddingMember(false);
    setEditingMember(null);
    setFormData({ role: '', expertise: '', experience: '', imageUrl: '' });
    fetchTeamMembers();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      role: member.role,
      expertise: member.expertise.join(', '),
      experience: member.experience,
      imageUrl: member.imageUrl || '',
    });
    setIsAddingMember(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      return;
    }

    fetchTeamMembers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h2>
        <button
          onClick={() => setIsAddingMember(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          <PlusCircle size={20} />
          <span>Add Member</span>
        </button>
      </div>

      {(isAddingMember || editingMember) && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Select a role</option>
              <option value="UI Designer">UI Designer</option>
              <option value="UX Designer">UX Designer</option>
              <option value="Brand Strategist">Brand Strategist</option>
              <option value="Project Manager">Project Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expertise (comma-separated)
            </label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={3}
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
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingMember(false);
                setEditingMember(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {editingMember ? 'Update' : 'Add'} Member
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt={member.role}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.role}</h3>
                <div className="flex items-center space-x-2">
                  {member.is_available ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </div>
              </div>
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((exp, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.experience}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
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