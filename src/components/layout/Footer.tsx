import React from 'react';
import { Phone, MessageCircle, Send, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';
import { VetroLogo } from '../common/VetroLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  const constructionLinks = [
    { label: 'Душевые перегородки Walk-In', href: '#catalog' },
    { label: 'Угловые кабины 90°', href: '#catalog' },
    { label: 'Двери и перегородки в нишу', href: '#catalog' },
    { label: 'Раздвижные системы', href: '#catalog' },
    { label: 'Стеклянные шторки на ванну', href: '#catalog' },
    { label: 'Трапеции 135°', href: '#catalog' },
    { label: 'Зеркала на заказ с подсветкой', href: '#catalog' },
  ];

  const serviceHighlights = [
    'Лазерный 3D-замер 1 мм в Москве и МО',
    'Закаленное стекло 8–10 мм по ГОСТ 30698-2014',
    'Премиальная фурнитура Boheme Milano',
    'Чистовой монтаж штатными мастерами',
    'Покрытие «Антикапля» Easy Clean',
    'Официальный договор и гарантия до 10 лет',
  ];

  return (
    <footer className="bg-[#1A1C1A] text-[#FBFAF7] relative overflow-hidden border-t border-white/10">
      {/* Main Footer Container */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Studio VETRO */}
          <div className="space-y-4">
            <VetroLogo theme="light" size="md" subtitleText="Architectural Glass Studio • Москва" />

            <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed font-sans">
              Проектирование, ЧПУ-производство и чистовой монтаж стеклянных душевых перегородок, кабин и зеркал по индивидуальным размерам в Москве и Московской области.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/70 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#A68C70] shrink-0" />
              <span>Гарантия до 10 лет по договору</span>
            </div>
          </div>

          {/* Column 2: Constructions Navigation */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#A68C70] mb-4 border-l-2 border-[#788173] pl-2.5">
              Конструкции
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {constructionLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-white/60 hover:text-white transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Standards */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#A68C70] mb-4 border-l-2 border-[#788173] pl-2.5">
              Стандарты VETRO
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/60">
              {serviceHighlights.map((svc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-none rotate-45 bg-[#788173] mt-1.5 shrink-0" />
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts & Working Hours */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#A68C70] mb-4 border-l-2 border-[#788173] pl-2.5">
              Прямая связь
            </h4>

            <div className="space-y-3 text-xs sm:text-[13px]">
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="flex items-center gap-2.5 text-white hover:text-[#A68C70] transition-colors font-medium"
              >
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{businessConfig.phone}</span>
              </a>

              <div className="flex items-center gap-2.5 text-white/60">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#788173]" />
                </div>
                <span>{businessConfig.workingHours}</span>
              </div>

              <div className="flex items-start gap-2.5 text-white/60">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#788173]" />
                </div>
                <span>{businessConfig.serviceRegion}</span>
              </div>
            </div>

            {/* Quick Messengers Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#788173]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#788173]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal, Disclaimer & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left font-mono text-[11px]">
            <span>© 2026 VETRO. Все права защищены.</span>
            <span className="hidden sm:inline">•</span>
            <span>Architectural Glass Studio (Москва и МО)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-white/40 text-center sm:text-right max-w-xs">
              Не является публичной офертой (ст. 437 ГК РФ).
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Вернуться наверх страницы"
              className="w-9 h-9 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
