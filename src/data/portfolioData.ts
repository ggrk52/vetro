export type CabinCategory =
  | 'all'
  | 'corner'      // Угловые 90°
  | 'walkin'      // Перегородки Walk-In
  | 'niche'       // Двери в нишу
  | 'sliding'     // Раздвижные системы
  | 'bath_screen' // Шторки на ванну
  | 'trapezoid'   // Трапеции 135°
  | 'mirror'      // Зеркала с LED
  | 'loft';       // Черный лофт

export interface PortfolioItem {
  id: string;
  title: string;
  category: CabinCategory;
  imageSrc: string;
  glassType: string;
  hardwareFinish: string;
  approxDimensions?: string;
  description: string;
  featured?: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  // --- Corner 90° (8 items) ---
  {
    id: 'corner_01',
    title: 'Угловая кабина 90° Optiwhite с золотой фурнитурой',
    category: 'corner',
    imageSrc: '/portfolio/corner_01.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '900×900×2000 мм',
    description: 'Угловая кабина премиум-класса с распашной дверью, латунными петлями под золото и магнитным уплотнителем для 100% герметичности.',
    featured: true,
  },
  {
    id: 'corner_02',
    title: 'Угловой душевой уголок с черным матовым профилем',
    category: 'corner',
    imageSrc: '/portfolio/corner_02.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1000×1000×2000 мм',
    description: 'Просторный душевой уголок со скрытым монтажом профиля в керамогранит и ручкой-кнобом с soft-touch напылением.',
    featured: true,
  },
  {
    id: 'corner_03',
    title: 'Классическая угловая кабина с полированным хромом',
    category: 'corner',
    imageSrc: '/portfolio/corner_03.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '900×1100×2050 мм',
    description: 'Надежная угловая конструкция с петлями 90° из нержавеющей стали AISI 304 и жесткой штангой-стабилизатором жесткости.',
    featured: false,
  },
  {
    id: 'corner_04',
    title: 'Приватная угловая кабина с матовым сатинатом',
    category: 'corner',
    imageSrc: '/portfolio/corner_04.jpg',
    glassType: 'Матовое сатинат (Matelux) 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '800×1000×1950 мм',
    description: 'Шелковистое матированное химическим травлением стекло Matelux обеспечивает мягкое рассеивание света и приватность.',
    featured: false,
  },
  {
    id: 'corner_05',
    title: 'Компактный душевой уголок со стеклом Optiwhite',
    category: 'corner',
    imageSrc: '/portfolio/corner_05.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '800×800×2000 мм',
    description: 'Эргономичное решение для компактных санузлов с установкой на кафельный поддон в один уровень с полом.',
    featured: false,
  },
  {
    id: 'corner_06',
    title: 'Угловая кабина Графит с фурнитурой Gunmetal',
    category: 'corner',
    imageSrc: '/portfolio/corner_06.jpg',
    glassType: 'Тонированное Графит 8 мм',
    hardwareFinish: 'Оружейная сталь',
    approxDimensions: '1000×900×2050 мм',
    description: 'Тонированное в массе графитовое стекло в сочетании с благородным оттенком оружейной стали (Gunmetal PVD).',
    featured: false,
  },
  {
    id: 'corner_07',
    title: 'Угловая кабина с двойной распашной створкой',
    category: 'corner',
    imageSrc: '/portfolio/corner_07.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '1000×1000×2100 мм',
    description: 'Широкий распашной проход с золотыми петлями с фиксацией 90° и силиконовыми лепестковыми водоотбойниками.',
    featured: true,
  },
  {
    id: 'corner_08',
    title: 'Безбарьерная угловая кабина со скрытым трапом',
    category: 'corner',
    imageSrc: '/portfolio/corner_08.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '900×1200×2000 мм',
    description: 'Идеальная геометрия примыкания стекла к плитке без громоздких порожков, гидрофобное нано-покрытие против налета.',
    featured: false,
  },

