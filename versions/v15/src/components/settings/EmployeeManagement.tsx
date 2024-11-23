import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useEmployeeStore } from '../../store/employeeStore';
import { Employee } from '../../types/employee';
import { format } from 'date-fns';

const EMPLOYEE_ROLES = [
  { value: 'photographer', label: 'Photographe' },
  { value: 'videographer', label: 'Vidéaste' },
  { value: 'editor', label: 'Monteur' },
  { value: 'makeup', label: 'Maquilleur(se)' },
  { value: 'assistant', label: 'Assistant(e)' },
  { value: 'teaser', label: 'Monteur Teaser' },
  { value: 'film', label: 'Monteur Film' },
  { value: 'colorist', label: 'Étalonneur' },
  { value: 'retoucher', label: 'Retoucheur' },
  { value: 'manager', label: 'Chef de projet' },
  { value: 'admin', label: 'Administrateur' },
  { value: 'sales', label: 'Commercial' },
  { value: 'coordinator', label: 'Coordinateur' },
  { value: 'stylist', label: 'Styliste' },
  { value: 'designer', label: 'Designer' }
];

const DEPARTMENTS = [
  { value: 'photo', label: 'Photo' },
  { value: 'video', label: 'Vidéo' },
  { value: 'editing', label: 'Montage' },
  { value: 'makeup', label: 'Maquillage' },
  { value: 'management', label: 'Direction' },
  { value: 'sales', label: 'Commercial' },
  { value: 'coordination', label: 'Coordination' },
  { value: 'design', label: 'Design' }
];

function EmployeeManagement() {
  const { employees, addEmployee, updateEmployee, removeEmployee } = useEmployeeStore();
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    role: [] as string[],
    phone: '',
    department: '',
    startDate: format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employeeData = {
      name: formData.name,
      age: parseInt(formData.age),
      role: formData.role,
      phone: formData.phone,
      department: formData.department,
      startDate: formData.startDate,
      status: 'active' as const
    };

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData);
    } else {
      addEmployee(employeeData);
    }
    
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      age: '',
      role: [],
      phone: '',
      department: '',
      startDate: format(new Date(), 'yyyy-MM-dd')
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Gestion des Employés</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Ajouter un Employé
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-5 gap-4 p-4 font-medium text-gray-500 border-b">
          <div>Nom</div>
          <div>Âge</div>
          <div>Fonction(s)</div>
          <div>Département</div>
          <div>Actions</div>
        </div>
        
        <div className="divide-y">
          {employees.map(employee => (
            <div key={employee.id} className="grid grid-cols-5 gap-4 p-4 items-center">
              <div className="font-medium">{employee.name}</div>
              <div>{employee.age} ans</div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {employee.role.map(role => (
                    <span
                      key={role}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {EMPLOYEE_ROLES.find(r => r.value === role)?.label || role}
                    </span>
                  ))}
                </div>
              </div>
              <div>{DEPARTMENTS.find(d => d.value === employee.department)?.label}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingEmployee(employee);
                    setFormData({
                      name: employee.name,
                      age: employee.age.toString(),
                      role: employee.role,
                      phone: employee.phone || '',
                      department: employee.department,
                      startDate: employee.startDate
                    });
                    setShowModal(true);
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
                      removeEmployee(employee.id);
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
                {editingEmployee ? 'Modifier un employé' : 'Ajouter un employé'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingEmployee(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
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
                  Âge *
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="18"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fonction(s) *
                </label>
                <div className="space-y-2">
                  {EMPLOYEE_ROLES.map(role => (
                    <label key={role.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.role.includes(role.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              role: [...prev.role, role.value]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              role: prev.role.filter(r => r !== role.value)
                            }));
                          }
                        }}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm">{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Département *
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Sélectionner un département</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'entrée *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingEmployee(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingEmployee ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;