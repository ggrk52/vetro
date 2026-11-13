import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Ruler, 
  Check, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  User, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { PhoneInputMask, isPhoneComplete } from '../common/PhoneInputMask';

export interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCabinType?: string;
}

export const MeasurementModal: React.FC<MeasurementModalProps> = ({
  isOpen,
  onClose,
  initialCabinType = 'Перегородка Walk-In',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('Как можно скорее (в течение 24 часов)');
  const [cabinType, setCabinType] = useState(initialCabinType);
  const [comment, setComment] = useState('');
  
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Sync initialCabinType if changed
  useEffect(() => {
    if (initialCabinType) {
      setCabinType(initialCabinType);
    }
  }, [initialCabinType]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  const handlePhoneChange = (newVal: string, valid: boolean) => {
    setPhone(newVal);
    setIsPhoneValid(valid);
    if (errors.phone && valid) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string; address?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Укажите номер телефона для связи';
    } else if (!isPhoneComplete(phone) && !isPhoneValid) {
      newErrors.phone = 'Введите полный номер телефона (+7 (XXX) XXX-XX-XX)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252725]/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[#FBFAF7] border border-[#DFDDD6] rounded shadow-2xl overflow-hidden z-10 transition-transform duration-200 text-[#252725] my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFDDD6] bg-[#F4F2EC]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded bg-[#FBFAF7] border border-[#DFDDD6] text-[#252725] flex items-center justify-center">
              <Ruler className="size-4 text-[#788173]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#788173] block">
                Бесплатный выезд 24ч
              </span>
              <h2 id="modal-title" className="text-base font-semibold text-[#252725]">
                Заказать лазерный 3D-замер
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="size-8 rounded flex items-center justify-center text-[#777A74] hover:text-[#252725] hover:bg-[#FBFAF7] border border-transparent hover:border-[#DFDDD6] transition-transform active:scale-95"
            aria-label="Закрыть окно"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            /* Success Feedback View */
            <div className="py-6 text-center flex flex-col items-center">
              <div className="size-14 rounded bg-[#252725] text-[#FBFAF7] flex items-center justify-center mb-4">
                <Check className="size-7 text-[#A68C70]" />
              </div>
              <h3 className="text-xl font-serif font-normal text-[#252725] mb-2 text-balance">
                Заявка на 3D-замер принята
              </h3>
              <p className="text-xs sm:text-sm text-[#777A74] leading-relaxed max-w-md mb-6 text-pretty">
                Инженер студии VETRO свяжется с вами в течение 15 минут для подтверждения удобного времени выезда и деталей проекта.
              </p>
              
              <div className="w-full bg-[#F4F2EC] rounded p-4 border border-[#DFDDD6] text-left mb-6 space-y-2">
                <div className="text-xs text-[#777A74] flex items-center gap-1.5">
                  <User className="size-3.5 text-[#252725]" />
                  <span>Клиент:</span> <strong className="text-[#252725]">{name}</strong>
                </div>
                <div className="text-xs text-[#777A74] flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#788173]" />
                  <span>Телефон:</span> <strong className="text-[#252725] tabular-nums">{phone}</strong>
                </div>
                {address && (
                  <div className="text-xs text-[#777A74] flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#252725]" />
                    <span>Адрес:</span> <strong className="text-[#252725]">{address}</strong>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 px-6 rounded font-medium text-[#FBFAF7] bg-[#252725] hover:bg-[#383B38] transition-transform active:scale-[0.98] text-xs uppercase tracking-wider"
              >
                Закрыть
              </button>
            </div>
          ) : (
            /* Active Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trust Callout */}
              <div className="bg-[#F4F2EC] border border-[#DFDDD6] rounded p-3.5 text-xs text-[#777A74] leading-relaxed">
                Инженер студии приедет с лазерным 3D-сканером и комплектом образцов стекла (Optiwhite, сатинат, Estriado) и фурнитуры Boheme Milano.
              </div>

              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="modal-name" className="text-xs font-medium text-[#252725] block mb-1">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777A74]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Иван"
                      className={`w-full rounded bg-[#F4F2EC] text-[#252725] placeholder-[#777A74] border pl-10 pr-4 py-2.5 text-sm outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#DFDDD6] focus:border-[#252725]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="text-left">
                  <PhoneInputMask
                    id="modal-phone"
                    theme="light"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={errors.phone}
                    required
                    label="Телефон"
                  />
                </div>
              </div>

              {/* Address / City */}
              <div className="text-left">
                <label htmlFor="modal-address" className="text-xs font-medium text-[#252725] block mb-1">
                  Адрес или город в Москве / МО
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777A74]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="modal-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="г. Москва, Ленинский пр-т или г. Красногорск"
                    className="w-full rounded bg-[#F4F2EC] text-[#252725] placeholder-[#777A74] border border-[#DFDDD6] focus:border-[#252725] pl-10 pr-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
                <p className="text-[10px] font-mono text-[#777A74] mt-1">
                  Выезд бесплатный в пределах 70 км от МКАД
                </p>
              </div>

              {/* Cabin Type & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="modal-cabin-type" className="text-xs font-medium text-[#252725] block mb-1">
                    Тип конструкции
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777A74]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <select
                      id="modal-cabin-type"
                      value={cabinType}
                      onChange={(e) => setCabinType(e.target.value)}
                      className="w-full rounded bg-[#F4F2EC] text-[#252725] border border-[#DFDDD6] focus:border-[#252725] pl-10 pr-8 py-2.5 text-xs sm:text-sm outline-none transition-colors appearance-none"
                    >
                      <option value="Перегородка Walk-In">Перегородка Walk-In</option>
                      <option value="Угловая кабина 90°">Угловая кабина 90°</option>
                      <option value="Дверь в нишу">Дверь в нишу</option>
                      <option value="Раздвижная система">Раздвижная система</option>
                      <option value="Шторка на ванну">Шторка на ванну</option>
                      <option value="Трапеция 135°">Трапеция 135°</option>
                      <option value="Зеркало с LED">Зеркало с LED</option>
                      <option value="Другое / нужна консультация">Другое / нужна консультация</option>
                    </select>
                  </div>
                </div>

                <div className="text-left">
                  <label htmlFor="modal-time" className="text-xs font-medium text-[#252725] block mb-1">
                    Удобное время
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777A74]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      id="modal-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded bg-[#F4F2EC] text-[#252725] border border-[#DFDDD6] focus:border-[#252725] pl-10 pr-8 py-2.5 text-xs sm:text-sm outline-none transition-colors appearance-none"
                    >
                      <option value="Как можно скорее (в течение 24 часов)">Как можно скорее (в течение 24 часов)</option>
                      <option value="Сегодня вечером">Сегодня вечером</option>
                      <option value="Завтра в первой половине дня">Завтра в первой половине дня</option>
                      <option value="Завтра во второй половине дня">Завтра во второй половине дня</option>
                      <option value="В ближайшие выходные">В ближайшие выходные</option>
                      <option value="Согласовать по телефону">Согласовать по телефону</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Comment */}
              <div className="text-left">
                <label htmlFor="modal-comment" className="text-xs font-medium text-[#252725] block mb-1">
                  Комментарий или пожелания к заказу
                </label>
                <textarea
                  id="modal-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  placeholder="Например: встроенный трап, керамогранит 60х120..."
                  className="w-full rounded bg-[#F4F2EC] text-[#252725] placeholder-[#777A74] border border-[#DFDDD6] focus:border-[#252725] p-3 text-xs sm:text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Guarantees Strip */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#777A74] py-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#788173]" />
                  <span>Гарантия до 10 лет</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#788173]" />
                  <span>Ответ за 15 минут</span>
                </div>
                <div>
                  <span>Конфиденциально</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded font-medium text-[#FBFAF7] bg-[#252725] hover:bg-[#383B38] transition-colors duration-150 text-xs flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] min-h-[48px]"
              >
                {isSubmitting ? (
                  <span>Отправка заявки...</span>
                ) : (
                  <>
                    <Ruler className="w-4 h-4 text-[#A68C70]" />
                    <span>Забронировать 3D-замер</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A68C70]" />
                  </>
                )}
              </button>

              <p className="text-[10px] font-mono text-[#777A74] text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных студией VETRO.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
