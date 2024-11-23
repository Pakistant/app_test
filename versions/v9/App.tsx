import React, { useEffect } from 'react';
import { Plus, Camera, Building2 } from 'lucide-react';
import ProjectCreation from './components/ProjectCreation';
import StudioProjectCreation from './components/StudioProjectCreation';
import CorporateProjectCreation from './components/CorporateProjectCreation';
import Dashboard from './components/Dashboard';
import SeasonSelector from './components/SeasonSelector';
import NotificationCenter from './components/NotificationCenter';
import ThemeToggle from './components/ThemeToggle';
import { useState } from 'react';
import { useThemeStore } from './store/themeStore';
import { Toaster } from 'sonner';
import { Menu } from '@headlessui/react';

function App() {
  const [showProjectModal, setShowProjectModal] = useState<'wedding' | 'studio' | 'corporate' | null>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" theme={theme} />
      
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Les Marvelous
            </h1>
            <span className="text-gray-500 dark:text-gray-400">
              - Tableau de bord
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <SeasonSelector />
            <NotificationCenter />
            <ThemeToggle />
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={20} />
                <span>Nouveau projet</span>
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowProjectModal('wedding')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <Plus size={16} className="mr-3" />
                        Mariage
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowProjectModal('studio')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <Camera size={16} className="mr-3" />
                        Studio Photo
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowProjectModal('corporate')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <Building2 size={16} className="mr-3" />
                        Corporate
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard />
      </main>

      {showProjectModal === 'wedding' && (
        <ProjectCreation onClose={() => setShowProjectModal(null)} />
      )}
      {showProjectModal === 'studio' && (
        <StudioProjectCreation onClose={() => setShowProjectModal(null)} />
      )}
      {showProjectModal === 'corporate' && (
        <CorporateProjectCreation onClose={() => setShowProjectModal(null)} />
      )}
    </div>
  );
}

export default App;