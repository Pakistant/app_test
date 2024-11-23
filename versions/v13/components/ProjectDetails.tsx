import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Trash2, Edit2, Building2, Camera, Save, X } from 'lucide-react';
import { Project, StudioProject, CorporateProject, WeddingProject } from '../types';
import { useProjectStore } from '../store';
import { format } from 'date-fns';
import { formulas } from '../data/formulas';
import CountrySelector from './CountrySelector';
import ProjectCreation from './ProjectCreation';
import StudioProjectCreation from './StudioProjectCreation';
import CorporateProjectCreation from './CorporateProjectCreation';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

function ProjectDetails({ project, onBack }: ProjectDetailsProps) {
  const { updateProject, updateTaskStatus, deleteProject } = useProjectStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    deleteProject(project.id);
    onBack();
  };

  const handleTaskStatusChange = (taskId: string) => {
    if (!('tasks' in project)) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    updateTaskStatus(project.id, taskId, newStatus);
  };

  // Rendu du formulaire d'édition selon le type de projet
  const renderEditForm = () => {
    switch (project.type) {
      case 'wedding':
        return (
          <ProjectCreation 
            onClose={() => setIsEditing(false)} 
            initialData={project as WeddingProject}
            isEditing={true}
          />
        );
      case 'studio':
        return (
          <StudioProjectCreation 
            onClose={() => setIsEditing(false)} 
            initialData={project as StudioProject}
            isEditing={true}
          />
        );
      case 'corporate':
        return (
          <CorporateProjectCreation 
            onClose={() => setIsEditing(false)} 
            initialData={project as CorporateProject}
            isEditing={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              {project.type === 'wedding' && (
                <img 
                  src={`https://flagcdn.com/${project.country}.svg`}
                  alt={project.country === 'fr' ? 'France' : 'Cameroun'}
                  className="w-6 h-4 object-cover rounded"
                />
              )}
              {project.type === 'studio' && <Camera size={20} className="text-gray-600" />}
              {project.type === 'corporate' && <Building2 size={20} className="text-gray-600" />}
              <h2 className="text-xl font-semibold">{project.couple}</h2>
            </div>
            {'formula' in project && (
              <p className="text-sm text-gray-500 mt-1">{project.formula.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                <Edit2 size={16} />
                Modifier
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
                Supprimer
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              <X size={16} />
              Annuler
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {isEditing ? (
          renderEditForm()
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-medium mb-4">Informations générales</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>Date: {format(new Date(project.date), 'dd/MM/yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>Délai de livraison: {project.deliveryDays} jours</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Contact</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Email: {project.email}</p>
                  <p>Téléphone: {project.phone}</p>
                  {'location' in project && <p>Lieu: {project.location}</p>}
                </div>
              </div>
            </div>

            {'tasks' in project && (
              <div>
                <h3 className="font-medium mb-4">Tâches</h3>
                <div className="space-y-2">
                  {project.tasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          onChange={() => handleTaskStatusChange(task.id)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Échéance: {format(new Date(task.dueDate), 'dd/MM/yyyy')}</span>
                        <span>•</span>
                        <span>Assigné à: {task.assignedTo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
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
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
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

export default ProjectDetails;