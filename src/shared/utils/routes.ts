import i18n from 'i18next';

// Définition des routes de l'application
export const ROUTES = {
  HOME: '/:lang/',
  DEV: '/:lang/dev',
  CONTACT: '/:lang/contact',
  SCOUT: '/:lang/scout',
  FLEURS: '/:lang/fleurs',
  // Ajoutez d'autres routes ici
} as const;

// Type pour les clés de route
export type RouteKey = keyof typeof ROUTES;

/**
 * Génère un chemin localisé
 * @param path - Le chemin de base (sans la langue)
 * @param lang - La langue (optionnel, utilise la langue courante par défaut)
 * @returns Le chemin complet avec la langue
 */
export function getLocalizedPath(path: string, lang?: string): string {
  const currentLang = lang || i18n.language;
  // Supprime les doubles slashes
  return `/${currentLang}${path.startsWith('/') ? '' : '/'}${path}`.replace(/([^:]\/)\/+/g, '$1');
}

/**
 * Extrait la langue du chemin
 * @param path - Le chemin complet
 * @returns La langue extraite ou undefined si non trouvée
 */
export function extractLangFromPath(path: string): string | undefined {
  const match = path.match(/^\/([a-z]{2})(\/|$)/i);
  return match ? match[1] : undefined;
}
