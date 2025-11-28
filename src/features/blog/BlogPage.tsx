import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { getPublishedBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { FaCalendar, FaUser, FaArrowRight, FaSpinner } from 'react-icons/fa';

export function BlogPage() {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, [i18n.language]);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await getPublishedBlogPosts(i18n.language);
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

    return (
        <>
            <SEO
                title={t('blog.title', 'Blog & Actualités - OEKA')}
                description={t('blog.description', 'Découvrez mes derniers articles, tutoriels et actualités sur le développement web, l\'IA et le scoutisme.')}
                keywords="blog, articles, développement web, IA, scoutisme, Madagascar"
            />

            <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <Container>
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Blog & Actualités
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 dark:text-gray-400"
                        >
                            Partage d'expériences, tutoriels techniques et vie scoute
                        </motion.p>
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <FaSpinner className="animate-spin text-4xl text-blue-600" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Aucun article disponible pour le moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                >
                                    <Link to={`/${i18n.language}/blog/${post.slug}`}>
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            {post.coverImage ? (
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <FaCalendar className="text-blue-500" />
                                                    <span>{formatDate(post.publishedAt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FaUser className="text-blue-500" />
                                                    <span>{post.author.name}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex gap-2">
                                                    {post.tags.slice(0, 2).map((tag, i) => (
                                                        <span key={i} className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                                    Lire la suite <FaArrowRight />
                                                </span>
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
