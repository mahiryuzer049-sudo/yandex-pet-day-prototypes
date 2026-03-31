import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/LandingPage";
import { landingVariants } from "@/features/landing/content";
import type { FigmaExportState, FigmaFaqState, FigmaFormatsState, FigmaNavState, FigmaViewportState } from "@/features/landing/types";

export const metadata: Metadata = {
  title: "Yandex Pet Day / Variant A / Figma Export",
  description: "Figma-friendly export view for Variant A, optimized for html.to.design import.",
};

interface VariantAFigmaPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function takeFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseFaqState(value: string | undefined): FigmaFaqState | undefined {
  if (value === "closed") {
    return value;
  }

  if (value && /^open-\d+$/.test(value)) {
    return value as FigmaFaqState;
  }

  return undefined;
}

function parseFormatsState(value: string | undefined): FigmaFormatsState | undefined {
  if (value === "mobile-card-1" || value === "mobile-card-2") {
    return value as FigmaFormatsState;
  }

  return undefined;
}

function parseNavState(value: string | undefined): FigmaNavState | undefined {
  return value === "open" ? value : undefined;
}

function parseViewportState(value: string | undefined): FigmaViewportState | undefined {
  if (value === "desktop" || value === "tablet" || value === "mobile") {
    return value as FigmaViewportState;
  }

  return undefined;
}

function parseExportState(params: Record<string, string | string[] | undefined>): FigmaExportState {
  return {
    faq: parseFaqState(takeFirst(params.faq)),
    formats: parseFormatsState(takeFirst(params.formats)),
    nav: parseNavState(takeFirst(params.nav)),
    viewport: parseViewportState(takeFirst(params.viewport)),
  };
}

export default async function VariantAFigmaPage({ searchParams }: VariantAFigmaPageProps) {
  const params = searchParams ? await searchParams : {};
  const exportState = parseExportState(params);

  return <LandingPage exportState={exportState} renderMode="figma" variant={landingVariants["variant-a"]} />;
}
