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
      {/* Mobile/Tablet: Slider */}
      <div className="lg:hidden relative w-full max-w-lg mx-auto">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
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
                      'placeholder-text absolute inset-0 flex items-center justify-center text-white text-lg font-semibold';
                    placeholder.textContent = `${alt} ${currentIndex + 1}`;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 dark:bg-blue-400 w-8'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Images empilées */}
      <div className="hidden lg:block space-y-3">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <div className="aspect-[4/3] relative bg-gradient-to-br from-blue-500 to-blue-700">
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
                      'placeholder-text absolute inset-0 flex items-center justify-center text-white text-lg font-semibold';
                    placeholder.textContent = `${alt} ${index + 1}`;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
