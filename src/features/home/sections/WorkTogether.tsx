import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/Button';
import { Container } from '@/shared/components/ui/Container';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

export function WorkTogether() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-20 md:py-24">
      {/* Effet de fond animé */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiPjwvcmVjdD4KICA8cGF0aCBkPSJNLTEsMSBMMTAxLDEwMSBNMTAxLC0xIEwtMSw5OSBNOTksMSBMMSwxMDEgTTEsMSBMOTksOTkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')]">
        </div>
      </div>

      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {t('home.cta.workTogether')}
          </motion.h3>
          
          <motion.p 
            className="text-blue-100 dark:text-blue-200 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t('home.cta.workTogetherSubtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-white dark:text-blue-800 dark:hover:bg-blue-100 flex items-center gap-2 group px-8 py-4 text-lg font-semibold"
            >
              {t('home.cta.startProject')}
              <motion.span 
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaArrowRight className="w-5 h-5" />
              </motion.span>
            </Button>
            
            <Button
              href="#introduction"
              variant="outline"
              size="lg"
              className="text-white border-2 border-white hover:bg-white/10 dark:border-blue-200 dark:text-blue-100 dark:hover:bg-white/5 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              {t('home.cta.learnMore')}
            </Button>
          </motion.div>
          
          {/* Effet de lueur */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30 animate-blob"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 dark:bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000"></div>
        </motion.div>
      </Container>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
