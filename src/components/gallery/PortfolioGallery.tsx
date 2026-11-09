import React, { useState, useMemo } from 'react';
import { 
  ZoomIn, 
  ArrowDown
} from 'lucide-react';
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
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-[#FBFAF7] text-[#252725] border-b border-[#DFDDD6]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] block mb-2">
              ПОРТФОЛИО СТУДИИ / 500+ РЕАЛИЗАЦИЙ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] tracking-tight leading-[1.08]">
              Реализованные объекты.<br />
              <span className="italic text-[#788173]">Чистая геометрия стекла.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] max-w-md leading-relaxed font-sans">
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
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-all duration-200 min-h-[34px] shrink-0 border ${
                  isActive
                    ? 'bg-[#252725] border-[#252725] text-[#FBFAF7] font-medium'
                    : 'bg-[#F4F2EC] border-[#DFDDD6] text-[#777A74] hover:text-[#252725] hover:bg-[#E8E5DD]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-[2px] ${
                  isActive ? 'bg-[#788173] text-[#FBFAF7]' : 'bg-[#DFDDD6] text-[#252725]'
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
              className="group relative bg-[#F4F2EC] rounded overflow-hidden border border-[#DFDDD6] hover:border-[#252725] transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container with 3:4 Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E5DD]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                
                {/* Architectural Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/85 via-transparent to-[#252725]/20 opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge: Category */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#FBFAF7]/95 text-[#252725] border border-[#DFDDD6] backdrop-blur-sm">
                    {getCabinCategoryLabel(item.category)}
                  </span>

                  <span className="w-7 h-7 rounded-[2px] bg-[#FBFAF7]/95 text-[#252725] group-hover:bg-[#252725] group-hover:text-[#FBFAF7] flex items-center justify-center transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-col gap-1">
                  <h3 className="text-xs sm:text-[13px] font-medium text-[#FBFAF7] line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Spec Chips */}
                  <div className="flex flex-wrap items-center gap-1 text-[9px] font-mono">
                    <span className="px-1.5 py-0.5 rounded-[2px] bg-[#252725]/80 text-[#FBFAF7]/90 backdrop-blur-sm border border-white/10 line-clamp-1">
                      {item.glassType}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-[2px] bg-[#252725]/80 text-[#A68C70] backdrop-blur-sm border border-white/10 line-clamp-1">
                      {item.hardwareFinish}
                    </span>
                  </div>

                  {item.approxDimensions && (
                    <span className="text-[9px] font-mono text-[#FBFAF7]/70">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#252725] hover:bg-[#383B38] text-[#FBFAF7] font-medium text-xs uppercase tracking-wider transition-all min-h-[44px]"
            >
              <span>Показать еще объекты</span>
              <span className="text-[11px] font-mono text-[#A68C70]">
                ({filteredItems.length - visibleCount})
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-[#FBFAF7]" />
            </button>
          </div>
        )}

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
