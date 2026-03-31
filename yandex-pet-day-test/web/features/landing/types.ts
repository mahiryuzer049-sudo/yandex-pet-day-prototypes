import type { CSSProperties } from "react";

export type VariantId = "variant-a" | "variant-b";

export interface HubCardPoint {
  id: string;
  label: string;
}

export interface HubCard {
  badge: string;
  title: string;
  summary: string;
  points: HubCardPoint[];
}

export interface HeroMetaItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  type: string;
  title: string;
  description: string;
}

export interface SpeakerItem {
  id: string;
  initials: string;
  name: string;
  role: string;
  description: string;
  accent: "red" | "gold" | "ink";
}

export interface FormatItem {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SharedConferenceContent {
  eventSlug: string;
  eventTitle: string;
  heroSummary: string;
  heroMeta: HeroMetaItem[];
  stats: StatItem[];
  features: FeatureItem[];
  schedule: ScheduleItem[];
  speakers: SpeakerItem[];
  formats: FormatItem[];
  faqs: FaqItem[];
  registrationBenefits: string[];
}

export type FigmaFaqState = "closed" | `open-${number}`;
export type FigmaFormatsState = "mobile-card-1" | "mobile-card-2";
export type FigmaNavState = "open";
export type FigmaViewportState = "desktop" | "tablet" | "mobile";

export interface FigmaExportState {
  faq?: FigmaFaqState;
  formats?: FigmaFormatsState;
  nav?: FigmaNavState;
  viewport?: FigmaViewportState;
}

export interface VariantTheme extends CSSProperties {
  "--page-bg": string;
  "--page-alt": string;
  "--surface": string;
  "--surface-strong": string;
  "--text-strong": string;
  "--text-muted": string;
  "--hairline": string;
  "--accent": string;
  "--accent-hover": string;
  "--accent-strong": string;
  "--accent-soft": string;
  "--shadow": string;
  "--header-bg": string;
  "--cta-bg": string;
}

export interface LandingVariant {
  id: VariantId;
  shortLabel: string;
  conceptTitle: string;
  href: string;
  alternateHref: string;
  alternateLabel: string;
  seoDescription: string;
  eyebrow: string;
  hubCard: HubCard;
  registrationButtonLabel: string;
  headerNav: Array<{ label: string; href: string }>;
  footerCopy: string;
  theme: VariantTheme;
}
