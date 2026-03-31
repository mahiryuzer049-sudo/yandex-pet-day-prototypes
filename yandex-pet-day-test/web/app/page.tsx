import type { Metadata } from "next";

import { VariantHubPage } from "@/features/landing/VariantHubPage";

export const metadata: Metadata = {
  title: "Yandex Pet Day / Variant Hub",
  description: "Hub for two premium Yandex Pet Day landing concepts rebuilt on clean Next.js architecture.",
};

export default function Home() {
  return <VariantHubPage />;
}
