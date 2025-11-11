import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { CurvedLines } from '@/shared/components/ui/CurvedLines';
import { FaHandsHelping, FaLeaf, FaStar } from 'react-icons/fa';

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
          {/* Left: Creative Image Layout */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Profile Circle */}
            <div className="relative">
              {/* Large Profile Circle */}
              <div className="w-80 h-80 mx-auto relative">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 bg-gradient-to-br from-blue-500 to-blue-700">
                  <img
                    src="/scout/profile-scout.jpg"
                    alt="OEKA Mikofo en tenue scout"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-profile')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder-profile absolute inset-0 flex flex-col items-center justify-center text-white text-center';
                        placeholder.innerHTML = `
                          <div class="text-6xl mb-4">🦅</div>
                          <div class="text-xl font-bold">OEKA Mikofo</div>
                          <div class="text-sm opacity-90">Chef Scout</div>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>

                {/* Orbiting Activity Images */}
                {couaImages.slice(0, 4).map((_, index) => {
                  const angle = (index * 90) - 45; // -45, 45, 135, 225 degrees
                  const radius = 140; // Distance from center
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white dark:border-gray-600"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        y: [0, -10, 0]
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.5 + index * 0.2,
                        y: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${index}-${Math.floor(currentImageIndex / 2)}`}
                            src={couaImages[(currentImageIndex + index) % couaImages.length]}
                            alt={`OEKA Activité ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.placeholder-activity')) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'placeholder-activity absolute inset-0 flex items-center justify-center text-white text-2xl';
                                placeholder.textContent = '🏕️';
                                parent.appendChild(placeholder);
                              }
                            }}
                          />
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                  {[0, 1, 2, 3].map((index) => {
                    const angle = (index * 90) - 45;
                    const startRadius = 160;
                    const endRadius = 120;
                    const startX = 160 + Math.cos((angle * Math.PI) / 180) * startRadius;
                    const startY = 160 + Math.sin((angle * Math.PI) / 180) * startRadius;
                    const endX = 160 + Math.cos((angle * Math.PI) / 180) * endRadius;
                    const endY = 160 + Math.sin((angle * Math.PI) / 180) * endRadius;
                    
                    return (
                      <motion.line
                        key={index}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="text-blue-400 dark:text-blue-300 opacity-30"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                      />
                    );
                  })}
                </svg>
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
            
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              <p>{t('scout.profile.totem.description')}</p>
              <p>{t('scout.profile.journey.description')}</p>
              <p>{t('scout.profile.values.description')}</p>
            </div>
          </motion.div>
        </div>

        {/* Explication du Totem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          {/* OEKA - L'animal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                OEKA - {t('scout.profile.totem.animal.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {t('scout.profile.totem.animal.description')}
            </p>
          </div>

          {/* MIKOFO - Le caractère */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                MIKOFO - {t('scout.profile.totem.character.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {t('scout.profile.totem.character.description')}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}