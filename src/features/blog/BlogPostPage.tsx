import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { SEO } from '@/shared/components/ui/SEO';
import { getBlogPostBySlug, incrementBlogPostViews } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { FaCalendar, FaArrowLeft, FaSpinner, FaEye, FaClock, FaTag, FaShareAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

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

    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    };

    const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin') => {
        const url = window.location.href;
        const title = post?.title || '';

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
                <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Chargement de l'article...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl"
                >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📄 Article non trouvé</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Cet article n'existe pas ou a été supprimé.</p>
                    <button
                        onClick={() => navigate(`/${i18n.language}/blog`)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                    >
                        <FaArrowLeft /> Retour au blog
                    </button>
                </motion.div>
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

            <article className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                {/* Hero / Cover Image */}
                <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-xy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Back button */}
                    <div className="absolute top-8 left-8 z-20">
                        <button
                            onClick={() => navigate(`/${i18n.language}/blog`)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-gray-900 dark:text-white font-medium hover:bg-white dark:hover:bg-gray-900 transition-all shadow-lg"
                        >
                            <FaArrowLeft /> Retour
                        </button>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex items-end pb-16">
                        <Container>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl"
                            >
                                {/* Category */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                                        <FaClock />
                                        {estimateReadingTime(post.content)} min de lecture
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="font-blog-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                                    {post.title}
                                </h1>

                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-6 text-white/90">
                                    <div className="flex items-center gap-2">
                                        {post.author.avatar ? (
                                            <img
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                {post.author.name.charAt(0)}
                                            </div>
                                        )}
                                        <span className="font-medium">{post.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCalendar />
                                        {formatDate(post.publishedAt)}
                                    </div>
                                    {post.views !== undefined && post.views > 0 && (
                                        <div className="flex items-center gap-2">
                                            <FaEye />
                                            {post.views} vues
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Container>
                    </div>
                </div>

                <Container>
                    <div className="max-w-4xl mx-auto -mt-20 relative z-10 pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Main Content Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
                                {/* Excerpt */}
                                {post.excerpt && (
                                    <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                                        <p className="font-blog-subtitle text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-700 prose-img:rounded-2xl prose-img:shadow-xl">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }) => (
                                                <h1 {...props} className="text-4xl font-extrabold mt-12 mb-6 text-gray-900 dark:text-white" />
                                            ),
                                            h2: ({ node, ...props }) => (
                                                <h2 {...props} className="text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white" />
                                            ),
                                            h3: ({ node, ...props }) => (
                                                <h3 {...props} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" />
                                            ),
                                            p: ({ node, ...props }) => (
                                                <p {...props} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg" />
                                            ),
                                            blockquote: ({ node, ...props }) => (
                                                <blockquote {...props} className="font-blog-handwritten border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 my-8 bg-blue-50/50 dark:bg-blue-900/10 py-4 rounded-r-lg text-lg" />
                                            ),
                                            code: ({ node, inline, ...props }: any) =>
                                                inline ? (
                                                    <code {...props} className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono" />
                                                ) : (
                                                    <code {...props} className="block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono" />
                                                ),
                                            img: ({ node, ...props }) => (
                                                <img {...props} className="rounded-2xl shadow-xl my-8 w-full" />
                                            ),
                                            ul: ({ node, ...props }) => (
                                                <ul {...props} className="list-disc list-inside space-y-2 my-6 text-gray-700 dark:text-gray-300" />
                                            ),
                                            ol: ({ node, ...props }) => (
                                                <ol {...props} className="list-decimal list-inside space-y-2 my-6 text-gray-700 dark:text-gray-300" />
                                            ),
                                        }}
                                    >
                                        {post.content}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Tags & Share Section */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    {/* Tags */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                                                >
                                                    <FaTag className="text-blue-600 dark:text-blue-400 text-xs" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Share */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Partager</h3>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => shareOnSocial('facebook')}
                                                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg hover:shadow-xl"
                                                aria-label="Partager sur Facebook"
                                            >
                                                <FaFacebook />
                                            </button>
                                            <button
                                                onClick={() => shareOnSocial('twitter')}
                                                className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors shadow-lg hover:shadow-xl"
                                                aria-label="Partager sur Twitter"
                                            >
                                                <FaTwitter />
                                            </button>
                                            <button
                                                onClick={() => shareOnSocial('linkedin')}
                                                className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors shadow-lg hover:shadow-xl"
                                                aria-label="Partager sur LinkedIn"
                                            >
                                                <FaLinkedin />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.href);
                                                    alert('Lien copié !');
                                                }}
                                                className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors shadow-lg hover:shadow-xl"
                                                aria-label="Copier le lien"
                                            >
                                                <FaShareAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Back Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => navigate(`/${i18n.language}/blog`)}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
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
