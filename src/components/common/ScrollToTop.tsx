import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export interface ScrollToTopProps {
  className?: string;
  threshold?: number;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  className = '',
  threshold = 400,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      data-testid="scroll-to-top"
      aria-label="Вернуться к началу страницы"
      title="Наверх"
      className={`fixed bottom-20 md:bottom-6 right-[4.25rem] md:right-[5.5rem] z-40 size-11 md:size-12 rounded bg-[#FBFAF7]/95 dark:bg-[#14212C]/95 backdrop-blur-md border border-[#DFDDD6] dark:border-[#34434E] text-[#252725] dark:text-[#F1F2EF] hover:bg-[#252725] dark:hover:bg-[#B2E4DD] hover:text-[#FBFAF7] dark:hover:text-[#102126] hover:border-[#252725] dark:hover:border-[#B2E4DD] shadow-none flex items-center justify-center transition-[opacity,transform,background-color,color,border-color] duration-200 active:scale-95 group focus:outline-none focus:ring-1 focus:ring-[#252725] dark:focus:ring-[#B2E4DD] ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-90 translate-y-3 pointer-events-none'
      } ${className}`}
    >
      <ArrowUp className="size-4.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};
