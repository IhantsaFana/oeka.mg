import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, getKeywordsForLanguage, getDescriptionForPage } from '@/shared/config/seo.config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  page?: string; // Nom de la page pour les descriptions personnalisées
}

export function SEO({
  title,
  description,
  keywords,
  image = SEO_CONFIG.defaultOgImage,
  type = 'website',
  page = 'home'
}: SEOProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  const baseUrl = SEO_CONFIG.siteUrl;

  // Utiliser la configuration SEO centralisée si aucune valeur n'est fournie
  const seoTitle = title || t('meta.title');
  const seoDescription = description || getDescriptionForPage(page, currentLang);
  const seoKeywords = keywords || getKeywordsForLanguage(currentLang, page);

  // Construire les URLs pour hreflang (toutes les langues supportées)
  const currentPath = location.pathname.replace(/^\/(en|fr|mg|es|zh|de)/, '');
  const supportedLangs = ['en', 'fr', 'mg', 'es', 'zh', 'de'];
  const currentUrl = `${baseUrl}/${currentLang}${currentPath}`;

  // Mapping des locales pour Open Graph
  const localeMap: Record<string, string> = {
    en: 'en_US',
    fr: 'fr_FR',
    mg: 'mg_MG',
    es: 'es_ES',
    zh: 'zh_CN',
    de: 'de_DE',
  };

  // Données structurées JSON-LD pour Schema.org
  const structuredData = {
    ...SEO_CONFIG.structuredData,
    description: seoDescription,
    url: currentUrl,
  };

  // Breadcrumb structuré
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${currentLang}/`,
      },
      ...(currentPath && currentPath !== '/' ? [{
        '@type': 'ListItem',
        position: 2,
        name: page.charAt(0).toUpperCase() + page.slice(1),
        item: currentUrl,
      }] : []),
    ],
  };

  return (
    <Helmet>
      {/* HTML Lang */}
      <html lang={currentLang} />

      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="creator" content={SEO_CONFIG.authorAlias} />

      {/* Informations géographiques */}
      <meta name="geo.region" content="MG" />
      <meta name="geo.placename" content="Antananarivo" />
      <meta name="geo.position" content="-18.8792;47.5079" />
      <meta name="ICBM" content="-18.8792, 47.5079" />

      {/* Hreflang Tags pour SEO Multilingue - TOUTES LES LANGUES */}
      {supportedLangs.map(lang => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}/${lang}${currentPath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${currentPath}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={localeMap[currentLang] || 'en_US'} />
      {/* Locales alternatives pour Open Graph */}
      {supportedLangs.filter(lang => lang !== currentLang).map(lang => (
        <meta key={`og-alt-${lang}`} property="og:locale:alternate" content={localeMap[lang]} />
      ))}
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.social.twitter} />
      <meta name="twitter:creator" content={SEO_CONFIG.social.twitter} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={seoTitle} />

      {/* Données structurées JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Breadcrumb structuré */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>

      {/* Liens vers profils sociaux */}
      <link rel="me" href={SEO_CONFIG.social.linkedin} />
      <link rel="me" href={SEO_CONFIG.social.github} />

      {/* Mobile Web App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="OEKA" />

      {/* Theme Color */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
    </Helmet>
  );
}

