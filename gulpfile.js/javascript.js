const { src, dest } = require('gulp')
const { source, output } = require('./paths')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const gulpIf = require('gulp-if')
const { notifyHandler } = require('./plumbers')
const args = require('./args')
// const { wrongEnvParam } = require('./utils')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default

const minimizeJs =
  (args.minimize.includes('js') || args.minimize.includes('javascript')) &&
  args.isProduct

function javascript() {
  return src(`${source.js}/**/*.js`)
    .pipe(
      plumber({
        errorHandler: notifyHandler('Javascript'),
      })
    )
    .pipe(gulpIf(args.sourceMaps && minimizeJs, sourcemaps.init()))
    .pipe(
      gulpIf(
        args.downgrade && args.isProduct,
        babel({
          presets: ['@babel/env'],
        })
      )
    )
    .pipe(gulpIf(minimizeJs, uglify()))
    .pipe(gulpIf(minimizeJs, rename({ suffix: '.min' })))
    .pipe(gulpIf(args.sourceMaps && minimizeJs, sourcemaps.write('./')))
    .pipe(dest(output.js))
}

module.exports = javascript
