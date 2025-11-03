import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    // Récupère le chemin actuel sans la langue
    const pathWithoutLang = location.pathname.replace(/^\/(en|fr)/, '');
    
    // Navigue vers la nouvelle langue
    navigate(`/${lng}${pathWithoutLang}`);
    
    // Change la langue dans i18next
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <motion.button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
          i18n.language === 'en'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Switch to English"
      >
        EN
      </motion.button>
      
      <motion.button
        onClick={() => changeLanguage('fr')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
          i18n.language === 'fr'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Passer au français"
      >
        FR
      </motion.button>
    </div>
  );
}