  // --- Walk-In (8 items) ---
  {
    id: 'walkin_01',
    title: 'Свободностоящая перегородка Walk-In в золоте',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_01.jpg',
    glassType: 'Осветленное Optiwhite 10 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '1100×2100 мм',
    description: 'Монолитное закаленное стекло повышенной толщины 10 мм с ультрапрозрачным торцом и верхней штангой в отделке брашированное золото.',
    featured: true,
  },
  {
    id: 'walkin_02',
    title: 'Минималистичное ограждение Walk-In в черном профиле',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_02.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1000×2000 мм',
    description: 'Лаконичный П-образный алюминиевый профиль 15×15 мм со скрытыми винтами, полированная еврокромка по периметру.',
    featured: false,
  },
  {
    id: 'walkin_03',
    title: 'Фактурная перегородка Walk-In из рифленого Estriado',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_03.jpg',
    glassType: 'Рифленое Estriado 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1200×2100 мм',
    description: 'Изысканное рифленое стекло с вертикальной фактурой вельвета — тренд интерьерного дизайна, скрывает капли воды.',
    featured: true,
  },
  {
    id: 'walkin_04',
    title: 'Широкое ограждение свободного входа с хромированной штангой',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_04.jpg',
    glassType: 'Прозрачное закаленное 10 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1300×2100 мм',
    description: 'Усиленная стабилизация стекла штангой сечением 19×19 мм из нержавеющей стали с поворотным коннектором к стене.',
    featured: false,
  },
  {
    id: 'walkin_05',
    title: 'Тонированная душевая панель Walk-In Графит',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_05.jpg',
    glassType: 'Тонированное Графит 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1000×2050 мм',
    description: 'Глубокий дымчатый оттенок графита подчеркивает текстуру темного мрамора и черных встроенных смесителей.',
    featured: false,
  },
  {
    id: 'walkin_06',
    title: 'Стекло Walk-In под потолок с индивидуальным вырезом',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_06.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1150×2400 мм',
    description: 'Прецизионный замер с помощью лазерного дальномера Leica и гидроабразивный фигурный вырез под конструктивную балку.',
    featured: false,
  },
  {
    id: 'walkin_07',
    title: 'Душевое ограждение Walk-In с фурнитурой Gunmetal',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_07.jpg',
    glassType: 'Осветленное Optiwhite 10 мм',
    hardwareFinish: 'Оружейная сталь',
    approxDimensions: '1200×2000 мм',
    description: 'Премиальное PVD-покрытие фурнитуры устойчиво к механическим повреждениям и агрессивным моющим средствам.',
    featured: false,
  },
  {
    id: 'walkin_08',
    title: 'Лаконичная перегородка Walk-In в белом профиле',
    category: 'walkin',
    imageSrc: '/portfolio/walkin_08.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Белый матовый',
    approxDimensions: '900×2000 мм',
    description: 'Белоснежный матовый зажимной профиль и осветленное стекло Optiwhite без зеленоватого оттенка для светлых сканди-интерьеров.',
    featured: false,
  },

