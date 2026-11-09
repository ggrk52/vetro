import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
  HARDWARE_METADATA
} from '../src/utils/calculatorPricing.ts';
import type { 
  CalculatorState, 
  CalculatorCabinType, 
  CalculatorGlassType, 
  CalculatorHardwareFinish 
} from '../src/utils/calculatorPricing.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

let errorCount = 0;
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errorCount++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('=== Verifying Milestone M4: Calculator, Modals, FAQ, and Lead Generation ===');

// 1. Verify existence of all 8 component files
const componentFiles = [
  'src/components/common/PhoneInputMask.tsx',
  'src/components/common/FloatingMessengers.tsx',
  'src/components/common/MobileStickyCta.tsx',
  'src/components/modals/MeasurementModal.tsx',
  'src/components/trust/WorkflowGuarantees.tsx',
  'src/components/calculator/CalculatorSection.tsx',
  'src/components/faq/FAQSection.tsx',
  'src/components/contacts/ContactSection.tsx',
];

for (const relPath of componentFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Component file exists: ${relPath}`);
  const stats = fs.statSync(fullPath);
  assert(stats.size > 200, `Component file is non-empty (${stats.size} bytes): ${relPath}`);
}

// 2. Inspect PhoneInputMask.tsx
console.log('\n--- Testing PhoneInputMask component ---');
const phoneMaskCode = fs.readFileSync(path.join(projectRoot, 'src/components/common/PhoneInputMask.tsx'), 'utf-8');
assert(phoneMaskCode.includes('+7 ('), 'PhoneInputMask includes Russian +7 prefix');
assert(phoneMaskCode.includes('onPaste'), 'PhoneInputMask handles paste event');
assert(phoneMaskCode.includes('onKeyDown'), 'PhoneInputMask handles backspace/keydown event');
assert(phoneMaskCode.includes('inputMode="tel"'), 'PhoneInputMask specifies tel inputMode');
assert(phoneMaskCode.includes('extractRawPhoneDigits'), 'PhoneInputMask exports extractRawPhoneDigits');
assert(phoneMaskCode.includes('formatRussianPhone'), 'PhoneInputMask exports formatRussianPhone');
assert(phoneMaskCode.includes('isPhoneComplete'), 'PhoneInputMask exports isPhoneComplete');

// 3. Inspect FloatingMessengers.tsx
console.log('\n--- Testing FloatingMessengers ---');
const floatingCode = fs.readFileSync(path.join(projectRoot, 'src/components/common/FloatingMessengers.tsx'), 'utf-8');
assert(floatingCode.includes('businessConfig.whatsappUrl'), 'FloatingMessengers includes WhatsApp link');
assert(floatingCode.includes('businessConfig.telegramUrl'), 'FloatingMessengers includes Telegram link');
assert(floatingCode.includes('businessConfig.phone'), 'FloatingMessengers includes phone call link');
assert(floatingCode.includes('Написать мастеру'), 'FloatingMessengers has tooltip/label');
assert(floatingCode.includes('animate-ping') || floatingCode.includes('pulse'), 'FloatingMessengers has pulse animation');
assert(floatingCode.includes('fixed'), 'FloatingMessengers is fixed position');

// 4. Inspect MobileStickyCta.tsx
console.log('\n--- Testing MobileStickyCta ---');
const mobileCtaCode = fs.readFileSync(path.join(projectRoot, 'src/components/common/MobileStickyCta.tsx'), 'utf-8');
assert(mobileCtaCode.includes('md:hidden') && mobileCtaCode.includes('block'), 'MobileStickyCta visible only on mobile screens');
assert(mobileCtaCode.includes('bottom-0'), 'MobileStickyCta fixed at bottom');
assert(mobileCtaCode.includes('Рассчитать стоимость'), 'MobileStickyCta has calculation button');
assert(mobileCtaCode.includes('#calculator'), 'MobileStickyCta scrolls to #calculator');
assert(mobileCtaCode.includes('businessConfig.whatsappUrl'), 'MobileStickyCta includes WhatsApp quick button');

// 5. Inspect MeasurementModal.tsx
console.log('\n--- Testing MeasurementModal ---');
const modalCode = fs.readFileSync(path.join(projectRoot, 'src/components/modals/MeasurementModal.tsx'), 'utf-8');
assert(modalCode.includes('role="dialog"'), 'MeasurementModal has role="dialog"');
assert(modalCode.includes('aria-modal="true"'), 'MeasurementModal has aria-modal="true"');
assert(modalCode.includes('Escape'), 'MeasurementModal handles Escape key');
assert(modalCode.includes('PhoneInputMask'), 'MeasurementModal integrates PhoneInputMask');
assert(modalCode.includes('Владислав свяжется с вами в течение 15 минут'), 'MeasurementModal has 15-min confirmation message');
assert(modalCode.includes('70 км от МКАД') || modalCode.includes('70 км'), 'MeasurementModal specifies Moscow & MO service area');

// 6. Inspect WorkflowGuarantees.tsx
console.log('\n--- Testing WorkflowGuarantees ---');
const workflowCode = fs.readFileSync(path.join(projectRoot, 'src/components/trust/WorkflowGuarantees.tsx'), 'utf-8');
assert(workflowCode.includes('Заявка и расчет') || workflowCode.includes('Заявка и предварительный расчет'), 'Workflow has Step 1');
assert(workflowCode.includes('3D-замер') || workflowCode.includes('Бесплатный лазерный'), 'Workflow has Step 2');
assert(workflowCode.includes('Проект и договор') || workflowCode.includes('официальный договор'), 'Workflow has Step 3');
assert(workflowCode.includes('Заводская закалка') || workflowCode.includes('Заводское изготовление'), 'Workflow has Step 4');
assert(workflowCode.includes('Доставка и монтаж') || workflowCode.includes('чистый монтаж'), 'Workflow has Step 5');
assert(workflowCode.includes('Тест и гарантия') || workflowCode.includes('тест на герметичность'), 'Workflow has Step 6');
assert(workflowCode.includes('3 года') && workflowCode.includes('5 лет') && workflowCode.includes('10 лет'), 'Workflow includes 3, 5, 10 year warranty cards');
assert(workflowCode.includes('ГОСТ 30698'), 'Workflow references tempered glass GOST 30698');
assert(workflowCode.includes('BOHÉME') || workflowCode.includes('Boheme'), 'Workflow references Boheme hardware');

// 7. Inspect CalculatorSection.tsx
console.log('\n--- Testing CalculatorSection ---');
const calcCode = fs.readFileSync(path.join(projectRoot, 'src/components/calculator/CalculatorSection.tsx'), 'utf-8');
assert(calcCode.includes('id="calculator"'), 'CalculatorSection anchored at id="calculator"');
assert(calcCode.includes('CABIN_TYPE_METADATA'), 'CalculatorSection uses CABIN_TYPE_METADATA');
assert(calcCode.includes('GLASS_METADATA'), 'CalculatorSection uses GLASS_METADATA');
assert(calcCode.includes('HARDWARE_METADATA'), 'CalculatorSection uses HARDWARE_METADATA');
assert(calcCode.includes('calculatePrice'), 'CalculatorSection calls calculatePrice formula');
assert(calcCode.includes('PhoneInputMask'), 'CalculatorSection integrates PhoneInputMask in Step 5');
assert(calcCode.includes('wa.me'), 'CalculatorSection generates direct WhatsApp link with quote');

// Verify pricing calculation outputs
const defaultBreakdown = calculatePrice(DEFAULT_CALCULATOR_STATE);
assert(defaultBreakdown.totalPrice > 20000, `Default calculator price is positive and realistic (${defaultBreakdown.formattedTotal})`);
assert(defaultBreakdown.areaSqm === 2, `Default 100x200cm walkin area is 2.00 sqm (got ${defaultBreakdown.areaSqm})`);

// 8. Inspect FAQSection.tsx
console.log('\n--- Testing FAQSection ---');
const faqCode = fs.readFileSync(path.join(projectRoot, 'src/components/faq/FAQSection.tsx'), 'utf-8');
assert(faqCode.includes('id="faq"'), 'FAQSection anchored at id="faq"');
assert(faqCode.includes('Чем закаленное стекло 8 мм лучше магазинной'), 'FAQ contains question 1');
assert(faqCode.includes('Что такое стекло Optiwhite'), 'FAQ contains question 2');
assert(faqCode.includes('Не разобьется ли стекло при'), 'FAQ contains question 3');
assert(faqCode.includes('Будет ли течь вода из душевой без поддона'), 'FAQ contains question 4');
assert(faqCode.includes('Как ухаживать за стеклом'), 'FAQ contains question 5');
assert(faqCode.includes('В какие сроки изготавливается'), 'FAQ contains question 6');
assert(faqCode.includes('aria-expanded') && faqCode.includes('aria-controls'), 'FAQ accordion has accessibility attributes');

// 9. Inspect ContactSection.tsx
console.log('\n--- Testing ContactSection ---');
const contactCode = fs.readFileSync(path.join(projectRoot, 'src/components/contacts/ContactSection.tsx'), 'utf-8');
assert(contactCode.includes('id="contacts"'), 'ContactSection anchored at id="contacts"');
assert(contactCode.includes('businessConfig.phone'), 'ContactSection displays phone number');
assert(contactCode.includes('businessConfig.whatsappUrl'), 'ContactSection includes WhatsApp link');
assert(contactCode.includes('businessConfig.telegramUrl'), 'ContactSection includes Telegram link');
assert(contactCode.includes('businessConfig.workingHours'), 'ContactSection displays working hours');
assert(contactCode.includes('businessConfig.serviceRegion'), 'ContactSection displays service territory');
assert(contactCode.includes('PhoneInputMask'), 'ContactSection integrates PhoneInputMask');
assert(contactCode.includes('Одинцово') && contactCode.includes('Красногорск'), 'ContactSection lists Moscow region key cities');

console.log(`\n=== Verification Summary: ${errorCount} errors ===`);
if (errorCount === 0) {
  console.log('ALL M4 CALCULATOR & LEADS CHECKS PASSED CONVINCINGLY! ✅');
  process.exit(0);
} else {
  console.error(`FAILED WITH ${errorCount} ERRORS! ❌`);
  process.exit(1);
}
