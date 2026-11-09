import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  portfolioItems,
  getCabinCategoryLabel,
  getFeaturedItems,
  getItemsByCategory,
  getCategoryFilterOptions,
} from '../src/data/portfolioData.ts';
import type {
  CabinCategory,
  PortfolioItem,
} from '../src/data/portfolioData.ts';

import {
  calculatePrice,
  calculateGlassArea,
  formatPrice,
  DEFAULT_CALCULATOR_STATE,
  BASE_RATES_PER_SQM,
  GLASS_MULTIPLIERS,
  HARDWARE_SURCHARGES,
  OPTION_PRICES,
  CABIN_TYPE_METADATA,
  GLASS_METADATA,
  HARDWARE_METADATA,
} from '../src/utils/calculatorPricing.ts';
import type {
  CalculatorState,
  CalculatorCabinType,
  CalculatorGlassType,
  CalculatorHardwareFinish,
} from '../src/utils/calculatorPricing.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

let errors = 0;
function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    errors++;
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

console.log('--- 1. Testing Portfolio Data ---');

assert(portfolioItems.length === 60, `portfolioItems length is 60 (got ${portfolioItems.length})`);

const ids = new Set<string>();
const expectedCategories: CabinCategory[] = [
  'corner',
  'walkin',
  'niche',
  'sliding',
  'bath_screen',
  'trapezoid',
  'mirror',
  'loft',
];

for (const item of portfolioItems) {
  // Check unique ID
  if (ids.has(item.id)) {
    assert(false, `Duplicate ID: ${item.id}`);
  }
  ids.add(item.id);

  // Check required non-empty string fields
  assert(item.title && item.title.trim().length > 5, `Item ${item.id} has valid title`);
  assert(expectedCategories.includes(item.category), `Item ${item.id} has valid category (${item.category})`);
  assert(item.imageSrc && item.imageSrc.startsWith('/portfolio/'), `Item ${item.id} has imageSrc starting with /portfolio/`);
  assert(item.glassType && item.glassType.trim().length > 3, `Item ${item.id} has valid glassType`);
  assert(item.hardwareFinish && item.hardwareFinish.trim().length > 3, `Item ${item.id} has valid hardwareFinish`);
  assert(item.description && item.description.trim().length >= 20, `Item ${item.id} has detailed description`);

  // Verify file exists on disk
  const relativePath = item.imageSrc.replace('/portfolio/', '');
  const filePath = path.join(projectRoot, 'public', 'portfolio', relativePath);
  assert(fs.existsSync(filePath), `Physical file exists for ${item.id} -> ${filePath}`);
}

console.log('--- 2. Testing Portfolio Helpers ---');

assert(getCabinCategoryLabel('all') === 'Все работы', 'getCabinCategoryLabel(all)');
assert(getCabinCategoryLabel('corner') === 'Угловые 90°', 'getCabinCategoryLabel(corner)');
assert(getCabinCategoryLabel('walkin') === 'Перегородки Walk-In', 'getCabinCategoryLabel(walkin)');
assert(getCabinCategoryLabel('niche') === 'Двери в нишу', 'getCabinCategoryLabel(niche)');
assert(getCabinCategoryLabel('sliding') === 'Раздвижные системы', 'getCabinCategoryLabel(sliding)');
assert(getCabinCategoryLabel('bath_screen') === 'Шторки на ванну', 'getCabinCategoryLabel(bath_screen)');
assert(getCabinCategoryLabel('trapezoid') === 'Трапеции 135°', 'getCabinCategoryLabel(trapezoid)');
assert(getCabinCategoryLabel('mirror') === 'Зеркала с LED', 'getCabinCategoryLabel(mirror)');
assert(getCabinCategoryLabel('loft') === 'Черный лофт', 'getCabinCategoryLabel(loft)');

const featured = getFeaturedItems();
assert(featured.length >= 10, `getFeaturedItems() returns at least 10 items (got ${featured.length})`);
assert(featured.every((i) => i.featured === true), 'All featured items have featured === true');

const allItems = getItemsByCategory('all');
assert(allItems.length === 60, 'getItemsByCategory(all) returns 60 items');

const cornerItems = getItemsByCategory('corner');
assert(cornerItems.length >= 8, `corner items >= 8 (got ${cornerItems.length})`);

const options = getCategoryFilterOptions();
assert(options.length === 9, `getCategoryFilterOptions returns 9 category tabs (got ${options.length})`);
const allTab = options.find((o) => o.id === 'all');
assert(allTab?.count === 60, `all category tab count is 60 (got ${allTab?.count})`);

console.log('--- 3. Testing Calculator Pricing Logic ---');

// Area calculation
const walkinArea = calculateGlassArea('walkin', 100, 200);
assert(walkinArea === 2.0, `walkin 100x200 area is 2.0 m² (got ${walkinArea})`);

const cornerArea = calculateGlassArea('corner', 90, 200, 90);
assert(cornerArea === 3.6, `corner 90x90x200 area is 3.6 m² (got ${cornerArea})`);

const trapezoidArea = calculateGlassArea('trapezoid', 95, 200, 95);
// (0.95 + 0.95) * 1.15 * 2 = 1.9 * 1.15 * 2 = 4.37 m²
assert(trapezoidArea > 4.0 && trapezoidArea < 4.5, `trapezoid 95x95x200 area around 4.37 m² (got ${trapezoidArea})`);

