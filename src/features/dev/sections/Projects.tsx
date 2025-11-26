import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { ProjectCard } from '@/features/projects/components/ProjectCard';
import { ProjectModal } from '@/shared/components/ui/ProjectModal';
import { Button } from '@/shared/components/ui/Button';
import { projectsData } from '@/features/projects/data/projectsData';
import type { Project } from '@/types/project';

export function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Afficher seulement les 3 premiers projets
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center gap-2">
            {t('dev.projects.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('dev.projects.description')}
          </p>
        </motion.div>

        {/* Projects Grid - 3 premiers projets */}
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

        {/* Bouton Voir tous les projets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            to="/projects"
            variant="primary"
            size="lg"
            className="shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            {t('dev.projects.viewAll', 'Voir tous les projets')}
          </Button>
        </motion.div>

        {/* Modal de détail du projet */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />
      </Container>
    </section>
  );
}