import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Send, Trash2 } from 'lucide-react';
import type { TeamMember } from '../../types';

export const NotificationManager = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    recipientId: '',
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
    
    setTeamMembers(data || []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('notifications')
      .insert([{
        title: formData.title,
        message: formData.message,
        recipient_id: formData.recipientId,
      }]);

    if (error) {
      console.error('Error sending notification:', error);
      return;
    }

    setIsCreating(false);
    setFormData({ title: '', message: '', recipientId: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          <PlusCircle size={20} />
          <span>New Notification</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient</label>
            <select
              name="recipientId"
              value={formData.recipientId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Select a team member</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.user_id}>
                  {member.role}
                </option>
              ))}
            </select>
          </div>

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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              <Send size={18} />
              <span>Send Notification</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};