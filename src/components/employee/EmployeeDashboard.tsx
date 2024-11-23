import React from 'react';
import { useEmployeeStore } from '../../store/employeeStore';
import { format } from 'date-fns';
import { Clock, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

function EmployeeDashboard() {
  const { employees, workSessions, delayReports } = useEmployeeStore();

  // Calculer les statistiques globales
  const stats = {
    activeEmployees: employees.filter(e => e.status === 'active').length,
    ongoingSessions: workSessions.filter(s => s.status === 'ongoing').length,
    delayedTasks: delayReports.filter(r => r.status === 'pending').length,
    totalEmployees: employees.length
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Employés actifs</p>
              <p className="text-2xl font-semibold">{stats.activeEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Calendar className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sessions en cours</p>
              <p className="text-2xl font-semibold">{stats.ongoingSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches en retard</p>
              <p className="text-2xl font-semibold">{stats.delayedTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <CheckCircle className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total employés</p>
              <p className="text-2xl font-semibold">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des employés actifs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Employés actifs</h2>
        </div>
        <div className="divide-y">
          {employees
            .filter(emp => emp.status === 'active')
            .map(employee => {
              const currentSession = workSessions.find(
                s => s.employeeId === employee.id && s.status === 'ongoing'
              );
              
              return (
                <div key={employee.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.avatar || `https://ui-avatars.com/api/?name=${employee.name}`}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">
                          {employee.role.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {currentSession ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <Clock size={16} />
                          <span className="text-sm">
                            En activité depuis {format(new Date(currentSession.startTime), 'HH:mm')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Inactif</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Rapports de retard récents */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Rapports de retard récents</h2>
        </div>
        <div className="divide-y">
          {delayReports
            .filter(report => report.status === 'pending')
            .slice(0, 5)
            .map(report => {
              const employee = employees.find(emp => emp.id === report.employeeId);
              
              return (
                <div key={report.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{employee?.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.category === 'absence' ? 'bg-red-100 text-red-800' :
                        report.category === 'workload' ? 'bg-yellow-100 text-yellow-800' :
                        report.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {report.category}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(report.date), 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{report.reason}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;