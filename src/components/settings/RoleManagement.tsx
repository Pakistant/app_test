import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const AVAILABLE_PERMISSIONS = [
  'create_project',
  'edit_project',
  'delete_project',
  'manage_employees',
  'manage_roles',
  'manage_formulas',
  'view_reports',
  'manage_settings'
];

function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Administrateur',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: AVAILABLE_PERMISSIONS
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Gestion des projets et des équipes',
      permissions: ['create_project', 'edit_project', 'view_reports']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...formData }
          : role
      ));
    } else {
      setRoles([...roles, { 
        id: Date.now().toString(),
        ...formData
      }]);
    }
    
    setShowModal(false);
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Gestion des Rôles</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Ajouter un Rôle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-4 gap-4 p-4 font-medium text-gray-500 border-b">
          <div>Nom</div>
          <div>Description</div>
          <div>Permissions</div>
          <div>Actions</div>
        </div>
        
        <div className="divide-y">
          {roles.map(role => (
            <div key={role.id} className="grid grid-cols-4 gap-4 p-4 items-center">
              <div className="font-medium">{role.name}</div>
              <div className="text-gray-600">{role.description}</div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map(permission => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingRole(role);
                    setFormData({
                      name: role.name,
                      description: role.description,
                      permissions: role.permissions
                    });
                    setShowModal(true);
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
                      setRoles(roles.filter(r => r.id !== role.id));
                    }
                  }}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingRole ? 'Modifier un rôle' : 'Ajouter un rôle'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingRole(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du rôle *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <div className="space-y-2">
                  {AVAILABLE_PERMISSIONS.map(permission => (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission)
                            }));
                          }
                        }}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRole(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingRole ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleManagement;