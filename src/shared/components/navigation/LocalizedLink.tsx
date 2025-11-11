import { Link, useParams } from 'react-router-dom';
import { getLocalizedPath } from '@/shared/utils/routes';
import type { LinkProps } from 'react-router-dom';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  lang?: string;
}

/**
 * Composant de lien localisé qui gère automatiquement le préfixe de langue
 * Utilise la langue de l'URL actuelle par défaut
 */
export function LocalizedLink({ to, lang, ...props }: LocalizedLinkProps) {
  const params = useParams<{ lang?: string }>();
  const currentLang = lang || params.lang || 'fr'; // Fallback à 'fr' si non défini
  const path = getLocalizedPath(to, currentLang);
  
  return <Link to={path} {...props} />;
}
