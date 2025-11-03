import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/Container';
import { 
  FaCamera, 
  FaMusic, 
  FaGlobe, 
  FaBook, 
  FaPuzzlePiece,
  FaCode 
} from 'react-icons/fa';

interface Hobby {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Hobbies() {
  const { t } = useTranslation();

  const hobbies: Hobby[] = [
    {
      name: t('about.hobbies.coding.name'),
      description: t('about.hobbies.coding.description'),
      icon: FaCode
    },
    {
      name: t('about.hobbies.photography.name'),
      description: t('about.hobbies.photography.description'),
      icon: FaCamera
    },
    {
      name: t('about.hobbies.music.name'),
      description: t('about.hobbies.music.description'),
      icon: FaMusic
    },
    {
      name: t('about.hobbies.travel.name'),
      description: t('about.hobbies.travel.description'),
      icon: FaGlobe
    },
    {
      name: t('about.hobbies.reading.name'),
      description: t('about.hobbies.reading.description'),
      icon: FaBook
    },
    {
      name: t('about.hobbies.gaming.name'),
      description: t('about.hobbies.gaming.description'),
      icon: FaPuzzlePiece
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('about.hobbies.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.hobbies.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, idx) => (
            <div 
              key={idx}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Icône */}
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <hobby.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>

              {/* Nom */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {hobby.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {hobby.description}
              </p>
            </div>
          ))}
        </div>

        {/* Citation personnelle */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 italic max-w-4xl mx-auto">
            "{t('about.quote')}"
          </blockquote>
          <cite className="block mt-4 text-blue-600 dark:text-blue-400 font-semibold">
            - Ihantsa RAKOTONDRANAIVO
          </cite>
        </div>
      </Container>
    </section>
  );
}

