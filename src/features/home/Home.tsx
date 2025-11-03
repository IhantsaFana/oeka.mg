import { useTranslation } from 'react-i18next';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { Hero } from './sections/Hero';
import { Introduction } from './sections/Introduction';
import { Timeline } from './sections/Timeline';
import { Certifications } from './sections/Certifications';

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
      <section id="introduction" className="py-20">
        <Introduction />
      </section>
      
      {/* Timeline Section */}
      <section id="timeline" className="py-20">
        <Timeline />
      </section>
      
      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <Certifications />
      </section>
    </>
  );
}

