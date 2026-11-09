import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Send, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Ruler, 
  Navigation,
  Truck
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';
import { PhoneInputMask, isPhoneComplete } from '../common/PhoneInputMask';

export interface ContactSectionProps {
  onOpenMeasurementModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenMeasurementModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [question, setQuestion] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !isPhoneComplete(phone)) {
      setPhoneError('Укажите полный номер телефона (+7 XXX XXX-XX-XX)');
      return;
    }
    setPhoneError(undefined);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const keyCities = [
    'Москва', 'Одинцово', 'Красногорск', 'Химки', 'Мытищи', 
    'Балашиха', 'Люберцы', 'Видное', 'Подольск', 'Домодедово', 
    'Королёв', 'Долгопрудный', 'Зеленоград', 'Истра'
  ];

  return (
    <section id="contacts" className="py-8 sm:py-10 md:py-14 bg-[#f4f2ec] border-t border-[rgba(26,23,18,0.06)] text-[#1a1712] relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae6dc] text-[#1a1712] text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3 border border-[rgba(26,23,18,0.08)]">
            <MapPin className="w-3.5 h-3.5 text-[#1a1712]" />
            <span>Инженерный отдел VETRO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1712] tracking-tight mb-2 sm:mb-3 font-display">
            Контакты и территория выезда
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(20,20,22,0.65)] leading-relaxed">
            Свяжитесь напрямую с ведущими инженерами студии VETRO. Без диспетчеров и наценок салонов.
          </p>
        </div>

        {/* 3-Column Grid: Contacts Card + Territory/Map Card + Quick Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (4 cols): Direct Contacts Card */}
          <div className="lg:col-span-4 bg-white border border-[rgba(26,23,18,0.08)] rounded-[32px] p-6 sm:p-7 shadow-card space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae6dc] text-[#1a1712] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Студия на связи</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a1712] mb-1 font-display">
                Инженерный отдел VETRO
              </h3>
              <p className="text-xs text-[#7c766c]">
                Студия авторских стеклянных перегородок VETRO
              </p>
            </div>

            {/* Direct Channel Buttons */}
            <div className="space-y-2.5">
              {/* Phone */}
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] hover:border-[#1a1712] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1a1712] shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7c766c] block">Прямой телефон:</span>
                  <span className="font-bold text-sm sm:text-base text-[#1a1712]">
                    {businessConfig.phone}
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={businessConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] hover:border-[#25D366] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#25D366] shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7c766c] block">Быстрый ответ в чате:</span>
                  <span className="font-bold text-sm sm:text-base text-[#1a1712]">
                    Написать в WhatsApp
                  </span>
                </div>
              </a>

              {/* Telegram */}
              <a
                href={businessConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] hover:border-[#0088cc] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0088cc] shadow-sm">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7c766c] block">Telegram студии:</span>
                  <span className="font-bold text-sm sm:text-base text-[#1a1712]">
                    @{businessConfig.telegramUsername}
                  </span>
                </div>
              </a>
            </div>

            {/* Working Hours & Territory */}
            <div className="pt-4 border-t border-[rgba(26,23,18,0.06)] space-y-3 text-xs text-[#1a1712]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1a1712] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1a1712] block">Режим работы:</span>
                  <span className="text-[#7c766c]">{businessConfig.workingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-[#FF2500] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1a1712] block">География выезда:</span>
                  <span className="text-[#7c766c]">{businessConfig.serviceRegion}</span>
                </div>
              </div>
            </div>

            {/* Quick Measurement Button */}
            <button
              type="button"
              onClick={onOpenMeasurementModal}
              className="w-full py-3.5 px-4 rounded-full font-semibold text-white bg-[#1a1712] hover:opacity-90 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
            >
              <Ruler className="w-4 h-4 text-[#FF2500]" />
              <span>Заказать бесплатный 3D-замер</span>
            </button>
          </div>

          {/* Center/Right Column (8 cols): Territory Coverage Card & Fast Consultation Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Territory Card with Graphic Badges */}
            <div className="bg-white border border-[rgba(26,23,18,0.08)] rounded-[32px] p-6 sm:p-8 shadow-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                    Зона обслуживания: Москва и область до 70 км
                  </h3>
                  <p className="text-xs text-[#7c766c]">
                    Ежедневные выезды на лазерный замер и чистый монтаж с полным комплектом оборудования.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eae6dc] text-[#1a1712] text-xs font-semibold shrink-0">
                  <Truck className="w-3.5 h-3.5 text-[#1a1712]" />
                  <span>Доставка спецпирамидой</span>
                </div>
              </div>

              {/* Service Badges Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#1a1712] flex items-center justify-center shrink-0 shadow-sm">
                    <Ruler className="w-4 h-4 text-[#FF2500]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#1a1712] block">Замер 0 ₽</span>
                    <span className="text-[#7c766c]">при заказе кабины</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#1a1712] flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#1a1712] block">Выезд за 24ч</span>
                    <span className="text-[#7c766c]">в удобное вам время</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#1a1712] flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#FF2500]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#1a1712] block">Гарантия до 5 лет</span>
                    <span className="text-[#7c766c]">официальный договор</span>
                  </div>
                </div>
              </div>

              {/* Cities Tag Cloud */}
              <div>
                <span className="text-xs font-semibold text-[#7c766c] block mb-2.5">
                  Регулярно работаем в городах Подмосковья:
                </span>
                <div className="flex flex-wrap gap-2">
                  {keyCities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-full bg-[#f4f2ec] border border-[rgba(26,23,18,0.06)] text-xs text-[#1a1712] font-medium"
                    >
                      {city}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-[#f4f2ec]/60 text-xs text-[#7c766c] font-medium">
                    + любые поселки до 70 км от МКАД
                  </span>
                </div>
              </div>
            </div>

            {/* Fast Consultation Form */}
            <div className="bg-white border border-[rgba(26,23,18,0.08)] rounded-[32px] p-6 sm:p-8 shadow-card">
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1712] mb-1 font-display">
                  Задайте вопрос или закажите расчет
                </h3>
                <p className="text-xs text-[#7c766c]">
                  Оставьте контакты — инженер студии перезвонит или ответит в мессенджере в течение 15 минут.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#eae6dc] border border-[rgba(26,23,18,0.08)] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#1a1712] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#FF2500]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#1a1712]">
                    Спасибо! Ваше обращение принято.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#7c766c] max-w-md mx-auto">
                    Инженер свяжется с вами по номеру <strong className="text-[#1a1712]">{phone}</strong> для консультации.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setQuestion('');
                    }}
                    className="mt-3 px-6 py-2.5 rounded-full bg-white border border-[rgba(26,23,18,0.12)] text-[#1a1712] text-xs font-semibold shadow-sm"
                  >
                    Отправить другой вопрос
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-semibold text-[#1a1712] block mb-1">
                        Ваше имя:
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Константин"
                        className="w-full rounded-full bg-[#f4f2ec] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] px-4 py-3 text-sm text-[#1a1712] placeholder-[#7c766c] outline-none"
                      />
                    </div>

                    <div>
                      <PhoneInputMask
                        id="contact-phone"
                        value={phone}
                        onChange={(val, valid) => {
                          setPhone(val);
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

                  <div>
                    <label htmlFor="contact-question" className="text-xs font-semibold text-[#1a1712] block mb-1">
                      Ваш вопрос или описание проекта:
                    </label>
                    <textarea
                      id="contact-question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={3}
                      placeholder="Например: нужна угловая кабина 90х90 с черной фурнитурой и осветленным стеклом Optiwhite..."
                      className="w-full rounded-2xl bg-[#f4f2ec] border border-[rgba(26,23,18,0.1)] focus:border-[#1a1712] p-4 text-sm text-[#1a1712] placeholder-[#7c766c] outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] text-[#7c766c]">
                      Конфиденциально. Ваши данные не передаются третьим лицам.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-white bg-[#FF2500] hover:opacity-90 shadow-sm text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <span>Отправка...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Получить консультацию</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
