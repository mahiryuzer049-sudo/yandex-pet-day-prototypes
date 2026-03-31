import type { ReactNode } from "react";

import Image from "next/image";

import { FaqList } from "@/features/landing/components/FaqList";
import { RegistrationForm } from "@/features/landing/components/RegistrationForm";
import type { FigmaExportState, LandingVariant, SharedConferenceContent } from "@/features/landing/types";
import { fixTypography, fixTypographyDeep } from "@/utils/typography";
import styles from "@/features/landing/landing.module.css";

interface VariantSectionsProps {
  content: SharedConferenceContent;
  exportState?: FigmaExportState;
  renderMode?: "default" | "figma";
  variant: LandingVariant;
}

const heroFacts = fixTypographyDeep([
  { id: "date", label: "Дата и старт", value: "20 июня 2025, 11:00", note: "Сбор гостей начинается с 10:00" },
  { id: "venue", label: "Площадка", value: "Академия, Москва", note: "Ленинградский проспект 36" },
  { id: "format", label: "Формат", value: "Офлайн и онлайн", note: "Одна программа для всех участников" },
]);

const numberMoments = fixTypographyDeep([
  { id: "day", value: "1", label: "день", note: "Одна сцена. Понятный маршрут без параллельных треков." },
  { id: "formats", value: "2", label: "формата", note: "Приехать в Москву или подключиться онлайн — программа одна." },
  { id: "talks", value: "3", label: "доклада", note: "Три доклада, дискуссия и время на разговор после." },
]);

const heroEyebrowMeta = fixTypography("20 июня 2025 · Москва + онлайн");
const heroLeadEditorial = fixTypography("Один поток: сильные кейсы, вопросы рынка и разговор по делу.");
const heroLeadFigma = fixTypography("Одна программа без параллельных треков: три сильных доклада, дискуссия и практический разговор о продукте.");
const heroSummaryEditorial = fixTypography("Для продактов, дизайнеров и разработчиков pet-tech рынка. Москва и онлайн, 20 июня.");
const heroSummaryFigma = fixTypography("Один день, один поток и понятный маршрут участия: можно приехать в Москву или подключиться онлайн. После конференции отправим запись и материалы.");
const featureOrder = ["mechanics", "format", "contacts"] as const;

const featureMeta: Record<string, { label: string; icon: "mechanics" | "format" | "contacts" }> = fixTypographyDeep({
  mechanics: { label: "Практический результат", icon: "mechanics" },
  format: { label: "Формат участия", icon: "format" },
  contacts: { label: "Люди рынка", icon: "contacts" },
});

const scheduleMeta: Record<string, string> = fixTypographyDeep({
  coffee: "30 мин",
  intro: "30 мин",
  vision: "40 мин",
  zoomorphism: "40 мин",
  break: "20 мин",
  growth: "30 мин",
  panel: "80 мин",
  networking: "90 мин",
});

const scheduleSpeakerIds: Partial<Record<string, "sokolov" | "podolskaya" | "sidorov">> = {
  vision: "sokolov",
  zoomorphism: "podolskaya",
  growth: "sidorov",
};

const speakerPortraits: Record<string, string> = {
  sokolov: "/variant-a-assets/speaker-andrei-sokolov-portrait-v2.png",
  podolskaya: "/variant-a-assets/speaker-maria-podolskaya-portrait-v2.png",
  sidorov: "/variant-a-assets/speaker-pavel-sidorov-portrait-v2.png",
};

const editorialAssets = {
  heroScene: "/variant-a-assets/hero-scene-editorial-v4.png",
  interludePanel: "/variant-a-assets/interlude-pet-tech-panel-v1.png",
  offlineFormat: "/variant-a-assets/format-offline-editorial-v2.png",
  onlineFormat: "/variant-a-assets/format-online-editorial-v2.png",
  faqMascot: "/variant-a-assets/faq-pet-mascot-v2.png",
} as const;

const scheduleIcons: Record<string, "welcome" | "start" | "vision" | "zoomorphism" | "growth" | "panel" | "networking"> = {
  coffee: "welcome",
  intro: "start",
  vision: "vision",
  zoomorphism: "zoomorphism",
  growth: "growth",
  panel: "panel",
  networking: "networking",
};

const speakerMeta: Record<
  string,
  { label: string; talk: string; thesis: string; company: string; mark: string; tone: "tech" | "design" | "business" }
