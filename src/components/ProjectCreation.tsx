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
    documents: [] as File[],
    price: 0,
    // Nouveaux champs pour le mariage camerounais
    doteDate: '',
    organizer: '',
    brideVillage: '',
    groomVillage: '',
    brideAge: '',
    groomAge: '',
    civilWeddingDate: '',
    isSameDayCivilWedding: false,
    hasHonorAttendants: false,
    bridesmaids: 0,
    groomsmen: 0,
    guestCount: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeSeason) return;

    const selectedFormula = formulas.find(f => f.id === formData.selectedFormula);
    if (!selectedFormula) return;

    addProject({
      type: 'wedding',
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
      price: formData.price,
      formula: {
        type: selectedFormula.type,
        hasTeaser: selectedFormula.id.includes('teaser') || selectedFormula.id === 'complete',
        hasAlbum: selectedFormula.id.includes('album') || selectedFormula.id === 'complete',
        name: selectedFormula.id
      },
      // Ajout des nouveaux champs dans les notes
      additionalInfo: {
        doteDate: formData.doteDate,
        organizer: formData.organizer,
        brideVillage: formData.brideVillage,
        groomVillage: formData.groomVillage,
        brideAge: formData.brideAge,
        groomAge: formData.groomAge,
        civilWeddingDate: formData.civilWeddingDate,
        isSameDayCivilWedding: formData.isSameDayCivilWedding,
        hasHonorAttendants: formData.hasHonorAttendants,
        bridesmaids: formData.bridesmaids,
        groomsmen: formData.groomsmen,
        guestCount: formData.guestCount
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Nouveau projet de mariage</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations de base */}
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
                Date du mariage *
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
                Date de la dote
              </label>
              <input
                type="date"
                value={formData.doteDate}
                onChange={(e) => setFormData(prev => ({ ...prev, doteDate: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organisateur du mariage
              </label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de l'organisateur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Village de la mariée
              </label>
              <input
                type="text"
                value={formData.brideVillage}
                onChange={(e) => setFormData(prev => ({ ...prev, brideVillage: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Village d'origine"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Village du marié
              </label>
              <input
                type="text"
                value={formData.groomVillage}
                onChange={(e) => setFormData(prev => ({ ...prev, groomVillage: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Village d'origine"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Âge de la mariée
              </label>
              <input
                type="number"
                value={formData.brideAge}
                onChange={(e) => setFormData(prev => ({ ...prev, brideAge: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="18"
                placeholder="Âge"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Âge du marié
              </label>
              <input
                type="number"
                value={formData.groomAge}
                onChange={(e) => setFormData(prev => ({ ...prev, groomAge: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="18"
                placeholder="Âge"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  required
                  value={formData.price || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    price: parseFloat(e.target.value) 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  placeholder={`Prix en ${formData.country === 'fr' ? 'EUR' : 'FCFA'}`}
                />
                <span className="text-gray-500">
                  {formData.country === 'fr' ? '€' : 'FCFA'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
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
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={formData.country === 'fr' ? '06 12 34 56 78' : '6 12 34 56 78'}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isSameDayCivilWedding}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  isSameDayCivilWedding: e.target.checked,
                  civilWeddingDate: e.target.checked ? '' : prev.civilWeddingDate
                }))}
                className="rounded text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                La mairie est le même jour que l'église
              </span>
            </label>
          </div>

          {!formData.isSameDayCivilWedding && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de la mairie
              </label>
              <input
                type="date"
                value={formData.civilWeddingDate}
                onChange={(e) => setFormData(prev => ({ ...prev, civilWeddingDate: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.hasHonorAttendants}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  hasHonorAttendants: e.target.checked,
                  bridesmaids: e.target.checked ? prev.bridesmaids : 0,
                  groomsmen: e.target.checked ? prev.groomsmen : 0
                }))}
                className="rounded text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Garçons et filles d'honneur
              </span>
            </label>
          </div>

          {formData.hasHonorAttendants && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de filles d'honneur
                </label>
                <input
                  type="number"
                  value={formData.bridesmaids}
                  onChange={(e) => setFormData(prev => ({ ...prev, bridesmaids: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de garçons d'honneur
                </label>
                <input
                  type="number"
                  value={formData.groomsmen}
                  onChange={(e) => setFormData(prev => ({ ...prev, groomsmen: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </>
          )}

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre d'invités estimé
            </label>
            <input
              type="number"
              value={formData.guestCount}
              onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              placeholder="Nombre total d'invités"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pays *
            </label>
            <CountrySelector
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ 
                ...prev, 
                country: value,
                weddingType: value === 'fr' ? 'french' : 'cameroonian'
              }))}
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