  // --- Sliding systems (8 items) ---
  {
    id: 'sliding_01',
    title: 'Раздвижная система на открытом верхнем треке',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_01.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1500×2000 мм',
    description: 'Дизайнерская раздвижная система с массивными открытыми роликами и трубой из нержавеющей стали с тихим плавным ходом.',
    featured: true,
  },
  {
    id: 'sliding_02',
    title: 'Раздвижная дверь в нишу с доводчиком Soft-Close',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_02.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1400×2050 мм',
    description: 'Встроенные двусторонние масляные демпферы мягко притягивают тяжелое стеклянное полотно в крайних положениях без ударов.',
    featured: false,
  },
  {
    id: 'sliding_03',
    title: 'Угловая раздвижная кабина с золотой направляющей',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_03.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '1000×1000×2000 мм',
    description: 'Две сдвижные створки сходятся в углу на 90°, обеспечивая максимально широкий вход при экономии полезной площади санузла.',
    featured: true,
  },
  {
    id: 'sliding_04',
    title: 'Раздвижная перегородка Графит в отделке Gunmetal',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_04.jpg',
    glassType: 'Тонированное Графит 8 мм',
    hardwareFinish: 'Оружейная сталь',
    approxDimensions: '1600×2100 мм',
    description: 'Широкая душевая зона: глухое полотно 800 мм и подвижная створка 800 мм с плоской ручкой-кнобом под цвет трека.',
    featured: false,
  },
  {
    id: 'sliding_05',
    title: 'Раздвижная система из фактурного стекла Estriado',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_05.jpg',
    glassType: 'Рифленое Estriado 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1350×2000 мм',
    description: 'Фактурные полосы стекла Estriado преломляют блики подсветки, создавая роскошную приватную атмосферу.',
    featured: false,
  },
  {
    id: 'sliding_06',
    title: 'Беспороговая раздвижная система со скрытым поводком',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_06.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1450×2000 мм',
    description: 'Полное отсутствие нижнего профиля — внизу установлен лишь миниатюрный фторопластовый направляющий башмак за пределами прохода.',
    featured: false,
  },
  {
    id: 'sliding_07',
    title: 'Широкая раздвижная душевая группа для мастер-ванной',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_07.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1700×2150 мм',
    description: 'Максимальная светопропускаемость и легкость скольжения тяжелой створки весом более 35 кг благодаря игольчатым подшипникам.',
    featured: false,
  },
  {
    id: 'sliding_08',
    title: 'Компактная раздвижная система с фурнитурой Boheme',
    category: 'sliding',
    imageSrc: '/portfolio/sliding_08.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '1200×2000 мм',
    description: 'Итальянская латунная трековая система с золотым гальваническим покрытием и эргономичной ручкой-скобой.',
    featured: false,
  },

  // --- Niche swing doors (8 items) ---
  {
    id: 'niche_01',
    title: 'Дверь в нишу с неподвижным добором и черными петлями',
    category: 'niche',
    imageSrc: '/portfolio/niche_01.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '1000×2000 мм',
    description: 'Конструкция из глухой створки 350 мм и распашной двери 650 мм на петлях «стекло-стекло» 180° с доводчиком.',
    featured: true,
  },
  {
    id: 'niche_02',
    title: 'Одностворчатая дверь в нишу на петлях «стекло-стена»',
    category: 'niche',
    imageSrc: '/portfolio/niche_02.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '800×1950 мм',
    description: 'Классическое решение для готовой плиточной ниши с регулировкой нулевого положения петли.',
    featured: false,
  },
  {
    id: 'niche_03',
    title: 'Дверь в нишу из рифленого Estriado с золотой ручкой',
    category: 'niche',
    imageSrc: '/portfolio/niche_03.jpg',
    glassType: 'Рифленое Estriado 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '900×2050 мм',
    description: 'Вертикальный рельеф стекла гармонирует с латунной фурнитурой теплых тонов и скрывает следы брызг.',
    featured: true,
  },
  {
    id: 'niche_04',
    title: 'Дверь в душевую нишу с маятниковым открыванием',
    category: 'niche',
    imageSrc: '/portfolio/niche_04.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '850×2000 мм',
    description: 'Двустороннее открывание внутрь и наружу позволяет рационально использовать пространство тесного санузла.',
    featured: false,
  },
  {
    id: 'niche_05',
    title: 'Матовая дверь в нишу со скандинавской белой фурнитурой',
    category: 'niche',
    imageSrc: '/portfolio/niche_05.jpg',
    glassType: 'Матовое сатинат (Matelux) 8 мм',
    hardwareFinish: 'Белый матовый',
    approxDimensions: '900×2000 мм',
    description: 'Атласное стекло Matelux не боится отпечатков пальцев, а белая порошковая покраска фурнитуры устойчива к сколам.',
    featured: false,
  },
  {
    id: 'niche_06',
    title: 'Дверь в нишу Бронза с фурнитурой под античную бронзу',
    category: 'niche',
    imageSrc: '/portfolio/niche_06.jpg',
    glassType: 'Тонированное Бронза 8 мм',
    hardwareFinish: 'Матовая бронза',
    approxDimensions: '950×2050 мм',
    description: 'Теплый коньячный оттенок стекла и фактурная винтажная бронзовая фурнитура в стиле классической неоклассики.',
    featured: false,
  },
  {
    id: 'niche_07',
    title: 'Двухстворчатая распашная дверь в нишу',
    category: 'niche',
    imageSrc: '/portfolio/niche_07.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1100×2000 мм',
    description: 'Две распашные створки с центральным магнитным замком под 180° обеспечивают максимальный входной проем.',
    featured: false,
  },
  {
    id: 'niche_08',
    title: 'Высокая дверь в нишу под потолок со скрытым крепежом',
    category: 'niche',
    imageSrc: '/portfolio/niche_08.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Оружейная сталь',
    approxDimensions: '900×2250 мм',
    description: 'Увеличенная высота полотна 2250 мм, выверенный зазор 2 мм по периметру и верхняя фрамуга.',
    featured: false,
  },

