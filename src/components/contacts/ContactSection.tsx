import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Send, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Ruler, 
  Navigation,
  Truck,
  ArrowUpRight
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';
import { PhoneInputMask, isPhoneComplete } from '../common/PhoneInputMask';

export interface ContactSectionProps {
  onOpenMeasurementModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenMeasurementModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Душевая перегородка Walk-in');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(true);
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
    <section id="contacts" className="py-14 sm:py-20 lg:py-24 bg-[#252725] dark:bg-[#101923] text-[#FBFAF7] dark:text-[#F1F2EF] relative overflow-hidden border-b border-white/10 dark:border-[#34434E]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/15 dark:border-[#34434E]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 dark:bg-[#14212C] text-[#A68C70] dark:text-[#B2E4DD] font-mono text-[10px] mb-3 border border-white/10 dark:border-[#34434E]">
              <span className="w-1.5 h-1.5 bg-[#A68C70] dark:bg-[#B2E4DD] rounded-none rotate-45" />
              <span>Консультация · VETRO Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#FBFAF7] dark:text-[#F1F2EF] tracking-tight leading-[1.06] text-balance">
              Создадим решение<br />
              <span className="italic text-[#A68C70] dark:text-[#B2E4DD]">для вашего пространства.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/70 dark:text-[#B7C3CA] max-w-md leading-relaxed font-sans text-pretty">
            Расскажите о проекте — обсудим подходящий вариант стеклянной конструкции, согласуем образцы и подготовим точный расчет в день обращения.
          </p>
        </div>

        {/* 2-Column Architectural Layout: Form on Left/Center + Studio Contacts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Lead Consultation Form */}
          <div className="lg:col-span-7 bg-[#1E201E] dark:bg-[#14212C] border border-white/15 dark:border-[#34434E] rounded p-6 sm:p-8">
            <div className="mb-6">
              <span className="font-mono text-[10px] text-[#A68C70] dark:text-[#B2E4DD] block mb-1">
                Заявка на проект
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#FBFAF7] dark:text-[#F1F2EF]">
                Обсудить проект с ведущим инженером
              </h3>
              <p className="text-xs sm:text-[13px] text-white/60 dark:text-[#B7C3CA] mt-1">
                Оставьте контактные данные — свяжемся с вами в течение 15 минут в рабочее время.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/20 dark:border-[#34434E] text-center space-y-4">
                <div className="size-12 rounded bg-[#788173] dark:bg-[#B2E4DD] text-[#FBFAF7] dark:text-[#102126] flex items-center justify-center mx-auto">
                  <Check className="size-6" />
                </div>
                <h4 className="text-xl font-serif text-[#FBFAF7] dark:text-[#F1F2EF]">
                  Благодарим за обращение в VETRO.
                </h4>
                <p className="text-xs sm:text-sm text-white/70 dark:text-[#D1DCE1] max-w-md mx-auto leading-relaxed text-pretty">
                  Заявка принята. Инженер свяжется с вами по номеру <strong className="text-[#FBFAF7] dark:text-[#B2E4DD] tabular-nums">{phone}</strong> для уточнения деталей и выезда на 3D-замер.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-2 px-6 py-2.5 rounded bg-[#FBFAF7] dark:bg-[#B2E4DD] text-[#252725] dark:text-[#102126] text-xs font-mono uppercase tracking-wider hover:bg-white dark:hover:bg-[#D3F1EB] active:scale-95 transition-transform"
                >
                  Отправить другую заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-medium text-white/90 dark:text-[#DDE7E9] block mb-1">
                      Ваше имя:
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Константин"
                      className="w-full rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/15 dark:border-[#435461] focus:border-[#FBFAF7] dark:focus:border-[#B2E4DD] px-4 py-2.5 text-sm text-[#FBFAF7] dark:text-[#F1F2EF] placeholder-white/30 dark:placeholder-[#B7C3CA]/40 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <PhoneInputMask
                      id="contact-phone"
                      theme="dark"
                      value={phone}
                      onChange={(val, valid) => {
                        setPhone(val);
                        if (phoneError && valid) setPhoneError(undefined);
                      }}
                      error={phoneError}
                      required
                      label="Номер телефона:"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-category" className="text-xs font-medium text-white/90 dark:text-[#DDE7E9] block mb-1">
                    Тип остекления:
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/15 dark:border-[#435461] focus:border-[#FBFAF7] dark:focus:border-[#B2E4DD] px-4 py-2.5 text-sm text-[#FBFAF7] dark:text-[#F1F2EF] outline-none transition-colors"
                  >
                    <option value="Душевая перегородка Walk-in">Душевая перегородка Walk-In (свободный вход)</option>
                    <option value="Угловая душевая кабина 90°">Угловая душевая кабина 90°</option>
                    <option value="Стеклянная дверь в нишу">Стеклянная перегородка / дверь в нишу</option>
                    <option value="Раздвижная система остекления">Раздвижная (откатная) система</option>
                    <option value="Шторка для ванны">Стеклянная шторка на ванну</option>
                    <option value="Трапециевидная кабина 135°">Трапециевидная кабина 135°</option>
                    <option value="Зеркало на заказ">Влагостойкое зеркало с LED-подсветкой</option>
                    <option value="Другое архитектурное остекление">Другое архитектурное остекление</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs font-medium text-white/90 dark:text-[#DDE7E9] block mb-1">
                    Пожелания к проекту (размеры, оттенок стекла, фурнитура):
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Например: перегородка в строительном душевом поддоне 120х90 см, фурнитура брашированная бронза, стекло Optiwhite..."
                    className="w-full rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/15 dark:border-[#435461] focus:border-[#FBFAF7] dark:focus:border-[#B2E4DD] p-3 text-sm text-[#FBFAF7] dark:text-[#F1F2EF] placeholder-white/30 dark:placeholder-[#B7C3CA]/40 outline-none resize-none transition-colors"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="contact-agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="mt-0.5 rounded bg-[#252725] dark:bg-[#0F1B25] border-white/20 dark:border-[#435461] text-[#788173] dark:accent-[#B2E4DD] focus:ring-0"
                  />
                  <label htmlFor="contact-agreement" className="text-[11px] text-white/60 dark:text-[#B7C3CA] leading-tight">
                    Я соглашаюсь на обработку персональных данных в соответствии с политикой конфиденциальности студии VETRO.
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !agreed}
                    className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#FBFAF7] dark:bg-[#B2E4DD] hover:bg-white dark:hover:bg-[#D3F1EB] text-[#252725] dark:text-[#102126] font-medium dark:font-semibold text-xs transition-colors duration-150 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>Отправка...</span>
                    ) : (
                      <>
                        <span>Отправить заявку</span>
                        <ArrowUpRight className="size-4 text-[#A68C70] dark:text-[#102126]" />
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-white/50 dark:text-[#B7C3CA] text-center sm:text-right">
                    Конфиденциально • Без спама
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Studio Channels & Coverage */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="bg-[#1E201E] dark:bg-[#14212C] border border-white/15 dark:border-[#34434E] rounded p-6 sm:p-7 space-y-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#788173] dark:text-[#B2E4DD] block mb-1">
                  ПРЯМЫЕ КОНТАКТЫ
                </span>
                <h3 className="text-xl font-serif text-[#FBFAF7] dark:text-[#F1F2EF]">
                  Инженерный отдел VETRO
                </h3>
                <p className="text-xs text-white/60 dark:text-[#B7C3CA] mt-0.5">
                  Москва и Московская область • Собственное производство
                </p>
              </div>

              {/* Direct Channel Buttons */}
              <div className="space-y-2.5">
                {/* Phone */}
                <a
                  href={`tel:${businessConfig.phoneRaw}`}
                  className="flex items-center gap-3.5 p-3 rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/10 dark:border-[#34434E] hover:border-white/30 dark:hover:border-[#B2E4DD] transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#FBFAF7] dark:bg-[#14212C] dark:border dark:border-[#34434E] flex items-center justify-center text-[#252725] dark:text-[#B2E4DD] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 dark:text-[#B7C3CA] block uppercase">Прямой телефон студии:</span>
                    <span className="font-semibold text-sm sm:text-base text-[#FBFAF7] dark:text-[#F1F2EF]">
                      {businessConfig.phone}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={businessConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/10 dark:border-[#34434E] hover:border-white/30 dark:hover:border-[#B2E4DD] transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#FBFAF7] dark:bg-[#14212C] dark:border dark:border-[#34434E] flex items-center justify-center text-[#788173] dark:text-[#B2E4DD] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 dark:text-[#B7C3CA] block uppercase">Консультация и расчет по фото:</span>
                    <span className="font-semibold text-sm sm:text-base text-[#FBFAF7] dark:text-[#F1F2EF]">
                      Написать в WhatsApp
                    </span>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href={businessConfig.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/10 dark:border-[#34434E] hover:border-white/30 dark:hover:border-[#B2E4DD] transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#FBFAF7] dark:bg-[#14212C] dark:border dark:border-[#34434E] flex items-center justify-center text-[#788173] dark:text-[#B2E4DD] shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 dark:text-[#B7C3CA] block uppercase">Telegram-канал и чат:</span>
                    <span className="font-semibold text-sm sm:text-base text-[#FBFAF7] dark:text-[#F1F2EF]">
                      @{businessConfig.telegramUsername}
                    </span>
                  </div>
                </a>
              </div>

              {/* Working Hours & Geography */}
              <div className="pt-4 border-t border-white/10 dark:border-[#34434E] space-y-2.5 text-xs text-white/80 dark:text-[#D1DCE1]">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#A68C70] dark:text-[#B2E4DD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FBFAF7] dark:text-[#F1F2EF] block">Режим работы:</span>
                    <span className="text-white/60 dark:text-[#B7C3CA]">{businessConfig.workingHours} • Без выходных</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-[#788173] dark:text-[#B2E4DD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FBFAF7] dark:text-[#F1F2EF] block">География выезда:</span>
                    <span className="text-white/60 dark:text-[#B7C3CA]">{businessConfig.serviceRegion}</span>
                  </div>
                </div>
              </div>

              {/* Quick Measurement Button */}
              {onOpenMeasurementModal && (
                <button
                  type="button"
                  onClick={onOpenMeasurementModal}
                  className="w-full py-3 px-4 rounded font-medium text-[#FBFAF7] dark:text-[#F1F2EF] bg-white/10 dark:bg-transparent hover:bg-white/20 dark:hover:bg-[#1B2C36] border border-white/15 dark:border-[#657881] dark:hover:border-[#B2E4DD] text-xs flex items-center justify-center gap-2 transition-colors duration-150 active:scale-[0.98] min-h-[44px]"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#A68C70] dark:text-[#B2E4DD]" />
                  <span>Вызвать инженера на 3D-замер</span>
                </button>
              )}
            </div>

            {/* Geography & Cities Cloud */}
            <div className="bg-[#1E201E] dark:bg-[#14212C] border border-white/15 dark:border-[#34434E] rounded p-5 space-y-3">
              <span className="text-[11px] font-mono text-[#A68C70] dark:text-[#B2E4DD] block">
                Регулярные выезды по Москве и городам Подмосковья:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {keyCities.map((city) => (
                  <span
                    key={city}
                    className="px-2.5 py-0.5 rounded bg-[#252725] dark:bg-[#0F1B25] border border-white/10 dark:border-[#34434E] text-xs text-white/80 dark:text-[#D1DCE1] font-mono"
                  >
                    {city}
                  </span>
                ))}
                <span className="px-2.5 py-0.5 rounded bg-white/5 dark:bg-[#0F1B25]/70 text-[11px] font-mono text-white/50 dark:text-[#B7C3CA] dark:border dark:border-[#34434E]/60">
                  + коттеджные поселки до 70 км от МКАД
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
