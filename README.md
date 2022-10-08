# Основные возможности
Для полноценной настройки вам нужно создать файл gulp.config.json в корне проекта, который сконфигурирует все задачи. По умолчанию конфигурация выглядит так:

```
{
  "ignore_images": [],
  "layout_ext": "html",
  "styles_ext": "css",
  "minimize": [],
  "export_libs": []
}
```
А это пример пользовательской настройки
```
{
  "ignore_images": ["svg", "gif"],
  "layout_ext": "pug",
  "styles_ext": "stylus",
  "minimize": ["js", "css"],
  "export_libs": []
}
```

---

**ignore_images**  
Принимает массив из расширений, который определяет, какие изображения будут игнорироваться обработчиками изображений (напр. сжатие).  
Возможны следующие значения: **jpg**, **jpeg**, **png**, **gif**, **svg**.  

**layout_ext**  
Расширение файлов с разметкой.  
При указании отличных от **html** значений будет включен соответствующий обработчик.  
Возможные значения: **html**, **pug**.

**styles_ext**  
Расширение файлов со стилями.  
При указании отличных от css значений будет включен соответствующий обработчик.  
Возможные варианты: **sass**, **scss**, **stylus**, **less**, **css**.

**minimize**  
Массив значений, указывает какие файлы нужно минифицировать (минификация происходит только во время задачи **build**).

**export_libs**  
Массив с путями к библиотекам, которые нужно экспортировать в готовый проект.  
Пути можно указывать шаблонном виде, т.к. эти пути будут применены непосредственно в методе *gulp.src*.

---

## Основные команды

- Команда **build** собирает проект для продакшна
- Команда **init** инициализирует структуру папок
- Флаг **-dg** сообщает, что нужно применить *babel* для скриптов
- Флаг **-sm** включает *source maps*

---

## Пакеты, задействованные в сборщике  
| Название пакета | Срабатывает в dev среде | Срабатывает в prod среде | Вспомогательный |
| --- | --- | --- | --- |
| [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) | ✖ | ✔ |   |
| [gulp-babel](https://www.npmjs.com/package/gulp-babel) | ✖ | ✔ |  |
| [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) |  |  ||
| [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) |  |  ||
| [gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries) |  |  ||
| [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) |  |  ||
| [gulp-less](https://www.npmjs.com/package/gulp-less) |  |  ||
| [gulp-notify](https://www.npmjs.com/package/gulp-notify) |  |  | ✔ |
| [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) |  |   | ✔ |
| [gulp-preprocess](https://www.npmjs.com/package/gulp-preprocess) | ✔ | ✔ |  |
| [gulp-pug](https://www.npmjs.com/package/gulp-pug) | ✔ | ✔ |  |
| [gulp-rename](https://www.npmjs.com/package/gulp-rename) |  | ✔ | ✔ |
| [gulp-sass](https://www.npmjs.com/package/gulp-sass) |  |  |  |
| [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) |  |  |  |
| [gulp-stylus](https://www.npmjs.com/package/gulp-stylus) |  |   |  |
| [gulp-ttf2woff](https://www.npmjs.com/package/gulp-ttf2woff) |  |   |  |
| [gulp-ttf2woff2](https://www.npmjs.com/package/gulp-ttf2woff2) |  |   |  |
| [gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es) |  |   |  |

### Дополнительно
+ [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
  - использует префикс @@
+ [gulp-preprocess](https://www.npmjs.com/package/gulp-preprocess)
  - переменные:
    * STYLE_MIN: boolean
    * JS_MIN: boolean
    * IS_PRODUCTION: boolean

---
## Порядок задач и их функции
**fontConvert**  
*Задача по конвертации состоит из 2ух параллельных подзадач, конвертирующих woff и woff2. Сами задачи идентичны, за исключением самого плагина конвертации*
<!-- - чтение файла -->
- gulp-plumber + gulp-notify
- плагин конвертации (gulp-ttf2woff или gulp-ttf2woff2)
- запись файла

**markdown**  
<!-- - чтение файла -->
- gulp-pug если указан pug (так же минификация, если html был указан для минификации в конфиге)
- gulp-fileinclude
- gulp-preprocess
- запись файла

**styles**  
*Базовая функция stylesInit принимает в аргумент экземпляр browserSync и возвращает саму задачи*
<!-- - чтение файла -->
- gulp-plumber + gulp-notify
- инициализирует source maps, если указан соответствующий флаг, css указан для минификации в конфиге и среда prod (gulp-sourcemaps)
- обрабокта препроцессоров в зависимости от указанного в конфиге (gulp-sass, gulp-stylus или gulp-less)
- gulp-autoprefixer, если среда prod
- gulp-group-css-media-queries, если среда prod
- gulp-clean-css, если среда prod и css указан для минификации
- gulp-rename, добавляющий суффикс .min, если среда prod и css указан для минификации
- запись sourcemaps (при условиях)
- запись файла
- browserSyncInstance.stream

**javascript**  
<!-- - чтение файла -->
- gulp-plumber + gulp-notify
- инициализирует source maps, если указан соответствующий флаг, javascript/js указан для минификации в конфиге и среда prod (gulp-sourcemaps)
- gulp-babel, если указан соответствующий флаг и среда prod
- gulp-uglify-es, если javascript/js указан для минификации в конфиге и среда prod
- gulp-rename, добавляющий суффикс .min, если среда prod и javascript/js указан для минификации
- запись sourcemaps (при условиях)
- запись файла

**images**
*Исключаются те расширения, которые были указаны для игнорирования в конфиге*
<!-- - чтение файла -->
- gulp-plumber + gulp-notify
- gulp-imagemin (verbose только в среде prod)
  - gifsicle
  - mozjpeg
  - optipng
  - svgo
- запись файла

**exportLibs**  
*Задача exportHandler, где:*
- from - пути из поля конфига <u>export_libs</u>
- to - папка <u>/libs</u> конечной директории

**exportOther**  
*Задача exportHandler, где:*
- from - папка <u>other</u> исходной директории
- to - папка <u>other</u> конечной директории

**exportHandler** (принимает 2 аргумента - путь откуда и путь куда, и возвращает соответствующую задачу для экспорта файлов)
<!-- - чтение файла -->
- gulp-plumber + gulp-notify
- запись файла

---

## Оставшиеся задачи

- [x] write docs
- [ ] toaster (triggers: new file in libs, new file in other, etc)