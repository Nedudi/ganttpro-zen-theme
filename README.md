**!!! Перед деплоем собрать тему `npm run build` и изменить "version" в файле manifest.json**

## Команды

**Для разработки:**

`npm run dev` - _сборка стилей и скриптов, отлеживать их изменение_

`zat theme preview` - _запуск Zendesk App Tools для локального предпросмотра темы (из папки проекта)_

**Перед деплоем**

`npm run build` - _сборка стилей и скриптов (минифицируются, удалятся sourcemap)_

## Базовая структура

- /src
  - /css
    - /general - _глобальные/основыные стили_
      - \_сopenhagen.css - _стили родительской темы_
    - /blocks - _БЭМ-блоки_
    - style.css - _тут импортировать стили_
  - js - _скрипты, при создании новых, для сбоки подключить в gulpfile.js_
    - сopenhagen.js - _скрипты родительской темы_
  - style.css, script.js - _скомпилированные стили и скрипты_

**Примечание**

- [Установка ZAT в Windows 10](https://develop.zendesk.com/hc/en-us/community/posts/360037023114--Tutorial-ZAT-installation-on-Windows-10)
- При запуске `zat theme preview`, что бы каждый раз не вводить данные аутентификации, в корне темы создать файл .zat (см. ниже)
- Настройки темы, а так же переменные для CSS задаются в файле manifest.json
- CSS-прероцессор не используется из-за особенностей ZAT
- При написании CSS, руководствоваться [БЭМ - Быстрый старт](https://ru.bem.info/methodology/quick-start/)

Содержимое .zat файла:

```
{
 "subdomain": "your_subdomain",
 "username": "your_username",
 "password": "your_password"
}
```
