import { motion } from 'framer-motion';
import { FaCampground, FaHiking, FaUsers, FaGamepad, FaPaintBrush, FaLeaf, FaHandsHelping, FaTools, FaMountain } from 'react-icons/fa';

interface ActivityCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaCampground,
  FaHiking,
  FaUsers,
  FaGamepad,
  FaPaintBrush,
  FaLeaf,
  FaHandsHelping,
  FaTools,
  FaMountain,
};

export function ActivityCard({ title, description, icon, index }: ActivityCardProps) {
  const IconComponent = iconMap[icon] || FaCampground;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:scale-105"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
