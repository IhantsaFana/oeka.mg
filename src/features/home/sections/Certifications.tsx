import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/Container';

interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

export function Certifications() {
  const { t } = useTranslation();

  const certifications: Certification[] = [
    {
      name: t('about.certifications.informatique.name'),
      issuer: t('about.certifications.informatique.issuer'),
      icon: '/certificates/dev.png'
    },
    {
      name: t('about.certifications.anglais.name'),
      issuer: t('about.certifications.anglais.issuer'),
      icon: '/certificates/anglais.png'
    },
    {
      name: t('about.certifications.francais.name'),
      issuer: t('about.certifications.francais.issuer'),
      icon: '/certificates/francais.png'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-36 sm:mb-32 md:mb-28"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('about.certifications.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.certifications.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative pt-40 pb-8 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Bordure animée en arrière-plan */}
                <div className="absolute inset-0 border-2 border-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ zIndex: 0 }} 
                />

                {/* Image avec z-index plus élevé */}
                <motion.div 
                  className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 h-64 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ zIndex: 2 }}
                >
                  <img 
                    src={cert.icon} 
                    alt={cert.name} 
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Contenu avec z-index pour être au-dessus de la bordure */}
                <div className="relative mt-2 text-center" style={{ zIndex: 1 }}>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 select-text">
                    {cert.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 select-text">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

