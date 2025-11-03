import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { Button } from '@/shared/components/ui/Button';
import { ProjectCard } from '@/features/projects/components/ProjectCard';
import { ProjectModal } from '@/shared/components/ui/ProjectModal';
import { projectsData } from '@/features/projects/data/projectsData';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import type { Project } from '@/types/project';

export function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
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
  
  // Afficher seulement 3 projets sur la homepage
  const featuredProjects = useMemo(() => {
    return projectsData.slice(0, 3);
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <FaStar className="w-8 h-8 text-yellow-500" />
          {t('projects.featured')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('projects.subtitle')}
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} onViewProject={handleViewProject} />
          </motion.div>
        ))}
      </div>

      {/* CTA to see all projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button
          to={`/${currentLang}/projects`}
          variant="primary"
          size="lg"
          className="inline-flex items-center gap-2"
        >
          {t('projects.viewProject')}
          <FaArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Modal de détail du projet */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
}

