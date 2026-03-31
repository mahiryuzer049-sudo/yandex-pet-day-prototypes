import type { LandingVariant, SharedConferenceContent } from "@/features/landing/types";
import { fixTypographyDeep } from "@/utils/typography";

const rawConferenceContent: SharedConferenceContent = {
  eventSlug: "yandex-pet-day-2025",
  eventTitle: "Yandex Pet Day",
  heroSummary:
    "Yandex Pet Day — конференция Яндекс Крауда для продактов, дизайнеров и разработчиков pet-tech рынка.",
  heroMeta: [
    {
      id: "date",
      icon: "Дата",
      title: "20 июня 2025",
      description: "Пятница",
    },
    {
      id: "start",
      icon: "Старт",
      title: "11:00",
      description: "Сбор гостей с 10:00",
    },
    {
      id: "location",
      icon: "Площадка",
      title: "Академия",
      description: "Ленинградский проспект 36, Москва",
    },
    {
      id: "format",
      icon: "Формат",
      title: "Офлайн и онлайн",
      description: "Одна программа для всех участников",
    },
  ],
  stats: [
    { id: "days", value: "1", label: "день концентрированного контента" },
    { id: "speakers", value: "3", label: "спикера из дизайна, AI и бизнеса" },
    { id: "formats", value: "2", label: "формата участия без лишнего трения" },
    { id: "slots", value: "8", label: "ключевых слотов программы и нетворкинга" },
  ],
  features: [
    {
      id: "format",
      index: "01",
      title: "Выбрать удобный формат участия",
      description: "Прийти лично в Москву или подключиться к онлайн-трансляции без потери смысла программы.",
    },
    {
      id: "contacts",
      index: "02",
      title: "Завязать новые полезные знакомства",
      description: "Познакомиться с людьми pet-индустрии: продактами, дизайнерами, маркетологами, владельцами сервисов и командами роста.",
    },
    {
      id: "mechanics",
      index: "03",
      title: "Получить практические инструменты для роста",
      description: "Увидеть реальные кейсы и унести готовые механики, которые можно применить в продукте уже после конференции.",
    },
  ],
  schedule: [
    {
      id: "coffee",
      time: "10:00 - 10:30",
      type: "Нетворкинг",
      title: "Приветственный кофе и нетворкинг",
      description: "Первый живой контакт с участниками и партнерами конференции. Только офлайн.",
    },
    {
      id: "intro",
      time: "11:00 - 11:30",
      type: "Открытие",
      title: "Вводное слово",
      description: "Старт дня, рамка конференции и ключевые темы для всей pet-tech-повестки.",
    },
    {
      id: "vision",
      time: "11:30 - 12:10",
      type: "Доклад",
      title: "Компьютерное зрение в ветеринарии",
      description: "Андрей Соколов, Head of Product Design, Яндекс",
    },
    {
      id: "zoomorphism",
      time: "12:10 - 12:50",
      type: "Доклад",
      title: "Зооморфизм как драйвер лояльности",
      description: "Мария Подольская, Head of AI, Лаборатория инноваций",
    },
    {
      id: "break",
      time: "12:50 - 13:10",
      type: "Перерыв",
      title: "Перерыв",
      description: "Небольшая пауза перед бизнес-блоком и дискуссией.",
    },
    {
      id: "growth",
      time: "13:10 - 13:40",
      type: "Доклад",
      title: "От стартапа до маркетплейса №1: ошибки и победы",
      description: "Павел Сидоров, CEO, маркетплейс зоотоваров «Зоо-Маркет»",
    },
    {
      id: "panel",
      time: "13:40 - 15:00",
      type: "Дискуссия",
      title: "Инвестиции в Pet-технологии: пузырь или новая нефть?",
      description: "Панельная дискуссия про масштаб рынка, инвестиции, риски и точки роста pet-tech.",
    },
    {
      id: "networking",
      time: "15:00 - 16:30",
      type: "Нетворкинг",
      title: "Финальный нетворкинг",
      description: "Завершающий блок для общения, знакомств и неформального обмена идеями.",
    },
  ],
  speakers: [
    {
      id: "sokolov",
      initials: "АС",
      name: "Андрей Соколов",
      role: "Head of Product Design, Яндекс",
      description: "Говорит о компьютерном зрении в ветеринарии и о том, как технологии переходят в прикладную ценность для pet-сервисов.",
      accent: "red",
    },
    {
      id: "podolskaya",
      initials: "МП",
      name: "Мария Подольская",
      role: "Head of AI, Лаборатория инноваций",
      description: "Разбирает, почему зооморфизм в интерфейсах работает не как декор, а как часть удержания и лояльности.",
      accent: "gold",
    },
    {
      id: "sidorov",
      initials: "ПС",
      name: "Павел Сидоров",
      role: "CEO, маркетплейс зоотоваров «Зоо-Маркет»",
      description: "Показывает путь от стартапа до маркетплейса №1 и честно говорит об ошибках, росте и зрелости продукта.",
      accent: "ink",
    },
  ],
  formats: [
    {
      id: "offline",
      label: "Офлайн",
      title: "Москва, Академия",
      description: "Ленинградский проспект 36. Живой контакт со спикерами, нетворкинг и ощущение события в реальном пространстве.",
      bullets: [
        "Приветственный кофе и нетворкинг",
        "Личное общение после программы",
        "Максимальная плотность контактов за один день",
      ],
    },
    {
      id: "online",
      label: "Онлайн",
      title: "Трансляция на почту",
      description: "Подойдет, если важнее содержание, чем поездка. Ссылку на трансляцию отправим за час до старта конференции.",
      bullets: [
        "Доступ из любой точки",
        "Подключение без логистики и дороги",
        "Материалы и записи после события",
      ],
    },
  ],
  faqs: [
    {
      id: "audience",
      question: "Кому точно стоит прийти на конференцию?",
      answer:
        "Владельцам и сотрудникам digital-продуктов в сфере зообизнеса: маркетплейсы, ветклиники, приложения для груминга, зоомагазины и агрегаторы. А также маркетологам, продактам, дизайнерам и разработчикам, которые хотят зайти в этот быстрорастущий рынок или масштабировать свои проекты.",
    },
    {
      id: "pets",
      question: "Я могу прийти с питомцем?",
      answer:
        "Да, если выбираете офлайн-формат. Мы организуем специальную зону для животных с водой, мисками и необходимыми принадлежностями. Но убедительная просьба: убедитесь, что питомец социализирован и комфортно чувствует себя в обществе людей и других животных. О наличии питомца нужно предупредить заранее при регистрации.",
    },
    {
      id: "recording",
      question: "Будет ли запись докладов для онлайн-участников?",
      answer:
        "Обязательно. Все зарегистрированные участники, и офлайн, и онлайн, получат доступ к видеозаписям, презентациям спикеров и текстовым расшифровкам в течение 3 дней после конференции. Доступ остается у вас навсегда.",
    },
    {
      id: "travel",
      question: "Я из другого города. Есть ли смысл ехать в Москву или достаточно онлайн?",
      answer:
        "Зависит от ваших целей. Если вам нужны исключительно знания и контент, онлайн-формата достаточно. Если вы ищете партнеров, инвесторов, хотите вживую пообщаться с лидерами рынка и почувствовать комьюнити — приезжайте. Офлайн-участников ждет закрытый бизнес-завтрак и неформальное общение после основной программы.",
    },
    {
      id: "certificate",
      question: "Будут ли сертификаты или другие документы об участии?",
      answer:
        "Да, все участники, онлайн и офлайн, получают именной сертификат участника конференции.",
    },
  ],
  registrationBenefits: [
    "Подтверждение участия на почту",
    "Записи и материалы после конференции",
    "Офлайн и онлайн без отдельной сложной логики",
  ],
};

