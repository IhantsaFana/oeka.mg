import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/shared/components/layout/Layout';
import { Home } from '@/features/home/Home';
import { Dev } from '@/features/dev/Dev';
import { Scout } from '@/features/scout/Scout';
import { SampanaMena90Page } from '@/features/scout/SampanaMena90Page';
import { Contact } from '@/features/contact/Contact';
import { NotFoundPage } from '@/features/error/NotFoundPage';
import { BlogPage } from '@/features/blog/BlogPage';
import { BlogPostPage } from '@/features/blog/BlogPostPage';
import { LoginPage } from '@/features/admin/LoginPage';
import { AdminBlog } from '@/features/admin/AdminBlog';
import { AdminBlogEdit } from '@/features/admin/AdminBlogEdit';
import { ProtectedRoute } from '@/features/admin/components/ProtectedRoute';
import { AdminLayout } from '@/features/admin/components/AdminLayout';

import { getLocalizedPath } from '@/shared/utils/routes';

// Composant pour rediriger vers la langue détectée
function RootRedirect() {
  const supportedLangs = ['en', 'fr', 'mg', 'es', 'zh', 'de'] as const;

  // 1. Priorité à la langue sauvegardée
  const savedLang = localStorage.getItem('i18nextLng') as typeof supportedLangs[number] | null;
  if (savedLang && supportedLangs.includes(savedLang)) {
    return <Navigate to={getLocalizedPath('/', savedLang)} replace />;
  }

  // 2. Sinon, détecte la langue du navigateur
  const browserLang = navigator.language.split('-')[0] as typeof supportedLangs[number];
  const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

  return <Navigate to={getLocalizedPath('/', detectedLang)} replace />;
}

export const router = createBrowserRouter([
  // Routes Admin (Prioritaires)
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
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
        path: 'dev',
        element: <Dev />,
      },
      {
        path: 'scout',
        element: <Scout />,
      },
      {
        path: 'scout/sampana-mena-90-taona',
        element: <SampanaMena90Page />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPostPage />,
      },
      // Route 404 pour les chemins non trouvés sous /:lang
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  // Routes Admin
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'blog',
        element: (
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blog/new',
        element: (
          <ProtectedRoute>
            <AdminBlogEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blog/edit/:id',
        element: (
          <ProtectedRoute>
            <AdminBlogEdit />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Redirection pour les chemins non reconnus vers la page d'accueil de la langue par défaut
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

