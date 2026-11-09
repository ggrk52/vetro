import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

console.log('=== Verifying Milestone M2 Presentation Components ===');

// 1. Verify existence of 5 components
const componentFiles = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/hero/HeroSection.tsx',
  'src/components/advantages/AdvantagesSection.tsx',
  'src/components/trust/MasterPersona.tsx',
];

for (const relPath of componentFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Component file exists: ${relPath}`);
}

// 2. Verify referenced images exist in public/
const referencedImages = [
  'public/portfolio/hero_optiwhite_gold.jpg',
  'public/portfolio/master_vlad.jpg',
];

for (const relImg of referencedImages) {
  const fullPath = path.join(projectRoot, relImg);
  assert(fs.existsSync(fullPath), `Referenced image exists on disk: ${relImg}`);
  const stats = fs.statSync(fullPath);
  assert(stats.size > 1000, `Image file ${relImg} is non-empty (${stats.size} bytes)`);
}

// 3. Inspect Header.tsx
const headerCode = fs.readFileSync(path.join(projectRoot, 'src/components/layout/Header.tsx'), 'utf-8');
assert(headerCode.includes('Душевые кабины от Влада'), 'Header includes brand title');
assert(headerCode.includes('Москва и область'), 'Header includes geographic coverage');
assert(headerCode.includes('#catalog') && headerCode.includes('#advantages') && headerCode.includes('#calculator'), 'Header includes anchor links');
assert(headerCode.includes('businessConfig.whatsappUrl'), 'Header includes WhatsApp link');
assert(headerCode.includes('businessConfig.telegramUrl'), 'Header includes Telegram link');
assert(headerCode.includes('businessConfig.phone'), 'Header includes direct phone link');
assert(headerCode.includes('Вызвать замерщика'), 'Header includes CTA button');
assert(headerCode.includes('min-h-[48px]'), 'Header mobile elements have touch target >= 48px');

// 4. Inspect Footer.tsx
const footerCode = fs.readFileSync(path.join(projectRoot, 'src/components/layout/Footer.tsx'), 'utf-8');
assert(footerCode.includes('Душевые кабины от Влада'), 'Footer includes brand title');
assert(footerCode.includes('Конструкции'), 'Footer includes constructions column');
assert(footerCode.includes('Услуги и стандарты'), 'Footer includes services column');
assert(footerCode.includes('Прямая связь'), 'Footer includes contacts column');
assert(footerCode.includes('businessConfig.workingHours'), 'Footer includes working hours');
assert(footerCode.includes('businessConfig.serviceRegion'), 'Footer includes service region');
assert(footerCode.includes('2026'), 'Footer includes 2026 copyright');

// 5. Inspect HeroSection.tsx
const heroCode = fs.readFileSync(path.join(projectRoot, 'src/components/hero/HeroSection.tsx'), 'utf-8');
assert(heroCode.includes('Изготовление и монтаж душевых кабин из'), 'Hero includes H1 heading');
assert(heroCode.includes('закаленного стекла'), 'Hero includes tempered glass H1 focus');
assert(heroCode.includes('Владислава'), 'Hero mentions master Vladislav');
assert(heroCode.includes('Boheme Milano'), 'Hero mentions Boheme Milano hardware');
assert(heroCode.includes('Замер за 24 часа'), 'Hero includes 24h measurement chip');
assert(heroCode.includes('Стекло 8–10 мм Optiwhite и Estriado'), 'Hero includes glass chip');
assert(heroCode.includes('Рассчитать стоимость в WhatsApp'), 'Hero includes primary WhatsApp CTA');
assert(heroCode.includes('Заказать бесплатный замер'), 'Hero includes measurement CTA');
assert(heroCode.includes('/portfolio/hero_optiwhite_gold.jpg'), 'Hero references showcase photo');

// 6. Inspect AdvantagesSection.tsx
const advCode = fs.readFileSync(path.join(projectRoot, 'src/components/advantages/AdvantagesSection.tsx'), 'utf-8');
assert(advCode.includes('Прямая работа с мастером'), 'Advantages includes Direct Master card');
assert(advCode.includes('Безопасное закаленное стекло 8–10 мм'), 'Advantages includes Tempered Glass card');
assert(advCode.includes('Лазерный 3D-замер'), 'Advantages includes Laser Measuring card');
assert(advCode.includes('Премиальная фурнитура'), 'Advantages includes Hardware card');
assert(advCode.includes('100% герметичность'), 'Advantages includes 100% Leakproof card');
assert(advCode.includes('Гарантия до 5 лет'), 'Advantages includes Warranty card');

// 7. Inspect MasterPersona.tsx
const masterCode = fs.readFileSync(path.join(projectRoot, 'src/components/trust/MasterPersona.tsx'), 'utf-8');
assert(masterCode.includes('О мастере'), 'Master section includes heading');
assert(masterCode.includes('/portfolio/master_vlad.jpg'), 'Master section references master photo');
assert(masterCode.includes('Каждый санузел уникален: неровности стен, скрытые коммуникации, уклон плитки к трапу'), 'Master section includes verbatim quote');
assert(masterCode.includes('>500'), 'Master section includes >500 metric');
assert(masterCode.includes('0'), 'Master section includes 0 leaks metric');
assert(masterCode.includes('10'), 'Master section includes 10 years experience metric');
assert(masterCode.includes('100%'), 'Master section includes 100% tempered glass metric');

console.log(`\n=== Verification Summary: ${errorCount} errors ===`);
if (errorCount === 0) {
  console.log('ALL M2 PRESENTATION CHECKS PASSED!');
  process.exit(0);
} else {
  console.error(`FAILED WITH ${errorCount} ERRORS!`);
  process.exit(1);
}
