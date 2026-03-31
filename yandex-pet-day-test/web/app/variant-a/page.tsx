import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/LandingPage";
import { landingVariants } from "@/features/landing/content";

export const metadata: Metadata = {
  title: "Yandex Pet Day / Variant A",
  description: landingVariants["variant-a"].seoDescription,
};

export default function VariantAPage() {
  return <LandingPage variant={landingVariants["variant-a"]} />;
}
