import { useTranslation } from 'react-i18next';
import { CTASection } from '@/shared/components/ui/CTASection';

export function WorkTogether() {
  const { t } = useTranslation();

  return (
    <CTASection
      id="work-together"
      title={t('home.cta.workTogether')}
      subtitle={t('home.cta.workTogetherSubtitle')}
      primaryAction={{
        text: t('home.cta.startProject'),
        href: '/contact'
      }}
      secondaryAction={{
        text: t('home.cta.learnMore'),
        href: '#introduction'
      }}
    />
  );
}
