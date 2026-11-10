import React, { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { AdvantagesSection } from './components/advantages/AdvantagesSection';
import { CatalogSection } from './components/catalog/CatalogSection';
import { GlassShowcase } from './components/materials/GlassShowcase';
import { HardwareShowcase } from './components/materials/HardwareShowcase';
import { CalculatorSection } from './components/calculator/CalculatorSection';
import { PortfolioGallery, GalleryFilterType } from './components/gallery/PortfolioGallery';
import { CompanyPhilosophy } from './components/trust/CompanyPhilosophy';
import { WorkflowGuarantees } from './components/trust/WorkflowGuarantees';
import { FAQSection } from './components/faq/FAQSection';
import { ContactSection } from './components/contacts/ContactSection';
import { Footer } from './components/layout/Footer';
import { MeasurementModal } from './components/modals/MeasurementModal';
import { VideoModal, VideoType } from './components/modals/VideoModal';
import { FloatingMessengers } from './components/common/FloatingMessengers';
import { ScrollToTop } from './components/common/ScrollToTop';
import { MobileStickyCta } from './components/common/MobileStickyCta';
import { CabinCategory } from './data/portfolioData';

export const App: React.FC = () => {
  // Modal state management
  const [isMeasurementOpen, setIsMeasurementOpen] = useState<boolean>(false);
  const [measurementCabinType, setMeasurementCabinType] = useState<string>('Перегородка Walk-In');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [activeVideoType, setActiveVideoType] = useState<VideoType>('sliding');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterType>('all');

  // Open measurement modal with optional prefilled cabin type
  const handleOpenMeasurement = useCallback((cabinType?: string) => {
    if (cabinType) {
      setMeasurementCabinType(cabinType);
    }
    setIsMeasurementOpen(true);
  }, []);

  const handleCloseMeasurement = useCallback(() => {
    setIsMeasurementOpen(false);
  }, []);

  // Open video demonstration modal
  const handleOpenVideo = useCallback((videoType: VideoType = 'sliding') => {
    setActiveVideoType(videoType);
    setIsVideoOpen(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  // Handle calculator transition from catalog card
  const handleCalculateFromCatalog = useCallback((categoryId: string) => {
    // Map category ID to standard name if needed
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
  }, []);

  // Handle gallery filter navigation from catalog card
  const handleViewGalleryFromCatalog = useCallback((category: CabinCategory) => {
    const validFilter: GalleryFilterType =
      category === 'corner' ||
      category === 'walkin' ||
      category === 'niche' ||
      category === 'sliding' ||
      category === 'bath_screen' ||
      category === 'loft'
        ? category
        : 'all';

    setGalleryFilter(validFilter);

    const target = document.querySelector('#gallery') || document.querySelector('#reviews');
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-vetro-ivory text-vetro-graphite flex flex-col font-sans selection:bg-vetro-graphite selection:text-vetro-ivory">
      {/* 1. Sticky Navigation Header */}
      <Header onOpenMeasurementModal={() => handleOpenMeasurement('Замер из шапки')} />

      {/* Main Content Sections Flow */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection onOpenMeasurementModal={() => handleOpenMeasurement('Замер из главного экрана')} />

        {/* 3. Core Advantages & Craftsmanship USPs */}
        <AdvantagesSection />

        {/* 4. Catalog Section: 8 Custom Construction Categories */}
        <CatalogSection
          onCalculateClick={handleCalculateFromCatalog}
          onViewGalleryClick={handleViewGalleryFromCatalog}
          onOpenVideoModal={handleOpenVideo}
          onOpenMeasurementModal={() => handleOpenMeasurement('Консультация по каталогу')}
        />

        {/* 5. Glass Showcase: 6 Glass Types & Hydrophobic Easy Clean Tech */}
        <GlassShowcase
          onSelectGlass={(glassId) => console.log('Selected glass:', glassId)}
          onOpenVideoModal={handleOpenVideo}
          onOpenMeasurementModal={() => handleOpenMeasurement('Подбор образцов стекла')}
        />

        {/* 6. Hardware Showcase: 7 Finishes & Boheme Milano Spotlight */}
        <div id="hardware">
          <HardwareShowcase
            onSelectFinish={(finishId) => console.log('Selected finish:', finishId)}
            onOpenMeasurementModal={() => handleOpenMeasurement('Подбор цвета фурнитуры')}
          />
        </div>

        {/* 7. Interactive 5-Step Cost Calculator & Lead Capture */}
        <CalculatorSection onOpenMeasurementModal={() => handleOpenMeasurement('Вызов инженера из калькулятора')} />

        {/* 8. Portfolio Gallery: 60 Authentic Finished Projects with Lightbox */}
        <div id="reviews" className="scroll-mt-20">
          <PortfolioGallery
            initialFilter={galleryFilter}
            onOpenMeasurementModal={() => handleOpenMeasurement('Замер по фото из портфолио')}
          />
        </div>

        {/* 9. Company Philosophy: VETRO Atelier Standards & In-house Production */}
        <CompanyPhilosophy onOpenMeasurementModal={() => handleOpenMeasurement('Консультация по философии VETRO')} />

        {/* 10. Workflow & Guarantees: 6-Step Journey & Contract Guarantees */}
        <WorkflowGuarantees onOpenMeasurementModal={() => handleOpenMeasurement('Замер по договору')} />

        {/* 11. FAQ Accordion: 6 Core Customer Objections & Answers */}
        <FAQSection onOpenMeasurementModal={() => handleOpenMeasurement('Вопрос по замеру')} />

        {/* 12. Contact Section: Direct Channels, Coverage Map, Inquiry Form */}
        <ContactSection onOpenMeasurementModal={() => handleOpenMeasurement('Заказ замера из контактов')} />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* Global Modals */}
      <MeasurementModal
        isOpen={isMeasurementOpen}
        onClose={handleCloseMeasurement}
        initialCabinType={measurementCabinType}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        initialVideo={activeVideoType}
        onOpenMeasurementModal={() => handleOpenMeasurement('Заказ из видеообзора')}
      />

      {/* Global Sticky / Floating Controls */}
      <ScrollToTop />
      <FloatingMessengers />
      <MobileStickyCta onOpenMeasurementModal={() => handleOpenMeasurement('Быстрый вызов с мобильного')} />
    </div>
  );
};

export default App;
