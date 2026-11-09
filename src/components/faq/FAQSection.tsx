import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  onOpenMeasurementModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenMeasurementModal }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqList: FAQItem[] = [
    {
      question: 'Чем закаленное стекло 8 мм лучше магазинной кабинки?',
      answer:
        'Масс-маркет изготавливается из сырого стекла 4 мм на пластиковых роликах, которые люфтят и текут. Мы ставим монолитное закаленное стекло 8–10 мм по ГОСТ 30698-2014 с европейской фурнитурой AISI 304, служащей десятилетиями.',
    },
    {
      question: 'Что такое стекло Optiwhite и нужно ли его выбирать?',
      answer:
        'Обычное стекло имеет зеленоватый оттенок на срезе. Optiwhite — это кристально осветленное стекло без посторонних оттенков, идеально передающее цвет белой плитки и мрамора Calacatta.',
    },
    {
      question: 'Не разобьется ли стекло от случайного удара или кипятка?',
      answer:
        'Закалка при 680°C делает стекло в 7 раз прочнее обычного. Оно легко переносит случайные удары лейкой душа и перепады температур до 250°C. При разрушении рассыпается на безопасную мелкую крошку без острых граней.',
    },
    {
      question: 'Будет ли течь вода из душевой без поддона (в пол)?',
      answer:
        'Нет. Магнитные уплотнители, нижний капельник и порожек-аквастоп высотой 5 мм обеспечивают 100% гидроизоляцию. Перед сдачей мастер проводит обязательный проливной гидротест.',
    },
    {
      question: 'Как ухаживать за стеклом от известкового налета?',
      answer:
        'Мы наносим заводское гидрофобное покрытие «Антикапля». Вода скатывается шариками, не задерживая мыло и известь. Достаточно раз в пару дней провести резиновым водосгоном за 15 секунд.',
    },
    {
      question: 'В какие сроки изготавливается и монтируется конструкция?',
      answer:
        'Выезд на замер — за 24 часа. Заводская закалка стекла — 5–7 рабочих дней. Чистовой монтаж на объекте занимает 3–4 часа без строительного мусора и пыли.',
    },
  ];

  return (
    <section id="faq" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative overflow-hidden border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header: Editorial Minimalist */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] block mb-2 sm:mb-3">
              THE QUESTIONS / 001 — 006
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Вопросы и ответы.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Технические нюансы.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-sm leading-relaxed font-sans">
            Честные и короткие ответы мастера о безопасности, уходе, сроках и герметичности.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-2.5 mb-8 sm:mb-10">
          {faqList.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                data-testid="faq-item"
                className="bg-white rounded-2xl border border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)] transition-all overflow-hidden shadow-card"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-[#1a1712] pr-2 font-display">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#1a1712] text-white rotate-180' : 'bg-[#f4f2ec] text-[#1a1712]'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[rgba(20,20,22,0.7)] leading-relaxed">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center bg-white rounded-3xl border border-[rgba(26,23,18,0.08)] p-6 sm:p-8 max-w-xl mx-auto shadow-card">
          <h3 className="text-base sm:text-lg font-bold text-[#1a1712] mb-1.5 font-display">
            Остались вопросы по вашему объекту?
          </h3>
          <p className="text-xs text-[rgba(20,20,22,0.65)] mb-5">
            Напишите напрямую мастеру — предварительный расчет по фото за 15 минут.
          </p>
          <a
            href={businessConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1712] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#FF2500] transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>Написать в WhatsApp ↗</span>
          </a>
        </div>

      </div>
    </section>
  );
};
