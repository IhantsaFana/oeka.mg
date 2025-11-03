import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/Container';
import { 
  FaGraduationCap,
  FaLanguage,
  FaCheckCircle
} from 'react-icons/fa';

interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
}

export function Certifications() {
  const { t } = useTranslation();

  const certifications: Certification[] = [
    {
      name: t('about.certifications.informatique.name'),
      issuer: t('about.certifications.informatique.issuer'),
      year: '2025',
      icon: FaGraduationCap,
      link: '#'
    },
    {
      name: t('about.certifications.anglais.name'),
      issuer: t('about.certifications.anglais.issuer'),
      year: '2024',
      icon: FaLanguage,
      link: '#'
    },
    {
      name: t('about.certifications.francais.name'),
      issuer: t('about.certifications.francais.issuer'),
      year: '2022',
      icon: FaLanguage,
      link: '#'
    }
  ];

  return (
    <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('about.certifications.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.certifications.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <div 
              key={idx}
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Icône */}
              <div className="mb-4 group-hover:scale-110 transition-transform flex justify-center">
                <cert.icon className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>

              {/* Nom certification */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {cert.name}
              </h3>

              {/* Organisme */}
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                {cert.issuer}
              </p>

              {/* Année */}
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                {cert.year}
              </div>

              {/* Badge vérifié */}
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                  <FaCheckCircle className="w-4 h-4" />
                  {t('about.certifications.verified')}
                </span>
              </div>
            </div>
          ))}
        </div>
    </Container>
  );
}

