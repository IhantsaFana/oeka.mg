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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <Container>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('scout.activities.title')}
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {t('scout.activities.subtitle')}
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
