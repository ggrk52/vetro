import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Ruler, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  User, 
  Layers
} from 'lucide-react';
import { PhoneInputMask, isPhoneComplete } from '../common/PhoneInputMask';
import { businessConfig } from '../../data/businessConfig';

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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-white border border-[rgba(26,23,18,0.1)] rounded-[32px] shadow-2xl overflow-hidden z-10 transition-all text-[#1a1712] my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(26,23,18,0.06)] bg-[#f4f2ec]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white text-[#1a1712] flex items-center justify-center shadow-sm">
              <Ruler className="w-4 h-4 text-[#FF2500]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#7c766c] uppercase tracking-wider block">
                Бесплатный выезд 24ч
              </span>
              <h2 id="modal-title" className="text-base font-bold text-[#1a1712] font-display">
                Заказать лазерный 3D-замер
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7c766c] hover:text-[#1a1712] hover:bg-white transition-colors"
            aria-label="Закрыть окно"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            /* Success Feedback View */
            <div className="py-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1a1712] text-white flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#FF2500]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1712] mb-2 font-display">
                Заявка на замер принята!
              </h3>
              <p className="text-sm text-[rgba(20,20,22,0.65)] leading-relaxed max-w-md mb-6">
                Инженер студии VETRO свяжется с вами в течение 15 минут для подтверждения удобного времени выезда и деталей проекта.
              </p>
              
              <div className="w-full bg-[#f4f2ec] rounded-2xl p-4 border border-[rgba(26,23,18,0.06)] text-left mb-6 space-y-2">
                <div className="text-xs text-[#7c766c] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1a1712]" />
                  <span>Клиент:</span> <strong className="text-[#1a1712]">{name}</strong>
                </div>
                <div className="text-xs text-[#7c766c] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF2500]" />
                  <span>Телефон:</span> <strong className="text-[#1a1712]">{phone}</strong>
                </div>
                {address && (
                  <div className="text-xs text-[#7c766c] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1a1712]" />
                    <span>Адрес:</span> <strong className="text-[#1a1712]">{address}</strong>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-white bg-[#1a1712] hover:opacity-90 transition-all text-sm shadow-sm"
              >
                Закрыть
              </button>
            </div>
          ) : (
            /* Active Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trust Callout */}
              <div className="bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#1a1712]">
                <p>
                  Инженер студии приедет с лазерным 3D-нивелиром и чемоданом реальных образцов стекла (Optiwhite, сатинат, Estriado) и фурнитуры Boheme.
                </p>
              </div>

              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="modal-name" className="text-xs font-semibold text-[#1a1712] block mb-1.5">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7c766c]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="modal-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Иван"
                      className={`w-full rounded-full bg-[#f4f2ec] text-[#1a1712] placeholder-[#7c766c] border pl-11 pr-4 py-3 text-sm outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[rgba(26,23,18,0.1)] focus:border-[#1a1712]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="text-left">
                  <PhoneInputMask
                    id="modal-phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={errors.phone}
                    required
                    label="Телефон"
                    className="py-3"
                  />
                </div>
              </div>

              {/* Address / City */}
              <div className="text-left">
                <label htmlFor="modal-address" className="text-xs font-semibold text-[#1a1712] block mb-1.5">
                  Адрес или город в Москве / МО
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7c766c]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="modal-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="г. Москва, ул. Ленина, д. 10 или г. Одинцово"
                    className="w-full rounded-full bg-[#f4f2ec] text-[#1a1712] placeholder-[#7c766c] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] pl-11 pr-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-[#7c766c] mt-1">
                  Выезд бесплатный в пределах 70 км от МКАД
                </p>
              </div>

              {/* Cabin Type & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="modal-cabin-type" className="text-xs font-semibold text-[#1a1712] block mb-1.5">
                    Тип конструкции
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7c766c]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <select
                      id="modal-cabin-type"
                      value={cabinType}
                      onChange={(e) => setCabinType(e.target.value)}
                      className="w-full rounded-full bg-[#f4f2ec] text-[#1a1712] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] pl-11 pr-8 py-3 text-sm outline-none transition-colors appearance-none"
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
                  <label htmlFor="modal-time" className="text-xs font-semibold text-[#1a1712] block mb-1.5">
                    Удобное время
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7c766c]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      id="modal-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-full bg-[#f4f2ec] text-[#1a1712] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] pl-11 pr-8 py-3 text-sm outline-none transition-colors appearance-none"
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
                <label htmlFor="modal-comment" className="text-xs font-semibold text-[#1a1712] block mb-1.5">
                  Комментарий или пожелания к заказу
                </label>
                <textarea
                  id="modal-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  placeholder="Например: сливной трап уже установлен, стены керамогранит..."
                  className="w-full rounded-2xl bg-[#f4f2ec] text-[#1a1712] placeholder-[#7c766c] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] p-4 text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Guarantees Strip */}
              <div className="flex items-center justify-between text-[11px] text-[#7c766c] py-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF2500]" />
                  <span>Гарантия до 5 лет</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1a1712]" />
                  <span>Ответ в течение 15 минут</span>
                </div>
                <div>
                  <span>Без спама</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-white bg-[#FF2500] hover:opacity-90 shadow-sm transition-all text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Отправка заявки...</span>
                ) : (
                  <>
                    <Ruler className="w-4 h-4 text-white" />
                    <span>Забронировать бесплатный замер</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#7c766c] text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных студией VETRO.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
