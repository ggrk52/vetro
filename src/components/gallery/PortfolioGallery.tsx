import React, { useState, useMemo } from 'react';
import { 
  ZoomIn, 
  ArrowDown,
  Send,
  ArrowUpRight
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';
import { 
  portfolioItems, 
  CabinCategory,
  getCabinCategoryLabel 
} from '../../data/portfolioData';
import { LightboxModal } from './LightboxModal';

export type GalleryFilterType = 
  | 'all'
  | 'corner'
  | 'walkin'
  | 'niche'
  | 'sliding'
  | 'bath_screen'
  | 'gold'
  | 'loft';

export interface FilterTabOption {
  id: GalleryFilterType;
  label: string;
}

export const GALLERY_TABS: FilterTabOption[] = [
  { id: 'all', label: 'Все объекты' },
  { id: 'walkin', label: 'Walk-In' },
  { id: 'corner', label: 'Угловые 90°' },
  { id: 'niche', label: 'В нишу' },
  { id: 'sliding', label: 'Раздвижные' },
  { id: 'bath_screen', label: 'Шторки на ванну' },
  { id: 'gold', label: 'Золото и латунь' },
  { id: 'loft', label: 'Лофт и графит' },
];

export interface PortfolioGalleryProps {
  initialFilter?: GalleryFilterType;
  onOpenMeasurementModal?: () => void;
}

const INITIAL_VISIBLE_COUNT = 16;
const LOAD_MORE_STEP = 16;

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  initialFilter = 'all',
  onOpenMeasurementModal,
}) => {
  const [activeTab, setActiveTab] = useState<GalleryFilterType>(initialFilter);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  
  // Lightbox modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'gold') {
        const finish = item.hardwareFinish.toLowerCase();
        return finish.includes('золот') || finish.includes('латунь');
      }
      if (activeTab === 'loft') {
        const finish = item.hardwareFinish.toLowerCase();
        return item.category === 'loft' || finish.includes('черн');
      }
      return item.category === activeTab;
    });
  }, [activeTab]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<GalleryFilterType, number> = {
      all: portfolioItems.length,
      corner: portfolioItems.filter(i => i.category === 'corner').length,
      walkin: portfolioItems.filter(i => i.category === 'walkin').length,
      niche: portfolioItems.filter(i => i.category === 'niche').length,
      sliding: portfolioItems.filter(i => i.category === 'sliding').length,
      bath_screen: portfolioItems.filter(i => i.category === 'bath_screen').length,
      gold: portfolioItems.filter(i => {
        const f = i.hardwareFinish.toLowerCase();
        return f.includes('золот') || f.includes('латунь');
      }).length,
      loft: portfolioItems.filter(i => {
        const f = i.hardwareFinish.toLowerCase();
        return i.category === 'loft' || f.includes('черн');
      }).length,
    };
    return counts;
  }, []);

  const handleTabChange = (tabId: GalleryFilterType) => {
    setActiveTab(tabId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleOpenPhoto = (index: number) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredItems.length));
  };

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-[#FBFAF7] dark:bg-[#101923] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] dark:text-[#B2E4DD] block mb-2">
              ПОРТФОЛИО СТУДИИ / 500+ РЕАЛИЗАЦИЙ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] text-balance">
              Реализованные объекты.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">Чистая геометрия стекла.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Реализованные проекты VETRO в интерьерах Москвы и Московской области. Чистая эстетика, отсутствие визуального шума и точность подгонки в каждый миллиметр.
          </p>
        </div>

        {/* 8 Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {GALLERY_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const count = tabCounts[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-xs transition-colors duration-150 min-h-[32px] shrink-0 border active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#252725] dark:bg-[#B2E4DD] border-[#252725] dark:border-[#B2E4DD] text-[#FBFAF7] dark:text-[#122128] font-medium dark:font-semibold'
                    : 'bg-[#F4F2EC] dark:bg-[#14212C] border-[#DFDDD6] dark:border-[#34434E] text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded tabular-nums ${
                  isActive ? 'bg-[#788173] dark:bg-[#102126]/15 text-[#FBFAF7] dark:text-[#102126]' : 'bg-[#DFDDD6] dark:bg-[#0F1B25] text-[#252725] dark:text-[#B2E4DD]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              data-testid="portfolio-card"
              onClick={() => handleOpenPhoto(index)}
              className="group relative bg-[#F4F2EC] dark:bg-[#14212C] rounded overflow-hidden border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 cursor-pointer flex flex-col active:scale-[0.99]"
            >
              {/* Image Container with 3:4 Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E5DD] dark:bg-[#0E1822]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                
                {/* Architectural Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/85 dark:from-[#0E1822]/90 via-transparent to-[#252725]/20 dark:to-[#0E1822]/30 opacity-70 group-hover:opacity-90 transition-opacity duration-150" />

                {/* Top Badge: Category */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FBFAF7]/95 dark:bg-[#0D161F]/90 text-[#252725] dark:text-[#B2E4DD] border border-[#DFDDD6] dark:border-[#34434E] backdrop-blur-sm">
                    {getCabinCategoryLabel(item.category)}
                  </span>

                  <span className="size-7 rounded bg-[#FBFAF7]/95 dark:bg-[#0D161F]/90 text-[#252725] dark:text-[#F1F2EF] group-hover:bg-[#252725] dark:group-hover:bg-[#B2E4DD] group-hover:text-[#FBFAF7] dark:group-hover:text-[#102126] dark:border dark:border-[#34434E] flex items-center justify-center transition-colors duration-150">
                    <ZoomIn className="size-3.5" />
                  </span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-col gap-1">
                  <h3 className="text-xs sm:text-[13px] font-medium text-[#FBFAF7] dark:text-[#F1F2EF] line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Spec Chips */}
                  <div className="flex flex-wrap items-center gap-1 text-[9px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-[#252725]/80 dark:bg-[#0D161F]/90 text-[#FBFAF7]/90 dark:text-[#D8E5E9] backdrop-blur-sm border border-white/10 dark:border-[#34434E] line-clamp-1">
                      {item.glassType}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#252725]/80 dark:bg-[#0D161F]/90 text-[#A68C70] dark:text-[#B2E4DD] backdrop-blur-sm border border-white/10 dark:border-[#34434E] line-clamp-1">
                      {item.hardwareFinish}
                    </span>
                  </div>

                  {item.approxDimensions && (
                    <span className="text-[9px] font-mono text-[#FBFAF7]/70 dark:text-[#B7C3CA]">
                      Размер: {item.approxDimensions}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex flex-col items-center justify-center pt-2 pb-4">
            <button
              onClick={handleLoadMore}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs transition-colors duration-150 min-h-[44px] active:scale-[0.98]"
            >
              <span>Показать еще объекты</span>
              <span className="text-xs font-mono text-[#A68C70] dark:text-[#102126]/80">
                ({filteredItems.length - visibleCount})
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-[#FBFAF7] dark:text-[#102126]" />
            </button>
          </div>
        )}

        {/* Telegram Channel CTA Banner: More Live Examples */}
        <div className="mt-8 p-6 sm:p-8 rounded bg-[#F4F2EC] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#788173] dark:text-[#B2E4DD]">
              <Send className="size-3.5" />
              <span>Примеры наших работ · @{businessConfig.telegramChannelUsername}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#252725] dark:text-[#F1F2EF] tracking-tight">
              Свежие фото и видео с монтажей — в нашем Telegram-канале
            </h3>
            <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
              Показываем готовые душевые кабины сразу после установки, сложные примыкания и обзоры фурнитуры BOHÉME без ретуши.
            </p>
          </div>

          <a
            href={businessConfig.telegramChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs transition-colors duration-150 shrink-0 min-h-[44px] active:scale-[0.98]"
          >
            <Send className="size-3.5 text-[#A68C70] dark:text-[#102126]" />
            <span>Смотреть примеры в Telegram</span>
            <ArrowUpRight className="size-3.5 text-[#A68C70] dark:text-[#102126]" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        items={filteredItems}
        currentIndex={activePhotoIndex}
        onClose={handleCloseLightbox}
        onNavigate={(newIndex) => setActivePhotoIndex(newIndex)}
        onOpenMeasurementModal={onOpenMeasurementModal}
      />
    </section>
  );
};