  // --- Bath screens (6 items) ---
  {
    id: 'bath_01',
    title: 'Поворотная шторка на ванну 180° в брашированном золоте',
    category: 'bath_screen',
    imageSrc: '/portfolio/bath_01.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '1000×1500 мм',
    description: 'Створка плавно поворачивается к стене или наружу благодаря поворотной петле с подъемно-опускным механизмом.',
    featured: true,
  },
  {
    id: 'bath_02',
    title: 'Стационарная перегородка на ванну в черном профиле',
    category: 'bath_screen',
    imageSrc: '/portfolio/bath_02.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '800×1500 мм',
    description: 'Надежная защита пола от брызг во время приема душа, герметичный силиконовый шов на борту ванны.',
    featured: false,
  },
  {
    id: 'bath_03',
    title: 'Раздвижная двухсекционная шторка на борт ванны',
    category: 'bath_screen',
    imageSrc: '/portfolio/bath_03.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1600×1500 мм',
    description: 'Превращает классическую ванну в полноценную закрытую душевую кабину без риска перелива воды.',
    featured: true,
  },
  {
    id: 'bath_04',
    title: 'Шторка на ванну Estriado с полотенцедержателем',
    category: 'bath_screen',
    imageSrc: '/portfolio/bath_04.jpg',
    glassType: 'Рифленое Estriado 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '900×1550 мм',
    description: 'Эргономичная длинная ручка выполняет роль полотенцедержателя с наружной стороны ванны.',
    featured: false,
  },
  {
    id: 'bath_05',
    title: 'Складная шторка-гармошка на борт ванны',
    category: 'bath_screen',
    imageSrc: '/portfolio/bath_05.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1100×1450 мм',
    description: 'Две складывающиеся створки полностью убираются к стене, не загромождая доступ к ванне.',
    featured: false,
  },
  {
    id: 'bath_06',
    title: 'Стационарный экран на ванну со скругленным углом',
    category: 'bath_screen',
    imageSrc: '/portfolio/bath_06.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '850×1500 мм',
    description: 'Безопасный полированный радиус R100 на верхнем наружном углу защищает от случайных ударов.',
    featured: false,
  },

  // --- Pentagonal / Trapezoid 135° (4 items) ---
  {
    id: 'trapezoid_01',
    title: 'Пятиугольная трапеция 135° с золотыми петлями',
    category: 'trapezoid',
    imageSrc: '/portfolio/trapezoid_01.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '950×950×2000 мм (135°)',
    description: 'Эксклюзивная трапециевидная кабина со скошенным входом под 135°, две глухие боковые панели и центральная распашная дверь.',
    featured: true,
  },
  {
    id: 'trapezoid_02',
    title: 'Трапеция 135° в черном матовом исполнении',
    category: 'trapezoid',
    imageSrc: '/portfolio/trapezoid_02.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Черный матовый',
    approxDimensions: '900×900×2000 мм (135°)',
    description: 'Черные магнитные уплотнители 135° гарантируют сухость пола за пределами кабины при прямом напоре воды.',
    featured: false,
  },
  {
    id: 'trapezoid_03',
    title: 'Кабина-трапеция Optiwhite с хромированными штангами',
    category: 'trapezoid',
    imageSrc: '/portfolio/trapezoid_03.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Полированный хром',
    approxDimensions: '1000×1000×2050 мм (135°)',
    description: 'Две диагональные штанги жесткости под углом 45° к стене обеспечивают абсолютную монолитность конструкции.',
    featured: false,
  },
  {
    id: 'trapezoid_04',
    title: 'Премиальная трапеция Графит с фурнитурой Gunmetal',
    category: 'trapezoid',
    imageSrc: '/portfolio/trapezoid_04.jpg',
    glassType: 'Тонированное Графит 8 мм',
    hardwareFinish: 'Оружейная сталь',
    approxDimensions: '1050×1050×2100 мм (135°)',
    description: 'Эффектное сочетание темного зеркального стекла и фурнитуры Gunmetal с гравированной ручкой-кнобом.',
    featured: true,
  },

