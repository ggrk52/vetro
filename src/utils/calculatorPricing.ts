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
  | 'estriado'
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
  width: number; // in cm (60 to 250)
  height: number; // in cm (140 to 250)
  depth?: number; // in cm (for corner/trapezoid: 60 to 150)
  glassType: CalculatorGlassType;
  hardwareFinish: CalculatorHardwareFinish;
  hasInstallation: boolean;
  hasHydrophobicCoating: boolean;
}

export interface PricingBreakdown {
  basePrice: number;
  glassPrice: number;
  hardwarePrice: number;
  optionsPrice: number;
  totalPrice: number;
  formattedTotal: string;
  areaSqm: number;
}

/**
 * Base production rate per square meter of glass by construction complexity (in rubles).
 */
export const BASE_RATES_PER_SQM: Record<CalculatorCabinType, number> = {
  walkin: 14000,       // Прямая перегородка свободного входа
  bath_screen: 15000,  // Шторка на ванну
  niche: 18000,        // Дверь в нишу с петлями и уплотнителями
  corner: 22000,       // Угловая кабина 90° (две стороны)
  trapezoid: 25000,    // Пятиугольная трапеция 135° (сложная геометрия)
  sliding: 26000,      // Раздвижная система на открытом/закрытом треке
};

/**
 * Multiplier for premium glass types relative to standard tempered float glass.
 */
export const GLASS_MULTIPLIERS: Record<CalculatorGlassType, number> = {
  float: 1.0,      // Прозрачное бесцветное закаленное М1 (базовое)
  matelux: 1.25,   // Матовое сатинат (+25%)
  optiwhite: 1.30, // Осветленное кристальное Optiwhite (+30%)
  graphite: 1.35,  // Тонированное в массе Графит (+35%)
  bronze: 1.35,    // Тонированное в массе Бронза (+35%)
  estriado: 1.40,  // Рифленое дизайнерское Estriado (+40%)
};

/**
 * Hardware finish surcharge relative to baseline polished chrome (in rubles).
 */
export const HARDWARE_SURCHARGES: Record<CalculatorHardwareFinish, number> = {
  chrome: 0,        // Полированный хром (базовый)
  black: 3500,      // Черный матовый
  white: 4000,      // Белый матовый
  gunmetal: 6000,   // Оружейная сталь (Gunmetal PVD)
  bronze: 6500,     // Матовая состаренная бронза
  gold: 7000,       // Брашированное золото (PVD)
};

/**
 * Add-on option fixed prices (in rubles).
 */
export const OPTION_PRICES = {
  installation: 6000,          // Профессиональный монтаж с лазерным нивелиром
  hydrophobicCoating: 2500,    // Нано-гидрофобное покрытие «Антикапля»
} as const;

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
    badge: 'Базовое',
  },
  optiwhite: {
    name: 'Осветленное Optiwhite',
    description: 'Максимально прозрачное стекло без бутылочного оттенка. Идеальная цветопередача плитки и мозаики.',
    thickness: '8-10 мм',
    badge: 'Хит продаж (+30%)',
  },
  matelux: {
    name: 'Матовое Matelux',
    description: 'Стекло с химическим травлением (сатинат). Шелковистая поверхность, защита от отпечатков пальцев.',
    thickness: '8 мм',
    badge: '+25%',
  },
  estriado: {
    name: 'Рифленое Estriado',
    description: 'Фактурное рельефное стекло с вертикальными полосами. Дизайнерский тренд, скрывает силуэт и капли.',
    thickness: '8 мм',
    badge: 'Премиум (+40%)',
  },
  graphite: {
    name: 'Тонированное Графит',
    description: 'Элегантное дымчато-серое стекло, тонированное в массе. Идеально для интерьеров в темных тонах.',
    thickness: '8 мм',
    badge: '+35%',
  },
  bronze: {
    name: 'Тонированное Бронза',
    description: 'Теплый благородный коньячный оттенок. Отлично сочетается с золотой и латунной фурнитурой.',
    thickness: '8 мм',
    badge: '+35%',
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
    priceBadge: 'Включено в базу',
  },
  black: {
    name: 'Черный матовый',
    description: 'Глубокий бархатистый матовый черный, устойчивое порошковое напыление.',
    colorHex: '#1F2937',
    priceBadge: '+3 500 ₽',
  },
  white: {
    name: 'Белый матовый',
    description: 'Чистый белый матовый оттенок для светлых скандинавских интерьеров.',
    colorHex: '#F3F4F6',
    priceBadge: '+4 000 ₽',
  },
  gunmetal: {
    name: 'Оружейная сталь',
    description: 'Темный титановый графит с благородным металлическим блеском (Gunmetal).',
    colorHex: '#4B5563',
    priceBadge: '+6 000 ₽',
  },
  bronze: {
    name: 'Матовая бронза',
    description: 'Античная состаренная бронза для интерьеров в стиле неоклассика.',
    colorHex: '#92400E',
    priceBadge: '+6 500 ₽',
  },
  gold: {
    name: 'Брашированное золото',
    description: 'Премиальное PVD-покрытие с текстурой тонкой шлифовки под матовую латунь.',
    colorHex: '#D97706',
    priceBadge: '+7 000 ₽',
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
  hasInstallation: true,
  hasHydrophobicCoating: true,
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

  const baseRate = BASE_RATES_PER_SQM[state.cabinType] ?? 18000;
  const basePrice = Math.round(areaSqm * baseRate);

  const glassMultiplier = GLASS_MULTIPLIERS[state.glassType] ?? 1.0;
  // glassPrice represents the premium above standard float glass
  const glassPrice = Math.round(basePrice * (glassMultiplier - 1.0));

  const hardwarePrice = HARDWARE_SURCHARGES[state.hardwareFinish] ?? 0;

  let optionsPrice = 0;
  if (state.hasInstallation) {
    optionsPrice += OPTION_PRICES.installation;
  }
  if (state.hasHydrophobicCoating) {
    optionsPrice += OPTION_PRICES.hydrophobicCoating;
  }

  const totalPrice = basePrice + glassPrice + hardwarePrice + optionsPrice;

  return {
    basePrice,
    glassPrice,
    hardwarePrice,
    optionsPrice,
    totalPrice,
    formattedTotal: formatPrice(totalPrice),
    areaSqm,
  };
}
