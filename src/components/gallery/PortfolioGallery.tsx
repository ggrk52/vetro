import React, { useState, useMemo } from 'react';
import { 
  Images, 
  ZoomIn, 
  ArrowDown
} from 'lucide-react';
import { 
  portfolioItems, 
  PortfolioItem, 
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
  { id: 'all', label: 'Все работы' },
  { id: 'corner', label: 'Угловые 90°' },
  { id: 'walkin', label: 'Walk-in' },
  { id: 'niche', label: 'Ниши' },
  { id: 'sliding', label: 'Раздвижные' },
  { id: 'bath_screen', label: 'На ванну' },
  { id: 'gold', label: 'Золото и латунь' },
  { id: 'loft', label: 'Лофт и черный' },
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
    <section id="gallery" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative overflow-hidden border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header: Minimalist Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] block mb-2 sm:mb-3">
              THE ARCHIVE / 500+ PROJECTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Реализованные объекты.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Фотографии мастера на объектах.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-sm leading-relaxed font-sans">
            Реальные работы мастера Владислава в квартирах и домах Москвы. Никаких 3D-рендеров — только стекло и фурнитура в интерьере.
          </p>
        </div>

        {/* 8 Category Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {GALLERY_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const count = tabCounts[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-200 min-h-[36px] shrink-0 border ${
                  isActive
                    ? 'bg-[#1a1712] border-[#1a1712] text-white shadow-sm'
                    : 'bg-white border-[rgba(26,23,18,0.08)] text-[#7c766c] hover:text-[#1a1712] hover:bg-[#eae6dc]/40'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-[#FF2500] text-white' : 'bg-[#f4f2ec] text-[#7c766c]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              data-testid="portfolio-card"
              onClick={() => handleOpenPhoto(index)}
              className="group relative bg-white rounded-[28px] overflow-hidden border border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)] transition-all duration-300 cursor-pointer shadow-card hover:shadow-elevated hover:-translate-y-1 flex flex-col"
            >
              {/* Image with Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#eae6dc]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-[#1a1712] border border-[rgba(26,23,18,0.08)] backdrop-blur-md shadow-sm">
                    {getCabinCategoryLabel(item.category)}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-white/95 text-[#1a1712] group-hover:bg-[#FF2500] group-hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-sm">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Spec Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm line-clamp-1">
                      {item.glassType}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/60 text-[#eae6dc] backdrop-blur-sm line-clamp-1">
                      {item.hardwareFinish}
                    </span>
                  </div>

                  {item.approxDimensions && (
                    <span className="text-[10px] text-white/80">
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
          <div className="flex flex-col items-center justify-center pt-2 pb-6">
            <button
              onClick={handleLoadMore}
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1a1712] hover:opacity-90 text-white font-semibold text-sm transition-all shadow-sm min-h-[46px] active:scale-[0.98]"
            >
              <span>Показать еще работы</span>
              <span className="text-xs text-[#FF2500] font-bold">
                (осталось {filteredItems.length - visibleCount})
              </span>
              <ArrowDown className="w-4 h-4 text-white" />
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
