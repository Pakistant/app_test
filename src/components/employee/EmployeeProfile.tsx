import React, { useState } from 'react';
import { User, Clock, Calendar, BarChart2, Edit2, Save, X } from 'lucide-react';
import { useEmployeeStore } from '../../store/employeeStore';
import { Employee } from '../../types/employee';
import { format } from 'date-fns';

interface EmployeeProfileProps {
  employeeId: string;
}

function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  const { employees, updateEmployee } = useEmployeeStore();
  const employee = employees.find(emp => emp.id === employeeId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>(employee || {});

  if (!employee) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee(employeeId, formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={employee.avatar || `https://ui-avatars.com/api/?name=${employee.name}`}
              alt={employee.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">{employee.role.join(', ')}</p>
          </div>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Edit2 size={16} />
            Modifier
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
          >
            <X size={16} />
            Annuler
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Âge
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-lg"
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
                className="w-full px-3 py-2 border rounded-lg"
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
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Informations</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <span>Âge: {employee.age} ans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Depuis: {format(new Date(employee.startDate), 'dd/MM/yyyy')}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Contact</h3>
              <div className="space-y-2">
                <p>{employee.email}</p>
                <p>{employee.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Projets à temps</p>
                <p className="text-xl font-semibold text-green-600">
                  {employee.performance.onTimeDelivery}%
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Projets en retard</p>
                <p className="text-xl font-semibold text-red-600">
                  {employee.performance.delayedProjects}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total projets</p>
                <p className="text-xl font-semibold text-blue-600">
                  {employee.performance.totalProjects}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Sessions de travail récentes</h3>
            <div className="space-y-2">
              {employee.workLog.slice(0, 5).map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm">
                      {format(new Date(log.startTime), 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    log.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;