import React, { useState } from 'react';
import { Users, UserPlus, Settings as SettingsIcon, Package, Cog } from 'lucide-react';
import EmployeeManagement from './EmployeeManagement';
import RoleManagement from './RoleManagement';
import FormulaManagement from './FormulaManagement';
import GeneralSettings from './GeneralSettings';

function Settings() {
  const [activeTab, setActiveTab] = useState('team');

  const tabs = [
    { id: 'team', label: 'Équipe', icon: Users, component: EmployeeManagement },
    { id: 'roles', label: 'Rôles', icon: UserPlus, component: RoleManagement },
    { id: 'formulas', label: 'Formules', icon: Package, component: FormulaManagement },
    { id: 'general', label: 'Général', icon: Cog, component: GeneralSettings }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || EmployeeManagement;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <SettingsIcon size={20} />
            Paramètres
          </h2>
          <p className="text-sm text-gray-500">Configuration de l'application</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default Settings;