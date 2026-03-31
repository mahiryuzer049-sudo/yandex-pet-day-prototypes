import { conferenceContent } from "@/features/landing/content";
import { Footer } from "@/features/landing/components/Footer";
import { SiteHeader } from "@/features/landing/components/SiteHeader";
import { VariantASections } from "@/features/landing/sections/VariantASections";
import { VariantBSections } from "@/features/landing/sections/VariantBSections";
import type { FigmaExportState, LandingVariant } from "@/features/landing/types";

import styles from "./landing.module.css";

interface LandingPageProps {
  exportState?: FigmaExportState;
  variant: LandingVariant;
  renderMode?: "default" | "figma";
}

export function LandingPage({ exportState, variant, renderMode = "default" }: LandingPageProps) {
  return (
    <div
      className={styles.page}
      data-figma-faq={renderMode === "figma" ? exportState?.faq ?? "default" : undefined}
      data-figma-formats={renderMode === "figma" ? exportState?.formats ?? "default" : undefined}
      data-figma-nav={renderMode === "figma" ? exportState?.nav ?? "default" : undefined}
      data-figma-viewport={renderMode === "figma" ? exportState?.viewport ?? "default" : undefined}
      data-render-mode={renderMode}
      data-variant={variant.id}
      style={variant.theme}
    >
      <div className={styles.siteShell}>
        <SiteHeader exportState={exportState} renderMode={renderMode} variant={variant} />
        <main>
          {variant.id === "variant-a" ? (
            <VariantASections content={conferenceContent} exportState={exportState} renderMode={renderMode} variant={variant} />
          ) : (
            <VariantBSections content={conferenceContent} variant={variant} />
          )}
        </main>
        <Footer variant={variant} />
      </div>
    </div>
  );
}
