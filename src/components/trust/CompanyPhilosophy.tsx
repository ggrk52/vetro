import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  Ruler, 
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface CompanyPhilosophyProps {
  onOpenMeasurementModal?: () => void;
}

export const CompanyPhilosophy: React.FC<CompanyPhilosophyProps> = ({ onOpenMeasurementModal }) => {
  const metrics = [
    {
      value: '1 200+',
      label: 'Реализованных проектов',
      sublabel: 'квартиры и пентхаусы Москвы',
    },
    {
      value: '10 лет',
      label: 'На рынке с 2015 года',
      sublabel: 'собственное производство',
    },
    {
      value: '0 мм',
      label: 'Погрешность лазера',
      sublabel: '3D-нивелирование проема',
    },
    {
      value: 'до 10 лет',
      label: 'Гарантия по договору',
      sublabel: 'юридическая защита',
    },
  ];

  const philosophyPillars = [
    {
      num: '01',
      title: 'Чистота архитектурной линии',
      desc: 'Отказ от громоздких пластиковых профилей и лишних стыков. Визуальная невесомость и интеграция в интерьер санузла.',
    },
    {
      num: '02',
      title: 'Собственный ЧПУ-цех и ОТК',
      desc: 'Алмазная полировка еврокромки, фигурный раскрой и закалка по ГОСТ 30698-2014 на автоматизированных линиях.',
    },
    {
      num: '03',
      title: 'Инженерный гидрозамок',
      desc: '100% герметичность без толстых швов силикона: магнитные демпферы, капельники и прецизионный порожек-аквастоп.',
    },
    {
      num: '04',
      title: 'Ответственность по договору',
      desc: 'Официальный договор с юридическим лицом, фиксированная смета и штатные инженерные бригады чистового монтажа.',
    },
  ];

  return (
    <section id="philosophy" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] border-t border-[rgba(26,23,18,0.06)] text-[#1a1712] relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header: Minimalist Editorial Strip */}
        <div className="flex items-center justify-between border-b border-[rgba(26,23,18,0.08)] pb-2.5 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#7c766c]">
          <span>PHILOSOPHY OF ARCHITECTURAL GLASS</span>
          <span>VETRO ATELIER · EST. 2015</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Atelier Production & Showroom Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-[rgba(26,23,18,0.1)] bg-[#1a1712] shadow-elevated group aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                <img
                  src="/portfolio/vetro_philosophy_atelier.jpg"
                  alt="Инженерное ателье и производство студии архитектурного стекла VETRO"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="800"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-wider text-white pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    АТЕЛЬЕ VETRO · МОСКВА
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/95 text-[#1a1712] font-semibold backdrop-blur-md">
                    ЧПУ & ОТК
                  </span>
                </div>

                {/* Quote Box */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[rgba(26,23,18,0.08)] shadow-card z-10">
                  <p className="text-xs text-[#1a1712] italic leading-relaxed font-serif">
                    «Стекло не терпит неточности. Настоящая роскошь архитектурного стекла кроется в невидимых стыках, прецизионных зазорах и безупречной плоскости.»
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#7c766c] pt-2 border-t border-[rgba(26,23,18,0.08)]">
                    <span className="text-[#1a1712] font-sans font-bold">Инженерный совет VETRO</span>
                    <span>Стандарт качества</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, 4 Pillars, 4 Metrics, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#7c766c] mb-2 sm:mb-3 block">
              ENGINEERING INTEGRITY & BESPOKE PRODUCTION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] mb-4 sm:mb-5 font-sans">
              Философия VETRO.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Бескомпромиссная чистота формы.</em>
            </h2>

            <p className="text-sm sm:text-base text-[rgba(20,20,22,0.7)] leading-relaxed mb-6 max-w-2xl font-sans">
              В VETRO мы относимся к душевой перегородке не как к сантехнике, а как к элементу чистой архитектуры. Собственное производство в Москве, лазерный 3D-контроль геометрии проемов и итальянская фурнитура Boheme Milano обеспечивают эталонную прозрачность и надежность на десятилетия.
            </p>

            {/* 4 Pillars of Philosophy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {philosophyPillars.map((pillar) => (
                <div 
                  key={pillar.num}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/70 border border-[rgba(26,23,18,0.06)] hover:bg-white transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#FF2500] px-1.5 py-0.5 rounded bg-[#FF2500]/10">
                      {pillar.num}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1a1712] font-sans">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[rgba(20,20,22,0.65)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 4 Sculptural Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-7">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[rgba(26,23,18,0.08)] flex flex-col justify-between shadow-card"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1a1712] font-mono">
                    {m.value}
                  </div>
                  <div className="mt-1">
                    <span className="text-[11px] sm:text-xs font-bold text-[#1a1712] block leading-tight">{m.label}</span>
                    <span className="font-mono text-[9px] text-[#7c766c] uppercase tracking-wider block mt-0.5">{m.sublabel}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-white bg-[#FF2500] hover:bg-[#e02000] shadow-sm transition-all text-xs sm:text-sm active:scale-[0.98] min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Консультация в WhatsApp ↗</span>
              </a>

              <button
                type="button"
                onClick={onOpenMeasurementModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-[#1a1712] bg-white hover:bg-[#eae6dc] border border-[rgba(26,23,18,0.12)] shadow-card transition-all text-xs sm:text-sm active:scale-[0.98] min-h-[44px]"
              >
                <Ruler className="w-4 h-4 text-[#1a1712]" />
                <span>Заказать 3D-замер 24ч</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
