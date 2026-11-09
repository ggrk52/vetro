import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Wrench, 
  Droplet, 
  ArrowRight
} from 'lucide-react';

export interface HardwareFinish {
  id: 'black' | 'gold' | 'gunmetal' | 'chrome' | 'satin' | 'white' | 'bronze';
  name: string;
  englishName: string;
  category: string;
  hex: string;
  gradient: string;
  badge?: string;
  coatingTech: string;
  description: string;
  bestFor: string;
  sampleProject: string;
  sampleTitle: string;
}

export const hardwareFinishesData: HardwareFinish[] = [
  {
    id: 'black',
    name: 'Черный матовый (Loft)',
    englishName: 'Matte Black Soft-Touch',
    category: 'Лофт и геометрия',
    hex: '#18181b',
    gradient: 'from-zinc-900 via-neutral-900 to-black',
    badge: 'Топ-выбор',
    coatingTech: 'Порошковая полимеризация высокой адгезии',
    description: 'Глубокий бархатистый черный оттенок без глянцевых бликов. Устойчив к царапинам, истиранию и агрессивным моющим средствам.',
    bestFor: 'Санузлы в стиле лофт, минимализм, плитка под серый бетон и белый мрамор Calacatta.',
    sampleProject: '/portfolio/corner_02.jpg',
    sampleTitle: 'Угловая кабина с черным матовым профилем и петлями',
  },
  {
    id: 'gold',
    name: 'Брашированное золото',
    englishName: 'Brushed Gold (Латунь)',
    category: 'Премиум и роскошь',
    hex: '#d4af37',
    gradient: 'from-amber-300 via-yellow-500 to-amber-600',
    badge: 'Люкс-сегмент',
    coatingTech: 'Вакуумное PVD-напыление нитрида титана',
    description: 'Сатинированная теплая текстура золота с микронаправленной шлифовкой. Не темнеет, не окисляется и идеально сочетается с золотыми смесителями.',
    bestFor: 'Неоклассика, ар-деко, светлый керамогранит, стекло Optiwhite и Estriado.',
    sampleProject: '/portfolio/corner_01.jpg',
    sampleTitle: 'Кабина Optiwhite с фурнитурой под брашированное золото',
  },
  {
    id: 'gunmetal',
    name: 'Оружейная сталь (Gunmetal)',
    englishName: 'Gunmetal Titanium Grey',
    category: 'Хай-тек и брутализм',
    hex: '#4b5563',
    gradient: 'from-slate-600 via-zinc-700 to-slate-800',
    badge: 'Новинка',
    coatingTech: 'Многослойное титановое PVD-напыление',
    description: 'Эксклюзивный темно-серый металлик с глубоким графитовым отливом. Скрывает отпечатки пальцев и создает сдержанную строгую эстетику.',
    bestFor: 'Темный керамогранит, графитовое стекло, сантехника цвета оружейной стали.',
    sampleProject: '/portfolio/corner_06.jpg',
    sampleTitle: 'Угловая кабина Графит с фурнитурой Gunmetal',
  },
  {
    id: 'chrome',
    name: 'Полированный хром',
    englishName: 'Polished Chrome Gloss',
    category: 'Нестареющая классика',
    hex: '#e2e8f0',
    gradient: 'from-slate-200 via-white to-slate-400',
    coatingTech: 'Трехслойное электрохимическое хромирование',
    description: 'Зеркальный идеальный блеск полированной нержавеющей стали AISI 304. Классика, подходящая к стандартным хромированным смесителям.',
    bestFor: 'Традиционные светлые санузлы, хромированные душевые стойки и полотенцесушители.',
    sampleProject: '/portfolio/corner_03.jpg',
    sampleTitle: 'Классическая кабина с полированными петлями 90°',
  },
  {
    id: 'satin',
    name: 'Матовый хром / Сатин',
    englishName: 'Satin Stainless Steel',
    category: 'Практичность',
    hex: '#94a3b8',
    gradient: 'from-slate-400 via-slate-300 to-slate-500',
    coatingTech: 'Прецизионная механическая направленная шлифовка',
    description: 'Матовая нержавеющая сталь без зеркального блеска. На ней практически не заметны высохшие капли воды и прикосновения пальцев.',
    bestFor: 'Семейные санузлы с интенсивной эксплуатацией, скандинавский стиль.',
    sampleProject: '/portfolio/corner_05.jpg',
    sampleTitle: 'Кабина со скрытым креплением в матовом сатине',
  },
  {
    id: 'white',
    name: 'Белый матовый',
    englishName: 'Matte White Clean',
    category: 'Воздушность',
    hex: '#f8fafc',
    gradient: 'from-white via-slate-100 to-slate-200',
    coatingTech: 'Высокотемпературная порошковая эмаль',
    description: 'Безупречно белый шелковистый финиш, растворяющийся на фоне светлой плитки и белых поддонов. Максимально облегчает конструкцию.',
    bestFor: 'Монохромные белые ванные комнаты, белая сантехника, минимализм.',
    sampleProject: '/portfolio/niche_02.jpg',
    sampleTitle: 'Дверь в нишу с белой матовой фурнитурой и скрытым уплотнителем',
  },
  {
    id: 'bronze',
    name: 'Античная бронза',
    englishName: 'Antique Bronze Patina',
    category: 'Классика и ретро',
    hex: '#78350f',
    gradient: 'from-amber-800 via-yellow-900 to-amber-950',
    coatingTech: 'Химическое патинирование с защитным лаком',
    description: 'Благородный оттенок выдержанной временем бронзы с деликатным затемнением в углублениях. Идеален для классических и ретро интерьеров.',
    bestFor: 'Классические интерьеры с ванной на лапах, бронзовыми смесителями и деревом.',
    sampleProject: '/portfolio/sliding_05.jpg',
    sampleTitle: 'Раздвижная система с бронзовой роликовой штангой',
  },
];

export interface HardwareShowcaseProps {
  onSelectFinish?: (finishId: string) => void;
  onOpenMeasurementModal?: () => void;
}

export const HardwareShowcase: React.FC<HardwareShowcaseProps> = ({
  onSelectFinish,
  onOpenMeasurementModal,
}) => {
  const [selectedId, setSelectedId] = useState<HardwareFinish['id']>('gold');
  const activeFinish = hardwareFinishesData.find((f) => f.id === selectedId) || hardwareFinishesData[0];

  const handleSelectFinish = (id: HardwareFinish['id']) => {
    setSelectedId(id);
    if (onSelectFinish) {
      onSelectFinish(id);
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

  return (
    <section className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative overflow-hidden border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Heading: Minimalist Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] block mb-2 sm:mb-3">
              THE HARDWARE / 07 FINISHES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Фурнитура Boheme.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Итальянская латунь и сталь.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-sm leading-relaxed font-sans">
            Монолитная нержавеющая сталь AISI 304 и PVD-напыление с официальной гарантией 5 лет.
          </p>
        </div>

        {/* 7 Swatches Selector Strip */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7c766c] font-mono">
              Выберите оттенок фурнитуры:
            </span>
            <span className="text-xs text-[#1a1712] font-semibold hidden sm:inline">
              Выбрано: {activeFinish.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
            {hardwareFinishesData.map((finish) => {
              const isActive = finish.id === selectedId;
              return (
                <button
                  key={finish.id}
                  onClick={() => handleSelectFinish(finish.id)}
                  type="button"
                  className={`group relative flex flex-col items-center p-3.5 rounded-2xl border transition-all duration-300 min-h-[48px] ${
                    isActive
                      ? 'bg-white border-[#1a1712] shadow-subtle'
                      : 'bg-white/60 border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)] hover:bg-white text-[#7c766c]'
                  }`}
                >
                  {/* Swatch circle with metallic gradient */}
                  <div className="relative mb-2.5">
                    <div 
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-inner border transition-transform duration-300 group-hover:scale-105 bg-gradient-to-tr ${finish.gradient} ${
                        isActive ? 'border-[#1a1712] ring-2 ring-[#1a1712]/20' : 'border-[rgba(26,23,18,0.15)]'
                      }`}
                    />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF2500] rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-center text-[#1a1712] line-clamp-1">
                    {finish.name}
                  </span>
                  <span className="text-[11px] text-[#7c766c] text-center line-clamp-1">
                    {finish.englishName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Finish Details Showcase */}
        <div className="bg-white rounded-[32px] border border-[rgba(26,23,18,0.08)] p-6 sm:p-8 lg:p-10 mb-16 shadow-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Project Image with Finish */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[24px] overflow-hidden border border-[rgba(26,23,18,0.08)] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] shadow-card group">
                <img
                  src={activeFinish.sampleProject}
                  alt={activeFinish.sampleTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#1a1712] border border-[rgba(26,23,18,0.08)] text-xs font-bold mb-2 backdrop-blur-md shadow-sm">
                    <div 
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: activeFinish.hex }}
                    />
                    <span>{activeFinish.name}</span>
                  </div>
                  <p className="text-xs text-white/95 bg-black/60 p-2.5 rounded-xl backdrop-blur-md">
                    {activeFinish.sampleTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Technical Specs and Guarantees */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#eae6dc] text-[#1a1712]">
                  {activeFinish.category}
                </span>
                {activeFinish.badge && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1a1712] text-white">
                    {activeFinish.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a1712] mb-3 font-display">
                Фурнитура: {activeFinish.name}
              </h3>

              <p className="text-sm sm:text-base text-[rgba(20,20,22,0.65)] leading-relaxed mb-6">
                {activeFinish.description}
              </p>

              {/* Technology & Recommendation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1a1712] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#FF2500]" />
                    <span>Технология покрытия</span>
                  </div>
                  <p className="text-xs text-[rgba(20,20,22,0.7)]">
                    {activeFinish.coatingTech}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1a1712] uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4 text-[#1a1712]" />
                    <span>Идеально для интерьера</span>
                  </div>
                  <p className="text-xs text-[rgba(20,20,22,0.7)]">
                    {activeFinish.bestFor}
                  </p>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1a1712]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF2500] shrink-0" />
                  <span>Литые латунные петли с автодоводчиком ±25° и защитой от провисания</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1a1712]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF2500] shrink-0" />
                  <span>Стабилизационные штанги из высоколегированной нержавеющей стали AISI 304</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1a1712]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF2500] shrink-0" />
                  <span>Неодимовые магнитные уплотнители с гарантией сохранения эластичности 5 лет</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  onClick={handleScrollToCalculator}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1a1712] text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-sm min-h-[46px]"
                >
                  <Sliders className="w-4 h-4 text-[#FF2500]" />
                  <span>Рассчитать с этим цветом</span>
                </a>

                {onOpenMeasurementModal && (
                  <button
                    onClick={onOpenMeasurementModal}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#eae6dc] text-[#1a1712] font-semibold text-sm transition-all border border-[rgba(26,23,18,0.12)] shadow-card min-h-[46px]"
                  >
                    <span>Заказать выезд с образцами</span>
                    <ArrowRight className="w-4 h-4" />
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
