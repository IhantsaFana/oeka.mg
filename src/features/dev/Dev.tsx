import { useTranslation } from 'react-i18next';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { motion } from 'framer-motion';
import { TechLogos } from './sections/TechLogos';
import { Projects } from './sections/Projects';
import { Methodologies } from './sections/Methodologies';
import { Certifications } from '@/features/home/sections/Certifications';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Button } from '@/shared/components/ui/Button';

export function Dev() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('dev.seo.title')}
        description={t('dev.seo.description')}
      />
      <StructuredData type="person" />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section id="dev-hero" className="relative py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-30 dark:opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIj48L3JlY3Q+CjxwYXRoIGQ9Ik0tMSwxIEwxMDEsMTAxIE0xMDEsLTEgTC0xLDk5IE05OSwxIEwxLDEwMSBNMSwxIEw5OSw5OSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIj48L3BhdG4+Cjwvc3ZnPg==')]">
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
              {/* Texte à gauche */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t('dev.hero.title', 'Développeur Full Stack')}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t('dev.hero.subtitle', 'Création d\'expériences numériques innovantes avec des technologies modernes')}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 px-4 sm:px-0">
                  <Button
                    href="#contact"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('dev.hero.ctaPrimary', 'Me contacter')}
                  </Button>
                  <Button
                    href="#projects"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {t('dev.hero.ctaSecondary', 'Voir mes projets')}
                  </Button>
                </div>
              </motion.div>

              {/* Animation des projets à droite */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10"
              >
                <ProjectShowcase />
              </motion.div>
            </div>
          </div>

          {/* Dégradé en bas de la section */}
          <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900"></div>
        </section>

        {/* Tech Stack */}
        <TechLogos />

        {/* Projects Section */}
        <div id="projects">
          <Projects />
        </div>

        {/* Methodologies Section */}
        <Methodologies />

        {/* Certifications Section */}
        <Certifications />

        {/* CTA Section */}
        <section id="dev-cta" className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('dev.cta.title', 'Prêt à concrétiser votre projet ?')}
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              {t('dev.cta.subtitle', 'Discutons de la manière dont je peux vous aider à atteindre vos objectifs.')}
            </p>
            <Button
              to="/contact"
              variant="secondary"
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 hover:bg-indigo-50"
            >
              {t('dev.cta.button', 'Discutons de votre projet')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}