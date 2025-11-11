interface CurvedLinesProps {
  position?: 'top' | 'bottom' | 'full';
  height?: 'sm' | 'md' | 'lg';
  opacity?: 'light' | 'medium' | 'strong';
  color?: 'blue' | 'purple' | 'green' | 'gray';
  lines?: number;
  curvature?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export function CurvedLines({
  position = 'bottom',
  height = 'md',
  opacity = 'light',
  color = 'blue',
  lines = 5,
  curvature = 'medium',
  className = ''
}: CurvedLinesProps) {
  // Position styles
  const positionStyles = {
    top: 'top-0',
    bottom: 'bottom-0',
    full: 'inset-0'
  };

  // Height styles
  const heightStyles = {
    sm: 'h-48 md:h-56',
    md: 'h-64 md:h-80',
    lg: 'h-80 md:h-96'
  };

  // Opacity styles
  const opacityStyles = {
    light: 'opacity-10 dark:opacity-5',
    medium: 'opacity-20 dark:opacity-10',
    strong: 'opacity-30 dark:opacity-15'
  };

  // Color styles
  const colorStyles = {
    blue: 'text-blue-500 dark:text-blue-400',
    purple: 'text-purple-500 dark:text-purple-400',
    green: 'text-green-500 dark:text-green-400',
    gray: 'text-gray-500 dark:text-gray-400'
  };

  // Curvature values
  const curvatureValues = {
    subtle: [150, 190, 230, 270, 310],
    medium: [100, 140, 180, 220, 260],
    strong: [50, 90, 130, 170, 210]
  };

  const curves = curvatureValues[curvature];

  // Generate line paths
  const generateLines = () => {
    const lineSpacing = 40;
    const startY = 200;
    
    return Array.from({ length: lines }, (_, index) => {
      const y = startY + (index * lineSpacing);
      const controlY = curves[index] || curves[curves.length - 1];
      
      return (
        <path
          key={index}
          d={`M-100,${y} Q300,${controlY} 600,${y - 20} T1300,${y}`}
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
          fill="none"
          className={colorStyles[color]}
        />
      );
    });
  };

  return (
    <div className={`absolute ${positionStyles[position]} left-0 right-0 ${heightStyles[height]} ${opacityStyles[opacity]} pointer-events-none ${className}`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1200 400" 
        preserveAspectRatio="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {generateLines()}
      </svg>
    </div>
  );
}