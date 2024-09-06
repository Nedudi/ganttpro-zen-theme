**!!! Перед деплоем собрать тему `npm run build` и изменить "version" в файле manifest.json**

## Команды

**Для разработки:**

`npm run dev` - _сборка стилей и скриптов, отлеживать их изменение_

`zcli themes:preview` - _запуск Zendesk Command Line Interface для локального предпросмотра темы (из папки проекта)_

**Перед деплоем**

`npm run build` - _сборка стилей и скриптов (минифицируются, удалятся sourcemap)_
Изменить "version" в manifest.json

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

Кратко об установке и настройке:

- Установить ZCLI: npm install @zendesk/zcli -g
- Добавить профиль: zcli login -i
- Запустить локальный предпросмотр темы из текущей папки: zcli themes:preview
- Настройки темы, а так же переменные для CSS задаются в файле manifest.json
- CSS-прероцессор не используется из-за особенностей ZAT

[Using ZCLI](https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/)

[ZCLI](https://github.com/zendesk/zcli/)

[Zendesk developer](https://developer.zendesk.com/documentation/apps/)
