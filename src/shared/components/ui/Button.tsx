import type { ReactNode } from 'react';
import { LocalizedLink } from '@/shared/components/navigation/LocalizedLink';

interface ButtonProps {
  children: ReactNode;
  /**
   * Chemin de destination pour la navigation interne (avec gestion automatique de la langue)
   * Exemple: "/contact" deviendra "/fr/contact" ou "/en/contact"
   */
  to?: string;
  
  /**
   * URL externe (pour les liens vers d'autres sites)
   */
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export function Button({ 
  children, 
  to, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
  'aria-label': ariaLabel
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 dark:bg-gray-900 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800',
    outline: 'border-2 border-current text-current hover:bg-black/5 dark:hover:bg-white/10',
    ghost: 'text-current hover:bg-gray-100 dark:hover:bg-gray-800'
  };
  
  // Combined classes
  const classes = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  ].filter(Boolean).join(' ');
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };
  
  // Handle key down for keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (e.target as HTMLElement).click();
    }
  };
  
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';
  const finalClasses = `${classes} ${disabledClasses}`;
  
  // Render as localized link
  if (to) {
    return (
      <LocalizedLink
        to={to}
        className={finalClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </LocalizedLink>
    );
  }
  
  if (href) {
    return (
      <a
        href={href}
        className={finalClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={finalClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
