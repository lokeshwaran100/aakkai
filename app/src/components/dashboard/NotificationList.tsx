import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { Notification } from '../../types';

export const NotificationList = () => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('recipient_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return;
    }

    setNotifications(data || []);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return;
    }

    fetchNotifications();
  };

  const deleteNotification = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting notification:', error);
      return;
    }

    fetchNotifications();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You don't have any notifications at the moment.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${
                !notification.read ? 'border-l-4 border-primary-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-primary-500"
                      title="Mark as read"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    title="Delete notification"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};