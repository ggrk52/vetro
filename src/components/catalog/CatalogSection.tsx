import React, { useState } from 'react';
import { 
  Layers, 
  Ruler, 
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';
import { CatalogCard, CatalogCardItem } from './CatalogCard';
import { ProductDrawer } from './ProductDrawer';
import { CabinCategory } from '../../data/portfolioData';
import { businessConfig } from '../../data/businessConfig';

export const catalogItemsData: CatalogCardItem[] = [
  {
    id: 'cat_walkin',
    category: 'walkin',
    title: 'Душевые перегородки Walk-In',
    subtitle: 'Свободный вход без дверей, порогов и визуального шума',
    imageSrc: '/portfolio/walkin_01.jpg',
    priceFrom: 18000,
    priceFormatted: 'от 18 000 ₽',
    badge: 'Хит продаж',
    specs: {
      thickness: '8–10 мм закаленное ESG',
      productionTime: 'от 5 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Монтаж в пол в один уровень с керамогранитом',
      'Жесткая стабилизационная штанга из стали AISI 304',
      'Визуально расширяет пространство ванной комнаты',
      'Закалка по ГОСТ 30698-2014 с европолировкой кромки',
    ],
    hardwareOptions: ['Черный матовый', 'Брашированное золото', 'Хром', 'Gunmetal'],
    hasVideo: true,
    videoType: 'estriado',
  },
  {
    id: 'cat_corner',
    category: 'corner',
    title: 'Угловые кабины 90°',
    subtitle: 'Классические Г-образные распашные и откатные конструкции',
    imageSrc: '/portfolio/corner_01.jpg',
    priceFrom: 38000,
    priceFormatted: 'от 38 000 ₽',
    badge: 'Премиум выбор',
    specs: {
      thickness: '8–10 мм закаленное ESG',
      productionTime: 'от 5 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      '100% герметичность с неодимовыми магнитными уплотнителями',
      'Литые латунные петли Boheme Milano с автодоводчиком ±25°',
      'Алюминиевый аквастоп-порожек исключает перелив воды',
      'Индивидуальный вырез под плитку с учетом уклона стен',
    ],
    hardwareOptions: ['Брашированное золото', 'Черный мат', 'Полированный хром', 'Сатин'],
  },
  {
    id: 'cat_niche',
    category: 'niche',
    title: 'Двери и перегородки в нишу',
    subtitle: 'Одностворчатые распашные и с неподвижным стеклянным добором',
    imageSrc: '/portfolio/niche_01.jpg',
    priceFrom: 24000,
    priceFormatted: 'от 24 000 ₽',
    badge: 'Точно в размер',
    specs: {
      thickness: '8 мм закаленное ESG',
      productionTime: 'от 5 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Точный лазерный 3D-замер проема с допуском до 1 мм',
      'Распашные петли «стена-стекло» с плавным закрыванием',
      'Силиконовые капельники и водоотбойники от брызг',
      'Любая нестандартная высота до 2500 мм под потолок',
    ],
    hardwareOptions: ['Черный матовый', 'Брашированное золото', 'Хром', 'Белый'],
  },
  {
    id: 'cat_sliding',
    category: 'sliding',
    title: 'Раздвижные (откатные) системы',
    subtitle: 'Сдвижные двери на массивной роликовой штанге AISI 304',
    imageSrc: '/portfolio/sliding_01.jpg',
    priceFrom: 42000,
    priceFormatted: 'от 42 000 ₽',
    badge: 'Экономия места',
    specs: {
      thickness: '8 мм закаленное ESG',
      productionTime: 'от 7 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Экономия 100% полезного пространства перед душевой',
      'Массивные ролики на закрытых японских подшипниках',
      'Бесшумное скольжение и демпферы мягкой остановки soft-close',
      'Нижний флажковый фиксатор без пылесборных рельсов в полу',
    ],
    hardwareOptions: ['Полированный хром', 'Черный матовый', 'Золото', 'Бронза'],
    hasVideo: true,
    videoType: 'sliding',
  },
  {
    id: 'cat_bath_screen',
    category: 'bath_screen',
    title: 'Шторки на ванну из стекла',
    subtitle: 'Поворотные, раздвижные и стационарные стеклянные экраны',
    imageSrc: '/portfolio/bath_01.jpg',
    priceFrom: 16000,
    priceFormatted: 'от 16 000 ₽',
    badge: 'Практично',
    specs: {
      thickness: '8 мм закаленное ESG',
      productionTime: 'от 5 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Надежная защита пола и мебели от брызг взамен тканевых штор',
      'Поворот створки на 180° для свободного доступа и мытья ванны',
      'Нижний силиконовый лепесток плотно прилегает к бортику',
      'Стекло Optiwhite, классическое прозрачное или рифленое Estriado',
    ],
    hardwareOptions: ['Хром', 'Черный матовый', 'Брашированное золото'],
    hasVideo: true,
    videoType: 'sliding',
  },
  {
    id: 'cat_trapezoid',
    category: 'trapezoid',
    title: 'Трапециевидные кабины (135°)',
    subtitle: 'Пятиугольные кабины со скошенным углом для максимальной эргономики',
    imageSrc: '/portfolio/trapezoid_01.jpg',
    priceFrom: 44000,
    priceFormatted: 'от 44 000 ₽',
    badge: 'Эргономика',
    specs: {
      thickness: '8 мм закаленное ESG',
      productionTime: 'от 6 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Освобождает до 30% полезного прохода в узких санузлах',
      'Специальные петли и штанги с углом сопряжения 135°',
      'Два неподвижных боковых стекла + распашная центральная дверь',
      'Премиальный вид и абсолютный комфорт при водных процедурах',
    ],
    hardwareOptions: ['Хром глянец', 'Черный матовый', 'Золото', 'Gunmetal'],
  },
  {
    id: 'cat_mirror',
    category: 'mirror',
    title: 'Зеркала на заказ с LED-подсветкой',
    subtitle: 'Влагостойкие зеркала серебряной амальгамы с сенсором и подогревом',
    imageSrc: '/portfolio/mirror_01.jpg',
    priceFrom: 12000,
    priceFormatted: 'от 12 000 ₽',
    badge: 'Свое производство',
    specs: {
      thickness: 'Влагостойкое полотно 4 мм',
      productionTime: 'от 4 рабочих дней',
      warranty: '3 года',
    },
    bullets: [
      'Контурная фронтальная или парящая фоновая Ambilight подсветка',
      'Встроенный нагревательный мат (100% защита от запотевания)',
      'Сенсорный диммер с регулировкой яркости и оттенка (3000K-6000K)',
      'Любые формы: прямоугольные, круглые, капсулы, арки, в багете',
    ],
    hardwareOptions: ['Без рамы', 'Латунный багет', 'Черный алюминий'],
  },
  {
    id: 'cat_loft',
    category: 'loft',
    title: 'Стеклянные ограждения и лофт',
    subtitle: 'Балюстрады лестниц, террасы, антресоли и лофт-перегородки',
    imageSrc: '/portfolio/loft_01.jpg',
    priceFrom: 22000,
    priceFormatted: 'от 22 000 ₽/п.м',
    badge: 'Архитектурное стекло',
    specs: {
      thickness: '10–12 мм ESG или триплекс',
      productionTime: 'от 7 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Усиленное закаленное стекло или безопасный многослойный триплекс',
      'Точечные коннекторы (spigots) или зажимной несущий профиль',
      'Выдерживает распределенную нагрузку до 300 кг на погонный метр',
      'Лофт-перегородки с черной матовой алюминиевой раскладкой',
    ],
    hardwareOptions: ['Нержавеющая сталь', 'Черный матовый', 'Анодированный профиль'],
  },
];

export interface CatalogSectionProps {
  onCalculateClick?: (categoryId: string) => void;
  onViewGalleryClick?: (category: CabinCategory) => void;
  onOpenVideoModal?: (video: 'sliding' | 'estriado') => void;
  onOpenMeasurementModal?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onCalculateClick,
  onViewGalleryClick,
  onOpenVideoModal,
  onOpenMeasurementModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [drawerItem, setDrawerItem] = useState<CatalogCardItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Все объекты' },
    { id: 'walkin', label: 'Walk-In' },
    { id: 'corner', label: 'Угловые 90°' },
    { id: 'niche', label: 'В нишу' },
    { id: 'sliding', label: 'Раздвижные' },
    { id: 'bath_screen', label: 'Шторки на ванну' },
    { id: 'trapezoid', label: 'Трапеции' },
    { id: 'mirror', label: 'Зеркала' },
    { id: 'loft', label: 'Лофт' },
  ];

  const filteredItems = activeFilter === 'all'
    ? catalogItemsData
    : catalogItemsData.filter((item) => item.category === activeFilter);

  return (
    <section id="catalog" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative overflow-hidden border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header: Minimalist Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] mb-2 sm:mb-3">
              <span>THE COLLECTION / 001 — 008</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Каталог решений.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Точность формы.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-md leading-relaxed font-sans">
            Закаленное монолитное стекло 8–10 мм и фурнитура Boheme Milano. Все подробности и характеристики доступны внутри карточки объекта.
          </p>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => {
            const isActive = tab.id === activeFilter;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                type="button"
                className={`whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 min-h-[36px] shrink-0 ${
                  isActive
                    ? 'bg-[#1a1712] text-white shadow-sm'
                    : 'bg-white text-[#7c766c] hover:text-[#1a1712] hover:bg-white/90 border border-[rgba(26,23,18,0.08)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid: 8 Items with Clean Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10">
          {filteredItems.map((item, idx) => (
            <CatalogCard
              key={item.id}
              item={item}
              index={idx}
              onCalculateClick={onCalculateClick}
              onViewGalleryClick={onViewGalleryClick}
              onOpenVideoModal={onOpenVideoModal}
              onOpenDetails={(selected) => setDrawerItem(selected)}
            />
          ))}
        </div>

        {/* Bottom Custom Project Callout: Sleek Editorial Strip */}
        <div className="rounded-3xl bg-white border border-[rgba(26,23,18,0.08)] p-5 sm:p-7 shadow-card flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex-1 text-center md:text-left">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-[#FF2500] font-semibold block mb-1">
              ARCHITECTURAL GLASS · BESPOKE
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1712] font-display">
              Нестандартные размеры и фигурный раскрой
            </h3>
            <p className="text-xs text-[rgba(20,20,22,0.65)] mt-1 max-w-xl">
              Точный лазерный 3D-замер инженеров студии VETRO под уклоны плитки, трапы и скрытые инсталляции.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center flex-col sm:flex-row">
            {onOpenMeasurementModal && (
              <button
                onClick={onOpenMeasurementModal}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1a1712] hover:opacity-90 text-white font-medium text-xs transition-all shadow-sm min-h-[42px]"
              >
                <Ruler className="w-3.5 h-3.5 text-[#FF2500]" />
                <span>Заказать замер 24ч</span>
              </button>
            )}

            <a
              href={businessConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-[#eae6dc] text-[#1a1712] border border-[rgba(26,23,18,0.12)] font-medium text-xs transition-all min-h-[42px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FF2500]" />
              <span>Консультация ↗</span>
            </a>
          </div>
        </div>

        {/* Interactive Product Details Drawer */}
        <ProductDrawer
          item={drawerItem}
          isOpen={!!drawerItem}
          onClose={() => setDrawerItem(null)}
          onCalculateClick={onCalculateClick}
          onOpenMeasurementModal={onOpenMeasurementModal}
          onOpenVideoModal={onOpenVideoModal}
        />

      </div>
    </section>
  );
};
