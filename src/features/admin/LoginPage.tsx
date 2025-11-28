import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginWithGoogle } from '@/services/authService';
import { FaLock, FaGoogle, FaSpinner } from 'react-icons/fa';

export function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            navigate('/admin/blog');
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Style inline pour garantir le layout (position fixed prenant tout l'écran)
    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    };

    return (
        <div
            style={containerStyle}
            className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl animate-float-random" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-3xl animate-float-random" style={{ animationDelay: '-2s' }} />
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 mx-4"
                style={{ width: '400px', maxWidth: '90vw' }} // Largeur fixe cruciale
            >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <FaLock className="text-white text-2xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Espace Admin
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Accédez à votre tableau de bord
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 flex items-center gap-3 text-sm text-red-600 dark:text-red-400"
                        >
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                            <p>{error}</p>
                        </motion.div>
                    )}

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                        {loading ? (
                            <FaSpinner className="animate-spin text-blue-600 dark:text-blue-400" />
                        ) : (
                            <FaGoogle className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
                        )}
                        <span>Continuer avec Google</span>
                    </button>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
                        &copy; {new Date().getFullYear()} OEKA Portfolio.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
