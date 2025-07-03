import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { CheckCircle, XCircle } from 'lucide-react';
import type { TeamMember } from '../../types';

export const ProfileManager = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<TeamMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingAvailability, setIsUpdatingAvailability] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    expertise: [] as string[],
    experience: '',
    imageUrl: '',
  });

  // Service options for expertise dropdown
  const serviceOptions = [
    'Branding',
    'UI/UX Designing'
  ];

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Fetching profile for user:', user?.id);

      // First, try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        throw fetchError;
      }

      if (existingProfile) {
        console.log('Found existing profile:', existingProfile);
        setProfile(existingProfile);
        setFormData({
          name: getUserDisplayName(),
          expertise: existingProfile.expertise || [],
          experience: existingProfile.experience || '',
          imageUrl: existingProfile.image_url || '',
        });
      } else {
        console.log('No existing profile found, checking if one exists in database...');
        
        // For dummy users, check if profile already exists with the correct user_id
        const { data: allProfiles, error: allProfilesError } = await supabase
          .from('team_members')
          .select('*');
        
        if (allProfilesError) {
          console.error('Error fetching all profiles:', allProfilesError);
        } else {
          console.log('All profiles in database:', allProfiles);
          
          // Check if there's a profile that should belong to this user
          const matchingProfile = allProfiles?.find(p => 
            (user?.email === 'admin@aakkai.com' && p.role === 'Creative Director') ||
            (user?.email === 'team@aakkai.com' && p.role === 'Senior Designer')
          );
          
          if (matchingProfile) {
            console.log('Found matching profile, updating user_id:', matchingProfile);
            
            // Update the profile to have the correct user_id
            const { data: updatedProfile, error: updateError } = await supabase
              .from('team_members')
              .update({ user_id: user?.id })
              .eq('id', matchingProfile.id)
              .select()
              .single();
            
            if (updateError) {
              console.error('Error updating profile user_id:', updateError);
              throw updateError;
            }
            
            setProfile(updatedProfile);
            setFormData({
              name: getUserDisplayName(),
              expertise: updatedProfile.expertise || [],
              experience: updatedProfile.experience || '',
              imageUrl: updatedProfile.image_url || '',
            });
          } else {
            console.log('No matching profile found, creating new one...');
            
            // Create a new profile
            const newProfileData = {
              user_id: user?.id,
              role: user?.email === 'admin@aakkai.com' ? 'Creative Director' : 'Team Member',
              expertise: [],
              experience: '',
              is_available: true,
              image_url: ''
            };
            
            const { data: newProfile, error: createError } = await supabase
              .from('team_members')
              .insert([newProfileData])
              .select()
              .single();

            if (createError) {
              console.error('Error creating profile:', createError);
              throw createError;
            }

            console.log('Created new profile:', newProfile);
            setProfile(newProfile);
            setFormData({
              name: getUserDisplayName(),
              expertise: [],
              experience: '',
              imageUrl: '',
            });
          }
        }
      }
    } catch (err: any) {
      console.error('Error in fetchProfile:', err);
      setError(err.message || 'Failed to load profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDisplayName = () => {
    if (user?.email === 'admin@aakkai.com') {
      return 'Admin User';
    } else if (user?.email === 'team@aakkai.com') {
      return 'Team Member';
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpertiseChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(service)
        ? prev.expertise.filter(item => item !== service)
        : [...prev.expertise, service]
    }));
  };

  const handleAvailabilityToggle = async () => {
    if (!profile) return;

    try {
      setIsUpdatingAvailability(true);
      setError(null);

      const newAvailability = !profile.is_available;

      const { error: updateError } = await supabase
        .from('team_members')
        .update({ is_available: newAvailability })
        .eq('user_id', user?.id);

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, is_available: newAvailability } : null);
    } catch (err: any) {
      console.error('Error updating availability:', err);
      setError(err.message || 'Failed to update availability. Please try again.');
    } finally {
      setIsUpdatingAvailability(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const updateData = {
        expertise: formData.expertise,
        experience: formData.experience,
        image_url: formData.imageUrl,
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading profile...</span>
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Availability Toggle Button */}
          <button
            onClick={handleAvailabilityToggle}
            disabled={isUpdatingAvailability}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              profile.is_available
                ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
            } ${isUpdatingAvailability ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUpdatingAvailability ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : profile.is_available ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
            <span>
              {isUpdatingAvailability 
                ? 'Updating...' 
                : profile.is_available 
                  ? 'Available' 
                  : 'Unavailable'
              }
            </span>
          </button>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Name cannot be edited
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Expertise
            </label>
            <div className="space-y-2">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.expertise.includes(service)}
                    onChange={() => handleExpertiseChange(service)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{service}</span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select your areas of expertise
            </p>
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
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</h4>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{getUserDisplayName()}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</h4>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.role}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.expertise && profile.expertise.length > 0 ? (
                  profile.expertise.map((exp, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {exp}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">No expertise specified</span>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {profile.experience || 'No experience description provided'}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Current Status:</span>
                <span
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                    profile.is_available
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {profile.is_available ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  <span>{profile.is_available ? 'Available for projects' : 'Not available'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};