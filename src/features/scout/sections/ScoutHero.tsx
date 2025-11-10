import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { ImageGallery } from '../components/ImageGallery';

const scoutImages = [
  '/scout/scouts-1.webp',
  '/scout/scouts-2.jpg',
  '/scout/scouts-3.jpg',
];

const scoutLogos = [
  { src: '/scout/scouts.png', alt: 'Scout' },
  { src: '/scout/tily.png', alt: 'Tily' },
  { src: '/scout/harambato.jpg', alt: 'Harambato' },
];

export function ScoutHero() {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIj48L3JlY3Q+CjxwYXRoIGQ9Ik0tMSwxIEwxMDEsMTAxIE0xMDEsLTEgTC0xLDk5IE05OSwxIEwxLDEwMSBNMSwxIEw5OSw5OSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIj48L3BhdGg+Cjwvc3ZnPg==')]" />
      </div>

      <Container>
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left: Description + Image Slider */}
          <div className="space-y-6 md:space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                {t('scout.hero.title')}
              </h1>
              <div className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed space-y-3 md:space-y-4">
                <p>{t('scout.hero.subtitle')}</p>
                <p>{t('scout.hero.mission')}</p>
                <p className="hidden sm:block">{t('scout.hero.description')}</p>
              </div>
            </motion.div>

            {/* Image Slider - Mobile/Tablet */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:hidden"
            >
              <ImageGallery images={scoutImages} alt="Scout" />
            </motion.div>
          </div>

          {/* Right: Scout Logos + Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Scout Logos - Horizontal */}
            <div className="flex justify-center lg:justify-end items-center gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12">
              {scoutLogos.map((logo) => (
                <div key={logo.alt} className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.placeholder-logo')) {
                          const placeholder = document.createElement('div');
                          placeholder.className =
                            'placeholder-logo absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xs';
                          placeholder.textContent = logo.alt;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Images empilées - Desktop only */}
            <div className="hidden lg:block flex-1">
              <ImageGallery images={scoutImages} alt="Scout" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
    </section>
  );
}
