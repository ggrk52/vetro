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

console.log('=== Verifying Milestone M3: Materials, Catalog & Gallery Components ===');

// 1. Verify existence of all 7 required component files
const componentFiles = [
  'src/components/materials/GlassShowcase.tsx',
  'src/components/materials/HardwareShowcase.tsx',
  'src/components/catalog/CatalogSection.tsx',
  'src/components/catalog/CatalogCard.tsx',
  'src/components/gallery/PortfolioGallery.tsx',
  'src/components/gallery/LightboxModal.tsx',
  'src/components/modals/VideoModal.tsx',
];

for (const relPath of componentFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Component file exists: ${relPath}`);
  const stats = fs.statSync(fullPath);
  assert(stats.size > 200, `Component file is non-empty (${stats.size} bytes): ${relPath}`);
}

// 2. Inspect GlassShowcase.tsx
const glassCode = fs.readFileSync(path.join(projectRoot, 'src/components/materials/GlassShowcase.tsx'), 'utf-8');
assert(glassCode.includes('optiwhite') && glassCode.includes('Optiwhite'), 'GlassShowcase includes Optiwhite');
assert(glassCode.includes('float') && glassCode.includes('Float'), 'GlassShowcase includes Float Clear');
assert(glassCode.includes('matelux') && glassCode.includes('Matelux'), 'GlassShowcase includes Matelux');
assert(glassCode.includes('estriado') && glassCode.includes('Estriado'), 'GlassShowcase includes Estriado');
assert(glassCode.includes('graphite') && glassCode.includes('Graphite'), 'GlassShowcase includes Graphite');
assert(glassCode.includes('bronze') && glassCode.includes('Bronze'), 'GlassShowcase includes Bronze');
assert(glassCode.includes('Антикапля') || glassCode.includes('антикапля'), 'GlassShowcase includes Hydrophobic coating');
assert(glassCode.includes('Easy Clean') || glassCode.includes('водоотталкивающее'), 'GlassShowcase explains coating benefits');
assert(glassCode.includes('8–10 мм') || glassCode.includes('8-10 мм'), 'GlassShowcase includes 8-10 mm thickness');

// 3. Inspect HardwareShowcase.tsx
const hardwareCode = fs.readFileSync(path.join(projectRoot, 'src/components/materials/HardwareShowcase.tsx'), 'utf-8');
assert(hardwareCode.includes('Черный матовый'), 'HardwareShowcase includes Matte Black');
assert(hardwareCode.includes('Брашированное золото'), 'HardwareShowcase includes Brushed Gold');
assert(hardwareCode.includes('Оружейная сталь'), 'HardwareShowcase includes Gunmetal');
assert(hardwareCode.includes('Полированный хром'), 'HardwareShowcase includes Polished Chrome');
assert(hardwareCode.includes('Матовый хром') || hardwareCode.includes('Сатин'), 'HardwareShowcase includes Satin Chrome');
assert(hardwareCode.includes('Белый матовый'), 'HardwareShowcase includes Matte White');
assert(hardwareCode.includes('Античная бронза') || hardwareCode.includes('Бронза'), 'HardwareShowcase includes Bronze finish');
assert(hardwareCode.includes('BOHÉME') || hardwareCode.includes('Boheme'), 'HardwareShowcase includes Boheme Milano spotlight');
assert(hardwareCode.includes('/portfolio/boheme_hardware.jpg'), 'HardwareShowcase references Boheme hardware photo');
assert(hardwareCode.includes('AISI 304'), 'HardwareShowcase mentions AISI 304 steel');
assert(hardwareCode.includes('Аквастоп') || hardwareCode.includes('аквастоп'), 'HardwareShowcase mentions aquastop barrier');
assert(hardwareCode.includes('5 лет'), 'HardwareShowcase mentions 5 year warranty');

// 4. Inspect CatalogSection.tsx & CatalogCard.tsx
const catalogCode = fs.readFileSync(path.join(projectRoot, 'src/components/catalog/CatalogSection.tsx'), 'utf-8');
const cardCode = fs.readFileSync(path.join(projectRoot, 'src/components/catalog/CatalogCard.tsx'), 'utf-8');
assert(catalogCode.includes('Walk-In') || catalogCode.includes('walkin'), 'CatalogSection includes Walk-In category');
assert(catalogCode.includes('Угловые 90°') || catalogCode.includes('corner'), 'CatalogSection includes Corner category');
assert(catalogCode.includes('нишу') || catalogCode.includes('niche'), 'CatalogSection includes Niche category');
assert(catalogCode.includes('Раздвижные') || catalogCode.includes('sliding'), 'CatalogSection includes Sliding category');
assert(catalogCode.includes('ванну') || catalogCode.includes('bath_screen'), 'CatalogSection includes Bath screen category');
assert(catalogCode.includes('Трапеци') || catalogCode.includes('trapezoid'), 'CatalogSection includes Trapezoid category');
assert(catalogCode.includes('Зеркала') || catalogCode.includes('mirror'), 'CatalogSection includes Mirror category');
assert(catalogCode.includes('Лофт') || catalogCode.includes('loft'), 'CatalogSection includes Loft category');
assert(catalogCode.includes('id="catalog"'), 'CatalogSection has id="catalog" anchor');
assert(cardCode.includes('priceFormatted'), 'CatalogCard renders formatted price');
assert(cardCode.includes('Рассчитать') || cardCode.includes('рассчитать'), 'CatalogCard has calculate button');

// 5. Inspect PortfolioGallery.tsx & LightboxModal.tsx
const galleryCode = fs.readFileSync(path.join(projectRoot, 'src/components/gallery/PortfolioGallery.tsx'), 'utf-8');
const lightboxCode = fs.readFileSync(path.join(projectRoot, 'src/components/gallery/LightboxModal.tsx'), 'utf-8');
assert(galleryCode.includes('id="gallery"'), 'PortfolioGallery has id="gallery"');
assert(galleryCode.includes('data-testid="portfolio-card"'), 'PortfolioGallery card has data-testid="portfolio-card"');
assert(galleryCode.includes('Углов'), 'PortfolioGallery filter tab contains "Углов"');
assert(galleryCode.includes('Walk-in'), 'PortfolioGallery filter tab contains "Walk-in"');
assert(galleryCode.includes('Ниши'), 'PortfolioGallery filter tab contains "Ниши"');
assert(galleryCode.includes('Золото'), 'PortfolioGallery filter tab contains "Золото"');
assert(galleryCode.includes('Все'), 'PortfolioGallery filter tab contains "Все"');
assert(galleryCode.includes('Раздвижные'), 'PortfolioGallery filter tab contains "Раздвижные"');
assert(galleryCode.includes('На ванну'), 'PortfolioGallery filter tab contains "На ванну"');
assert(galleryCode.includes('Лофт'), 'PortfolioGallery filter tab contains "Лофт"');
assert(lightboxCode.includes('data-testid="lightbox-modal"'), 'LightboxModal has data-testid="lightbox-modal"');
assert(lightboxCode.includes('role="dialog"'), 'LightboxModal has role="dialog"');
assert(lightboxCode.includes('lucide-chevron-right'), 'LightboxModal includes next chevron icon');
assert(lightboxCode.includes('lucide-chevron-left'), 'LightboxModal includes prev chevron icon');
assert(lightboxCode.includes('Escape'), 'LightboxModal handles Escape key');

// 6. Inspect VideoModal.tsx
const videoCode = fs.readFileSync(path.join(projectRoot, 'src/components/modals/VideoModal.tsx'), 'utf-8');
assert(videoCode.includes('sliding_bath_demo.mp4'), 'VideoModal references sliding bath video');
assert(videoCode.includes('estriado_gold_demo.mp4'), 'VideoModal references estriado gold video');
assert(videoCode.includes('sliding_bath_thumb.jpg'), 'VideoModal references sliding bath thumb');
assert(videoCode.includes('estriado_gold_thumb.jpg'), 'VideoModal references estriado gold thumb');
assert(videoCode.includes('role="dialog"'), 'VideoModal has role="dialog"');

// 7. Verify all referenced media files exist on disk
const requiredMediaFiles = [
  'public/portfolio/boheme_hardware.jpg',
  'public/portfolio/detail_roller.jpg',
  'public/portfolio/detail_stabilizer.jpg',
  'public/portfolio/detail_aquastop.jpg',
  'public/portfolio/walkin_01.jpg',
  'public/portfolio/corner_01.jpg',
  'public/portfolio/niche_01.jpg',
  'public/portfolio/sliding_01.jpg',
  'public/portfolio/bath_01.jpg',
  'public/portfolio/trapezoid_01.jpg',
  'public/portfolio/mirror_01.jpg',
  'public/portfolio/loft_01.jpg',
  'public/videos/sliding_bath_demo.mp4',
  'public/videos/estriado_gold_demo.mp4',
  'public/videos/sliding_bath_thumb.jpg',
  'public/videos/estriado_gold_thumb.jpg',
];

for (const relMedia of requiredMediaFiles) {
  const fullMedia = path.join(projectRoot, relMedia);
  assert(fs.existsSync(fullMedia), `Media file exists on disk: ${relMedia}`);
  const s = fs.statSync(fullMedia);
  assert(s.size > 1000, `Media file is non-empty (${s.size} bytes): ${relMedia}`);
}

console.log(`\n=== Verification Summary: ${errorCount} errors ===`);
if (errorCount === 0) {
  console.log('ALL M3 CATALOG & GALLERY CHECKS PASSED!');
  process.exit(0);
} else {
  console.error(`FAILED WITH ${errorCount} ERRORS!`);
  process.exit(1);
}
