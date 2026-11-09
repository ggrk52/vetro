import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { portfolioItems } from '../src/data/portfolioData.ts';

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

console.log('=== Verifying Milestone M5: Application Assembly, Styling & Production Build ===\n');

// 1. Verify TypeScript type checking exits with 0 errors
console.log('--- 1. TypeScript Strict Type Checking (tsc --noEmit) ---');
try {
  execSync('npx tsc --noEmit', { cwd: projectRoot, stdio: 'pipe' });
  assert(true, 'npx tsc --noEmit executed successfully with 0 errors');
} catch (err: any) {
  assert(false, `npx tsc --noEmit failed with error: ${err.message || String(err)}`);
}

// 2. Verify existence and content of src/index.css
console.log('\n--- 2. Styling & Global CSS (src/index.css) ---');
const indexCssPath = path.join(projectRoot, 'src/index.css');
assert(fs.existsSync(indexCssPath), 'src/index.css exists');
const indexCss = fs.readFileSync(indexCssPath, 'utf-8');
assert(indexCss.includes('@tailwind base;'), 'src/index.css includes @tailwind base;');
assert(indexCss.includes('@tailwind components;'), 'src/index.css includes @tailwind components;');
assert(indexCss.includes('@tailwind utilities;'), 'src/index.css includes @tailwind utilities;');
assert(indexCss.includes('scroll-behavior: smooth;'), 'src/index.css includes smooth scrolling');
assert(indexCss.includes('overflow-x: hidden;'), 'src/index.css prevents horizontal overflow');
assert(indexCss.includes('::-webkit-scrollbar'), 'src/index.css includes custom scrollbar rules');
assert(indexCss.includes('@keyframes fadeIn'), 'src/index.css includes fadeIn animation');

// 3. Verify HTML shell (index.html)
console.log('\n--- 3. HTML Shell (index.html) ---');
const indexHtmlPath = path.join(projectRoot, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'index.html exists');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
assert(
  indexHtml.includes('Душевые кабины из закаленного стекла на заказ в Москве и МО | Мастер Владислав'),
  'index.html title matches target business title'
);
assert(indexHtml.includes('viewport') && indexHtml.includes('width=device-width'), 'index.html includes viewport meta');
assert(
  indexHtml.includes('ГОСТ 30698-2014') &&
  indexHtml.includes('BOHÉME Milano') &&
  indexHtml.includes('3D-лазерный замер') &&
  indexHtml.includes('Владислав'),
  'index.html meta description highlights master craftsmanship, glass standards, hardware, and measurement'
);
assert(indexHtml.includes('fonts.googleapis.com') && indexHtml.includes('Inter'), 'index.html includes Inter font preconnects');
assert(indexHtml.includes('favicon.svg'), 'index.html includes clean svg favicon');

// 4. Verify Entry Point (src/main.tsx)
console.log('\n--- 4. Application Entry Point (src/main.tsx) ---');
const mainTsxPath = path.join(projectRoot, 'src/main.tsx');
assert(fs.existsSync(mainTsxPath), 'src/main.tsx exists');
const mainTsx = fs.readFileSync(mainTsxPath, 'utf-8');
assert(mainTsx.includes("import './index.css';") || mainTsx.includes('import "./index.css";'), 'src/main.tsx imports ./index.css');
assert(mainTsx.includes("document.getElementById('root')"), 'src/main.tsx mounts to root element');
assert(mainTsx.includes('<App />') || mainTsx.includes('<App/>'), 'src/main.tsx renders <App />');

// 5. Verify App Assembly (src/App.tsx)
console.log('\n--- 5. Landing Page Assembly (src/App.tsx) ---');
const appTsxPath = path.join(projectRoot, 'src/App.tsx');
assert(fs.existsSync(appTsxPath), 'src/App.tsx exists');
const appTsx = fs.readFileSync(appTsxPath, 'utf-8');

// Verify all required component imports
const requiredComponents = [
  'Header',
  'HeroSection',
  'AdvantagesSection',
  'CatalogSection',
  'GlassShowcase',
  'HardwareShowcase',
  'CalculatorSection',
  'PortfolioGallery',
  'MasterPersona',
  'WorkflowGuarantees',
  'FAQSection',
  'ContactSection',
  'Footer',
  'MeasurementModal',
  'VideoModal',
  'FloatingMessengers',
  'MobileStickyCta',
];

