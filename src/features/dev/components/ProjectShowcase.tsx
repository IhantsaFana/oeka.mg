import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../data/projects';

// Filtrer uniquement les projets en vedette
const featuredProjects = projectsData.filter(project => project.featured);

// Mapper les données pour correspondre à l'interface attendue
const projects = featuredProjects.map((project, index) => ({
  id: index + 1,
  title: project.title,
  description: project.longDescription,
  image: project.image,
  stack: project.technologies,
  github: project.githubUrl,
  liveDemo: project.liveUrl
}));

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function ProjectShowcase() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const projectIndex = ((page % projects.length) + projects.length) % projects.length;
  const project = projects[projectIndex];

  // Auto-avancement
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [autoPlay, page]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl"
        style={{
          backgroundImage: 'radial-gradient(at 80% 20%, rgba(99, 102, 241, 0.1) 0px, transparent 50%), radial-gradient(at 20% 80%, rgba(59, 130, 246, 0.1) 0px, transparent 50%)'
        }}
      ></div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row items-center p-6 md:p-8">
          {/* Contenu texte à gauche */}
          <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <motion.div
              key={`text-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full flex flex-col justify-center"
            >
              <div className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
                Projet en vedette
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                    onMouseEnter={() => setAutoPlay(false)}
                    onMouseLeave={() => setAutoPlay(true)}
                  >
                    <FaGithub className="mr-2" />
                    Code Source
                  </a>
                )}
                {project.liveDemo && (
                  <a 
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    onMouseEnter={() => setAutoPlay(false)}
                    onMouseLeave={() => setAutoPlay(true)}
                  >
                    Voir en ligne
                    <FaExternalLinkAlt className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Image à droite */}
          <div className="w-full lg:w-1/2 h-64 md:h-80 lg:h-96 relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h4 className="text-xl font-bold">{project.title}</h4>
                    <p className="text-sm opacity-90">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Boutons de navigation */}
            <button 
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg z-10 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Projet précédent"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              <FaArrowLeft />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg z-10 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Projet suivant"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        
        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-2 p-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const direction = index > projectIndex ? 1 : -1;
                setPage([index, direction]);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === projectIndex 
                  ? 'w-8 bg-indigo-600 dark:bg-indigo-500' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Aller au projet ${index + 1}`}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
