import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/LandingPage";
import { landingVariants } from "@/features/landing/content";

export const metadata: Metadata = {
  title: "Yandex Pet Day / Variant B",
  description: landingVariants["variant-b"].seoDescription,
};

export default function VariantBPage() {
  return <LandingPage variant={landingVariants["variant-b"]} />;
}
