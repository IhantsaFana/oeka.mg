import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Charge les traductions depuis /public/locales
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Passe l'instance i18n à react-i18next
  .init({
    fallbackLng: 'en', // Langue par défaut
    supportedLngs: ['en', 'fr'], // Langues supportées
    debug: import.meta.env.DEV, // Debug en mode développement
    
    interpolation: {
      escapeValue: false, // React échappe déjà le HTML
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin des fichiers de traduction
    },
    
    detection: {
      order: ['path', 'localStorage', 'navigator'], // Ordre de détection
      lookupFromPathIndex: 0, // Index du segment de langue dans l'URL
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage'], // Sauvegarde dans localStorage
      excludeCacheFor: ['cimode'], // Ne pas mettre en cache le mode CI
    },
  });

export default i18n;

