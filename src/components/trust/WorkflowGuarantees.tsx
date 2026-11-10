import React from 'react';
import { 
  Droplets,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface WorkflowGuaranteesProps {
  onOpenMeasurementModal?: () => void;
}

export const WorkflowGuarantees: React.FC<WorkflowGuaranteesProps> = ({ onOpenMeasurementModal }) => {
  const steps = [
    {
      step: '01',
      title: 'Обсуждение задачи',
      time: '15 МИНУТ',
      description: 'Выяснение пожеланий, изучение визуализаций или дизайн-проекта. Предварительный расчет стоимости и консультация инженера.',
    },
    {
      step: '02',
      title: 'Замер и 3D-проектирование',
      time: 'В ТЕЧЕНИЕ 24 ЧАСОВ',
      description: 'Выезд инженера с лазерным 3D-сканером и чемоданом реальных образцов стекла и фурнитуры. Точная фиксация разуклонки и уклонов стен.',
    },
    {
      step: '03',
      title: 'Согласование решения',
      time: '1 ДЕНЬ',
      description: 'Утверждение производственных чертежей, узлов примыкания и фурнитуры. Фиксация итоговой сметы в официальном договоре.',
    },
    {
      step: '04',
      title: 'Изготовление на ЧПУ',
      time: 'ОТ 5 ДНЕЙ',
      description: 'Раскрой стекла 8–10 мм, полировка еврокромки, вырезы под петли и термическая закалка по ГОСТ 30698-2014 в цеху VETRO в Москве.',
    },
    {
      step: '05',
      title: 'Чистовой монтаж и гидротест',
      time: '3–4 ЧАСА',
      description: 'Установка штатными сертифицированными монтажниками, проверка притвора, опрессовка швов водой и подписание акта с гарантией.',
    },
  ];

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
    <section id="workflow" className="py-12 sm:py-16 lg:py-20 bg-[#F4F2EC] text-[#252725] border-b border-[#DFDDD6]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Steps */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#DFDDD6]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#788173] block mb-2">
              ПРОЦЕСС РАБОТЫ / 01 — 05
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#252725] tracking-tight leading-[1.08] text-balance">
              Архитектурный процесс.<br />
              <span className="italic text-[#788173]">От первой идеи до финального гидротеста.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777A74] max-w-md leading-relaxed font-sans text-pretty">
            Фиксированная смета и прозрачные сроки в официальном договоре. Итоговая стоимость после замера не изменится ни на рубль.
          </p>
        </div>

        {/* 5 Sequential Architectural Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-12 sm:mb-16">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="group p-5 rounded bg-[#FBFAF7] border border-[#DFDDD6] hover:border-[#252725] transition-colors duration-150 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#252725] group-hover:text-[#788173] transition-colors tabular-nums">
                    {item.step}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#F4F2EC] text-[#788173] border border-[#DFDDD6] tabular-nums">
                    {item.time}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-[#252725] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#777A74] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DFDDD6]/70 mt-4 flex items-center justify-between text-[#777A74]">
                <span className="font-mono text-[9px] tracking-wider uppercase">VETRO STEP</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#788173] group-hover:text-[#252725] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Section Heading: Guarantees */}
        <div className="flex items-center justify-between border-b border-[#DFDDD6] pb-3 mb-8 text-[11px] font-mono uppercase tracking-[0.16em] text-[#777A74]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#788173] rounded-none rotate-45" />
            ГАРАНТИЙНЫЕ ОБЯЗАТЕЛЬСТВА СТУДИИ VETRO
          </span>
          <span className="hidden sm:inline-block">ОФИЦИАЛЬНЫЙ СЕРТИФИКАТ И ДОГОВОР</span>
        </div>

        {/* 3 Guarantees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {warranties.map((w, idx) => {
            const Icon = w.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded bg-[#FBFAF7] border border-[#DFDDD6] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-[#252725]">
                      {w.years}
                    </span>
                    <div className="w-9 h-9 rounded bg-[#F4F2EC] border border-[#DFDDD6] text-[#252725] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#788173]" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#252725] mb-1">
                    {w.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#788173] block mb-3">
                    {w.subtitle}
                  </span>

                  <p className="text-xs sm:text-[13px] text-[#777A74] leading-relaxed">
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
