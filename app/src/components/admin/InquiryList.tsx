import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Inquiry } from '../../types';

export const InquiryList = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching inquiries:', error);
      return;
    }
    
    setInquiries(data || []);
  };

  const handleStatusChange = async (id: string, status: 'new' | 'in_progress' | 'completed') => {
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating inquiry status:', error);
      return;
    }

    fetchInquiries();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in_progress':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <XCircle className="text-red-500" size={20} />;
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

  const filteredInquiries = selectedStatus === 'all'
    ? inquiries
    : inquiries.filter(inquiry => inquiry.status === selectedStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inquiries</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Message
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Date
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {filteredInquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                  {inquiry.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {inquiry.email}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    {inquiry.message}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                    {getStatusIcon(inquiry.status)}
                    <span className="ml-1 capitalize">{inquiry.status.replace('_', ' ')}</span>
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <select
                    value={inquiry.status}
                    onChange={(e) => handleStatusChange(inquiry.id, e.target.value as 'new' | 'in_progress' | 'completed')}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};