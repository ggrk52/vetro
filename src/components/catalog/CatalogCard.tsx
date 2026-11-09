import React from 'react';
import { 
  Sliders, 
  Video, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { CabinCategory } from '../../data/portfolioData';

export interface CatalogCardItem {
  id: string;
  category: CabinCategory;
  title: string;
  subtitle: string;
  imageSrc: string;
  priceFrom: number;
  priceFormatted: string;
  badge?: string;
  specs: {
    thickness: string;
    productionTime: string;
    warranty: string;
  };
  bullets: string[];
  hardwareOptions: string[];
  hasVideo?: boolean;
  videoType?: 'sliding' | 'estriado';
}

export interface CatalogCardProps {
  item: CatalogCardItem;
  index?: number;
  onCalculateClick?: (categoryId: string) => void;
  onViewGalleryClick?: (category: CabinCategory) => void;
  onOpenVideoModal?: (video: 'sliding' | 'estriado') => void;
  onOpenDetails?: (item: CatalogCardItem) => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({
  item,
  index = 0,
  onCalculateClick,
  onViewGalleryClick,
  onOpenVideoModal,
  onOpenDetails,
}) => {
  const handleCalculate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCalculateClick) {
      onCalculateClick(item.category);
    }
    const target = document.querySelector('#calculator');
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(item);
    }
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <article 
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-3xl border border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.22)] transition-all duration-500 overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-1 cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eae6dc]">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Top Badges & Index */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="font-mono text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
            {formattedIndex} / 08
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {item.hasVideo && item.videoType && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVideoModal && onOpenVideoModal(item.videoType!);
                }}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black text-white text-[10px] font-mono tracking-wider transition-opacity shadow-sm backdrop-blur-md"
                title="Смотреть видео"
              >
                <Video className="w-3 h-3 text-[#FF2500]" />
                <span>ВИДЕО</span>
              </button>
            )}

            {item.badge && (
              <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#1a1712] font-mono text-[10px] uppercase tracking-wider font-semibold shadow-sm backdrop-blur-md">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Floating Price Pill at Bottom of Photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
          <div className="bg-white/95 border border-[rgba(26,23,18,0.08)] px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
            <span className="text-xs sm:text-sm font-extrabold text-[#1a1712] font-display">{item.priceFormatted}</span>
          </div>

          <span className="font-mono text-[10px] text-white/90 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md">
            {item.specs.productionTime}
          </span>
        </div>
      </div>

      {/* Card Content Body: Ultra-Clean Minimalist Editorial */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1a1712] mb-1.5 font-display group-hover:text-[#FF2500] transition-colors leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-[rgba(20,20,22,0.65)] line-clamp-1 mb-4">
            {item.subtitle}
          </p>
        </div>

        {/* Minimalist Action Controls */}
        <div className="pt-3 border-t border-[rgba(26,23,18,0.06)] flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            type="button"
            className="inline-flex items-center gap-1 text-xs font-mono tracking-wider uppercase text-[#7c766c] group-hover:text-[#1a1712] transition-colors"
          >
            <span>Детали</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCalculate}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1712] hover:bg-[#FF2500] text-white text-xs font-medium transition-all shadow-sm"
          >
            <Sliders className="w-3 h-3" />
            <span>Рассчитать</span>
          </button>
        </div>
      </div>
    </article>
  );
};
