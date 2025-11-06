import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { Hero } from './sections/Hero';
import { Introduction } from './sections/Introduction';
import { Timeline } from './sections/Timeline';
import { Certifications } from './sections/Certifications';
import { WorkTogether } from './sections/WorkTogether';
import { FaTimes } from 'react-icons/fa';

export function Home() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showError, setShowError] = useState(false);

  // Vérifie s'il y a un paramètre d'erreur dans l'URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'page_not_found') {
      setShowError(true);
      // Nettoie l'URL après avoir affiché le message
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('error');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const closeError = () => {
    setShowError(false);
  };

  return (
    <>
      <SEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
      />
      <StructuredData type="person" />

      {/* Message d'erreur pour les pages non trouvées */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  {t('common.error.page_not_found.title', 'Page non trouvée')}
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {t('common.error.page_not_found.message', 'La page que vous recherchez n\'existe pas ou a été déplacée.')}
                </p>
              </div>
              <button
                type="button"
                onClick={closeError}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                aria-label={t('common.close', 'Fermer')}
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Introduction Section */}
      <Introduction />
      
      {/* Timeline Section */}
      <Timeline />
      
      {/* Certifications Section */}
      <Certifications />
      
      {/* Work Together Section */}
      <WorkTogether />
    </>
  );
}

