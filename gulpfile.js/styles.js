const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const less = require('gulp-less')
const stylus = require('gulp-stylus')
const { source, output } = require('./paths')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const gulpIf = require('gulp-if')
const { notifyHandler } = require('./plumbers')
const args = require('./args')
const gcmq = require('gulp-group-css-media-queries')
const { wrongConfigParam } = require('./utils')

const filesDir = `${source.styles}/**/*.${args.stylesExt}`

const compressCss = args.minimize.includes('css')

const styleHandlers = {
  sass() {
    return sass({
      outputStyle: 'expanded',
      errLogToConsole: true,
    }).on('error', sass.logError)
  },
  less() {
    return less()
  },
  stylus() {
    return stylus()
  },
}

function stylesInit(browserSyncInstance) {
  return function styles() {
    let willCompress = args.isProduct && compressCss
    const styleHandler = styleHandlers[args.stylesType](willCompress)
    if (!styleHandler) {
      wrongConfigParam('styles_ext')
    }

    return src(filesDir)
      .pipe(
        plumber({
          errorHandler: notifyHandler('Styles'),
        })
      )
      .pipe(gulpIf(args.sourceMaps && willCompress, sourcemaps.init()))
      .pipe(styleHandler)
      .pipe(
        gulpIf(
          args.isProduct,
          autoprefixer({
            cascade: false,
          })
        )
      )
      .pipe(gulpIf(args.isProduct, gcmq()))
      .pipe(gulpIf(willCompress, cleanCSS()))
      .pipe(gulpIf(willCompress, rename({ suffix: '.min' })))
      .pipe(gulpIf(args.sourceMaps && willCompress, sourcemaps.write('./')))
      .pipe(dest(output.css))
      .pipe(browserSyncInstance.stream())
  }
}

module.exports = stylesInit
