import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useProjectStore } from '../../store';

function FinancialOverview() {
  const { projects } = useProjectStore();

  // Calculer les revenus totaux
  const totalRevenue = projects.reduce((total, project) => {
    if ('price' in project) {
      return total + (project.price || 0);
    }
    return total;
  }, 0);

  // Simuler quelques statistiques financières
  const stats = {
    revenue: totalRevenue,
    expenses: totalRevenue * 0.4, // 40% des revenus
    profit: totalRevenue * 0.6, // 60% des revenus
    growth: 15 // Croissance de 15%
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <DollarSign size={20} />
        Aperçu Financier
      </h2>

      <div className="space-y-4">
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Revenus</p>
            <TrendingUp className="text-green-500" size={16} />
          </div>
          <p className="text-lg font-semibold">{stats.revenue.toLocaleString()} €</p>
        </div>

        <div className="p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Dépenses</p>
            <TrendingDown className="text-red-500" size={16} />
          </div>
          <p className="text-lg font-semibold">{stats.expenses.toLocaleString()} €</p>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Bénéfices</p>
            <TrendingUp className="text-blue-500" size={16} />
          </div>
          <p className="text-lg font-semibold">{stats.profit.toLocaleString()} €</p>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Croissance mensuelle</p>
            <p className="text-green-500 font-semibold">+{stats.growth}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialOverview;