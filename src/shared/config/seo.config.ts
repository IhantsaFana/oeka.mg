/**
 * Configuration SEO centralisée
 * Contient tous les mots-clés et métadonnées pour optimiser le référencement
 */

export const SEO_CONFIG = {
    // Informations de base
    siteName: 'OEKA - Ihantsa RAKOTONDRANAIVO',
    siteUrl: 'https://oeka.mg',
    author: 'Ihantsa RAKOTONDRANAIVO',
    authorAlias: 'OEKA Mikofo',

    // Réseaux sociaux
    social: {
        twitter: '@oeka_mikofo',
        linkedin: 'https://www.linkedin.com/in/ihantsa-rakotondranaivo',
        github: 'https://github.com/IhantsaFana',
        email: 'contact@oeka.mg',
    },

    // Mots-clés principaux (pour apparaître dans les recherches)
    primaryKeywords: [
        'Ihantsa RAKOTONDRANAIVO',
        'Rakotondranaivo Ihantsa',
        'OEKA',
        'OEKA Mikofo',
        'Ihantsa Rakotondranaivo Madagascar',
        'Rakotondranaivo',
    ],

    // Mots-clés professionnels
    professionalKeywords: {
        fr: [
            'développeur full-stack Madagascar',
            'développeur web Madagascar',
            'développeur mobile Madagascar',
            'spécialiste IA Madagascar',
            'ingénieur IA Madagascar',
            'développeur React Madagascar',
            'développeur Flutter Madagascar',
            'développeur Python Madagascar',
            'expert MLOps Madagascar',
            'développeur Antananarivo',
            'freelance développeur Madagascar',
            'consultant IT Madagascar',
            'développeur freelance Antananarivo',
            'création site web Madagascar',
            'application mobile Madagascar',
        ],
        en: [
            'full-stack developer Madagascar',
            'web developer Madagascar',
            'mobile developer Madagascar',
            'AI specialist Madagascar',
            'AI engineer Madagascar',
            'React developer Madagascar',
            'Flutter developer Madagascar',
            'Python developer Madagascar',
            'MLOps expert Madagascar',
            'developer Antananarivo',
            'freelance developer Madagascar',
            'IT consultant Madagascar',
            'freelance developer Antananarivo',
            'website creation Madagascar',
            'mobile app Madagascar',
        ],
        mg: [
            'mpamorona tranonkala Madagasikara',
            'mpamorona rindranasa Madagasikara',
            'manam-pahaizana AI Madagasikara',
            'mpamorona React Madagasikara',
            'mpamorona Flutter Madagasikara',
            'freelance Antananarivo',
        ],
        es: [
            'desarrollador full-stack Madagascar',
            'desarrollador web Madagascar',
            'especialista IA Madagascar',
            'desarrollador React Madagascar',
        ],
        zh: [
            '马达加斯加全栈开发者',
            '马达加斯加网页开发者',
            '马达加斯加AI专家',
        ],
        de: [
            'Full-Stack-Entwickler Madagaskar',
            'Webentwickler Madagaskar',
            'KI-Spezialist Madagaskar',
        ],
    },

    // Mots-clés Scout
    scoutKeywords: {
        fr: [
            'scout Madagascar',
            'scoutisme Madagascar',
            'chef scout Madagascar',
            'OEKA scout',
            'scout Antananarivo',
            'mouvement scout Madagascar',
        ],
        en: [
            'scout Madagascar',
            'scouting Madagascar',
            'scout leader Madagascar',
            'OEKA scout',
            'scout Antananarivo',
            'scout movement Madagascar',
        ],
        mg: [
            'scout Madagasikara',
            'mpitarika scout Madagasikara',
            'OEKA scout',
        ],
    },

    // Technologies
    technologies: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Flutter',
        'Dart',
        'Python',
        'Django',
        'FastAPI',
        'Node.js',
        'Express',
        'PostgreSQL',
        'MongoDB',
        'Docker',
        'Git',
        'GitHub',
        'Tailwind CSS',
        'Material-UI',
        'Framer Motion',
        'i18next',
        'Vite',
        'Machine Learning',
        'AI',
        'MLOps',
        'Gemini API',
        'OpenAI',
    ],

    // Descriptions par page et par langue
    pageDescriptions: {
        home: {
            fr: "Portfolio d'Ihantsa RAKOTONDRANAIVO (OEKA Mikofo) - Développeur Full-Stack & Spécialiste IA à Madagascar. Expert en React, Flutter, Python. Scout leader passionné.",
            en: "Portfolio of Ihantsa RAKOTONDRANAIVO (OEKA Mikofo) - Full-Stack Developer & AI Specialist in Madagascar. Expert in React, Flutter, Python. Passionate scout leader.",
            mg: "Portfolio an'i Ihantsa RAKOTONDRANAIVO (OEKA Mikofo) - Mpamorona Full-Stack sy Manam-pahaizana AI eto Madagasikara. Manam-pahaizana React, Flutter, Python.",
            es: "Portafolio de Ihantsa RAKOTONDRANAIVO (OEKA Mikofo) - Desarrollador Full-Stack y Especialista en IA en Madagascar. Experto en React, Flutter, Python.",
            zh: "Ihantsa RAKOTONDRANAIVO (OEKA Mikofo) 作品集 - 马达加斯加全栈开发者和AI专家。React、Flutter、Python专家。",
            de: "Portfolio von Ihantsa RAKOTONDRANAIVO (OEKA Mikofo) - Full-Stack-Entwickler & KI-Spezialist in Madagaskar. Experte in React, Flutter, Python.",
        },
        dev: {
            fr: "Projets de développement d'Ihantsa RAKOTONDRANAIVO - Applications web et mobile avec React, Flutter, Python. Développeur freelance à Madagascar.",
            en: "Development projects by Ihantsa RAKOTONDRANAIVO - Web and mobile applications with React, Flutter, Python. Freelance developer in Madagascar.",
            mg: "Tetikasa fampandrosoana nataon'i Ihantsa RAKOTONDRANAIVO - Rindranasa tranonkala sy finday miaraka amin'ny React, Flutter, Python.",
            es: "Proyectos de desarrollo de Ihantsa RAKOTONDRANAIVO - Aplicaciones web y móviles con React, Flutter, Python.",
            zh: "Ihantsa RAKOTONDRANAIVO 的开发项目 - 使用 React、Flutter、Python 的网页和移动应用。",
            de: "Entwicklungsprojekte von Ihantsa RAKOTONDRANAIVO - Web- und Mobile-Anwendungen mit React, Flutter, Python.",
        },
        scout: {
            fr: "OEKA Mikofo - Chef Scout à Madagascar. Découvrez mon engagement dans le scoutisme, mes activités avec les Scouts, Tily et Imaran Bato.",
            en: "OEKA Mikofo - Scout Leader in Madagascar. Discover my commitment to scouting, activities with Scouts, Tily and Imaran Bato.",
            mg: "OEKA Mikofo - Mpitarika Scout eto Madagasikara. Fantaro ny fanoloran-tenako amin'ny scout sy ny hetsika.",
            es: "OEKA Mikofo - Líder Scout en Madagascar. Descubre mi compromiso con el escultismo y actividades.",
            zh: "OEKA Mikofo - 马达加斯加童子军领袖。了解我对童子军的承诺和活动。",
            de: "OEKA Mikofo - Pfadfinderleiter in Madagaskar. Entdecken Sie mein Engagement in der Pfadfinderarbeit.",
        },
        contact: {
            fr: "Contactez Ihantsa RAKOTONDRANAIVO (OEKA) - Développeur Full-Stack & IA disponible pour projets freelance à Madagascar. React, Flutter, Python.",
            en: "Contact Ihantsa RAKOTONDRANAIVO (OEKA) - Full-Stack & AI Developer available for freelance projects in Madagascar. React, Flutter, Python.",
            mg: "Mifandraisa amin'i Ihantsa RAKOTONDRANAIVO (OEKA) - Mpamorona Full-Stack sy AI afaka mandray tetikasa freelance eto Madagasikara.",
            es: "Contacta a Ihantsa RAKOTONDRANAIVO (OEKA) - Desarrollador Full-Stack e IA disponible para proyectos freelance en Madagascar.",
            zh: "联系 Ihantsa RAKOTONDRANAIVO (OEKA) - 马达加斯加全栈和AI开发者，可接自由职业项目。",
            de: "Kontaktieren Sie Ihantsa RAKOTONDRANAIVO (OEKA) - Full-Stack- & KI-Entwickler für Freelance-Projekte in Madagaskar.",
        },
    },

    // Image par défaut pour Open Graph
    defaultOgImage: 'https://oeka.mg/og-image.jpg',

    // Données structurées (Schema.org)
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ihantsa RAKOTONDRANAIVO',
        alternateName: 'OEKA Mikofo',
        url: 'https://oeka.mg',
        image: 'https://oeka.mg/profile-image.jpg',
        sameAs: [
            'https://www.linkedin.com/in/ihantsa-rakotondranaivo',
            'https://github.com/IhantsaFana',
        ],
        jobTitle: 'Full-Stack Developer & AI Specialist',
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Antananarivo',
            addressCountry: 'Madagascar',
        },
        knowsAbout: [
            'Web Development',
            'Mobile Development',
            'Artificial Intelligence',
            'Machine Learning',
            'React',
            'Flutter',
            'Python',
            'TypeScript',
            'MLOps',
        ],
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'ESMIA Antananarivo',
        },
    },
} as const;

