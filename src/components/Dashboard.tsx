import React, { useState } from 'react';
import { Search, Archive, Home, List, Calendar, Clock, Grid, Table } from 'lucide-react';
import ProjectList from './ProjectList';
import ProjectGrid from './ProjectGrid';
import ProjectCalendar from './ProjectCalendar';
import QuickStats from './dashboard/QuickStats';
import QuickFilters from './dashboard/QuickFilters';
import DelayedTasks from './dashboard/DelayedTasks';
import ImportExportProjects from './ImportExportProjects';
import { Link } from 'react-router-dom';
import { useProjectStore } from '../store';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportExport, setShowImportExport] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'grid' | 'calendar'>('grid');
  const { filters } = useProjectStore();

  // Vérifier si on affiche les tâches en retard
  const showDelayedTasks = filters.status?.includes('en_retard');

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

      {/* Statistiques rapides */}
      <QuickStats />

      {/* Filtres rapides */}
      <QuickFilters />

      {/* Afficher les tâches en retard uniquement si le filtre est actif */}
      {showDelayedTasks && <DelayedTasks />}

      {showImportExport && <ImportExportProjects />}

      {/* Navigation des vues (seulement si on n'affiche pas les tâches en retard) */}
      {!showDelayedTasks && (
        <>
          <div className="flex items-center gap-4 border-b">
            <button
              onClick={() => setCurrentView('grid')}
              className={`flex items-center gap-2 px-4 py-2 ${
                currentView === 'grid' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              <Grid size={20} />
              <span className="hidden md:inline">Grille</span>
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`flex items-center gap-2 px-4 py-2 ${
                currentView === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              <List size={20} />
              <span className="hidden md:inline">Liste</span>
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 ${
                currentView === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              <Calendar size={20} />
              <span className="hidden md:inline">Calendrier</span>
            </button>
          </div>

          {/* Vue principale */}
          <div className="mt-6">
            {currentView === 'grid' && <ProjectGrid searchQuery={searchQuery} />}
            {currentView === 'list' && <ProjectList searchQuery={searchQuery} />}
            {currentView === 'calendar' && <ProjectCalendar />}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;