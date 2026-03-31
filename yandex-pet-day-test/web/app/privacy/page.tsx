export default function PrivacyPage() {
  return (
    <main
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "72px 24px 96px",
        color: "#111216",
      }}
    >
      <div style={{ display: "grid", gap: 18 }}>
        <span
          style={{
            width: "fit-content",
            padding: "6px 12px",
            border: "1px solid rgba(17, 18, 22, 0.12)",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Политика конфиденциальности
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(38px, 6vw, 64px)",
            lineHeight: 0.94,
            letterSpacing: "-0.05em",
          }}
        >
          Обработка данных для регистрации на Yandex Pet Day
        </h1>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: "#5f646f" }}>
          При регистрации мы запрашиваем только имя, email и формат участия. Эти данные нужны,
          чтобы подтвердить регистрацию, отправить организационные детали и прислать материалы
          после события.
        </p>
      </div>

      <div style={{ display: "grid", gap: 28, marginTop: 48 }}>
        <section style={{ display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.03em" }}>Какие данные мы собираем</h2>
          <p style={{ margin: 0, lineHeight: 1.75, color: "#5f646f" }}>
            При регистрации пользователь оставляет имя, email и выбранный формат участия. Этого
            достаточно для подтверждения участия, отправки организационной информации и
            последующих материалов.
          </p>
        </section>

        <section style={{ display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.03em" }}>Как используются данные</h2>
          <p style={{ margin: 0, lineHeight: 1.75, color: "#5f646f" }}>
            Данные не используются для рекламных рассылок и не передаются третьим лицам для
            маркетинговых целей. После события участникам могут быть отправлены записи, презентации
            и краткий follow-up по итогам конференции.
          </p>
        </section>

        <section style={{ display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.03em" }}>Зачем страница нужна в тестовом</h2>
          <p style={{ margin: 0, lineHeight: 1.75, color: "#5f646f" }}>
            Страница закрывает базовый доверительный слой: если лендинг собирает email, в сценарии
            должны быть понятное объяснение сбора данных и ссылка на политику конфиденциальности.
          </p>
        </section>
      </div>
    </main>
  );
}
