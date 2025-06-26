import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import type { TeamMember } from '../../types';

export const ProfileManager = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<TeamMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    expertise: '',
    experience: '',
    imageUrl: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: existingProfile, error: fetchError } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (!existingProfile) {
        const { data: newProfile, error: createError } = await supabase
          .from('team_members')
          .insert([{
            user_id: user?.id,
            role: 'Team Member',
            expertise: [],
            experience: '',
            is_available: true,
            image_url: ''
          }])
          .select()
          .single();

        if (createError) {
          throw createError;
        }

        setProfile(newProfile);
        setFormData({
          expertise: '',
          experience: '',
          imageUrl: '',
          isAvailable: true,
        });
      } else {
        setProfile(existingProfile);
        setFormData({
          expertise: existingProfile.expertise?.join(', ') || '',
          experience: existingProfile.experience || '',
          imageUrl: existingProfile.image_url || '',
          isAvailable: existingProfile.is_available ?? true,
        });
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'Failed to load profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const updateData = {
        expertise: formData.expertise.split(',').map(item => item.trim()).filter(Boolean),
        experience: formData.experience,
        image_url: formData.imageUrl,
        is_available: formData.isAvailable,
      };

      const { error: updateError } = await supabase
        .from('team_members')
        .update(updateData)
        .eq('user_id', user?.id);

      if (updateError) {
        throw updateError;
      }

      setIsEditing(false);
      await fetchProfile();
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={fetchProfile}
          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-yellow-600 dark:text-yellow-400">No profile found. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expertise (comma-separated)
            </label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., UI Design, Brand Strategy, UX Research"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe your professional experience..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/your-image.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Available for new projects
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {profile.image_url && (
            <img
              src={profile.image_url}
              alt={profile.role}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{profile.role}</h3>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.expertise?.map((exp, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{profile.experience}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    profile.is_available
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {profile.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};