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
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#F4F2EC]/95 backdrop-blur-md border-t border-[#DFDDD6] px-3 py-2 shadow-lg"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      aria-label="Быстрые действия"
    >
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        {/* Main CTA: Scroll to Calculator */}
        <a
          href="#calculator"
          onClick={handleScrollToCalculator}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded font-medium text-[#FBFAF7] bg-[#252725] hover:bg-[#383B38] text-xs uppercase tracking-wider active:scale-[0.97] transition-transform"
        >
          <Calculator className="size-3.5 text-[#A68C70]" />
          <span>Калькулятор</span>
        </a>

        {/* WhatsApp Quick Message Button */}
        <a
          href={businessConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded font-medium text-[#252725] bg-[#FBFAF7] hover:bg-[#E8E5DD] border border-[#DFDDD6] text-xs uppercase tracking-wider active:scale-[0.97] transition-transform shrink-0"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="size-3.5 text-[#788173]" />
          <span>WhatsApp</span>
        </a>

        {/* Optional quick measurement icon */}
        {onOpenMeasurementModal && (
          <button
            type="button"
            onClick={onOpenMeasurementModal}
            className="size-10 flex items-center justify-center rounded bg-[#FBFAF7] hover:bg-[#E8E5DD] border border-[#DFDDD6] text-[#252725] shrink-0 active:scale-[0.97] transition-transform"
            aria-label="Заказать бесплатный замер"
          >
            <Ruler className="size-4 text-[#788173]" />
          </button>
        )}
      </div>
    </div>
  );
};
