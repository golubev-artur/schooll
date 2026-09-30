# Мой ИИ-репетитор

1. GitHub Pages: Settings → Pages → Deploy from branch → папка с `index.html`. Адрес: `https://<имя>.github.io/<репо>/`.
2. ИИ-чат: создайте бесплатный Cloudflare Worker, вставьте `worker.js`, добавьте секрет `ANTHROPIC_API_KEY` (модель по умолчанию — Haiku, дешёвая; меняется переменной `MODEL`).
   Адрес воркера вставьте на сайте: ⚙ Настройки → «Адрес ИИ».
3. Без воркера тест, план, практика с подсказками и отчёт родителя работают полностью.

## Вход и синхронизация (Supabase)
1. supabase.com → New project (бесплатно).
2. SQL Editor → вставить `supabase.sql` → Run.
3. Authentication → URL Configuration: Site URL = адрес сайта (`https://<логин>.github.io/<репо>/`).
4. Authentication → Email Templates → Magic Link: добавить в письмо `{{ .Token }}` (6-значный код).
5. Project Settings → API: скопировать Project URL и ключ `anon` (публичный) в `SUPA` в начале скрипта `index.html`.
`service_role` ключ нигде не использовать.
