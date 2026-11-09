import React from 'react';
import { 
  MessageCircle, 
  Ruler, 
  Calculator, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface HeroSectionProps {
  onOpenMeasurementModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenMeasurementModal }) => {
  const handleScrollToCalculator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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

  const metaSpecs = [
    { label: '01 / ТОЧНОСТЬ', val: 'Лазерный замер 1 мм' },
    { label: '02 / СТЕКЛО', val: '8–10 мм ESG Optiwhite' },
    { label: '03 / СРОК', val: 'Монтаж от 5 дней' },
    { label: '04 / СТАНДАРТ', val: 'ГОСТ и договор' },
  ];

  return (
    <section className="relative pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 overflow-hidden bg-[#f4f2ec]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Top Minimalist Strip */}
        <div className="flex items-center justify-between border-b border-[rgba(26,23,18,0.08)] pb-2.5 mb-5 sm:mb-6 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] text-[#7c766c]">
          <span>VETRO · АВТОРСКИЕ СТЕКЛЯННЫЕ КОНСТРУКЦИИ</span>
          <span className="hidden sm:inline-block">МОСКВА И МО · EST. 2015</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Heading, Value Props, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#7c766c] mb-2 sm:mb-3 block">
              INDIVIDUAL ARCHITECTURAL GLASS
            </span>

            {/* Main H1 Title: Minimalist & Editorial */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-light text-[#1a1712] tracking-tight leading-[1.04] mb-4 sm:mb-5 font-sans">
              Стеклянные душевые.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Чистота формы.</em>
            </h1>

            {/* Subtitle: Short, Authoritative */}
            <p className="text-sm sm:text-base md:text-lg text-[rgba(20,20,22,0.7)] leading-relaxed max-w-xl mb-5 sm:mb-7 font-sans">
              Душевые кабины и перегородки по вашим размерам в Москве и МО. Монолитное стекло 8–10 мм, итальянская фурнитура Boheme Milano и личный монтаж мастера Владислава.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto mb-6 sm:mb-7">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-white bg-[#FF2500] hover:bg-[#e02000] shadow-sm active:scale-[0.98] transition-all text-xs sm:text-sm min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Рассчитать в WhatsApp ↗</span>
              </a>

              <button
                type="button"
                onClick={onOpenMeasurementModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-[#1a1712] bg-white hover:bg-[#eae6dc] border border-[rgba(26,23,18,0.12)] shadow-card transition-all active:scale-[0.98] text-xs sm:text-sm min-h-[44px]"
              >
                <Ruler className="w-4 h-4 text-[#1a1712]" />
                <span>Заказать замер 24ч</span>
              </button>

              <a
                href="#calculator"
                onClick={handleScrollToCalculator}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full font-mono text-xs uppercase tracking-wider text-[#7c766c] hover:text-[#1a1712] transition-colors"
              >
                <span>Калькулятор ↓</span>
              </a>
            </div>

            {/* Technical Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full pt-3.5 border-t border-[rgba(26,23,18,0.08)]">
              {metaSpecs.map((spec, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#7c766c] uppercase tracking-wider">{spec.label}</span>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#1a1712] mt-0.5">{spec.val}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Visual Stage Showcase */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              <div className="relative rounded-3xl overflow-hidden border border-[rgba(26,23,18,0.1)] bg-[#e6e3dd] shadow-elevated group">
                <img
                  src="/portfolio/hero_optiwhite_gold.jpg"
                  alt="Душевая кабина из осветленного стекла Optiwhite с брашированной золотой фурнитурой Boheme"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[460px] xl:h-[490px] object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="eager"
                  width="600"
                  height="700"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                {/* Top Badge: Monospace identifier */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white font-mono text-[9px] sm:text-[10px] tracking-wider pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                    OBJECT 001 · VETRO
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                    OPTIWHITE 8 MM
                  </span>
                </div>

                {/* Bottom Spec Tag */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[rgba(26,23,18,0.08)] shadow-card flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#7c766c] block">ФУРНИТУРА</span>
                    <span className="text-xs font-bold text-[#1a1712]">Boheme Milano · Золото PVD</span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#FF2500]">
                    100% ГЕРМЕТИЧНОСТЬ
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
