import React, { useState } from 'react';
import { Calendar, Search, FileText, BarChart2, Kanban, Upload, Archive } from 'lucide-react';
import ProjectList from './ProjectList';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <Archive size={20} />
          <span>Archives</span>
        </button>
      </div>

      <ProjectList searchQuery={searchQuery} />
    </div>
  );
}

export default Dashboard;