import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';

export function ScoutShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-14 md:py-16 relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Image */}
          <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
            <div className="aspect-[16/9] sm:aspect-[21/9] relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">
              <img
                src="/scout/showcase.webp"
                alt={t('scout.showcase.alt')}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  {t('scout.showcase.title')}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  {t('scout.showcase.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Pattern */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-1 sm:gap-2 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 40 40"
                  className="text-blue-600 dark:text-blue-400 sm:w-10 sm:h-10"
                >
                  <polygon
                    points="20,5 35,35 5,35"
                    fill="currentColor"
                    opacity={0.6 - i * 0.04}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
