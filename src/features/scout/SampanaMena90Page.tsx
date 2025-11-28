import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/shared/components/ui/SEO';
import SampanaMena90 from './sections/SampanaMena90';

export function SampanaMena90Page() {
    const { t } = useTranslation();

    const seoContent = {
        fr: {
            title: "90 Ans de Sampana Mena - Mpiandalana Tily eto Madagasikara | 1936-2026",
            description: "Célébration des 90 ans de Sampana Mena (Mpiandalana/Routiers) de Tily eto Madagasikara. Découvrez l'histoire, les valeurs et les réalisations de cette branche scout fondée en 1936 à Madagascar.",
            keywords: "Sampana Mena, Mpiandalana, Routiers, Tily eto Madagasikara, Scout Madagascar, 90 ans, scoutisme protestant, histoire scout Madagascar, Tily, scoutisme malgache"
        },
        en: {
            title: "90 Years of Sampana Mena - Mpiandalana Tily eto Madagasikara | 1936-2026",
            description: "Celebrating 90 years of Sampana Mena (Mpiandalana/Rovers) of Tily eto Madagasikara. Discover the history, values and achievements of this scout branch founded in 1936 in Madagascar.",
            keywords: "Sampana Mena, Mpiandalana, Rovers, Tily eto Madagasikara, Scout Madagascar, 90 years, Protestant scouting, Madagascar scout history, Tily, Malagasy scouting"
        },
        mg: {
            title: "90 Taona Sampana Mena - Mpiandalana Tily eto Madagasikara | 1936-2026",
            description: "Fankalazana ny faha-90 taonan'ny Sampana Mena (Mpiandalana/Routiers) ao amin'ny Tily eto Madagasikara. Fantaro ny tantara, ny soatoavina ary ny zava-bitan'ity sampana skoto naorina tamin'ny 1936 teto Madagasikara ity.",
            keywords: "Sampana Mena, Mpiandalana, Routiers, Tily eto Madagasikara, Skoto Madagasikara, 90 taona, skotisma protestanta, tantaran'ny skoto Madagasikara, Tily, skoto malagasy"
        },
        es: {
            title: "90 Años de Sampana Mena - Mpiandalana Tily eto Madagasikara | 1936-2026",
            description: "Celebración de los 90 años de Sampana Mena (Mpiandalana/Rovers) de Tily eto Madagasikara. Descubre la historia, los valores y los logros de esta rama scout fundada en 1936 en Madagascar.",
            keywords: "Sampana Mena, Mpiandalana, Rovers, Tily eto Madagasikara, Scout Madagascar, 90 años, escultismo protestante, historia scout Madagascar, Tily, escultismo malgache"
        },
        zh: {
            title: "Sampana Mena 90周年 - Mpiandalana Tily eto Madagasikara | 1936-2026",
            description: "庆祝Tily eto Madagasikara的Sampana Mena（Mpiandalana/罗浮童军）成立90周年。了解这个1936年在马达加斯加成立的童军分支的历史、价值观和成就。",
            keywords: "Sampana Mena, Mpiandalana, 罗浮童军, Tily eto Madagasikara, 马达加斯加童军, 90周年, 新教童军, 马达加斯加童军历史, Tily, 马达加斯加童军运动"
        },
        de: {
            title: "90 Jahre Sampana Mena - Mpiandalana Tily eto Madagasikara | 1936-2026",
            description: "Feier des 90-jährigen Jubiläums von Sampana Mena (Mpiandalana/Rover) von Tily eto Madagasikara. Entdecken Sie die Geschichte, die Werte und die Errungenschaften dieses 1936 in Madagaskar gegründeten Pfadfinderzweigs.",
            keywords: "Sampana Mena, Mpiandalana, Rover, Tily eto Madagasikara, Pfadfinder Madagaskar, 90 Jahre, protestantisches Pfadfindertum, Madagaskar Pfadfindergeschichte, Tily, madagassisches Pfadfindertum"
        }
    };

    const lang = t('lang') as keyof typeof seoContent;
    const currentSeo = seoContent[lang] || seoContent.fr;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "90 Ans de Sampana Mena - Tily eto Madagasikara",
        "description": currentSeo.description,
        "startDate": "1936",
        "endDate": "2026",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": "Madagascar",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "MG"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Tily eto Madagasikara",
            "url": "https://scout.mg"
        },
        "about": {
            "@type": "Organization",
            "name": "Sampana Mena - Mpiandalana",
            "foundingDate": "1936",
            "description": "Branche Routiers de Tily eto Madagasikara pour les jeunes de 17-19 ans"
        }
    };

    return (
        <>
            <SEO
                title={currentSeo.title}
                description={currentSeo.description}
                keywords={currentSeo.keywords}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <main className="overflow-hidden">
                <SampanaMena90 />
            </main>
        </>
    );
}
