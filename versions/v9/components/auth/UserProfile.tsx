import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { User } from '../../types/auth';
import { Camera } from 'lucide-react';

function UserProfile() {
  const { user, updateUser, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<Partial<User>>(user || {});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(userData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profil utilisateur</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}`}
            alt={user.displayName}
            className="w-24 h-24 rounded-full"
          />
          {isEditing && (
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full">
              <Camera size={16} />
            </button>
          )}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-medium">{user.displayName}</h3>
          <p className="text-gray-500">{user.role}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            value={userData.displayName}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              displayName: e.target.value
            }))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Préférences de notifications
          </label>
          <div className="space-y-2">
            {Object.entries(user.preferences.notifications).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      notifications: {
                        ...prev.preferences?.notifications,
                        [key]: e.target.checked
                      }
                    }
                  }))}
                  disabled={!isEditing}
                  className="rounded text-blue-600 mr-2"
                />
                <span className="text-sm">
                  {key === 'email' ? 'Notifications par email' :
                   key === 'push' ? 'Notifications push' :
                   'Notifications bureau'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserProfile;