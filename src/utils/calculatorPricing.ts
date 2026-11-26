/**
 * Calculator pricing formulas and business rules for custom shower cabins.
 * Implements area-based scaling, glass type multipliers, hardware finishes, and add-on options.
 */

export type CalculatorCabinType =
  | 'walkin'
  | 'corner'
  | 'niche'
  | 'bath_screen'
  | 'trapezoid'
  | 'sliding';

export type CalculatorGlassType =
  | 'optiwhite'
  | 'float'
  | 'matelux'
  | 'graphite'
  | 'bronze';

export type CalculatorHardwareFinish =
  | 'black'
  | 'gold'
  | 'chrome'
  | 'gunmetal'
  | 'white'
  | 'bronze';

export interface CalculatorState {
  cabinType: CalculatorCabinType;
  width: number; // in cm
  height: number; // in cm
  depth?: number; // in cm (for corner/trapezoid)
  glassType: CalculatorGlassType;
  hardwareFinish: CalculatorHardwareFinish;
}

export interface PricingBreakdown {
  basePrice: number;
  glassRate: number;
  glassPrice: number;
  installationPrice: number;
  hardwarePrice: number;
  optionsPrice: number;
  totalPrice: number;
  formattedTotal: string;
  areaSqm: number;
}

/**
 * Glass rate per square meter by glass type (in rubles).
 */
export const GLASS_RATES_PER_SQM: Record<CalculatorGlassType, number> = {
  float: 3200,     // Обычное прозрачное закаленное М1 — 3 200 ₽/м²
  optiwhite: 8000, // Осветленное кристальное Optiwhite — 8 000 ₽/м²
  matelux: 8000,   // Матовое сатинат Matelux — 8 000 ₽/м²
  graphite: 8000,  // Тонированное в массе Графит — 8 000 ₽/м²
  bronze: 8000,    // Тонированное в массе Бронза — 8 000 ₽/м²
};

/**
 * Installation cost per square meter of glass (in rubles).
 */
export const INSTALLATION_RATE_PER_SQM = 1000;

/**
 * Hardware finish surcharge (no extra cost for hardware colors).
 */
export const HARDWARE_SURCHARGES: Record<CalculatorHardwareFinish, number> = {
  chrome: 0,
  black: 0,
  white: 0,
  gunmetal: 0,
  bronze: 0,
  gold: 0,
};

/**
 * Metadata descriptions for cabin construction types.
 */
export const CABIN_TYPE_METADATA: Record<
  CalculatorCabinType,
  {
    title: string;
    subtitle: string;
    description: string;
    requiresDepth: boolean;
    defaultDimensions: { width: number; height: number; depth?: number };
    minDimensions: { width: number; height: number; depth?: number };
    maxDimensions: { width: number; height: number; depth?: number };
  }
> = {
  walkin: {
    title: 'Перегородка Walk-In',
    subtitle: 'Свободный вход без дверей',
    description: 'Монолитное закаленное полотно с верхней штангой-стабилизатором. Идеально для современных просторных санузлов.',
    requiresDepth: false,
    defaultDimensions: { width: 100, height: 200 },
    minDimensions: { width: 60, height: 180 },
    maxDimensions: { width: 160, height: 250 },
  },
  corner: {
    title: 'Угловая кабина 90°',
    subtitle: 'Г-образная конструкция',
    description: 'Две стеклянные стороны под прямым углом с распашной дверью на магнитных уплотнителях. Классика для углового душа.',
    requiresDepth: true,
    defaultDimensions: { width: 90, height: 200, depth: 90 },
    minDimensions: { width: 70, height: 180, depth: 70 },
    maxDimensions: { width: 160, height: 240, depth: 160 },
  },
  niche: {
    title: 'Дверь в нишу',
    subtitle: 'Монтаж в плиточный проем',
    description: 'Распашная створка (одна или с неподвижным добором) для закрытия готового проема между тремя стенами.',
    requiresDepth: false,
    defaultDimensions: { width: 90, height: 200 },
    minDimensions: { width: 60, height: 180 },
    maxDimensions: { width: 180, height: 240 },
  },
  sliding: {
    title: 'Раздвижная система',
    subtitle: 'Экономия полезного места',
    description: 'Створка скользит на роликах вдоль неподвижного стекла. Не требует места для распахивания двери наружу.',
    requiresDepth: false,
    defaultDimensions: { width: 140, height: 200 },
    minDimensions: { width: 100, height: 180 },
    maxDimensions: { width: 220, height: 240 },
  },
  bath_screen: {
    title: 'Шторка на ванну',
    subtitle: 'Защита от брызг на борт ванны',
    description: 'Стационарная или поворотная перегородка из закаленного стекла, превращающая ванну в полноценную душевую зону.',
    requiresDepth: false,
    defaultDimensions: { width: 90, height: 150 },
    minDimensions: { width: 60, height: 130 },
    maxDimensions: { width: 140, height: 180 },
  },
  trapezoid: {
    title: 'Трапеция 135°',
    subtitle: 'Пятиугольная пятигранная кабина',
    description: 'Сложная конструкция со срезанным углом 135°: две боковые глухие стенки и центральная дверь.',
    requiresDepth: true,
    defaultDimensions: { width: 95, height: 200, depth: 95 },
    minDimensions: { width: 80, height: 185, depth: 80 },
    maxDimensions: { width: 140, height: 230, depth: 140 },
  },
};

/**
 * Metadata descriptions for glass types.
 */
export const GLASS_METADATA: Record<
  CalculatorGlassType,
  {
    name: string;
    description: string;
    thickness: string;
    badge: string;
  }
> = {
  float: {
    name: 'Прозрачное М1',
    description: 'Классическое термозакаленное стекло высокой прочности с естественным зеленоватым торцом.',
    thickness: '8 мм',
    badge: '3 200 ₽/м²',
  },
  optiwhite: {
    name: 'Осветленное Optiwhite',
    description: 'Максимально прозрачное стекло без бутылочного оттенка. Идеальная цветопередача плитки и мозаики.',
    thickness: '8-10 мм',
    badge: '8 000 ₽/м² · Хит',
  },
  matelux: {
    name: 'Матовое Matelux',
    description: 'Стекло с химическим травлением (сатинат). Шелковистая поверхность, защита от отпечатков пальцев.',
    thickness: '8 мм',
    badge: '8 000 ₽/м²',
  },
  graphite: {
    name: 'Тонированное Графит',
    description: 'Элегантное дымчато-серое стекло, тонированное в массе. Идеально для интерьеров в темных тонах.',
    thickness: '8 мм',
    badge: '8 000 ₽/м²',
  },
  bronze: {
    name: 'Тонированное Бронза',
    description: 'Теплый благородный коньячный оттенок. Отлично сочетается с золотой и латунной фурнитурой.',
    thickness: '8 мм',
    badge: '8 000 ₽/м²',
  },
};

/**
 * Metadata descriptions for hardware finishes.
 */
export const HARDWARE_METADATA: Record<
  CalculatorHardwareFinish,
  {
    name: string;
    description: string;
    colorHex: string;
    priceBadge: string;
  }
> = {
  chrome: {
    name: 'Полированный хром',
    description: 'Классический зеркальный глянец, нержавеющая сталь AISI 304.',
    colorHex: '#D1D5DB',
    priceBadge: 'Без доплаты',
  },
  black: {
    name: 'Черный матовый',
    description: 'Глубокий бархатистый матовый черный, устойчивое порошковое напыление.',
    colorHex: '#1F2937',
    priceBadge: 'Без доплаты',
  },
  white: {
    name: 'Белый матовый',
    description: 'Чистый белый матовый оттенок для светлых скандинавских интерьеров.',
    colorHex: '#F3F4F6',
    priceBadge: 'Без доплаты',
  },
  gunmetal: {
    name: 'Оружейная сталь',
    description: 'Темный титановый графит с благородным металлическим блеском (Gunmetal).',
    colorHex: '#4B5563',
    priceBadge: 'Без доплаты',
  },
  bronze: {
    name: 'Матовая бронза',
    description: 'Античная состаренная бронза для интерьеров в стиле неоклассика.',
    colorHex: '#92400E',
    priceBadge: 'Без доплаты',
  },
  gold: {
    name: 'Брашированное золото',
    description: 'Премиальное PVD-покрытие с текстурой тонкой шлифовки под матовую латунь.',
    colorHex: '#D97706',
    priceBadge: 'Без доплаты',
  },
};

/**
 * Standard default state for calculator initialization.
 */
export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  cabinType: 'walkin',
  width: 100,
  height: 200,
  depth: 90,
  glassType: 'optiwhite',
  hardwareFinish: 'black',
};

/**
 * Formats a numeric price into a Russian currency string (e.g. "48 400 ₽").
 */
export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(Math.round(amount))} ₽`;
}

/**
 * Calculates total glass surface area in square meters based on cabin type and dimensions.
 */
export function calculateGlassArea(
  cabinType: CalculatorCabinType,
  widthCm: number,
  heightCm: number,
  depthCm?: number
): number {
  const safeWidth = Math.max(30, widthCm);
  const safeHeight = Math.max(100, heightCm);
  const safeDepth = depthCm && depthCm > 0 ? depthCm : safeWidth;

  let area = 0;

  switch (cabinType) {
    case 'walkin':
    case 'niche':
    case 'bath_screen':
    case 'sliding':
      // Single continuous plane (front wall / door)
      area = (safeWidth / 100) * (safeHeight / 100);
      break;

    case 'corner':
      // 90° corner cabin has 2 perpendicular glass sides (width + depth)
      area = ((safeWidth + safeDepth) / 100) * (safeHeight / 100);
      break;

    case 'trapezoid':
      // 135° pentagonal cabin has 2 sides plus angled center door (approx 15% more glass perimeter)
      area = (((safeWidth + safeDepth) * 1.15) / 100) * (safeHeight / 100);
      break;

    default:
      area = (safeWidth / 100) * (safeHeight / 100);
  }

  // Sanity lower bound
  return Math.max(0.5, Math.round(area * 100) / 100);
}

/**
 * Calculates itemized pricing breakdown and total cost from the given calculator state.
 */
export function calculatePrice(state: CalculatorState): PricingBreakdown {
  const areaSqm = calculateGlassArea(
    state.cabinType,
    state.width,
    state.height,
    state.depth
  );

  const glassRate = GLASS_RATES_PER_SQM[state.glassType] ?? 3200;
  const glassPrice = Math.round(areaSqm * glassRate);
  const installationPrice = Math.round(areaSqm * INSTALLATION_RATE_PER_SQM);
  const hardwarePrice = HARDWARE_SURCHARGES[state.hardwareFinish] ?? 0;
  const optionsPrice = 0;

  const totalPrice = glassPrice + installationPrice + hardwarePrice + optionsPrice;

  return {
    basePrice: glassPrice,
    glassRate,
    glassPrice,
    installationPrice,
    hardwarePrice,
    optionsPrice,
    totalPrice,
    formattedTotal: formatPrice(totalPrice),
    areaSqm,
  };
}