  // --- LED Mirrors (6 items) ---
  {
    id: 'mirror_01',
    title: 'Дизайнерское LED-зеркало с двойным контуром свечения',
    category: 'mirror',
    imageSrc: '/portfolio/mirror_01.jpg',
    glassType: 'Влагостойкое полотно AGC Mirox 4 мм',
    hardwareFinish: 'Скрытый монтаж',
    approxDimensions: '1000×800 мм',
    description: 'Фронтальная подсветка лица и мягкий фоновый ореол Ambilight на стену, сенсорное включение с диммером яркости.',
    featured: true,
  },
  {
    id: 'mirror_02',
    title: 'Круглое зеркало с теплой подсветкой и антизапотеванием',
    category: 'mirror',
    imageSrc: '/portfolio/mirror_02.jpg',
    glassType: 'Серебряное полотно Mirox 4 мм',
    hardwareFinish: 'Скрытый монтаж',
    approxDimensions: 'Ø 800 мм',
    description: 'Встроенный нагревательный мат исключает запотевание зеркала даже при самом горячем душе.',
    featured: false,
  },
  {
    id: 'mirror_03',
    title: 'Прямоугольное зеркало в тонкой черной алюминиевой раме',
    category: 'mirror',
    imageSrc: '/portfolio/mirror_03.jpg',
    glassType: 'Влагостойкое зеркало 4 мм',
    hardwareFinish: 'Черный анодированный алюминий',
    approxDimensions: '700×1100 мм',
    description: 'Тонкий кант 10 мм из анодированного алюминия и нейтральная подсветка 4000K с высоким индексом цветопередачи CRI>95.',
    featured: false,
  },
  {
    id: 'mirror_04',
    title: 'Овальное зеркало с нейтральной LED-подсветкой',
    category: 'mirror',
    imageSrc: '/portfolio/mirror_04.jpg',
    glassType: 'Осветленное серебряное полотно',
    hardwareFinish: 'Скрытый крепеж',
    approxDimensions: '600×1000 мм',
    description: 'Изящная форма капсулы, полированный еврофацет по контуру и бесконтактный датчик на взмах руки.',
    featured: false,
  },
  {
    id: 'mirror_05',
    title: 'Зеркальное панно во всю стену со скрытой подсветкой',
    category: 'mirror',
    imageSrc: '/portfolio/mirror_05.jpg',
    glassType: 'Влагостойкое зеркало AGC 5 мм',
    hardwareFinish: 'Алюминиевый каркас',
    approxDimensions: '1400×900 мм',
    description: 'Широкое зеркало визуально удваивает объем ванной комнаты, безопасная армирующая пленка с обратной стороны.',
    featured: false,
  },
  {
    id: 'mirror_06',
    title: 'Капсульное зеркало в брашированной золотой раме',
    category: 'mirror',
    imageSrc: '/portfolio/mirror_06.jpg',
    glassType: 'Серебряное полотно Mirox',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '600×1200 мм',
    description: 'Латунный корпус с благородным матовым блеском, встроенные электронные часы и сенсорная регулировка температуры света.',
    featured: true,
  },

