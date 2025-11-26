// import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import {
  FaCalendar,
  FaClock,
  FaTag,
  FaArrowRight
} from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

export function Blog() {

  // Articles de blog d'exemple - à remplacer par vos vrais articles
  const blogPosts: BlogPost[] = [
    {
      id: 'comment-jai-construit-mon-portfolio',
      title: 'Comment j\'ai construit mon portfolio avec React 19 et TypeScript',
      excerpt: 'Découvrez les technologies et les décisions architecturales derrière ce portfolio moderne.',
      content: '',
      publishedAt: '2025-01-10',
      readTime: 8,
      tags: ['React', 'TypeScript', 'Portfolio', 'Vite'],
      featured: true
    },
    {
      id: 'guide-flutter-debutants',
      title: 'Guide complet Flutter pour débutants',
      excerpt: 'Tout ce que vous devez savoir pour commencer le développement mobile avec Flutter.',
      content: '',
      publishedAt: '2025-01-05',
      readTime: 12,
      tags: ['Flutter', 'Mobile', 'Dart', 'Tutorial']
    },
    {
      id: 'integration-ia-applications-web',
      title: 'Intégrer l\'IA dans vos applications web modernes',
      excerpt: 'Comment utiliser les APIs d\'IA pour enrichir vos applications web.',
      content: '',
      publishedAt: '2024-12-28',
      readTime: 10,
      tags: ['IA', 'OpenAI', 'API', 'JavaScript']
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEO
        title="Blog - Ihantsa RAKOTONDRANAIVO"
        description="Articles techniques sur le développement web, mobile et l'intelligence artificielle par Ihantsa RAKOTONDRANAIVO."
        keywords="blog, développement, React, Flutter, IA, tutoriels, articles techniques"
      />

      {/* Hero Section */}
      <section id="blog-hero" className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Blog Technique
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Mes réflexions et expériences sur le développement web, mobile et l'intelligence artificielle.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section id="blog-featured" className="py-20 bg-white dark:bg-gray-900">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Articles à la une
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-4">
                    <FaTag className="w-4 h-4" />
                    <span className="text-sm font-medium">À la une</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        {post.readTime} min
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all">
                    Lire l'article
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Posts */}
      <section id="blog-categories" className="py-20 bg-gray-50 dark:bg-gray-800">
        <Container>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Tous les articles
          </h2>
          <div className="space-y-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                    <div className="flex items-center gap-1">
                      <FaCalendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="w-4 h-4" />
                      {post.readTime} min
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all">
                    Lire l'article
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section id="blog-newsletter" className="py-20 bg-white dark:bg-gray-900">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Vous avez aimé ces articles ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              N'hésitez pas à me contacter pour discuter de vos projets ou pour toute question technique.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Me contacter
              <FaArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

