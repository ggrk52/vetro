export interface BusinessContact {
  brandName: string;
  companyName: string;
  masterName?: string;
  experienceYears: number;
  phone: string;
  phoneRaw: string;
  telegramUsername: string;
  telegramUrl: string;
  telegramChannelUsername: string;
  telegramChannelUrl: string;
  whatsappUrl: string;
  workingHours: string;
  serviceRegion: string;
  guarantees: {
    installationYears: number;
    hardwareYears: number;
    glassYears: number;
  };
}

export const businessConfig: BusinessContact = {
  brandName: "VETRO — Архитектурная студия стеклянных душевых",
  companyName: "VETRO",
  masterName: "Инженерный отдел VETRO",
  experienceYears: 10,
  phone: "+7 (926) 840-23-45",
  phoneRaw: "+79268402345",
  telegramUsername: "dushevye1",
  telegramUrl: "https://t.me/dushevye1", // Временная заглушка: заменить на личный контакт Саши или Влада
  telegramChannelUsername: "dushevye1",
  telegramChannelUrl: "https://t.me/dushevye1",
  whatsappUrl: "https://wa.me/79268402345?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%B4%D1%83%D1%88%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BA%D0%B8%20%D0%B2%20%D1%81%D1%82%D1%83%D0%B4%D0%B8%D0%B8%20VETRO",
  workingHours: "Ежедневно с 09:00 до 21:00",
  serviceRegion: "Москва и вся Московская область (до 70 км от МКАД)",
  guarantees: {
    installationYears: 3,
    hardwareYears: 5,
    glassYears: 10,
  },
};

export interface TrustBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const trustBadges: TrustBadge[] = [
  {
    id: "laser_measuring",
    title: "Выезд инженера 24ч",
    description: "Точный 3D-лазерный замер с образцами стекла и фурнитуры Boheme на вашем объекте",
    icon: "Ruler",
  },
  {
    id: "tempered_glass",
    title: "Стекло 8-10 мм ГОСТ",
    description: "Закаленное безопасное стекло ESG повышенной прочности от ведущих заводов",
    icon: "ShieldCheck",
  },
  {
    id: "fast_production",
    title: "Производство от 5 дней",
    description: "Собственный производственный цех с ЧПУ-обработкой и контролем геометрии",
    icon: "Clock",
  },
  {
    id: "company_warranty",
    title: "Гарантия по договору до 5 лет",
    description: "Официальная ответственность студии VETRO за каждый узел и 100% герметичность",
    icon: "Award",
  },
];
