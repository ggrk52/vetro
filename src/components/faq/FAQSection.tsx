import React, { useState } from 'react';
import { 
  ChevronDown, 
  MessageCircle,
  ArrowUpRight
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
      question: 'Какая толщина стекла используется и насколько это безопасно?',
      answer:
        'Мы применяем исключительно монолитное закаленное стекло 8–10 мм марки М1 (ESG) по ГОСТ 30698-2014 с алмазной полировкой еврокромки. Закалка при 680°C делает стекло в 7 раз прочнее сырого. Оно легко выдерживает случайные удары и перепады температур. При экстремальном разрушении рассыпается на безопасные закругленные фрагменты без острых граней.',
    },
    {
      question: 'В чем разница между обычным стеклом и осветленным Optiwhite?',
      answer:
        'Стандартное стекло на просвет имеет естественный зеленовато-бутылочный оттенок из-за содержания оксидов железа. Осветленное стекло Optiwhite (Extra Clear) полностью обесцвечено: оно пропускает 99% света и передает истинный оттенок белого керамогранита, мрамора Calacatta и светлой плитки без паразитных искажений.',
    },
    {
      question: 'Что делать, если стены имеют уклон или поддон выложен с перепадом?',
      answer:
        'Для этого студия VETRO выполняет бесплатный точный замер. Инженер замеряет плоскости с точностью до 1 мм: стекло раскраивается на станках ЧПУ с учетом индивидуальных уклонов стен и разуклонки поддона. Конструкция монтируется с равномерными технологическими зазорами без щелей и перекосов.',
    },
    {
      question: 'Как ухаживать за стеклом душевой кабины?',
      answer:
        'Гладкая полированная поверхность закаленного стекла не удерживает загрязнения при регулярном уходе. Для идеальной чистоты достаточно после душа за 15 секунд провести по стеклу мягким резиновым водосгоном.',
    },
    {
      question: 'В какие сроки изготавливается и монтируется конструкция?',
      answer:
        'Бесплатный выезд инженера на замер возможен в течение 24 часов после заявки. Срок изготовления на ЧПУ-оборудовании в Москве составляет от 5 до 7 рабочих дней. Чистовой монтаж на объекте занимает 3–4 часа и проводится штатными мастерами в бахилах без строительной пыли.',
    },
    {
      question: 'Что входит в официальную гарантию по договору?',
      answer:
        'В официальном договоре фиксируются все обязательства: 10 лет на монолитное закаленное стекло, 5–10 лет на фурнитуру Boheme Milano из нержавеющей стали AISI 304, и 1 год на монтаж и герметичность соединений. Сервисная служба VETRO оперативно выезжает на гарантийное обслуживание.',
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-[#FBFAF7] dark:bg-[#13202A] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] dark:text-[#B2E4DD] block mb-2">
              ЧАСТЫЕ ВОПРОСЫ / FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] text-balance">
              Вопросы и ответы.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">Технические стандарты реализации.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Ответы инженеров VETRO о безопасности закаленного стекла, уходе за гидрофобным слоем, сроках и герметичности.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-2 mb-10">
          {faqList.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                data-testid="faq-item"
                className="bg-[#F4F2EC] dark:bg-[#14212C] rounded border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none active:scale-[0.99] transition-transform"
                >
                  <span className="font-medium text-sm sm:text-base text-[#252725] dark:text-[#F1F2EF] pr-2">
                    {item.question}
                  </span>
                  <div
                    className={`size-6 rounded flex items-center justify-center shrink-0 border border-[#DFDDD6] dark:border-[#34434E] transition-transform duration-200 ${
                      isOpen ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] rotate-180 border-[#252725] dark:border-[#B2E4DD]' : 'bg-[#FBFAF7] dark:bg-[#0F1B25] text-[#252725] dark:text-[#F1F2EF]'
                    }`}
                  >
                    <ChevronDown className="size-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-[13px] text-[#777A74] dark:text-[#B7C3CA] leading-relaxed border-t border-[#DFDDD6]/60 dark:border-[#34434E] mt-1 pt-3">
                    <p className="text-pretty">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center bg-[#F4F2EC] dark:bg-[#14212C] rounded border border-[#DFDDD6] dark:border-[#34434E] p-6 sm:p-8 max-w-lg mx-auto">
          <h3 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1.5 font-sans">
            Остались вопросы по вашему проекту?
          </h3>
          <p className="text-xs sm:text-[13px] text-[#777A74] dark:text-[#B7C3CA] mb-5 text-pretty">
            Направьте эскиз или план санузла в инженерный отдел VETRO — сделаем предварительный расчет за 15 минут.
          </p>
          <a
            href={businessConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs uppercase tracking-wider hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] transition-colors duration-150 active:scale-[0.98]"
          >
            <MessageCircle className="size-3.5 text-[#788173] dark:text-[#102126]" />
            <span>Обсудить в WhatsApp</span>
            <ArrowUpRight className="size-3.5 text-[#A68C70] dark:text-[#102126]" />
          </a>
        </div>

      </div>
    </section>
  );
};
