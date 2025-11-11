import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container';
import { FaVolleyballBall, FaLaptopCode, FaHiking } from 'react-icons/fa';

export function Introduction() {
  const { t } = useTranslation();

  return (
    <section id="introduction" className="py-12 md:py-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo et Badges */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Cercle décoratif */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-2xl opacity-20"></div>
              
              {/* Photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                <img 
                  src="/profile.jpg" 
                  alt="Ihantsa RAKOTONDRANAIVO"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <FaLaptopCode className="w-5 h-5" />
                </div>
                <div className="bg-green-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <FaHiking className="w-5 h-5" />
                </div>
                <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <FaVolleyballBall className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('home.introduction.title')}
            </h1>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{t('home.introduction.paragraphs.personal')}</p>
              <p>{t('home.introduction.paragraphs.education')}</p>
              <p>{t('home.introduction.paragraphs.interests')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}