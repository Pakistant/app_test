import React from 'react';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const countries = [
  { code: 'fr', name: 'France', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'cm', name: 'Cameroun', flag: 'https://flagcdn.com/cm.svg' }
];

function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {countries.map(country => (
        <button
          key={country.code}
          type="button"
          onClick={() => onChange(country.code)}
          className={`p-4 border rounded-lg flex flex-col items-center justify-center ${
            value === country.code 
              ? 'border-blue-500 bg-blue-50' 
              : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src={country.flag} 
            alt={`Drapeau ${country.name}`} 
            className="w-12 h-8 object-cover rounded shadow-sm"
          />
          <span className="mt-2 text-sm font-medium">{country.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CountrySelector;