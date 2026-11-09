import React, { useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Ruler, 
  Layers,
  MessageCircle
} from 'lucide-react';
import { PortfolioItem, getCabinCategoryLabel } from '../../data/portfolioData';
import { businessConfig } from '../../data/businessConfig';

export interface LightboxModalProps {
  isOpen: boolean;
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onOpenMeasurementModal?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
  onOpenMeasurementModal,
}) => {
  const currentItem = items[currentIndex] || items[0];

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    const newIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    const newIdx = (currentIndex + 1) % items.length;
    onNavigate(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation: Escape to close, ArrowLeft for prev, ArrowRight for next
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) {
    return null;
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categoryLabel = getCabinCategoryLabel(currentItem.category);

  return (
    <div
      data-testid="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии проекта"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          {/* Counter Badge */}
          <span className="text-xs font-semibold text-white/90 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md">
            {currentIndex + 1} из {items.length}
          </span>
          {/* Category Badge */}
          <span className="text-xs font-semibold text-[#FF5533] bg-[#FF2500]/15 border border-[#FF2500]/30 px-3 py-1 rounded-full hidden sm:inline-block backdrop-blur-md">
            {categoryLabel}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть (Escape)"
          className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/15 min-w-[44px] min-h-[44px] flex items-center justify-center backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Image Container with Navigation Arrows */}
      <div className="relative flex-1 flex items-center justify-center px-2 sm:px-16 md:px-20 py-2 overflow-hidden">
        
        {/* Prev Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          type="button"
          aria-label="Назад (Previous image)"
          className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/15 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center min-w-[48px] min-h-[48px] backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 lucide-chevron-left" />
        </button>

        {/* Image Display */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="relative max-h-[70vh] sm:max-h-[72vh] max-w-[92vw] sm:max-w-[85vw] flex items-center justify-center"
        >
          <img
            key={currentItem.id}
            src={currentItem.imageSrc}
            alt={currentItem.title}
            className="max-h-[70vh] sm:max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
          />
        </div>

        {/* Next Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          type="button"
          aria-label="Вперед (Next image)"
          className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/15 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center min-w-[48px] min-h-[48px] backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 lucide-chevron-right" />
        </button>
      </div>

      {/* Bottom Info & Action Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="px-4 sm:px-8 py-4 sm:py-5 bg-gradient-to-t from-black via-[#141414]/95 to-transparent border-t border-white/10 z-20"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Project Description & Specs */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 line-clamp-1 font-display">
              {currentItem.title}
            </h3>

            {/* Spec Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{currentItem.glassType}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentItem.hardwareFinish}</span>
              </span>

              {currentItem.approxDimensions && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10 font-medium">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{currentItem.approxDimensions}</span>
                </span>
              )}
            </div>

            <p className="text-xs text-white/60 line-clamp-2 max-w-2xl leading-relaxed">
              {currentItem.description}
            </p>
          </div>

          {/* Right: Conversion Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenMeasurementModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenMeasurementModal();
                }}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FF2500] hover:bg-[#e02000] text-white font-medium text-xs tracking-tight transition-colors shadow-sm min-h-[44px]"
              >
                <Ruler className="w-4 h-4" />
                <span>Хочу такую же</span>
              </button>
            )}

            <a
              href={`${businessConfig.whatsappUrl}&text=${encodeURIComponent(`Здравствуйте! Интересует проект VETRO: ${currentItem.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-tight transition-colors border border-white/10 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Узнать цену</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
