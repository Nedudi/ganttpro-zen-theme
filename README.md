**!!! Перед деплоем собрать тему `npm run build` и изменить "version" в файле manifest.json**

## Команды

**Для разработки:**

`npm run dev` - _сборка стилей и скриптов, отлеживать их изменение_

`zcli themes:preview` - _запуск Zendesk Command Line Interface для локального предпросмотра темы (из папки проекта)_

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

Кратко об установке и настройке ZCLI:

- Установить ZCLI: npm install @zendesk/zcli -g
- Добавить профиль: zcli login -i
- Запустить локальный предпросмотр темы: zcli themes:preview

[Using ZCLI](https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/)

[System prep for app developers 1: Setting up your command-line interface](https://developer.zendesk.com/documentation/apps/getting-started/system-prep-for-app-developers/1-setting-up-your-command-line-interface/#win)

[System prep for app developers 2: Managing Ruby versions](https://developer.zendesk.com/documentation/apps/getting-started/system-prep-for-app-developers/2-managing-ruby-versions/)

- Настройки темы, а так же переменные для CSS задаются в файле manifest.json
- Не забывать изменять "version" в manifest.json при любых изменениях в теме
- CSS-прероцессор не используется из-за особенностей ZAT
