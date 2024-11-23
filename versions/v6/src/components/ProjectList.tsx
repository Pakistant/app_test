import React, { useState } from 'react';
import { Calendar, Pencil, Trash2, Clock, Building2, Camera } from 'lucide-react';
import { Project, StudioProject } from '../types';
import ProjectDetails from './ProjectDetails';
import { useProjectStore } from '../store';
import { format } from 'date-fns';

const weddingTypeFlags = {
  french: {
    flag: 'https://flagcdn.com/fr.svg',
    label: 'Mariage Français'
  },
  cameroonian: {
    flag: 'https://flagcdn.com/cm.svg',
    label: 'Mariage Camerounais'
  }
};

interface ProjectListProps {
  searchQuery?: string;
}

function ProjectList({ searchQuery }: ProjectListProps) {
  const { projects, activeSeason, deleteProject } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const filteredProjects = projects
    .filter(p => p.seasonId === activeSeason?.id)
    .filter(p => !searchQuery || 
      p.couple.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (id: number) => {
    deleteProject(id);
    setShowDeleteConfirm(null);
  };

  const getProgress = (project: Project) => {
    if (!('tasks' in project)) return 0;
    const completed = project.tasks.filter(t => t.status === 'completed').length;
    const total = project.tasks.length;
    return Math.round((completed / total) * 100);
  };

  const getDaysRemaining = (project: Project) => {
    const deliveryDate = new Date(project.date);
    deliveryDate.setDate(deliveryDate.getDate() + (project.deliveryDays || 0));
    const today = new Date();
    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProjectIcon = (project: any) => {
    if ('weddingType' in project) return null;
    if (project.type === 'studio') return <Camera size={16} className="text-gray-600" />;
    if (project.type === 'corporate') return <Building2 size={16} className="text-gray-600" />;
    return null;
  };

  const getProjectTitle = (project: any) => {
    if ('weddingType' in project) {
      return (
        <div className="flex items-center gap-2">
          <img 
            src={weddingTypeFlags[project.weddingType].flag} 
            alt={weddingTypeFlags[project.weddingType].label}
            className="w-6 h-4 object-cover rounded"
          />
          <h3 className="font-medium">{project.couple}</h3>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {getProjectIcon(project)}
        <h3 className="font-medium">{project.couple}</h3>
      </div>
    );
  };

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Projets <span className="text-gray-500">({filteredProjects.length})</span>
        </h2>
      </div>

      <div className="space-y-2">
        {filteredProjects.map((project) => {
          const progress = getProgress(project);
          const daysRemaining = getDaysRemaining(project);
          
          return (
            <div
              key={project.id}
              className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer"
              onClick={() => setSelectedProject(project as Project)}
            >
              <div className="flex items-center justify-between">
                {getProjectTitle(project)}

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>Dans les temps {`(J-${daysRemaining})`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project as Project);
                      }}
                      className="p-1.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-white"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(project.id);
                      }}
                      className="p-1.5 text-gray-600 hover:text-red-600 rounded-lg hover:bg-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{format(new Date(project.date), 'dd/MM/yyyy')}</span>
                </div>
                <span>•</span>
                {'formula' in project ? (
                  <span>{project.formula.name}</span>
                ) : project.type === 'studio' ? (
                  <span>Séance {(project as StudioProject).sessionType}</span>
                ) : (
                  <span>Événement corporate</span>
                )}
                <span>•</span>
                <span>Livraison : {format(new Date(project.date), 'dd/MM/yyyy')}</span>
              </div>

              {'tasks' in project && (
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{progress}%</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(showDeleteConfirm);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;