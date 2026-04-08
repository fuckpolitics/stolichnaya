# Столичная — сайт закусочной

Сайт закусочной «Столичная» в Иваново: главная страница, меню, готовые рационы.
Контент редактируется через админ-панель Decap CMS.

## Разработка

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173/stolichnaya/`.

## Сборка

```bash
npm run build
```

Результат — каталог `dist/`. Скрипт `postbuild` автоматически копирует `index.html` → `404.html` для корректной работы SPA-роутинга на GitHub Pages.

## Деплой на GitHub Pages

Деплой настроен через GitHub Actions (`.github/workflows/deploy.yml`).

1. Откройте **Settings → Pages** в репозитории.
2. В разделе **Source** выберите **GitHub Actions**.
3. Пушьте в ветку `main` — workflow соберёт проект и опубликует автоматически.

Сайт будет доступен по адресу `https://fuckpolitics.github.io/stolichnaya/`.

## Админ-панель (Decap CMS)

Админка расположена по адресу `/stolichnaya/admin/`. Через неё можно менять:

- Контакты, адрес, часы работы
- Тексты главной страницы (заголовок, описание, блок «О нас»)
- Меню (категории и блюда с ценами)
- Готовые рационы (название, состав, цена)

### Настройка OAuth-прокси

Decap CMS использует GitHub в качестве бэкенда и требует OAuth для авторизации. На GitHub Pages нет серверной части, поэтому нужен внешний OAuth-прокси.

**Шаг 1.** Создайте GitHub OAuth App:

- **Settings → Developer Settings → OAuth Apps → New OAuth App**
- **Homepage URL:** `https://fuckpolitics.github.io/stolichnaya/`
- **Authorization callback URL:** URL вашего OAuth-прокси + `/callback`
- Сохраните **Client ID** и **Client Secret**

**Шаг 2.** Разверните OAuth-прокси. Самый простой вариант — бесплатный Cloudflare Worker.
Готовое решение: [decap-proxy](https://github.com/sterlingwes/decap-proxy) (fork) или
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) (Cloudflare Worker с минимальной настройкой).

В Worker-е укажите `Client ID` и `Client Secret` из шага 1.

**Шаг 3.** В файле `public/admin/config.yml` раскомментируйте строку `base_url` и укажите URL вашего прокси:

```yaml
backend:
  name: github
  repo: fuckpolitics/stolichnaya
  branch: main
  base_url: https://your-worker.your-account.workers.dev
```

После этого откройте `/stolichnaya/admin/` — CMS попросит авторизоваться через GitHub и даст доступ к редактированию контента. Каждое сохранение создаёт коммит → Actions пересобирает сайт.

## Структура контента

Контент хранится в `content/` и импортируется при сборке:

| Файл | Что содержит |
|---|---|
| `content/site.json` | Название, контакты, часы работы, тексты главной |
| `content/menu.json` | Категории и блюда с ценами |
| `content/rations.json` | Готовые рационы с составом и ценами |

## Переход на свой домен

1. В `vite.config.js` замените `base: '/stolichnaya/'` на `base: '/'`.
2. Создайте файл `public/CNAME` с именем домена (например: `stolichnaya-ivanovo.ru`).
3. В `public/admin/config.yml` обновите `public_folder` на `/images`.
4. Настройте DNS у регистратора домена: CNAME-запись на `fuckpolitics.github.io`.
5. В **Settings → Pages** репозитория укажите свой домен и включите HTTPS.
