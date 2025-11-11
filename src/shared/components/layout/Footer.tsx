import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/shared/components/ui/ThemeToggle';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section - Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p>&copy; {currentYear} OEKA. {t('footer.rights')}</p>
          </div>

          {/* Center Section - Social Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:ihantsarakotondranaivo@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href="https://github.com/IhantsaFana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/IhantsaFana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              X
            </a>
            <a
              href="https://linkedin.com/in/ihantsa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://facebook.com/ihantsarakoto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>

          {/* Right Section - Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

