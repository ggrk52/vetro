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
        className={`flex flex-col items-end gap-2.5 mb-3 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-90 pointer-events-none translate-y-4'
        }`}
        aria-hidden={!isOpen}
      >
        {/* WhatsApp Option */}
        <a
          href={businessConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] shadow-elevated hover:bg-[#f4f2ec] transition-all hover:scale-105 group"
          aria-label="Написать в WhatsApp"
        >
          <span className="text-xs font-semibold whitespace-nowrap">WhatsApp</span>
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
        </a>

        {/* Telegram Option */}
        <a
          href={businessConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] shadow-elevated hover:bg-[#f4f2ec] transition-all hover:scale-105 group"
          aria-label="Написать в Telegram"
        >
          <span className="text-xs font-semibold whitespace-nowrap">Telegram</span>
          <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center">
            <Send className="w-4 h-4 -translate-x-0.5" />
          </div>
        </a>

        {/* Direct Phone Call Option */}
        <a
          href={`tel:${businessConfig.phoneRaw}`}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[rgba(26,23,18,0.1)] text-[#1a1712] shadow-elevated hover:bg-[#f4f2ec] transition-all hover:scale-105 group"
          aria-label={`Позвонить мастеру: ${businessConfig.phone}`}
        >
          <span className="text-xs font-semibold whitespace-nowrap">Позвонить ({businessConfig.phone})</span>
          <div className="w-8 h-8 rounded-full bg-[#1a1712] text-white flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* Main Trigger Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрыть контакты' : 'Написать мастеру'}
          className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-elevated transition-all duration-300 focus:outline-none ${
            isOpen
              ? 'bg-[#1a1712] text-white'
              : 'bg-[#FF2500] text-white hover:opacity-90 hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};
