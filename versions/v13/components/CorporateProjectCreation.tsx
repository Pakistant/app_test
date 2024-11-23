import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useProjectStore } from '../store';
import { CorporateProject } from '../types';
import CountrySelector from './CountrySelector';

const eventTypes = [
  { value: 'conference', label: 'Conférence' },
  { value: 'team_building', label: 'Team Building' },
  { value: 'product_launch', label: 'Lancement de produit' },
  { value: 'corporate_portrait', label: 'Portraits corporate' },
  { value: 'seminar', label: 'Séminaire' },
  { value: 'training', label: 'Formation' },
  { value: 'award_ceremony', label: 'Remise de prix' },
  { value: 'gala', label: 'Gala / Soirée' },
  { value: 'exhibition', label: 'Exposition / Salon' },
  { value: 'press_conference', label: 'Conférence de presse' },
  { value: 'inauguration', label: 'Inauguration' },
  { value: 'anniversary', label: 'Anniversaire d\'entreprise' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'networking', label: 'Networking' },
  { value: 'other', label: 'Autre' }
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
  { value: 1, label: 'Ultra Express (24h)' },
  { value: 3, label: 'Express (3 jours)' },
  { value: 7, label: 'Standard (7 jours)' },
  { value: 14, label: 'Économique (14 jours)' }
];

interface CorporateProjectCreationProps {
  onClose: () => void;
}

function CorporateProjectCreation({ onClose }: CorporateProjectCreationProps) {
  const { addProject, activeSeason } = useProjectStore();
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    country: 'fr',
    duration: 60,
    customDuration: '',
    deliveryDays: 7,
    company: {
      name: '',
      contact: '',
      position: ''
    },
    email: '',
    phone: '',
    location: '',
    eventType: 'conference' as CorporateProject['eventType'],
    attendees: 0,
    retoucher: '',
    deliverables: {
      photos: true,
      video: false,
      streaming: false,
      prints: false,
      numberOfPhotos: 0,
      videoDuration: 0
    },
    documents: [] as File[],
    price: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeSeason) return;

    const finalDuration = formData.customDuration ? parseInt(formData.customDuration) : formData.duration;

    addProject({
      couple: `${formData.company.name} - ${formData.eventName}`,
      date: formData.date,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      seasonId: activeSeason.id,
      type: 'corporate',
      location: formData.location,
      eventType: formData.eventType,
      duration: finalDuration,
      company: formData.company,
      attendees: formData.attendees,
      requirements: [formData.retoucher],
      deliverables: formData.deliverables,
      notes: formData.retoucher,
      deliveryDays: formData.deliveryDays,
      price: formData.price
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Nouveau projet corporate</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'événement *
              </label>
              <input
                type="text"
                required
                value={formData.eventName}
                onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de l'événement"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d'événement *
              </label>
              <select
                required
                value={formData.eventType}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  eventType: e.target.value as CorporateProject['eventType']
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de l'événement *
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
                Lieu *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Adresse de l'événement"
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

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Informations entreprise</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    company: { ...prev.company, name: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact principal *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company.contact}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    company: { ...prev.company, contact: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poste du contact
                </label>
                <input
                  type="text"
                  value={formData.company.position}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    company: { ...prev.company, position: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de participants
                </label>
                <input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    attendees: parseInt(e.target.value) 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée de l'événement *
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

              <div className="flex items-center gap-4">
                <div className="flex-1">
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
                <div className="flex-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Livrables
            </label>
            <div className="space-y-4">
              <div className="space-y-2">
                {Object.entries(formData.deliverables)
                  .filter(([key]) => typeof formData.deliverables[key] === 'boolean')
                  .map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          deliverables: {
                            ...prev.deliverables,
                            [key]: e.target.checked
                          }
                        }))}
                        className="rounded text-blue-600 mr-2"
                      />
                      <span className="text-sm">
                        {key === 'photos' ? 'Photos' :
                         key === 'video' ? 'Vidéo' :
                         key === 'streaming' ? 'Streaming live' :
                         'Tirages'}
                      </span>
                    </label>
                  ))}
              </div>

              {formData.deliverables.photos && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de photos à livrer
                  </label>
                  <input
                    type="number"
                    value={formData.deliverables.numberOfPhotos || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      deliverables: {
                        ...prev.deliverables,
                        numberOfPhotos: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    placeholder="Nombre de photos"
                  />
                </div>
              )}

              {formData.deliverables.video && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée de la vidéo à livrer (en minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.deliverables.videoDuration || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      deliverables: {
                        ...prev.deliverables,
                        videoDuration: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="1"
                    placeholder="Durée en minutes"
                  />
                </div>
              )}
            </div>
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
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CorporateProjectCreation;