import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sliders, 
  Sun,
  Video
} from 'lucide-react';

export interface GlassType {
  id: 'optiwhite' | 'float' | 'matelux' | 'estriado' | 'graphite' | 'bronze';
  name: string;
  russianLabel: string;
  category: string;
  badge?: string;
  thickness: string;
  lightTransmission: string;
  privacy: string;
  description: string;
  keyBenefits: string[];
  recommendedFor: string;
  imageSrc: string;
  accentColor: string;
  hasVideo?: boolean;
}

export const glassTypesData: GlassType[] = [
  {
    id: 'optiwhite',
    name: 'Optiwhite (Extra Clear)',
    russianLabel: 'Осветленное стекло',
    category: 'Кристальная прозрачность',
    badge: 'Хит продаж',
    thickness: '8–10 мм закаленное ESG',
    lightTransmission: '99% (максимальная)',
    privacy: 'Прозрачное (0%)',
    description: 'Премиальное осветленное стекло с пониженным содержанием оксида железа. Полностью лишено зеленоватого бутылочного оттенка, характерного для обычного стекла.',
    keyBenefits: [
      'Абсолютно прозрачный торец без зеленого оттенка',
      'Безупречная цветопередача светлой плитки и мозаики',
      'Идеально сочетается с фурнитурой в цвете золото и хром',
      'Закалка по ГОСТ 30698-2014 с полированной еврокромкой'
    ],
    recommendedFor: 'Белый мрамор, керамогранит светлых оттенков, премиальные дизайнерские санузлы',
    imageSrc: '/portfolio/hero_optiwhite_gold.jpg',
    accentColor: 'from-sky-500/20 to-cyan-500/10',
  },
  {
    id: 'float',
    name: 'Float Clear (Бесцветное)',
    russianLabel: 'Бесцветное закаленное',
    category: 'Классическое решение',
    thickness: '8–10 мм закаленное ESG',
    lightTransmission: '89%',
    privacy: 'Прозрачное (0%)',
    description: 'Надежное прозрачное закаленное стекло высшей марки М1 с благородным естественным бирюзовым оттенком на полированной кромке.',
    keyBenefits: [
      'Оптимальное соотношение премиального качества и цены',
      'Высокая механическая прочность к ударам и термоперепадам',
      'Универсально сочетается с любыми стилями и интерьерами',
      '100% травмобезопасность при разрушении (мелкая крошка)'
    ],
    recommendedFor: 'Универсальное решение для любых санузлов, арендных квартир и семейных ванных комнат',
    imageSrc: '/portfolio/corner_03.jpg',
    accentColor: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'matelux',
    name: 'Matelux / Сатинат',
    russianLabel: 'Матовое шелковистое',
    category: 'Приватность и мягкий свет',
    badge: '100% Приватность',
    thickness: '8–10 мм закаленное ESG',
    lightTransmission: '65% (рассеянный)',
    privacy: 'Высокая (силуэт размыт)',
    description: 'Матовое стекло с бархатистой поверхностью, созданной методом заводского химического травления. В отличие от дешевого пескоструя, не оставляет пятен от пальцев и легко моется.',
    keyBenefits: [
      'Мягкое рассеивание света без видимости силуэта',
      'Химическое травление — не впитывает жир и известковый налет',
      'Шелковистая тактильная текстура soft-touch',
      'Возможность частичного матирования полосой (интим-зона)'
    ],
    recommendedFor: 'Совмещенные санузлы, спа-зоны, душевые напротив дверей и окон',
    imageSrc: '/portfolio/corner_04.jpg',
    accentColor: 'from-slate-400/20 to-slate-200/10',
  },
  {
    id: 'estriado',
    name: 'Estriado / Fluted (Рифленое)',
    russianLabel: 'Рифленое фактурное',
    category: 'Дизайнерский тренд',
    badge: 'Тренд 2025–2026',
    thickness: '8 мм закаленное ESG',
    lightTransmission: '85%',
    privacy: 'Средняя (объемное преломление)',
    description: 'Ультрамодное ребристое стекло с выразительной вертикальной полосой. Создает завораживающую объемную игру света и оптическое искажение силуэта.',
    keyBenefits: [
      'Фактурная полоса скрывает высохшие капли воды и брызги',
      'Эффектная игра световых бликов в интерьере',
      'Идеально подчеркивает фурнитуру под брашированное золото и черный лофт',
      'Придает ванной комнате статус дорогого бутик-отеля'
    ],
    recommendedFor: 'Современные дизайнерские санузлы, ар-деко, сканди, стиль джапанди и лофт',
    imageSrc: '/portfolio/walkin_01.jpg',
    accentColor: 'from-amber-500/20 to-yellow-500/10',
    hasVideo: true,
  },
  {
    id: 'graphite',
    name: 'Graphite / Grey (Графит)',
    russianLabel: 'Тонированное графитовое',
    category: 'Лофт и хай-тек',
    badge: 'Стиль Лофт',
    thickness: '8–10 мм закаленное ESG',
    lightTransmission: '45% (затемненное)',
    privacy: 'Средняя (дымчатый тон)',
    description: 'Стекло глубокого дымчато-серого оттенка, тонированное в массе на этапе варки. Цвет никогда не выцветает, не смывается и устойчив к любым моющим средствам.',
    keyBenefits: [
      'Глубокий дымчатый цвет по всей толщине стекла',
      'Идеально сочетается с черной матовой фурнитурой и бетоном',
      'Снижает визуальный шум внутри душевой зоны',
      'Создает интимную, камерную атмосферу расслабления'
    ],
    recommendedFor: 'Интерьеры в стиле лофт, минимализм, хай-тек, темный керамогранит и сланец',
    imageSrc: '/portfolio/corner_06.jpg',
    accentColor: 'from-zinc-500/20 to-neutral-700/10',
  },
  {
    id: 'bronze',
    name: 'Bronze (Бронза)',
    russianLabel: 'Тонированное бронзовое',
    category: 'Теплый уют',
    thickness: '8–10 мм закаленное ESG',
    lightTransmission: '50% (теплое затемнение)',
    privacy: 'Средняя (шоколадный тон)',
    description: 'Благородное стекло теплого кофейно-чайного оттенка, тонированное в массе. Наполняет ванную комнату мягким золотисто-янтарным светом.',
    keyBenefits: [
      'Теплый карамельно-бронзовый фильтр естественного света',
      'Идеальная гармония со структурой дерева и бежевым травертином',
      'Безупречное сочетание с бронзовыми и латунными смесителями',
      'Устойчиво к ультрафиолету и влаге на весь срок службы'
    ],
    recommendedFor: 'Теплые интерьеры с деревом, натуральным камнем, травертином и латунью',
    imageSrc: '/portfolio/sliding_05.jpg',
    accentColor: 'from-orange-500/20 to-amber-700/10',
  },
];

