# Под Давлением — шиномонтаж в Москве

Многостраничный адаптивный сайт на React + TypeScript + Vite. Фронтенд публикуется на GitHub Pages. API, база заявок, авторизация и Telegram-интеграция работают в Cloudflare Worker + D1.

## Что уже заложено
- Главная, услуги, цены, оборудование, галерея, акции, о компании, контакты, запись и политика.
- Адаптивное мобильное меню и мобильные формы.
- Отправка заявок через API Worker.
- Админ-вход, список заявок, статистика и смена статусов.
- Telegram-уведомления с кнопками изменения статуса, история заявок по разделам, статистика, помощь и обновление меню. Причина отклонения сохраняется отдельно.
- GitHub Pages deployment workflow.

## ВАЖНО ПЕРЕД РЕАЛЬНЫМ ЗАПУСКОМ
В проекте оставлены демонстрационные контакты, цены и адрес. Их необходимо заменить на реальные. Не включайте публичный запуск сбора персональных данных до проверки политики обработки персональных данных и согласия с юристом. Проверьте фактические услуги, гарантии и время работы.

## Требования
- Node.js 20 LTS (рекомендуется).
- Git.
- Аккаунты GitHub и Cloudflare.
- Telegram-бот, созданный через BotFather.

## Запуск фронтенда в Windows / VS Code
Откройте терминал в корне папки проекта и выполняйте команды по одной:

```powershell
node -v
npm -v
npm install
npm run dev
```

Если `node` не распознаётся: полностью закройте VS Code и откройте заново. Если не помогло — переустановите Node.js LTS с включённым пунктом Add to PATH, перезагрузите Windows и проверьте `where.exe node`.

Если `npm install` падает из-за старого lock-файла или зависимостей, в PowerShell из корня проекта:
```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
```

Проверка production-сборки:
```powershell
npm run build
```
Готовая статика появится в `dist/`.

## Настройка API Worker
Полная последовательность находится в `docs/SETUP-RU.md`. Коротко:
1. Установить зависимости в папке `worker`.
2. Создать Cloudflare D1 database.
3. Вписать database_id в `worker/wrangler.toml`.
4. Инициализировать D1 по `worker/schema.sql`.
5. Добавить секреты Wrangler.
6. Установить webhook Telegram на URL Worker.
7. Задать `VITE_API_BASE_URL` для сборки сайта.

## GitHub Pages
Репозиторий → Settings → Pages → Build and deployment → Source: GitHub Actions.
Workflow `.github/workflows/deploy.yml` публикует `dist/`. При первом запуске workflow создаст зависимости через `npm install`.
В настройках репозитория добавьте Actions variable `VITE_API_BASE_URL` со значением URL Worker.
Если репозиторий не `<username>.github.io`, Vite собирается с относительными путями `./`, а React Router использует HashRouter для корректной работы GitHub Pages.

## Безопасность
- Telegram token и admin secrets находятся только в Cloudflare Worker secrets.
- CORS ограничивается доменом GitHub Pages после настройки.
- Админ API требует подписанный JWT.
- Заявки валидируются на сервере.
- Для production дополнительно настройте rate limiting / Turnstile и резервное копирование D1.

## Обновление Telegram-бота

Подробная пошаговая инструкция по обновлению уже настроенного Telegram-бота без потери базы и секретов: `docs/TELEGRAM-BOT-UPDATE-RU.md`. Для существующей D1 перед публикацией Worker нужно один раз применить SQL миграцию из `worker/migrations/0002_telegram_bot_history.sql`.