> = fixTypographyDeep({
  sokolov: {
    label: "Технология и AI",
    talk: "Компьютерное зрение как прикладной сценарий для pet-сервиса",
    thesis: "О том, как технология превращается в полезный продуктовый сценарий для людей и сервисов.",
    company: "Яндекс",
    mark: "Я",
    tone: "tech",
  },
  podolskaya: {
    label: "Дизайн и поведение",
    talk: "Зооморфизм как механизм удержания, узнаваемости и теплоты интерфейса",
    thesis: "О том, когда образ животного действительно помогает продукту работать, а не остается декоративным приемом.",
    company: "Лаборатория",
    mark: "ЛИ",
    tone: "design",
  },
  sidorov: {
    label: "Бизнес и рост",
    talk: "Путь от стартапа до маркетплейса №1 без романтизации и общих слов",
    thesis: "Честный разговор о рынке, ошибках роста и решениях, от которых зависит устойчивость продукта.",
    company: "Зоо-Маркет",
    mark: "ЗМ",
    tone: "business",
  },
});

const formatMeta: Record<string, { mode: string; fit: string; gain: string }> = fixTypographyDeep({
  offline: {
    mode: "Живой контакт",
    fit: "Если важны зал, сцена, быстрые знакомства и разговоры после программы.",
    gain: "Контекст площадки, личные знакомства и возможность продолжить разговор после сцены.",
  },
  online: {
    mode: "Гибкое подключение",
    fit: "Если нужен сам контент без поездки и хочется подключиться из любого города.",
    gain: "Трансляция, материалы после события и участие без лишней логистики.",
  },
});

const faqSignals = fixTypographyDeep([
  { id: "pet", label: "С питомцем", value: "Офлайн-участие с питомцем возможно по предварительному подтверждению после регистрации." },
  { id: "assets", label: "Материалы", value: "Записи, презентации и дополнительные материалы получают все зарегистрированные участники." },
  { id: "confirm", label: "Подтверждение", value: "На почту приходит подтверждение участия, формат и дальнейшие инструкции по событию." },
] as const);

const registrationSteps = fixTypographyDeep([
  { id: "step-1", label: "1. Заявка", value: "Имя, почта и удобный формат участия." },
  { id: "step-2", label: "2. Подтверждение", value: "Сразу отправляем письмо с форматом и короткими инструкциями." },
  { id: "step-3", label: "3. День конференции", value: "Перед стартом напоминаем всё, что нужно для участия." },
]);

