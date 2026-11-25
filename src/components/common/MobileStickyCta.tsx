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
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#F4F2EC]/95 dark:bg-[#0D161F]/95 backdrop-blur-md border-t border-[#DFDDD6] dark:border-[#34434E] px-3 py-2 shadow-lg"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      aria-label="Быстрые действия"
    >
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        {/* Main CTA: Scroll to Calculator */}
        <a
          href="#calculator"
          onClick={handleScrollToCalculator}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded font-medium dark:font-semibold text-[#FBFAF7] dark:text-[#102126] bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-xs uppercase tracking-wider active:scale-[0.97] transition-colors"
        >
          <Calculator className="size-3.5 text-[#A68C70] dark:text-[#102126]" />
          <span>Калькулятор</span>
        </a>

        {/* WhatsApp Quick Message Button */}
        <a
          href={businessConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded font-medium text-[#252725] dark:text-[#F1F2EF] bg-[#FBFAF7] dark:bg-[#14212C] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] border border-[#DFDDD6] dark:border-[#34434E] dark:hover:border-[#B2E4DD] text-xs uppercase tracking-wider active:scale-[0.97] transition-colors shrink-0"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
          <span>WhatsApp</span>
        </a>

        {/* Optional quick measurement icon */}
        {onOpenMeasurementModal && (
          <button
            type="button"
            onClick={onOpenMeasurementModal}
            className="size-10 flex items-center justify-center rounded bg-[#FBFAF7] dark:bg-[#14212C] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] border border-[#DFDDD6] dark:border-[#34434E] dark:hover:border-[#B2E4DD] text-[#252725] dark:text-[#B2E4DD] shrink-0 active:scale-[0.97] transition-colors"
            aria-label="Заказать бесплатный замер"
          >
            <Ruler className="size-4 text-[#788173] dark:text-[#B2E4DD]" />
          </button>
        )}
      </div>
    </div>
  );
};
