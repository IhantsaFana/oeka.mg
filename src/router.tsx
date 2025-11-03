import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/shared/components/layout/Layout';
import { Home } from '@/features/home/Home';
import { About } from '@/features/about/About';
import { Projects } from '@/features/projects/Projects';
import { Contact } from '@/features/contact/Contact';
import { Blog } from '@/features/blog/Blog';

// Composant pour rediriger vers la langue détectée
function RootRedirect() {
  const supportedLangs = ['en', 'fr'];
  
  // 1. Priorité à la langue sauvegardée
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && supportedLangs.includes(savedLang)) {
    return <Navigate to={`/${savedLang}`} replace />;
  }
  
  // 2. Sinon, détecte la langue du navigateur
  const browserLang = navigator.language.split('-')[0];
  const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
  
  return <Navigate to={`/${detectedLang}`} replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/:lang',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
]);

