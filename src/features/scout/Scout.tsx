import { useTranslation } from 'react-i18next';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { ScoutHero } from './sections/ScoutHero';
import { ScoutProfile } from './sections/ScoutProfile';
import { ScoutActivities } from './sections/ScoutActivities';
import { ScoutShowcase } from './sections/ScoutShowcase';

export function Scout() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('scout.seo.title')}
        description={t('scout.seo.description')}
        keywords={t('scout.seo.keywords')}
      />
      <StructuredData type="person" />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <ScoutHero />

        {/* Profile Section */}
        <ScoutProfile />

        {/* Activities Section */}
        <ScoutActivities />

        {/* Showcase Section */}
        <ScoutShowcase />
      </main>
    </>
  );
}
