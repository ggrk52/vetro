import React from 'react';
import { Phone, MessageCircle, Send, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';
import { VetroLogo } from '../common/VetroLogo';

export const Footer: React.FC = () => {
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
    'Бесплатный точный замер 1 мм в Москве и МО',
    'Закаленное стекло 8–10 мм по ГОСТ 30698-2014',
    'Премиальная фурнитура Boheme Milano',
    'Чистовой монтаж штатными мастерами',
    'Гарантия на монтаж 1 год и до 10 лет на стекло',
  ];

  return (
    <footer className="bg-[#1A1C1A] dark:bg-[#0D161F] text-[#FBFAF7] dark:text-[#F1F2EF] relative overflow-hidden border-t border-white/10 dark:border-[#34434E]">
      {/* Main Footer Container */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Studio VETRO */}
          <div className="space-y-4 min-w-0">
            <VetroLogo
              theme="light"
              size="md"
              subtitleText="Architectural Glass Studio • Москва"
              subtitleClassName="whitespace-normal tracking-[0.08em]"
            />

            <p className="text-xs sm:text-[13px] text-white/60 dark:text-[#B7C3CA] leading-relaxed font-sans">
              Проектирование, ЧПУ-производство и чистовой монтаж стеклянных душевых перегородок, кабин и зеркал по индивидуальным размерам в Москве и Московской области.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/70 dark:text-[#D1DCE1] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#A68C70] dark:text-[#B2E4DD] shrink-0" />
              <span>Гарантия до 10 лет по договору</span>
            </div>
          </div>

          {/* Column 2: Constructions Navigation */}
          <div>
            <h4 className="text-[11px] font-mono text-[#A68C70] dark:text-[#B2E4DD] mb-4 border-l-2 border-[#788173] dark:border-[#B2E4DD] pl-2.5">
              Конструкции
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {constructionLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-white/60 dark:text-[#B7C3CA] hover:text-white dark:hover:text-[#B2E4DD] transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Standards */}
          <div>
            <h4 className="text-[11px] font-mono text-[#A68C70] dark:text-[#B2E4DD] mb-4 border-l-2 border-[#788173] dark:border-[#B2E4DD] pl-2.5">
              Стандарты VETRO
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/60 dark:text-[#B7C3CA]">
              {serviceHighlights.map((svc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-none rotate-45 bg-[#788173] dark:bg-[#B2E4DD] mt-1.5 shrink-0" />
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts & Working Hours */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono text-[#A68C70] dark:text-[#B2E4DD] mb-4 border-l-2 border-[#788173] dark:border-[#B2E4DD] pl-2.5">
              Прямая связь
            </h4>

            <div className="space-y-3 text-xs sm:text-[13px]">
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="flex items-center gap-2.5 text-white dark:text-[#F1F2EF] hover:text-[#A68C70] dark:hover:text-[#B2E4DD] transition-colors font-medium tabular-nums"
              >
                <div className="size-8 rounded bg-white/10 dark:bg-[#14212C] dark:border dark:border-[#34434E] flex items-center justify-center text-white dark:text-[#B2E4DD] shrink-0">
                  <Phone className="size-3.5" />
                </div>
                <span>{businessConfig.phone}</span>
              </a>

              <div className="flex items-center gap-2.5 text-white/60 dark:text-[#B7C3CA]">
                <div className="size-8 rounded bg-white/10 dark:bg-[#14212C] dark:border dark:border-[#34434E] flex items-center justify-center text-white shrink-0">
                  <Clock className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                </div>
                <span>{businessConfig.workingHours}</span>
              </div>

              <div className="flex items-start gap-2.5 text-white/60 dark:text-[#B7C3CA]">
                <div className="size-8 rounded bg-white/10 dark:bg-[#14212C] dark:border dark:border-[#34434E] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
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
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 dark:bg-[#14212C] dark:border dark:border-[#34434E] dark:hover:bg-[#1B2C36] dark:hover:border-[#B2E4DD] text-white dark:text-[#F1F2EF] text-xs font-mono transition-colors duration-150 active:scale-[0.98] min-h-[40px]"
              >
                <MessageCircle className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 dark:bg-[#14212C] dark:border dark:border-[#34434E] dark:hover:bg-[#1B2C36] dark:hover:border-[#B2E4DD] text-white dark:text-[#F1F2EF] text-xs font-mono transition-colors duration-150 active:scale-[0.98] min-h-[40px]"
              >
                <Send className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal & Disclaimer (padded for floating corner buttons) */}
        <div className="mt-12 pt-8 md:pr-36 border-t border-white/10 dark:border-[#34434E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 dark:text-[#B7C3CA]/70">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left font-mono text-[11px]">
            <span>© 2026 VETRO. Все права защищены.</span>
            <span className="hidden sm:inline">•</span>
            <span>Architectural Glass Studio (Москва и МО)</span>
          </div>

          <span className="text-[11px] font-mono text-white/40 dark:text-[#B7C3CA]/60 text-center sm:text-right max-w-xs">
            Не является публичной офертой (ст. 437 ГК РФ).
          </span>
        </div>
      </div>
    </footer>
  );
};
