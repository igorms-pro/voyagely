import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg flex items-center justify-center">
        <Sun className="w-5 h-5 text-white dark:text-gray-300" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  return (
    <button
      onClick={() => {
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
      }}
      className="w-10 h-10 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg flex items-center justify-center hover:bg-white/20 dark:hover:bg-gray-700/20 transition"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-white dark:text-gray-300" />
      ) : (
        <Moon className="w-5 h-5 text-white dark:text-gray-300" />
      )}
    </button>
  );
};
