import React from 'react';
import { Clock, UserCheck, UserX } from 'lucide-react';
import { staff } from '../../data/staff';

function AttendanceManagement() {
  // Simuler des données de présence
  const attendance = staff.map(employee => ({
    ...employee,
    status: Math.random() > 0.2 ? 'present' : 'absent',
    timeIn: '09:00',
    timeOut: '18:00',
    totalHours: 9
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Présence aujourd'hui</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Présent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Absent</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {attendance.map(employee => (
          <div 
            key={employee.id}
            className={`p-4 rounded-lg ${
              employee.status === 'present' ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {employee.status === 'present' ? (
                  <UserCheck className="text-green-500" size={20} />
                ) : (
                  <UserX className="text-red-500" size={20} />
                )}
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-gray-600">
                    {employee.role.join(', ')}
                  </p>
                </div>
              </div>
              {employee.status === 'present' && (
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <Clock size={16} className="inline mr-1" />
                    {employee.timeIn} - {employee.timeOut}
                  </div>
                  <div className="text-sm font-medium">
                    {employee.totalHours}h
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Employés</p>
          <p className="text-2xl font-semibold">{staff.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Présents</p>
          <p className="text-2xl font-semibold">
            {attendance.filter(e => e.status === 'present').length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Absents</p>
          <p className="text-2xl font-semibold">
            {attendance.filter(e => e.status === 'absent').length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AttendanceManagement;