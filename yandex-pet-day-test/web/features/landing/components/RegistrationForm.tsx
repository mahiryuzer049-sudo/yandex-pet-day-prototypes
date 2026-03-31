"use client";

import Link from "next/link";
import { startTransition, useState } from "react";

import type { VariantId } from "@/features/landing/types";
import { fixTypography } from "@/utils/typography";
import styles from "@/features/landing/landing.module.css";

interface RegistrationFormProps {
  eventSlug: string;
  footnote?: string;
  submitLabel: string;
  sourceVariant: VariantId;
  offlineHint: string;
  onlineHint: string;
  successMessage: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function RegistrationForm({
  eventSlug,
  footnote,
  submitLabel,
  sourceVariant,
  offlineHint,
  onlineHint,
  successMessage,
}: RegistrationFormProps) {
  const t = fixTypography;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      eventSlug,
      sourceVariant,
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      format: String(formData.get("format") ?? "offline"),
    };

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message ?? t("Не удалось отправить регистрацию. Попробуй еще раз."));
      }

      form.reset();

      startTransition(() => {
        setStatus("success");
        setMessage(t(successMessage));
      });
    } catch (error) {
      const fallbackMessage =
        error instanceof Error ? error.message : t("Не удалось отправить регистрацию. Попробуй еще раз.");

      startTransition(() => {
        setStatus("error");
        setMessage(fallbackMessage);
      });
    }
  }

  const messageClassName = [
    styles.formMessage,
    status === "success" ? styles.formMessageSuccess : "",
    status === "error" ? styles.formMessageError : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.formCard} data-status={status}>
      <form aria-busy={status === "submitting"} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>{t("Как вас представить")}</span>
          <input autoComplete="given-name" name="name" placeholder={t("Ваше имя")} required type="text" />
        </label>

        <label className={styles.field}>
          <span>{t("Куда отправить подтверждение")}</span>
          <input
            autoComplete="email"
            inputMode="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </label>

        <fieldset className={styles.fieldGroup}>
          <legend>{t("Как участвовать")}</legend>
          <div className={styles.radioGrid}>
            <label className={styles.radioOption}>
              <input defaultChecked name="format" type="radio" value="offline" />
              <span className={styles.radioCard}>
                <span className={styles.radioCardHeader}>
                  <strong>{t("Офлайн")}</strong>
                  <span className={styles.radioCheckMark} aria-hidden="true" />
                </span>
                <small>{t(offlineHint)}</small>
              </span>
            </label>
            <label className={`${styles.radioOption} ${styles.radioOptionOnlineA}`}>
              <input name="format" type="radio" value="online" />
              <span className={styles.radioCard}>
                <span className={styles.radioCardHeader}>
                  <strong className={styles.radioOnlineLabelA}>{t("Онлайн")}</strong>
                  <span className={styles.radioCheckMark} aria-hidden="true" />
                </span>
                <small className={styles.radioOnlineHintA}>{t(onlineHint)}</small>
              </span>
            </label>
          </div>
        </fieldset>

        <button
          className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonBlock} ${styles.formSubmitButtonA}`}
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? t("Отправляем…") : t(submitLabel)}
        </button>

        {footnote ? <p className={styles.formFootnote}>{t(footnote)}</p> : null}
        <p className={styles.formPolicy}>
          {t("Отправляя форму, вы соглашаетесь с")} <Link href="/privacy">{t("политикой конфиденциальности")}</Link>.
        </p>
      </form>

      {message ? (
        <p aria-live="polite" className={messageClassName}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
