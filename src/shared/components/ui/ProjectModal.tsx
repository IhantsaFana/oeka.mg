import { useTranslation } from 'react-i18next';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaCalendar, FaTag } from 'react-icons/fa';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Fermer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <FaCalendar className="w-4 h-4" />
              {project.completedAt}
            </div>
            <div className="flex items-center gap-1">
              <FaTag className="w-4 h-4" />
              {t(`projects.categories.${project.category}`)}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('projects.modal.description')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Challenge */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('projects.modal.challenge')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('projects.modal.solution')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('projects.modal.technologies')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                {t('projects.viewLive')}
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                {t('projects.viewCode')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

