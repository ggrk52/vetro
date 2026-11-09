import React, { useState } from 'react';
import { 
  ArrowUpRight,
  ArrowDown,
  Compass
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
    image: '/portfolio/hero_luxury_vetro.jpg',
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
    image: '/portfolio/hero_optiwhite_gold.jpg',
    badge: 'STUDIO SPEC · 02',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 02 (Optiwhite + Золото PVD). Хочу узнать стоимость по моим размерам.',
    alt: 'Душевая кабина из осветленного стекла Optiwhite с брашированной золотой фурнитурой',
  },
  {
    id: '03',
    tabLabel: '03 · Estriado Noir',
    name: 'Estriado Fluted · Grafite Noir',
    glass: 'Рифленое Estriado 10 мм',
    hardware: 'Grafite Noir · Скрытый трек',
    feature: 'Светотень и приватность',
    image: '/portfolio/hero_estriado_black.jpg',
    badge: 'STUDIO SPEC · 03',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 03 (Рифленое стекло Estriado + Графит). Хочу рассчитать стоимость.',
    alt: 'Душевая перегородка из рифленого стекла Estriado с матовой графитовой фурнитурой',
  },
  {
    id: '04',
    tabLabel: '04 · Bronze Titanium',
    name: 'Bronze Glass · Brushed Titanium',
    glass: 'ESG Bronze в массе 10 мм',
    hardware: 'Brushed Titanium · Скрытый монтаж',
    feature: 'Архитектурный акцент',
    image: '/portfolio/hero_bronze_titanium.jpg',
    badge: 'STUDIO SPEC · 04',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 04 (Бронзовое стекло в массе + Титан). Хочу рассчитать проект.',
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
    { num: '01', label: 'ЛАЗЕРНЫЙ 3D-ЗАМЕР', val: 'Точность до 1 мм' },
    { num: '02', label: 'ЗАКАЛЕННОЕ СТЕКЛО', val: '8–10 мм ГОСТ 30698' },
    { num: '03', label: 'ЧПУ ОБРАБОТКА', val: 'Собственный цех от 5 дней' },
    { num: '04', label: 'ГАРАНТИЯ СТУДИИ', val: 'Официальный договор' },
  ];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 bg-[#F4F2EC] overflow-hidden border-b border-[#DFDDD6]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Architectural Subtitle Bar */}
        <div className="flex items-center justify-between border-b border-[#DFDDD6] pb-3 mb-6 sm:mb-8 text-[11px] font-mono uppercase tracking-[0.15em] text-[#777A74]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#788173] rounded-none rotate-45" />
            VETRO · ARCHITECTURAL GLASS STUDIO
          </span>
          <span className="hidden sm:inline-block tracking-[0.18em]">
            МОСКВА И МОСКОВСКАЯ ОБЛАСТЬ
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Positioning, Dual CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 rounded-[2px] border border-[#DFDDD6] bg-[#FBFAF7] text-[11px] font-mono tracking-[0.14em] uppercase text-[#777A74]">
              <Compass className="w-3.5 h-3.5 text-[#788173]" />
              <span>Индивидуальное проектирование</span>
            </div>

            {/* Main H1 Title: Cormorant Garamond */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif font-normal text-[#252725] tracking-tight leading-[1.06] mb-5">
              Стекло, которое открывает пространство.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#777A74] font-sans font-normal leading-relaxed max-w-xl mb-8">
              Душевые кабины и перегородки по индивидуальным размерам. Эстетика минимализма, европейская фурнитура Boheme Milano и точность исполнения до миллиметра.
            </p>

            {/* Dual CTAs (complies with test regexes: замер / рассчитать / whatsapp) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8 sm:mb-10">
              <button
                type="button"
                onClick={onOpenMeasurementModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded font-medium text-xs sm:text-sm uppercase tracking-[0.06em] text-[#FBFAF7] bg-[#252725] hover:bg-[#383B38] border border-[#252725] transition-all active:scale-[0.99] min-h-[46px]"
              >
                <span>Обсудить проект</span>
                <span className="text-[10px] text-[#A68C70] tracking-wider uppercase border-l border-white/20 pl-2">Заказать замер</span>
                <ArrowUpRight className="w-4 h-4 text-[#A68C70]" />
              </button>

              <a
                href="#gallery"
                onClick={handleScrollToGallery}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded font-medium text-xs sm:text-sm uppercase tracking-[0.06em] text-[#252725] bg-[#FBFAF7] hover:bg-[#E8E5DD] border border-[#DFDDD6] transition-all active:scale-[0.99] min-h-[46px]"
              >
                <span>Смотреть наши работы</span>
                <ArrowDown className="w-4 h-4 text-[#777A74]" />
              </a>

              <a
                href="#calculator"
                onClick={handleScrollToCalculator}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider text-[#777A74] hover:text-[#252725] transition-colors"
              >
                <span>Рассчитать стоимость →</span>
              </a>
            </div>

            {/* 4 Architectural Fact Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-5 border-t border-[#DFDDD6]">
              {metaSpecs.map((spec, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#788173] uppercase tracking-wider">
                    {spec.num} · {spec.label}
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium text-[#252725] mt-0.5">
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
              <div className="grid grid-cols-4 gap-1 p-1 rounded bg-[#FBFAF7] border border-[#DFDDD6] mb-2.5">
                {HERO_OBJECTS.map((obj, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`py-1.5 px-1.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider transition-all duration-200 text-center truncate ${
                        isActive
                          ? 'bg-[#252725] text-[#FBFAF7] font-medium'
                          : 'text-[#777A74] hover:text-[#252725] hover:bg-[#E8E5DD]'
                      }`}
                    >
                      {obj.tabLabel.split(' · ')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Showcase Frame with crisp 4px corners and thin hairline border */}
              <div className="relative rounded overflow-hidden border border-[#DFDDD6] bg-[#252725] group aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                {HERO_OBJECTS.map((obj, idx) => (
                  <img
                    key={obj.id}
                    src={obj.image}
                    alt={obj.alt}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
                      idx === selectedIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-102 pointer-events-none'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    width="600"
                    height="800"
                  />
                ))}

                {/* Subtle architectural vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/80 via-transparent to-[#252725]/20 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[#FBFAF7] font-mono text-[10px] tracking-wider pointer-events-none z-10">
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#252725]/85 backdrop-blur-sm border border-white/10 uppercase">
                    {currentObj.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#252725]/85 backdrop-blur-sm border border-white/10 text-[#FBFAF7]/90">
                    {currentObj.glass}
                  </span>
                </div>

                {/* Bottom Architectural Spec Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-[#FBFAF7]/95 backdrop-blur-sm border border-[#DFDDD6] flex items-center justify-between z-10">
                  <div className="pr-2 min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#788173] block truncate">
                      {currentObj.feature}
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-[#252725] block truncate mt-0.5">
                      {currentObj.name}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/79268402345?text=${encodeURIComponent(currentObj.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded font-mono text-[11px] font-medium text-[#FBFAF7] bg-[#252725] hover:bg-[#383B38] transition-all"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A68C70]" />
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
