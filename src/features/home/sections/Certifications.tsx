import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/Container';
import { CurvedLines } from '@/shared/components/ui/CurvedLines';

interface Certification {
  name: string;
  issuer: string;
  icon: string;
  color: string;
}

export function Certifications() {
  const { t } = useTranslation();

  const certifications: Certification[] = [
    {
      name: t('about.certifications.informatique.name'),
      issuer: t('about.certifications.informatique.issuer'),
      icon: '/certificates/esmia.png',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      name: t('about.certifications.anglais.name'),
      issuer: t('about.certifications.anglais.issuer'),
      icon: '/certificates/fltc.png',
      color: 'from-purple-500 to-pink-400'
    },
    {
      name: t('about.certifications.francais.name'),
      issuer: t('about.certifications.francais.issuer'),
      icon: '/certificates/fltc.png',
      color: 'from-amber-400 to-orange-500'
    }
  ];

  return (
    <section id="certifications" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <CurvedLines
        position="top"
        height="sm"
        opacity="light"
        color="green"
        curvature="medium"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-900/30 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            {t('about.certifications.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('about.certifications.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container with Glassmorphism */}
              <div className="relative h-full bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 pt-16 shadow-xl border border-white/20 dark:border-gray-700/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl overflow-visible">

                {/* Gradient Border Effect on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Floating Icon Container */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center p-4 border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform duration-500">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} opacity-10`} />
                    <img
                      src={cert.icon}
                      alt={cert.name}
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-8 text-center relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <div className="h-1 w-12 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4 group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
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
