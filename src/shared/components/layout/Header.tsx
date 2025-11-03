import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/shared/components/ui/LanguageSwitcher';
import { Container } from '@/shared/components/ui/Container';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export function Header() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { key: 'home', href: `/${currentLang}` },
    { key: 'dev', href: `/${currentLang}/dev` },
    { key: 'scout', href: `/${currentLang}/scout` },
    { key: 'fleurs', href: `/${currentLang}/fleurs` },
    { key: 'contact', href: `/${currentLang}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${currentLang}`) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <Container className="py-3 sm:py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo avec favicon */}
            <Link
              to={`/${currentLang}`}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/favicon.svg" 
                alt="OEKA - Ihantsa RAKOTONDRANAIVO Portfolio Logo" 
                className="w-8 h-8"
                width="32"
                height="32"
              />
            </Link>

            {/* Séparateur vertical */}
            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Navigation Desktop - À gauche avec le logo */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`
                    font-medium transition-colors duration-300
                    ${isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - CTA + Language */}
          <div className="flex items-center gap-4">
            {/* CTA Buttons - Taille réduite */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to={`/${currentLang}/contact`}
                className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium rounded-md text-sm"
              >
                {t('nav.hireMe')}
              </Link>
              <span className="text-gray-400 mx-1">•</span>
              <Link
                to={`/${currentLang}/dev`}
                className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium rounded-md text-sm"
              >
                {t('nav.discoverProjects')}
              </Link>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 font-medium transition-colors
                    ${isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="px-4 pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to={`/${currentLang}/contact`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {t('nav.hireMe')}
                </Link>
                <Link
                  to={`/${currentLang}/dev`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {t('nav.discoverProjects')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

