import React, { useEffect, useRef } from 'react';
import { 
  Droplets,
  Award,
  Layers,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessConfig } from '../../data/businessConfig';

export interface WorkflowGuaranteesProps {
  onOpenMeasurementModal?: () => void;
}

export const WorkflowGuarantees: React.FC<WorkflowGuaranteesProps> = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      step: '01',
      title: 'Обсуждение задачи и эскиз',
      time: '15 минут',
      deliverable: 'Предварительная смета и техническая консультация',
      description: 'Изучаем планировку, дизайн-проект или фото санузла. Подбираем конфигурацию полотен, тип закалённого стекла и фурнитуру Boheme Milano с ориентировочной сметой.',
    },
    {
      step: '02',
      title: 'Лазерный 3D-замер и образцы',
      time: 'В течение 24 часов',
      deliverable: '3D-сканирование с допуском 1 мм',
      description: 'Выезд ведущего инженера с лазерным 3D-сканером и кейсом физических образцов стекла и PVD-фурнитуры. Фиксируем уклоны стен, геометрию ниши и разуклонку трапа.',
    },
    {
      step: '03',
      title: 'Проектирование и договор',
      time: '1 день',
      deliverable: 'Рабочие чертежи КМД и фиксация цены',
      description: 'Разрабатываем производственные чертежи с узлами примыкания и вырезами. Утверждаем финальную спецификацию — цена в договоре фиксируется и не меняется ни на рубль.',
    },
    {
      step: '04',
      title: 'Изготовление на ЧПУ в цеху VETRO',
      time: 'От 5 дней',
      deliverable: 'Закалка ESG по ГОСТ 30698-2014 и ОТК',
      description: 'Автоматический раскрой стекла 8–10 мм, алмазная полировка еврокромки, зенковка отверстий, термическая закалка при 680°C и нанесение гидрофобного слоя Easy Clean.',
    },
    {
      step: '05',
      title: 'Чистовой монтаж и гидротест',
      time: '3–4 часа',
      deliverable: 'Опрессовка водой и гарантия до 10 лет',
      description: 'Установка штатными сертифицированными мастерами в бахилах без пыли. Регулировка доводчиков, настройка магнитных уплотнителей, гидротест швов и передача гарантийного акта.',
    },
  ];

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', stackRef.current);
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        if (!nextCard) return;

        gsap.to(card, {
          scale: 0.94 + 0.013 * i,
          autoAlpha: 0.7,
          y: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, stackRef);

    return () => ctx.revert();
  }, []);

  const warranties = [
    {
      years: '3 года',
      numericYears: businessConfig.guarantees.installationYears,
      title: 'Монтаж и герметичность',
      subtitle: 'Аквастоп-защита',
      desc: '100% герметичность примыканий к плитке и полу. Бесплатный гарантийный выезд сервисного инженера и регулировка узлов.',
      icon: Droplets,
    },
    {
      years: '5–10 лет',
      numericYears: businessConfig.guarantees.hardwareYears,
      title: 'Фурнитура Boheme Milano',
      subtitle: 'AISI 304 и латунь',
      desc: 'Усиленные петли и роликовые каретки с ресурсом свыше 100 000 циклов. Вакуумное PVD-напыление не тускнеет и не истирается.',
      icon: Award,
    },
    {
      years: '10 лет',
      numericYears: businessConfig.guarantees.glassYears,
      title: 'Закаленное стекло ESG',
      subtitle: 'ГОСТ 30698-2014',
      desc: 'Безопасное монолитное закаленное стекло высшей марки М1. Термостойкость, механическая прочность и оптическая чистота.',
      icon: Layers,
    },
  ];

  return (
    <section id="workflow" className="py-12 sm:py-16 lg:py-20 bg-[#F4F2EC] dark:bg-[#101923] text-[#252725] dark:text-[#F1F2EF] border-b border-[#DFDDD6] dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Steps */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E]">
          <div>
            <span className="font-mono text-[11px] text-[#788173] dark:text-[#B2E4DD] block mb-2">
              Процесс работы · 01–05
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] dark:text-[#F1F2EF] tracking-tight leading-[1.08] text-balance">
              Архитектурный процесс.<br />
              <span className="italic text-[#788173] dark:text-[#B2E4DD]">От первой идеи до финального гидротеста.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Фиксированная смета и прозрачные сроки в официальном договоре. Итоговая стоимость после замера не изменится ни на рубль.
          </p>
        </div>

        {/* 5 Sequential Overlapping Sticky Stack Cards */}
        <div
          ref={stackRef}
          data-sticky-stack="true"
          className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8 mb-16 sm:mb-24"
        >
          {steps.map((item, idx) => (
            <article
              key={item.step}
              data-stack-card="true"
              className="group p-6 sm:p-8 rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] shadow-subtle dark:shadow-none transition-colors duration-150 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 sm:gap-8">
                {/* Left Step Index & Timing Column */}
                <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-3 sm:w-44 shrink-0">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-[#252725] dark:text-[#F1F2EF] group-hover:text-[#788173] dark:group-hover:text-[#B2E4DD] transition-colors tabular-nums">
                      {item.step}
                    </span>
                    <span className="font-mono text-[10px] text-[#777A74] dark:text-[#B7C3CA]">
                      / 05
                    </span>
                  </div>

                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] text-[#788173] dark:text-[#B2E4DD] border border-[#DFDDD6] dark:border-[#34434E] tabular-nums">
                    {item.time}
                  </span>
                </div>

                {/* Right Main Content Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#252725] dark:text-[#F1F2EF] leading-snug">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#788173] dark:text-[#B2E4DD] group-hover:text-[#252725] dark:group-hover:text-[#D3F1EB] transition-colors shrink-0 hidden sm:block" />
                  </div>

                  <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#D1DCE1] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-[#DFDDD6]/70 dark:border-[#34434E] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[#252725] dark:text-[#F1F2EF] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#788173] dark:text-[#B2E4DD] shrink-0" />
                      <span>{item.deliverable}</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#777A74] dark:text-[#B7C3CA]">
                      Этап VETRO · {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section Heading: Guarantees */}
        <div className="flex items-center justify-between border-b border-[#DFDDD6] dark:border-[#34434E] pb-3 mb-8 text-[11px] font-mono text-[#777A74] dark:text-[#B7C3CA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#788173] dark:bg-[#B2E4DD] rounded-none rotate-45" />
            Гарантийные обязательства студии VETRO
          </span>
          <span className="hidden sm:inline-block">Официальный сертификат и договор</span>
        </div>

        {/* 3 Guarantees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {warranties.map((w, idx) => {
            const Icon = w.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-[#252725] dark:text-[#B2E4DD]">
                      {w.years}
                    </span>
                    <div className="w-9 h-9 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] text-[#252725] dark:text-[#B2E4DD] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#788173] dark:text-[#B2E4DD]" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1">
                    {w.title}
                  </h3>
                  <span className="font-mono text-[10px] text-[#788173] dark:text-[#B2E4DD] block mb-3">
                    {w.subtitle}
                  </span>

                  <p className="text-xs sm:text-[13px] text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
