import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  ShieldCheck, 
  Ruler, 
  MessageCircle, 
  Send, 
  Phone, 
  CheckCircle2, 
  Wrench, 
  Droplets
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
      `Здравствуйте, Владислав! Рассчитал душевую кабину на сайте VETRO:`,
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
    { number: 1, label: 'Тип кабины' },
    { number: 2, label: 'Размеры' },
    { number: 3, label: 'Стекло' },
    { number: 4, label: 'Фурнитура' },
    { number: 5, label: 'Смета' },
  ];

  return (
    <section id="calculator" data-testid="calculator" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] border-t border-[rgba(26,23,18,0.06)] text-[#1a1712] relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae6dc] text-[#1a1712] text-xs font-semibold uppercase tracking-wider mb-3 border border-[rgba(26,23,18,0.08)]">
            <Calculator className="w-3.5 h-3.5 text-[#1a1712]" />
            <span>Интерактивный конфигуратор</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a1712] tracking-tight mb-2 font-display">
            Калькулятор стоимости душевой кабины
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] leading-relaxed">
            Настройте конструкцию под ваш санузел за 5 шагов. Получите прозрачный расчет без скрытых наценок.
          </p>
        </div>

        {/* Stepper Navigation Bar */}
        <div className="mb-6 sm:mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#eae6dc] -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#1a1712] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
            />

            {stepsList.map((step) => {
              const isPassed = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none"
                  aria-label={`Шаг ${step.number}: ${step.label}`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#1a1712] text-white ring-4 ring-[#1a1712]/15 shadow-sm'
                        : isPassed
                        ? 'bg-[#FF2500] text-white'
                        : 'bg-white border border-[rgba(26,23,18,0.12)] text-[#7c766c] group-hover:border-[#1a1712]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4 text-white" /> : step.number}
                  </div>
                  <span
                    className={`mt-2 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors hidden sm:block ${
                      isCurrent ? 'text-[#1a1712]' : isPassed ? 'text-[#7c766c]' : 'text-[#7c766c]/60'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Controls (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[rgba(26,23,18,0.08)] rounded-[32px] p-6 sm:p-8 shadow-card">
            
            {/* STEP 1: CABIN TYPE */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                    Шаг 1. Выберите тип конструкции
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7c766c]">
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
                        className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#f4f2ec] border-[#1a1712] ring-1 ring-[#1a1712] shadow-sm'
                            : 'bg-white border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)] hover:bg-[#f4f2ec]/30'
                        }`}
                      >
                        <div className="flex items-start justify-between w-full mb-2">
                          <span className="font-bold text-sm sm:text-base text-[#1a1712]">
                            {item.title}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#1a1712] bg-[#1a1712] text-white'
                                : 'border-[#d8d4c8] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#FF2500] mb-1">
                          {item.subtitle}
                        </span>
                        <p className="text-xs text-[#7c766c] leading-relaxed">
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
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                    Шаг 2. Размеры конструкции (см)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7c766c]">
                    Укажите ориентировочные габариты для расчета. Точный замер лазером мастер проведет на объекте бесплатно.
                  </p>
                </div>

                {/* Width Slider */}
                <div className="bg-[#f4f2ec] rounded-2xl p-5 border border-[rgba(26,23,18,0.06)] space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="range-width" className="text-sm font-semibold text-[#1a1712]">
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
                        className="w-20 px-2.5 py-1 text-center bg-white border border-[rgba(26,23,18,0.12)] rounded-lg text-[#1a1712] font-mono font-bold text-sm focus:border-[#1a1712] outline-none"
                      />
                      <span className="text-xs text-[#7c766c] font-mono">см</span>
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
                    className="w-full accent-[#FF2500] cursor-pointer h-2 bg-[#eae6dc] rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-[#7c766c] font-mono">
                    <span>от {cabinMeta.minDimensions.width} см</span>
                    <span>до {cabinMeta.maxDimensions.width} см</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="bg-[#f4f2ec] rounded-2xl p-5 border border-[rgba(26,23,18,0.06)] space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="range-height" className="text-sm font-semibold text-[#1a1712]">
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
                        className="w-20 px-2.5 py-1 text-center bg-white border border-[rgba(26,23,18,0.12)] rounded-lg text-[#1a1712] font-mono font-bold text-sm focus:border-[#1a1712] outline-none"
                      />
                      <span className="text-xs text-[#7c766c] font-mono">см</span>
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
                    className="w-full accent-[#FF2500] cursor-pointer h-2 bg-[#eae6dc] rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-[#7c766c] font-mono">
                    <span>от {cabinMeta.minDimensions.height} см</span>
                    <span>стандарт: 200 см</span>
                    <span>до {cabinMeta.maxDimensions.height} см</span>
                  </div>
                </div>

                {/* Depth Slider (only if cabin requires depth) */}
                {cabinMeta.requiresDepth && (
                  <div className="bg-[#f4f2ec] rounded-2xl p-5 border border-[rgba(26,23,18,0.06)] space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="range-depth" className="text-sm font-semibold text-[#1a1712]">
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
                          className="w-20 px-2.5 py-1 text-center bg-white border border-[rgba(26,23,18,0.12)] rounded-lg text-[#1a1712] font-mono font-bold text-sm focus:border-[#1a1712] outline-none"
                        />
                        <span className="text-xs text-[#7c766c] font-mono">см</span>
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
                      className="w-full accent-[#FF2500] cursor-pointer h-2 bg-[#eae6dc] rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-[#7c766c] font-mono">
                      <span>от {cabinMeta.minDimensions.depth ?? 70} см</span>
                      <span>до {cabinMeta.maxDimensions.depth ?? 150} см</span>
                    </div>
                  </div>
                )}

                {/* Area preview banner */}
                <div className="p-4 rounded-2xl bg-[#eae6dc] flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#1a1712]">
                    <Ruler className="w-4 h-4 text-[#FF2500]" />
                    <span className="font-medium">Расчетная площадь стеклянного полотна:</span>
                  </div>
                  <span className="font-mono font-bold text-[#1a1712] text-base">
                    ~{pricing.areaSqm} м²
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: GLASS TYPE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                    Шаг 3. Тип и оттенок закаленного стекла
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7c766c]">
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
                        className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#f4f2ec] border-[#1a1712] ring-1 ring-[#1a1712] shadow-sm'
                            : 'bg-white border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)] hover:bg-[#f4f2ec]/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between w-full mb-1">
                            <span className="font-bold text-sm sm:text-base text-[#1a1712]">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-[#1a1712] text-white'
                                  : 'bg-[#eae6dc] text-[#7c766c]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#7c766c] block mb-2">
                            Толщина: {item.thickness}
                          </span>
                          <p className="text-xs text-[#7c766c] leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[rgba(26,23,18,0.06)] flex items-center justify-between text-xs">
                          <span className="text-[#7c766c]">
                            {isSelected ? 'Выбрано' : 'Нажмите для выбора'}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-[#1a1712] bg-[#1a1712] text-white'
                                : 'border-[#d8d4c8] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
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
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                    Шаг 4. Цвет фурнитуры и доп. опции
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7c766c]">
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
                        className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#f4f2ec] border-[#1a1712] ring-1 ring-[#1a1712] shadow-sm'
                            : 'bg-white border-[rgba(26,23,18,0.08)] hover:border-[rgba(26,23,18,0.2)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <span
                            className="w-5 h-5 rounded-full border border-black/20 shrink-0 shadow-sm"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span className="font-semibold text-xs sm:text-sm text-[#1a1712]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#7c766c] font-medium">
                          {item.priceBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Add-ons Checkboxes */}
                <div className="pt-4 border-t border-[rgba(26,23,18,0.06)] space-y-3">
                  <h4 className="text-sm font-bold text-[#1a1712]">
                    Дополнительные услуги и покрытия:
                  </h4>

                  {/* Installation Option */}
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] hover:border-[rgba(26,23,18,0.15)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcState.hasInstallation}
                      onChange={(e) =>
                        setCalcState((prev) => ({ ...prev, hasInstallation: e.target.checked }))
                      }
                      className="mt-1 w-4 h-4 rounded text-[#FF2500] focus:ring-[#FF2500] border-gray-300 accent-[#FF2500]"
                    />
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1a1712] flex items-center gap-1.5">
                          <Wrench className="w-4 h-4 text-[#1a1712]" />
                          Чистовой монтаж под ключ мастером
                        </span>
                        <span className="font-mono text-[#FF2500] font-bold">
                          +{formatPrice(OPTION_PRICES.installation)}
                        </span>
                      </div>
                      <p className="text-xs text-[#7c766c] mt-1">
                        Установка с лазерным нивелиром, проклейка магнитных уплотнителей, гидротест и гарантия 3 года.
                      </p>
                    </div>
                  </label>

                  {/* Hydrophobic Coating Option */}
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] hover:border-[rgba(26,23,18,0.15)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcState.hasHydrophobicCoating}
                      onChange={(e) =>
                        setCalcState((prev) => ({
                          ...prev,
                          hasHydrophobicCoating: e.target.checked,
                        }))
                      }
                      className="mt-1 w-4 h-4 rounded text-[#FF2500] focus:ring-[#FF2500] border-gray-300 accent-[#FF2500]"
                    />
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1a1712] flex items-center gap-1.5">
                          <Droplets className="w-4 h-4 text-[#1a1712]" />
                          Нанопокрытие «Антикапля» (Easy Clean)
                        </span>
                        <span className="font-mono text-[#FF2500] font-bold">
                          +{formatPrice(OPTION_PRICES.hydrophobicCoating)}
                        </span>
                      </div>
                      <p className="text-xs text-[#7c766c] mt-1">
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
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                    Шаг 5. Итоговая смета и фиксация скидки 5%
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7c766c]">
                    Детальная спецификация вашего проекта. Оставьте контакт, чтобы зафиксировать цену при замере.
                  </p>
                </div>

                {/* Itemized Specification Table */}
                <div className="bg-[#f4f2ec] rounded-2xl p-5 border border-[rgba(26,23,18,0.06)] space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[rgba(26,23,18,0.08)]">
                    <span className="text-[#7c766c]">Конструкция:</span>
                    <strong className="text-[#1a1712] text-right font-medium">
                      {cabinMeta.title} ({calcState.width}×{calcState.height}{calcState.depth && cabinMeta.requiresDepth ? `×${calcState.depth}` : ''} см)
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[rgba(26,23,18,0.08)]">
                    <span className="text-[#7c766c]">Стекло:</span>
                    <strong className="text-[#1a1712] text-right font-medium">
                      {GLASS_METADATA[calcState.glassType].name} (8–10 мм закаленное)
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[rgba(26,23,18,0.08)]">
                    <span className="text-[#7c766c]">Фурнитура:</span>
                    <strong className="text-[#1a1712] text-right font-medium">
                      BOHÉME ({HARDWARE_METADATA[calcState.hardwareFinish].name})
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[rgba(26,23,18,0.08)]">
                    <span className="text-[#7c766c]">Монтаж мастером:</span>
                    <span className="font-mono text-[#1a1712]">
                      {calcState.hasInstallation ? formatPrice(OPTION_PRICES.installation) : 'Без монтажа'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pb-2 border-b border-[rgba(26,23,18,0.08)]">
                    <span className="text-[#7c766c]">Покрытие «Антикапля»:</span>
                    <span className="font-mono text-[#1a1712]">
                      {calcState.hasHydrophobicCoating ? formatPrice(OPTION_PRICES.hydrophobicCoating) : 'Не выбрано'}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-[#7c766c] block">Расчетная стоимость проекта:</span>
                      <span className="text-xs text-[#FF2500] font-semibold">Без скрытых доплат</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1a1712] font-mono">
                      {pricing.formattedTotal}
                    </span>
                  </div>
                </div>

                {/* Lead Form or Submitted State */}
                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#eae6dc] border border-[rgba(26,23,18,0.08)] text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#1a1712] text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 text-[#FF2500]" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#1a1712]">
                      Расчет зафиксирован! Скидка 5% закреплена за вами.
                    </h4>
                    <p className="text-xs sm:text-sm text-[#7c766c] max-w-md mx-auto">
                      Владислав свяжется с вами по номеру <strong className="text-[#1a1712]">{clientPhone}</strong> в течение 15 минут.
                    </p>
                    <div className="pt-2">
                      <a
                        href={whatsappQuoteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2500] text-white font-semibold text-xs sm:text-sm shadow-sm hover:opacity-90"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Открыть расчет прямо в WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                    <div className="bg-[#eae6dc] border border-[rgba(26,23,18,0.08)] rounded-2xl p-4 flex items-center gap-2 text-xs text-[#1a1712]">
                      <span className="font-semibold">При отправке расчета через сайт — скидка 5% на фурнитуру при заказе!</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="calc-name" className="text-xs font-semibold text-[#1a1712] block mb-1">
                          Ваше имя:
                        </label>
                        <input
                          type="text"
                          id="calc-name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Александр"
                          className="w-full rounded-full bg-[#f4f2ec] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] px-4 py-3 text-sm text-[#1a1712] placeholder-[#7c766c] outline-none"
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
                      <span className="text-xs font-semibold text-[#1a1712] block mb-2">
                        Куда прислать расчет и проект:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreferredMessenger('whatsapp')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full border text-xs font-semibold transition-colors ${
                            preferredMessenger === 'whatsapp'
                              ? 'bg-[#1a1712] text-white border-[#1a1712]'
                              : 'bg-white border-[rgba(26,23,18,0.1)] text-[#7c766c] hover:text-[#1a1712]'
                          }`}
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreferredMessenger('telegram')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full border text-xs font-semibold transition-colors ${
                            preferredMessenger === 'telegram'
                              ? 'bg-[#1a1712] text-white border-[#1a1712]'
                              : 'bg-white border-[rgba(26,23,18,0.1)] text-[#7c766c] hover:text-[#1a1712]'
                          }`}
                        >
                          <Send className="w-3.5 h-3.5 text-[#0088cc]" />
                          <span>Telegram</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreferredMessenger('phone')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full border text-xs font-semibold transition-colors ${
                            preferredMessenger === 'phone'
                              ? 'bg-[#1a1712] text-white border-[#1a1712]'
                              : 'bg-white border-[rgba(26,23,18,0.1)] text-[#7c766c] hover:text-[#1a1712]'
                          }`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Звонок</span>
                        </button>
                      </div>
                    </div>

                    {/* Dual Action: Submit Form or Instant WhatsApp */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-3.5 px-6 rounded-full font-semibold text-white bg-[#1a1712] hover:opacity-90 shadow-sm transition-all text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#FF2500]" />
                        <span>Зафиксировать расчет и скидку</span>
                      </button>

                      <a
                        href={whatsappQuoteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-6 rounded-full font-semibold text-white bg-[#FF2500] hover:opacity-90 shadow-sm transition-all text-sm flex items-center justify-center gap-2 shrink-0 active:scale-[0.98]"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>В WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Stepper Navigation Buttons (Back & Next) */}
            <div className="flex items-center justify-between pt-8 border-t border-[rgba(26,23,18,0.06)] mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  currentStep === 1
                    ? 'opacity-30 cursor-not-allowed text-[#7c766c]'
                    : 'text-[#1a1712] hover:bg-[#eae6dc] bg-[#f4f2ec] border border-[rgba(26,23,18,0.08)]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1a1712] hover:opacity-90 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Далее к шагу {currentStep + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenMeasurementModal}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#FF2500] hover:opacity-90 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Ruler className="w-4 h-4 text-white" />
                  <span>Вызвать мастера на замер</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Live Price Breakdown Ticket (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[rgba(26,23,18,0.08)] rounded-[32px] p-6 sm:p-7 shadow-card sticky top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(26,23,18,0.06)] mb-5">
              <span className="text-xs font-semibold text-[#7c766c] uppercase tracking-wider">
                Смета в реальном времени
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eae6dc] text-[#1a1712] text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2500] animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Total Price Callout */}
            <div className="mb-6">
              <span className="text-xs text-[#7c766c] block mb-1">Ориентировочная стоимость:</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1a1712] font-mono tracking-tight">
                {pricing.formattedTotal}
              </div>
              <span className="text-[11px] text-[#7c766c] mt-1 block">
                Точная стоимость фиксируется после лазерного замера
              </span>
            </div>

            {/* Micro Breakdown Items */}
            <div className="space-y-2.5 text-xs text-[#1a1712] mb-6 pb-6 border-b border-[rgba(26,23,18,0.06)]">
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Конструкция:</span>
                <span className="font-medium text-[#1a1712] truncate max-w-[170px]">
                  {cabinMeta.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Габариты:</span>
                <span className="font-mono text-[#1a1712]">
                  {calcState.width}×{calcState.height}{calcState.depth && cabinMeta.requiresDepth ? `×${calcState.depth}` : ''} см
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Площадь полотна:</span>
                <span className="font-mono text-[#1a1712] font-semibold">
                  ~{pricing.areaSqm} м²
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Стекло:</span>
                <span className="font-medium text-[#1a1712] truncate max-w-[170px]">
                  {GLASS_METADATA[calcState.glassType].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Фурнитура:</span>
                <span className="font-medium text-[#1a1712] truncate max-w-[170px]">
                  {HARDWARE_METADATA[calcState.hardwareFinish].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Монтаж:</span>
                <span className="font-medium text-[#1a1712]">
                  {calcState.hasInstallation ? 'Включен' : 'Без монтажа'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c766c]">Антикапля:</span>
                <span className="font-medium text-[#1a1712]">
                  {calcState.hasHydrophobicCoating ? 'Включено' : 'Нет'}
                </span>
              </div>
            </div>

            {/* Direct Action Link */}
            <a
              href={whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#1a1712] text-white hover:opacity-90 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Отправить расчет мастеру</span>
            </a>

            <div className="mt-4 pt-3 text-center">
              <span className="text-[11px] text-[#7c766c]">
                Ответ мастера Владислава в течение 15 минут
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