/**
 * Génère les mots-clés pour une langue donnée
 */
export function getKeywordsForLanguage(lang: string, page?: string): string {
    const primary = SEO_CONFIG.primaryKeywords;
    const professional = SEO_CONFIG.professionalKeywords[lang as keyof typeof SEO_CONFIG.professionalKeywords] || SEO_CONFIG.professionalKeywords.en;
    const scout = SEO_CONFIG.scoutKeywords[lang as keyof typeof SEO_CONFIG.scoutKeywords] || [];
    const tech = SEO_CONFIG.technologies;

    let keywords: string[] = [...primary, ...professional];

    if (page === 'scout') {
        keywords = [...keywords, ...scout];
    }

    keywords = [...keywords, ...tech];

    return keywords.join(', ');
}

/**
 * Génère la description pour une page et une langue données
 */
export function getDescriptionForPage(page: string, lang: string): string {
    const descriptions = SEO_CONFIG.pageDescriptions[page as keyof typeof SEO_CONFIG.pageDescriptions];
    if (!descriptions) return SEO_CONFIG.pageDescriptions.home[lang as keyof typeof SEO_CONFIG.pageDescriptions.home] || SEO_CONFIG.pageDescriptions.home.en;

    return descriptions[lang as keyof typeof descriptions] || descriptions.en;
}
