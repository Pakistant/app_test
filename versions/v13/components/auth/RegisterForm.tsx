import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { RegisterData } from '../../types/auth';

function RegisterForm() {
  const { register, loading, error } = useAuthStore();
  const [data, setData] = useState<RegisterData>({
    email: '',
    password: '',
    displayName: '',
    role: 'photographer'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Les Marvelous
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Créez votre compte
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="displayName" className="sr-only">
                Nom complet
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={data.displayName}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  displayName: e.target.value
                }))}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nom complet"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Rôle
              </label>
              <select
                id="role"
                name="role"
                required
                value={data.role}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  role: e.target.value as RegisterData['role']
                }))}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              >
                <option value="photographer">Photographe</option>
                <option value="videographer">Vidéaste</option>
                <option value="editor">Monteur</option>
                <option value="manager">Chef d'équipe</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;