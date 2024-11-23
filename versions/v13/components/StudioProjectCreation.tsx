import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useProjectStore } from '../store';
import { StudioProject } from '../types';
import CountrySelector from './CountrySelector';

const sessionTypes = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Famille' },
  { value: 'children', label: 'Enfants' },
  { value: 'pregnancy', label: 'Grossesse' },
  { value: 'newborn', label: 'Nouveau-né' },
  { value: 'fashion', label: 'Mode' },
  { value: 'product', label: 'Produit' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'event', label: 'Événement' },
  { value: 'graduation', label: 'Diplôme' },
  { value: 'artistic', label: 'Artistique' },
  { value: 'boudoir', label: 'Boudoir' },
  { value: 'pet', label: 'Animaux' }
];

const sessionDurations = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 heure' },
  { value: 90, label: '1 heure 30' },
  { value: 120, label: '2 heures' },
  { value: 180, label: '3 heures' },
  { value: 240, label: '4 heures' }
];

const deliveryTimes = [
  { value: 3, label: 'Express (3 jours)' },
  { value: 7, label: 'Standard (7 jours)' },
  { value: 14, label: 'Économique (14 jours)' }
];

interface StudioProjectCreationProps {
  onClose: () => void;
}

function StudioProjectCreation({ onClose }: StudioProjectCreationProps) {
  const { addProject, activeSeason } = useProjectStore();
  const [formData, setFormData] = useState({
    clientName: '',
    date: '',
    email: '',
    phone: '',
    country: 'fr',
    duration: 60,
    customDuration: '',
    deliveryDays: 7,
    withMakeup: false,
    sessionType: 'portrait' as StudioProject['sessionType'],
    deliverables: {
      hdPhotos: 0,
      webPhotos: 0
    },
    price: 0,
    backdrop: '',
    props: [] as string[],
    retoucher: '',
    documents: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeSeason) return;

    // Utiliser la durée personnalisée si elle est définie
    const finalDuration = formData.customDuration ? parseInt(formData.customDuration) : formData.duration;

    addProject({
      couple: formData.clientName,
      date: formData.date,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      seasonId: activeSeason.id,
      type: 'studio',
      sessionType: formData.sessionType,
      duration: finalDuration,
      deliverables: formData.deliverables,
      price: formData.price,
      backdrop: formData.backdrop,
      props: formData.props,
      notes: formData.retoucher,
      deliveryDays: formData.deliveryDays,
      location: 'Studio',
      withMakeup: formData.withMakeup
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Nouvelle séance studio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client *
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nom du client"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de la séance *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pays *
            </label>
            <CountrySelector
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de séance *
            </label>
            <select
              required
              value={formData.sessionType}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                sessionType: e.target.value as StudioProject['sessionType']
              }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {sessionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée de la séance *
            </label>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {sessionDurations.map(duration => (
                  <label
                    key={duration.value}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.duration === duration.value && !formData.customDuration
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={duration.value}
                      checked={formData.duration === duration.value && !formData.customDuration}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        duration: parseInt(e.target.value),
                        customDuration: '' 
                      }))}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <p className="font-medium">{duration.label}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ou durée personnalisée (en minutes)
                </label>
                <input
                  type="number"
                  value={formData.customDuration}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    customDuration: e.target.value,
                    duration: 0
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="15"
                  step="15"
                  placeholder="Ex: 45, 150, 240..."
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Délai de livraison *
            </label>
            <div className="grid grid-cols-3 gap-4">
              {deliveryTimes.map(delivery => (
                <label
                  key={delivery.value}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    formData.deliveryDays === delivery.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryDays"
                    value={delivery.value}
                    checked={formData.deliveryDays === delivery.value}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      deliveryDays: parseInt(e.target.value) 
                    }))}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <p className="font-medium">{delivery.label}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.withMakeup}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  withMakeup: e.target.checked 
                }))}
                className="rounded text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Avec maquillage professionnel
              </span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photos HD
              </label>
              <input
                type="number"
                value={formData.deliverables.hdPhotos}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliverables: {
                    ...prev.deliverables,
                    hdPhotos: parseInt(e.target.value)
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photos web
              </label>
              <input
                type="number"
                value={formData.deliverables.webPhotos}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliverables: {
                    ...prev.deliverables,
                    webPhotos: parseInt(e.target.value)
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
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
                  price: e.target.value ? parseFloat(e.target.value) : 0
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
              Fond
            </label>
            <input
              type="text"
              value={formData.backdrop}
              onChange={(e) => setFormData(prev => ({ ...prev, backdrop: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ex: Blanc, Noir, Coloré..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accessoires requis
            </label>
            <textarea
              value={formData.props.join('\n')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                props: e.target.value.split('\n').filter(p => p.trim()) 
              }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Un accessoire par ligne"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du responsable de la retouche
            </label>
            <input
              type="text"
              value={formData.retoucher}
              onChange={(e) => setFormData(prev => ({ ...prev, retoucher: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nom du retoucheur"
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
              Créer la séance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudioProjectCreation;