import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Check, 
  ArrowRight, 
  Sun,
  Video,
  ArrowUpRight
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
    badge: 'Архитектурный хит',
    thickness: '8–10 мм закаленное ESG',
    lightTransmission: '99% (максимальная)',
    privacy: 'Прозрачное (0%)',
    description: 'Премиальное осветленное стекло с пониженным содержанием оксидов железа. Полностью лишено зеленоватого бутылочного оттенка, характерного для обычного стекла.',
    keyBenefits: [
      'Абсолютно прозрачный торец без зеленого оттенка',
      'Безупречная цветопередача светлого керамогранита и мрамора',
      'Идеально сочетается с фурнитурой в цвете золото, бронза и хром',
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
      '100% травмобезопасность при разрушении (мелкая безопасная крошка)'
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
    description: 'Матовое стекло с бархатистой поверхностью, созданной методом заводского химического травления. В отличие от пескоструя, не оставляет пятен от пальцев и легко моется.',
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
    badge: 'Тренд сезона',
    thickness: '8 мм закаленное ESG',
    lightTransmission: '85%',
    privacy: 'Средняя (объемное преломление)',
    description: 'Ультрамодное ребристое стекло с выразительной вертикальной полосой. Создает завораживающую объемную игру света и оптическое искажение силуэта.',
    keyBenefits: [
      'Фактурная полоса скрывает высохшие капли воды и брызги',
      'Эффектная игра световых бликов в интерьере',
      'Идеально подчеркивает фурнитуру под брашированное золото и графит',
      'Придает ванной комнате статус европейского бутик-отеля'
    ],
    recommendedFor: 'Современные дизайнерские санузлы, ар-деко, сканди, стиль джапанди и лофт',
    imageSrc: '/portfolio/hero_estriado_black.jpg',
    accentColor: 'from-amber-500/20 to-yellow-500/10',
    hasVideo: true,
  },
  {
    id: 'graphite',
    name: 'Graphite / Grey (Графит)',
    russianLabel: 'Тонированное графитовое',
    category: 'Лофт и минимализм',
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
    imageSrc: '/portfolio/hero_bronze_titanium.jpg',
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
    <section id="materials" className="py-12 sm:py-16 lg:py-20 bg-[#F4F2EC] dark:bg-[#13202A] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] dark:text-[#B2E4DD] block mb-2">
              МАТЕРИАЛЫ СТУДИИ / 06 ТИПОВ СТЕКЛА
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] text-balance">
              Закаленное стекло.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">8–10 мм по стандарту ГОСТ 30698.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Монолитное ударопрочное стекло ESG с полированной еврокромкой и гидрофобным покрытием. Физические образцы инженер привозит на замер.
          </p>
        </div>

        {/* Glass Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {glassTypesData.map((glass) => {
            const isActive = glass.id === selectedId;
            return (
              <button
                key={glass.id}
                onClick={() => handleSelectGlass(glass.id)}
                type="button"
                className={`relative flex flex-col items-start p-3.5 rounded border text-left transition-colors duration-150 min-h-[48px] active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#252725] dark:bg-[#B2E4DD] border-[#252725] dark:border-[#B2E4DD] text-[#FBFAF7] dark:text-[#122128]'
                    : 'bg-[#FBFAF7] dark:bg-[#14212C] border-[#DFDDD6] dark:border-[#34434E] text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36]'
                }`}
              >
                {glass.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded mb-1.5 ${
                    isActive 
                      ? 'bg-[#788173] dark:bg-[#102126]/15 text-[#FBFAF7] dark:text-[#102126]' 
                      : 'bg-[#DFDDD6] dark:bg-[#0F1B25] text-[#252725] dark:text-[#B2E4DD] dark:border dark:border-[#34434E]'
                  }`}>
                    {glass.badge}
                  </span>
                )}
                <span className={`text-xs sm:text-[13px] font-semibold block mb-0.5 ${isActive ? 'text-[#FBFAF7] dark:text-[#102126]' : 'text-[#252725] dark:text-[#F1F2EF]'}`}>
                  {glass.russianLabel}
                </span>
                <span className={`text-[10px] font-mono truncate w-full ${isActive ? 'text-[#FBFAF7]/70 dark:text-[#102126]/75' : 'text-[#777A74] dark:text-[#B7C3CA]'}`}>
                  {glass.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Glass Detailed Showcase Card */}
        <div className="bg-[#FBFAF7] dark:bg-[#14212C] rounded border border-[#DFDDD6] dark:border-[#34434E] p-6 sm:p-8 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Preview Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded overflow-hidden border border-[#DFDDD6] dark:border-[#34434E] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] bg-[#E8E5DD] dark:bg-[#0E1822] group">
                <img
                  src={activeGlass.imageSrc}
                  alt={activeGlass.russianLabel}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/75 dark:from-[#0E1822]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Specs on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#FBFAF7]/95 dark:bg-[#14212C]/95 text-[#252725] dark:text-[#B2E4DD] border border-[#DFDDD6] dark:border-[#34434E] backdrop-blur-sm">
                      {activeGlass.thickness}
                    </span>
                    {activeGlass.hasVideo && (
                      <button
                        onClick={() => onOpenVideoModal && onOpenVideoModal('estriado')}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] text-[10px] font-mono dark:font-semibold hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] transition-colors duration-150"
                      >
                        <Video className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#102126]" />
                        <span>Видео</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-[#FBFAF7]/90 dark:text-[#D8E5E9] bg-[#252725]/80 dark:bg-[#0D161F]/90 p-2 rounded backdrop-blur-sm border border-white/10 dark:border-[#34434E]">
                    Реальная реализация VETRO в интерьере
                  </p>
                </div>
              </div>
            </div>

            {/* Spec Details Column */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] text-[#788173] dark:text-[#B2E4DD] border border-[#DFDDD6] dark:border-[#34434E]">
                  {activeGlass.category}
                </span>
                <span className="text-xs font-mono text-[#777A74] dark:text-[#B7C3CA]">
                  Толщина: <strong className="text-[#252725] dark:text-[#F1F2EF]">{activeGlass.thickness}</strong>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] mb-3">
                {activeGlass.russianLabel} <span className="text-lg text-[#777A74] dark:text-[#B7C3CA]">({activeGlass.name})</span>
              </h3>
              
              <p className="text-[#777A74] dark:text-[#D1DCE1] text-sm leading-relaxed mb-6 font-sans">
                {activeGlass.description}
              </p>

              {/* 3 Metric Specs */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E]">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] dark:text-[#B7C3CA] mb-1">
                    <Sun className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                    <span className="font-mono text-[10px]">СВЕТ</span>
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#252725] dark:text-[#F1F2EF] block">
                    {activeGlass.lightTransmission}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] dark:text-[#B7C3CA] mb-1">
                    <Eye className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                    <span className="font-mono text-[10px]">ПРИВАТНОСТЬ</span>
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#252725] dark:text-[#F1F2EF] block">
                    {activeGlass.privacy}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#777A74] dark:text-[#B7C3CA] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#B2E4DD]" />
                    <span className="font-mono text-[10px]">СТАНДАРТ</span>
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#252725] dark:text-[#F1F2EF] block">
                    ГОСТ 30698
                  </span>
                </div>
              </div>

              {/* Key Benefits List */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#788173] dark:text-[#B2E4DD] block mb-3">
                  ПРЕИМУЩЕСТВА И ОСОБЕННОСТИ ОБРАБОТКИ
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeGlass.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#252725] dark:text-[#D1DCE1]">
                      <Check className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended For Box */}
              <div className="p-3.5 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#788173] dark:text-[#B2E4DD] block mb-1">
                  РЕКОМЕНДУЕМОЕ ПРИМЕНЕНИЕ
                </span>
                <p className="text-xs text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
                  {activeGlass.recommendedFor}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#calculator"
                  onClick={handleScrollToCalculator}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs transition-colors duration-150 min-h-[44px] active:scale-[0.98]"
                >
                  <span>Выбрать в калькуляторе</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#102126]" />
                </a>
                
                <a
                  href="#gallery"
                  onClick={handleScrollToGallery}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#FBFAF7] dark:bg-transparent hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] text-[#252725] dark:text-[#F1F2EF] border border-[#DFDDD6] dark:border-[#657881] dark:hover:border-[#B2E4DD] font-medium text-xs transition-colors duration-150 min-h-[44px] active:scale-[0.98]"
                >
                  <span>Посмотреть работы</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#777A74] dark:text-[#B7C3CA]" />
                </a>

                {onOpenMeasurementModal && (
                  <button
                    onClick={onOpenMeasurementModal}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#B2E4DD] transition-colors"
                  >
                    <span>Заказать замер с образцами →</span>
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
