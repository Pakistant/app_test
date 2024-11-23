import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useProjectStore } from '../../store';

function ProjectStats() {
  const { projects } = useProjectStore();

  // Statistiques par type de projet
  const projectTypes = {
    wedding: projects.filter(p => p.type === 'wedding').length,
    studio: projects.filter(p => p.type === 'studio').length,
    corporate: projects.filter(p => p.type === 'corporate').length
  };

  const projectTypeData = {
    labels: ['Mariages', 'Studio', 'Corporate'],
    datasets: [{
      data: [projectTypes.wedding, projectTypes.studio, projectTypes.corporate],
      backgroundColor: ['#60A5FA', '#34D399', '#F472B6'],
    }]
  };

  // Statistiques par statut
  const projectStatus = {
    en_cours: projects.filter(p => p.status === 'en_cours').length,
    en_retard: projects.filter(p => p.status === 'en_retard').length,
    termine: projects.filter(p => p.status === 'termine').length,
    a_venir: projects.filter(p => p.status === 'a_venir').length
  };

  const statusData = {
    labels: ['En cours', 'En retard', 'Terminé', 'À venir'],
    datasets: [{
      data: [
        projectStatus.en_cours,
        projectStatus.en_retard,
        projectStatus.termine,
        projectStatus.a_venir
      ],
      backgroundColor: ['#60A5FA', '#F87171', '#34D399', '#FBBF24'],
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Types de projets</h3>
          <div className="h-64">
            <Doughnut data={projectTypeData} options={options} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Statut des projets</h3>
          <div className="h-64">
            <Doughnut data={statusData} options={options} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Mariages</p>
          <p className="text-2xl font-semibold">{projectTypes.wedding}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Studio</p>
          <p className="text-2xl font-semibold">{projectTypes.studio}</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Corporate</p>
          <p className="text-2xl font-semibold">{projectTypes.corporate}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Projets</p>
          <p className="text-2xl font-semibold">{projects.length}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectStats;