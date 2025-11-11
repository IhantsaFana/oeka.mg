import { useTranslation } from 'react-i18next';
import type { Project } from '@/types/project';
import { FaStar, FaLink, FaCode, FaCalendar, FaArrowRight } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  onViewProject?: (project: Project) => void;
}

export function ProjectCard({ project, onViewProject }: ProjectCardProps) {
  const { t } = useTranslation();

  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      mobile: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      ai: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      fullstack: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    };
    return colors[category as keyof typeof colors] || colors.web;
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge Featured */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <FaStar className="w-4 h-4" />
            {t('projects.featured')}
          </div>
        )}

        {/* Badge Catégorie */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(project.category)}`}>
          {t(`projects.categories.${project.category}`)}
        </div>

        {/* Overlay avec liens */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaLink className="w-4 h-4" />
              {t('projects.viewLive')}
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaCode className="w-4 h-4" />
              {t('projects.viewCode')}
            </a>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Titre */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-sm">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FaCalendar className="w-4 h-4" />
            {project.completedAt}
          </span>
          <button 
            onClick={() => onViewProject?.(project)}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer flex items-center gap-1 transition-all hover:gap-2"
          >
            {t('projects.learnMore')}
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

