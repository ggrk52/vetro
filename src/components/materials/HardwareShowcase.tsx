import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Check, 
  ArrowRight,
  ArrowUpRight
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
    englishName: 'Matte Black Noir',
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
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FBFAF7] text-[#252725] border-b border-[#DFDDD6]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] block mb-2">
              КОЛЛЕКЦИЯ ФУРНИТУРЫ / BOHEME MILANO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] tracking-tight leading-[1.08] text-balance">
              Фурнитура Boheme.<br />
              <span className="italic text-[#788173]">Итальянская латунь и сталь AISI 304.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] max-w-md leading-relaxed font-sans text-pretty">
            Монолитная нержавеющая сталь, прецизионные петли с доводчиком ±25° и PVD-напыление с официальной гарантией до 10 лет.
          </p>
        </div>

        {/* 7 Swatches Selector Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="uppercase tracking-wider text-[#788173]">
              ОТТЕНКИ ФУРНИТУРЫ (7 ВАРИАНТОВ):
            </span>
            <span className="text-[#252725] font-semibold hidden sm:inline">
              Выбрано: {activeFinish.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {hardwareFinishesData.map((finish) => {
              const isActive = finish.id === selectedId;
              return (
                <button
                  key={finish.id}
                  onClick={() => handleSelectFinish(finish.id)}
                  type="button"
                  className={`group relative flex flex-col items-center p-3 rounded border transition-all duration-150 min-h-[50px] active:scale-[0.97] ${
                    isActive
                      ? 'bg-[#252725] border-[#252725] text-[#FBFAF7]'
                      : 'bg-[#F4F2EC] border-[#DFDDD6] text-[#777A74] hover:text-[#252725] hover:bg-[#E8E5DD]'
                  }`}
                >
                  {/* Swatch circle */}
                  <div className="relative mb-2">
                    <div 
                      className={`size-9 rounded-full border transition-transform duration-200 group-hover:scale-105 bg-gradient-to-tr ${finish.gradient} ${
                        isActive ? 'border-[#A68C70] ring-1 ring-[#A68C70]' : 'border-black/10'
                      }`}
                    />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 size-3.5 bg-[#A68C70] rounded-full flex items-center justify-center text-white">
                        <Check className="size-2.5" />
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-medium text-center line-clamp-1 ${isActive ? 'text-[#FBFAF7]' : 'text-[#252725]'}`}>
                    {finish.name.split(' (')[0]}
                  </span>
                  <span className={`text-[10px] font-mono text-center line-clamp-1 ${isActive ? 'text-[#FBFAF7]/70' : 'text-[#777A74]'}`}>
                    {finish.englishName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Finish Details Showcase */}
        <div className="bg-[#F4F2EC] rounded border border-[#DFDDD6] p-6 sm:p-8 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Project Image with Finish */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded overflow-hidden border border-[#DFDDD6] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] bg-[#E8E5DD] group">
                <img
                  src={activeFinish.sampleProject}
                  alt={activeFinish.sampleTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/75 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#FBFAF7]/95 text-[#252725] border border-[#DFDDD6] text-xs font-mono mb-1.5 backdrop-blur-sm">
                    <div 
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: activeFinish.hex }}
                    />
                    <span>{activeFinish.name}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#FBFAF7]/90 bg-[#252725]/80 p-2 rounded-[2px] backdrop-blur-sm border border-white/10">
                    {activeFinish.sampleTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Technical Specs and Guarantees */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#FBFAF7] text-[#788173] border border-[#DFDDD6]">
                  {activeFinish.category}
                </span>
                {activeFinish.badge && (
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#252725] text-[#FBFAF7]">
                    {activeFinish.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#252725] mb-3">
                Фурнитура: {activeFinish.name}
              </h3>

              <p className="text-sm text-[#777A74] leading-relaxed mb-6 font-sans">
                {activeFinish.description}
              </p>

              {/* Technology & Recommendation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded bg-[#FBFAF7] border border-[#DFDDD6]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#788173] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#788173]" />
                    <span>ТЕХНОЛОГИЯ ПОКРЫТИЯ</span>
                  </div>
                  <p className="text-xs text-[#252725]">
                    {activeFinish.coatingTech}
                  </p>
                </div>

                <div className="p-3.5 rounded bg-[#FBFAF7] border border-[#DFDDD6]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#788173] uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5 text-[#A68C70]" />
                    <span>РЕКОМЕНДОВАНО ДЛЯ</span>
                  </div>
                  <p className="text-xs text-[#252725]">
                    {activeFinish.bestFor}
                  </p>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-[#252725]">
                  <Check className="w-3.5 h-3.5 text-[#788173] shrink-0" />
                  <span>Литые латунные петли с автодоводчиком ±25° и защитой от провисания</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#252725]">
                  <Check className="w-3.5 h-3.5 text-[#788173] shrink-0" />
                  <span>Стабилизационные штанги из высоколегированной стали AISI 304</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#252725]">
                  <Check className="w-3.5 h-3.5 text-[#788173] shrink-0" />
                  <span>Неодимовые магнитные уплотнители со сроком службы более 100 000 циклов</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  onClick={handleScrollToCalculator}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#252725] hover:bg-[#383B38] text-[#FBFAF7] font-medium text-xs uppercase tracking-wider transition-all min-h-[42px]"
                >
                  <span>Рассчитать с этим цветом</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A68C70]" />
                </a>

                {onOpenMeasurementModal && (
                  <button
                    onClick={onOpenMeasurementModal}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#FBFAF7] hover:bg-[#E8E5DD] text-[#252725] border border-[#DFDDD6] font-medium text-xs uppercase tracking-wider transition-all min-h-[42px]"
                  >
                    <span>Заказать выезд с образцами</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#788173]" />
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
