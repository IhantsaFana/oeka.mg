import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/Container';
// Icons removed as they're not used in the current design

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

export function Timeline() {
  const { t } = useTranslation();

  const experiences: TimelineItem[] = [
    {
      year: 'Mai - Sept 2025',
      title: t('about.timeline.tourmada.title'),
      company: t('about.timeline.tourmada.company'),
      description: t('about.timeline.tourmada.description'),
      technologies: ['Django', 'React', 'Flutter', 'PostgreSQL', 'Gemini API']
    },
    {
      year: '2024',
      title: t('about.timeline.armh.title'),
      company: t('about.timeline.armh.company'),
      description: t('about.timeline.armh.description'),
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'SEO']
    },
    {
      year: 'Mars - Mai 2024',
      title: t('about.timeline.lutherienne.title'),
      company: t('about.timeline.lutherienne.company'),
      description: t('about.timeline.lutherienne.description'),
      technologies: ['Analyse', 'Optimisation', 'Gestion IT']
    },
    {
      year: '2025',
      title: t('about.timeline.hackathon.title'),
      company: t('about.timeline.hackathon.company'),
      description: t('about.timeline.hackathon.description'),
      technologies: ['React', 'Django', 'Gemini API', 'IA']
    }
  ];

  return (
    <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('about.timeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.timeline.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline vertical */}
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>

            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              >
                {/* Point sur la timeline */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Année */}
                    <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-3">
                      {exp.year}
                    </div>

                    {/* Titre et entreprise */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIdx) => (
                        <span 
                          key={techIdx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Container>
  );
}

