import { create } from 'zustand';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications]
    }));

    // Afficher une toast notification
    toast(notification.title, {
      description: notification.message,
      action: notification.link ? {
        label: 'Voir',
        onClick: () => window.location.href = notification.link!
      } : undefined
    });
  },

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    )
  })),

  clearAll: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
}));