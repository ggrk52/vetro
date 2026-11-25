import React, { useState, useMemo } from 'react';
import { 
  Calculator as CalcIcon, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Ruler, 
  ShieldCheck, 
  Droplets, 
  Wrench, 
  MessageCircle, 
  Phone, 
  Send,
  CheckCircle2
} from 'lucide-react';
import { 
  CalculatorState, 
  CalculatorCabinType, 
  CalculatorGlassType, 
  CalculatorHardwareFinish, 
  DEFAULT_CALCULATOR_STATE, 
  CABIN_TYPE_METADATA, 
  GLASS_METADATA, 
  HARDWARE_METADATA, 
  OPTION_PRICES,
  calculatePrice,
  formatPrice
} from '../../utils/calculatorPricing';
import { PhoneInputMask, isPhoneComplete } from '../common/PhoneInputMask';
import { businessConfig } from '../../data/businessConfig';

export interface CalculatorSectionProps {
  onOpenMeasurementModal?: () => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onOpenMeasurementModal }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [calcState, setCalcState] = useState<CalculatorState>(DEFAULT_CALCULATOR_STATE);

  // Form lead submission state in Step 5
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [preferredMessenger, setPreferredMessenger] = useState<'whatsapp' | 'telegram' | 'phone'>('whatsapp');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | undefined>();

  // Live price calculation based on current state
  const pricing = useMemo(() => calculatePrice(calcState), [calcState]);

  const cabinMeta = CABIN_TYPE_METADATA[calcState.cabinType];

  const handleSelectCabinType = (type: CalculatorCabinType) => {
    const meta = CABIN_TYPE_METADATA[type];
    setCalcState((prev) => ({
      ...prev,
      cabinType: type,
      width: meta.defaultDimensions.width,
      height: meta.defaultDimensions.height,
      depth: meta.defaultDimensions.depth ?? prev.depth,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // WhatsApp formatted link generation with full calculated details
  const whatsappQuoteUrl = useMemo(() => {
    const lines = [
      `Здравствуйте! Рассчитал душевую кабину на сайте студии VETRO:`,
      `• Тип: ${CABIN_TYPE_METADATA[calcState.cabinType].title}`,
      `• Размеры: ${calcState.width}×${calcState.height}${calcState.depth && cabinMeta.requiresDepth ? `×${calcState.depth}` : ''} см (площадь ~${pricing.areaSqm} м²)`,
      `• Стекло: ${GLASS_METADATA[calcState.glassType].name}`,
      `• Фурнитура: ${HARDWARE_METADATA[calcState.hardwareFinish].name}`,
      `• Монтаж: ${calcState.hasInstallation ? 'Да (+6000 ₽)' : 'Нет'}`,
      `• Антикапля: ${calcState.hasHydrophobicCoating ? 'Да (+2500 ₽)' : 'Нет'}`,
      `• Расчетная стоимость: ${pricing.formattedTotal}`,
      clientName ? `Имя: ${clientName}` : '',
      clientPhone ? `Телефон: ${clientPhone}` : '',
      `Хочу подтвердить расчет и заказать выезд на замер.`,
    ].filter(Boolean);

    return `https://wa.me/79268402345?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [calcState, cabinMeta.requiresDepth, pricing, clientName, clientPhone]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim() || !isPhoneComplete(clientPhone)) {
      setPhoneError('Введите корректный номер телефона (+7 XXX XXX-XX-XX)');
      return;
    }
    setPhoneError(undefined);
    setFormSubmitted(true);
  };

  const stepsList = [
    { num: 1, title: 'Конструкция', desc: 'Тип кабины' },
    { num: 2, title: 'Габариты', desc: 'Ширина и высота' },
    { num: 3, title: 'Стекло', desc: 'Оттенок полотна' },
    { num: 4, title: 'Фурнитура', desc: 'Цвет и опции' },
    { num: 5, title: 'Смета', desc: 'Фиксация цены' },
  ];

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#F4F2EC] dark:bg-[#13202A] border-b border-[#DFDDD6] dark:border-[#34434E] scroll-mt-20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#DFDDD6] dark:border-[#34434E] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded border border-[#DFDDD6] dark:border-[#34434E] bg-[#FBFAF7] dark:bg-[#14212C] text-[11px] font-mono text-[#777A74] dark:text-[#B2E4DD]">
              <CalcIcon className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
              <span>Интерактивный расчет</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#252725] dark:text-[#F1F2EF] tracking-tight text-balance">
              Калькулятор стоимости VETRO
            </h2>
            <p className="text-sm sm:text-base text-[#777A74] dark:text-[#B7C3CA] mt-2 max-w-xl text-pretty">
              Рассчитайте предварительную смету с учетом закаленного стекла 8–10 мм, итальянской фурнитуры Boheme Milano и чистового монтажа.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-[#777A74] dark:text-[#B7C3CA]">
            <span className="w-2 h-2 rounded-none rotate-45 bg-[#788173] dark:bg-[#B2E4DD]" />
            <span>Точность расчета 95% • Фиксация цены в договоре</span>
          </div>
        </div>

        {/* 5-Step Process Indicator Bar */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-8">
          {stepsList.map((s) => {
            const isPassed = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`text-left p-2.5 sm:p-3 rounded border transition-colors duration-150 text-xs flex flex-col justify-between min-h-[56px] ${
                  isCurrent
                    ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] border-[#252725] dark:border-[#B2E4DD]'
                    : isPassed
                    ? 'bg-[#FBFAF7] dark:bg-[#14212C] text-[#252725] dark:text-[#F1F2EF] border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD]'
                    : 'bg-[#F4F2EC] dark:bg-[#0F1B25] text-[#777A74] dark:text-[#B7C3CA] border-[#DFDDD6]/70 dark:border-[#34434E]/70 hover:border-[#DFDDD6] dark:hover:border-[#657881]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] tabular-nums">
                    0{s.num}
                  </span>
                  {isPassed && <Check className="size-3 text-[#788173] dark:text-[#B2E4DD]" />}
                </div>
                <div className="font-medium text-[11px] sm:text-xs truncate">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Calculator Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Controls (8 cols) */}
          <div className="lg:col-span-8 bg-[#FBFAF7] dark:bg-[#16242F] border border-[#DFDDD6] dark:border-[#34434E] rounded p-6 sm:p-8">
            
            {/* STEP 1: CABIN TYPE */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1 font-sans">
                    Шаг 1. Выберите тип конструкции
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA]">
                    Каждая модель изготавливается по индивидуальным размерам с точностью до 1 мм.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(CABIN_TYPE_METADATA) as CalculatorCabinType[]).map((typeKey) => {
                    const item = CABIN_TYPE_METADATA[typeKey];
                    const isSelected = calcState.cabinType === typeKey;
                    return (
                      <button
                        key={typeKey}
                        data-testid="cabin-type-option"
                        type="button"
                        onClick={() => handleSelectCabinType(typeKey)}
                        className={`text-left p-5 rounded border transition-colors duration-150 flex flex-col justify-between active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#F4F2EC] dark:bg-[#1B2C36] border-[#252725] dark:border-[#B2E4DD] ring-1 ring-[#252725] dark:ring-[#B2E4DD]'
                            : 'bg-[#FBFAF7] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD]'
                        }`}
                      >
                        <div className="flex items-start justify-between w-full mb-2">
                          <span className="font-semibold text-sm sm:text-base text-[#252725] dark:text-[#F1F2EF]">
                            {item.title}
                          </span>
                          <div
                            className={`size-5 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#252725] dark:border-[#B2E4DD] bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126]'
                                : 'border-[#DFDDD6] dark:border-[#435461] bg-[#FBFAF7] dark:bg-[#101923]'
                            }`}
                          >
                            {isSelected && <Check className="size-3.5" />}
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[#788173] dark:text-[#B2E4DD] mb-1">
                          {item.subtitle}
                        </span>
                        <p className="text-xs text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: DIMENSIONS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1 font-sans">
                    Шаг 2. Размеры конструкции (см)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA]">
                    Укажите ориентировочные габариты для расчета. Точный лазерный 3D-замер инженер проведет на объекте бесплатно.
                  </p>
                </div>

                {/* Width Slider */}
                <div className="bg-[#FBFAF7] dark:bg-[#0F1B25] rounded p-5 border border-[#DFDDD6] dark:border-[#435461] space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="range-width" className="text-sm font-semibold text-[#252725] dark:text-[#DDE7E9]">
                      Ширина (см):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={cabinMeta.minDimensions.width}
                        max={cabinMeta.maxDimensions.width}
                        value={calcState.width}
                        onChange={(e) =>
                          setCalcState((prev) => ({
                            ...prev,
                            width: Math.min(cabinMeta.maxDimensions.width, Math.max(cabinMeta.minDimensions.width, Number(e.target.value) || 60)),
                          }))
                        }
                        className="w-20 px-2.5 py-1 text-center bg-white dark:bg-[#101923] border border-[#DFDDD6] dark:border-[#435461] rounded text-[#252725] dark:text-[#F1F2EF] font-mono font-bold text-sm focus:border-[#252725] dark:focus:border-[#B2E4DD] outline-none tabular-nums"
                      />
                      <span className="text-xs text-[#777A74] dark:text-[#B7C3CA] font-mono">см</span>
                    </div>
                  </div>
                  <input
                    id="range-width"
                    type="range"
                    min={cabinMeta.minDimensions.width}
                    max={cabinMeta.maxDimensions.width}
                    step={5}
                    value={calcState.width}
                    onChange={(e) =>
                      setCalcState((prev) => ({ ...prev, width: Number(e.target.value) }))
                    }
                    className="w-full accent-[#252725] dark:accent-[#B2E4DD] cursor-pointer h-2 bg-[#E8E5DD] dark:bg-[#34434E] rounded"
                  />
                  <div className="flex justify-between text-[11px] text-[#777A74] dark:text-[#B7C3CA] font-mono tabular-nums">
                    <span>от {cabinMeta.minDimensions.width} см</span>
                    <span>до {cabinMeta.maxDimensions.width} см</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="bg-[#FBFAF7] dark:bg-[#0F1B25] rounded p-5 border border-[#DFDDD6] dark:border-[#435461] space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="range-height" className="text-sm font-semibold text-[#252725] dark:text-[#DDE7E9]">
                      Высота (см):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={cabinMeta.minDimensions.height}
                        max={cabinMeta.maxDimensions.height}
                        value={calcState.height}
                        onChange={(e) =>
                          setCalcState((prev) => ({
                            ...prev,
                            height: Math.min(cabinMeta.maxDimensions.height, Math.max(cabinMeta.minDimensions.height, Number(e.target.value) || 140)),
                          }))
                        }
                        className="w-20 px-2.5 py-1 text-center bg-white dark:bg-[#101923] border border-[#DFDDD6] dark:border-[#435461] rounded text-[#252725] dark:text-[#F1F2EF] font-mono font-bold text-sm focus:border-[#252725] dark:focus:border-[#B2E4DD] outline-none tabular-nums"
                      />
                      <span className="text-xs text-[#777A74] dark:text-[#B7C3CA] font-mono">см</span>
                    </div>
                  </div>
                  <input
                    id="range-height"
                    type="range"
                    min={cabinMeta.minDimensions.height}
                    max={cabinMeta.maxDimensions.height}
                    step={5}
                    value={calcState.height}
                    onChange={(e) =>
                      setCalcState((prev) => ({ ...prev, height: Number(e.target.value) }))
                    }
                    className="w-full accent-[#252725] dark:accent-[#B2E4DD] cursor-pointer h-2 bg-[#E8E5DD] dark:bg-[#34434E] rounded"
                  />
                  <div className="flex justify-between text-[11px] text-[#777A74] dark:text-[#B7C3CA] font-mono tabular-nums">
                    <span>от {cabinMeta.minDimensions.height} см</span>
                    <span>стандарт: 200 см</span>
                    <span>до {cabinMeta.maxDimensions.height} см</span>
                  </div>
                </div>

                {/* Depth Slider (only if cabin requires depth) */}
                {cabinMeta.requiresDepth && (
                  <div className="bg-[#FBFAF7] dark:bg-[#0F1B25] rounded p-5 border border-[#DFDDD6] dark:border-[#435461] space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="range-depth" className="text-sm font-semibold text-[#252725] dark:text-[#DDE7E9]">
                        Глубина второй стороны (см):
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={cabinMeta.minDimensions.depth ?? 70}
                          max={cabinMeta.maxDimensions.depth ?? 150}
                          value={calcState.depth ?? 90}
                          onChange={(e) =>
                            setCalcState((prev) => ({
                              ...prev,
                              depth: Math.min(cabinMeta.maxDimensions.depth ?? 150, Math.max(cabinMeta.minDimensions.depth ?? 70, Number(e.target.value) || 70)),
                            }))
                          }
                          className="w-20 px-2.5 py-1 text-center bg-white dark:bg-[#101923] border border-[#DFDDD6] dark:border-[#435461] rounded text-[#252725] dark:text-[#F1F2EF] font-mono font-bold text-sm focus:border-[#252725] dark:focus:border-[#B2E4DD] outline-none tabular-nums"
                        />
                        <span className="text-xs text-[#777A74] dark:text-[#B7C3CA] font-mono">см</span>
                      </div>
                    </div>
                    <input
                      id="range-depth"
                      type="range"
                      min={cabinMeta.minDimensions.depth ?? 70}
                      max={cabinMeta.maxDimensions.depth ?? 150}
                      step={5}
                      value={calcState.depth ?? 90}
                      onChange={(e) =>
                        setCalcState((prev) => ({ ...prev, depth: Number(e.target.value) }))
                      }
                      className="w-full accent-[#252725] dark:accent-[#B2E4DD] cursor-pointer h-2 bg-[#E8E5DD] dark:bg-[#34434E] rounded"
                    />
                    <div className="flex justify-between text-[11px] text-[#777A74] dark:text-[#B7C3CA] font-mono tabular-nums">
                      <span>от {cabinMeta.minDimensions.depth ?? 70} см</span>
                      <span>до {cabinMeta.maxDimensions.depth ?? 150} см</span>
                    </div>
                  </div>
                )}

                {/* Area preview banner */}
                <div className="p-4 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#252725] dark:text-[#F1F2EF]">
                    <Ruler className="size-4 text-[#788173] dark:text-[#B2E4DD]" />
                    <span className="font-medium">Расчетная площадь стеклянного полотна:</span>
                  </div>
                  <span className="font-mono font-bold text-[#252725] dark:text-[#B2E4DD] text-base tabular-nums">
                    ~{pricing.areaSqm} м²
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: GLASS TYPE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1 font-sans">
                    Шаг 3. Тип и оттенок закаленного стекла
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA]">
                    Все виды стекла термически закалены по ГОСТ 30698-2014 и безопасны для дома.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(GLASS_METADATA) as CalculatorGlassType[]).map((glassKey) => {
                    const item = GLASS_METADATA[glassKey];
                    const isSelected = calcState.glassType === glassKey;
                    return (
                      <button
                        key={glassKey}
                        type="button"
                        onClick={() => setCalcState((prev) => ({ ...prev, glassType: glassKey }))}
                        className={`text-left p-5 rounded border transition-colors duration-150 flex flex-col justify-between active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#F4F2EC] dark:bg-[#1B2C36] border-[#252725] dark:border-[#B2E4DD] ring-1 ring-[#252725] dark:ring-[#B2E4DD]'
                            : 'bg-[#FBFAF7] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD]'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between w-full mb-1">
                            <span className="font-semibold text-sm sm:text-base text-[#252725] dark:text-[#F1F2EF]">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                isSelected
                                  ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] border-[#252725] dark:border-[#B2E4DD]'
                                  : 'bg-[#F4F2EC] dark:bg-[#14212C] text-[#777A74] dark:text-[#B7C3CA] border-[#DFDDD6] dark:border-[#34434E]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#777A74] dark:text-[#B2E4DD] block mb-2 tabular-nums">
                            Толщина: {item.thickness}
                          </span>
                          <p className="text-xs text-[#777A74] dark:text-[#B7C3CA] leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#DFDDD6] dark:border-[#34434E] flex items-center justify-between text-xs">
                          <span className="text-[#777A74] dark:text-[#B7C3CA]">
                            {isSelected ? 'Выбрано' : 'Нажмите для выбора'}
                          </span>
                          <div
                            className={`size-5 rounded border flex items-center justify-center ${
                              isSelected
                                ? 'border-[#252725] dark:border-[#B2E4DD] bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126]'
                                : 'border-[#DFDDD6] dark:border-[#435461] bg-[#FBFAF7] dark:bg-[#101923]'
                            }`}
                          >
                            {isSelected && <Check className="size-3.5" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: HARDWARE FINISH & ADD-ONS */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1 font-sans">
                    Шаг 4. Цвет фурнитуры и доп. опции
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA]">
                    Итальянская фурнитура BOHÉME Milano из нержавеющей стали AISI 304 и латуни с PVD-покрытием.
                  </p>
                </div>

                {/* Hardware Color Swatches Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.keys(HARDWARE_METADATA) as CalculatorHardwareFinish[]).map((finishKey) => {
                    const item = HARDWARE_METADATA[finishKey];
                    const isSelected = calcState.hardwareFinish === finishKey;
                    return (
                      <button
                        key={finishKey}
                        type="button"
                        onClick={() =>
                          setCalcState((prev) => ({ ...prev, hardwareFinish: finishKey }))
                        }
                        className={`text-left p-4 rounded border transition-colors duration-150 flex flex-col justify-between active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#F4F2EC] dark:bg-[#1B2C36] border-[#252725] dark:border-[#B2E4DD] ring-1 ring-[#252725] dark:ring-[#B2E4DD]'
                            : 'bg-[#FBFAF7] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <span
                            className="size-4 rounded-full border border-black/20 dark:border-white/25 shrink-0 shadow-sm"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span className="font-semibold text-xs sm:text-sm text-[#252725] dark:text-[#F1F2EF]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#788173] dark:text-[#B2E4DD] font-medium">
                          {item.priceBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Add-ons Checkboxes */}
                <div className="pt-4 border-t border-[#DFDDD6] dark:border-[#34434E] space-y-3">
                  <h4 className="text-sm font-semibold text-[#252725] dark:text-[#F1F2EF]">
                    Дополнительные услуги и покрытия:
                  </h4>

                  {/* Installation Option */}
                  <label className="flex items-start gap-3 p-4 rounded bg-[#FBFAF7] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={calcState.hasInstallation}
                      onChange={(e) =>
                        setCalcState((prev) => ({ ...prev, hasInstallation: e.target.checked }))
                      }
                      className="mt-1 size-4 rounded text-[#252725] dark:text-[#B2E4DD] focus:ring-[#252725] dark:focus:ring-[#B2E4DD] border-[#DFDDD6] dark:border-[#435461] accent-[#252725] dark:accent-[#B2E4DD]"
                    />
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#252725] dark:text-[#F1F2EF] flex items-center gap-1.5">
                          <Wrench className="size-4 text-[#788173] dark:text-[#B2E4DD]" />
                          Чистовой монтаж под ключ инженерной бригадой VETRO
                        </span>
                        <span className="font-mono text-[#788173] dark:text-[#B2E4DD] font-semibold tabular-nums">
                          +{formatPrice(OPTION_PRICES.installation)}
                        </span>
                      </div>
                      <p className="text-xs text-[#777A74] dark:text-[#B7C3CA] mt-1">
                        Установка с лазерным нивелиром, проклейка магнитных уплотнителей, гидротест и гарантия 3 года.
                      </p>
                    </div>
                  </label>

                  {/* Hydrophobic Coating Option */}
                  <label className="flex items-start gap-3 p-4 rounded bg-[#FBFAF7] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] hover:border-[#252725] dark:hover:border-[#B2E4DD] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={calcState.hasHydrophobicCoating}
                      onChange={(e) =>
                        setCalcState((prev) => ({
                          ...prev,
                          hasHydrophobicCoating: e.target.checked,
                        }))
                      }
                      className="mt-1 size-4 rounded text-[#252725] dark:text-[#B2E4DD] focus:ring-[#252725] dark:focus:ring-[#B2E4DD] border-[#DFDDD6] dark:border-[#435461] accent-[#252725] dark:accent-[#B2E4DD]"
                    />
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#252725] dark:text-[#F1F2EF] flex items-center gap-1.5">
                          <Droplets className="size-4 text-[#788173] dark:text-[#B2E4DD]" />
                          Нанопокрытие «Антикапля» (Easy Clean)
                        </span>
                        <span className="font-mono text-[#788173] dark:text-[#B2E4DD] font-semibold tabular-nums">
                          +{formatPrice(OPTION_PRICES.hydrophobicCoating)}
                        </span>
                      </div>
                      <p className="text-xs text-[#777A74] dark:text-[#B7C3CA] mt-1">
                        Вода скатывается каплями, не оставляя известкового налета и мыльных разводов на стекле.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 5: SUMMARY & LEAD CAPTURE */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF] mb-1 font-sans">
                    Шаг 5. Итоговая смета и фиксация скидки 5%
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#B7C3CA]">
                    Детальная спецификация вашего проекта. Оставьте контакт, чтобы зафиксировать цену при замере.
                  </p>
                </div>

                {/* Itemized Specification Table */}
                <div className="bg-[#FBFAF7] dark:bg-[#0F1B25] rounded p-5 border border-[#DFDDD6] dark:border-[#34434E] space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[#DFDDD6] dark:border-[#34434E]">
                    <span className="text-[#777A74] dark:text-[#B7C3CA]">Конструкция:</span>
                    <strong className="text-[#252725] dark:text-[#F1F2EF] text-right font-medium">
                      {cabinMeta.title} ({calcState.width}×{calcState.height}{calcState.depth && cabinMeta.requiresDepth ? `×${calcState.depth}` : ''} см)
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[#DFDDD6] dark:border-[#34434E]">
                    <span className="text-[#777A74] dark:text-[#B7C3CA]">Стекло:</span>
                    <strong className="text-[#252725] dark:text-[#F1F2EF] text-right font-medium">
                      {GLASS_METADATA[calcState.glassType].name} (8–10 мм закаленное)
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[#DFDDD6] dark:border-[#34434E]">
                    <span className="text-[#777A74] dark:text-[#B7C3CA]">Фурнитура:</span>
                    <strong className="text-[#252725] dark:text-[#F1F2EF] text-right font-medium">
                      BOHÉME ({HARDWARE_METADATA[calcState.hardwareFinish].name})
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[#DFDDD6] dark:border-[#34434E]">
                    <span className="text-[#777A74] dark:text-[#B7C3CA]">Монтаж инженерами VETRO:</span>
                    <span className="font-mono text-[#252725] dark:text-[#F1F2EF] tabular-nums">
                      {calcState.hasInstallation ? formatPrice(OPTION_PRICES.installation) : 'Без монтажа'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[#DFDDD6] dark:border-[#34434E]">
                    <span className="text-[#777A74] dark:text-[#B7C3CA]">Покрытие «Антикапля»:</span>
                    <span className="font-mono text-[#252725] dark:text-[#F1F2EF] tabular-nums">
                      {calcState.hasHydrophobicCoating ? formatPrice(OPTION_PRICES.hydrophobicCoating) : 'Не выбрано'}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-[#777A74] dark:text-[#B7C3CA] block">Расчетная стоимость проекта:</span>
                      <span className="text-xs text-[#788173] dark:text-[#B2E4DD] font-semibold">Без скрытых доплат</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-bold text-[#252725] dark:text-[#B2E4DD] font-mono tabular-nums">
                      {pricing.formattedTotal}
                    </span>
                  </div>
                </div>

                {/* Lead Form or Submitted State */}
                {formSubmitted ? (
                  <div className="p-6 rounded bg-[#F4F2EC] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] text-center space-y-3">
                    <div className="size-10 rounded bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="size-5 text-[#A68C70] dark:text-[#102126]" />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#252725] dark:text-[#F1F2EF]">
                      Расчет зафиксирован! Скидка 5% закреплена за вами.
                    </h4>
                    <p className="text-xs sm:text-sm text-[#777A74] dark:text-[#D1DCE1] max-w-md mx-auto">
                      Инженер VETRO свяжется с вами по номеру <strong className="text-[#252725] dark:text-[#B2E4DD] tabular-nums">{clientPhone}</strong> в течение 15 минут.
                    </p>
                    <div className="pt-2">
                      <a
                        href={whatsappQuoteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] font-medium dark:font-semibold text-xs sm:text-sm hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] active:scale-[0.98] transition-colors"
                      >
                        <MessageCircle className="size-4" />
                        <span>Открыть расчет прямо в WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                    <div className="bg-[#F4F2EC] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#34434E] rounded p-4 flex items-center gap-2 text-xs text-[#252725] dark:text-[#D1DCE1]">
                      <span className="font-medium">При отправке расчета через сайт — скидка 5% на фурнитуру при заказе!</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="calc-name" className="text-xs font-semibold text-[#252725] dark:text-[#DDE7E9] block mb-1">
                          Ваше имя:
                        </label>
                        <input
                          type="text"
                          id="calc-name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Александр"
                          className="w-full rounded bg-[#FBFAF7] dark:bg-[#0F1B25] border border-[#DFDDD6] dark:border-[#435461] focus:border-[#252725] dark:focus:border-[#B2E4DD] px-4 py-3 text-sm text-[#252725] dark:text-[#F1F2EF] placeholder-[#777A74] dark:placeholder-[#B7C3CA]/40 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <PhoneInputMask
                          id="calc-phone"
                          value={clientPhone}
                          onChange={(val, valid) => {
                            setClientPhone(val);
                            setIsPhoneValid(valid);
                            if (phoneError && valid) setPhoneError(undefined);
                          }}
                          error={phoneError}
                          required
                          label="Номер телефона:"
                          className="py-3"
                        />
                      </div>
                    </div>

                    {/* Preferred messenger selector */}
                    <div>
                      <span className="text-xs font-semibold text-[#252725] dark:text-[#DDE7E9] block mb-2">
                        Куда прислать расчет и проект:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreferredMessenger('whatsapp')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded border text-xs font-semibold transition-colors duration-150 active:scale-[0.98] ${
                            preferredMessenger === 'whatsapp'
                              ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] border-[#252725] dark:border-[#B2E4DD]'
                              : 'bg-[#FBFAF7] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF]'
                          }`}
                        >
                          <MessageCircle className={`size-3.5 ${preferredMessenger === 'whatsapp' ? 'text-[#25D366] dark:text-[#102126]' : 'text-[#25D366]'}`} />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreferredMessenger('telegram')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded border text-xs font-semibold transition-colors duration-150 active:scale-[0.98] ${
                            preferredMessenger === 'telegram'
                              ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] border-[#252725] dark:border-[#B2E4DD]'
                              : 'bg-[#FBFAF7] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF]'
                          }`}
                        >
                          <Send className={`size-3.5 ${preferredMessenger === 'telegram' ? 'text-[#0088cc] dark:text-[#102126]' : 'text-[#0088cc]'}`} />
                          <span>Telegram</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreferredMessenger('phone')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded border text-xs font-semibold transition-colors duration-150 active:scale-[0.98] ${
                            preferredMessenger === 'phone'
                              ? 'bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] border-[#252725] dark:border-[#B2E4DD]'
                              : 'bg-[#FBFAF7] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] text-[#777A74] dark:text-[#B7C3CA] hover:text-[#252725] dark:hover:text-[#F1F2EF]'
                          }`}
                        >
                          <Phone className="size-3.5" />
                          <span>Звонок</span>
                        </button>
                      </div>
                    </div>

                    {/* Dual Action: Submit Form or Instant WhatsApp */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-5 rounded font-medium dark:font-semibold text-[#FBFAF7] dark:text-[#102126] bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] text-xs transition-colors duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <ShieldCheck className="size-4 text-[#A68C70] dark:text-[#102126]" />
                        <span>Зафиксировать расчет и скидку</span>
                      </button>

                      <a
                        href={whatsappQuoteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-5 rounded font-medium text-[#252725] dark:text-[#F1F2EF] bg-[#FBFAF7] dark:bg-transparent hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] border border-[#DFDDD6] dark:border-[#657881] dark:hover:border-[#B2E4DD] text-xs transition-colors duration-150 flex items-center justify-center gap-2 shrink-0 active:scale-[0.98]"
                      >
                        <MessageCircle className="size-4 text-[#788173] dark:text-[#B2E4DD]" />
                        <span>В WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Stepper Navigation Buttons (Back & Next) */}
            <div className="flex items-center justify-between pt-6 border-t border-[#DFDDD6] dark:border-[#34434E] mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-mono transition-colors duration-150 active:scale-[0.98] border ${
                  currentStep === 1
                    ? 'opacity-30 cursor-not-allowed text-[#777A74] dark:text-[#B7C3CA] border-transparent'
                    : 'text-[#252725] dark:text-[#F1F2EF] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] bg-[#F4F2EC] dark:bg-[#0F1B25] border-[#DFDDD6] dark:border-[#34434E] dark:hover:border-[#B2E4DD]'
                }`}
              >
                <ChevronLeft className="size-4" />
                <span>Назад</span>
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded text-xs font-medium dark:font-semibold text-[#FBFAF7] dark:text-[#102126] bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] transition-colors duration-150 active:scale-[0.98]"
                >
                  <span>Далее к шагу {currentStep + 1}</span>
                  <ChevronRight className="size-4 text-[#A68C70] dark:text-[#102126]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenMeasurementModal}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded text-xs font-medium dark:font-semibold text-[#FBFAF7] dark:text-[#102126] bg-[#252725] dark:bg-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] transition-colors duration-150 active:scale-[0.98]"
                >
                  <Ruler className="size-4 text-[#A68C70] dark:text-[#102126]" />
                  <span>Вызвать инженера на замер</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Live Price Breakdown Ticket (4 cols) */}
          <div className="lg:col-span-4 bg-[#FBFAF7] dark:bg-[#14212B] dark-preview-glow border border-[#DFDDD6] dark:border-[#34434E] rounded p-6 shadow-none sticky top-24">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-[#DFDDD6] dark:border-[#34434E] mb-4">
              <span className="text-[11px] font-mono font-medium text-[#788173] dark:text-[#B2E4DD]">
                Смета в реальном времени
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] text-[10px] font-mono dark:font-semibold">
                <span className="size-1.5 rounded-none rotate-45 bg-[#A68C70] dark:bg-[#102126]" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Total Price Callout */}
            <div className="mb-5">
              <span className="text-xs text-[#777A74] dark:text-[#D7E5E7] block mb-1">Ориентировочная стоимость:</span>
              <div className="text-3xl sm:text-4xl font-bold text-[#252725] dark:text-[#F1F2EF] font-mono tracking-tight tabular-nums">
                {pricing.formattedTotal}
              </div>
              <span className="text-[11px] text-[#777A74] dark:text-[#B7C3CA] mt-1 block">
                Точная стоимость фиксируется после лазерного 3D-замера
              </span>
            </div>

            {/* Micro Breakdown Items */}
            <div className="space-y-2 text-xs text-[#252725] dark:text-[#F1F2EF] mb-5 pb-5 border-b border-[#DFDDD6] dark:border-[#34434E]">
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Конструкция:</span>
                <span className="font-medium text-[#252725] dark:text-[#F1F2EF] truncate max-w-[170px]">
                  {cabinMeta.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Габариты:</span>
                <span className="font-mono text-[#252725] dark:text-[#F1F2EF] tabular-nums">
                  {calcState.width}×{calcState.height}{calcState.depth && cabinMeta.requiresDepth ? `×${calcState.depth}` : ''} см
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Площадь полотна:</span>
                <span className="font-mono text-[#252725] dark:text-[#B2E4DD] font-semibold tabular-nums">
                  ~{pricing.areaSqm} м²
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Стекло:</span>
                <span className="font-medium text-[#252725] dark:text-[#F1F2EF] truncate max-w-[170px]">
                  {GLASS_METADATA[calcState.glassType].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Фурнитура:</span>
                <span className="font-medium text-[#252725] dark:text-[#F1F2EF] truncate max-w-[170px]">
                  {HARDWARE_METADATA[calcState.hardwareFinish].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Монтаж:</span>
                <span className="font-medium text-[#252725] dark:text-[#F1F2EF]">
                  {calcState.hasInstallation ? 'Включен' : 'Без монтажа'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777A74] dark:text-[#B7C3CA]">Антикапля:</span>
                <span className="font-medium text-[#252725] dark:text-[#F1F2EF]">
                  {calcState.hasHydrophobicCoating ? 'Включено' : 'Нет'}
                </span>
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="space-y-2">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#252725] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB] font-medium dark:font-semibold text-xs transition-colors duration-150 active:scale-[0.98]"
              >
                <MessageCircle className="size-4 text-[#788173] dark:text-[#102126]" />
                <span>Отправить расчет в WhatsApp</span>
              </a>
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#FBFAF7] dark:bg-[#0F1B25] hover:bg-[#E8E5DD] dark:hover:bg-[#1B2C36] border border-[#DFDDD6] dark:border-[#34434E] dark:hover:border-[#B2E4DD] text-[#252725] dark:text-[#F1F2EF] font-medium text-xs transition-colors duration-150 active:scale-[0.98]"
              >
                <Send className="size-3.5 text-[#0088cc] dark:text-[#B2E4DD]" />
                <span>Написать в Telegram (@{businessConfig.telegramUsername})</span>
              </a>
            </div>

            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono text-[#777A74] dark:text-[#B7C3CA]">
                Ответ инженера студии VETRO в течение 15 минут
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