export const conferenceContent: SharedConferenceContent = fixTypographyDeep(rawConferenceContent);

const rawLandingVariants: Record<"variant-a" | "variant-b", LandingVariant> = {
  "variant-a": {
    id: "variant-a",
    shortLabel: "Variant A",
    conceptTitle: "Humane Tech",
    href: "/variant-a",
    alternateHref: "/variant-b",
    alternateLabel: "Variant B",
    seoDescription:
      "Variant A for Yandex Pet Day: a clean, structured and warm conference landing page on Next.js.",
    eyebrow: "Конференция о pet-tech, AI и пользовательском опыте",
    registrationButtonLabel: "Зарегистрироваться",
    headerNav: [
      { label: "О конференции", href: "#about" },
      { label: "Программа", href: "#program" },
      { label: "Спикеры", href: "#speakers" },
      { label: "Вопросы", href: "#faq" },
      { label: "Регистрация", href: "#registration" },
    ],
    footerCopy:
      "Конференция Яндекс Крауда для продактов, дизайнеров и разработчиков pet-tech рынка. Москва и онлайн, 20 июня 2025.",
    hubCard: {
      badge: "Variant A",
      title: "Humane Tech",
      summary:
        "Чистый, системный, брендово-точный лендинг с теплым pet-характером. Главный акцент на доверии, UX-ясности и сильной структуре.",
      points: [
        { id: "a-1", label: "Светлая технологичная база" },
        { id: "a-2", label: "Крупная типографика и ясная сетка" },
        { id: "a-3", label: "Теплые акценты без инфантильности" },
      ],
    },
    theme: {
      "--page-bg": "linear-gradient(180deg, #ffffff 0%, #ffffff 72%, #f7f8fa 100%)",
      "--page-alt": "linear-gradient(180deg, #101114 0%, #16181d 100%)",
      "--surface": "#ffffff",
      "--surface-strong": "#ffffff",
      "--text-strong": "#111216",
      "--text-muted": "#5f646f",
      "--hairline": "rgba(17, 18, 22, 0.1)",
      "--accent": "#fc3f1d",
      "--accent-strong": "#e13415",
      "--accent-hover": "#e8361a",
      "--accent-soft": "rgba(252, 63, 29, 0.08)",
      "--shadow": "0 24px 64px rgba(17, 18, 22, 0.08)",
      "--header-bg": "rgba(255, 255, 255, 0.94)",
      "--cta-bg": "linear-gradient(135deg, rgba(252, 63, 29, 0.08), rgba(255, 255, 255, 1))",
    },
  },
  "variant-b": {
    id: "variant-b",
    shortLabel: "Variant B",
    conceptTitle: "Pet Future Editorial",
    href: "/variant-b",
    alternateHref: "/variant-a",
    alternateLabel: "Variant A",
    seoDescription:
      "Variant B for Yandex Pet Day: an editorial and art-directed landing page on Next.js with a bold visual rhythm.",
    eyebrow: "Moscow / Offline + Online / 20 June 2025",
    registrationButtonLabel: "Зарегистрироваться",
    headerNav: [
      { label: "Зачем идти", href: "#story" },
      { label: "Программа", href: "#program" },
      { label: "Спикеры", href: "#speakers" },
      { label: "Форматы", href: "#formats" },
      { label: "Регистрация", href: "#registration" },
    ],
    footerCopy: "Variant B как более смелый editorial-концепт для сравнения с основным вариантом.",
    hubCard: {
      badge: "Variant B",
      title: "Pet Future Editorial",
      summary:
        "Более дерзкий и арт-директed подход с редакционной драматургией, контрастными секциями и более запоминающейся подачей.",
      points: [
        { id: "b-1", label: "Сильнее wow-эффект и характер" },
        { id: "b-2", label: "Асимметрия и editorial rhythm" },
        { id: "b-3", label: "Более смелая композиция блоков" },
      ],
    },
    theme: {
      "--page-bg":
        "radial-gradient(circle at top right, rgba(252, 63, 29, 0.18), transparent 22%), radial-gradient(circle at bottom left, rgba(201, 138, 46, 0.14), transparent 18%), linear-gradient(180deg, #0f1114 0%, #17191d 100%)",
      "--page-alt": "rgba(255, 255, 255, 0.03)",
      "--surface": "rgba(255, 255, 255, 0.05)",
      "--surface-strong": "#17191d",
      "--text-strong": "#f5f1ea",
      "--text-muted": "rgba(245, 241, 234, 0.72)",
      "--hairline": "rgba(255, 255, 255, 0.1)",
      "--accent": "#fc3f1d",
      "--accent-strong": "#ff5b3b",
      "--accent-hover": "#e8361a",
      "--accent-soft": "rgba(252, 63, 29, 0.18)",
      "--shadow": "0 30px 90px rgba(0, 0, 0, 0.34)",
      "--header-bg": "rgba(16, 18, 22, 0.78)",
      "--cta-bg": "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(252, 63, 29, 0.16))",
    },
  },
};

export const landingVariants: Record<"variant-a" | "variant-b", LandingVariant> =
  fixTypographyDeep(rawLandingVariants);
