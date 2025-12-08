import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/shared/components/ui/SEO';
import LinkInSera from './sections/Linkinsera';

export function SampanaMena90TaonaPage() { // <-- correction du nom pour match router
    const { t } = useTranslation();

    const seoContent = {
        fr: {
            title: "Link'In Sera 2.0 - Tily eto Madagasikara",
            description: "Nous étions plus de 85 participants, venus de différentes régions de Madagascar, sans nous connaître au départ.\n\nPendant 4 jours, nous avons partagé, ri, joué et appris à nous côtoyer, en surmontant nos différences : nos cultures, nos langues et même nos difficultés personnelles.\n\n𝐍𝐨𝐮𝐬 𝐞𝐧 𝐬𝐨𝐦𝐦𝐞𝐬 𝐫𝐞𝐬𝐬𝐨𝐫𝐭𝐢𝐬 𝐮𝐧𝐢𝐬, 𝐜𝐨𝐦𝐦𝐞 𝐝𝐞𝐬 𝐟𝐫𝐞̀𝐫𝐞𝐬 𝐞𝐭 𝐬œ𝐮𝐫𝐬, 𝐮𝐧𝐞 𝐯𝐞́𝐫𝐢𝐭𝐚𝐛𝐥𝐞 𝐠𝐫𝐚𝐧𝐝𝐞 𝐟𝐚𝐦𝐢𝐥𝐥𝐞.\n\nUn grand merci à tous ceux qui nous ont soutenus de près ou de loin, à ceux qui croient en nous.",
            keywords: "Tily eto Madagasikara, Ready For Life, OMMS, Link'In Sera 2.0, Filamatra"
        },
        en: {
            title: "Link'In Sera 2.0 - Tily eto Madagasikara",
            description: "We were more than 85 participants, coming from different regions of Madagascar, without knowing each other at first.\n\nFor 4 days, we shared, laughed, played and learned to connect, overcoming our differences: our cultures, our languages and even our personal struggles.\n\n𝐖𝐞 𝐜𝐚𝐦𝐞 𝐨𝐮𝐭 𝐮𝐧𝐢𝐭𝐞𝐝, 𝐥𝐢𝐤𝐞 𝐛𝐫𝐨𝐭𝐡𝐞𝐫𝐬 𝐚𝐧𝐝 𝐬𝐢𝐬𝐭𝐞𝐫𝐬, 𝐚 𝐭𝐫𝐮𝐞 𝐛𝐢𝐠 𝐟𝐚𝐦𝐢𝐥𝐲.\n\nA big thank you to everyone who supported us, from near or far, and to those who believe in us.",
            keywords: "Tily eto Madagasikara, Ready For Life, OMMS, Link'In Sera 2.0, Filamatra"
        },
        mg: {
            title: "Link'In Sera 2.0 - Tily eto Madagasikara",
            description: "Mihoatra ny 85 izahay no nivory, avy amin'ny faritra maro samihafa eto Madagasikara, nefa tsy nifankahalala akory teo am-piandohana.\n\nNandritra ny 4 andro, nizara, nihomehy, nilalao ary nianatra nifankahazatra izahay, ka nandresy ny tsy fitoviana teo aminay: kolontsaina, fiteny ary na dia olana manokana aza.\n\n𝐍𝐢𝐬𝐲 𝐧𝐚𝐡𝐚𝐭𝐨𝐧𝐠𝐚 𝐧𝐢𝐟𝐚𝐧𝐣𝐞𝐧𝐠𝐚, 𝐭𝐨𝐚 𝐫𝐚𝐡𝐚𝐥𝐚𝐡𝐲 𝐬𝐲 𝐫𝐚𝐡𝐚𝐯𝐚𝐯𝐲, 𝐭𝐚𝐧𝐭𝐞𝐫𝐚𝐤𝐚 𝐦𝐢𝐭𝐨𝐧𝐝𝐫𝐚 𝐢𝐫𝐚𝐢𝐧𝐚.\n\nMankasitraka indrindra an'izay rehetra nanohana anay, akaiky na lavitra, sy izay mino anay.",
            keywords: "Tily eto Madagasikara, Ready For Life, OMMS, Link'In Sera 2.0, Filamatra"
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
                <LinkInSera />
            </main>
        </>
    );
}
