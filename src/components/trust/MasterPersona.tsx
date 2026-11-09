import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  Ruler, 
  Quote,
  ArrowUpRight
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export interface MasterPersonaProps {
  onOpenMeasurementModal?: () => void;
}

export const MasterPersona: React.FC<MasterPersonaProps> = ({ onOpenMeasurementModal }) => {
  const metrics = [
    {
      value: '>500',
      label: 'Проектов в Москве',
      sublabel: 'частные интерьеры',
    },
    {
      value: '0',
      label: 'Протечек',
      sublabel: 'гидротест каждого шва',
    },
    {
      value: '10',
      label: 'Лет со стеклом',
      sublabel: 'практика с 2015 года',
    },
    {
      value: '100%',
      label: 'Закалка ESG',
      sublabel: 'ГОСТ 30698-2014',
    },
  ];

  return (
    <section id="master" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] border-t border-[rgba(26,23,18,0.06)] text-[#1a1712] relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header: Fineas Manifesto Style */}
        <div className="flex items-center justify-between border-b border-[rgba(26,23,18,0.08)] pb-2.5 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#7c766c]">
          <span>A NOTE ON CRAFTSMANSHIP</span>
          <span>VLADISLAV · FOUNDER & MASTER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Master Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-[rgba(26,23,18,0.1)] bg-white shadow-elevated group">
                <img
                  src="/portfolio/master_vlad.jpg"
                  alt="Мастер Владислав за работой на объекте в Москве"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  width="500"
                  height="600"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-wider text-white">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
                    ОПЫТ 10 ЛЕТ
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/95 text-[#1a1712] font-semibold backdrop-blur-md">
                    ШЕФ-МОНТАЖ
                  </span>
                </div>

                {/* Quote Box */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[rgba(26,23,18,0.08)] shadow-card">
                  <p className="text-xs text-[#1a1712] italic leading-relaxed font-serif">
                    «Стекло не прощает суеты. Каждый миллиметр выверяется под фактическую плитку санузла.»
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#7c766c]">
                    <span className="text-[#1a1712] font-sans font-bold">Владислав</span>
                    <span>Основатель VETRO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, 4 Key Metrics, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#7c766c] mb-3 block">
              PERSONAL RESPONSIBILITY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1712] tracking-tight leading-[1.05] mb-5 font-sans">
              О мастере Владиславе.<br />
              <em className="font-serif italic font-normal text-[#1a1712]">Прямой контакт без посредников.</em>
            </h2>

            <p className="text-sm sm:text-base text-[rgba(20,20,22,0.7)] leading-relaxed mb-8 max-w-xl font-sans">
              В студии VETRO нет навязчивых менеджеров и субподрядчиков. Я лично выезжаю на 3D-замер с физическими образцами стекла и фурнитуры, проектирую конструкцию и выполняю чистовой монтаж с гидротестом.
            </p>

            {/* 4 Sculptural Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[rgba(26,23,18,0.08)] flex flex-col justify-between shadow-card"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1a1712] font-mono">
                    {m.value}
                  </div>
                  <div className="mt-1">
                    <span className="text-xs font-bold text-[#1a1712] block leading-tight">{m.label}</span>
                    <span className="font-mono text-[9px] text-[#7c766c] uppercase tracking-wider block mt-0.5">{m.sublabel}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-white bg-[#FF2500] hover:bg-[#e02000] shadow-sm transition-all text-sm active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать Владиславу ↗</span>
              </a>

              <button
                type="button"
                onClick={onOpenMeasurementModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-[#1a1712] bg-white hover:bg-[#eae6dc] border border-[rgba(26,23,18,0.12)] shadow-card transition-all text-sm active:scale-[0.98]"
              >
                <Ruler className="w-4 h-4 text-[#1a1712]" />
                <span>Вызвать мастера на замер</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
