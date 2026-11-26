import React, { useState } from 'react';
import { 
  ArrowUpRight,
  ArrowDown,
  Compass,
  Ruler
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface HeroSectionProps {
  onOpenMeasurementModal?: () => void;
}

interface HeroObject {
  id: string;
  tabLabel: string;
  name: string;
  glass: string;
  hardware: string;
  feature: string;
  image: string;
  badge: string;
  whatsappMessage: string;
  alt: string;
}

const HERO_OBJECTS: HeroObject[] = [
  {
    id: '01',
    tabLabel: '01 · Atelier Bronze',
    name: 'Atelier Walk-in · Брашированная бронза',
    glass: 'ESG Optiwhite 10 мм',
    hardware: 'Boheme Milano · Бронза',
    feature: 'Скрытый профиль в пол',
    image: 'portfolio/hero_luxury_vetro.jpg',
    badge: 'STUDIO SPEC · 01',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 01 (Atelier Bronze Walk-in). Хочу обсудить проект по моим размерам.',
    alt: 'Премиальная стеклянная душевая перегородка VETRO из осветленного стекла с бронзовой фурнитурой',
  },
  {
    id: '02',
    tabLabel: '02 · Optiwhite Gold',
    name: 'Optiwhite Monolith · Золото PVD',
    glass: 'ESG Optiwhite 10 мм',
    hardware: 'Boheme Milano · Золото PVD',
    feature: '100% гидроизоляция',
    image: 'portfolio/hero_optiwhite_gold.jpg',
    badge: 'STUDIO SPEC · 02',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 02 (Optiwhite + Золото PVD). Хочу узнать стоимость по моим размерам.',
    alt: 'Душевая кабина из осветленного стекла Optiwhite с брашированной золотой фурнитурой',
  },
  {
    id: '03',
    tabLabel: '03 · Bronze Titanium',
    name: 'Bronze Glass · Brushed Titanium',
    glass: 'ESG Bronze в массе 10 мм',
    hardware: 'Brushed Titanium · Скрытый монтаж',
    feature: 'Архитектурный акцент',
    image: 'portfolio/hero_bronze_titanium.jpg',
    badge: 'STUDIO SPEC · 03',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 03 (Бронзовое стекло в массе + Титан). Хочу рассчитать проект.',
    alt: 'Душевое ограждение из бронзового стекла в массе с брашированной фурнитурой титан',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenMeasurementModal }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentObj = HERO_OBJECTS[selectedIndex];

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

  const handleScrollToGallery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#gallery') || document.querySelector('#reviews');
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
    { num: '01', label: 'Выезд на замер', val: 'Бесплатно · до 1 мм' },
    { num: '02', label: 'Закаленное стекло', val: '8–10 мм ГОСТ 30698' },
    { num: '03', label: 'ЧПУ-обработка', val: 'Собственный цех от 5 дней' },
    { num: '04', label: 'Гарантия на монтаж', val: '1 год по договору' },
  ];

  return (
    <section className="relative pt-5 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 bg-[#F4F2EC] dark:bg-[#101A25] overflow-hidden border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Prominent Free Measurement Banner */}
        <div className="mb-5 sm:mb-6 rounded border border-[#DFDDD6] dark:border-[#B2E4DD]/40 bg-[#252725] dark:bg-[#14212C] text-[#FBFAF7] dark:text-[#F1F2EF] px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#A68C70] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              <Ruler className="w-3.5 h-3.5" />
              <span>Замер — 0 ₽</span>
            </span>
            <p className="text-xs sm:text-sm font-medium leading-snug text-[#FBFAF7] dark:text-[#F1F2EF]">
              Бесплатный выезд инженера на замер с образцами стекла и фурнитуры по Москве и МО
            </p>
          </div>

          {onOpenMeasurementModal && (
            <button
              type="button"
              onClick={onOpenMeasurementModal}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[#FBFAF7] dark:bg-[#B2E4DD] hover:bg-[#E8E5DD] dark:hover:bg-[#D3F1EB] text-[#252725] dark:text-[#102126] font-semibold text-xs transition-colors duration-150 active:scale-[0.98]"
            >
              <span>Записаться бесплатно</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Top Architectural Subtitle Bar */}
        <div className="flex items-center justify-between border-b border-[#DFDDD6] dark:border-[#34434E] pb-3 mb-6 sm:mb-8 text-xs font-mono text-[#777A74] dark:text-[#B7C3CA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#788173] dark:bg-[#B2E4DD] rounded-none rotate-45" />
            Vetro · Architectural Glass Studio
          </span>
          <span className="hidden sm:inline-block">
            Москва и Московская область
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Positioning, Dual CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-[#DFDDD6] dark:border-[#34434E] bg-[#FBFAF7] dark:bg-[#14212C] text-xs text-[#5E615B] dark:text-[#B2E4DD]">
              <Compass className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
              <span>Индивидуальное проектирование</span>
            </div>

            {/* Main H1 Title: Cormorant Garamond */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.06] mb-5 text-balance">
              Стекло, которое <span className="dark:text-[#B2E4DD]">открывает пространство.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#777A74] dark:text-[#D1DCE1] font-sans font-normal leading-relaxed max-w-xl mb-8 text-pretty">
              Душевые кабины и перегородки по индивидуальным размерам. Эстетика минимализма, европейская фурнитура Boheme Milano и точность исполнения до миллиметра.
            </p>

            {/* Dual CTAs (complies with test regexes: замер / рассчитать / whatsapp) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8 sm:mb-10">
              <button
                type="button"
                onClick={onOpenMeasurementModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-medium dark:font-semibold text-xs sm:text-sm text-[#FBFAF7] dark:text-[#102126] bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] border border-[#252725] dark:border-[#B2E4DD] transition-colors duration-150 active:scale-[0.98] min-h-[48px]"
              >
                <span>Обсудить проект</span>
                <span className="text-[11px] text-[#A68C70] dark:text-[#102126]/80 border-l border-white/20 dark:border-[#102126]/25 pl-2">Бесплатный замер</span>
                <ArrowUpRight className="size-4 text-[#A68C70] dark:text-[#102126]" />
              </button>

              <a
                href="#gallery"
                onClick={handleScrollToGallery}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-medium text-xs sm:text-sm text-[#252725] dark:text-[#F1F2EF] bg-[#FBFAF7] dark:bg-transparent hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] border border-[#DFDDD6] dark:border-[#657881] dark:hover:border-[#B2E4DD] transition-colors duration-150 active:scale-[0.98] min-h-[48px]"
              >
                <span>Смотреть наши работы</span>
                <ArrowDown className="size-4 text-[#777A74] dark:text-[#B7C3CA]" />
              </a>

              <a
                href="#calculator"
                onClick={handleScrollToCalculator}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-mono text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#B2E4DD] transition-colors"
              >
                <span>Рассчитать стоимость →</span>
              </a>
            </div>

            {/* 4 Architectural Fact Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-5 border-t border-[#DFDDD6] dark:border-[#34434E]">
              {metaSpecs.map((spec, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-[11px] text-[#788173] dark:text-[#B2E4DD] tabular-nums">
                    {spec.num} · {spec.label}
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium text-[#252725] dark:text-[#F1F2EF] mt-0.5 tabular-nums">
                    {spec.val}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Architectural Photography Showcase with Crossfade */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              
              {/* Architecture Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] mb-2.5">
                {HERO_OBJECTS.map((obj, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`py-1.5 px-2 rounded text-xs font-mono transition-colors duration-150 text-center truncate ${
                        isActive
                          ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#122128] font-medium dark:font-semibold'
                          : 'text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36]'
                      }`}
                    >
                      {obj.tabLabel.split(' · ')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Showcase Frame with crisp 4px corners and thin hairline border */}
              <div className="relative rounded overflow-hidden border border-[#DFDDD6] dark:border-[#34434E] bg-[#252725] dark:bg-[#0E1822] group aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                {HERO_OBJECTS.map((obj, idx) => (
                  <img
                    key={obj.id}
                    src={obj.image}
                    alt={obj.alt}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ease-out ${
                      idx === selectedIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    width="600"
                    height="800"
                  />
                ))}

                {/* Subtle architectural vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/80 dark:from-[#0E1822]/90 via-transparent dark:via-[#0E1822]/15 to-[#252725]/20 dark:to-[#0E1822]/30 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[#FBFAF7] dark:text-[#F1F2EF] font-mono text-[10px] pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded bg-[#252725]/85 dark:bg-[#0D161F]/90 backdrop-blur-sm border border-white/10 dark:border-[#34434E] dark:text-[#B2E4DD]">
                    {currentObj.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#252725]/85 dark:bg-[#0D161F]/90 backdrop-blur-sm border border-white/10 dark:border-[#34434E] text-[#FBFAF7]/90 dark:text-[#D8E5E9]">
                    {currentObj.glass}
                  </span>
                </div>

                {/* Bottom Architectural Spec Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-[#FBFAF7]/95 dark:bg-[#0D161F]/95 backdrop-blur-sm border border-[#DFDDD6] dark:border-[#34434E] flex items-center justify-between z-10">
                  <div className="pr-2 min-w-0">
                    <span className="font-mono text-[10px] text-[#788173] dark:text-[#B2E4DD] block truncate">
                      {currentObj.feature}
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-[#252725] dark:text-[#F1F2EF] block truncate mt-0.5">
                      {currentObj.name}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/79268402345?text=${encodeURIComponent(currentObj.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded font-mono text-xs font-medium dark:font-semibold text-[#FBFAF7] dark:text-[#102126] bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] transition-colors duration-150"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#102126]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
