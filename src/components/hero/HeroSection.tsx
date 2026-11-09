import React, { useState } from 'react';
import { 
  MessageCircle, 
  Ruler, 
  ArrowUpRight
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
    tabLabel: '01 · Optiwhite & Gold',
    name: 'Optiwhite 10 мм · Золото PVD',
    glass: 'ESG Optiwhite 10 мм',
    hardware: 'Boheme Milano · Золото PVD',
    feature: '100% герметичность',
    image: '/portfolio/hero_optiwhite_gold.jpg',
    badge: 'OBJECT 001 · VETRO',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 01 (Optiwhite + Золото PVD). Хочу узнать стоимость по моим размерам.',
    alt: 'Душевая кабина из осветленного стекла Optiwhite с брашированной золотой фурнитурой Boheme',
  },
  {
    id: '02',
    tabLabel: '02 · Estriado Noir',
    name: 'Estriado Fluted · Grafite Noir',
    glass: 'Рифленое Estriado 10 мм',
    hardware: 'Grafite Noir · Скрытый трек',
    feature: 'Приватность и свет',
    image: '/portfolio/hero_estriado_black.jpg',
    badge: 'OBJECT 002 · VETRO',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 02 (Рифленое стекло Estriado + Графит). Хочу узнать стоимость по моим размерам.',
    alt: 'Душевая перегородка из рифленого стекла Estriado с матовой графитовой фурнитурой',
  },
  {
    id: '03',
    tabLabel: '03 · Bronze Titanium',
    name: 'Bronze Glass · Brushed Titanium',
    glass: 'ESG Bronze в массе 10 мм',
    hardware: 'Brushed Titanium · Скрытый профиль',
    feature: 'Архитектурный акцент',
    image: '/portfolio/hero_bronze_titanium.jpg',
    badge: 'OBJECT 003 · VETRO',
    whatsappMessage: 'Здравствуйте! Понравился проект VETRO 03 (Бронзовое стекло в массе + Титан). Хочу узнать стоимость по моим размерам.',
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
              Душевые кабины и перегородки по вашим размерам в Москве и МО. Монолитное закаленное стекло 8–10 мм, итальянская фурнитура Boheme Milano и личный авторский монтаж мастера Владислава.
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

          {/* Right Column: Visual Stage Showcase with Interactive Architecture Switcher */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              
              {/* Architecture Switcher Tabs */}
              <div className="flex items-center justify-between gap-1 p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-[rgba(26,23,18,0.08)] shadow-sm mb-3">
                {HERO_OBJECTS.map((obj, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-300 text-center truncate ${
                        isActive
                          ? 'bg-[#1a1712] text-white shadow-sm font-semibold'
                          : 'text-[#7c766c] hover:text-[#1a1712] hover:bg-black/5'
                      }`}
                    >
                      {obj.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Showcase Card with layered crossfading magazine photographs */}
              <div className="relative rounded-3xl overflow-hidden border border-[rgba(26,23,18,0.1)] bg-[#1a1712] shadow-elevated group aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                {HERO_OBJECTS.map((obj, idx) => (
                  <img
                    key={obj.id}
                    src={obj.image}
                    alt={obj.alt}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                      idx === selectedIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    } group-hover:scale-[1.03]`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    width="600"
                    height="800"
                  />
                ))}

                {/* Subtle cinematic gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white font-mono text-[9px] sm:text-[10px] tracking-wider pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {currentObj.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90">
                    {currentObj.glass}
                  </span>
                </div>

                {/* Bottom Interactive Spec Card */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[rgba(26,23,18,0.08)] shadow-card flex items-center justify-between z-10">
                  <div className="pr-2 min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#7c766c] block truncate">
                      {currentObj.feature}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#1a1712] block truncate">
                      {currentObj.hardware}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/79268402345?text=${encodeURIComponent(currentObj.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] font-semibold text-white bg-[#FF2500] hover:bg-[#e02000] shadow-sm active:scale-95 transition-all"
                  >
                    <span>Рассчитать</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
