import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const SampanaMena90 = () => {
  const { t, i18n } = useTranslation();

  const content = {
    fr: {
      title: "90 Ans de Sampana Mena",
      subtitle: "Mpiandalana - Les Routiers de Tily eto Madagasikara",
      date: "1936 - 2026",
      location: "Madagascar",
      author: "Tily eto Madagasikara",
      intro: "La branche Sampana Mena (Routiers/Mpiandalana) célèbre ses 90 ans d'existence au sein de Tily eto Madagasikara, le mouvement scout protestant de Madagascar.",
      sections: [
        {
          title: "Une Histoire Riche",
          content: "La branche Sampana Mena (Routiers/Mpiandalana) a été établie en 1936 au sein de Tily eto Madagasikara, le mouvement scout protestant de Madagascar. Cette création fait suite à la rencontre entre G.E. Burton, envoyé par la London Missionary Society (L.M.S.) pour travailler à Madagascar, et le Commissaire National Guérin Desjardins des Éclaireurs Unionistes de France à Paris.\n\nInitialement formée au Foyer Chrétien des Jeunes Gens d'Amparibe avec l'aide des responsables Henri Ravoajanahary et Bernard Ranaivo, la section s'est ensuite étendue en 1942 à l'école LMS d'Ambatonakanga sous la direction de G.E. Burton. Le mouvement s'est par la suite développé dans d'autres écoles et régions, notamment à Ambohijatovo Avaratra, Paul Minault, Ambohijatovo Atsimo, Diégo Suarez, Miarinarivo et Fianarantsoa."
        },
        {
          title: "Les Valeurs Fondamentales",
          content: "Aujourd'hui, Sampana Mena continue de former des jeunes hommes âgés de 17 à 19 ans selon les principes du scoutisme et les valeurs chrétiennes unionistes. Les Mpiandalana sont organisés en 'Fokonolona' (clans) de 3 à 6 membres, dirigés par un 'Loholona' (chef de clan).\n\nL'éducation au sein de Sampana Mena se fonde sur le devoir envers Dieu, le service aux autres, la responsabilité personnelle et le respect de la nature."
        },
        {
          title: "Réalisations Marquantes",
          content: "**Centenaire de Tily eto Madagasikara (2024)** : Lors de la célébration du 100ème anniversaire de Tily eto Madagasikara en août 2024, les Mpiandalana ont contribué au développement communautaire en construisant un réservoir d'eau pour un centre de santé de base et un système de gestion des déchets pour une école primaire publique à Fihaonana.\n\n**Intervention lors des Inondations (1959)** : Les scouts malagasy, dont Tily eto Madagasikara, ont reçu une décoration du Président de la République Philibert Tsiranana pour avoir sauvé de nombreuses vies lors des graves inondations de mars 1959.\n\n**Reconnaissance Internationale (1959)** : Tily eto Madagasikara a intégré l'Organisation Mondiale du Mouvement Scout avec la Fédération du Scoutisme Malagasy en 1959."
        }
      ],
      sources: "Sources : Wikipedia - Tily eto Madagasikara, Scout.mg, Wikitia, Scribd, NewsMada"
    },
    en: {
      title: "90 Years of Sampana Mena",
      subtitle: "Mpiandalana - The Rovers of Tily eto Madagasikara",
      date: "1936 - 2026",
      location: "Madagascar",
      author: "Tily eto Madagasikara",
      intro: "The Sampana Mena branch (Rovers/Mpiandalana) celebrates its 90 years of existence within Tily eto Madagasikara, the Protestant scout movement of Madagascar.",
      sections: [
        {
          title: "A Rich History",
          content: "The Sampana Mena branch (Rovers/Mpiandalana) was established in 1936 within Tily eto Madagasikara, the Protestant scout movement of Madagascar. This creation followed a meeting between G.E. Burton, sent by the London Missionary Society (L.M.S.) to work in Madagascar, and National Commissioner Guérin Desjardins of the Éclaireurs Unionistes de France in Paris.\n\nInitially formed at the Foyer Chrétien des Jeunes Gens in Amparibe with the help of leaders Henri Ravoajanahary and Bernard Ranaivo, the section later expanded in 1942 to the LMS school in Ambatonakanga under the direction of G.E. Burton. The movement subsequently developed in other schools and regions, including Ambohijatovo Avaratra, Paul Minault, Ambohijatovo Atsimo, Diégo Suarez, Miarinarivo, and Fianarantsoa."
        },
        {
          title: "Core Values",
          content: "Today, Sampana Mena continues to train young men aged 17 to 19 according to scouting principles and Unionist Christian values. The Mpiandalana are organized into 'Fokonolona' (clans) of 3 to 6 members, led by a 'Loholona' (clan leader).\n\nEducation within Sampana Mena is based on duty to God, service to others, personal responsibility and respect for nature."
        },
        {
          title: "Notable Achievements",
          content: "**Tily eto Madagasikara Centenary (2024)**: During the celebration of Tily eto Madagasikara's 100th anniversary in August 2024, the Mpiandalana contributed to community development by building a water tank for a basic health center and a waste management system for a public primary school in Fihaonana.\n\n**Flood Relief Intervention (1959)**: Malagasy scouts, including Tily eto Madagasikara, received a decoration from President Philibert Tsiranana for saving many lives during the severe floods of March 1959.\n\n**International Recognition (1959)**: Tily eto Madagasikara joined the World Organization of the Scout Movement with the Federation of Malagasy Scouting in 1959."
        }
      ],
      sources: "Sources: Wikipedia - Tily eto Madagasikara, Scout.mg, Wikitia, Scribd, NewsMada"
    },
    mg: {
      title: "90 Taona Sampana Mena",
      subtitle: "Mpiandalana Sampana Mena - Tily Eto Madagasikara",
      date: "1936 - 2026",
      location: "Madagasikara",
      author: "Tily eto Madagasikara",
      intro: "Ny sampana Sampana Mena (Routiers/Mpiandalana) dia mankalaza ny faha-90 taonany tao anatin'ny Tily eto Madagasikara, hetsika skoto protestanta eto Madagasikara.",
      sections: [
        {
          title: "Tantara Manan-danja",
          content: "Ny sampana Sampana Mena (Routiers/Mpiandalana) dia naorina tamin'ny 1936 tao anatin'ny Tily eto Madagasikara, hetsika skoto protestanta eto Madagasikara. Io fananganana io dia tonga taorian'ny fihaonana teo amin'i G.E. Burton, nalefan'ny London Missionary Society (L.M.S.) hiasa eto Madagasikara, sy ny Kaomisera Nasionaly Guérin Desjardins avy amin'ny Éclaireurs Unionistes de France tany Paris.\n\nVoaforona tany amin'ny Foyer Chrétien des Jeunes Gens any Amparibe tamin'ny fanampian'ireo mpitarika Henri Ravoajanahary sy Bernard Ranaivo izy io, ary nitatra tany amin'ny sekoly LMS Ambatonakanga tamin'ny 1942 teo ambany fitarihan'i G.E. Burton. Nivelatra tany amin'ny sekoly sy faritra hafa avy eo ny hetsika, toy ny Ambohijatovo Avaratra, Paul Minault, Ambohijatovo Atsimo, Diégo Suarez, Miarinarivo ary Fianarantsoa."
        },
        {
          title: "Soatoavina Fototra",
          content: "Ankehitriny, ny Sampana Mena dia mbola manohy ny fampiofanana tovolahy 17 ka hatramin'ny 19 taona araka ny fitsipiky ny skotisma sy ny soatoavina kristiana unionista. Ny Mpiandalana dia voalamina ho 'Fokonolona' (foko) misy mpikambana 3 ka hatramin'ny 6, tarihin'ny 'Loholona' (lehiben'ny foko).\n\nNy fanabeazana ao amin'ny Sampana Mena dia mifototra amin'ny adidy amin'Andriamanitra, ny fanompoana ny hafa, ny andraikitra manokana ary ny fanajana ny tontolo iainana."
        },
        {
          title: "Zava-bita Lehibe",
          content: "**Faha-100 taonan'ny Tily eto Madagasikara (2024)**: Nandritra ny fankalazana ny faha-100 taonan'ny Tily eto Madagasikara tamin'ny Aogositra 2024, ny Mpiandalana dia nandray anjara tamin'ny fampandrosoana ny fiaraha-monina tamin'ny fananganana fitahirizana rano ho an'ny tobim-pahasalamana fototra sy rafitra fitantanana fako ho an'ny sekoly ambaratonga voalohany any Fihaonana.\n\n**Fitsinjovana nandritra ny Tondra-drano (1959)**: Nahazo mari-boninahitra avy amin'ny Filohan'ny Repoblika Philibert Tsiranana ny skoto malagasy, anisan'izany ny Tily eto Madagasikara, noho ny famonjena aina maro nandritra ny tondra-drano lehibe tamin'ny Martsa 1959.\n\n**Fanekena Iraisam-pirenena (1959)**: Niditra tao amin'ny Fikambanana Maneran-tany ho an'ny Hetsika Skoto niaraka tamin'ny Federasiona Skoto Malagasy ny Tily eto Madagasikara tamin'ny 1959."
        }
      ],
      sources: "Loharano: Wikipedia - Tily eto Madagasikara, Scout.mg, Wikitia, Scribd, NewsMada"
    }
  };

  const currentContent = content[i18n.language as keyof typeof content] || content.fr;

  return (
    <article className="py-12 md:py-16 lg:py-20">
      <Container>
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-600 dark:text-red-400" />
              <span>{currentContent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600 dark:text-red-400" />
              <span>{currentContent.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-red-600 dark:text-red-400" />
              <span>{currentContent.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {currentContent.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            {currentContent.subtitle}
          </p>

          {/* Intro */}
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-red-600 pl-4 italic">
            {currentContent.intro}
          </p>
        </motion.header>

        {/* Featured Image 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/scout/gallerie/3.jpg"
              alt="Sampana Mena Activities"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </motion.div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          {currentContent.sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Featured Image 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/scout/gallerie/8.jpg"
              alt="Mpiandalana Community Service"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </motion.div>

        {/* Sources */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {currentContent.sources}
          </p>
        </motion.footer>
      </Container>
    </article>
  );
};

export default SampanaMena90;
