import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { UserCircle, Bell, FolderKanban } from 'lucide-react';
import { ProfileManager } from '../../components/dashboard/ProfileManager';
import { NotificationList } from '../../components/dashboard/NotificationList';
import { ProjectManager } from '../../components/dashboard/ProjectManager';

export const TeamDashboard = () => {
  const navigate = useNavigate();
  const { isTeamMember } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isTeamMember) {
      navigate('/login');
    }
  }, [isTeamMember, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <UserCircle size={20} />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FolderKanban size={20} />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-6">
            {activeTab === 'profile' && <ProfileManager />}
            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'notifications' && <NotificationList />}
          </div>
        </div>
      </div>
    </div>
  );
};