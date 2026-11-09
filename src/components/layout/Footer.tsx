import React from 'react';
import { Phone, MessageCircle, Send, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

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
    { label: 'Стеклянные шторки на ванну', href: '#catalog' },
    { label: 'Трапеции 135°', href: '#catalog' },
    { label: 'Зеркала на заказ с LED-подсветкой', href: '#catalog' },
  ];

  const serviceHighlights = [
    'Бесплатный 3D лазерный замер в Москве и МО',
    'Закаленное безопасное стекло 8–10 мм по ГОСТ',
    'Премиум фурнитура Boheme Milano (7 цветов)',
    'Чистовой монтаж за 3–4 часа без пыли',
    'Нанопокрытие «Антикапля» от налета',
    'Официальный договор и гарантия до 5 лет',
  ];

  return (
    <footer className="bg-[#141414] text-[#f5f5f5] relative overflow-hidden">
      {/* Main Footer Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Master Vladislav */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#141414] font-extrabold text-lg flex items-center justify-center">
                V
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white tracking-tight leading-none">
                  VETRO
                </h3>
                <p className="text-xs text-[rgba(255,255,255,0.5)] font-medium mt-1">
                  Студия стеклянных душевых
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
              Производство и профессиональный чистовой монтаж стеклянных душевых перегородок, кабин и зеркал по индивидуальным размерам. Личная работа мастера Владислава без посредников и салонных наценок.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[rgba(255,255,255,0.7)]">
              <ShieldCheck className="w-4 h-4 text-[#FF2500] shrink-0" />
              <span>Гарантия: 3 года монтаж, 5 лет фурнитура</span>
            </div>
          </div>

          {/* Column 2: Constructions Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF2500] pl-2.5">
              Конструкции
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {constructionLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Standards */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF2500] pl-2.5">
              Услуги и стандарты
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[rgba(255,255,255,0.6)]">
              {serviceHighlights.map((svc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2500] mt-1.5 shrink-0" />
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts & Working Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF2500] pl-2.5">
              Прямая связь
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="flex items-center gap-2.5 text-white hover:opacity-80 transition-opacity font-semibold"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{businessConfig.phone}</span>
              </a>

              <div className="flex items-center gap-2.5 text-[rgba(255,255,255,0.6)]">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>{businessConfig.workingHours}</span>
              </div>

              <div className="flex items-start gap-2.5 text-[rgba(255,255,255,0.6)]">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
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
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#0088cc]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal, Disclaimer & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[rgba(255,255,255,0.4)]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 VETRO. Все права защищены.</span>
            <span className="hidden sm:inline">•</span>
            <span>Мастер Владислав (Москва и Московская область)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[rgba(255,255,255,0.4)] text-center sm:text-right max-w-xs">
              Информация на сайте не является публичной офертой (ст. 437 ГК РФ).
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Вернуться наверх страницы"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
