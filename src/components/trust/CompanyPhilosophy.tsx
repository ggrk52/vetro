import React from 'react';
import { 
  MessageCircle, 
  Ruler, 
  ArrowUpRight
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
      sublabel: 'квартиры и резиденции Москвы',
    },
    {
      value: '10 лет',
      label: 'Опыт работы с 2015 года',
      sublabel: 'собственное производство',
    },
    {
      value: '1 мм',
      label: 'Точность лазера',
      sublabel: '3D-нивелирование проема',
    },
    {
      value: 'до 10 лет',
      label: 'Гарантия по договору',
      sublabel: 'юридическая защита студии',
    },
  ];

  const philosophyPillars = [
    {
      num: '01',
      title: 'Чистота архитектурной линии',
      desc: 'Отказ от громоздких пластиковых профилей и лишних стыков. Визуальная невесомость и естественная интеграция в интерьер санузла.',
    },
    {
      num: '02',
      title: 'Собственное ЧПУ производство',
      desc: 'Алмазная полировка еврокромки, прецизионный раскрой и закалка по ГОСТ 30698-2014 на автоматизированных линиях.',
    },
    {
      num: '03',
      title: 'Инженерный гидрозамок',
      desc: '100% герметичность без уродливых швов силикона: магнитные демпферы, капельники и прецизионный порожек-аквастоп.',
    },
    {
      num: '04',
      title: 'Штатный чистовой монтаж',
      desc: 'Официальный договор со студией, фиксированная смета и штатные инженерные бригады чистового монтажа со стажем от 7 лет.',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-[#FBFAF7] dark:bg-[#13202A] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E] scroll-mt-20">
      <div id="philosophy" className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Strip */}
        <div className="flex items-center justify-between border-b border-[#DFDDD6] dark:border-[#34434E] pb-3 mb-8 text-[11px] font-mono text-[#777A74] dark:text-[#B7C3CA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#788173] dark:bg-[#B2E4DD] rounded-none rotate-45" />
            О студии · Философия VETRO
          </span>
          <span className="hidden sm:inline-block">Architectural Glass Studio · Est. 2015</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Atelier Production Image Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded overflow-hidden border border-[#DFDDD6] dark:border-[#34434E] bg-[#252725] dark:bg-[#0E1822] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                <img
                  src="portfolio/vetro_philosophy_atelier.jpg"
                  alt="Инженерное ателье и производство студии архитектурного стекла VETRO"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  width="600"
                  height="800"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/85 dark:from-[#0E1822]/90 via-transparent to-[#252725]/20 dark:to-[#0E1822]/30 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between font-mono text-[10px] text-[#FBFAF7] dark:text-[#F1F2EF] pointer-events-none z-10">
                  <span className="px-2.5 py-0.5 rounded bg-[#252725]/85 dark:bg-[#0D161F]/90 backdrop-blur-sm border border-white/10 dark:border-[#34434E]">
                    Ателье VETRO · Москва
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#FBFAF7]/95 dark:bg-[#14212C]/95 text-[#252725] dark:text-[#B2E4DD] font-semibold dark:border dark:border-[#34434E]">
                    ЧПУ и ОТК
                  </span>
                </div>

                {/* Quote Box */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded bg-[#FBFAF7]/95 dark:bg-[#0D161F]/95 backdrop-blur-sm border border-[#DFDDD6] dark:border-[#34434E] z-10">
                  <p className="text-xs text-[#252725] dark:text-[#F1F2EF] italic leading-relaxed font-serif">
                    «Стекло не терпит неточности. Настоящая роскошь архитектурного стекла кроется в невидимых стыках, прецизионных зазорах и безупречной плоскости.»
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#777A74] dark:text-[#B7C3CA] pt-2 border-t border-[#DFDDD6] dark:border-[#34434E]">
                    <span className="text-[#252725] dark:text-[#B2E4DD] font-medium">Инженерный совет VETRO</span>
                    <span>Стандарт чистоты</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, 4 Pillars, 4 Metrics, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded border border-[#DFDDD6] dark:border-[#34434E] bg-[#F4F2EC] dark:bg-[#14212C] text-[10px] font-mono text-[#788173] dark:text-[#B2E4DD] w-fit">
              <span>Инженерная культура и собственное производство</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] mb-4 text-balance">
              Философия VETRO.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">Бескомпромиссная чистота формы.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#777A74] dark:text-[#D1DCE1] leading-relaxed mb-6 max-w-2xl font-sans text-pretty">
              В VETRO мы относимся к стеклянной душевой перегородке не как к сантехнике, а как к элементу архитектурного пространства. Собственное производство в Москве, многолетний опыт инженеров, 3D-контроль геометрии проемов и итальянская фурнитура Boheme Milano обеспечивают эталонную прозрачность и надежность конструкции на десятилетия.
            </p>

            {/* 4 Pillars of Philosophy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {philosophyPillars.map((pillar) => (
                <div 
                  key={pillar.num}
                  className="p-3.5 rounded bg-[#F4F2EC] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-semibold text-[#788173] dark:text-[#B2E4DD]">
                      {pillar.num}
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-semibold text-[#252725] dark:text-[#F1F2EF]">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 4 Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded bg-[#F4F2EC] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] flex flex-col justify-between"
                >
                  <div className="text-lg sm:text-xl font-bold text-[#252725] dark:text-[#B2E4DD] font-mono tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-1">
                    <span className="text-[11px] font-medium text-[#252725] dark:text-[#F1F2EF] block leading-tight">{m.label}</span>
                    <span className="font-mono text-[9px] text-[#788173] dark:text-[#B7C3CA] block mt-0.5">{m.sublabel}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onOpenMeasurementModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs transition-colors duration-150 active:scale-[0.98] min-h-[44px]"
              >
                <Ruler className="size-3.5 text-[#A68C70] dark:text-[#102126]" />
                <span>Заказать 3D-замер</span>
              </button>

              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#FBFAF7] dark:bg-transparent hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] text-[#252725] dark:text-[#F1F2EF] border border-[#DFDDD6] dark:border-[#657881] dark:hover:border-[#B2E4DD] font-medium text-xs transition-colors duration-150 active:scale-[0.98] min-h-[44px]"
              >
                <MessageCircle className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
                <span>Консультация студии</span>
                <ArrowUpRight className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
