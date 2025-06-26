import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Users, FolderKanban, MessageSquare, Bell } from 'lucide-react';
import { TeamMemberList } from '../../components/admin/TeamMemberList';
import { ProjectList } from '../../components/admin/ProjectList';
import { InquiryList } from '../../components/admin/InquiryList';
import { NotificationManager } from '../../components/admin/NotificationManager';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();
  const [activeTab, setActiveTab] = useState('team');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'team' 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users size={20} />
                <span>Team Members</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'projects'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FolderKanban size={20} />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'inquiries'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MessageSquare size={20} />
                <span>Inquiries</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'notifications'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-6">
            {activeTab === 'team' && <TeamMemberList />}
            {activeTab === 'projects' && <ProjectList />}
            {activeTab === 'inquiries' && <InquiryList />}
            {activeTab === 'notifications' && <NotificationManager />}
          </div>
        </div>
      </div>
    </div>
  );
};