import React from 'react';
import { 
  FileText, 
  Ruler, 
  Settings, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Droplets,
  Layers,
  Award
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface WorkflowGuaranteesProps {
  onOpenMeasurementModal?: () => void;
}

export const WorkflowGuarantees: React.FC<WorkflowGuaranteesProps> = ({ onOpenMeasurementModal }) => {
  const steps = [
    {
      step: '01',
      title: 'Расчет сметы',
      time: '15 МИН',
      description: 'Предварительный расчет по фото или размерам санузла в WhatsApp.',
    },
    {
      step: '02',
      title: '3D-замер',
      time: '24 ЧАСА',
      description: 'Лазерный замер геометрии с чемоданом физических образцов стекла и фурнитуры.',
    },
    {
      step: '03',
      title: 'Договор',
      time: '1 ДЕНЬ',
      description: 'Точный чертеж и фиксированная цена, которая не изменится ни на рубль.',
    },
    {
      step: '04',
      title: 'Закалка',
      time: '5–7 ДНЕЙ',
      description: 'Заводской раскрой стекла 8–10 мм и термическая закалка по ГОСТ 30698-2014.',
    },
    {
      step: '05',
      title: 'Монтаж',
      time: '3–4 ЧАСА',
      description: 'Чистая сборка без строительной пыли, установка магнитных аквастоп-уплотнителей.',
    },
    {
      step: '06',
      title: 'Гидротест',
      time: 'СДАЧА',
      description: 'Проливной тест швов под напором воды и выдача официального гарантийного талона.',
    },
  ];

  const warranties = [
    {
      years: '3 года',
      numericYears: businessConfig.guarantees.installationYears,
      title: 'Монтаж и герметичность',
      subtitle: 'Аквастоп-защита',
      desc: '100% герметичность примыканий к плитке и полу. Бесплатный гарантийный выезд инженера и регулировка узлов.',
      icon: Droplets,
    },
    {
      years: '5 лет',
      numericYears: businessConfig.guarantees.hardwareYears,
      title: 'Фурнитура Boheme',
      subtitle: 'AISI 304 и латунь',
      desc: 'Усиленные петли и ролики с ресурсом свыше 100 000 циклов. PVD-покрытие не тускнеет и не ржавеет.',
      icon: Award,
    },
    {
      years: '10 лет',
      numericYears: businessConfig.guarantees.glassYears,
      title: 'Закаленное стекло',
      subtitle: 'ГОСТ 30698-2014',
      desc: 'Безопасное монолитное стекло ESG высшей марки М1. Термостойкость и кристальная прозрачность.',
      icon: Layers,
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] text-[#1a1712] relative overflow-hidden border-t border-[rgba(26,23,18,0.06)]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Heading: Steps */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#7c766c] block mb-2 sm:mb-3">
              THE WORKFLOW / 01 — 06
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] font-sans">
              Прозрачные этапы.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">От замера до гидротеста.</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] max-w-sm leading-relaxed font-sans">
            Фиксированная смета в договоре: цена после замера не вырастет ни на рубль.
          </p>
        </div>

        {/* 6 Minimalist Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 mb-10 sm:mb-14">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="group p-5 sm:p-6 rounded-3xl bg-white border border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.22)] transition-all duration-300 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#1a1712] group-hover:text-[#FF2500] transition-colors">
                    {item.step}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#f4f2ec] text-[#7c766c]">
                    {item.time}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#1a1712] mb-1 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-[rgba(20,20,22,0.65)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Heading: Guarantees */}
        <div className="flex items-center justify-between border-b border-[rgba(26,23,18,0.08)] pb-2.5 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#7c766c]">
          <span>LEGAL OBLIGATIONS & WARRANTY</span>
          <span>ОФИЦИАЛЬНЫЙ ДОГОВОР</span>
        </div>

        {/* 3 Guarantees Cards (Minimalism: No 9 bullet points, crisp statements) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {warranties.map((w, idx) => {
            const Icon = w.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-[rgba(26,23,18,0.08)] shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#1a1712]">
                      {w.years}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#f4f2ec] text-[#1a1712] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#FF2500]" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#1a1712] mb-1 font-display">
                    {w.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#7c766c] block mb-3">
                    {w.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] leading-relaxed">
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
