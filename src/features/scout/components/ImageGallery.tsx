import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Mobile/Tablet: Slider simple */}
      <div className="lg:hidden relative w-full mx-auto px-2 sm:px-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"
            >
              <img
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.placeholder-text')) {
                    const placeholder = document.createElement('div');
                    placeholder.className =
                      'placeholder-text absolute inset-0 flex items-center justify-center text-white text-base sm:text-lg font-semibold';
                    placeholder.textContent = `${alt} ${currentIndex + 1}`;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop: Slider créatif avec cartes empilées */}
      <div className="hidden lg:block relative h-[400px] xl:h-[500px]">
        <AnimatePresence initial={false}>
          {images.map((image, index) => {
            const position = (index - currentIndex + images.length) % images.length;
            const isActive = position === 0;
            const isNext = position === 1;
            const isPrev = position === images.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : isPrev || isNext ? 0.6 : 0,
                  y: isActive ? 0 : isNext ? 30 : isPrev ? -30 : 50,
                  zIndex: isActive ? 30 : isNext ? 20 : isPrev ? 10 : 0,
                  rotateY: isActive ? 0 : isNext ? -15 : isPrev ? 15 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setCurrentIndex(index)}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-blue-700">
                  <img
                    src={image}
                    alt={`${alt} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-text')) {
                        const placeholder = document.createElement('div');
                        placeholder.className =
                          'placeholder-text absolute inset-0 flex items-center justify-center text-white text-2xl font-bold';
                        placeholder.textContent = `${alt} ${index + 1}`;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                  {/* Overlay pour les images non actives */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
