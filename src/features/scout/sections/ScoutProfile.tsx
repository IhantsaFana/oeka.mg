import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { CurvedLines } from '@/shared/components/ui/CurvedLines';
import { FaHandsHelping, FaLeaf, FaStar, FaCampground, FaFire } from 'react-icons/fa';

export function ScoutProfile() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const couaImages = [
    '/scout/coua-1.jpg',
    '/scout/coua-2.jpg',
    '/scout/coua-3.jpg',
    '/scout/coua-4.jpg',
    '/scout/coua-5.jpg',
    '/scout/coua-6.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % couaImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [couaImages.length]);

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <CurvedLines 
        position="bottom" 
        height="sm" 
        opacity="strong" 
        color="blue" 
        curvature="strong" 
      />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Slider */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-blue-700">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={couaImages[currentImageIndex]}
                    alt={`OEKA Mikofo - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-scout')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder-scout absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8';
                        placeholder.innerHTML = `
                          <div class="text-6xl mb-4">🦅</div>
                          <div class="text-2xl font-bold mb-2">OEKA Mikofo</div>
                          <div class="text-lg opacity-90">Chef Scout</div>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Floating Scout Badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <FaCampground className="text-white text-lg" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <FaFire className="text-white text-lg" />
                </div>
              </div>
            </div>

            {/* Scout Values */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: FaHandsHelping, label: t('scout.profile.values.solidarity') },
                { icon: FaLeaf, label: t('scout.profile.values.nature') },
                { icon: FaStar, label: t('scout.profile.values.excellence') }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                >
                  <value.icon className="text-2xl mb-2 mx-auto text-blue-600 dark:text-blue-400" />
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {value.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Totem & Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Totem Badge with Favicon */}
            <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  src="/favicon.png"
                  alt="OEKA Logo"
                  className="w-6 h-6"
                />
              </div>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                OEKA Mikofo
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('scout.profile.title')}
            </h2>
            
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{t('scout.profile.totem.description')}</p>
              <p>{t('scout.profile.journey.description')}</p>
              <p>{t('scout.profile.values.description')}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}