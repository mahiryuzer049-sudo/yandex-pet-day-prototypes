# Variant A Assets

## Сейчас реально используются

- `speaker-andrei-sokolov-portrait-v2.png`
- `speaker-maria-podolskaya-portrait-v2.png`
- `speaker-pavel-sidorov-portrait-v2.png`
- `hero-scene-editorial-v1.png`
- `interlude-pet-tech-panel-v1.png`
- `format-offline-editorial-v2.png`
- `format-online-editorial-v2.png`
- `faq-pet-mascot-v1.png`
- `hero-pet-pattern-tile-v1.png`
- `quote-banner-editorial-backdrop-v1.png`
- `cta-banner-signal-backdrop-v1.png`

## Следующий желательный generation-pack
- Сейчас основной новый media-pack уже вшит в сайт.
- Следующая генерация нужна только если будем делать еще один art-direction pass.

## Сейчас архивированы и не вшиты в сайт

- `hero-pet-signal-main.png`
- `hero-pet-signal-secondary.png`
- `conference-atmosphere-panel.png`
- `signal-line-graphic.png`
- `venue-academia-card.png`
- `format-offline-stage.png`
- `format-online-stream.png`
- `about-mechanics-icon.png`
- `about-community-icon.png`
- `about-hybrid-format-icon.png`
- `speaker-design-icon.png`
- `speaker-ai-icon.png`
- `speaker-business-icon.png`
- `faq-pet-friendly-sticker.png`
- `registration-confirmation-badge.png`

## Почему

- `Variant A` больше не опирается на набор декоративных ассетов.
- Hero, interlude, `Formats` и `FAQ` уже работают кодом, но следующий quality jump лучше делать через несколько точечных generated assets.
- Главный приоритет теперь не декоративный шум, а несколько сильных медиа-акцентов.
- Блок `Speakers` зафиксирован: текущие портреты считаем принятыми и не перегенерируем без новой отдельной причины.
- `-v2` filenames используются специально для clean cache-bust без query string, потому что `Next/Image` валил local preview на query-suffixed asset paths.

## Если генерировать новый пакет

- приоритет `1`:
  - `hero-scene-editorial-v1.png`
- приоритет `2`:
  - `interlude-pet-tech-panel-v1.png`
  - `format-offline-editorial-v2.png`
  - `format-online-editorial-v2.png`
  - `faq-pet-mascot-v1.png`

## Что лучше оставить кодом

- hero background pattern
- numbers strip
- program event-icons
- quote-banner
- red CTA-banner
- company badges

Основной prompt source:

- `C:\Users\frolo\Documents\Obsidian Vault\Project_Карьерный_Синтез\Yandex Pet Day — Тестовое задание\17_Иллюстрации и промпты.md`

## Optional generation pack — фон и дополнительные media layers

- Пока пусто: текущие фоновые и atmospheric layers уже подключены.
- Добавлять новый optional pack только под новый конкретный visual запрос.
