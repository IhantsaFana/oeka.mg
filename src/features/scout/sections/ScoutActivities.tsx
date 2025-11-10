import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { ActivityCard } from '../components/ActivityCard';

const activities = [
  {
    title: 'scout.activities.camping.title',
    description: 'scout.activities.camping.description',
    icon: 'FaCampground',
  },
  {
    title: 'scout.activities.hiking.title',
    description: 'scout.activities.hiking.description',
    icon: 'FaHiking',
  },
  {
    title: 'scout.activities.leadership.title',
    description: 'scout.activities.leadership.description',
    icon: 'FaUsers',
  },
  {
    title: 'scout.activities.games.title',
    description: 'scout.activities.games.description',
    icon: 'FaGamepad',
  },
  {
    title: 'scout.activities.nature.title',
    description: 'scout.activities.nature.description',
    icon: 'FaLeaf',
  },
  {
    title: 'scout.activities.community.title',
    description: 'scout.activities.community.description',
    icon: 'FaHandsHelping',
  },
];

export function ScoutActivities() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-gray-50 dark:bg-gray-900">
      <Container>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-block px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              {t('scout.activities.title')}
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-5 md:mt-6 px-4">
            {t('scout.activities.subtitle')}
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={t(activity.title)}
              description={t(activity.description)}
              icon={activity.icon}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
