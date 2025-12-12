import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { getBlogPostBySlug, incrementBlogPostViews } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { FaCalendar, FaUser, FaTag, FaArrowLeft, FaSpinner, FaEye } from 'react-icons/fa';

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
                // Increment views
                incrementBlogPostViews(data.id);
            } else {
                // Post not found
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article non trouvé</h1>
                <button
                    onClick={() => navigate(`/${i18n.language}/blog`)}
                    className="text-blue-600 hover:underline flex items-center gap-2"
                >
                    <FaArrowLeft /> Retour au blog
                </button>
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

            <article className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
                {/* Hero / Cover Image */}
                <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700" />
                    )}
                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <Container>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl mx-auto text-center text-white"
                            >
                                <div className="flex items-center justify-center gap-4 mb-6 text-sm md:text-base font-medium">
                                    <span className="px-3 py-1 bg-blue-600 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaCalendar /> {formatDate(post.publishedAt)}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    {post.title}
                                </h1>

                                <div className="flex items-center justify-center gap-6 text-sm md:text-base text-gray-200">
                                    <div className="flex items-center gap-2">
                                        <FaUser /> {post.author.name}
                                    </div>
                                    {post.views !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <FaEye /> {post.views} vues
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Container>
                    </div>
                </div>

                <Container>
                    <div className="max-w-4xl mx-auto -mt-10 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
                        >
                            {/* Content */}
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    components={{
                                        img: ({ node, ...props }) => (
                                            <img {...props} className="rounded-xl shadow-lg my-8 w-full" />
                                        ),
                                        h2: ({ node, ...props }) => (
                                            <h2 {...props} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white" />
                                        ),
                                        p: ({ node, ...props }) => (
                                            <p {...props} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6" />
                                        ),
                                        blockquote: ({ node, ...props }) => (
                                            <blockquote {...props} className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-8" />
                                        ),
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                        >
                                            <FaTag className="text-xs" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Back Button */}
                            <div className="mt-12">
                                <button
                                    onClick={() => navigate(`/${i18n.language}/blog`)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    <FaArrowLeft />
                                    {t('blog.backToBlog', 'Retour aux articles')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </article>
        </>
    );
}
