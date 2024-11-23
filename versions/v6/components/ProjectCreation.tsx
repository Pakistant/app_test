import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useProjectStore } from '../store';
import { formulas } from '../data/formulas';
import CountrySelector from './CountrySelector';

interface ProjectCreationProps {
  onClose: () => void;
}

function ProjectCreation({ onClose }: ProjectCreationProps) {
  const { addProject, activeSeason } = useProjectStore();
  const [formData, setFormData] = useState({
    couple: '',
    location: '',
    date: '',
    email: '',
    phone: '',
    country: 'fr',
    weddingType: 'french' as const,
    formulaType: 'photo_video' as const,
    selectedFormula: 'complete',
    deliveryDays: 80,
    notes: '',
    documents: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeSeason) return;

    const selectedFormula = formulas.find(f => f.id === formData.selectedFormula);
    if (!selectedFormula) return;

    addProject({
      couple: formData.couple,
      date: formData.date,
      location: formData.location || '',
      email: formData.email || '',
      phone: formData.phone || '',
      country: formData.country,
      weddingType: formData.weddingType,
      seasonId: activeSeason.id,
      deliveryDays: formData.deliveryDays,
      notes: formData.notes,
      formula: {
        type: selectedFormula.type,
        hasTeaser: selectedFormula.id.includes('teaser') || selectedFormula.id === 'complete',
        hasAlbum: selectedFormula.id.includes('album') || selectedFormula.id === 'complete',
        name: selectedFormula.id
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Ajouter un nouveau mariage</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couple *
              </label>
              <input
                type="text"
                required
                value={formData.couple}
                onChange={(e) => setFormData(prev => ({ ...prev, couple: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Prénom et Prénom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lieu du mariage
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ville ou lieu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saison
              </label>
              <input
                type="text"
                disabled
                value={activeSeason?.name || ''}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de contact
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="email@exemple.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone de contact
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pays *
            </label>
            <CountrySelector
              value={formData.country}
              onChange={(value) => {
                setFormData(prev => ({ 
                  ...prev, 
                  country: value,
                  weddingType: value === 'fr' ? 'french' : 'cameroonian'
                }));
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de formule *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.formulaType === 'photo_video'}
                  onChange={() => setFormData(prev => ({ ...prev, formulaType: 'photo_video' }))}
                  className="mr-2"
                />
                Photo & Vidéo
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.formulaType === 'photo'}
                  onChange={() => setFormData(prev => ({ ...prev, formulaType: 'photo' }))}
                  className="mr-2"
                />
                Photo
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.formulaType === 'video'}
                  onChange={() => setFormData(prev => ({ ...prev, formulaType: 'video' }))}
                  className="mr-2"
                />
                Vidéo
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formule détaillée *
            </label>
            <div className="space-y-3">
              {formulas
                .filter(f => f.type === formData.formulaType)
                .map(formula => (
                  <label
                    key={formula.id}
                    className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="formula"
                      value={formula.id}
                      checked={formData.selectedFormula === formula.id}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        selectedFormula: e.target.value 
                      }))}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">{formula.name}</div>
                      <div className="text-sm text-gray-500">{formula.description}</div>
                    </div>
                  </label>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Délai de livraison (jours)
            </label>
            <input
              type="number"
              value={formData.deliveryDays}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                deliveryDays: parseInt(e.target.value) 
              }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documents et fichiers
            </label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData(prev => ({
                      ...prev,
                      documents: [...prev.documents, ...Array.from(e.target.files || [])]
                    }));
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                </span>
              </label>
              {formData.documents.length > 0 && (
                <div className="mt-4 text-sm text-gray-500">
                  {formData.documents.length} fichier(s) sélectionné(s)
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes additionnelles
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Notes additionnelles..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectCreation;