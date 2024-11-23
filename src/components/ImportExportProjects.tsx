import React, { useRef } from 'react';
import { Download, Upload, FileSpreadsheet } from 'lucide-react';
import { useProjectStore } from '../store';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

function ImportExportProjects() {
  const { projects, addProject } = useProjectStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportToExcel = () => {
    try {
      // Préparer les données pour l'export
      const exportData = projects.map(project => ({
        ID: project.id,
        Type: project.type,
        Couple: project.couple,
        Date: format(new Date(project.date), 'dd/MM/yyyy'),
        Pays: project.country === 'fr' ? 'France' : 'Cameroun',
        Email: project.email,
        Téléphone: project.phone,
        Statut: project.status,
        'Délai de livraison': project.deliveryDays,
        Prix: project.price,
        Lieu: project.location || '',
        'Type de mariage': project.type === 'wedding' ? project.weddingType : '',
        Formule: project.type === 'wedding' ? project.formula.name : '',
        'Type de séance': project.type === 'studio' ? project.sessionType : '',
        'Type d\'événement': project.type === 'corporate' ? project.eventType : '',
        Notes: project.notes || ''
      }));

      // Créer le workbook et la worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Projets");

      // Générer le fichier Excel
      const fileName = `projets_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success('Export réussi');
    } catch (error) {
      toast.error('Erreur lors de l\'export');
      console.error('Erreur d\'export:', error);
    }
  };

  const importFromExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Lire la première feuille
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Importer chaque projet
          jsonData.forEach((row: any) => {
            const baseProject = {
              couple: row.Couple,
              date: format(new Date(row.Date), 'yyyy-MM-dd'),
              email: row.Email,
              phone: row.Téléphone,
              country: row.Pays === 'France' ? 'fr' : 'cm',
              deliveryDays: row['Délai de livraison'],
              price: row.Prix,
              location: row.Lieu,
              notes: row.Notes
            };

            // Créer le projet selon son type
            switch (row.Type) {
              case 'wedding':
                addProject({
                  ...baseProject,
                  type: 'wedding',
                  weddingType: row['Type de mariage'],
                  formula: {
                    name: row.Formule,
                    type: 'photo_video',
                    hasTeaser: row.Formule.includes('teaser'),
                    hasAlbum: row.Formule.includes('album')
                  }
                });
                break;

              case 'studio':
                addProject({
                  ...baseProject,
                  type: 'studio',
                  sessionType: row['Type de séance'],
                  deliverables: {
                    hdPhotos: 0,
                    webPhotos: 0
                  },
                  backdrop: '',
                  props: [],
                  duration: 60,
                  withMakeup: false
                });
                break;

              case 'corporate':
                addProject({
                  ...baseProject,
                  type: 'corporate',
                  eventType: row['Type d\'événement'],
                  company: {
                    name: '',
                    contact: '',
                    position: ''
                  },
                  attendees: 0,
                  requirements: [],
                  deliverables: {
                    photos: true,
                    video: false,
                    streaming: false,
                    prints: false,
                    numberOfPhotos: 0,
                    videoDuration: 0
                  },
                  duration: 60
                });
                break;
            }
          });

          toast.success('Import réussi');
        } catch (error) {
          toast.error('Erreur lors de l\'import');
          console.error('Erreur de parsing:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error('Erreur lors de l\'import');
      console.error('Erreur d\'import:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Import/Export des projets</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export */}
        <div className="p-6 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <FileSpreadsheet size={24} className="text-green-600" />
            <h4 className="font-medium">Exporter les projets</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Téléchargez tous vos projets dans un fichier Excel.
          </p>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download size={20} />
            Exporter vers Excel
          </button>
        </div>

        {/* Import */}
        <div className="p-6 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <FileSpreadsheet size={24} className="text-blue-600" />
            <h4 className="font-medium">Importer des projets</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Importez des projets depuis un fichier Excel.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={importFromExcel}
            accept=".xlsx,.xls"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload size={20} />
            Importer depuis Excel
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Instructions d'import</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Utilisez le même format que l'export pour l'import</li>
          <li>Les colonnes doivent avoir les mêmes noms</li>
          <li>La date doit être au format DD/MM/YYYY</li>
          <li>Le pays doit être "France" ou "Cameroun"</li>
          <li>Le type doit être "wedding", "studio" ou "corporate"</li>
        </ul>
      </div>
    </div>
  );
}

export default ImportExportProjects;