import { Button } from '@/shared/components/ui/Button';
import { Container } from '@/shared/components/ui/Container';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

interface CTAAction {
    text: string;
    href: string;
}

interface CTASectionProps {
    id?: string;
    title: string;
    subtitle: string;
    primaryAction: CTAAction;
    secondaryAction?: CTAAction;
    className?: string;
}

export function CTASection({
    id,
    title,
    subtitle,
    primaryAction,
    secondaryAction,
    className = ""
}: CTASectionProps) {
    return (
        <section id={id} className={`relative overflow-hidden py-24 md:py-32 ${className}`}>
            {/* Background with Gradient and Pattern */}
            <div className="absolute inset-0 transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Animated Gradient Mesh */}
                <div className="absolute inset-0 opacity-40 dark:opacity-30">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
            </div>

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                            {title}
                        </h2>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                            <Button
                                to={primaryAction.href}
                                variant="primary"
                                size="lg"
                                className="group px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                            >
                                {primaryAction.text}
                                <motion.span
                                    className="inline-block ml-2"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <FaArrowRight className="w-4 h-4" />
                                </motion.span>
                            </Button>

                            {secondaryAction && (
                                <Button
                                    to={secondaryAction.href}
                                    variant="outline"
                                    size="lg"
                                    className="group px-8 py-4 text-lg font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
                                >
                                    {secondaryAction.text}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* CSS for Blob Animation */}
            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    );
}
