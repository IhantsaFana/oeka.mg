import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/Container';
import { FaRocket } from 'react-icons/fa';

export function AboutHero() {
  const { t } = useTranslation();
  
  // Calculer l'expérience dynamiquement (depuis 2023)
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  return (
    <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo professionnelle */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Cercle décoratif */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-2xl opacity-20"></div>
              
              {/* Photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                <img 
                  src="/profile.jpg" 
                  alt="Ihantsa RAKOTONDRANAIVO - Full-Stack Developer & AI Engineer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2">
                <FaRocket className="w-5 h-5" />
                Available
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('about.title')}
            </h1>
            
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                {t('about.intro.paragraph1')}
              </p>
              <p>
                {t('about.intro.paragraph2')}
              </p>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{yearsOfExperience}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('about.stats.experience')}</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">20+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('about.stats.projects')}</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('about.stats.technologies')}</div>
              </div>
            </div>
          </div>
        </div>
    </Container>
  );
}

