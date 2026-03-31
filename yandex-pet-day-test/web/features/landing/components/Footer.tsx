import Link from "next/link";

import type { LandingVariant } from "@/features/landing/types";
import { fixTypography } from "@/utils/typography";
import styles from "@/features/landing/landing.module.css";

interface FooterProps {
  variant: LandingVariant;
}

function SocialIcon({ kind }: { kind: "telegram" | "vk" }) {
  if (kind === "telegram") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
        <path d="m16.7 4.4-2.1 10c-.2.8-.7 1-1.4.6l-3.2-2.4-1.5 1.4c-.2.2-.4.4-.8.4l.2-3.3 6.1-5.6c.3-.3-.1-.4-.4-.2L6 10l-3.1-1c-.7-.2-.7-.7.2-1L15.2 3c.6-.2 1.7.2 1.5 1.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path d="M4 6.3c0-.9.8-1.6 1.7-1.6h8.6c.9 0 1.7.7 1.7 1.6v7.4c0 .9-.8 1.6-1.7 1.6H5.7c-.9 0-1.7-.7-1.7-1.6V6.3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.2 8.2c.5 2.1 1.4 3.8 2.6 5.1h1.3c.5-.5 1-1.1 1.3-1.8.3.2.7.5 1 .9.3.3.6.5.9.5h1.1c0-1-.6-1.8-1.8-2.6.4-.6.8-1.4 1.1-2.2h-1.3c-.3.8-.7 1.5-1.1 2-.9-.7-1.5-1.7-1.9-3H9.8c.2.7.4 1.3.7 1.9-.4.6-.8 1.1-1.2 1.4-.5-.8-.9-1.9-1.2-3.3H7.2Z" fill="currentColor" />
      </svg>
  );
}

export function Footer({ variant }: FooterProps) {
  const t = fixTypography;
  const isVariantA = variant.id === "variant-a";
  const quickLinks =
    variant.id === "variant-a"
      ? [
          { label: "О конференции", href: "#about" },
          { label: "Программа", href: "#program" },
          { label: "Спикеры", href: "#speakers" },
          { label: "Регистрация", href: "#registration" },
        ]
      : [
          { label: "Программа", href: "#program" },
          { label: "Регистрация", href: "#registration" },
        ];

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={`${styles.footerRow} ${isVariantA ? styles.footerRowDetailed : ""}`.trim()}>
          <div className={styles.footerColumn}>
            <span className={styles.brandKicker}>{isVariantA ? t("Яндекс Крауд") : t(variant.shortLabel)}</span>
            <strong className={styles.footerBrandTitle}>
              {isVariantA ? (
                <>
                  <span className={styles.brandTitleLead}>Yandex</span>{" "}
                  <span className={styles.brandTitleAccent}>Pet Day</span>
                </>
              ) : (
                variant.conceptTitle
              )}
            </strong>
            <p>{t(variant.footerCopy)}</p>
          </div>

          <div className={styles.footerColumn}>
            <span className={styles.footerColumnTitle}>{t("Навигация")}</span>
            <div className={styles.footerLinks}>
              {quickLinks.map((item) => (
                <a key={item.href} href={item.href}>
                  {t(item.label)}
                </a>
              ))}
              {variant.id !== "variant-a" ? <Link href={variant.alternateHref}>{t(variant.alternateLabel)}</Link> : null}
            </div>
          </div>

          <div className={styles.footerColumn}>
            <span className={styles.footerColumnTitle}>{t("Организатор и документы")}</span>
            <div className={styles.footerMetaStack}>
              <p>{t("Организатор: Яндекс Крауд")}</p>
              <p>© Yandex Pet Day, 2025</p>
              <Link href="/privacy">{t("Политика конфиденциальности")}</Link>
              <a href="#faq">{t("Ответы на вопросы")}</a>
              <div className={styles.footerSocialRow}>
                <a href="https://t.me/yandex" rel="noreferrer" target="_blank">
                  <SocialIcon kind="telegram" />
                  Telegram
                </a>
                <a href="https://vk.com/yandexgo" rel="noreferrer" target="_blank">
                  <SocialIcon kind="vk" />
                  VK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
