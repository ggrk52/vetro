import React from 'react';
import { 
  Sliders, 
  Video, 
  ArrowUpRight,
  ArrowRight
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
      className="group relative flex flex-col bg-[#FBFAF7] rounded border border-[#DFDDD6] hover:border-[#252725] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#E8E5DD]">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges & Index */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="font-mono text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-[2px] bg-[#252725]/85 text-[#FBFAF7] backdrop-blur-sm border border-white/10 uppercase">
            {formattedIndex} / VETRO
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {item.hasVideo && item.videoType && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVideoModal && onOpenVideoModal(item.videoType!);
                }}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#252725]/85 text-[#FBFAF7] text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10 hover:bg-[#252725] transition-colors"
              >
                <Video className="w-3 h-3 text-[#A68C70]" />
                <span className="hidden sm:inline">Видео</span>
              </button>
            )}

            {item.badge && (
              <span className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-[2px] bg-[#FBFAF7]/95 text-[#252725] border border-[#DFDDD6] uppercase">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Image Overlay Tag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[#FBFAF7] font-mono text-[10px] pointer-events-none">
          <span className="tracking-wider text-[#FBFAF7]/90">{item.specs.thickness}</span>
          <span className="tracking-wider text-[#A68C70]">{item.specs.productionTime}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-[17px] font-semibold text-[#252725] leading-snug group-hover:text-[#788173] transition-colors">
              {item.title}
            </h3>
            <span className="shrink-0 font-mono text-[13px] font-semibold text-[#252725] tracking-tight whitespace-nowrap tabular-nums">
              {item.priceFormatted}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#777A74] line-clamp-2 leading-relaxed mb-4 text-pretty">
            {item.subtitle}
          </p>

          {/* Quick specs pill list */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.hardwareOptions.slice(0, 3).map((opt, i) => (
              <span key={i} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[2px] bg-[#F4F2EC] text-[#777A74] border border-[#DFDDD6]/70">
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-3 border-t border-[#DFDDD6] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#252725] hover:text-[#788173] transition-colors active:scale-[0.98]"
          >
            <span>Характеристики</span>
            <ArrowRight className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-[11px] font-mono uppercase tracking-wider text-[#252725] bg-[#F4F2EC] hover:bg-[#252725] hover:text-[#FBFAF7] border border-[#DFDDD6] hover:border-[#252725] transition-transform active:scale-[0.97]"
          >
            <Sliders className="size-3" />
            <span>Расчет</span>
          </button>
        </div>
      </div>
    </article>
  );
};
