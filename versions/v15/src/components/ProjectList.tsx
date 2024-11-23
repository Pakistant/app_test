import React, { useState } from 'react';
import { Calendar, Pencil, Trash2, Clock, Building2, Camera, Users, DollarSign, MapPin, Film, Book, Flag } from 'lucide-react';
import { Project, StudioProject, CorporateProject, WeddingProject } from '../types';
import ProjectDetails from './ProjectDetails';
import { useProjectStore } from '../store';
import { format } from 'date-fns';

const projectTypeColors = {
  wedding: {
    bg: 'bg-violet-50 hover:bg-violet-100',
    text: 'text-violet-600',
    icon: 'text-violet-500'
  },
  studio: {
    bg: 'bg-cyan-50 hover:bg-cyan-100',
    text: 'text-cyan-600',
    icon: 'text-cyan-500'
  },
  corporate: {
    bg: 'bg-amber-50 hover:bg-amber-100',
    text: 'text-amber-600',
    icon: 'text-amber-500'
  }
};

const countryFlags = {
  fr: {
    flag: 'https://flagcdn.com/fr.svg',
    label: 'France'
  },
  cm: {
    flag: 'https://flagcdn.com/cm.svg',
    label: 'Cameroun'
  }
};

interface ProjectListProps {
  searchQuery?: string;
}

function ProjectList({ searchQuery }: ProjectListProps) {
  const { projects, activeSeason, deleteProject, filters } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const filteredProjects = projects
    .filter(p => p.seasonId === activeSeason?.id)
    .filter(p => !searchQuery || 
      p.couple.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => !filters.country?.length || filters.country.includes(p.country))
    .filter(p => !filters.type?.length || filters.type.includes(p.type))
    .filter(p => !filters.status?.length || filters.status.includes(p.status))
    .filter(p => !filters.weddingType?.length || 
      (p.type === 'wedding' && filters.weddingType.includes((p as WeddingProject).weddingType)));

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

  const getStatusColor = (daysRemaining: number) => {
    if (daysRemaining < 0) return 'text-red-600';
    if (daysRemaining < 7) return 'text-orange-600';
    return 'text-green-600';
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
    <div className="space-y-4">
      {filteredProjects.map((project) => {
        const progress = getProgress(project);
        const daysRemaining = getDaysRemaining(project);
        const statusColor = getStatusColor(daysRemaining);
        const typeColors = projectTypeColors[project.type];
        
        return (
          <div
            key={project.id}
            className={`${typeColors.bg} rounded-lg p-4 cursor-pointer`}
            onClick={() => setSelectedProject(project)}
          >
            {/* En-tête du projet */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={countryFlags[project.country].flag} 
                  alt={countryFlags[project.country].label}
                  className="w-6 h-4 object-cover rounded"
                />
                <div>
                  <h3 className={`font-medium ${typeColors.text}`}>{project.couple}</h3>
                  <p className="text-sm text-gray-600">
                    {project.type === 'wedding' ? 
                      `Mariage ${(project as WeddingProject).weddingType === 'french' ? 'Français' : 'Camerounais'}` :
                      project.type === 'studio' ? 
                      `Studio ${(project as StudioProject).sessionType}` :
                      `Corporate ${(project as CorporateProject).eventType}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className={`flex items-center gap-2 ${statusColor}`}>
                  <Clock size={16} />
                  <span className="text-sm">
                    {daysRemaining < 0 
                      ? `En retard (${Math.abs(daysRemaining)}j)` 
                      : `J-${daysRemaining}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
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

            {/* Informations du projet */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{format(new Date(project.date), 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{project.location || 'Non spécifié'}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>
                  {project.price?.toLocaleString()} {project.country === 'fr' ? '€' : 'FCFA'}
                </span>
              </div>
              {'formula' in project && (
                <div className="flex items-center gap-2">
                  {project.formula.hasAlbum && <Book size={16} title="Album photo" />}
                  {project.formula.hasTeaser && <Film size={16} title="Teaser vidéo" />}
                </div>
              )}
            </div>

            {/* Barre de progression */}
            {'tasks' in project && (
              <div className="mt-4">
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

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
            </p>
            <div className="flex flex-col md:flex-row justify-end gap-4">
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