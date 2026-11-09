import React from 'react';
import { Calculator, MessageCircle, Ruler } from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface MobileStickyCtaProps {
  onOpenMeasurementModal?: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ onOpenMeasurementModal }) => {
  const handleScrollToCalculator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#calculator');
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      data-testid="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#f4f2ec]/95 backdrop-blur-md border-t border-[rgba(26,23,18,0.08)] px-3 py-2.5 shadow-subtle"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      aria-label="Быстрые действия"
    >
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        {/* Main CTA: Scroll to Calculator */}
        <a
          href="#calculator"
          onClick={handleScrollToCalculator}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-full font-semibold text-white bg-[#1a1712] hover:opacity-90 shadow-sm text-xs sm:text-sm active:scale-[0.98] transition-transform"
        >
          <Calculator className="w-4 h-4 text-[#FF2500]" />
          <span>Калькулятор</span>
        </a>

        {/* WhatsApp Quick Message Button */}
        <a
          href={businessConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full font-semibold text-white bg-[#FF2500] hover:opacity-90 shadow-sm text-xs sm:text-sm active:scale-[0.98] transition-transform shrink-0"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp</span>
        </a>

        {/* Optional quick measurement icon */}
        {onOpenMeasurementModal && (
          <button
            type="button"
            onClick={onOpenMeasurementModal}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white hover:bg-[#eae6dc] border border-[rgba(26,23,18,0.12)] text-[#1a1712] shrink-0 active:scale-[0.98] transition-transform shadow-sm"
            aria-label="Заказать бесплатный замер"
          >
            <Ruler className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