export interface GlassShowcaseProps {
  onSelectGlass?: (glassId: string) => void;
  onOpenVideoModal?: (video: 'sliding' | 'estriado') => void;
  onOpenMeasurementModal?: () => void;
}

export const GlassShowcase: React.FC<GlassShowcaseProps> = ({
  onSelectGlass,
  onOpenVideoModal,
  onOpenMeasurementModal,
}) => {
  const [selectedId, setSelectedId] = useState<GlassType['id']>('optiwhite');
  const activeGlass = glassTypesData.find((g) => g.id === selectedId) || glassTypesData[0];

  const handleSelectGlass = (id: GlassType['id']) => {
    setSelectedId(id);
    if (onSelectGlass) {
      onSelectGlass(id);
    }
  };

  const handleScrollToCalculator = (e: React.MouseEvent) => {
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

  const handleScrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#gallery');
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

  return (
    <section id="materials" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative overflow-hidden border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header: Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] block mb-2 sm:mb-3">
              THE MATERIALS / 06 GLASS TYPES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Закаленное стекло.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">8–10 мм по стандарту ГОСТ.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-sm leading-relaxed font-sans">
            Монолитное ударопрочное стекло ESG с полированной еврокромкой. Образцы мастер привозит на замер.
          </p>
        </div>

        {/* Glass Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {glassTypesData.map((glass) => {
            const isActive = glass.id === selectedId;
            return (
              <button
                key={glass.id}
                onClick={() => handleSelectGlass(glass.id)}
                type="button"
                className={`relative flex flex-col items-start p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 min-h-[48px] ${
                  isActive
                    ? 'bg-white border-[#1a1712] shadow-subtle'
                    : 'bg-white/60 border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)] hover:bg-white text-[#7c766c]'
                }`}
              >
                {glass.badge && (
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${
                    isActive 
                      ? 'bg-[#1a1712] text-white' 
                      : 'bg-[#eae6dc] text-[#7c766c]'
                  }`}>
                    {glass.badge}
                  </span>
                )}
                <span className="text-sm font-bold text-[#1a1712] block mb-0.5">
                  {glass.russianLabel}
                </span>
                <span className="text-xs text-[#7c766c] block truncate w-full">
                  {glass.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Glass Detailed Showcase Card */}
        <div className="bg-white rounded-[32px] border border-[rgba(26,23,18,0.08)] p-6 sm:p-8 lg:p-10 mb-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Preview Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[24px] overflow-hidden border border-[rgba(26,23,18,0.08)] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] shadow-card group">
                <img
                  src={activeGlass.imageSrc}
                  alt={activeGlass.russianLabel}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                
                {/* Floating Specs on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/95 text-[#1a1712] border border-[rgba(26,23,18,0.08)] backdrop-blur-md shadow-sm">
                      {activeGlass.thickness}
                    </span>
                    {activeGlass.hasVideo && (
                      <button
                        onClick={() => onOpenVideoModal && onOpenVideoModal('estriado')}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1712] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <Video className="w-3.5 h-3.5 text-[#FF2500]" />
                        <span>Видео в интерьере</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/90 bg-black/60 p-2.5 rounded-xl backdrop-blur-md">
                    Реальное фото из проекта мастера Владислава в Москве
                  </p>
                </div>
              </div>
            </div>

            {/* Spec Details Column */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#eae6dc] text-[#1a1712]">
                  {activeGlass.category}
                </span>
                <span className="text-xs text-[#7c766c]">
                  Толщина: <strong className="text-[#1a1712]">{activeGlass.thickness}</strong>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a1712] mb-3 font-display">
                {activeGlass.russianLabel} ({activeGlass.name})
              </h3>
              
              <p className="text-[rgba(20,20,22,0.65)] text-sm sm:text-base leading-relaxed mb-6">
                {activeGlass.description}
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)]">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7c766c] mb-1">
                    <Sun className="w-3.5 h-3.5 text-[#1a1712]" />
                    <span>Свет</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1a1712] block">
                    {activeGlass.lightTransmission}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7c766c] mb-1">
                    <Eye className="w-3.5 h-3.5 text-[#1a1712]" />
                    <span>Приватность</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1a1712] block">
                    {activeGlass.privacy}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7c766c] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF2500]" />
                    <span>Стандарт</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1a1712] block">
                    ГОСТ 30698
                  </span>
                </div>
              </div>

              {/* Key Benefits List */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7c766c] mb-3">
                  Преимущества и особенности обработки:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeGlass.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#1a1712]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF2500] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended For Box */}
              <div className="p-4 rounded-2xl bg-[#eae6dc]/60 border border-[rgba(26,23,18,0.06)] mb-8">
                <span className="text-xs font-bold text-[#1a1712] uppercase tracking-wider block mb-1">
                  Рекомендуемое применение:
                </span>
                <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.7)] leading-relaxed">
                  {activeGlass.recommendedFor}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#calculator"
                  onClick={handleScrollToCalculator}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1a1712] text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-sm min-h-[46px]"
                >
                  <Sliders className="w-4 h-4 text-[#FF2500]" />
                  <span>Выбрать в калькуляторе</span>
                </a>
                
                <a
                  href="#gallery"
                  onClick={handleScrollToGallery}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#eae6dc] text-[#1a1712] font-semibold text-sm transition-all border border-[rgba(26,23,18,0.12)] shadow-card min-h-[46px]"
                >
                  <span>Посмотреть работы</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {onOpenMeasurementModal && (
                  <button
                    onClick={onOpenMeasurementModal}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-black/5 text-[#1a1712] font-semibold text-sm transition-all min-h-[46px]"
                  >
                    <span>Заказать замер с образцами</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