// Pricing calculation with default state
const defaultPrice = calculatePrice(DEFAULT_CALCULATOR_STATE);
console.log('Default Price Breakdown:', defaultPrice);

assert(defaultPrice.areaSqm === 2.0, 'Default state area is 2.0 m²');
assert(defaultPrice.basePrice === 2.0 * BASE_RATES_PER_SQM.walkin, `basePrice = 2 * 14000 = ${defaultPrice.basePrice}`);
assert(defaultPrice.glassPrice === Math.round(defaultPrice.basePrice * 0.30), `glassPrice optiwhite (+30%) = ${defaultPrice.glassPrice}`);
assert(defaultPrice.hardwarePrice === HARDWARE_SURCHARGES.black, `hardwarePrice black = ${defaultPrice.hardwarePrice}`);
assert(defaultPrice.optionsPrice === OPTION_PRICES.installation + OPTION_PRICES.hydrophobicCoating, `optionsPrice = 8500 (got ${defaultPrice.optionsPrice})`);
assert(
  defaultPrice.totalPrice ===
    defaultPrice.basePrice + defaultPrice.glassPrice + defaultPrice.hardwarePrice + defaultPrice.optionsPrice,
  'totalPrice equals sum of breakdown components'
);
assert(defaultPrice.formattedTotal.includes('₽'), 'formattedTotal contains ₽');

// Test baseline float glass with chrome hardware (0 surcharges)
const baselineState: CalculatorState = {
  cabinType: 'niche',
  width: 90,
  height: 200,
  glassType: 'float',
  hardwareFinish: 'chrome',
  hasInstallation: false,
  hasHydrophobicCoating: false,
};
const baselinePrice = calculatePrice(baselineState);
assert(baselinePrice.glassPrice === 0, 'Float glass has 0 surcharge');
assert(baselinePrice.hardwarePrice === 0, 'Chrome hardware has 0 surcharge');
assert(baselinePrice.optionsPrice === 0, 'No options selected has 0 surcharge');
assert(baselinePrice.totalPrice === baselinePrice.basePrice, 'Total price equals base price for baseline config');

// Test corner cabin with bronze glass and gold hardware
const luxuryCornerState: CalculatorState = {
  cabinType: 'corner',
  width: 100,
  height: 200,
  depth: 100,
  glassType: 'bronze',
  hardwareFinish: 'gold',
  hasInstallation: true,
  hasHydrophobicCoating: true,
};
const luxuryPrice = calculatePrice(luxuryCornerState);
assert(luxuryPrice.areaSqm === 4.0, `Corner 100x100x200 area is 4.0 m² (got ${luxuryPrice.areaSqm})`);
assert(luxuryPrice.basePrice === 4.0 * 22000, `Base price is 88000 (got ${luxuryPrice.basePrice})`);
assert(luxuryPrice.glassPrice === Math.round(88000 * 0.35), `Bronze glass is +35% (got ${luxuryPrice.glassPrice})`);
assert(luxuryPrice.hardwarePrice === 7000, `Gold hardware is 7000 (got ${luxuryPrice.hardwarePrice})`);
assert(luxuryPrice.optionsPrice === 8500, `Installation + coating is 8500 (got ${luxuryPrice.optionsPrice})`);
assert(
  luxuryPrice.totalPrice ===
    luxuryPrice.basePrice + luxuryPrice.glassPrice + luxuryPrice.hardwarePrice + luxuryPrice.optionsPrice,
  'Luxury corner total price matches sum'
);

// Test all cabin types
const allCabinTypes: CalculatorCabinType[] = ['walkin', 'corner', 'niche', 'sliding', 'bath_screen', 'trapezoid'];
for (const type of allCabinTypes) {
  const meta = CABIN_TYPE_METADATA[type];
  assert(meta !== undefined && meta.title.length > 0, `Cabin type ${type} has metadata`);
  const price = calculatePrice({
    cabinType: type,
    width: meta.defaultDimensions.width,
    height: meta.defaultDimensions.height,
    depth: meta.defaultDimensions.depth,
    glassType: 'optiwhite',
    hardwareFinish: 'chrome',
    hasInstallation: false,
    hasHydrophobicCoating: false,
  });
  assert(price.totalPrice > 10000, `Cabin type ${type} produces reasonable price (${price.totalPrice})`);
}

// Test all glass types
const allGlassTypes: CalculatorGlassType[] = ['float', 'optiwhite', 'matelux', 'estriado', 'graphite', 'bronze'];
for (const g of allGlassTypes) {
  assert(GLASS_METADATA[g] !== undefined, `Glass type ${g} has metadata`);
}

// Test all hardware finishes
const allHardware: CalculatorHardwareFinish[] = ['chrome', 'black', 'white', 'gunmetal', 'bronze', 'gold'];
for (const h of allHardware) {
  assert(HARDWARE_METADATA[h] !== undefined, `Hardware finish ${h} has metadata`);
}

console.log(`\n=== Verification Complete: ${errors} errors ===`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATIONS PASSED CONVINCINGLY!');
}
