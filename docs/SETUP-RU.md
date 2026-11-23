# Подробная настройка — Windows, GitHub Pages, Cloudflare и Telegram

## Часть A. Локальный запуск сайта

Откройте VS Code → File → Open Folder → выберите папку `pod-davleniem`.

В терминале PowerShell выполните по одной команде:

```powershell
node -v
```
Ожидается версия Node 20.x или новее.

```powershell
npm -v
```

```powershell
npm install
```

```powershell
npm run dev
```
Откройте адрес, который Vite покажет в терминале (обычно http://localhost:5173).

Для остановки сервера нажмите `Ctrl + C`.

## Часть B. Cloudflare D1

Перейдите в `worker`:
```powershell
cd worker
```

Установите зависимости:
```powershell
npm install
```

Авторизуйте Wrangler:
```powershell
npx wrangler login
```

Создайте базу:
```powershell
npx wrangler d1 create pod-davleniem-db
```

В выводе появятся `database_name` и `database_id`. Скопируйте ID в `worker/wrangler.toml` вместо `REPLACE_WITH_D1_DATABASE_ID`.

Инициализируйте таблицу:
```powershell
npx wrangler d1 execute pod-davleniem-db --remote --file=./schema.sql
```

## Часть C. Секреты Worker

В папке `worker` выполните каждую команду отдельно. Введите значения в интерактивном запросе Wrangler:

```powershell
npx wrangler secret put ADMIN_PASSWORD
```
Используйте длинный уникальный пароль, не пароль от GitHub.

```powershell
npx wrangler secret put JWT_SECRET
```
В качестве значения используйте случайную строку минимум 32 символа. Не публикуйте её.

```powershell
npx wrangler secret put TELEGRAM_BOT_TOKEN
```
Значение выдаёт BotFather. Не отправляйте токен в переписку и не коммитьте его.

```powershell
npx wrangler secret put TELEGRAM_CHAT_ID
```
Это ID личного чата или группы администраторов. Для группы добавьте бота и получите chat ID через безопасный способ.

```powershell
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
```
Сгенерируйте длинную случайную строку. Она будет использоваться при установке webhook.

## Часть D. Публикация Worker

Проверьте `ALLOWED_ORIGIN` в `wrangler.toml`. Для пользовательского сайта это обычно:
`https://USERNAME.github.io`
или
`https://USERNAME.github.io/REPOSITORY`

Затем:
```powershell
npx wrangler deploy
```
Сохраните URL Worker вида `https://pod-davleniem-api.SUBDOMAIN.workers.dev`.

Проверка:
```powershell
Invoke-RestMethod https://YOUR-WORKER.workers.dev/health
```
Ожидается `{ "ok": true, ... }`.

## Часть E. Telegram webhook

Создайте бота через `@BotFather`, добавьте его в чат администраторов. Узнайте chat ID безопасным способом (например, через временный getUpdates после отправки сообщения боту; затем не публикуйте ответ с токеном).

Установите webhook, заменив значения:
```powershell
$botToken = "ВАШ_ТОКЕН"
$workerUrl = "https://YOUR-WORKER.workers.dev"
$secret = "ТОТ_ЖЕ_TELEGRAM_WEBHOOK_SECRET"
$webhook = "$workerUrl/api/telegram/webhook"
```

```powershell
$body = @{ url = $webhook; secret_token = $secret } | ConvertTo-Json
```

```powershell
Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$botToken/setWebhook" -ContentType "application/json" -Body $body
```
Токен не вставляйте в исходники, скриншоты или публичные сообщения. При утечке немедленно перевыпустите его в BotFather.

Отправьте боту `/start`. При поступлении заявки Worker отправит сообщение в заданный `TELEGRAM_CHAT_ID`.

## Часть F. GitHub Pages

1. Создайте пустой репозиторий GitHub, например `pod-davleniem`.
2. Скопируйте в него файлы проекта.
3. Откройте Settings → Pages → Build and deployment → Source: GitHub Actions.
4. Settings → Secrets and variables → Actions → Variables → New repository variable.
5. Имя: `VITE_API_BASE_URL`; значение: полный URL Worker без завершающего `/`.
6. Сделайте push в ветку `main`. Workflow соберёт и опубликует сайт.

Команды Git (по одной):
```powershell
git init
```
```powershell
git add .
```
```powershell
git commit -m "Initial Pod Davleniem website"
```
```powershell
git branch -M main
```
```powershell
git remote add origin https://github.com/USERNAME/pod-davleniem.git
```
```powershell
git push -u origin main
```

## Частые ошибки

### `node is not recognized`
Закройте все окна VS Code, откройте заново. В PowerShell:
```powershell
where.exe node
```
Если путь не найден — переустановите Node.js LTS, включив Add to PATH, затем перезагрузите Windows.

### `npm.ps1 cannot be loaded because running scripts is disabled`
Используйте терминал Command Prompt вместо PowerShell либо выполните:
```powershell
npm.cmd install
```
И далее запускайте `npm.cmd run dev`.

### `npm install` выдаёт ошибки
Проверьте Node:
```powershell
node -v
```
Удалите установленные зависимости:
```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
```
Удалите lock-файл только если установка действительно застряла на конфликте:
```powershell
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
```
Заново:
```powershell
npm install
```

### CORS error в браузере
Проверьте `ALLOWED_ORIGIN` в `wrangler.toml`, URL Worker в `VITE_API_BASE_URL`, затем повторно разверните Worker и пересоберите фронтенд. Origin должен совпадать с фактическим доменом GitHub Pages без пути репозитория.

### Админка пишет «Сервер не настроен»
Проверьте, что добавлены `ADMIN_PASSWORD` и `JWT_SECRET` через `wrangler secret put`, затем выполните `npx wrangler deploy`.

### Заявка не приходит в Telegram
Проверьте `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, что бот добавлен в чат, и Worker logs:
```powershell
npx wrangler tail
```
Проверьте, что D1 создана и схема применена.

### GitHub Pages показывает 404
Проверьте Settings → Pages → Source: GitHub Actions, наличие успешного workflow и правильность адреса `USERNAME.github.io/REPOSITORY/`. Переходы внутри сайта используют HashRouter, поэтому прямое обновление внутренних страниц не должно приводить к серверному 404.
