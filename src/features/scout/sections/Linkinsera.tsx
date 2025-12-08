import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const LinkInSera = () => {
  const { i18n } = useTranslation();

  const content = {
    fr: {
      title: "Link'In Sera 2.0",
      subtitle: "Camp de Formation DSF - Tily eto Madagasikara",
      date: "7 - 10 Novembre 2024",
      location: "Tranombitsika, Madagascar",
      author:
        "Departemantan'ny Serasera sy Fifandraisana - Tily eto Madagasikara",
      intro:
        "Link'In Sera 2.0 est le grand camp de formation du DSF (Departemantan'ny Serasera sy Fifandraisana). Plus de 85 jeunes se sont retrouvés pour apprendre et créer.",
      sections: [
        {
          title: "Un Camp qui Rassemble",
          content:
            "Pendant 4 jours, immersion totale dans la communication moderne. Même sans se connaître, tout le monde s'est vite connecté. Travail, repas, rires... une vraie famille."
        },
        {
          title: "Les Formations Suivies",
          content:
            "**Photographie**, **Vidéo**, **Développement & IA**, **Design**, **Presse**, **Communication**, **Community Management**... Tout était pratique, appliqué, utile."
        },
        {
          title: "Ce que le DSF Retient",
          content:
            "**Compétences concrètes**, **liens plus forts**, **motivation renouvelée**. Une nouvelle génération prête à porter la voix du mouvement."
        }
      ],
      sources: "Tily eto Madagasikara - DSF"
    },

    en: {
      title: "Link'In Sera 2.0",
      subtitle: "DSF Training Camp",
      date: "7 - 10 November 2024",
      location: "Tranombitsika, Madagascar",
      author: "Communication Department",
      intro:
        "Link'In Sera 2.0 is the official DSF training camp. Over 85 youth gathered to learn and create.",
      sections: [
        {
          title: "A Camp That Connects",
          content:
            "For 4 days, participants immersed themselves in communication and digital tools. People connected fast and worked as one."
        },
        {
          title: "Workshops",
          content:
            "Photography, video, AI, design, writing, communication strategy, community management."
        },
        {
          title: "What DSF Takes Away",
          content:
            "More skills, stronger unity, and new motivation to carry the movement's message."
        }
      ],
      sources: "Tily eto Madagasikara - Communication Department"
    },

    mg: {
      title: "Link'In Sera 2.0",
      subtitle: "Toby Fanofanana DSF",
      date: "7 - 10 Novambra 2024",
      location: "Tranombitsika",
      author: "DSF - Serasera sy Fifandraisana",
      intro:
        "Link'In Sera 2.0 dia toby fanofanana lehibe. Mpandray anjara mihoatra ny 85 avy amin'ny faritra maro.",
      sections: [
        {
          title: "Toby Mampiray",
          content:
            "Nandritra ny 4 andro, niara-nianatra sy niara-nanao asa. Nifankahazo haingana ny rehetra."
        },
        {
          title: "Atrikasa",
          content:
            "Sary, lahatsary, AI, design, soratra, paikady serasera, community management."
        },
        {
          title: "Nentin'ny DSF",
          content:
            "Fahaiza-manao, firaisankina, hery vaovao ho an'ny hetsika."
        }
      ],
      sources: "Tily eto Madagasikara - DSF"
    }
  };

  const currentContent = content[i18n.language] || content.fr;

  return (
    <article className="py-12 md:py-16 lg:py-20">
      <Container>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-600" />
              <span>{currentContent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600" />
              <span>{currentContent.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-red-600" />
              <span>{currentContent.author}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {currentContent.subtitle}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 border-l-4 border-red-600 pl-4 italic">
            {currentContent.intro}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <img src="/scout/gallerie/3.jpg" className="rounded-2xl shadow-xl" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {currentContent.sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none">
                {section.content.split('\n\n').map((p, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <img src="/scout/gallerie/8.jpg" className="rounded-2xl shadow-xl" />
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 pt-8 border-t dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400"
        >
          {currentContent.sources}
        </motion.footer>
      </Container>
    </article>
  );
};

export default LinkInSera;
