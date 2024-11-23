import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useProjectStore } from '../../store';
import { staff } from '../../data/staff';

function EmployeePerformance() {
  const { projects } = useProjectStore();

  // Calculer les statistiques par employé
  const employeeStats = staff.map(employee => {
    const completedTasks = projects.reduce((total, project) => {
      if (!('tasks' in project)) return total;
      return total + project.tasks.filter(task => 
        task.assignedTo === employee.id && 
        task.status === 'completed'
      ).length;
    }, 0);

    const totalTasks = projects.reduce((total, project) => {
      if (!('tasks' in project)) return total;
      return total + project.tasks.filter(task => 
        task.assignedTo === employee.id
      ).length;
    }, 0);

    return {
      name: employee.name,
      completedTasks,
      totalTasks,
      performance: totalTasks ? (completedTasks / totalTasks) * 100 : 0
    };
  });

  const chartData = {
    labels: employeeStats.map(stat => stat.name),
    datasets: [
      {
        label: 'Tâches complétées',
        data: employeeStats.map(stat => stat.completedTasks),
        backgroundColor: '#60A5FA',
      },
      {
        label: 'Tâches totales',
        data: employeeStats.map(stat => stat.totalTasks),
        backgroundColor: '#93C5FD',
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance des employés'
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Vue d'ensemble</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {employeeStats.map(stat => (
            <div key={stat.name} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{stat.name}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  Tâches complétées: {stat.completedTasks}/{stat.totalTasks}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${stat.performance}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Performance: {stat.performance.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Statistiques détaillées</h3>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default EmployeePerformance;