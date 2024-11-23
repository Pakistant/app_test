import React, { useState } from 'react';
import { Search, Archive, Home, List, Calendar, Clock } from 'lucide-react';
import ProjectList from './ProjectList';
import QuickStats from './dashboard/QuickStats';
import QuickFilters from './dashboard/QuickFilters';
import ImportExportProjects from './ImportExportProjects';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportExport, setShowImportExport] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'calendar' | 'timeline'>('list');

  return (
    <div className="space-y-6">
      {/* En-tête avec recherche et actions */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Home size={20} />
            <span className="hidden md:inline">Accueil</span>
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button 
          onClick={() => setShowImportExport(!showImportExport)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 md:ml-auto"
        >
          <Archive size={20} />
          <span className="hidden md:inline">Import/Export</span>
        </button>
      </div>

      {/* Navigation des vues */}
      <div className="flex items-center gap-4 border-b overflow-x-auto">
        <button
          onClick={() => setCurrentView('list')}
          className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap ${
            currentView === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
          }`}
        >
          <List size={20} />
          <span className="hidden md:inline">Liste</span>
        </button>
        <button
          onClick={() => setCurrentView('calendar')}
          className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap ${
            currentView === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
          }`}
        >
          <Calendar size={20} />
          <span className="hidden md:inline">Calendrier</span>
        </button>
        <button
          onClick={() => setCurrentView('timeline')}
          className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap ${
            currentView === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
          }`}
        >
          <Clock size={20} />
          <span className="hidden md:inline">Timeline</span>
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStats />
      </div>

      {/* Filtres rapides */}
      <div className="overflow-x-auto">
        <QuickFilters />
      </div>

      {showImportExport && <ImportExportProjects />}

      {/* Contenu principal selon la vue sélectionnée */}
      <ProjectList searchQuery={searchQuery} />
    </div>
  );
}

export default Dashboard;