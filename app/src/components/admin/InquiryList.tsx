import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle, XCircle, Clock, Mail, Calendar, User, Tag } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { Inquiry } from '../../types';

export const InquiryList = () => {
  const { isAdmin, user } = useAuthStore();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchInquiries();
    }
  }, [isAdmin]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching inquiries as admin...');
      console.log('Current user:', user);
      
      // For dummy admin, we'll use a direct query without RLS restrictions
      // by using the service role or bypassing RLS temporarily
      const { data, error } = await supabase
        .rpc('get_all_inquiries_admin');
      
      if (error) {
        console.error('RPC error, falling back to direct query:', error);
        
        // Fallback: Try direct query with RLS bypass
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (fallbackError) {
          console.error('Fallback query error:', fallbackError);
          throw fallbackError;
        }
        
        console.log('Fallback data:', fallbackData);
        
        // Map database fields to component expected format
        const mappedInquiries = (fallbackData || []).map(inquiry => ({
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          service: inquiry.service || 'General Inquiry',
          message: inquiry.message,
          status: inquiry.status,
          createdAt: inquiry.created_at,
        }));
        
        setInquiries(mappedInquiries);
        return;
      }
      
      console.log('RPC data:', data);
      
      // Map RPC response
      const mappedInquiries = (data || []).map((inquiry: any) => ({
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        service: inquiry.service || 'General Inquiry',
        message: inquiry.message,
        status: inquiry.status,
        createdAt: inquiry.created_at,
      }));
      
      setInquiries(mappedInquiries);
    } catch (err: any) {
      console.error('Error fetching inquiries:', err);
      setError(err.message || 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'new' | 'in_progress' | 'completed') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status } : inquiry
        )
      );
    } catch (err: any) {
      console.error('Error updating inquiry status:', err);
      setError(err.message || 'Failed to update inquiry status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'in_progress':
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return <XCircle className="text-red-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'Branding':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'UI/UX Designing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredInquiries = selectedStatus === 'all'
    ? inquiries
    : inquiries.filter(inquiry => inquiry.status === selectedStatus);

  const getStatusCounts = () => {
    return {
      all: inquiries.length,
      new: inquiries.filter(i => i.status === 'new').length,
      in_progress: inquiries.filter(i => i.status === 'in_progress').length,
      completed: inquiries.filter(i => i.status === 'completed').length,
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
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading inquiries...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <XCircle className="text-red-500 mr-2" size={20} />
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading Inquiries</h3>
        </div>
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchInquiries}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Client Inquiries
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and respond to client inquiries
          </p>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Status ({statusCounts.all})</option>
          <option value="new">New ({statusCounts.new})</option>
          <option value="in_progress">In Progress ({statusCounts.in_progress})</option>
          <option value="completed">Completed ({statusCounts.completed})</option>
        </select>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Mail className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{statusCounts.all}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <XCircle className="text-red-600 dark:text-red-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{statusCounts.new}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{statusCounts.in_progress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{statusCounts.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Mail size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No inquiries found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {selectedStatus === 'all' 
              ? 'No client inquiries have been submitted yet.'
              : `No inquiries with status "${selectedStatus.replace('_', ' ')}" found.`
            }
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      Client
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      Contact
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Tag size={16} className="mr-2" />
                      Service
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Date
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {inquiry.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a 
                        href={`mailto:${inquiry.email}`}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                      >
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getServiceColor(inquiry.service)}`}>
                        {inquiry.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-300 max-w-xs">
                        <p className="line-clamp-3 leading-relaxed">{inquiry.message}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      <br />
                      <span className="text-xs">
                        {new Date(inquiry.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(inquiry.status)}
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value as 'new' | 'in_progress' | 'completed')}
                          className="text-sm rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};