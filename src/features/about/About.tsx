import { useTranslation } from 'react-i18next';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { AboutHero } from './components/AboutHero';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Certifications } from './components/Certifications';
import { Hobbies } from './components/Hobbies';

export function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('about.title')} 
        description={t('about.seo.description')}
        keywords={t('about.seo.keywords')}
      />
      <StructuredData type="person" />
      
      <AboutHero />
      <Skills />
      <Timeline />
      <Certifications />
      <Hobbies />
    </>
  );
}

