import React, { useState } from 'react';
import { File, Upload, Download, Trash2 } from 'lucide-react';
import { useProjectStore } from '../../store';
import { format } from 'date-fns';

function DocumentView() {
  const { projects, updateProject } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleFileUpload = (projectId: number, files: FileList) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newDocuments = Array.from(files).map(file => ({
      id: Date.now().toString(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      uploadedBy: 'current-user', // À remplacer par l'utilisateur connecté
      uploadedAt: new Date().toISOString()
    }));

    updateProject(projectId, {
      ...project,
      documents: [...project.documents, ...newDocuments]
    });
  };

  const handleDeleteDocument = (projectId: number, documentId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    updateProject(projectId, {
      ...project,
      documents: project.documents.filter(d => d.id !== documentId)
    });
  };

  return (
    <div className="space-y-6">
      {/* Sélection du projet */}
      <select
        value={selectedProject || ''}
        onChange={(e) => setSelectedProject(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Sélectionner un projet</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.couple} - {format(new Date(project.date), 'dd/MM/yyyy')}
          </option>
        ))}
      </select>

      {selectedProject && (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Zone de dépôt de fichiers */}
          <div className="p-6 border-b">
            <div className="border-2 border-dashed rounded-lg p-6">
              <input
                type="file"
                multiple
                onChange={(e) => e.target.files && handleFileUpload(selectedProject, e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                </span>
              </label>
            </div>
          </div>

          {/* Liste des documents */}
          <div className="divide-y">
            {projects
              .find(p => p.id === selectedProject)
              ?.documents.map(document => (
                <div
                  key={document.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <File size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">{document.name}</p>
                      <p className="text-sm text-gray-500">
                        Ajouté le {format(new Date(document.uploadedAt), 'dd/MM/yyyy')}
                        {' '}par {document.uploadedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(document.url, '_blank')}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(selectedProject, document.id)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentView;