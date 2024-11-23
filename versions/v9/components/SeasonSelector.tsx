import React from 'react';
import { useProjectStore } from '../store';
import { ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';

function SeasonSelector() {
  const { seasons, activeSeason, setActiveSeason } = useProjectStore();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
        <span>{activeSeason?.name}</span>
        <ChevronDown size={16} />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {seasons.map((season) => (
            <Menu.Item key={season.id}>
              {({ active }) => (
                <button
                  onClick={() => setActiveSeason(season.id)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                >
                  {season.name}
                  {season.isActive && (
                    <span className="ml-2 text-blue-600">✓</span>
                  )}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default SeasonSelector;