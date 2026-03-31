"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

import type { FigmaExportState, LandingVariant } from "@/features/landing/types";
import styles from "@/features/landing/landing.module.css";

interface SiteHeaderProps {
  exportState?: FigmaExportState;
  renderMode?: "default" | "figma";
  variant: LandingVariant;
}

export function SiteHeader({ exportState, renderMode = "default", variant }: SiteHeaderProps) {
const compactHeaderBreakpoint = 1024;
  const isFigmaExport = renderMode === "figma";
  const forcedOpen = isFigmaExport && exportState?.nav === "open";
  const [isOpen, setIsOpen] = useState(forcedOpen);
  const [isScrolled, setIsScrolled] = useState(false);
  const showAlternateLink = variant.id !== "variant-a";
  const isVariantA = variant.id === "variant-a";
  const navOpen = forcedOpen || isOpen;
  const headerCaption =
    variant.id === "variant-a"
      ? ""
      : `${variant.shortLabel} / ${variant.conceptTitle}`;

  const syncScrolled = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 12);
  });

  useEffect(() => {
    const handleScroll = () => {
      syncScrolled();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isFigmaExport) {
      return;
    }

    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("nav-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFigmaExport, isOpen]);

  useEffect(() => {
    if (isFigmaExport) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth > compactHeaderBreakpoint) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [compactHeaderBreakpoint, isFigmaExport]);

  const headerClassName = [
    styles.siteHeader,
    isScrolled ? styles.headerScrolled : "",
    navOpen ? styles.headerOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <div className={styles.container}>
        <div className={styles.headerBar}>
          <Link className={`${styles.brand} ${isVariantA ? styles.brandEvent : ""}`.trim()} href="/">
            <span aria-hidden="true" className={styles.brandAccentBar} />
            <span className={styles.brandText}>
              <span className={styles.brandKicker}>{isVariantA ? "Яндекс Крауд" : variant.shortLabel}</span>
              <strong className={styles.brandTitle}>
                {isVariantA ? (
                  <>
                    <span className={styles.brandTitleLead}>Yandex</span>{" "}
                    <span className={styles.brandTitleAccent}>Pet Day</span>
                  </>
                ) : (
                  `${variant.shortLabel} ${variant.conceptTitle}`
                )}
              </strong>
              {headerCaption ? <small>{headerCaption}</small> : null}
            </span>
          </Link>

          <nav className={styles.navLinks} aria-label="Основная навигация">
            {variant.headerNav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.headerActions}>
            {showAlternateLink ? (
              <Link className={`${styles.button} ${styles.buttonSecondary}`} href={variant.alternateHref}>
                {variant.alternateLabel}
              </Link>
            ) : null}
            <a
              className={`${styles.button} ${isVariantA ? styles.buttonHeaderPrimary : styles.buttonPrimary}`.trim()}
              href="#registration"
            >
              {variant.registrationButtonLabel}
            </a>
            <button
              aria-controls={`${variant.id}-mobile-nav`}
              aria-expanded={navOpen}
              className={styles.mobileToggle}
              onClick={() => setIsOpen((current) => !current)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={styles.navPanel} id={`${variant.id}-mobile-nav`}>
          {variant.headerNav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          {showAlternateLink ? (
            <Link href={variant.alternateHref} onClick={() => setIsOpen(false)}>
              Посмотреть {variant.alternateLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