  // --- Loft & Architectural Glass (6 items) ---
  {
    id: 'loft_01',
    title: 'Лофт-перегородка с черной геометрической раскладкой',
    category: 'loft',
    imageSrc: '/portfolio/loft_01.jpg',
    glassType: 'Прозрачное закаленное 8 мм',
    hardwareFinish: 'Черный матовый лофт',
    approxDimensions: '1200×2100 мм',
    description: 'Стильная раскладка из алюминиевых профилей на стекле с термоустойчивой порошковой окраской шероховатой текстуры.',
    featured: true,
  },
  {
    id: 'loft_02',
    title: 'Угловая кабина в стиле лофт с матовым сатинатом',
    category: 'loft',
    imageSrc: '/portfolio/loft_02.jpg',
    glassType: 'Матовое сатинат (Matelux) 8 мм',
    hardwareFinish: 'Черный матовый профиль',
    approxDimensions: '900×900×2050 мм',
    description: 'Индустриальный характер конструкции гармонично сочетается с бетонными и кирпичными текстурами стен.',
    featured: false,
  },
  {
    id: 'loft_03',
    title: 'Стеклянное ограждение лестницы и атриума из триплекса',
    category: 'loft',
    imageSrc: '/portfolio/loft_03.jpg',
    glassType: 'Закаленный триплекс 8+8 мм',
    hardwareFinish: 'Черная матовая сталь',
    approxDimensions: 'Индивидуальный проект',
    description: 'Высокопрочный триплекс с полированными кромками на массивных точечных коннекторах из нержавеющей стали.',
    featured: false,
  },
  {
    id: 'loft_04',
    title: 'Душевая перегородка Industrial с рифленым стеклом',
    category: 'loft',
    imageSrc: '/portfolio/loft_04.jpg',
    glassType: 'Рифленое Estriado 8 мм',
    hardwareFinish: 'Черный матовый лофт',
    approxDimensions: '1000×2100 мм',
    description: 'Контраст брутального черного металла и утонченного фактурного стекла с винтажным шармом.',
    featured: true,
  },
  {
    id: 'loft_05',
    title: 'Раздвижная амбарная стеклянная дверь в ванную',
    category: 'loft',
    imageSrc: '/portfolio/loft_05.jpg',
    glassType: 'Тонированное Графит 8 мм',
    hardwareFinish: 'Черный кованый металл',
    approxDimensions: '900×2200 мм',
    description: 'Подвесная система Barn Door с открытыми колесными роликами диаметром 120 мм и плавным ходом полотна.',
    featured: false,
  },
  {
    id: 'loft_06',
    title: 'Тонкопрофильное зонирование санузла прозрачным стеклом',
    category: 'loft',
    imageSrc: '/portfolio/loft_06.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Черный матовый алюминий',
    approxDimensions: '1100×2000 мм',
    description: 'Узкий пристенный профиль шириной всего 12 мм создает ощущение невесомости стеклянной стены.',
    featured: false,
  },

