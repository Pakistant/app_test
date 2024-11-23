import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { useProjectStore } from '../../store';
import { format, differenceInDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function AnalyticsView() {
  const { projects } = useProjectStore();

  // Statistiques des types de mariages
  const weddingTypeStats = {
    labels: ['Mariages Français', 'Mariages Camerounais'],
    datasets: [{
      data: [
        projects.filter(p => p.weddingType === 'french').length,
        projects.filter(p => p.weddingType === 'cameroonian').length
      ],
      backgroundColor: ['#60A5FA', '#F87171'],
    }]
  };

  // Statistiques des formules
  const formulaStats = {
    labels: Array.from(new Set(projects.map(p => p.formula.name))),
    datasets: [{
      label: 'Nombre de projets par formule',
      data: Array.from(new Set(projects.map(p => p.formula.name))).map(
        formula => projects.filter(p => p.formula.name === formula).length
      ),
      backgroundColor: '#60A5FA',
    }]
  };

  // Délais moyens de livraison
  const deliveryTimeData = {
    labels: projects.map(p => p.couple),
    datasets: [{
      label: 'Jours de traitement',
      data: projects.map(p => {
        const completedTasks = p.tasks.filter(t => t.status === 'completed');
        if (completedTasks.length === 0) return 0;
        const lastTask = completedTasks.reduce((latest, task) => {
          return new Date(task.completedDate || '') > new Date(latest.completedDate || '') 
            ? task 
            : latest;
        });
        return differenceInDays(
          new Date(lastTask.completedDate || ''),
          new Date(p.date)
        );
      }),
      borderColor: '#818CF8',
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      fill: true,
    }]
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Types de mariages */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Répartition des types de mariages</h3>
          <div className="h-64">
            <Doughnut 
              data={weddingTypeStats}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Formules */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Formules choisies</h3>
          <div className="h-64">
            <Bar 
              data={formulaStats}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Délais de livraison */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-4">Délais de livraison</h3>
        <div className="h-80">
          <Line 
            data={deliveryTimeData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Jours'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;