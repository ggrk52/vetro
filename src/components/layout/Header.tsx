import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Send, Menu, X, Ruler, ChevronRight } from 'lucide-react';
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

  const navLinks = [
    { label: 'Каталог', href: '#catalog' },
    { label: 'Преимущества', href: '#advantages' },
    { label: 'Материалы', href: '#materials' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Портфолио', href: '#gallery' },
    { label: 'Философия', href: '#philosophy' },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f4f2ec]/92 backdrop-blur-md shadow-sm border-b border-[rgba(26,23,18,0.08)] py-2.5 sm:py-3'
          : 'bg-[#f4f2ec]/80 backdrop-blur-sm border-b border-[rgba(26,23,18,0.06)] py-3 sm:py-3.5'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Title: VETRO */}
          <a
            href="#"
            className="focus:outline-none focus:ring-2 focus:ring-[#1a1712] rounded-lg p-0.5"
            aria-label="На главную VETRO"
          >
            <VetroLogo size="md" subtitleText="Стеклянные душевые • Москва" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#eae6dc]/80 border border-[rgba(26,23,18,0.08)] rounded-full px-3 py-1.5 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1 text-[13.5px] text-[#1a1712]/75 hover:text-[#1a1712] hover:bg-white/80 rounded-full transition-all font-medium"
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
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] hover:bg-[#1a1712] hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              type="button"
              data-testid="hamburger-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMobileMenuOpen}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] hover:bg-[#1a1712] hover:text-white flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a1712]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Right Action Block (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Direct Messengers */}
            <div className="flex items-center gap-2">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Написать в WhatsApp студии VETRO"
                aria-label="Написать в WhatsApp"
                className="w-8 h-8 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] hover:bg-[#1a1712] hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Написать в Telegram студии VETRO"
                aria-label="Написать в Telegram"
                className="w-8 h-8 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] hover:bg-[#1a1712] hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Phone */}
            <div className="flex flex-col text-right">
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="text-[13px] font-semibold text-[#1a1712] hover:opacity-75 transition-opacity"
              >
                {businessConfig.phone}
              </a>
              <span className="text-[11px] text-[#7c766c]">Пн-Вс: 9:00 - 21:00</span>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF2500] hover:opacity-90 rounded-full transition-all active:scale-[0.97] shadow-sm"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Замер 24ч</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <div
        data-testid="mobile-drawer"
        className={`fixed inset-0 z-50 lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#f4f2ec] border-l border-[rgba(26,23,18,0.1)] p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 shadow-2xl ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(26,23,18,0.08)]">
              <VetroLogo size="sm" subtitleText="Студия авторского стекла" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Закрыть меню"
                className="min-w-[44px] min-h-[44px] rounded-full text-[#7c766c] hover:text-[#1a1712] hover:bg-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="mt-6 flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="min-h-[44px] flex items-center justify-between px-4 rounded-xl text-base font-medium text-[#1a1712] hover:bg-white transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#7c766c]" />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-[rgba(26,23,18,0.08)] flex flex-col gap-3">
            {/* Phone link */}
            <a
              href={`tel:${businessConfig.phoneRaw}`}
              className="min-h-[44px] flex items-center justify-center gap-2.5 px-4 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] font-semibold hover:bg-[#1a1712] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{businessConfig.phone}</span>
            </a>

            {/* Messengers Row */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 px-3 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] font-medium hover:bg-[#1a1712] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 px-3 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] font-medium hover:bg-[#1a1712] hover:text-white transition-colors"
              >
                <Send className="w-4 h-4 text-[#0088cc]" />
                <span>Telegram</span>
              </a>
            </div>

            {/* Callout CTA */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="min-h-[46px] w-full flex items-center justify-center gap-2 px-4 rounded-full bg-[#FF2500] text-white font-semibold shadow-sm active:scale-95 transition-transform"
            >
              <Ruler className="w-4 h-4" />
              <span>Вызвать на замер</span>
            </button>

            <p className="text-center text-xs text-[#7c766c] mt-1">
              {businessConfig.workingHours} • Без выходных
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
