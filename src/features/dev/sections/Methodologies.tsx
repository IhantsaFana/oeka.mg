import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { FaCodeBranch, FaMobile, FaServer, FaShieldAlt, FaTools } from 'react-icons/fa';

const methodologies = [
  {
    id: 1,
    title: 'Développement Agile',
    description: 'Méthodologies Agile/Scrum pour un développement itératif et collaboratif.',
    icon: <FaCodeBranch className="w-6 h-6 text-purple-500" />,
    practices: ['Sprints', 'Daily Stand-ups', 'Rétrospectives', 'User Stories']
  },
  {
    id: 2,
    title: 'Développement Mobile',
    description: 'Conception responsive avec approche Mobile First pour une expérience utilisateur optimale.',
    icon: <FaMobile className="w-6 h-6 text-blue-500" />,
    practices: ['Design Responsive', 'PWA', 'Performance Mobile', 'Touch-friendly UI']
  },
  {
    id: 3,
    title: 'Architecture Moderne',
    description: 'Conception d\'architectures évolutives et maintenables.',
    icon: <FaServer className="w-6 h-6 text-green-500" />,
    practices: ['Microservices', 'API REST/GraphQL', 'Serverless', 'JAMstack']
  },
  {
    id: 4,
    title: 'Sécurité & Qualité',
    description: 'Intégration de bonnes pratiques de sécurité et d\'assurance qualité.',
    icon: <FaShieldAlt className="w-6 h-6 text-yellow-500" />,
    practices: ['Tests unitaires', 'Tests d\'intégration', 'OWASP', 'CI/CD']
  },
  {
    id: 5,
    title: 'Outils & DevOps',
    description: 'Mise en place de pipelines d\'intégration et de déploiement continus.',
    icon: <FaTools className="w-6 h-6 text-red-500" />,
    practices: ['Git', 'Docker', 'GitHub Actions', 'Monitoring']
  }
];

export function Methodologies() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('dev.methodologies.title', 'Méthodologies & Bonnes Pratiques')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('dev.methodologies.subtitle', 'Approches et pratiques pour un développement de qualité.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methodologies.map((methodology) => (
            <motion.div
              key={methodology.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-opacity-20 rounded-lg mr-4" style={{ backgroundColor: `${methodology.icon.props.className.includes('text-purple-500') ? 'rgba(168, 85, 247, 0.1)' : methodology.icon.props.className.includes('text-blue-500') ? 'rgba(59, 130, 246, 0.1)' : methodology.icon.props.className.includes('text-green-500') ? 'rgba(34, 197, 94, 0.1)' : methodology.icon.props.className.includes('text-yellow-500') ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)'}` }}>
                  {methodology.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {methodology.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {methodology.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {t('dev.methodologies.practices', 'Pratiques clés')}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {methodology.practices.map((practice, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
