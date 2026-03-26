# Yandex Pet Day Pages Deploy

Публичный deploy-репозиторий для актуальной статической сборки `Yandex Pet Day`.

## Что внутри
- `index.html` - хаб с двумя вариантами
- `variant-a/` и `variant-a.html` - текущий основной submission-вариант
- `variant-b/` и `variant-b.html` - альтернативный концепт
- `privacy/` и `privacy.html` - страница политики конфиденциальности
- `_next/static/` - стили и статика из production build
- `variant-a-assets/` - медиа для `Variant A`

## Публичные ссылки
- Hub: `https://mahiryuzer049-sudo.github.io/yandex-pet-day-prototypes/`
- Variant A: `https://mahiryuzer049-sudo.github.io/yandex-pet-day-prototypes/variant-a/`
- Variant B: `https://mahiryuzer049-sudo.github.io/yandex-pet-day-prototypes/variant-b/`

## Как обновляется
Исходный `Next.js`-проект живёт в:

`C:\Users\frolo\Documents\Playground\yandex-pet-day-test\web`

После `npm run build` статический export для GitHub Pages собирается скриптом:

`python scripts/export_github_pages.py`

Скрипт:
- берёт prerendered HTML из `.next/server/app`
- убирает `Next.js` runtime и `next/image`
- переписывает пути под base path репозитория
- копирует `_next/static`, `public/` и favicon в этот deploy-репозиторий

## Зачем это нужно
- открыть текущий сайт в сети без локального сервера
- смотреть `Variant A` и `Variant B` как живые страницы
- использовать публичную ссылку для ревью и дальнейшего переноса в Figma
