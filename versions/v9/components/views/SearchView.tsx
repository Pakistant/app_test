import React, { useState } from 'react';
import { Search, Filter, Calendar, Tag } from 'lucide-react';
import { useProjectStore } from '../../store';
import { format } from 'date-fns';

function SearchView() {
  const { projects } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    type: '',
    tags: [] as string[]
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.couple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !filters.date || project.date.includes(filters.date);
    const matchesType = !filters.type || project.weddingType === filters.type;
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.every(tag => project.tags?.includes(tag));

    return matchesSearch && matchesDate && matchesType && matchesTags;
  });

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un projet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filtres */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            className="px-3 py-1 border rounded-lg"
          />
        </div>

        <select
          value={filters.type}
          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          className="px-3 py-1 border rounded-lg"
        >
          <option value="">Tous les types</option>
          <option value="french">Mariage Français</option>
          <option value="cameroonian">Mariage Camerounais</option>
        </select>
      </div>

      {/* Résultats */}
      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{project.couple}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                project.status === 'en_cours' ? 'bg-blue-100 text-blue-800' :
                project.status === 'en_retard' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800'
              }`}>
                {project.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{format(new Date(project.date), 'dd/MM/yyyy')}</span>
                <span>{project.location}</span>
              </div>
            </div>
            {project.tags && project.tags.length > 0 && (
              <div className="mt-2 flex gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchView;