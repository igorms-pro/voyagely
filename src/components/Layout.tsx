import { ReactNode } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
  showLanguageTheme?: boolean;
}

export const Layout = ({ children, showLanguageTheme = true }: LayoutProps) => {
  return (
    <>
      {/* Global Header with Language and Theme Toggle */}
      {showLanguageTheme && (
        <div className="fixed top-4 right-2 flex items-center space-x-2 z-50">
          <LanguageSwitcher variant="dropdown" size="md" />
          <ThemeToggle />
        </div>
      )}

      {/* Content */}
      {children}
    </>
  );
};
