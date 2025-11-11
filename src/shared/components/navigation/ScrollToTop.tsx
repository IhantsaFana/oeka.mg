import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant qui fait défiler la page vers le haut à chaque changement de route
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Fait défiler instantanément vers le haut de la page lorsque l'URL change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
