import React from 'react';
import { Flag, Camera, Building2, Clock, Filter } from 'lucide-react';
import { useProjectStore } from '../../store';

function QuickFilters() {
  const { filters, setFilters, resetFilters } = useProjectStore();

  const handleFilterClick = (type: string, value: string) => {
    setFilters({
      [type]: filters[type]?.includes(value)
        ? filters[type].filter(v => v !== value)
        : [...(filters[type] || []), value]
    });
  };

  return (
    <div className="space-y-4">
      {/* Filtres par pays */}
      <div>
        <h3 className="text-sm font-medium mb-2">Par pays</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterClick('country', 'fr')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.country?.includes('fr')
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <img src="https://flagcdn.com/fr.svg" alt="France" className="w-4 h-3" />
            France
          </button>
          <button
            onClick={() => handleFilterClick('country', 'cm')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.country?.includes('cm')
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <img src="https://flagcdn.com/cm.svg" alt="Cameroun" className="w-4 h-3" />
            Cameroun
          </button>
        </div>
      </div>

      {/* Filtres par type */}
      <div>
        <h3 className="text-sm font-medium mb-2">Par type</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterClick('type', 'wedding')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.type?.includes('wedding')
                ? 'bg-violet-100 text-violet-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Flag size={16} />
            Mariages
          </button>
          <button
            onClick={() => handleFilterClick('type', 'studio')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.type?.includes('studio')
                ? 'bg-cyan-100 text-cyan-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Camera size={16} />
            Studio
          </button>
          <button
            onClick={() => handleFilterClick('type', 'corporate')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.type?.includes('corporate')
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Building2 size={16} />
            Corporate
          </button>
        </div>
      </div>

      {/* Filtres par statut */}
      <div>
        <h3 className="text-sm font-medium mb-2">Par statut</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterClick('status', 'en_retard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.status?.includes('en_retard')
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock size={16} />
            En retard
          </button>
          <button
            onClick={() => handleFilterClick('status', 'en_cours')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.status?.includes('en_cours')
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En cours
          </button>
          <button
            onClick={() => handleFilterClick('status', 'termine')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              filters.status?.includes('termine')
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Terminés
          </button>
        </div>
      </div>

      {/* Bouton de réinitialisation */}
      {(filters.country?.length > 0 || filters.type?.length > 0 || filters.status?.length > 0) && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
        >
          <Filter size={16} />
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}

export default QuickFilters;