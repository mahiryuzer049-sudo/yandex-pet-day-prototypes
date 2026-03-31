import { FaqList } from "@/features/landing/components/FaqList";
import { RegistrationForm } from "@/features/landing/components/RegistrationForm";
import type { LandingVariant, ScheduleItem, SharedConferenceContent } from "@/features/landing/types";
import styles from "@/features/landing/landing.module.css";

interface VariantSectionsProps {
  content: SharedConferenceContent;
  variant: LandingVariant;
}

const editorialScheduleOrder = ["vision", "coffee", "intro", "zoomorphism", "break", "growth", "panel", "networking"];

function getEditorialSchedule(schedule: SharedConferenceContent["schedule"]) {
  const byId = new Map(schedule.map((item) => [item.id, item]));
  return editorialScheduleOrder
    .map((id) => byId.get(id))
    .filter((item): item is ScheduleItem => Boolean(item));
}

export function VariantBSections({ content, variant }: VariantSectionsProps) {
  const editorialSchedule = getEditorialSchedule(content.schedule);

  return (
    <>
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={`${styles.container} ${styles.editorialHero}`}>
          <div className={styles.editorialHeadline}>
            <span className={`${styles.eyebrow} ${styles.eyebrowDark}`}>{variant.eyebrow}</span>
            <h1 className={`${styles.heroTitle} ${styles.heroTitleEditorial}`}>
              Warm products.
              <br />
              Wild ideas.
              <br />
              <span>Yandex Pet Day.</span>
            </h1>
            <p className={`${styles.heroCopy} ${styles.heroCopyEditorial}`}>
              Однодневная конференция для тех, кто работает на пересечении pet-tech,
              digital-продуктов, искусственного интеллекта и пользовательского опыта. Здесь важны
              не только доклады, но и то, как рынок pet-сервисов взрослеет прямо сейчас.
            </p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href="#registration">
                Зарегистрироваться
              </a>
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="#program">
                Изучить программу
              </a>
            </div>
          </div>

          <div className={styles.editorialAside} aria-hidden="true">
            <article className={styles.asideCard}>
              <span>Когда</span>
              <strong>20 / 06</strong>
              <small>11:00 - 16:30</small>
            </article>
            <article className={styles.asideCard}>
              <span>Где</span>
              <strong>Академия</strong>
              <small>Москва + live stream</small>
            </article>
            <article className={styles.asideCard}>
              <span>Темы</span>
              <div className={styles.tagCloud}>
                <b>AI</b>
                <b>Retention</b>
                <b>Design</b>
                <b>Growth</b>
                <b>Pet-tech</b>
              </div>
            </article>
          </div>
        </div>
        <div className={styles.tickerStrip}>
          <div className={styles.tickerTrack}>
            <span>Computer Vision</span>
            <span>Pet-tech Products</span>
            <span>Digital Loyalty</span>
            <span>Founders & Designers</span>
            <span>Online + Offline</span>
            <span>Yandex Pet Day</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.storySection}`} id="story">
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyIntro}>
              <span className={styles.eyebrow}>Зачем идти</span>
              <h2 className={styles.sectionTitle}>
                Это не просто pet-ивент. Это рынок, продукты, деньги, лояльность и люди, которые
                реально это строят.
              </h2>
            </div>
            <div className={styles.storyCards}>
              {content.features.map((feature) => (
                <article key={feature.id} className={styles.manifestoCard}>
                  <span className={styles.featureIndex}>{feature.index}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.programEditorial}`} id="program">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={`${styles.eyebrow} ${styles.eyebrowDark}`}>Программа</span>
            <h2 className={styles.sectionTitle}>
              Редакционный ритм вместо обычной таблицы: каждый слот выглядит как самостоятельный
              сигнал.
            </h2>
          </div>
          <div className={styles.programMosaic}>
            {editorialSchedule.map((item, index) => (
              <article
                key={item.id}
                className={`${styles.mosaicCard} ${
                  index === 0 ? styles.mosaicCardLead : ""
                } ${item.id === "panel" ? styles.mosaicCardWide : ""}`.trim()}
              >
                <span className={styles.mosaicTime}>{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.speakersEditorial}`} id="speakers">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Спикеры</span>
            <h2 className={styles.sectionTitle}>
              Три сильных голоса, которые закрывают дизайн, AI и рыночный рост.
            </h2>
          </div>
          <div className={styles.speakerRows}>
            {content.speakers.map((speaker, index) => (
              <article key={speaker.id} className={styles.speakerRow}>
                <span className={styles.speakerNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.speakerProfile}>
                  <h3>{speaker.name}</h3>
                  <span>{speaker.role}</span>
                </div>
                <p>{speaker.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.formatsEditorial}`} id="formats">
        <div className={styles.container}>
          <div className={styles.splitPanels}>
            {content.formats.map((format) => (
              <article
                key={format.id}
                className={`${styles.splitPanel} ${
                  format.id === "offline" ? styles.splitPanelOffline : styles.splitPanelOnline
                }`}
              >
                <span className={styles.panelTag}>{format.label}</span>
                <h2>{format.id === "offline" ? "Москва, Академия" : "Трансляция из любой точки"}</h2>
                <p>
                  {format.id === "offline"
                    ? "Живой контакт, нетворкинг, энергия пространства и разговоры после официальной программы."
                    : "Удобный формат, если нужен доступ к содержанию без поездки. Ссылку отправим на почту перед стартом."}
                </p>
                <ul className={styles.bulletList}>
                  {format.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqEditorial}`} id="faq">
        <div className={styles.container}>
          <div className={styles.faqLayout}>
            <div className={styles.faqIntro}>
              <span className={`${styles.eyebrow} ${styles.eyebrowDark}`}>FAQ</span>
              <h2 className={styles.sectionTitle}>
                Все, что мешает решить &quot;иду или нет&quot;, лучше снять сразу.
              </h2>
            </div>
            <FaqList items={content.faqs} />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.registrationEditorial}`} id="registration">
        <div className={styles.container}>
          <div className={styles.registrationPanel}>
            <div className={styles.registrationCopy}>
              <span className={styles.eyebrow}>Регистрация</span>
              <h2 className={styles.sectionTitle}>
                Reserve your spot for the pet-tech conversation worth showing up for.
              </h2>
              <p className={styles.sectionCopy}>
                Оставь имя, почту и формат участия. Мы подтвердим регистрацию и отправим всю
                нужную информацию.
              </p>
            </div>
            <div className={styles.formCardEditorial}>
              <RegistrationForm
                eventSlug={content.eventSlug}
                offlineHint="Личная атмосфера и нетворкинг"
                onlineHint="Ссылка придет заранее"
                sourceVariant={variant.id}
                submitLabel={variant.registrationButtonLabel}
                successMessage="Заявка сохранена. Подтверждение участия и детали трансляции отправим на почту."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
