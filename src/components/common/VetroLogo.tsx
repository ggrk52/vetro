import React from 'react';

export interface VetroLogoProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export const VetroLogoMark: React.FC<{ size?: number; theme?: 'dark' | 'light'; className?: string }> = ({
  size = 38,
  theme = 'dark',
  className = '',
}) => {
  const isLight = theme === 'light';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      {/* Outer Squircle Container */}
      <rect 
        width="48" 
        height="48" 
        rx="12" 
        fill={isLight ? 'rgba(255,255,255,0.08)' : '#1a1712'} 
        stroke={isLight ? 'rgba(255,255,255,0.15)' : 'rgba(26,23,18,0.1)'}
        strokeWidth="1"
      />
      
      {/* Left Monolithic Glass Plane (Solid Optiwhite 10mm) */}
      <path 
        d="M12 11H19L24 33.5L19 36L12 11Z" 
        fill={isLight ? '#ffffff' : '#f4f2ec'} 
      />
      
      {/* Right Monolithic Glass Plane (Refractive & Translucent Glass) */}
      <path 
        d="M36 11H29L24 33.5L29 36L36 11Z" 
        fill={isLight ? '#ffffff' : '#f4f2ec'} 
        fillOpacity="0.45" 
      />
      
      {/* Precision Laser Focal Point (1mm calibration) */}
      <circle cx="34" cy="13" r="2.2" fill="#FF2500" />
      
      {/* Miter Joint Laser Alignment Hairline */}
      <path d="M24 33.5V36.5" stroke="#FF2500" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

export const VetroLogo: React.FC<VetroLogoProps> = ({
  theme = 'dark',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Стеклянные душевые • Москва',
  className = '',
}) => {
  const isLight = theme === 'light';

  const markSizes = {
    sm: 32,
    md: 38,
    lg: 46,
  };

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
  };

  const subSizes = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-[11px] sm:text-xs',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      <VetroLogoMark size={markSizes[size]} theme={theme} />
      
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-sans font-extrabold tracking-tight ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-[#1a1712]'
            }`}
          >
            VETRO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2500]" aria-hidden="true" />
        </div>
        
        {showSubtitle && (
          <span 
            className={`font-mono tracking-wider mt-0.5 truncate uppercase ${subSizes[size]} ${
              isLight ? 'text-white/50' : 'text-[#7c766c]'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
