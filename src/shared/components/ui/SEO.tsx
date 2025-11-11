import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = 'https://oeka.mg/og-image.jpg',
  type = 'website' 
}: SEOProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  const baseUrl = 'https://oeka.mg';
  
  const seoTitle = title || t('meta.title');
  const seoDescription = description || t('meta.description');
  const seoKeywords = keywords || t('meta.keywords');
  
  // Construire les URLs pour hreflang
  const currentPath = location.pathname.replace(/^\/(en|fr)/, '');
  const enUrl = `${baseUrl}/en${currentPath}`;
  const frUrl = `${baseUrl}/fr${currentPath}`;
  const currentUrl = `${baseUrl}/${currentLang}${currentPath}`;

  return (
    <Helmet>
      {/* HTML Lang */}
      <html lang={currentLang} />
      
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="OEKA" />
      
      {/* Hreflang Tags pour SEO Multilingue */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={currentLang === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content="Portfolio - OEKA" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

