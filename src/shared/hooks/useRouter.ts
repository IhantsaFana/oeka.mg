import { useLocation, useParams } from 'react-router-dom';
import { extractLangFromPath } from '@/shared/utils/routes';

/**
 * Hook personnalisé pour accéder aux informations de routage et de langue
 */
export function useRouter() {
  const location = useLocation();
  const params = useParams<{ lang?: string }>();
  
  // Récupère la langue actuelle depuis l'URL ou les paramètres
  const currentLang = params.lang || extractLangFromPath(location.pathname) || 'fr';
  
  return {
    // La langue actuelle (ex: 'fr', 'en')
    lang: currentLang,
    
    // Le chemin actuel sans la langue (ex: '/about' au lieu de '/fr/about')
    path: location.pathname.replace(new RegExp(`^/${currentLang}`), '') || '/',
    
    // Objet location complet de React Router
    location,
    
    // Paramètres d'URL
    params,
  };
}
