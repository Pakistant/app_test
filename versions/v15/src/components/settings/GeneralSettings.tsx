import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface GeneralSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  currency: {
    fr: string;
    cm: string;
  };
  defaultDeliveryDays: {
    wedding: number;
    studio: number;
    corporate: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  autoBackup: boolean;
  language: string;
  timezone: string;
}

function GeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettings>({
    companyName: 'Les Marvelous',
    address: '',
    phone: '',
    email: '',
    website: '',
    currency: {
      fr: '€',
      cm: 'FCFA'
    },
    defaultDeliveryDays: {
      wedding: 80,
      studio: 14,
      corporate: 7
    },
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    autoBackup: true,
    language: 'fr',
    timezone: 'Europe/Paris'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sauvegarder les paramètres
    console.log('Settings saved:', settings);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Paramètres Généraux</h2>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save size={20} />
          Enregistrer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de l'entreprise */}
          <div>
            <h3 className="text-lg font-medium mb-4">Informations de l'entreprise</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    companyName: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    address: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    phone: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    email: e.target.value 
                  }))}
                  className="w-full px-3 py 2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site web
                </label>
                <input
                  type="url"
                  value={settings.website}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    website: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Délais de livraison par défaut */}
          <div>
            <h3 className="text-lg font-medium mb-4">Délais de livraison par défaut</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mariage (jours)
                </label>
                <input
                  type="number"
                  value={settings.defaultDeliveryDays.wedding}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    defaultDeliveryDays: {
                      ...prev.defaultDeliveryDays,
                      wedding: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Studio (jours)
                </label>
                <input
                  type="number"
                  value={settings.defaultDeliveryDays.studio}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    defaultDeliveryDays: {
                      ...prev.defaultDeliveryDays,
                      studio: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corporate (jours)
                </label>
                <input
                  type="number"
                  value={settings.defaultDeliveryDays.corporate}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    defaultDeliveryDays: {
                      ...prev.defaultDeliveryDays,
                      corporate: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      email: e.target.checked
                    }
                  }))}
                  className="rounded text-blue-600"
                />
                <span>Notifications par email</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      push: e.target.checked
                    }
                  }))}
                  className="rounded text-blue-600"
                />
                <span>Notifications push</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      sms: e.target.checked
                    }
                  }))}
                  className="rounded text-blue-600"
                />
                <span>Notifications SMS</span>
              </label>
            </div>
          </div>

          {/* Autres paramètres */}
          <div>
            <h3 className="text-lg font-medium mb-4">Autres paramètres</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Langue
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    language: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuseau horaire
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    timezone: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Africa/Douala">Africa/Douala</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    autoBackup: e.target.checked
                  }))}
                  className="rounded text-blue-600"
                />
                <span>Sauvegarde automatique des données</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralSettings;