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
  videoType?: 'sliding';
}

export interface CatalogCardProps {
  item: CatalogCardItem;
  index?: number;
  onCalculateClick?: (categoryId: string) => void;
  onViewGalleryClick?: (category: CabinCategory) => void;
  onOpenVideoModal?: (video: 'sliding') => void;
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
      className="group relative flex flex-col bg-[#FBFAF7] dark:bg-[#14212C] rounded border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#E8E5DD] dark:bg-[#0E1822]">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="w-full h-full object-cover transition-opacity duration-300 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/60 dark:from-[#0E1822]/85 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges & Index */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-[#252725]/85 dark:bg-[#0D161F]/90 text-[#FBFAF7] dark:text-[#F1F2EF] backdrop-blur-sm border border-white/10 dark:border-[#34434E]">
            {formattedIndex} / Vetro
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {item.hasVideo && item.videoType && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVideoModal && onOpenVideoModal(item.videoType!);
                }}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#252725]/85 dark:bg-[#0D161F]/90 text-[#FBFAF7] dark:text-[#F1F2EF] text-[10px] font-mono backdrop-blur-sm border border-white/10 dark:border-[#34434E] hover:bg-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150"
              >
                <Video className="w-3 h-3 text-[#A68C70] dark:text-[#B2E4DD]" />
                <span className="hidden sm:inline">Видео</span>
              </button>
            )}

            {item.badge && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FBFAF7]/95 dark:bg-[#14212C]/95 text-[#252725] dark:text-[#B2E4DD] border border-[#DFDDD6] dark:border-[#34434E]">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Image Overlay Tag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[#FBFAF7] dark:text-[#F1F2EF] font-mono text-[10px] pointer-events-none">
          <span className="text-[#FBFAF7]/90 dark:text-[#D1DCE1]">{item.specs.thickness}</span>
          <span className="text-[#A68C70] dark:text-[#B2E4DD]">{item.specs.productionTime}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-[17px] font-semibold text-[#252725] dark:text-[#F1F2EF] leading-snug group-hover:text-[#788173] dark:group-hover:text-[#B2E4DD] transition-colors duration-150">
              {item.title}
            </h3>
            <span className="shrink-0 font-mono text-[13px] font-semibold text-[#252725] dark:text-[#B2E4DD] tracking-tight whitespace-nowrap tabular-nums">
              {item.priceFormatted}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#777A74] dark:text-[#B7C3CA] line-clamp-2 leading-relaxed mb-4 text-pretty">
            {item.subtitle}
          </p>

          {/* Quick specs pill list */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.hardwareOptions.slice(0, 3).map((opt, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] text-[#777A74] dark:text-[#B7C3CA] border border-[#DFDDD6]/70 dark:border-[#34434E]">
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-3 border-t border-[#DFDDD6] dark:border-[#34434E] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#252725] dark:text-[#F1F2EF] hover:text-[#788173] dark:hover:text-[#B2E4DD] transition-colors duration-150 active:scale-[0.98]"
          >
            <span>Характеристики</span>
            <ArrowRight className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#252725] dark:text-[#F1F2EF] bg-[#F4F2EC] dark:bg-[#0F1B25] hover:bg-[#252725] dark:hover:bg-[#B2E4DD] hover:text-[#FBFAF7] dark:hover:text-[#102126] border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 active:scale-[0.98]"
          >
            <Sliders className="size-3" />
            <span>Расчет</span>
          </button>
        </div>
      </div>
    </article>
  );
};
