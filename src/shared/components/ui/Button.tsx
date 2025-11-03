import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function Button({ 
  children, 
  to, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false 
}: ButtonProps) {
  // Base styles - Design moderne amélioré
  const baseStyles = 'inline-block font-semibold rounded-lg transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95';
  
  // Size styles - Paddings optimisés
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg font-bold'
  };
  
  // Variant styles - Design moderne avec gradients
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 
      hover:from-blue-700 hover:to-blue-800 
      dark:from-blue-500 dark:to-blue-600 
      dark:hover:from-blue-600 dark:hover:to-blue-700
      text-white shadow-lg hover:shadow-xl 
      focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900
      disabled:from-blue-300 disabled:to-blue-400 disabled:shadow-none
    `,
    secondary: `
      border-2 border-blue-600 dark:border-blue-400
      text-blue-600 dark:text-blue-400
      hover:bg-blue-600 hover:text-white hover:border-blue-600
      dark:hover:bg-blue-400 dark:hover:text-gray-900 dark:hover:border-blue-400
      bg-white dark:bg-gray-900
      shadow-md hover:shadow-lg
      focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900
      disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-100 disabled:shadow-none
    `
  };
  
  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  // Disabled styles
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';
  const finalClasses = `${classes} ${disabledClasses}`;
  
  // Render as Link (React Router)
  if (to && !disabled) {
    return (
      <Link to={to} className={finalClasses}>
        {children}
      </Link>
    );
  }
  
  // Render as external link or anchor
  if (href && !disabled) {
    // Check if it's an internal anchor link (starts with #)
    const isInternalAnchor = href.startsWith('#');
    
    return (
      <a 
        href={href} 
        className={finalClasses}
        {...(!isInternalAnchor && {
          target: "_blank",
          rel: "noopener noreferrer"
        })}
      >
        {children}
      </a>
    );
  }
  
  // Render as button
  return (
    <button 
      onClick={onClick} 
      className={finalClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