  // --- Showcase & Detail Highlights (6 items) ---
  {
    id: 'hero_optiwhite_gold',
    title: 'Флагманский проект: Кабина Optiwhite с золотой фурнитурой',
    category: 'corner',
    imageSrc: '/portfolio/hero_optiwhite_gold.jpg',
    glassType: 'Осветленное Optiwhite 8 мм',
    hardwareFinish: 'Брашированное золото',
    approxDimensions: '1000×1000×2050 мм',
    description: 'Образцовая угловая душевая кабина с распашной дверью, изготовленная на заказ по индивидуальным размерам для ЖК «Символ».',
    featured: true,
  },
  {
    id: 'boheme_hardware',
    title: 'Премиальный комплект фурнитуры Boheme Milano (Италия)',
    category: 'corner',
    imageSrc: '/portfolio/boheme_hardware.jpg',
    glassType: 'Закаленное стекло 8-10 мм',
    hardwareFinish: 'Boheme Milano Золото',
    approxDimensions: 'Фурнитурный узел',
    description: 'Итальянская цельнолитая латунь с многослойным износостойким PVD-напылением цвета благородное золото.',
    featured: true,
  },
  {
    id: 'vetro_atelier',
    title: 'Инженерный контроль монтажа: лазерное нивелирование VETRO',
    category: 'walkin',
    imageSrc: '/portfolio/vetro_philosophy_atelier.jpg',
    glassType: 'Осветленное Optiwhite 10 мм',
    hardwareFinish: 'Инженерный монтаж VETRO',
    approxDimensions: 'Контроль геометрии проема',
    description: 'Лазерное сканирование стен, ювелирная подгонка к уклону плитки с допуском менее 0.5 мм и гарантия 5 лет по договору.',
    featured: true,
  },
  {
    id: 'detail_roller',
    title: 'Усиленный роликовый механизм из нержавеющей стали AISI 304',
    category: 'sliding',
    imageSrc: '/portfolio/detail_roller.jpg',
    glassType: 'Бесшумный роликовый механизм',
    hardwareFinish: 'Нержавеющая сталь / Хром',
    approxDimensions: 'Диаметр ролика 55 мм',
    description: 'Японские влагозащищенные подшипники качения обеспечивают свыше 100 000 циклов плавного открывания.',
    featured: false,
  },
  {
    id: 'detail_stabilizer',
    title: 'Регулируемая штанга-стабилизатор с поворотным шарниром',
    category: 'walkin',
    imageSrc: '/portfolio/detail_stabilizer.jpg',
    glassType: 'Элемент стабилизации',
    hardwareFinish: 'Нержавеющая сталь / Хром',
    approxDimensions: 'Длина до 1200 мм',
    description: 'Шарнирное крепление позволяет фиксировать стабилизационную штангу под любым произвольным углом от 30° до 90° к стене.',
    featured: false,
  },
  {
    id: 'detail_aquastop',
    title: 'Магнитный силиконовый уплотнитель и водоотбойный порожек',
    category: 'corner',
    imageSrc: '/portfolio/detail_aquastop.jpg',
    glassType: 'Уплотнительные элементы',
    hardwareFinish: 'Прозрачный силикон + магнит',
    approxDimensions: 'Защита от протечек',
    description: 'Эластичные силиконовые профили с защитой от ультрафиолета не желтеют со временем и обеспечивают 100% герметичность.',
    featured: false,
  },
];

/**
 * Returns human-readable label in Russian for a cabin category.
 */
export function getCabinCategoryLabel(category: CabinCategory): string {
  switch (category) {
    case 'all':
      return 'Все работы';
    case 'corner':
      return 'Угловые 90°';
    case 'walkin':
      return 'Перегородки Walk-In';
    case 'niche':
      return 'Двери в нишу';
    case 'sliding':
      return 'Раздвижные системы';
    case 'bath_screen':
      return 'Шторки на ванну';
    case 'trapezoid':
      return 'Трапеции 135°';
    case 'mirror':
      return 'Зеркала с LED';
    case 'loft':
      return 'Черный лофт';
    default:
      return 'Все работы';
  }
}

/**
 * Returns portfolio items marked as featured for showcase blocks.
 */
export function getFeaturedItems(): PortfolioItem[] {
  return portfolioItems.filter((item) => item.featured === true);
}

/**
 * Returns portfolio items filtered by category.
 */
export function getItemsByCategory(category: CabinCategory): PortfolioItem[] {
  if (category === 'all') {
    return portfolioItems;
  }
  return portfolioItems.filter((item) => item.category === category);
}

export interface CategoryFilterOption {
  id: CabinCategory;
  label: string;
  count: number;
}

/**
 * Returns array of category tabs with counts for the portfolio filter bar.
 */
export function getCategoryFilterOptions(): CategoryFilterOption[] {
  const categories: CabinCategory[] = [
    'all',
    'corner',
    'walkin',
    'sliding',
    'niche',
    'bath_screen',
    'trapezoid',
    'mirror',
    'loft',
  ];

  return categories.map((cat) => ({
    id: cat,
    label: getCabinCategoryLabel(cat),
    count: cat === 'all' ? portfolioItems.length : portfolioItems.filter((i) => i.category === cat).length,
  }));
}
