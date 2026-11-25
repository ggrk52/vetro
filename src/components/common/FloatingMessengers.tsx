import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Phone, X } from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export const FloatingMessengers: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dock on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end"
    >
      {/* Expanded Messenger Options */}
      <div
        className={`flex flex-col items-end gap-2 mb-2.5 transition-[opacity,transform] duration-200 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none translate-y-2'
        }`}
        aria-hidden={!isOpen}
      >
        {/* WhatsApp Option */}
        <a
          href={businessConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2 rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] text-[#252725] dark:text-[#F1F2EF] hover:bg-[#F4F2EC] dark:hover:bg-[#1B2C36] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 group shadow-none active:scale-[0.98]"
          aria-label="Написать в WhatsApp"
        >
          <span className="text-xs font-medium whitespace-nowrap">WhatsApp</span>
          <div className="size-7 rounded bg-[#252725] dark:bg-[#0F1B25] dark:border dark:border-[#34434E] text-[#FBFAF7] dark:text-[#B2E4DD] flex items-center justify-center">
            <MessageCircle className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
          </div>
        </a>

        {/* Telegram Option */}
        <a
          href={businessConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2 rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] text-[#252725] dark:text-[#F1F2EF] hover:bg-[#F4F2EC] dark:hover:bg-[#1B2C36] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 group shadow-none active:scale-[0.98]"
          aria-label="Написать в Telegram"
        >
          <span className="text-xs font-medium whitespace-nowrap">Telegram</span>
          <div className="size-7 rounded bg-[#252725] dark:bg-[#0F1B25] dark:border dark:border-[#34434E] text-[#FBFAF7] dark:text-[#B2E4DD] flex items-center justify-center">
            <Send className="size-3.5 text-[#788173] dark:text-[#B2E4DD]" />
          </div>
        </a>

        {/* Direct Phone Call Option */}
        <a
          href={`tel:${businessConfig.phoneRaw}`}
          className="flex items-center gap-3 px-3.5 py-2 rounded bg-[#FBFAF7] dark:bg-[#14212C] border border-[#DFDDD6] dark:border-[#34434E] text-[#252725] dark:text-[#F1F2EF] hover:bg-[#F4F2EC] dark:hover:bg-[#1B2C36] hover:border-[#252725] dark:hover:border-[#B2E4DD] transition-colors duration-150 group shadow-none active:scale-[0.98]"
          aria-label={`Позвонить в студию VETRO: ${businessConfig.phone}`}
        >
          <span className="text-xs font-medium whitespace-nowrap tabular-nums">Позвонить ({businessConfig.phone})</span>
          <div className="size-7 rounded bg-[#252725] dark:bg-[#0F1B25] dark:border dark:border-[#34434E] text-[#FBFAF7] dark:text-[#B2E4DD] flex items-center justify-center">
            <Phone className="size-3.5 text-[#A68C70] dark:text-[#B2E4DD]" />
          </div>
        </a>
      </div>

      {/* Main Trigger Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрыть контакты' : 'Написать в студию VETRO'}
          className={`relative size-12 rounded flex items-center justify-center text-[#FBFAF7] dark:text-[#102126] transition-transform duration-150 active:scale-95 focus:outline-none border shadow-md ${
            isOpen
              ? 'bg-[#252725] dark:bg-[#B2E4DD] border-[#252725] dark:border-[#B2E4DD]'
              : 'bg-[#252725] dark:bg-[#B2E4DD] border-white/20 dark:border-[#B2E4DD] hover:bg-[#383B38] dark:hover:bg-[#D3F1EB]'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-[#FBFAF7] dark:text-[#102126]" />
          ) : (
            <MessageCircle className="w-5 h-5 text-[#A68C70] dark:text-[#102126]" />
          )}
        </button>
      </div>
    </div>
  );
};
