import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { getPublishedBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { FaCalendar, FaSpinner, FaClock, FaEye, FaUser } from 'react-icons/fa';

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

    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    };

    return (
        <>
            <SEO
                title={t('blog.seo.title')}
                description={t('blog.seo.description')}
                keywords="blog, articles, développement web, IA, scoutisme, Madagascar"
            />

            {/* Hero Section */}
            <section className="relative py-16 md:py-20 border-b border-gray-200 dark:border-gray-800">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            {/* Left side - Title */}
                            <div className="flex-1">
                                <h1 className="font-blog-title text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-none mb-2">
                                    {t('blog.title')}
                                </h1>
                                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                            </div>

                            {/* Right side - Subtitle */}
                            <div className="flex-1 md:text-right">
                                <p className="font-blog-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t('blog.subtitle')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Posts Section */}
            <section className="py-16 md:py-20">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">{t('blog.loading')}</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="inline-block p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                    <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2">
                                        📝 {t('blog.noArticles')}
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="group"
                                    >
                                        <Link to={`/${i18n.language}/blog/${post.slug}`} className="block h-full">
                                            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transform hover:-translate-y-1">
                                                {/* Cover Image */}
                                                {post.coverImage && (
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div className="p-6">
                                                    {/* Meta Info */}
                                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <FaCalendar className="text-blue-600 dark:text-blue-400" />
                                                            <span>{formatDate(post.publishedAt)}</span>
                                                        </div>
                                                        <span className="text-blue-600 dark:text-blue-400">•</span>
                                                        <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                                            {post.category}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="font-blog-title text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                                        {post.title}
                                                    </h2>

                                                    {/* Excerpt */}
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                                                        {post.excerpt}
                                                    </p>

                                                    {/* Footer Meta */}
                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                        <div className="flex items-center gap-1">
                                                            <FaUser className="text-blue-600 dark:text-blue-400" />
                                                            <span>{post.author.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <FaClock className="text-blue-600 dark:text-blue-400" />
                                                            <span>{estimateReadingTime(post.content)} {t('blog.readingTime')}</span>
                                                        </div>
                                                        {post.views !== undefined && post.views > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <FaEye className="text-blue-600 dark:text-blue-400" />
                                                                <span>{post.views}</span>
                                                            </div>
                                                        )}
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
                    </div>
                </Container>
            </section>
        </>
    );
}
