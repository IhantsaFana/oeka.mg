import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { 
  FaReact,
  FaCode, 
  FaMobile, 
  FaMicrochip,
  FaTerminal,
  FaPaintBrush,
  FaServer,
  FaStar
} from 'react-icons/fa';

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export function Skills() {
  const { t } = useTranslation();

  const skillCategories: SkillCategory[] = [
    {
      title: t('about.skills.web'),
      description: t('about.skills.webDesc'),
      skills: [
        { name: 'React', level: 95, icon: FaReact },
        { name: 'Next.js', level: 90, icon: FaTerminal },
        { name: 'TypeScript', level: 90, icon: FaCode },
        { name: 'Tailwind CSS', level: 95, icon: FaPaintBrush },
        { name: 'Node.js', level: 85, icon: FaServer },
      ]
    },
    {
      title: t('about.skills.mobile'),
      description: t('about.skills.mobileDesc'),
      skills: [
        { name: 'Flutter', level: 85, icon: FaMobile },
        { name: 'React Native', level: 80, icon: FaMobile },
        { name: 'Dart', level: 85, icon: FaCode },
      ]
    },
    {
      title: t('about.skills.ai'),
      description: t('about.skills.aiDesc'),
      skills: [
        { name: 'Python', level: 90, icon: FaTerminal },
        { name: 'Machine Learning', level: 80, icon: FaMicrochip },
        { name: 'TensorFlow', level: 75, icon: FaMicrochip },
        { name: 'OpenAI API', level: 85, icon: FaStar },
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Container>
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('about.skills.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            {t('about.skills.subtitle')}
          </p>
        </motion.div>

        {/* Skills Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div 
                      key={skillIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + skillIdx * 0.05 }}
                    >
                      {/* Skill Name and Level */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                          <skill.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <span className="truncate">{skill.name}</span>
                        </span>
                        <span className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Modern Progress Bar */}
                      <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 md:h-3 overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.2, 
                            delay: idx * 0.1 + skillIdx * 0.05,
                            ease: "easeOut"
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Optional: Skills Summary Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: t('about.skills.stats.technologies'), value: '15+' },
            { label: t('about.skills.stats.experience'), value: '5+' },
            { label: t('about.skills.stats.projects'), value: '50+' },
            { label: t('about.skills.stats.certifications'), value: '10+' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="text-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

