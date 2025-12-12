import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { getBlogPostBySlug, incrementBlogPostViews } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { FaCalendar, FaArrowLeft, FaSpinner, FaEye, FaClock, FaUser } from 'react-icons/fa';

export function BlogPostPage() {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            loadPost(slug);
        }
    }, [slug]);

    const loadPost = async (postSlug: string) => {
        try {
            setLoading(true);
            const data = await getBlogPostBySlug(postSlug);

            if (data) {
                setPost(data);
                incrementBlogPostViews(data.id);
            } else {
                console.log('Post not found');
            }
        } catch (error) {
            console.error('Error loading post:', error);
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

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">{t('blog.loading')}</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.articleNotFound')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('blog.articleNotFoundDesc')}</p>
                    <button
                        onClick={() => navigate(`/${i18n.language}/blog`)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FaArrowLeft /> {t('blog.backToList')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${post.title} - OEKA Blog`}
                description={post.excerpt}
                keywords={post.tags.join(', ')}
                image={post.coverImage}
                type="article"
            />

            <article className="py-12 md:py-16 lg:py-20">
                <Container>
                    {/* Back Button */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <button
                            onClick={() => navigate(`/${i18n.language}/blog`)}
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <FaArrowLeft /> {t('blog.backToList')}
                        </button>
                    </div>

                    {/* HEADER */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto mb-12"
                    >
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <FaCalendar className="text-blue-600 dark:text-blue-400" />
                                <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <FaUser className="text-blue-600 dark:text-blue-400" />
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaClock className="text-blue-600 dark:text-blue-400" />
                                <span>{estimateReadingTime(post.content)} {t('blog.readingTime')}</span>
                            </div>
                            {post.views !== undefined && post.views > 0 && (
                                <div className="flex items-center gap-2">
                                    <FaEye className="text-blue-600 dark:text-blue-400" />
                                    <span>{post.views}</span>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="font-blog-title text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {post.title}
                        </h1>
                    </motion.header>

                    {/* COVER IMAGE */}
                    {post.coverImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto mb-12"
                        >
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </motion.div>
                    )}

                    {/* CONTENT */}
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-blog-title
                                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-12
                                prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-10
                                prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-8
                                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                                prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                                prose-blockquote:font-blog-handwritten prose-blockquote:border-l-4 prose-blockquote:border-blue-600 dark:prose-blockquote:border-blue-400 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:text-lg
                                prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8
                                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                                prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-2
                            "
                        >
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </motion.div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Footer */}
                        <motion.footer
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                        >
                            <button
                                onClick={() => navigate(`/${i18n.language}/blog`)}
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                            >
                                <FaArrowLeft />
                                {t('blog.backToBlog', 'Retour aux articles')}
                            </button>
                        </motion.footer>
                    </div>
                </Container>
            </article>
        </>
    );
}
