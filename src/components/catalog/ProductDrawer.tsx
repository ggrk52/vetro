import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  Clock, 
  Sliders, 
  Ruler, 
  MessageCircle, 
  Video, 
  Check,
  Sparkles
} from 'lucide-react';
import { CatalogCardItem } from './CatalogCard';
import { businessConfig } from '../../data/businessConfig';

export interface ProductDrawerProps {
  item: CatalogCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCalculateClick?: (categoryId: string) => void;
  onOpenMeasurementModal?: () => void;
  onOpenVideoModal?: (video: 'sliding' | 'estriado') => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
  item,
  isOpen,
  onClose,
  onCalculateClick,
  onOpenMeasurementModal,
  onOpenVideoModal,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) {
    return null;
  }

  const handleCalculate = () => {
    onClose();
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

  const handleMeasurement = () => {
    onClose();
    if (onOpenMeasurementModal) {
      onOpenMeasurementModal();
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label={`Характеристики: ${item.title}`}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#252725]/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-full sm:max-w-md md:max-w-lg bg-[#F4F2EC] text-[#252725] border-l border-[#DFDDD6] shadow-xl flex flex-col justify-between overflow-y-auto drawer-ease animate-in slide-in-from-right"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#DFDDD6] bg-[#FBFAF7] sticky top-0 z-10 flex items-center justify-between">
            <div className="pr-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#788173] block mb-0.5">
                VETRO SPECIFICATION · {item.id.replace('cat_', '').toUpperCase()}
              </span>
              <h2 className="text-base sm:text-lg font-semibold text-[#252725] line-clamp-1">
                {item.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Закрыть"
              className="p-2 rounded bg-[#F4F2EC] hover:bg-[#E8E5DD] text-[#252725] border border-[#DFDDD6] transition-transform active:scale-[0.95] min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 space-y-6 flex-1">
            {/* Visual Photo */}
            <div className="relative aspect-[16/10] rounded overflow-hidden bg-[#E8E5DD] border border-[#DFDDD6]">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                {item.badge && (
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#FBFAF7]/95 text-[#252725] font-mono text-[10px] uppercase tracking-wider font-medium shadow-none border border-[#DFDDD6]">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.hasVideo && item.videoType && (
                <button
                  onClick={() => onOpenVideoModal && onOpenVideoModal(item.videoType!)}
                  type="button"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#252725] text-[#FBFAF7] text-xs font-mono uppercase tracking-wider hover:bg-[#383B38] transition-transform active:scale-[0.97]"
                >
                  <Video className="size-3.5 text-[#A68C70]" />
                  <span>Видео конструкции</span>
                </button>
              )}
            </div>

            {/* Price & Summary */}
            <div className="p-4 rounded bg-[#FBFAF7] border border-[#DFDDD6] flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#777A74] block">Стоимость от:</span>
                <span className="text-xl sm:text-2xl font-bold text-[#252725] font-sans tabular-nums">{item.priceFormatted}</span>
              </div>
              <span className="px-3 py-1 rounded-[2px] bg-[#F4F2EC] text-[#252725] font-mono text-xs border border-[#DFDDD6] tabular-nums">
                {item.specs.productionTime}
              </span>
            </div>

            {/* Description */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#788173] block mb-1">
                ОПИСАНИЕ КОНСТРУКЦИИ
              </span>
              <p className="text-sm text-[#777A74] leading-relaxed">
                {item.subtitle}. Индивидуальный проект по вашим размерам с выездом инженера студии VETRO на 3D-замер.
              </p>
            </div>

            {/* Engineering Specs Grid */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#788173] block mb-2.5">
                ИНЖЕНЕРНЫЕ ПАРАМЕТРЫ
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded bg-[#FBFAF7] border border-[#DFDDD6]">
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#788173]" />
                    <span className="font-mono text-[10px]">СТЕКЛО</span>
                  </div>
                  <span className="text-xs font-semibold text-[#252725] block">{item.specs.thickness}</span>
                </div>

                <div className="p-3 rounded bg-[#FBFAF7] border border-[#DFDDD6]">
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] mb-1">
                    <Award className="w-3.5 h-3.5 text-[#A68C70]" />
                    <span className="font-mono text-[10px]">ГАРАНТИЯ</span>
                  </div>
                  <span className="text-xs font-semibold text-[#252725] block">{item.specs.warranty} по договору</span>
                </div>

                <div className="p-3 rounded bg-[#FBFAF7] border border-[#DFDDD6]">
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#788173]" />
                    <span className="font-mono text-[10px]">ПРОИЗВОДСТВО</span>
                  </div>
                  <span className="text-xs font-semibold text-[#252725] block">{item.specs.productionTime}</span>
                </div>

                <div className="p-3 rounded bg-[#FBFAF7] border border-[#DFDDD6]">
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#788173]" />
                    <span className="font-mono text-[10px]">ФУРНИТУРА</span>
                  </div>
                  <span className="text-xs font-semibold text-[#252725] block">Boheme Milano</span>
                </div>
              </div>
            </div>

            {/* Hardware Finishes */}
            {item.hardwareOptions && item.hardwareOptions.length > 0 && (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#788173] block mb-2">
                  ДОСТУПНЫЕ ОТДЕЛКИ ФУРНИТУРЫ
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.hardwareOptions.map((opt, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-[2px] bg-[#FBFAF7] border border-[#DFDDD6] text-xs text-[#252725] font-mono"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Advantages List */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#788173] block mb-2">
                ТЕХНИЧЕСКИЕ ОСОБЕННОСТИ
              </span>
              <ul className="space-y-2">
                {item.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#777A74]">
                    <Check className="w-3.5 h-3.5 text-[#788173] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-[#DFDDD6] bg-[#FBFAF7] sticky bottom-0 space-y-2">
            <button
              onClick={handleCalculate}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#252725] text-[#FBFAF7] font-medium text-xs uppercase tracking-wider hover:bg-[#383B38] transition-all min-h-[44px]"
            >
              <Sliders className="w-3.5 h-3.5 text-[#A68C70]" />
              <span>Рассчитать эту модель</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleMeasurement}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded bg-[#F4F2EC] hover:bg-[#E8E5DD] text-[#252725] border border-[#DFDDD6] font-medium text-xs transition-colors min-h-[40px]"
              >
                <Ruler className="w-3.5 h-3.5 text-[#788173]" />
                <span>Заказать замер</span>
              </button>

              <a
                href={`${businessConfig.whatsappUrl}&text=${encodeURIComponent(`Здравствуйте! Интересует конструкция VETRO: ${item.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded bg-[#FBFAF7] hover:bg-[#F4F2EC] text-[#252725] border border-[#DFDDD6] font-medium text-xs transition-colors min-h-[40px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#788173]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
