import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaStar, FaSearch } from 'react-icons/fa';
import { SEO } from '@/shared/components/ui/SEO';
import { Container } from '@/shared/components/ui/Container';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { ProjectCard } from './components/ProjectCard';
import { ProjectFilter } from './components/ProjectFilter';
import { ProjectModal } from '@/shared/components/ui/ProjectModal';
import { projectsData } from './data/projectsData';
import type { Project } from '@/types/project';

export function Projects() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Filtrer les projets
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const techMatch = selectedTech === 'All' || project.technologies.includes(selectedTech);
      return categoryMatch && techMatch;
    });
  }, [selectedCategory, selectedTech]);

  // Séparer les projets featured
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <>
      <SEO 
        title={t('projects.title')} 
        description={t('projects.seo.description')}
        keywords={t('projects.seo.keywords')}
      />
      <StructuredData type="website" />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('projects.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              {t('projects.subtitle')}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{projectsData.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('projects.stats.total')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{featuredProjects.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('projects.stats.featured')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('projects.stats.technologies')}</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Projets */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <Container>
          {/* Filtres */}
          <ProjectFilter
            selectedCategory={selectedCategory}
            selectedTech={selectedTech}
            onCategoryChange={setSelectedCategory}
            onTechChange={setSelectedTech}
          />

          {/* Projets Featured */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                <FaStar className="w-6 h-6 text-yellow-500" />
                {t('projects.featured')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <ProjectCard project={project} onViewProject={handleViewProject} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Autres Projets */}
          {regularProjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t('projects.other')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (featuredProjects.length + idx) * 0.1 }}
                  >
                    <ProjectCard project={project} onViewProject={handleViewProject} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Aucun résultat */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4 flex justify-center">
                <FaSearch className="w-16 h-16 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('projects.noResults.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('projects.noResults.description')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTech('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t('projects.noResults.reset')}
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Modal de détail du projet */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

