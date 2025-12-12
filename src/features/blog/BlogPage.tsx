import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { getPublishedBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { FaCalendar, FaArrowRight, FaSpinner, FaClock, FaEye } from 'react-icons/fa';

export function BlogPage() {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await getPublishedBlogPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Estimate reading time based on content length
    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    };

    return (
        <>
            <SEO
                title={t('blog.title', 'Blog & Actualités - OEKA')}
                description={t('blog.description', 'Découvrez mes derniers articles, tutoriels et actualités sur le développement web, l\'IA et le scoutisme.')}
                keywords="blog, articles, développement web, IA, scoutisme, Madagascar"
            />

            <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <Container className="relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block mb-4"
                        >
                            <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                                ✨ Blog & Actualités
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-blog-title text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight"
                        >
                            Découvrez mes articles
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-blog-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                            Partage d'expériences, tutoriels techniques et vie scoute
                        </motion.p>
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Chargement des articles...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-32"
                        >
                            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
                                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
                                    📝 Aucun article disponible pour le moment
                                </p>
                                <p className="text-gray-500 dark:text-gray-500">
                                    Revenez bientôt pour découvrir du nouveau contenu !
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group relative"
                                >
                                    <Link
                                        to={`/${i18n.language}/blog/${post.slug}`}
                                        className="block h-full"
                                    >
                                        <div className="h-full bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transform hover:-translate-y-2">
                                            {/* Image */}
                                            <div className="relative h-56 overflow-hidden">
                                                {post.coverImage ? (
                                                    <img
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy" />
                                                )}

                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Category Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-4 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider shadow-lg">
                                                        {post.category}
                                                    </span>
                                                </div>

                                                {/* Reading time badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-xs font-medium text-white">
                                                        <FaClock className="text-xs" />
                                                        {estimateReadingTime(post.content)} min
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                {/* Meta info */}
                                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <FaCalendar className="text-blue-500" />
                                                        <span>{formatDate(post.publishedAt)}</span>
                                                    </div>
                                                    {post.views !== undefined && post.views > 0 && (
                                                        <div className="flex items-center gap-1.5">
                                                            <FaEye className="text-purple-500" />
                                                            <span>{post.views}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h2 className="font-blog-title text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                                    {post.title}
                                                </h2>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                                    {post.excerpt}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                                    {/* Author */}
                                                    <div className="flex items-center gap-2">
                                                        {post.author.avatar ? (
                                                            <img
                                                                src={post.author.avatar}
                                                                alt={post.author.name}
                                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                                                            />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                                                {post.author.name.charAt(0)}
                                                            </div>
                                                        )}
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {post.author.name}
                                                        </span>
                                                    </div>

                                                    {/* Read more */}
                                                    <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                                                        Lire <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </div>

                                                {/* Tags */}
                                                {post.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {post.tags.slice(0, 3).map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2.5 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}
