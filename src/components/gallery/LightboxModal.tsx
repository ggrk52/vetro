import React, { useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Ruler, 
  MessageCircle,
  ArrowUpRight
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categoryLabel = getCabinCategoryLabel(currentItem.category);

  return (
    <div
      data-lenis-prevent
      data-testid="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии проекта"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-[#252725]/95 dark:bg-[#0D161F]/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 z-20 border-b border-white/10 dark:border-[#34434E] bg-[#252725]/80 dark:bg-[#0D161F]">
        <div className="flex items-center gap-3">
          {/* Counter Badge */}
          <span className="text-[11px] font-mono text-[#FBFAF7]/90 dark:text-[#F1F2EF] bg-white/10 dark:bg-[#14212C] border border-white/10 dark:border-[#34434E] px-2.5 py-0.5 rounded tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
          {/* Category Badge */}
          <span className="text-[11px] font-mono text-[#A68C70] dark:text-[#B2E4DD] bg-white/5 dark:bg-[#14212C] border border-white/10 dark:border-[#34434E] px-2.5 py-0.5 rounded hidden sm:inline-block">
            {categoryLabel}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть (Escape)"
          className="p-2 rounded bg-white/10 dark:bg-[#14212C] hover:bg-white/20 dark:hover:bg-[#1B2C36] text-white/80 dark:text-[#F1F2EF] hover:text-white transition-transform active:scale-95 border border-white/10 dark:border-[#34434E] dark:hover:border-[#B2E4DD] min-w-[36px] min-h-[36px] flex items-center justify-center"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Center Image Container with Navigation Arrows */}
      <div className="relative flex-1 flex items-center justify-center px-3 sm:px-16 md:px-20 py-4 overflow-hidden">
        
        {/* Prev Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          type="button"
          aria-label="Назад (Previous image)"
          className="absolute left-2 sm:left-4 z-20 p-2 sm:p-2.5 rounded bg-[#252725]/80 dark:bg-[#14212C]/90 hover:bg-[#252725] dark:hover:bg-[#1B2C36] text-white dark:text-[#B2E4DD] transition-transform active:scale-95 border border-white/20 dark:border-[#34434E] dark:hover:border-[#B2E4DD] shadow-xl flex items-center justify-center min-w-[44px] min-h-[44px]"
        >
          <ChevronLeft className="size-5 sm:size-6 lucide-chevron-left" />
        </button>

        {/* Image Display */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="relative max-h-[72vh] max-w-[92vw] sm:max-w-[85vw] flex items-center justify-center"
        >
          <img
            key={currentItem.id}
            src={currentItem.imageSrc}
            alt={currentItem.title}
            className="max-h-[72vh] max-w-full object-contain rounded border border-white/10 dark:border-[#34434E] shadow-2xl animate-in fade-in zoom-in-95 duration-150"
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
          className="absolute right-2 sm:right-4 z-20 p-2 sm:p-2.5 rounded bg-[#252725]/80 dark:bg-[#14212C]/90 hover:bg-[#252725] dark:hover:bg-[#1B2C36] text-white dark:text-[#B2E4DD] transition-transform active:scale-95 border border-white/20 dark:border-[#34434E] dark:hover:border-[#B2E4DD] shadow-xl flex items-center justify-center min-w-[44px] min-h-[44px]"
        >
          <ChevronRight className="size-5 sm:size-6 lucide-chevron-right" />
        </button>
      </div>

      {/* Bottom Info & Action Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="px-4 sm:px-8 py-4 bg-[#252725] dark:bg-[#0D161F] border-t border-white/10 dark:border-[#34434E] z-20"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Project Description & Specs */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-medium text-[#FBFAF7] dark:text-[#F1F2EF] mb-1 line-clamp-1">
              {currentItem.title}
            </h3>

            {/* Spec Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 dark:bg-[#14212C] text-white/90 dark:text-[#D1DCE1] border border-white/10 dark:border-[#34434E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                <span>{currentItem.glassType}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 dark:bg-[#14212C] text-[#A68C70] dark:text-[#B2E4DD] border border-white/10 dark:border-[#34434E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentItem.hardwareFinish}</span>
              </span>

              {currentItem.approxDimensions && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 dark:bg-[#14212C] text-white/80 dark:text-[#B7C3CA] border border-white/10 dark:border-[#34434E]">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{currentItem.approxDimensions}</span>
                </span>
              )}
            </div>

            <p className="text-xs text-white/60 dark:text-[#B7C3CA] line-clamp-2 max-w-2xl leading-relaxed">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#FBFAF7] dark:bg-[#B2E4DD] hover:bg-white dark:hover:bg-[#D3F1EB] text-[#252725] dark:text-[#102126] font-medium dark:font-semibold text-xs uppercase tracking-wider transition-colors min-h-[40px]"
              >
                <Ruler className="w-3.5 h-3.5 text-[#788173] dark:text-[#102126]" />
                <span>Заказать такой замер</span>
              </button>
            )}

            <a
              href={`${businessConfig.whatsappUrl}&text=${encodeURIComponent(`Здравствуйте! Интересует проект VETRO: ${currentItem.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-white/10 dark:bg-transparent hover:bg-white/20 dark:hover:bg-[#1B2C36] text-[#FBFAF7] dark:text-[#F1F2EF] font-medium text-xs uppercase tracking-wider transition-colors border border-white/15 dark:border-[#657881] dark:hover:border-[#B2E4DD] min-h-[40px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
              <span>Обсудить</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#B2E4DD]" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