function Glyph({ kind }: { kind: "mechanics" | "format" | "contacts" | "faq" | "hero" | "offline" | "online" }) {
  const paths: Record<string, ReactNode> = {
    mechanics: <path d="M32 14a9 9 0 0 1 8.7 6.8l5 1.3 1.8 4.5-3.3 4 1 5.2-3.8 3.1-5-1.4L32 42l-4.3-4.6-5 1.4-3.8-3.1 1-5.2-3.3-4 1.8-4.5 5-1.3A9 9 0 0 1 32 14Z" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />,
    format: <path d="M12 21h18m-18 0 7-7m-7 7 7 7M52 43H34m18 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />,
    contacts: <path d="M10 48c2.7-6.7 8.3-10 16.8-10 8.5 0 14.1 3.3 16.7 10M22 24a8 8 0 1 0 0 .1Zm20 0a8 8 0 1 0 0 .1Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />,
    faq: (
      <>
        <circle cx="110" cy="110" r="92" fill="#fff" />
        <path d="M62 88 92 62l18 28M158 88l-30-26-18 28M84 108a10 10 0 1 0 0 .1Zm52 0a10 10 0 1 0 0 .1ZM93 146c10 8 21 12 33 12s23-4 33-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="164" cy="54" r="28" fill="#FC3F1D" />
        <path d="M164 42v22M164 72h.01" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      </>
    ),
    hero: (
      <>
        <rect x="18" y="18" width="444" height="284" rx="28" fill="#F2F5F9" />
        <rect x="252" y="42" width="160" height="96" rx="18" fill="#111216" />
        <circle cx="332" cy="90" r="34" fill="#FC3F1D" />
        <ellipse cx="332" cy="102" rx="18" ry="16" fill="#fff" />
        <circle cx="311" cy="78" r="6" fill="#fff" />
        <circle cx="332" cy="66" r="6" fill="#fff" />
        <circle cx="353" cy="78" r="6" fill="#fff" />
        <rect x="72" y="150" width="228" height="70" rx="18" fill="#111216" />
        <rect x="266" y="150" width="128" height="22" rx="11" fill="#111216" />
        <rect x="106" y="236" width="42" height="28" rx="14" fill="#D9DEE5" />
        <rect x="160" y="228" width="48" height="36" rx="18" fill="#FC3F1D" />
        <rect x="220" y="236" width="42" height="28" rx="14" fill="#D9DEE5" />
        <rect x="274" y="228" width="48" height="36" rx="18" fill="#FC3F1D" fillOpacity=".86" />
        <rect x="334" y="236" width="42" height="28" rx="14" fill="#D9DEE5" />
      </>
    ),
    offline: (
      <>
        <rect x="24" y="24" width="432" height="232" rx="28" fill="#0F1114" />
        <rect x="300" y="60" width="96" height="62" rx="16" fill="#FC3F1D" />
        <rect x="314" y="74" width="68" height="22" rx="11" fill="#fff" />
        <rect x="86" y="166" width="44" height="32" rx="14" fill="#E7EBF0" />
        <rect x="142" y="158" width="48" height="40" rx="18" fill="#E7EBF0" />
        <rect x="202" y="166" width="44" height="32" rx="14" fill="#E7EBF0" />
        <rect x="258" y="158" width="48" height="40" rx="18" fill="#FC3F1D" />
        <rect x="318" y="166" width="44" height="32" rx="14" fill="#E7EBF0" />
        <rect x="118" y="214" width="220" height="8" rx="4" fill="#272B34" />
      </>
    ),
    online: (
      <>
        <rect x="24" y="24" width="432" height="232" rx="28" fill="#0F1114" />
        <rect x="108" y="72" width="200" height="118" rx="18" fill="#E7EBF0" />
        <rect x="132" y="92" width="152" height="70" rx="14" fill="#FC3F1D" />
        <rect x="154" y="108" width="42" height="30" rx="10" fill="#fff" />
        <rect x="210" y="108" width="54" height="10" rx="5" fill="#fff" fillOpacity=".72" />
        <rect x="210" y="126" width="36" height="10" rx="5" fill="#fff" fillOpacity=".72" />
        <path d="M334 92h26M326 154h34M342 76c0-8 6-14 14-14s14 6 14 14" stroke="#FC3F1D" strokeWidth="6" strokeLinecap="round" />
      </>
    ),
  };

  const viewBox = kind === "faq" ? "0 0 220 220" : kind === "hero" || kind === "offline" || kind === "online" ? "0 0 480 320" : "0 0 64 64";

  return (
    <svg aria-hidden="true" fill="none" viewBox={viewBox}>
      {paths[kind]}
    </svg>
  );
}

function ScheduleIcon({ kind }: { kind: "welcome" | "start" | "vision" | "zoomorphism" | "growth" | "panel" | "networking" }) {
  const icons: Record<string, ReactNode> = {
    welcome: <path d="M6 16h20M16 6v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    start: <path d="M7 24V8l12 3.5L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    vision: <path d="M3 16c3.2-4.7 7.2-7 13-7 5.8 0 9.8 2.3 13 7-3.2 4.7-7.2 7-13 7-5.8 0-9.8-2.3-13-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    zoomorphism: <path d="M8 23V9l5 4 3-6 3 6 5-4v14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    growth: <path d="M6 24h20M9 20l5-6 4 3 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    panel: <path d="M6 10h8v8H8l-2 2v-10Zm12 4h8v8h-6l-2 2V14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    networking: <path d="M9 22c1.4-3.3 3.8-5 7.1-5 3.3 0 5.8 1.7 7.2 5M10.5 12.5a3 3 0 1 0 0 .1Zm11 0a3 3 0 1 0 0 .1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  };

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
      {icons[kind]}
    </svg>
  );
}

