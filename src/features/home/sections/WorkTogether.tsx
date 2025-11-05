import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/Button';
import { Container } from '@/shared/components/ui/Container';

export function WorkTogether() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t('home.cta.workTogether')}
          </h3>
          <p className="text-blue-100 mb-8 text-lg">
            {t('home.cta.workTogetherSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-2 group"
            >
              {t('home.cta.startProject')}
              <span className="group-hover:translate-x-1 transition-transform">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Button>
            <Button
              href="#introduction"
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10"
            >
              {t('home.cta.learnMore')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
