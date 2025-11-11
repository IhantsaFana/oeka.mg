import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { ProjectCard } from '@/features/projects/components/ProjectCard';
import { ProjectModal } from '@/shared/components/ui/ProjectModal';
import { projectsData } from '@/features/projects/data/projectsData';
import { FaStar } from 'react-icons/fa';
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
            <FaStar className="w-8 h-8 text-yellow-500" />
            {t('dev.projects.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('dev.projects.description')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projectsData.map((project, index) => (
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