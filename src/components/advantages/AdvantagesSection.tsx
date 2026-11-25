import React from 'react';
import { 
  Ruler, 
  ShieldCheck, 
  Clock, 
  Award,
  ArrowUpRight
} from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const craftCards = [
    {
      num: '01',
      tag: 'ТОЧНОСТЬ ГЕОМЕТРИИ',
      title: 'Лазерный 3D-замер до 1 мм',
      description: 'Лазерное сканирование плоскостей с учетом уклона плитки, кривизны стен и разуклонки душевого поддона. Стекло становится без щелей и зазоров.',
      icon: Ruler,
    },
    {
      num: '02',
      tag: 'СТАНДАРТ БЕЗОПАСНОСТИ',
      title: 'Стекло 8–10 мм ГОСТ 30698',
      description: 'Безопасное закаленное стекло Optiwhite и Estriado. В 7 раз прочнее сырого стекла, с полированной еврокромкой и гидрофобным слоем Easy Clean.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      tag: 'СОБСТВЕННЫЙ ЦЕХ ЧПУ',
      title: 'Изготовление от 5 дней',
      description: 'Собственный высокоточный станочный парк в Москве. Прямой контроль раскроя, вырезов под петли и закалки без посредников и лишних наценок.',
      icon: Clock,
    },
    {
      num: '04',
      tag: 'ОФИЦИАЛЬНЫЙ ДОГОВОР',
      title: 'Гарантия до 10 лет',
      description: 'Фиксированная смета и гарантийный сертификат: 10 лет на нержавеющую фурнитуру Boheme Milano, 3 года на монтаж и полную герметичность.',
      icon: Award,
    },
  ];

  return (
    <section id="advantages" className="py-12 sm:py-16 lg:py-20 bg-[#FBFAF7] dark:bg-[#13202A] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] dark:text-[#B2E4DD] block mb-2">
              ИНЖЕНЕРНЫЕ СТАНДАРТЫ / 01 — 04
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] text-balance">
              Точность исполнения.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">Безупречная геометрия.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Мы отказались от типового масс-маркета. Каждое изделие VETRO создается под конкретные размеры вашего помещения с точностью до миллиметра.
          </p>
        </div>

        {/* 4 Architectural Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {craftCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <article 
                key={idx}
                className="group p-6 rounded bg-[#F4F2EC] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <div className="flex items-center justify-between text-[#777A74] dark:text-[#B7C3CA] mb-6">
                    <span className="font-mono text-[12px] tracking-wider text-[#788173] dark:text-[#B2E4DD] font-medium tabular-nums">
                      {card.num}
                    </span>
                    <div className="size-8 rounded bg-[#FBFAF7] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] group-hover:bg-[#252725] dark:group-hover:bg-[#B2E4DD] group-hover:text-[#FBFAF7] dark:group-hover:text-[#102126] group-hover:border-[#252725] dark:group-hover:border-[#B2E4DD] transition-colors flex items-center justify-center text-[#252725] dark:text-[#B2E4DD]">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#777A74] dark:text-[#B7C3CA] block mb-1.5">
                    {card.tag}
                  </span>

                  <h3 className="text-base sm:text-[17px] font-semibold text-[#252725] dark:text-[#F1F2EF] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DFDDD6]/70 dark:border-[#34434E] flex items-center justify-between text-[#777A74] dark:text-[#B7C3CA] mt-6">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#777A74] dark:text-[#B7C3CA]">VETRO SPEC</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD] group-hover:text-[#252725] dark:group-hover:text-[#D3F1EB] transition-colors" />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
