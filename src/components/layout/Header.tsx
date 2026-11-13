import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Send, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';
import { VetroLogo } from '../common/VetroLogo';

export interface HeaderProps {
  onOpenMeasurementModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMeasurementModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  interface NavItem {
    label: string;
    href: string;
    className?: string;
  }

  const navLinks: NavItem[] = [
    { label: 'Каталог', href: '#catalog' },
    { label: 'Материалы', href: '#materials' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Портфолио', href: '#gallery' },
    { label: 'Преимущества', href: '#advantages', className: 'hidden xl:inline-block' },
    { label: 'О студии', href: '#about' },
    { label: 'Процесс', href: '#workflow', className: 'hidden xl:inline-block' },
    { label: 'Контакты', href: '#contacts' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCtaClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenMeasurementModal) {
      onOpenMeasurementModal();
    } else {
      const contactSec = document.querySelector('#contacts');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,padding] duration-200 ${
        isScrolled
          ? 'bg-[#F4F2EC]/95 backdrop-blur-md border-b border-[#DFDDD6] py-3'
          : 'bg-[#F4F2EC]/85 backdrop-blur-sm border-b border-[#DFDDD6]/60 py-3.5'
      }`}
    >
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 xl:gap-6">
          {/* Logo & Brand Title: VETRO */}
          <a
            href="#"
            className="focus:outline-none focus:ring-1 focus:ring-[#252725] rounded p-0.5 shrink-0"
            aria-label="На главную VETRO Architectural Glass Studio"
          >
            <VetroLogo 
              size="md" 
              subtitleText="Architectural Glass Studio • Душевые" 
              subtitleClassName="hidden 2xl:block"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-2.5 xl:gap-3.5 2xl:gap-5 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs xl:text-[13px] font-medium tracking-[0.01em] text-[#252725]/80 hover:text-[#252725] transition-colors relative py-1 whitespace-nowrap shrink-0 ${link.className || ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Right Controls: Phone Shortcut + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${businessConfig.phoneRaw}`}
              aria-label="Позвонить в студию VETRO"
              className="min-w-[40px] min-h-[40px] p-2 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] hover:bg-[#252725] hover:text-[#FBFAF7] flex items-center justify-center transition-colors active:scale-[0.97]"
            >
              <Phone className="size-4" />
            </a>

            <button
              type="button"
              data-testid="hamburger-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMobileMenuOpen}
              className="min-w-[40px] min-h-[40px] p-2 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] hover:bg-[#252725] hover:text-[#FBFAF7] flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#252725] active:scale-[0.97]"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Right Action Block (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Direct Messengers (shown on 2xl+) */}
            <div className="hidden 2xl:flex items-center gap-1.5 shrink-0">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Написать в WhatsApp студии VETRO"
                aria-label="Написать в WhatsApp"
                className="size-8 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] hover:bg-[#252725] hover:text-[#FBFAF7] flex items-center justify-center transition-colors duration-150 active:scale-[0.98]"
              >
                <MessageCircle className="size-3.5" />
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Написать в Telegram студии VETRO"
                aria-label="Написать в Telegram"
                className="size-8 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] hover:bg-[#252725] hover:text-[#FBFAF7] flex items-center justify-center transition-colors duration-150 active:scale-[0.98]"
              >
                <Send className="size-3.5" />
              </a>
            </div>

            {/* Direct Phone */}
            <div className="flex flex-col text-right shrink-0 min-w-max">
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="text-xs xl:text-[13px] font-semibold text-[#252725] hover:text-[#788173] transition-colors tabular-nums whitespace-nowrap"
              >
                {businessConfig.phone}
              </a>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#777A74] whitespace-nowrap hidden xl:block">
                Москва и МО • 9-21
              </span>
            </div>

            {/* CTA Button: Architectural Graphite with 4px radius */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 text-[11px] xl:text-[12px] font-medium tracking-[0.04em] uppercase text-[#FBFAF7] bg-[#252725] hover:bg-[#383B38] rounded border border-[#252725] transition-transform active:scale-[0.97] shrink-0 whitespace-nowrap"
            >
              <span>Обсудить проект</span>
              <span className="text-[10px] text-[#A68C70] tracking-wider uppercase border-l border-white/20 pl-1.5 xl:pl-2 hidden xl:inline">Замер</span>
              <ArrowUpRight className="size-3.5 text-[#A68C70]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <div
        data-testid="mobile-drawer"
        className={`fixed inset-0 z-50 lg:hidden overflow-hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#252725]/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#F4F2EC] border-l border-[#DFDDD6] p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 shadow-xl ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DFDDD6]">
              <VetroLogo size="sm" subtitleText="Architectural Glass Studio" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Закрыть меню"
                className="min-w-[40px] min-h-[40px] rounded text-[#777A74] hover:text-[#252725] hover:bg-[#FBFAF7] flex items-center justify-center border border-transparent hover:border-[#DFDDD6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="min-h-[44px] flex items-center justify-between px-3.5 rounded text-[14px] font-medium text-[#252725] hover:bg-[#FBFAF7] hover:border hover:border-[#DFDDD6] transition-colors duration-150"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#777A74]" />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-[#DFDDD6] flex flex-col gap-3">
            {/* Phone link */}
            <a
              href={`tel:${businessConfig.phoneRaw}`}
              className="min-h-[44px] flex items-center justify-center gap-2 px-4 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] font-medium text-[13px] hover:border-[#252725] transition-colors duration-150"
            >
              <Phone className="w-4 h-4 text-[#788173]" />
              <span>{businessConfig.phone}</span>
            </a>

            {/* Messengers Row */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 px-3 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] font-medium text-xs hover:border-[#252725] transition-colors duration-150"
              >
                <MessageCircle className="w-4 h-4 text-[#788173]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 px-3 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] font-medium text-xs hover:border-[#252725] transition-colors duration-150"
              >
                <Send className="w-3.5 h-3.5 text-[#788173]" />
                <span>Telegram</span>
              </a>
            </div>

            {/* Callout CTA */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="min-h-[48px] w-full flex items-center justify-center gap-2 px-4 rounded bg-[#252725] text-[#FBFAF7] font-medium text-[13px] uppercase tracking-wider hover:bg-[#383B38] active:scale-[0.98] transition-colors duration-150"
            >
              <span>Вызвать на замер</span>
              <ArrowUpRight className="w-4 h-4 text-[#A68C70]" />
            </button>

            <p className="text-center text-[11px] font-mono text-[#777A74] mt-1">
              {businessConfig.workingHours} • Без выходных
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
