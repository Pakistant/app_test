import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Changer le thème"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-gray-600 dark:text-gray-400" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
}

export default ThemeToggle;