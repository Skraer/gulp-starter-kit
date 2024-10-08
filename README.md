# Основные возможности и мотивация
Этот пакет призван для упрощенной конфигурации сборки вашего gulp проекта. Вам не нужно устанавливать каждый раз gulp и дополнительные пакеты к нему, переносить сборку из проекта в проект - достаточно воспользоваться этим пакетом, создать [дополнительный файл конфигурации](#сконфигурируйте-вашу-сборку-максимально-просто), если это необходимо, и запустить нужный скрипт.  

Для начала, скачайте пакет командой
```
npm install --save-dev skraer-starter-kit
```
Затем добавьте скрипты в ваш package.json (чуть подробнее в [этом разделе](#добавьте-команды))
```
...
  "scripts": {
    "init": "skraer-starter-kit init",
    "dev": "skraer-starter-kit",
    "build": "skraer-starter-kit build"
  },
...
```

Далее, запустите команду init для инициализации структуры, и можно приступать к разработке!

---

## Сконфигурируйте вашу сборку максимально просто
Для полноценной настройки вам нужно создать файл gulp.config.json в корне проекта, который сконфигурирует все задачи. По умолчанию конфигурация выглядит так:

```
{
  "ignore_images": [],
  "layout_ext": "html",
  "styles_ext": "css",
  "minimize": [],
  "other_fonts": false,
  "port": 3000
}
```
А это пример пользовательской настройки
```
{
  "ignore_images": ["svg", "gif"],
  "layout_ext": "pug",
  "styles_ext": "stylus",
  "minimize": ["js", "css"],
  "other_fonts": true,
  "port": 5000
}
```
*Не обязательно указывать все поля в конфиг - достаточно тех, которые вы хотите изменить.*

**ignore_images**  
По умолчанию все картинки подвергаются сжатию и оптимизации. Вы можете указать расширения, которые будут игнорироваться оптимизаторами.  
Принимает массив из расширений.  
Возможны следующие значения: **jpg**, **jpeg**, **png**, **gif**, **svg**.  

**layout_ext**  
Расширение файлов с разметкой, по умолчанию установлен **html**.  
При указании отличных от **html** значений будет включен соответствующий обработчик.  
Возможные значения: **html**, **pug**.

**styles_ext**  
Расширение файлов со стилями, по умолчанию установлен **css**.  
При указании отличных от css значений будет включен соответствующий обработчик.  
Возможные варианты: **sass**, **scss**, **stylus**, **less**, **css**.

**minimize**  
Массив значений, указывает какие файлы нужно минифицировать (минификация происходит только во время задачи **build**).  
Возможные значения: **html** (пока что работает только если в layout_ext включен pug), **javascript** или **js**, **css**.

**other_fonts**  
Булево значение, определяющее, будут ли перенесены остальные исходные шрифты в конечную директорию.  
По умолчанию с флагом **false** поведение следующее: если в папке src/fonts есть файлы ttf, то сборщик конвертирует их в woff и woff2 и переносит в dist/fonts. Если же **woff и woff2** уже есть в исходной папке, то они просто будут перенесены.  
Если установить значение **true**, то все остальные шрифты будут также перенесены.

**port**  
Порт, на котором будет запущен сервер разработки.  
По умолчанию 3000

---

## Добавьте команды
Добавьте в ваш package.json в поле scripts следующие скрипты:
- **skraer-starter-kit build** для конечной сборки проекта в режиме production
- **skraer-starter-kit init** для инициализации структуры проекта и создания конфига по умолчанию
- **skraer-starter-kit** без одного из верхних аргументов - запускает сборку в development режиме  

А также, вы можете инициировать базовые шаблоны с помощью команды **skraer-starter-kit tpl**, указав через двоеточие нужные файлы. Пример команды с полным перечнем доступных файлов: **skraer-starter-kit tpl:html:js:css:scss**  

### Также доступны флаги:
- Флаг **-dg** сообщает, что нужно применить *babel* для скриптов
- Флаг **-sm** включает *source maps*
- Флаг **-debug** включает переменную *DEBUG*

---
## Структура проекта
```
src
├───fonts
├───img
├───js
├───libs
├───other
└───styles
```
- в папку **fonts** можно добавлять шрифты с разрешением ttf - сборщик переформатирует
- в папку **libs** разместите библиотеки, которые вам нужны - по итогу они будут просто экспортированы
- в папке **other** можете держать дополнительные файлы, например, какие-то файлы для скачивания в конечном проекте  

Файлы с разметкой должны располагаться в папке src на верхнем уровне.

Аналогичная структура будет создана в папке dist.

---

## Пакеты, задействованные в сборщике  
| Название пакета | Срабатывает в dev среде | Срабатывает в prod среде | Вспомогательный |
| --- | --- | --- | --- |
| [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) |  | ✔ |   |
| [gulp-babel](https://www.npmjs.com/package/gulp-babel) |  | ✔ |  |
| [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) |  | ✔ ||
| [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) | ✔ | ✔ |  |
| [gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries) |  | ✔ |  |
| [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) | ✔ | ✔ ||
| [gulp-less](https://www.npmjs.com/package/gulp-less) | ✔ | ✔ ||
| [gulp-notify](https://www.npmjs.com/package/gulp-notify) | ✔ | ✔ | ✔ |
| [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) | ✔ | ✔ | ✔ |
| [gulp-preprocess](https://www.npmjs.com/package/gulp-preprocess) | ✔ | ✔ |  |
| [gulp-pug](https://www.npmjs.com/package/gulp-pug) | ✔ | ✔ |  |
| [gulp-rename](https://www.npmjs.com/package/gulp-rename) |  | ✔ ||
| [gulp-sass](https://www.npmjs.com/package/gulp-sass) | ✔ | ✔ ||
| [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) |  | ✔ ||
| [gulp-stylus](https://www.npmjs.com/package/gulp-stylus) | ✔ | ✔ ||
| [gulp-ttf2woff](https://www.npmjs.com/package/gulp-ttf2woff) | ✔ | ✔ ||
| [gulp-ttf2woff2](https://www.npmjs.com/package/gulp-ttf2woff2) | ✔ | ✔ ||
| [gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es) |  | ✔ ||

### Дополнительно
[**gulp-file-include**](https://www.npmjs.com/package/gulp-file-include)  
Использует префикс @@. Удобно использовать вместе с разметкой для некого подобия компонентной системы.  
Вы можете создать директорию (напр., src/modules) и в ней держать какие-либо компоненты, например шапку сайта.  
В разметке это будет выглядеть так:
```
<div class="container">
  @@include('./modules/header.html')
</div>
```
Так же вы можете подключать компоненты с определенными опциями/переменными. Подробнее смотрите в [документации данного пакета](https://github.com/haoxins/gulp-file-include#examples).

[**gulp-preprocess**](https://www.npmjs.com/package/gulp-preprocess)  
Определяет некоторые переменные для удобства в разметке:
- STYLE_MIN - true, если это production среда и css указан для минификации
- JS_MIN - true, если это production среда и javascript/js указан для минификации
- IS_PRODUCTION - true, если это production среда
- DEBUG - true, если указан соответствующий флаг

Это может быть очень полезно для автоматической подстановки суффикса .min для скриптов и стилей, или для вставки метрик, которые во время разработки не хотелось бы подключать.  
```
<head>
...
  <!-- @if STYLE_MIN -->
  <link rel="stylesheet" href="styles/style.min.css">
  <!-- @endif -->
  <!-- @if !STYLE_MIN -->
  <link rel="stylesheet" href="styles/style.css">
  <!-- @endif -->
...
</head>
```
[**gulp-rename**](https://www.npmjs.com/package/gulp-rename)  
Переименовывает файлы **js** и **css**, добавляя к ним суффикс **.min**, но только в том случае, если среда *production* и соответствующие расширения указаны в поле *minimize*.

---
## Задачи  
Вы можете посмотреть на исходники задач по этим ссылкам:  
[**clean**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/clean.js)  
[**defaultTask**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/defaultTask.js)  
[**notifier**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/plumbers.js)  
[**export**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/export.js)  
[**fontConvert**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/fonts.js)  
[**images**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/images.js)  
[**javascript**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/javascript.js)  
[**markdown**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/markdown.js)  
[**styles**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/styles.js)  
[**sync**](https://github.com/Skraer/gulp-starter-kit/blob/master/gulpfile.js/tasks/sync.js)

---

## TODO

- [x] write docs
- [ ] toaster (triggers: new file in libs, new file in other, etc)
- [ ] ignore directories with prefix __