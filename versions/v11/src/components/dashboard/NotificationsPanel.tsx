import React from 'react';
import { Bell, X } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { format } from 'date-fns';

function NotificationsPanel() {
  const { notifications, markAsRead, removeNotification } = useNotificationStore();
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell size={20} />
          Notifications
          {unreadNotifications.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadNotifications.length}
            </span>
          )}
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune notification</p>
        ) : (
          notifications.slice(0, 5).map(notification => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;