import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractLangFromPath } from '@/shared/utils/routes';

/**
 * Composant qui synchronise la langue de l'URL avec i18next
 * Doit être placé dans le Layout principal
 */
export function LanguageSync() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Extrait la langue du chemin
    const langFromPath = extractLangFromPath(location.pathname);
    
    // Synchronise la langue de l'URL avec i18next
    if (langFromPath && langFromPath !== i18n.language) {
      i18n.changeLanguage(langFromPath);
    }
  }, [location.pathname, i18n]);

  // Ce composant ne rend rien
  return null;
}

