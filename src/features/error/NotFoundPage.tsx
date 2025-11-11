import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/Button';
import { SEO } from '@/shared/components/ui/SEO';

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <SEO 
        title={t('notFound.seo.title', 'Page non trouvée - Ihantsa Rakotondraivo')}
        description={t('notFound.seo.description', 'La page que vous recherchez n\'existe pas ou a été déplacée.')}
      />
      
      <div className="container mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl w-full"
        >
          {/* Numéro d'erreur */}
          <div className="text-8xl font-bold text-primary-600 dark:text-primary-400 mb-6">
            404
          </div>
          
          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title', 'Oups ! Page introuvable')}
          </h1>
          
          {/* Message */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('notFound.message', 'Désolé, nous n\'avons pas trouvé la page que vous recherchez.')}
          </p>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              onClick={handleGoHome}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t('notFound.ctaPrimary', 'Retour à l\'accueil')}
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t('notFound.ctaSecondary', 'Page précédente')}
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