for (const comp of requiredComponents) {
  assert(appTsx.includes(comp), `App.tsx imports and renders <${comp} />`);
}

// Verify anchor targets
const requiredAnchors = [
  'catalog',
  'calculator',
  'materials',
  'advantages',
  'faq',
  'contacts',
  'reviews',
  'master',
];

for (const anchor of requiredAnchors) {
  assert(
    appTsx.includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'catalog', 'CatalogSection.tsx'), 'utf-8').includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'calculator', 'CalculatorSection.tsx'), 'utf-8').includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'materials', 'GlassShowcase.tsx'), 'utf-8').includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'advantages', 'AdvantagesSection.tsx'), 'utf-8').includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'faq', 'FAQSection.tsx'), 'utf-8').includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'contacts', 'ContactSection.tsx'), 'utf-8').includes(`id="${anchor}"`) ||
    fs.readFileSync(path.join(projectRoot, 'src/components', 'trust', 'MasterPersona.tsx'), 'utf-8').includes(`id="${anchor}"`),
    `Anchor target #${anchor} is present in landing page DOM`
  );
}

// Verify state management for modals
assert(appTsx.includes('isMeasurementOpen'), 'App.tsx maintains isMeasurementOpen state');
assert(appTsx.includes('isVideoOpen'), 'App.tsx maintains isVideoOpen state');
assert(appTsx.includes('handleOpenMeasurement'), 'App.tsx provides handleOpenMeasurement trigger');
assert(appTsx.includes('handleOpenVideo'), 'App.tsx provides handleOpenVideo trigger');

// 6. Verify Production Build Output in dist/
console.log('\n--- 6. Production Build Directory (dist/) ---');
const distPath = path.join(projectRoot, 'dist');
assert(fs.existsSync(distPath), 'dist/ directory exists');
const distHtmlPath = path.join(distPath, 'index.html');
assert(fs.existsSync(distHtmlPath), 'dist/index.html exists');
const distHtml = fs.readFileSync(distHtmlPath, 'utf-8');
assert(distHtml.includes('<div id="root"></div>'), 'dist/index.html contains root mount div');
assert(distHtml.includes('/assets/index-') && distHtml.includes('.js'), 'dist/index.html loads bundled production script');
assert(distHtml.includes('/assets/index-') && distHtml.includes('.css'), 'dist/index.html loads compiled Tailwind stylesheet');

// 7. Verify All 60 Portfolio Photos in public/ and dist/
console.log('\n--- 7. Static Asset Integrity (Portfolio Photos & Videos) ---');
assert(portfolioItems.length === 60, `Portfolio items count is 60 (got ${portfolioItems.length})`);

let missingPublicPhotos = 0;
let missingDistPhotos = 0;
for (const item of portfolioItems) {
  const publicFile = path.join(projectRoot, 'public', item.imageSrc);
  const distFile = path.join(projectRoot, 'dist', item.imageSrc);
  if (!fs.existsSync(publicFile)) missingPublicPhotos++;
  if (!fs.existsSync(distFile)) missingDistPhotos++;
}
assert(missingPublicPhotos === 0, 'All 60 portfolio images exist in public/portfolio/');
assert(missingDistPhotos === 0, 'All 60 portfolio images exist in dist/portfolio/');

// Verify videos
const requiredVideos = [
  'public/videos/sliding_bath_demo.mp4',
  'public/videos/sliding_bath_thumb.jpg',
  'public/videos/estriado_gold_demo.mp4',
  'public/videos/estriado_gold_thumb.jpg',
  'dist/videos/sliding_bath_demo.mp4',
  'dist/videos/sliding_bath_thumb.jpg',
  'dist/videos/estriado_gold_demo.mp4',
  'dist/videos/estriado_gold_thumb.jpg',
];

for (const vid of requiredVideos) {
  const fullP = path.join(projectRoot, vid);
  assert(fs.existsSync(fullP), `Media asset exists: ${vid}`);
  const stats = fs.statSync(fullP);
  assert(stats.size > 1000, `Media asset is non-empty (${stats.size} bytes): ${vid}`);
}

// Summary
console.log(`\n=== Verification Summary: ${errorCount} errors ===`);
if (errorCount === 0) {
  console.log('🎉 ALL M5 APPLICATION ASSEMBLY & PRODUCTION BUILD CHECKS PASSED PERFECTLY!\n');
} else {
  console.error(`❌ FAILED WITH ${errorCount} ERRORS!`);
  process.exit(1);
}
