import React, { useState } from 'react';
import { 
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
    imageSrc: 'portfolio/walkin_01.jpg',
    priceFrom: 18000,
    priceFormatted: 'от 18 000 ₽',
    badge: 'Архитектурный хит',
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
  },
  {
    id: 'cat_corner',
    category: 'corner',
    title: 'Угловые душевые кабины 90°',
    subtitle: 'Классические Г-образные распашные и откатные конструкции',
    imageSrc: 'portfolio/corner_01.jpg',
    priceFrom: 38000,
    priceFormatted: 'от 38 000 ₽',
    badge: 'Выбор дизайнеров',
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
    imageSrc: 'portfolio/niche_01.jpg',
    priceFrom: 24000,
    priceFormatted: 'от 24 000 ₽',
    badge: 'Точно в проем',
    specs: {
      thickness: '8 мм закаленное ESG',
      productionTime: 'от 5 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Бесплатный точный замер проема с допуском до 1 мм',
      'Распашные петли «стена-стекло» с плавным закрыванием',
      'Силиконовые капельники и водоотбойники от брызг',
      'Любая нестандартная высота до 2500 мм под потолок',
    ],
    hardwareOptions: ['Черный матовый', 'Брашированное золото', 'Хром', 'Белый'],
  },
  {
    id: 'cat_sliding',
    category: 'sliding',
    title: 'Раздвижные системы остекления',
    subtitle: 'Сдвижные двери на массивной роликовой штанге AISI 304',
    imageSrc: 'portfolio/sliding_01.jpg',
    priceFrom: 42000,
    priceFormatted: 'от 42 000 ₽',
    badge: 'Эргономика',
    specs: {
      thickness: '8 мм закаленное ESG',
      productionTime: 'от 7 рабочих дней',
      warranty: 'до 5 лет',
    },
    bullets: [
      'Экономия 100% полезного пространства перед душевой',
      'Массивные ролики на закрытых японских подшипниках',
      'Бесшумное скольжение и демпферы мягкой остановки soft-close',
      'Нижний флажковый фиксатор без выступающих рельсов в полу',
    ],
    hardwareOptions: ['Полированный хром', 'Черный матовый', 'Золото', 'Бронза'],
    hasVideo: true,
    videoType: 'sliding',
  },
  {
    id: 'cat_bath_screen',
    category: 'bath_screen',
    title: 'Стеклянные шторки для ванны',
    subtitle: 'Поворотные, раздвижные и стационарные стеклянные экраны',
    imageSrc: 'portfolio/bath_01.jpg',
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
      'Стекло Optiwhite, классическое прозрачное, матовое или тонированное',
    ],
    hardwareOptions: ['Хром', 'Черный матовый', 'Брашированное золото'],
    hasVideo: true,
    videoType: 'sliding',
  },
  {
    id: 'cat_trapezoid',
    category: 'trapezoid',
    title: 'Трапециевидные кабины 135°',
    subtitle: 'Пятиугольные кабины со скошенным углом для максимальной эргономики',
    imageSrc: 'portfolio/trapezoid_01.jpg',
    priceFrom: 44000,
    priceFormatted: 'от 44 000 ₽',
    badge: 'Премиум геометрия',
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
    title: 'Зеркала на заказ с подсветкой',
    subtitle: 'Влагостойкие зеркала серебряной амальгамы с сенсором и подогревом',
    imageSrc: 'portfolio/mirror_01.jpg',
    priceFrom: 12000,
    priceFormatted: 'от 12 000 ₽',
    badge: 'Ателье зеркал',
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
    title: 'Стеклянные перегородки и ограждения',
    subtitle: 'Балюстрады лестниц, террасы, антресоли и лофт-перегородки',
    imageSrc: 'portfolio/loft_01.jpg',
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
  onOpenVideoModal?: (video: 'sliding') => void;
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
    { id: 'all', label: 'Все категории' },
    { id: 'walkin', label: 'Walk-In' },
    { id: 'corner', label: 'Угловые 90°' },
    { id: 'niche', label: 'В нишу' },
    { id: 'sliding', label: 'Раздвижные' },
    { id: 'bath_screen', label: 'Шторки на ванну' },
    { id: 'trapezoid', label: 'Трапеции 135°' },
    { id: 'mirror', label: 'Зеркала' },
    { id: 'loft', label: 'Лофт' },
  ];

  const filteredItems = activeFilter === 'all'
    ? catalogItemsData
    : catalogItemsData.filter((item) => item.category === activeFilter);

  return (
    <section id="catalog" className="py-12 sm:py-16 lg:py-20 bg-[#F4F2EC] dark:bg-[#101923] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] dark:text-[#B2E4DD] block mb-2">
              ПРОДУКЦИЯ СТУДИИ / 001 — 008
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] text-balance">
              Каталог решений.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">Архитектурные пропорции.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Закаленное монолитное стекло 8–10 мм и фурнитура Boheme Milano. Все подробности и технические характеристики доступны внутри карточки каждого объекта.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => {
            const isActive = tab.id === activeFilter;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                type="button"
                className={`whitespace-nowrap px-3.5 py-1.5 rounded font-mono text-xs transition-colors duration-150 min-h-[32px] shrink-0 border active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#122128] border-[#252725] dark:border-[#B2E4DD] font-medium dark:font-semibold'
                    : 'bg-[#FBFAF7] dark:bg-[#14212C] text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] border-[#DFDDD6] dark:border-[#34434E]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-10">
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
        <div className="rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <span className="font-mono text-xs text-[#788173] dark:text-[#B2E4DD] font-medium block mb-1">
              Индивидуальное проектирование · Bespoke
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-[#252725] dark:text-[#F1F2EF] font-sans">
              Нестандартные размеры и фигурный раскрой под геометрию стен
            </h3>
            <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA] mt-1.5 max-w-xl">
              Бесплатный точный замер инженеров VETRO под уклоны керамогранита, встроенные трапы и скрытые инсталляции.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center flex-col sm:flex-row">
            {onOpenMeasurementModal && (
              <button
                onClick={onOpenMeasurementModal}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs transition-colors duration-150 min-h-[44px] active:scale-[0.98]"
              >
                <Ruler className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#102126]" />
                <span>Заказать замер 24ч</span>
              </button>
            )}

            <a
              href={businessConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#FBFAF7] dark:bg-transparent hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] text-[#252725] dark:text-[#F1F2EF] border border-[#DFDDD6] dark:border-[#657881] dark:hover:border-[#B2E4DD] font-medium text-xs transition-colors duration-150 min-h-[44px] active:scale-[0.98]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
              <span>Консультация</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD]" />
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
