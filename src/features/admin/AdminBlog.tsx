import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/shared/components/ui/Container';
import { getAllBlogPosts, deleteBlogPost } from '@/services/blogService';
import { logout } from '@/services/authService';
import type { BlogPost } from '@/types/blog';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSignOutAlt, FaSpinner, FaSearch, FaFilter } from 'react-icons/fa';

export function AdminBlog() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPosts();
    }, [selectedLanguage]);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const lang = selectedLanguage === 'all' ? undefined : selectedLanguage;
            const data = await getAllBlogPosts(lang);
            setPosts(data);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            return;
        }

        try {
            await deleteBlogPost(id);
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Erreur lors de la suppression');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Navigation Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
                <Container>
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Dashboard
                            </h1>
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                                Blog
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                                {posts.length} articles
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                title="Déconnexion"
                            >
                                <FaSignOutAlt size={20} />
                            </button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-8">
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="flex flex-1 w-full gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="pl-10 pr-8 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                            >
                                <option value="all">Toutes les langues</option>
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                                <option value="mg">Malagasy</option>
                                <option value="es">Español</option>
                                <option value="zh">中文</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/admin/blog/new')}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                    >
                        <FaPlus />
                        <span>Nouvel article</span>
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <FaSpinner className="animate-spin text-4xl text-blue-600" />
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            Aucun article trouvé
                        </p>
                        <button
                            onClick={() => navigate('/admin/blog/new')}
                            className="text-blue-600 hover:underline"
                        >
                            Créer votre premier article
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-blue-500/30 transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Image Thumbnail */}
                                    <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        {post.coverImage ? (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <span className="text-xs">No img</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                                {post.title}
                                            </h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${post.status === 'published'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                            <span className="uppercase text-xs font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                                {post.language}
                                            </span>
                                            <span>{post.category}</span>
                                            <span className="hidden md:inline">•</span>
                                            <span className="hidden md:inline">{formatDate(post.createdAt)}</span>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            {post.views !== undefined && (
                                                <span className="flex items-center gap-1">
                                                    <FaEye /> {post.views}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                            title="Modifier"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                            title="Supprimer"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