function FaqSignalIcon({ kind }: { kind: "pet" | "assets" | "confirm" }) {
  const icons: Record<string, ReactNode> = {
    pet: <path d="M10 20c0-3 2.2-5.2 5-5.2 2.3 0 4.2 1.3 5 3.3.8-2 2.7-3.3 5-3.3 2.8 0 5 2.2 5 5.2 0 5.2-4.7 8.8-10 12-5.3-3.2-10-6.8-10-12ZM10 10.5a2.5 2.5 0 1 0 0 .1Zm6-3a2.5 2.5 0 1 0 0 .1Zm6 3a2.5 2.5 0 1 0 0 .1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    assets: (
      <>
        <rect x="6" y="7" width="20" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M12 13h8M12 17h8M12 21h5M26 22l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    confirm: (
      <>
        <path d="M6 11.5 18 20l12-8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="8" width="28" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="m13 18 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 36 36">
      {icons[kind]}
    </svg>
  );
}

function getFeatureCardClass(id: string) {
  if (id === "mechanics") return `${styles.valueCardA} ${styles.valueCardPrimaryA} ${styles.valueCardWarmA}`;
  if (id === "contacts") return `${styles.valueCardA} ${styles.valueCardMutedA}`;
  return `${styles.valueCardA} ${styles.valueCardTintA}`;
}

function getSpeakerToneClass(tone: "tech" | "design" | "business") {
  if (tone === "tech") return `${styles.speakerEditorialCardA} ${styles.speakerToneTechA}`;
  if (tone === "design") return `${styles.speakerEditorialCardA} ${styles.speakerToneDesignA}`;
  return `${styles.speakerEditorialCardA} ${styles.speakerToneBusinessA}`;
}

function getSpeakerAccentClass(tone: "tech" | "design" | "business") {
  if (tone === "tech") return styles.speakerAccentTechA;
  if (tone === "design") return styles.speakerAccentDesignA;
  return styles.speakerAccentBusinessA;
}

function getFaqOpenIndex(faqState: FigmaExportState["faq"], total: number) {
  if (!faqState) {
    return undefined;
  }

  if (faqState === "closed") {
    return null;
  }

  const match = faqState.match(/^open-(\d+)$/);

  if (!match) {
    return undefined;
  }

  const index = Number(match[1]) - 1;

  if (!Number.isInteger(index) || index < 0 || index >= total) {
    return undefined;
  }

  return index;
}

export function VariantASections({ content, exportState, renderMode = "default", variant }: VariantSectionsProps) {
  const t = fixTypography;
  const isFigmaExport = renderMode === "figma";
  const heroLead = isFigmaExport ? heroLeadFigma : heroLeadEditorial;
  const heroSummary = isFigmaExport ? heroSummaryFigma : heroSummaryEditorial;
  const featureMap = new Map(content.features.map((feature) => [feature.id, feature]));
  const speakerMap = new Map(content.speakers.map((speaker) => [speaker.id, speaker]));
  const faqOpenIndex = isFigmaExport ? getFaqOpenIndex(exportState?.faq, content.faqs.length) : undefined;
  const orderedFeatures = featureOrder
    .map((id) => featureMap.get(id))
    .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature));

  return (
    <>
      <section className={`${styles.section} ${styles.hero} ${styles.heroRebuild} ${styles.heroSpectacleA}`} aria-labelledby="hero-title">
        <div className={styles.container}>
          <div className={styles.heroGridA}>
            <div className={styles.heroCopyStack}>
              <div className={styles.heroEyebrowRowA}>
                <span className={styles.heroEyebrowA}>Yandex Pet Day</span>
                <span className={styles.heroEyebrowMetaA}>{heroEyebrowMeta}</span>
              </div>
              <h1 className={`${styles.heroTitle} ${styles.heroTitleRebuild}`} id="hero-title">
                <span className={styles.heroTitleLead}>{t("Один день о том, как")}</span>
                <span className={styles.heroTitleMain}>
                  <span className={styles.heroTitleKeyword}>{t("pet-tech")}</span>
                  <span className={styles.heroTitleRest}>{t("становится зрелым продуктовым рынком.")}</span>
                </span>
              </h1>
              <p className={styles.heroSummaryLeadA}>{heroLead}</p>
              <p className={styles.heroCopy}>
                {heroSummary}
              </p>
              <div className={styles.heroMetaListA}>
                {heroFacts.map((item) => (
                  <article key={item.id} className={styles.heroMetaCardA}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <small>{item.note}</small>
                  </article>
                ))}
              </div>
              <div className={styles.heroActions}>
                <a className={`${styles.button} ${styles.buttonPrimary}`} href="#registration">{variant.registrationButtonLabel}</a>
                <a className={styles.heroActionLink} href="#program">{t("Смотреть программу")}</a>
              </div>
              <p className={styles.heroSupportNoteA}>{t("Участие бесплатное. После конференции отправим запись и материалы.")}</p>
            </div>

            <div className={styles.heroSceneShellA}>
              <div className={styles.heroSceneFrameA}>
                <div className={styles.heroSceneGlyphA}>
                  <Image
                    alt=""
                    className={styles.heroSceneImageA}
                    fill
                    priority
                    sizes="(max-width: 1120px) 100vw, 560px"
                    src={editorialAssets.heroScene}
                  />
                </div>
                <div className={styles.heroSceneCaptionA}>
                  <p>{t("Живой зал, сильные кейсы и разговор без лишнего шума.")}</p>
                  <a className={styles.heroSceneLinkA} href="#program">{t("Открыть программу дня")}</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.numberBandA}>
            <div className={styles.numberBandShellA}>
              <div className={styles.numberBandIntroA}>
                <span className={styles.numberBandKickerA}>{t("Масштаб дня")}</span>
                <p className={styles.numberBandTitleA}>{t("Понятный маршрут дня.")}</p>
              </div>
              <div className={styles.numberGridA}>
                {numberMoments.map((item) => (
                  <article key={item.id} className={styles.numberCardA}>
                    <div className={styles.numberValueWrapA}>
                      <strong className={styles.numberValueA}>{item.value}</strong>
                      <span className={styles.numberLabelA}>{item.label}</span>
                    </div>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="about">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>{t("Вы сможете")}</span>
            <h2 className={styles.sectionTitle}>{t("Что даст участие в Yandex Pet Day.")}</h2>
            <p className={styles.sectionCopy}>{t("Выбрать удобный формат, познакомиться с людьми рынка и унести практические инструменты, которые можно применить в продукте уже после конференции.")}</p>
          </div>
          <div className={styles.valueShowcaseA}>
            {orderedFeatures.map((feature) => {
              const meta = featureMeta[feature.id];
              return (
                <article key={feature.id} className={getFeatureCardClass(feature.id)}>
                  <div className={styles.valueIconA}><Glyph kind={meta.icon} /></div>
                  {feature.id === "mechanics" ? (
                    <div aria-hidden="true" className={styles.valuePrimaryVisualA}>
                      <div className={styles.valuePrimaryMetricA}>
                        <span>{t("Программа дня")}</span>
                        <strong>{t("3 доклада + дискуссия")}</strong>
                      </div>
                      <div className={styles.valuePrimaryChipsA}>
                        <span>AI</span>
                        <span>UX</span>
                        <span>Рынок</span>
                      </div>
                      <div className={styles.valuePrimaryRailA}>
                        <span className={styles.valuePrimaryRailDotA} />
                        <span className={styles.valuePrimaryRailLineA} />
                        <span className={styles.valuePrimaryRailDotA} />
                      </div>
                    </div>
                  ) : null}
                  <span className={styles.valueCardLabelA}>{meta.label}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.altSurface} ${styles.programShowcaseA}`} id="program">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.programDateDisplayA}>20 июня</p>
            <span className={`${styles.sectionLabel} ${styles.sectionLabelOnDark}`}>Программа</span>
            <h2 className={styles.sectionTitle}>{t("Один поток, несколько сильных тем и понятный ритм дня.")}</h2>
            <p className={styles.sectionCopy}>{t("Без параллельных треков: доклады, пауза, дискуссия и время на разговор после сцены.")}</p>
          </div>
          <div className={styles.timeline}>
            {content.schedule.map((item) => {
              const duration = scheduleMeta[item.id];
              const speakerId = scheduleSpeakerIds[item.id];
              const speaker = speakerId ? speakerMap.get(speakerId) : null;
              const speakerSrc = speakerId ? speakerPortraits[speakerId] : null;

              if (item.id === "break") {
                return (
                  <article key={item.id} className={`${styles.timelineItem} ${styles.timelineItemBreak}`} data-type={item.type}>
                    <div className={styles.timelineTimeWrap}>
                      <div className={styles.timelineTime}>{item.time}</div>
                      <span className={styles.timelineDuration}>{duration}</span>
                    </div>
                    <div className={styles.timelineBreakBar}>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </article>
                );
              }

              return (
                <article key={item.id} className={styles.timelineItem} data-type={item.type}>
                  <div className={styles.timelineTimeWrap}>
                    <div className={styles.timelineTime}>{item.time}</div>
                    <span className={styles.timelineDuration}>{duration}</span>
                  </div>
                  <div
                    className={`${styles.timelineCard} ${styles.timelineCardInteractiveA} ${item.id === "panel" ? styles.timelineCardPanel : item.id === "coffee" || item.id === "networking" ? styles.timelineCardCommunity : styles.timelineCardFeatured} ${speaker && speakerSrc ? "" : styles.timelineCardCompactA}`}
                  >
                    <div className={styles.timelineCardTopA}>
                      <span className={styles.timelineTypeA}>
                        <ScheduleIcon kind={scheduleIcons[item.id]} />
                        {item.type}
                      </span>
                      <span className={styles.timelineCardAccentA} aria-hidden="true">
                        <ScheduleIcon kind={scheduleIcons[item.id]} />
                      </span>
                    </div>
                    <h3>{item.title}</h3>
                    {speaker && speakerSrc ? (
                      <div className={styles.timelineSpeakerRowA}>
                        <Image alt={speaker.name} className={styles.timelineSpeakerImageA} height={48} loading="lazy" sizes="48px" src={speakerSrc} width={48} />
                        <span className={styles.timelineSpeakerTextA}>
                          <span className={styles.timelineSpeakerNameA}>{speaker.name}</span>
                          <span className={styles.timelineSpeakerRoleA}>{speaker.role}</span>
                        </span>
                      </div>
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section} id="speakers">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>Спикеры</span>
            <h2 className={styles.sectionTitle}>{t("Три взгляда на один рынок: пользователь, технология и рост.")}</h2>
            <p className={styles.sectionCopy}>{t("Каждый спикер отвечает за свой слой картины: как ведет себя аудитория, что реально уже умеют технологии и где лежит бизнес-результат.")}</p>
          </div>
          <div className={styles.speakerGridA}>
            {content.speakers.map((speaker) => {
              const meta = speakerMeta[speaker.id];
              return (
                <article key={speaker.id} className={getSpeakerToneClass(meta.tone)}>
                  <div className={styles.speakerMediaStageA}>
                    <span className={`${styles.speakerAccentLineA} ${getSpeakerAccentClass(meta.tone)}`} />
                    <div className={styles.speakerPortraitWrapA}>
                      <Image
                        alt={speaker.name}
                        className={styles.speakerPortraitImageA}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 100vw, 33vw"
                        src={speakerPortraits[speaker.id]}
                      />
                    </div>
                    {!isFigmaExport ? (
                      <div className={styles.speakerMetaRowA}>
                        <span className={styles.speakerTopicBadgeA}>{meta.label}</span>
                        <span className={styles.speakerCompanyBadgeA}>
                          <span className={styles.speakerCompanyMarkA}>{meta.mark}</span>
                          {meta.company}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.speakerBodyA}>
                    {isFigmaExport ? (
                      <div className={`${styles.speakerMetaRowA} ${styles.speakerMetaRowExportA}`}>
                        <span className={styles.speakerTopicBadgeA}>{meta.label}</span>
                        <span className={styles.speakerCompanyBadgeA}>
                          <span className={styles.speakerCompanyMarkA}>{meta.mark}</span>
                          {meta.company}
                        </span>
                      </div>
                    ) : null}
                    <h3>{speaker.name}</h3>
                    <p className={styles.speakerRoleA}>{speaker.role}</p>
                    <strong className={styles.speakerTalkA}>{meta.talk}</strong>
                    <p className={styles.speakerThesisA}>{meta.thesis}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.altSurface}`} id="formats">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={`${styles.sectionLabel} ${styles.sectionLabelOnDark}`}>Форматы участия</span>
            <h2 className={styles.sectionTitle}>{t("Выберите удобный формат участия.")}</h2>
            <p className={styles.sectionCopy}>{t("Программа одна и та же: можно приехать лично в Москву или подключиться к онлайн-трансляции.")}</p>
          </div>
          <div className={styles.formatExperienceGridA}>
            {content.formats.map((format) => {
              const meta = formatMeta[format.id];
              const formatCardClassName =
                format.id === "offline"
                  ? `${styles.formatExperienceCardA} ${styles.formatExperienceOfflineA}`
                  : `${styles.formatExperienceCardA} ${styles.formatExperienceOnlineA}`;

              return (
                <article key={format.id} className={formatCardClassName}>
                  <div className={styles.formatIllustrationWrapA}>
                    <Image
                      alt=""
                      className={styles.formatIllustrationImageA}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1120px) 100vw, 520px"
                      src={format.id === "offline" ? editorialAssets.offlineFormat : editorialAssets.onlineFormat}
                    />
                  </div>
                  <div className={styles.formatContentA}>
                    <div className={styles.formatComparisonHeadA}>
                      <div className={styles.formatComparisonTitleWrap}>
                        <span className={styles.formatLabel}>{format.label}</span>
                        <h3 className={format.id === "offline" ? styles.formatTitleOfflineA : styles.formatTitleOnlineA}>{format.title}</h3>
                      </div>
                      <span className={styles.formatModeNoteA}>{meta.mode}</span>
                    </div>
                    <p className={styles.formatComparisonLeadA}>{format.description}</p>
                    <div className={styles.formatKeyLinesA}>
                      <p className={styles.formatDetailA}><strong>Кому подойдет:</strong> {meta.fit}</p>
                      <p className={styles.formatDetailA}><strong>Что даст:</strong> {meta.gain}</p>
                    </div>
                    <a className={styles.formatActionA} href="#registration">
                      {format.id === "offline" ? "Выбрать офлайн" : "Выбрать онлайн"}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSectionA}`} id="faq">
        <div className={styles.container}>
          <div className={styles.faqShellA}>
            <div className={styles.faqOverviewA}>
              <div className={styles.faqIntroCopyA}>
                <span className={styles.sectionLabel}>{t("Вопрос-ответ")}</span>
                <h2 className={`${styles.sectionTitle} ${styles.faqTitleA}`}>{t("Что важно знать до регистрации.")}</h2>
                <p className={`${styles.sectionCopy} ${styles.faqLeadCopyA}`}>{t("В одном месте собрали всё, что обычно влияет на решение: формат участия, дорогу, запись, питомцев и подтверждение.")}</p>
              </div>
              <div className={styles.faqInfoBoardA}>
                <div className={styles.faqMascotCardA}>
                  <div className={styles.faqMascotGlyphA}>
                    <Image
                      alt=""
                      className={styles.faqMascotImageA}
                      fill
                      loading="lazy"
                      sizes="180px"
                      src={editorialAssets.faqMascot}
                    />
                  </div>
                  <div className={styles.faqMascotCopyA}>
                  <strong>{t("Собрали ответы заранее.")}</strong>
                    <p>{t("Чтобы быстро понять, подходит ли вам этот день и в каком формате удобнее участвовать.")}</p>
                  </div>
                </div>
                <div className={styles.faqSupportRowA}>
                  {faqSignals.map((item) => (
                    <article key={item.id} className={styles.faqSupportCard}>
                      <div className={styles.faqSupportIconA}>
                        <FaqSignalIcon kind={item.id} />
                      </div>
                      <div className={styles.faqSupportContentA}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className={`${styles.faqContent} ${styles.faqContentPanelA}`}>
              <FaqList items={content.faqs} openIndex={faqOpenIndex} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.registrationShell}`} id="registration">
        <div className={styles.container}>
          <div className={`${styles.ctaShell} ${styles.ctaShellA}`}>
            <div className={styles.registrationCopyA}>
              <h2 className={`${styles.sectionTitle} ${styles.registrationTitleA}`}>{t("После заявки всё просто")}</h2>
              <p className={`${styles.sectionCopy} ${styles.registrationCopyTextA}`}>{t("Сразу приходит подтверждение участия. Дальше присылаем формат, ссылку или детали площадки и материалы после конференции.")}</p>
              <div className={styles.registrationSteps}>
                {registrationSteps.map((item) => (
                  <article key={item.id} className={styles.registrationStep}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
              ))}
              </div>
            </div>
            <div className={styles.registrationFormShell}>
              <div className={styles.registrationFormIntro}>
                <span className={styles.sectionLabel}>{t("Форма участия")}</span>
                <p className={styles.sectionCopy}>{t("Форма занимает меньше двух минут. После заявки сразу придет подтверждение.")}</p>
              </div>
              <RegistrationForm
                eventSlug={content.eventSlug}
                footnote={t("Никакого спама. Только подтверждение участия, ссылка и материалы после конференции.")}
                offlineHint={t("Количество мест ограничено")}
                onlineHint={t("Ссылку на трансляцию пришлем за час до начала")}
                sourceVariant={variant.id}
                submitLabel={variant.registrationButtonLabel}
                successMessage={t("Заявка сохранена. Подтверждение участия и детали придут на почту.")}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
