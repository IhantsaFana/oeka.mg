import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

type Section = {
  title: string;
  content: string;
};

type ContentItem = {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  author: string;
  intro: string;
  sections: Section[];
  sources: string;
};

type ContentByLang = {
  fr: ContentItem;
  en: ContentItem;
  mg: ContentItem;
};

const LinkInSera = () => {
  const { i18n } = useTranslation();

  const content: ContentByLang = {
    fr: {
      title: "Link'In Sera 2.0",
      subtitle: "Camp de Formation DSF & Mi-Tily Serasera - Tily eto Madagasikara",
      date: "04-07/12/2025",
      location: "Tranombitsika, Madagascar",
      author: "Departemantan'ny Serasera sy Fifandraisana - Tily eto Madagasikara",
      intro:
        "Link'In Sera 2.0 est le grand camp de formation du DSF (Departemantan'ny Serasera sy Fifandraisana) de Tily eto Madagasikara et Mi-Tily Serasera. Plus de 85 jeunes venus de différentes régions se sont retrouvés à Tranombitsika pour apprendre, créer, partager et renforcer leur fraternité.",
      sections: [
        {
          title: "Un Camp qui Rassemble",
          content:
            "Pendant 4 jours, les participants ont vécu une vraie immersion dans le monde de la communication moderne et des nouvelles technologies. Même si beaucoup ne se connaissaient pas, l'ambiance était directe, simple et familiale. On a travaillé ensemble, mangé ensemble, rigolé ensemble... bref, on est repartis soudés comme jamais."
        },
        {
          title: "Les Formations Suivies",
          content:
            "Le camp a proposé plusieurs ateliers pratiques, animés par des formateurs passionnés.\n\n" +
            "**Photographie**: maîtriser les bases, la lumière, la composition.\n" +
            "**Vidéo**: tournage, cadrage, interview, montage.\n" +
            "**Développement & IA**: introduire les outils numériques et l'intelligence artificielle.\n" +
            "**Canva & Design**: créer des visuels modernes et efficaces.\n" +
            "**Presse & Rédaction**: écrire simple, clair et utile.\n" +
            "**Communication**: messages, stratégie, transmission.\n" +
            "**Community Management**: gérer une communauté, publier, animer.\n\n" +
            "Chaque atelier était pensé pour être concret: on ne fait pas que regarder, on pratique."
        },
        {
          title: "Ce que le DSF Retient de Link'In Sera",
          content:
            "Link'In Sera 2.0 n'était pas juste un camp de formation. C'était un moment pour renforcer l'esprit d'équipe, donner confiance aux jeunes et montrer que la communication est un vrai service au mouvement Tily eto Madagasikara.\n\n" +
            "**Plus de compétences**: chacun repart avec des outils concrets.\n" +
            "**Plus de liens**: des amitiés fortes nées pendant le camp.\n" +
            "**Plus de motivation**: un DSF plus soudé, plus actif.\n\n" +
            "L'objectif est simple: former une nouvelle génération capable de porter la voix du mouvement, avec créativité et responsabilité."
        }
      ],
      sources: "Tily eto Madagasikara - Departemanta Serasera sy Fifandraisana"
    },

    en: {
      title: "Link'In Sera 2.0",
      subtitle: "DSF & Mi-Tily Serasera Training Camp - Tily eto Madagasikara",
      date: "04-07/12/2025",
      location: "Tranombitsika, Madagascar",
      author: "Communication Department - Tily eto Madagasikara",
      intro:
        "Link'In Sera 2.0 is the official training camp of the DSF (Communication & Relations Department) and Mi-Tily Serasera of Tily eto Madagasikara. More than 85 participants from different regions gathered at Tranombitsika to learn, create, and build stronger bonds.",
      sections: [
        {
          title: "A Camp that Connects People",
          content:
            "For 4 days, participants lived a full immersion into modern communication and digital creativity. Even if many did not know each other at first, everyone quickly connected. We worked, shared meals, created projects, laughed... and left the camp as one big family."
        },
        {
          title: "Training Workshops",
          content:
            "Several hands-on workshops were offered during the camp:\n\n" +
            "**Photography**: basics, lighting, composition.\n" +
            "**Videography**: shooting, framing, interviewing, editing.\n" +
            "**Development & AI**: digital tools and artificial intelligence introduction.\n" +
            "**Canva & Design**: building modern and clean visual content.\n" +
            "**Press & Writing**: simple and effective communication.\n" +
            "**Communication Strategy**: messages, clarity, purpose.\n" +
            "**Community Management**: running and animating online communities.\n\n" +
            "Everything was practical, straight to the point, and usable right away."
        },
        {
          title: "What the DSF Takes Away",
          content:
            "Link'In Sera 2.0 was more than training. It strengthened teamwork, boosted confidence and helped young people understand their role in the movement.\n\n" +
            "**More skills**: real tools for daily communication.\n" +
            "**More unity**: strong friendships built during the camp.\n" +
            "**More motivation**: a more active and connected DSF.\n\n" +
            "The goal is clear: raise a new generation ready to carry the message of Tily eto Madagasikara."
        }
      ],
      sources: "Tily eto Madagasikara - Communication Department"
    },

    mg: {
      title: "Link'In Sera 2.0",
      subtitle: "Lasy fampivondronana ny ekipa DSF & Mi-Tily Serasera- Tily eto Madagasikara",
      date: "04-07/12/2025",
      location: "Tranombitsika, Madagasikara",
      author: "Departemantan'ny Serasera sy Fifandraisana",
      intro:
        "Link'In Sera 2.0 dia lasy fanofanana ho an'ny DSF sy Mi-Tily Serasera ao amin'ny Tily eto Madagasikara. Mpandray anjara mihoatra ny 85 avy amin'ny faritra maro no nivory tao Tranombitsika hianatra, hamorona ary hanamafy ny firaisankina.",
      sections: [
        {
          title: "Lasy mampiray",
          content:
            "Nandritra ny 4 andro, niaina tontolo iray feno momba ny serasera sy ny teknolojia maoderina ny mpandray anjara. Na maro aza no tsy mbola nifankahita, dia nivady vetivety. Niara-nianatra, niara-nisakafo, nihomehy... ary nody toy ny fianakaviana iray."
        },
        {
          title: "Atrikasa natao",
          content:
            "Nisy atrikasa maro natolotra:\n\n" +
            "**Sary**: fototra, jiro, famoronana.\n" +
            "**Lahatsary**: fakana sary, cadrage, interview, montage.\n" +
            "**Développement & AI**: fitaovana nomerika sy faharanitan-tsaina.\n" +
            "**Canva & Design**: famoronana sary sy afisy.\n" +
            "**Gazety sy soratra**: fanoratana mazava sy mora.\n" +
            "**Serasera**: hafatra, paikady.\n" +
            "**Community Management**: fitantanana vondrom-piarahamonina an-tserasera.\n\n" +
            "Tsy teôria fotsiny fa tena asa."
        },
        {
          title: "Zavatra nentin'ny DSF",
          content:
            "Tsy fanofanana fotsiny i Link'In Sera 2.0. Nanamafy ny ekipan'ny DSF izy, nanome hery ny tanora ary nampiseho fa asa tena misy lanjany ny serasera ao amin'ny Tily.\n\n" +
            "**Fahaiza-manao**: fitaovana azo ampiasaina avy hatrany.\n" +
            "**Firaisankina**: namana vaovao, fifankatiavana.\n" +
            "**Hery vaovao**: DSF mavitrika kokoa.\n\n" +
            "Tanjona: tanora mahay mandray andraikitra sy mampiakatra avo ny feon'ny Tily eto Madagasikara."
        }
      ],
      sources: "Tily eto Madagasikara - DSF"
    }
  };

  // Type-safe language key
  const lang = i18n.language as keyof ContentByLang;
  const currentContent = content[lang] || content.fr;

  return (
    <article className="py-12 md:py-16 lg:py-20">
      <Container>
        {/* HEADER */}
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

        {/* IMAGE 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <img
            src="/scout/gallerie/linksera-1.jpg"
            className="rounded-2xl shadow-xl"
          />
        </motion.div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto">
          {currentContent.sections.map((section: Section, index: number) => (
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
                {section.content.split('\n\n').map((p: string, i: number) => (
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

        {/* IMAGE 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <img
            src="/scout/gallerie/linksera-2.jpg"
            className="rounded-2xl shadow-xl"
          />
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
