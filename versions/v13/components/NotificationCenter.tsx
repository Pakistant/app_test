import React from 'react';
import { Bell } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { useNotificationStore } from '../store/notificationStore';
import { format } from 'date-fns';

function NotificationCenter() {
  const { notifications, markAsRead, clearAll } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 text-gray-600 hover:text-gray-900">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            <button
              onClick={clearAll}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Tout marquer comme lu
            </button>
          </div>
        </div>

        <div className="divide-y">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Aucune notification
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    notification.type === 'warning' ? 'bg-yellow-400' :
                    notification.type === 'error' ? 'bg-red-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default NotificationCenter;