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
      data-testid="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии проекта"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-[#252725]/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 z-20 border-b border-white/10 bg-[#252725]/80">
        <div className="flex items-center gap-3">
          {/* Counter Badge */}
          <span className="text-[11px] font-mono text-[#FBFAF7]/90 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-[2px]">
            {currentIndex + 1} / {items.length}
          </span>
          {/* Category Badge */}
          <span className="text-[11px] font-mono uppercase text-[#A68C70] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-[2px] hidden sm:inline-block">
            {categoryLabel}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть (Escape)"
          className="p-2 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10 min-w-[36px] min-h-[36px] flex items-center justify-center"
        >
          <X className="w-4 h-4" />
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
          className="absolute left-2 sm:left-4 z-20 p-2 sm:p-2.5 rounded bg-[#252725]/80 hover:bg-[#252725] text-white transition-all border border-white/20 shadow-xl flex items-center justify-center min-w-[42px] min-h-[42px]"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lucide-chevron-left" />
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
            className="max-h-[72vh] max-w-full object-contain rounded border border-white/10 shadow-2xl"
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
          className="absolute right-2 sm:right-4 z-20 p-2 sm:p-2.5 rounded bg-[#252725]/80 hover:bg-[#252725] text-white transition-all border border-white/20 shadow-xl flex items-center justify-center min-w-[42px] min-h-[42px]"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lucide-chevron-right" />
        </button>
      </div>

      {/* Bottom Info & Action Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="px-4 sm:px-8 py-4 bg-[#252725] border-t border-white/10 z-20"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Project Description & Specs */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-medium text-[#FBFAF7] mb-1 line-clamp-1">
              {currentItem.title}
            </h3>

            {/* Spec Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-white/10 text-white/90 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#788173]" />
                <span>{currentItem.glassType}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-white/10 text-[#A68C70] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentItem.hardwareFinish}</span>
              </span>

              {currentItem.approxDimensions && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-white/10 text-white/80 border border-white/10">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#FBFAF7] hover:bg-white text-[#252725] font-medium text-xs uppercase tracking-wider transition-colors min-h-[40px]"
              >
                <Ruler className="w-3.5 h-3.5 text-[#788173]" />
                <span>Заказать такой замер</span>
              </button>
            )}

            <a
              href={`${businessConfig.whatsappUrl}&text=${encodeURIComponent(`Здравствуйте! Интересует проект VETRO: ${currentItem.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-[#FBFAF7] font-medium text-xs uppercase tracking-wider transition-colors border border-white/15 min-h-[40px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#788173]" />
              <span>Обсудить</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A68C70]" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
