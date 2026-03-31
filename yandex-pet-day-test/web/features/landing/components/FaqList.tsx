import type { FaqItem } from "@/features/landing/types";
import styles from "@/features/landing/landing.module.css";

interface FaqListProps {
  items: FaqItem[];
  openIndex?: number | null;
}

export function FaqList({ items, openIndex }: FaqListProps) {
  return (
    <div className={styles.faqList}>
      {items.map((item, index) => (
        <details key={item.id} className={styles.faqItem} open={openIndex === undefined ? index === 0 : openIndex === index}>
          <summary>
            <span className={styles.faqQuestionRow}>
              <span className={styles.faqQuestionIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.faqQuestionText}>{item.question}</span>
            </span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
