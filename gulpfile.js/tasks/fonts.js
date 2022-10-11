const { src, dest, parallel } = require('gulp')
const { notifyHandler } = require('./plumbers')
const plumber = require('gulp-plumber')
const { source, output } = require('../paths')
const args = require('../args')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

function fontsHandler(plugin, ext) {
  return function fonts() {
    return src(`${source.fonts}/**/*.*`)
      .pipe(
        plumber({
          errorHandler: notifyHandler(`Fonts: ${ext}`),
        })
      )
      .pipe(plugin({
        clone: args.cloneFonts
      }))
      .pipe(dest(output.fonts))
  }
}

const woff = fontsHandler(ttf2woff, 'woff')
const woff2 = fontsHandler(ttf2woff2, 'woff2')

const fontsConvert = parallel(woff, woff2)

module.exports = fontsConvert
