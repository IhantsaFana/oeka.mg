import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationState {
  currentPage: string;
  activeSection: string;
  isHomePage: boolean;
}

export function useSmartNavigation(currentLang: string) {
  const location = useLocation();
  const navigate = useNavigate();
  const [navState, setNavState] = useState<NavigationState>({
    currentPage: 'home',
    activeSection: 'hero',
    isHomePage: true
  });

  // Déterminer la page courante et la section
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    
    // Déterminer la page courante
    let currentPage = 'home';
    let isHomePage = true;
    
    if (path.includes('/blog')) {
      currentPage = 'blog';
      isHomePage = false;
    } else if (path.includes('/about')) {
      currentPage = 'about';
      isHomePage = false;
    } else if (path.includes('/projects')) {
      currentPage = 'projects';
      isHomePage = false;
    } else if (path.includes('/contact')) {
      currentPage = 'contact';
      isHomePage = false;
    } else if (path === `/${currentLang}` || path === `/${currentLang}/`) {
      currentPage = 'home';
      isHomePage = true;
    }

    // Déterminer la section active
    let activeSection = 'hero';
    if (hash) {
      activeSection = hash.replace('#', '');
    } else if (!isHomePage) {
      activeSection = currentPage;
    }

    setNavState({
      currentPage,
      activeSection,
      isHomePage
    });

    // Si on est sur la home avec une ancre, scroller vers la section
    if (isHomePage && hash) {
      const sectionId = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location.pathname, location.hash, currentLang]);

  // Observer pour détecter la section active sur la home page
  useEffect(() => {
    if (!navState.isHomePage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setNavState(prev => ({
              ...prev,
              activeSection: entry.target.id
            }));
          }
        });
      },
      { 
        threshold: [0.3, 0.7],
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    // Observer toutes les sections de la home page
    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
    const elements: Element[] = [];
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [navState.isHomePage]);

  // Fonction de navigation intelligente
  const navigateToSection = (sectionId: string, itemKey: string) => {
    // Si c'est le blog, naviguer directement
    if (itemKey === 'blog') {
      navigate(`/${currentLang}/blog`);
      return;
    }

    // Si on est sur la home page, faire un smooth scroll
    if (navState.isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Si on est sur une autre page, naviguer vers la home avec ancre
      if (sectionId === 'hero') {
        navigate(`/${currentLang}`);
      } else {
        navigate(`/${currentLang}#${sectionId}`);
      }
    }
  };

  // Déterminer si un item de navigation est actif
  const isNavItemActive = (itemKey: string, sectionId: string) => {
    if (itemKey === 'blog') {
      return navState.currentPage === 'blog';
    }
    
    if (itemKey === 'home') {
      return navState.isHomePage && navState.activeSection === 'hero';
    }

    // Pour les autres sections
    if (navState.isHomePage) {
      return navState.activeSection === sectionId;
    } else {
      return navState.currentPage === itemKey;
    }
  };

  // Générer l'URL appropriée pour un item de navigation
  const getNavItemHref = (itemKey: string, sectionId: string) => {
    if (itemKey === 'blog') {
      return `/${currentLang}/blog`;
    }
    
    if (itemKey === 'home') {
      return `/${currentLang}`;
    }

    // Pour les sections, toujours pointer vers la home avec ancre
    return `/${currentLang}#${sectionId}`;
  };

  return {
    ...navState,
    navigateToSection,
    isNavItemActive,
    getNavItemHref
  };
}

