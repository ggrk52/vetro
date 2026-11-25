import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Sparkles, 
  Ruler, 
  MessageCircle,
  Video
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

export type VideoType = 'sliding' | 'estriado';

export interface VideoInfo {
  id: VideoType;
  title: string;
  badge: string;
  videoSrc: string;
  posterSrc: string;
  description: string;
  specs: string;
}

export const VIDEOS_DATA: Record<VideoType, VideoInfo> = {
  sliding: {
    id: 'sliding',
    title: 'Раздвижная шторка на ванну (бесшумный ход)',
    badge: 'Раздвижная система',
    videoSrc: '/videos/sliding_bath_demo.mp4',
    posterSrc: '/videos/sliding_bath_thumb.jpg',
    description: 'Демонстрация плавного и легкого скольжения стеклянной створки на борт ванны в светлом мраморном санузле. Верхний роликовый трек из нержавеющей стали AISI 304, мягкие демпферы торможения и идеальная герметичность.',
    specs: 'Стекло 8 мм Optiwhite • Полированная сталь AISI 304 • Защита от брызг 100%',
  },
  estriado: {
    id: 'estriado',
    title: 'Кабина из рифленого стекла Estriado в золоте',
    badge: 'Трендовый проект',
    videoSrc: '/videos/estriado_gold_demo.mp4',
    posterSrc: '/videos/estriado_gold_thumb.jpg',
    description: 'Видеообзор готовой душевой кабины из фактурного рифленого стекла Estriado в сочетании с фурнитурой под брашированное золото Boheme Milano. Объемная вертикальная текстура дает великолепную игру света и приватность.',
    specs: 'Рифленое стекло Estriado 8 мм • Брашированное золото PVD • Петли Boheme',
  },
};

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideo?: VideoType;
  onOpenMeasurementModal?: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  initialVideo = 'sliding',
  onOpenMeasurementModal,
}) => {
  const [activeVideoId, setActiveVideoId] = useState<VideoType>(initialVideo);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync initialVideo when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveVideoId(initialVideo);
    }
  }, [isOpen, initialVideo]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Autoplay new video when tab changes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Browser autoplay policy might require user interaction
      });
    }
  }, [activeVideoId, isOpen]);

  if (!isOpen) {
    return null;
  }

  const currentVideo = VIDEOS_DATA[activeVideoId];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Видеообзор конструкции"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#252725] dark:bg-[#101923] rounded border border-white/10 dark:border-[#34434E] shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 dark:border-[#34434E] bg-[#1E201E] dark:bg-[#0D161F]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-white/15 dark:border-[#34434E] bg-white/5 dark:bg-[#14212C] flex items-center justify-center text-white/80 dark:text-[#B2E4DD]">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white dark:text-[#F1F2EF] tracking-tight leading-tight font-sans">
                Видеообзор готовой работы
              </h3>
              <p className="text-xs text-white/50 dark:text-[#B7C3CA]">
                Съемка на сданном объекте студии VETRO в Москве
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Закрыть (Escape)"
            className="p-2 rounded bg-white/5 dark:bg-[#14212C] hover:bg-white/15 dark:hover:bg-[#1B2C36] text-white/80 dark:text-[#F1F2EF] hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center border border-white/10 dark:border-[#34434E] dark:hover:border-[#B2E4DD]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Switcher Tabs */}
        <div className="flex items-center gap-2 px-5 sm:px-6 py-3 bg-[#1A1C1A] dark:bg-[#0D161F] border-b border-white/10 dark:border-[#34434E] overflow-x-auto no-scrollbar">
          {(Object.values(VIDEOS_DATA) as VideoInfo[]).map((v) => {
            const isActive = v.id === activeVideoId;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVideoId(v.id)}
                type="button"
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded text-xs font-medium transition-colors duration-150 whitespace-nowrap min-h-[36px] border ${
                  isActive
                    ? 'bg-white dark:bg-[#B2E4DD] text-[#252725] dark:text-[#102126] border-white dark:border-[#B2E4DD] font-semibold'
                    : 'bg-white/5 dark:bg-[#14212C] border-white/10 dark:border-[#34434E] text-white/70 dark:text-[#B7C3CA] hover:text-white dark:hover:text-[#F1F2EF] hover:bg-white/10 dark:hover:bg-[#1B2C36]'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{v.title}</span>
              </button>
            );
          })}
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black aspect-video sm:max-h-[55vh] flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={currentVideo.videoSrc}
            poster={currentVideo.posterSrc}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Ваш браузер не поддерживает встроенное воспроизведение видео.
          </video>
        </div>

        {/* Bottom Details & Conversion CTA */}
        <div className="p-5 sm:p-6 bg-[#1E201E] dark:bg-[#0D161F] border-t border-white/10 dark:border-[#34434E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 dark:bg-[#14212C] text-white/90 dark:text-[#B2E4DD] text-[11px] font-medium tracking-wide mb-1.5 border border-white/15 dark:border-[#34434E]">
              <Sparkles className="w-3 h-3 text-[#D8D3C9] dark:text-[#B2E4DD]" />
              <span>{currentVideo.badge}</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-white dark:text-[#F1F2EF] mb-1">
              {currentVideo.title}
            </h4>
            <p className="text-xs text-white/60 dark:text-[#B7C3CA] mb-1.5 leading-relaxed">
              {currentVideo.description}
            </p>
            <p className="text-[11px] font-mono text-white/40 dark:text-[#B2E4DD]/80 tracking-wider">
              {currentVideo.specs}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            {onOpenMeasurementModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenMeasurementModal();
                }}
                type="button"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-white dark:bg-[#B2E4DD] hover:bg-[#F4F2EC] dark:hover:bg-[#D3F1EB] text-[#252725] dark:text-[#102126] font-semibold text-xs tracking-tight transition-colors min-h-[44px]"
              >
                <Ruler className="w-4 h-4" />
                <span>Заказать такую же</span>
              </button>
            )}

            <a
              href={`${businessConfig.whatsappUrl}&text=${encodeURIComponent(`Здравствуйте! Посмотрел видео «${currentVideo.title}». Хочу рассчитать стоимость такой конструкции.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-white/10 dark:bg-transparent hover:bg-white/15 dark:hover:bg-[#1B2C36] text-white dark:text-[#F1F2EF] font-medium text-xs tracking-tight transition-colors border border-white/15 dark:border-[#657881] dark:hover:border-[#B2E4DD] min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
