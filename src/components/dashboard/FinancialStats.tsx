import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useProjectStore } from '../../store';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

function FinancialStats() {
  const { projects } = useProjectStore();

  // Calculer les revenus par type de projet
  const revenueByType = {
    wedding: projects
      .filter(p => p.type === 'wedding')
      .reduce((sum, p) => sum + (p.price || 0), 0),
    studio: projects
      .filter(p => p.type === 'studio')
      .reduce((sum, p) => sum + (p.price || 0), 0),
    corporate: projects
      .filter(p => p.type === 'corporate')
      .reduce((sum, p) => sum + (p.price || 0), 0)
  };

  // Calculer les revenus par pays
  const revenueByCountry = {
    fr: projects
      .filter(p => p.country === 'fr')
      .reduce((sum, p) => sum + (p.price || 0), 0),
    cm: projects
      .filter(p => p.country === 'cm')
      .reduce((sum, p) => sum + (p.price || 0), 0)
  };

  // Calculer les prévisions pour les 6 prochains mois
  const today = new Date();
  const last6Months = eachMonthOfInterval({
    start: subMonths(today, 5),
    end: today
  });

  const revenueHistory = last6Months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    return {
      month: format(month, 'MMM yyyy', { locale: fr }),
      actual: projects
        .filter(p => {
          const projectDate = new Date(p.date);
          return projectDate >= monthStart && projectDate <= monthEnd;
        })
        .reduce((sum, p) => sum + (p.price || 0), 0),
      projected: projects
        .filter(p => p.status === 'a_venir')
        .filter(p => {
          const projectDate = new Date(p.date);
          return projectDate >= monthStart && projectDate <= monthEnd;
        })
        .reduce((sum, p) => sum + (p.price || 0), 0)
    };
  });

  const revenueByTypeData = {
    labels: ['Mariages', 'Studio', 'Corporate'],
    datasets: [{
      label: 'Revenus par type',
      data: [revenueByType.wedding, revenueByType.studio, revenueByType.corporate],
      backgroundColor: ['#8B5CF6', '#06B6D4', '#F59E0B'],
    }]
  };

  const revenueByCountryData = {
    labels: ['France', 'Cameroun'],
    datasets: [{
      label: 'Revenus par pays',
      data: [revenueByCountry.fr, revenueByCountry.cm],
      backgroundColor: ['#3B82F6', '#10B981'],
    }]
  };

  const revenueHistoryData = {
    labels: revenueHistory.map(r => r.month),
    datasets: [
      {
        label: 'Revenus réels',
        data: revenueHistory.map(r => r.actual),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Revenus projetés',
        data: revenueHistory.map(r => r.projected),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        borderDash: [5, 5],
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Revenus par type de projet</h3>
          <Bar 
            data={revenueByTypeData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Revenus par pays</h3>
          <Bar 
            data={revenueByCountryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Évolution et prévisions des revenus</h3>
        <Line 
          data={revenueHistoryData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              }
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-violet-50 p-4 rounded-lg">
          <p className="text-sm text-violet-600">Revenus Mariages</p>
          <p className="text-2xl font-semibold text-violet-700">
            {revenueByType.wedding.toLocaleString()} €
          </p>
        </div>
        <div className="bg-cyan-50 p-4 rounded-lg">
          <p className="text-sm text-cyan-600">Revenus Studio</p>
          <p className="text-2xl font-semibold text-cyan-700">
            {revenueByType.studio.toLocaleString()} €
          </p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-sm text-amber-600">Revenus Corporate</p>
          <p className="text-2xl font-semibold text-amber-700">
            {revenueByType.corporate.toLocaleString()} €
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinancialStats;