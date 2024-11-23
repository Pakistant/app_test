import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useProjectStore } from '../../store';
import { format } from 'date-fns';

function ExportView() {
  const { projects } = useProjectStore();
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json'>('csv');
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const handleExport = () => {
    const projectsToExport = projects.filter(p => 
      selectedProjects.length === 0 || selectedProjects.includes(p.id)
    );

    let content: string;
    let filename: string;
    let type: string;

    if (selectedFormat === 'csv') {
      // Création du CSV
      const headers = ['Couple', 'Date', 'Type', 'Formule', 'Statut', 'Tâches complétées'];
      const rows = projectsToExport.map(project => [
        project.couple,
        format(new Date(project.date), 'dd/MM/yyyy'),
        project.weddingType === 'french' ? 'Français' : 'Camerounais',
        project.formula.name,
        project.status,
        `${project.tasks.filter(t => t.status === 'completed').length}/${project.tasks.length}`
      ]);

      content = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      filename = `export-mariages-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      type = 'text/csv';
    } else {
      // Export JSON
      content = JSON.stringify(projectsToExport, null, 2);
      filename = `export-mariages-${format(new Date(), 'yyyy-MM-dd')}.json`;
      type = 'application/json';
    }

    // Création et téléchargement du fichier
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Format de l'export */}
      <div>
        <h3 className="text-lg font-medium mb-4">Format d'export</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedFormat('csv')}
            className={`p-4 border rounded-lg flex items-center gap-3 ${
              selectedFormat === 'csv' ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <FileSpreadsheet size={24} className="text-gray-500" />
            <div className="text-left">
              <p className="font-medium">CSV</p>
              <p className="text-sm text-gray-500">Format tableur</p>
            </div>
          </button>
          <button
            onClick={() => setSelectedFormat('json')}
            className={`p-4 border rounded-lg flex items-center gap-3 ${
              selectedFormat === 'json' ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <FileText size={24} className="text-gray-500" />
            <div className="text-left">
              <p className="font-medium">JSON</p>
              <p className="text-sm text-gray-500">Format données brutes</p>
            </div>
          </button>
        </div>
      </div>

      {/* Sélection des projets */}
      <div>
        <h3 className="text-lg font-medium mb-4">Projets à exporter</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedProjects.length === 0}
              onChange={() => setSelectedProjects([])}
              className="rounded text-blue-600"
            />
            <span>Tous les projets</span>
          </label>
          {projects.map(project => (
            <label key={project.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedProjects.includes(project.id)}
                onChange={(e) => {
                  setSelectedProjects(prev =>
                    e.target.checked
                      ? [...prev, project.id]
                      : prev.filter(id => id !== project.id)
                  );
                }}
                className="rounded text-blue-600"
              />
              <span>{project.couple} - {format(new Date(project.date), 'dd/MM/yyyy')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bouton d'export */}
      <button
        onClick={handleExport}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <Download size={20} />
        Exporter
      </button>
    </div>
  );
}

export default ExportView;