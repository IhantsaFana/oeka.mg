import type { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'tourmada',
    title: 'Tourmada',
    description: 'Plateforme touristique complète avec Django, React, Flutter et Gemini API',
    longDescription: 'Plateforme touristique moderne développée pendant mon stage. Solution complète avec interfaces web et mobile pour la découverte et réservation de destinations touristiques à Madagascar.',
    image: '/projects/tourmada.png',
    technologies: ['Django', 'React', 'Flutter', 'PostgreSQL', 'Gemini API'],
    category: 'fullstack',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
    completedAt: '2025-09',
    challenge: 'Créer une plateforme touristique complète avec interfaces web et mobile intégrées.',
    solution: 'Architecture full-stack avec Django REST API, frontend React moderne et application mobile Flutter native.'
  },
  {
    id: 'theologix',
    title: 'Théologix',
    description: 'Assistant vocal théologique avec IA - Gemini API + Flask + Flutter',
    longDescription: 'Prototype d\'assistant vocal intelligent spécialisé en théologie. Utilise Gemini API pour les réponses contextuelles, Flask pour le backend, Flutter pour l\'interface mobile, et Google TTS pour la synthèse vocale. Gestion complète de l\'historique des conversations.',
    image: '/projects/theologix.png',
    technologies: ['Gemini API', 'Flask', 'Flutter', 'Google TTS', 'Python'],
    category: 'ai',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
    completedAt: '2025-01',
    challenge: 'Créer un assistant vocal spécialisé capable de répondre à des questions théologiques complexes avec synthèse vocale.',
    solution: 'Intégration de Gemini API pour l\'IA conversationnelle, Flask pour l\'API backend, et Google TTS pour une expérience vocale naturelle.'
  },
  {
    id: 'factura',
    title: 'Factura',
    description: 'OCR + LLM pour extraction et traitement automatique de factures',
    longDescription: 'Pipeline intelligent d\'extraction de données de factures utilisant Google Cloud Vision pour l\'OCR et Gemini pour l\'analyse. Génération automatique d\'écritures comptables conformes au Plan Comptable Général de Madagascar.',
    image: '/projects/factura.png',
    technologies: ['Google Cloud Vision', 'Gemini API', 'Python', 'OCR', 'Comptabilité'],
    category: 'ai',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
    completedAt: '2024-12',
    challenge: 'Automatiser l\'extraction de données de factures et générer des écritures comptables conformes au PCG Madagascar.',
    solution: 'Pipeline combinant Google Cloud Vision pour l\'OCR et Gemini pour l\'analyse intelligente et la génération d\'écritures comptables.'
  },
  {
    id: 'evaluation-ia',
    title: 'Évaluation Assistée par IA',
    description: 'Hackathon ESMIA 2025 - Examens interactifs avec React/Django + Gemini',
    longDescription: 'Prototype développé lors du Hackathon ESMIA 2025. Plateforme d\'évaluation innovante utilisant l\'IA pour rendre les examens interactifs et adaptatifs. Interface React moderne avec backend Django et intégration Gemini API.',
    image: '/projects/evaluation-ia.jpg',
    technologies: ['React', 'Django', 'Gemini API', 'IA', 'Python'],
    category: 'fullstack',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
    completedAt: '2025-02',
    challenge: 'Créer une plateforme d\'évaluation interactive et adaptative alimentée par l\'IA en temps limité (hackathon).',
    solution: 'Stack React/Django avec intégration Gemini API pour générer des questions adaptatives et fournir un feedback intelligent.'
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Personnel',
    description: 'Portfolio moderne avec React 19, TypeScript et Tailwind CSS',
    longDescription: 'Portfolio personnel moderne développé avec les dernières technologies web. Inclut un système multilingue (EN/FR), un mode sombre/clair, des animations fluides avec Framer Motion, et un SEO optimisé.',
    image: '/projects/portfolio.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'i18next', 'Framer Motion'],
    category: 'web',
    featured: false,
    liveUrl: 'https://oeka.mg',
    githubUrl: 'https://github.com/IhantsaFana/portfolio-ihantsa',
    completedAt: '2025-01',
    challenge: 'Créer un portfolio qui se démarque avec une excellente performance et un SEO optimisé.',
    solution: 'Utilisation de React 19, Vite 7, optimisation des images, et implémentation complète du SEO technique avec i18n.'
  }
];

export const technologies = [
  'All',
  'React',
  'Django',
  'Flutter',
  'Python',
  'Gemini API',
  'Flask',
  'TypeScript',
  'PostgreSQL',
  'Google Cloud Vision'
];

export const categories = [
  { key: 'all', label: 'Tous' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'ai', label: 'IA' },
  { key: 'fullstack', label: 'Full-Stack' }
];

