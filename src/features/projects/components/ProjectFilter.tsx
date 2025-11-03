import { useTranslation } from 'react-i18next';
import { categories, technologies } from '../data/projectsData';

interface ProjectFilterProps {
  selectedCategory: string;
  selectedTech: string;
  onCategoryChange: (category: string) => void;
  onTechChange: (tech: string) => void;
}

export function ProjectFilter({ 
  selectedCategory, 
  selectedTech, 
  onCategoryChange, 
  onTechChange 
}: ProjectFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      {/* Filtres par catégorie */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('projects.filters.categories')}
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t(`projects.categories.${category.key}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres par technologie */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('projects.filters.technologies')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => onTechChange(tech)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTech === tech
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="mt-6 text-center">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {t('projects.filters.showing')} • {selectedCategory !== 'all' && `${t(`projects.categories.${selectedCategory}`)} • `}{selectedTech !== 'All' && `${selectedTech}`}
        </span>
      </div>
    </div>
  );
}

