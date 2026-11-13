import React from 'react';

export interface VetroLogoProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  subtitleClassName?: string;
}

export const VetroLogoMark: React.FC<{ size?: number; theme?: 'dark' | 'light'; className?: string }> = ({
  size = 36,
  theme = 'dark',
  className = '',
}) => {
  const isLight = theme === 'light';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 44 44" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Crisp 4px architectural square frame */}
      <rect 
        x="0.5" 
        y="0.5" 
        width="43" 
        height="43" 
        rx="3" 
        fill={isLight ? 'rgba(251,250,247,0.06)' : '#252725'} 
        stroke={isLight ? 'rgba(251,250,247,0.18)' : '#DFDDD6'}
        strokeWidth="1"
      />
      
      {/* Left Monolithic Glass Plane (Solid Optiwhite 10mm) */}
      <path 
        d="M11 11H17.5L22 31L17.5 33L11 11Z" 
        fill={isLight ? '#FBFAF7' : '#F4F2EC'} 
      />
      
      {/* Right Monolithic Glass Plane (Refractive & Translucent) */}
      <path 
        d="M33 11H26.5L22 31L26.5 33L33 11Z" 
        fill={isLight ? '#FBFAF7' : '#F4F2EC'} 
        fillOpacity="0.45" 
      />
      
      {/* Architectural Sage / Bronze Pivot Accent */}
      <circle cx="31" cy="13" r="1.8" fill={isLight ? '#A68C70' : '#788173'} />
      
      {/* Center 1mm laser calibrated miter seam */}
      <path d="M22 31V33.5" stroke={isLight ? '#A68C70' : '#788173'} strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
};

export const VetroLogo: React.FC<VetroLogoProps> = ({
  theme = 'dark',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Architectural Glass Studio • Душевые',
  className = '',
  subtitleClassName = '',
}) => {
  const isLight = theme === 'light';

  const markSizes = {
    sm: 30,
    md: 36,
    lg: 42,
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
    <div className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      <VetroLogoMark size={markSizes[size]} theme={theme} />
      
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-sans font-bold tracking-[0.18em] whitespace-nowrap ${titleSizes[size]} ${
              isLight ? 'text-[#FBFAF7]' : 'text-[#252725]'
            }`}
          >
            VETRO
          </span>
          <span 
            className={`w-1 h-1 rounded-none rotate-45 shrink-0 ${
              isLight ? 'bg-[#A68C70]' : 'bg-[#788173]'
            }`} 
            aria-hidden="true" 
          />
        </div>
        
        {showSubtitle && (
          <span 
            className={`font-mono tracking-[0.14em] mt-0.5 truncate uppercase whitespace-nowrap ${subSizes[size]} ${
              isLight ? 'text-[#FBFAF7]/60' : 'text-[#777A74]'
            } ${subtitleClassName}`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
