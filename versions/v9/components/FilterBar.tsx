import React from 'react';
import { Filter, X } from 'lucide-react';
import { useProjectStore } from '../store';

function FilterBar() {
  const { filters, setFilters, resetFilters } = useProjectStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    if (category === 'search' || category === 'date') {
      setFilters({ [category]: value });
    } else {
      const currentValues = filters[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setFilters({ [category]: newValues });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50"
        >
          <Filter size={16} />
          Filtres
          {Object.values(filters).some(v => 
            Array.isArray(v) ? v.length > 0 : Boolean(v)
          ) && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              Actif
            </span>
          )}
        </button>

        {Object.values(filters).some(v => 
          Array.isArray(v) ? v.length > 0 : Boolean(v)
        ) && (
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filtres</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Type de mariage */}
            <div>
              <h4 className="text-sm font-medium mb-2">Type de mariage</h4>
              <div className="flex gap-2">
                {['french', 'cameroonian'].map(type => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.weddingType.includes(type)}
                      onChange={() => handleFilterChange('weddingType', type)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">
                      {type === 'french' ? 'Français' : 'Camerounais'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Statut */}
            <div>
              <h4 className="text-sm font-medium mb-2">Statut</h4>
              <div className="flex gap-2">
                {['en_cours', 'en_retard', 'termine'].map(status => (
                  <label key={status} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleFilterChange('status', status)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">
                      {status === 'en_cours' ? 'En cours' :
                       status === 'en_retard' ? 'En retard' : 'Terminé'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <h4 className="text-sm font-medium mb-2">Date</h4>
              <input
                type="date"
                value={filters.date || ''}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="px-3 py-2 border rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;