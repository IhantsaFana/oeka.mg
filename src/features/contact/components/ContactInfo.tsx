import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  link: string;
  description: string;
}

export function ContactInfo() {
  const { t } = useTranslation();

  const contactMethods: ContactMethod[] = [
    {
      icon: FaEnvelope,
      label: t('contact.info.email.label'),
      value: 'ihantsarakotondranaivo@gmail.com',
      link: 'mailto:ihantsarakotondranaivo@gmail.com',
      description: t('contact.info.email.description')
    },
    {
      icon: FaLinkedin,
      label: t('contact.info.linkedin.label'),
      value: 'LinkedIn',
      link: 'https://linkedin.com/in/ihantsa',
      description: t('contact.info.linkedin.description')
    },
    {
      icon: FaGithub,
      label: t('contact.info.github.label'),
      value: 'GitHub',
      link: 'https://github.com/IhantsaFana',
      description: t('contact.info.github.description')
    },
    {
      icon: FaPhone,
      label: t('contact.info.phone.label'),
      value: '+261 37 64 375 65',
      link: 'tel:+261384702532',
      description: t('contact.info.phone.description')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('contact.info.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {t('contact.info.subtitle')}
        </p>
      </div>

      {/* Méthodes de contact */}
      <div className="space-y-4">
        {contactMethods.map((method, idx) => (
          <a
            key={idx}
            href={method.link}
            target={method.link.startsWith('http') ? '_blank' : undefined}
            rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="group-hover:scale-110 transition-transform">
                <method.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {method.label}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {method.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {method.description}
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                →
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Disponibilité */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-400">
              {t('contact.availability.status')}
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              {t('contact.availability.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          {t('contact.social.title')}
        </h3>
        <div className="flex gap-4">
          <a
            href="https://twitter.com/IhantsaFana"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/ihantsa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/IhantsaFana"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

