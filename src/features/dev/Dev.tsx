import { useTranslation } from 'react-i18next';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { TechLogos } from './sections/TechLogos';
import { Projects } from './sections/Projects/Projects';

export function Dev() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('dev.seo.title')}
        description={t('dev.seo.description')}
      />
      <StructuredData type="person" />
      
      <main>
        <TechLogos />
        <Projects />
      </main>
    </>
  );
}