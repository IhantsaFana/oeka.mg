import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';

export function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('contact.title')} 
        description={t('contact.seo.description')}
        keywords={t('contact.seo.keywords')}
      />
      <StructuredData type="person" />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              {t('contact.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('contact.intro')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Formulaire de contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t('contact.form.title')}
                </h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.faq.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto px-2 sm:px-0">
            {[1, 2, 3, 4].map((num) => (
              <motion.div
                key={num}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + num * 0.1 }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  {t(`contact.faq.q${num}.question`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  {t(`contact.faq.q${num}.answer`)}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

