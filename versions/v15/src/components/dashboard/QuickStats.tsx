import React from 'react';
import { Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useProjectStore } from '../../store';

function QuickStats() {
  const { projects, setFilters } = useProjectStore();

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'en_cours').length,
    upcomingProjects: projects.filter(p => p.status === 'a_venir').length,
    completedProjects: projects.filter(p => p.status === 'termine').length,
    delayedProjects: projects.filter(p => p.status === 'en_retard').length
  };

  const handleStatClick = (status: string | null) => {
    setFilters({ status: status ? [status] : [] });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div 
        onClick={() => handleStatClick(null)}
        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Projets</p>
            <p className="text-2xl font-semibold">{stats.totalProjects}</p>
          </div>
          <Users className="text-blue-500" size={24} />
        </div>
      </div>

      <div 
        onClick={() => handleStatClick('en_cours')}
        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Projets Actifs</p>
            <p className="text-2xl font-semibold">{stats.activeProjects}</p>
          </div>
          <Clock className="text-green-500" size={24} />
        </div>
      </div>

      <div 
        onClick={() => handleStatClick('en_retard')}
        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">En Retard</p>
            <p className="text-2xl font-semibold text-red-600">{stats.delayedProjects}</p>
          </div>
          <Clock className="text-red-500" size={24} />
        </div>
      </div>

      <div 
        onClick={() => handleStatClick('termine')}
        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Terminés</p>
            <p className="text-2xl font-semibold">{stats.completedProjects}</p>
          </div>
          <CheckCircle className="text-purple-500" size={24} />
        </div>
      </div>
    </div>
  );
}

export default QuickStats;