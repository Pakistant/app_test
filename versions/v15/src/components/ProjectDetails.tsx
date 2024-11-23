import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, Trash2, Edit2, Building2, Camera, Save, X,
  MapPin, Phone, Mail, DollarSign, Users, Book, Film, Flag, AlertCircle,
  Calendar as CalendarIcon, Clock as ClockIcon
} from 'lucide-react';
import { Project, StudioProject, CorporateProject, WeddingProject } from '../types';
import { useProjectStore } from '../store';
import { format } from 'date-fns';
import { Tab } from '@headlessui/react';

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

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* En-tête */}
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
              <img 
                src={`https://flagcdn.com/${project.country}.svg`}
                alt={project.country === 'fr' ? 'France' : 'Cameroun'}
                className="w-6 h-4 object-cover rounded"
              />
              <h2 className="text-xl font-semibold">{project.couple}</h2>
            </div>
            {'formula' in project && (
              <p className="text-sm text-gray-500 mt-1">{project.formula.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
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
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`
            }>
              Aperçu
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`
            }>
              Timeline
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`
            }>
              Commentaires
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Aperçu */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Informations générales */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Informations générales</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarIcon size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Date</p>
                        <p>{format(new Date(project.date), 'dd MMMM yyyy')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Lieu</p>
                        <p>{project.location || 'Non spécifié'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Prix</p>
                        <p>{project.price?.toLocaleString()} {project.country === 'fr' ? '€' : 'FCFA'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ClockIcon size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Délai de livraison</p>
                        <p>{project.deliveryDays} jours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p>{project.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Téléphone</p>
                        <p>{project.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails spécifiques selon le type de projet */}
              {project.type === 'wedding' && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Détails du mariage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type de mariage</p>
                      <p>{(project as WeddingProject).weddingType === 'french' ? 'Français' : 'Camerounais'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Formule</p>
                      <div className="flex items-center gap-2">
                        <span>{(project as WeddingProject).formula.name}</span>
                        {(project as WeddingProject).formula.hasAlbum && <Book size={16} />}
                        {(project as WeddingProject).formula.hasTeaser && <Film size={16} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.type === 'studio' && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Détails de la séance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type de séance</p>
                      <p>{(project as StudioProject).sessionType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Durée</p>
                      <p>{(project as StudioProject).duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Fond</p>
                      <p>{(project as StudioProject).backdrop || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Maquillage</p>
                      <p>{(project as StudioProject).withMakeup ? 'Oui' : 'Non'}</p>
                    </div>
                  </div>
                </div>
              )}

              {project.type === 'corporate' && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Détails de l'événement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type d'événement</p>
                      <p>{(project as CorporateProject).eventType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Entreprise</p>
                      <p>{(project as CorporateProject).company.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Contact</p>
                      <p>{(project as CorporateProject).company.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Poste</p>
                      <p>{(project as CorporateProject).company.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Nombre de participants</p>
                      <p>{(project as CorporateProject).attendees}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tâches */}
              {'tasks' in project && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Tâches</h3>
                  <div className="space-y-3">
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
                          <div>
                            <p className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              Assigné à: {task.assignedTo}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            Échéance: {format(new Date(task.dueDate), 'dd/MM/yyyy')}
                          </div>
                          {task.status === 'completed' && task.completedDate && (
                            <div className="text-sm text-green-600">
                              Terminé le {format(new Date(task.completedDate), 'dd/MM/yyyy')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{project.notes || 'Aucune note'}</p>
                </div>
              </div>
            </Tab.Panel>

            {/* Timeline */}
            <Tab.Panel>
              <div className="space-y-6">
                {project.activityLog.map((log, index) => (
                  <div key={log.id} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                    {index !== project.activityLog.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{log.description}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm')}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">Par: {log.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Commentaires */}
            <Tab.Panel>
              <div className="space-y-4">
                {/* TODO: Implémenter les commentaires */}
                <p className="text-gray-500 text-center py-8">
                  Les commentaires seront bientôt disponibles
                </p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Modal de confirmation de suppression */}
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