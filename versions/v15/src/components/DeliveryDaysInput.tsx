import React from 'react';

interface DeliveryDaysInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

function DeliveryDaysInput({ value, onChange, className = '' }: DeliveryDaysInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Délai de livraison (jours)
      </label>
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          min="1"
        />
        <div className="text-sm text-gray-500">
          {value > 0 && (
            <span>
              Livraison prévue le{' '}
              {new Date(Date.now() + value * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryDaysInput;