import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ 
  children, 
  className = '', 
  size = 'lg' 
}: ContainerProps) {
  // Tailles de container avec Tailwind CSS pur
  const sizeClasses = {
    sm: 'max-w-3xl',   // ~768px
    md: 'max-w-5xl',   // ~1024px  
    lg: 'max-w-7xl',   // ~1280px
    xl: 'max-w-screen-2xl', // ~1536px
    full: 'max-w-none'  // Pas de limite
  };

  const baseClasses = 'w-full mx-auto px-4 sm:px-6 lg:px-8';
  const containerClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}
