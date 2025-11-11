import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface StructuredDataProps {
  type?: 'person' | 'website' | 'breadcrumb';
}

export function StructuredData({ type = 'person' }: StructuredDataProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Schema.org Person (pour la page principale)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ihantsa RAKOTONDRANAIVO",
    "alternateName": "OEKA",
    "url": "https://oeka.mg",
    "image": "https://oeka.mg/profile.jpg",
    "sameAs": [
      "https://github.com/IhantsaFana",
      "https://linkedin.com/in/ihantsa",
      // Ajoutez vos autres réseaux sociaux
    ],
    "jobTitle": "Full-Stack Developer & AI Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Flutter",
      "Python",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Mobile Development"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "French",
        "alternateName": "fr"
      },
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MG",
      "addressLocality": "Madagascar"
    }
  };

  // Schema.org WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OEKA - Ihantsa RAKOTONDRANAIVO Portfolio",
    "url": "https://oeka.mg",
    "description": currentLang === 'fr' 
      ? "Portfolio de Ihantsa RAKOTONDRANAIVO, Développeur Full-Stack & IA spécialisé en React, Next.js, Flutter, Python."
      : "Portfolio of Ihantsa RAKOTONDRANAIVO, Full-Stack Developer & AI specialized in React, Next.js, Flutter, Python.",
    "inLanguage": [currentLang],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://oeka.mg/{lang}/projects?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Sélectionner le bon schema selon le type
  const schema = type === 'website' ? websiteSchema : personSchema;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

