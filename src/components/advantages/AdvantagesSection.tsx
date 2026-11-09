import React from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Ruler, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const craftCards = [
    {
      num: '01 / ПРЯМОЙ КОНТАКТ',
      title: 'Без наценок салонов',
      description: 'Прямая работа со студией VETRO от 3D-замера до монтажа. Собственное производство без посредников и салонных наценок 30–50%.',
      icon: UserCheck,
    },
    {
      num: '02 / МАТЕРИАЛ',
      title: 'Стекло 8–10 мм ГОСТ',
      description: 'Монолитное закаленное стекло Optiwhite и Estriado по ГОСТ 30698-2014. В 7 раз прочнее обычного, с идеальной еврокромкой.',
      icon: ShieldCheck,
    },
    {
      num: '03 / ГЕОМЕТРИЯ',
      title: '3D-замер до 1 мм',
      description: 'Электронное лазерное сканирование стен под фактический уклон плитки, сливного трапа и выступов коробов.',
      icon: Ruler,
    },
    {
      num: '04 / ФУРНИТУРА',
      title: 'Boheme Milano & AISI 304',
      description: 'Цельнометаллическая нержавеющая сталь и латунь с PVD-покрытием. Ресурс 100 000 циклов без провисаний и люфтов.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="advantages" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Heading in Fineas editorial style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] block mb-2 sm:mb-3">
              THE STANDARDS / 001 — 004
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Тактильность.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Точность и надежность.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-sm leading-relaxed font-sans">
            Мы отказались от типового масс-маркета. Каждое изделие создается под единственную геометрию вашего пространства.
          </p>
        </div>

        {/* 4 Architectural Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {craftCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <article 
                key={idx}
                className="group p-5 sm:p-6 md:p-7 rounded-3xl bg-white border border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.22)] shadow-card hover:shadow-elevated transition-all duration-500 flex flex-col justify-between min-h-[220px] sm:min-h-[250px]"
              >
                <div>
                  <div className="flex items-center justify-between text-[#7c766c] mb-4 sm:mb-5">
                    <span className="font-mono text-[10px] tracking-wider uppercase">{card.num}</span>
                    <div className="w-8 h-8 rounded-full bg-[#f4f2ec] group-hover:bg-[#FF2500] group-hover:text-white transition-colors flex items-center justify-center text-[#1a1712]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1a1712] mb-1.5 font-display">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[rgba(26,23,18,0.06)] flex items-center justify-between text-[#7c766c] mt-4">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase">VETRO CRAFT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#FF2500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
