import Link from "next/link";

import { landingVariants } from "@/features/landing/content";

import styles from "./hub.module.css";

export function VariantHubPage() {
  const variants = Object.values(landingVariants);

  return (
    <main className={styles.hubShell}>
      <div className={styles.backdropOne} aria-hidden="true" />
      <div className={styles.backdropTwo} aria-hidden="true" />
      <section className={styles.container}>
        <span className={styles.eyebrow}>Yandex Pet Day / Design Sprint</span>
        <h1 className={styles.title}>
          Два рабочих сайта, два разных характера, одна сильная история для найма.
        </h1>
        <p className={styles.copy}>
          Ниже собраны два полноценных web-концепта для <strong>Yandex Pet Day</strong>. Оба
          можно открыть как самостоятельные сайты, посмотреть на десктопе и мобильном, а затем
          перенести в Figma как готовую основу.
        </p>
        <div className={styles.grid}>
          {variants.map((variant) => (
            <article key={variant.id} className={styles.card}>
              <span className={styles.badge}>{variant.hubCard.badge}</span>
              <h2 className={styles.cardTitle}>{variant.hubCard.title}</h2>
              <p className={styles.cardSummary}>{variant.hubCard.summary}</p>
              <ul className={styles.pointList}>
                {variant.hubCard.points.map((point) => (
                  <li key={point.id}>{point.label}</li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} href={variant.href}>
                  Открыть {variant.shortLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          Рекомендуемый порядок просмотра: сначала <strong>Variant A</strong> как основной
          hiring-кандидат, затем <strong>Variant B</strong> как альтернативный сильный concept.
        </p>
      </section>
    </main>
  );
}
