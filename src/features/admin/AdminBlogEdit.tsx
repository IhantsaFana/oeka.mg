import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Container } from '@/shared/components/ui/Container';
import { createBlogPost, getBlogPostById, updateBlogPost } from '@/services/blogService';
import { useAuth } from '@/hooks/useAuth';
import { FaSave, FaArrowLeft, FaSpinner, FaImage, FaTags, FaGlobe, FaLayerGroup } from 'react-icons/fa';

export function AdminBlogEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [category, setCategory] = useState('Scout');
    const [tags, setTags] = useState('');
    const [language, setLanguage] = useState<'fr' | 'en' | 'mg' | 'es' | 'zh' | 'de'>('fr');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');

    // Load existing post if editing
    useEffect(() => {
        if (isEditing && id) {
            loadPost(id);
        }
    }, [id, isEditing]);

    const loadPost = async (postId: string) => {
        try {
            const post = await getBlogPostById(postId);
            if (post) {
                setTitle(post.title);
                setSlug(post.slug);
                setContent(post.content);
                setExcerpt(post.excerpt);
                setCoverImage(post.coverImage);
                setCategory(post.category);
                setTags(post.tags.join(', '));
                setLanguage(post.language);
                setStatus(post.status);
            }
        } catch (error) {
            console.error('Error loading post:', error);
            alert('Erreur lors du chargement de l\'article');
        } finally {
            setInitialLoading(false);
        }
    };

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!isEditing) {
            setSlug(newTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            );
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const postData = {
                title,
                slug,
                content,
                excerpt,
                coverImage,
                category,
                tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                language,
                status,
                author: {
                    name: user.displayName || 'Admin',
                    avatar: user.photoURL || undefined
                }
            };

            if (isEditing && id) {
                await updateBlogPost({ ...postData, id });
            } else {
                await createBlogPost(postData);
            }
            navigate('/admin/blog');
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Erreur lors de la sauvegarde');
        } finally {
            setLoading(false);
        }
    };

    const mdeOptions = {
        spellChecker: false,
        placeholder: "Commencez à écrire votre histoire...",
        status: false,
        autosave: {
            enabled: true,
            uniqueId: isEditing ? `post-${id}` : 'new-post',
            delay: 1000,
        },
        toolbar: [
            "bold", "italic", "heading", "|",
            "quote", "unordered-list", "ordered-list", "|",
            "link", "image", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "guide"
        ]
    } as any;

    if (initialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            <form onSubmit={handleSubmit}>
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 px-4 h-16 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/blog')}
                            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <FaArrowLeft />
                        </button>
                        <h1 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate max-w-[150px] md:max-w-none">
                            {isEditing ? 'Modifier' : 'Nouveau'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                            className={`px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border-0 focus:ring-2 focus:ring-offset-1 transition-all cursor-pointer ${status === 'published'
                                    ? 'bg-green-100 text-green-700 focus:ring-green-500 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 focus:ring-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}
                        >
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                        </select>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 md:px-6 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 text-sm md:text-base"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                            <span className="hidden md:inline">Enregistrer</span>
                        </button>
                    </div>
                </div>

                <Container className="py-6 md:py-8 px-4">
                    <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Main Content (Left) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title Input */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    required
                                    className="w-full text-2xl md:text-3xl font-bold bg-transparent border-none p-0 placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 text-gray-900 dark:text-white"
                                    placeholder="Titre de l'article"
                                />
                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 overflow-x-auto">
                                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded whitespace-nowrap">
                                        /{slug}
                                    </span>
                                </div>
                            </div>

                            {/* Markdown Editor */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden prose-editor">
                                <SimpleMDE
                                    value={content}
                                    onChange={setContent}
                                    options={mdeOptions}
                                    className="dark:bg-gray-800 border-none"
                                />
                            </div>
                        </div>

                        {/* Sidebar (Right) */}
                        <div className="space-y-6">
                            {/* Settings Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                                    Paramètres
                                </h3>

                                {/* Language */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaGlobe className="text-gray-400" />
                                        Langue
                                    </label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value as any)}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    >
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                        <option value="mg">Malagasy</option>
                                        <option value="es">Español</option>
                                        <option value="zh">中文</option>
                                        <option value="de">Deutsch</option>
                                    </select>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaLayerGroup className="text-gray-400" />
                                        Catégorie
                                    </label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="Ex: Scout"
                                    />
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaTags className="text-gray-400" />
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="tag1, tag2..."
                                    />
                                </div>
                            </div>

                            {/* Media Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                                    Médias
                                </h3>

                                {/* Cover Image */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaImage className="text-gray-400" />
                                        Image de couverture
                                    </label>
                                    <input
                                        type="text"
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm mb-3"
                                        placeholder="https://..."
                                    />
                                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                        {coverImage ? (
                                            <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400 text-sm">Aperçu</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Excerpt Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Extrait
                                </label>
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm"
                                    placeholder="Résumé pour le SEO..."
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </form>
        </section>
    );
}
