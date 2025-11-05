import { useTranslation } from 'react-i18next';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { Hero } from './sections/Hero';
import { Introduction } from './sections/Introduction';
import { Timeline } from './sections/Timeline';
import { Certifications } from './sections/Certifications';
import { WorkTogether } from './sections/WorkTogether';

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
      />
      <StructuredData type="person" />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Introduction Section */}
      <Introduction />
      
      {/* Timeline Section */}
      <Timeline />
      
      {/* Certifications Section */}
      <Certifications />
      
      {/* Work Together Section */}
      <WorkTogether />
    </>
  );
}

