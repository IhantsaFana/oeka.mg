import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';

interface TechLogo {
  name: string;
  logo: string;
  category: string;
}

export function TechLogos() {
  const { t } = useTranslation();
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [autoSelectedIndex, setAutoSelectedIndex] = useState<number>(-1);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);

  const technologies: TechLogo[] = [
    { name: 'React', logo: '/skills/react-2.svg', category: 'Frontend' },
    { name: 'React Native', logo: '/skills/react-native-1.svg', category: 'Mobile' },
    { name: 'Flutter', logo: '/skills/flutter-logo.svg', category: 'Mobile' },
    { name: 'Python', logo: '/skills/python-5.svg', category: 'Backend' },
    { name: 'Django', logo: '/skills/django-logo-positive.svg', category: 'Backend' },
    { name: 'Tailwind CSS', logo: '/skills/tailwind-css-2.svg', category: 'Frontend' },
    { name: 'Vite', logo: '/skills/vitejs.svg', category: 'Tools' },
  ];

  // Système de sélection automatique toutes les 3 secondes
  useEffect(() => {
    if (!isUserHovering) {
      // Délai initial de 3 secondes avant de commencer
      const initialTimeout = setTimeout(() => {
        setAutoSelectedIndex(0); // Commencer par le premier logo
      }, 3000);

      // Intervalle pour continuer la rotation
      const interval = setInterval(() => {
        setAutoSelectedIndex((prevIndex) =>
          (prevIndex + 1) % technologies.length
        );
      }, 3000); // 3 secondes entre chaque sélection

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      };
    }
  }, [isUserHovering, technologies.length]);

  // Gérer le hover utilisateur
  const handleMouseEnter = (techName: string) => {
    setIsUserHovering(true);
    setHoveredTech(techName);
  };

  const handleMouseLeave = () => {
    setIsUserHovering(false);
    setHoveredTech(null);
  };

  return (
    <section id="tech-logos" className="py-20">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('about.technologies.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            {t('about.technologies.subtitle')}
          </p>
        </motion.div>

        {/* Design 1: Floating Stars Layout (Desktop) + Grid (Mobile) */}
        <div className="relative">
          {/* Mobile & Tablet: Grid Layout */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:hidden gap-4 sm:gap-6 px-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={`mobile-${tech.name}`}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => handleMouseEnter(tech.name)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {/* Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  {/* Glow effect */}
                  {hoveredTech === tech.name && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse" />
                  )}

                  {/* Logo */}
                  <div className="relative z-10 aspect-square flex items-center justify-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className={`w-full h-full object-contain p-2 ${tech.name === 'Django' ? 'dark:invert' : ''
                        }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Name */}
                  <p className="relative z-10 text-xs font-semibold text-center mt-2 text-gray-900 dark:text-white truncate">
                    {tech.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Floating Stars Layout */}
          <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[32rem] lg:h-[36rem]">
            {technologies.map((tech, index) => {
              // Positions optimisées et responsive
              const positions = [
                { x: 12, y: 20 }, { x: 78, y: 18 }, { x: 18, y: 55 },
                { x: 82, y: 52 }, { x: 45, y: 12 }, { x: 62, y: 68 },
                { x: 32, y: 72 }
              ];

              const position = positions[index] || { x: 50, y: 50 };

              // Déterminer si ce logo est sélectionné
              const isUserHovered = hoveredTech === tech.name;
              const isAutoSelected = !isUserHovering && autoSelectedIndex === index && autoSelectedIndex >= 0;
              const isSelected = isUserHovered || isAutoSelected;

              return (
                <motion.div
                  key={tech.name}
                  className={`absolute ${isSelected ? 'z-30' : 'z-10'}`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.15, zIndex: 30 }}
                  onMouseEnter={() => handleMouseEnter(tech.name)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {/* Container du logo */}
                  <div className="relative group cursor-pointer">
                    {/* Animated rings on selection */}
                    {isSelected && (
                      <>
                        <motion.div
                          className="absolute -inset-8 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-blue-600/20 rounded-full blur-2xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute -inset-4 border-2 border-blue-400/40 rounded-full"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </>
                    )}

                    {/* Logo Circle */}
                    <motion.div
                      className={`relative w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-gray-800 rounded-full p-4 lg:p-5 shadow-xl transition-all duration-300 border-2 ${isSelected
                          ? 'border-blue-400 dark:border-blue-500 shadow-2xl'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      animate={isSelected ? {
                        y: [0, -10, 0],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className={`w-full h-full object-contain ${tech.name === 'Django' ? 'dark:invert' : ''
                          }`}
                        loading="lazy"
                      />

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Enhanced Tooltip */}
                    {isSelected && (
                      <motion.div
                        className="absolute -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-2xl border border-gray-700 dark:border-gray-300">
                          <div className="font-bold text-base">{tech.name}</div>
                          <div className="text-xs opacity-80 mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            {tech.category}
                          </div>
                          {/* Arrow */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 rotate-45 border-r border-b border-gray-700 dark:border-gray-300"></div>
                        </div>
                      </motion.div>
                    )}

                    {/* Category badge (always visible on desktop) */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-full backdrop-blur-sm">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Connecting lines (optional) */}
              <svg className="w-full h-full opacity-10 dark:opacity-5">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                {technologies.map((_, index) => {
                  if (index < technologies.length - 1) {
                    const positions = [
                      { x: 12, y: 20 }, { x: 78, y: 18 }, { x: 18, y: 55 },
                      { x: 82, y: 52 }, { x: 45, y: 12 }, { x: 62, y: 68 },
                      { x: 32, y: 72 }
                    ];
                    const start = positions[index];
                    const end = positions[index + 1];
                    return (
                      <line
                        key={`line-${index}`}
                        x1={`${start.x}%`}
                        y1={`${start.y}%`}
                        x2={`${end.x}%`}
                        y2={`${end.y}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    );
                  }
                  return null;
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Legend / Category indicators */}
        <motion.div
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-3 md:gap-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {Array.from(new Set(technologies.map(t => t.category))).map((category) => (
            <div
              key={category}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 md:px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

