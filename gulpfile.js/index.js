const { series, parallel, watch } = require('gulp')
const del = require('del')
const { source, output } = require('./paths')
const browserSync = require('browser-sync').create()
// require('dotenv').config()
const args = require('./args')

const { wrongTask } = require('./utils')
const markdown = require('./markdown')
const javascript = require('./javascript')
const images = require('./images')
const exportHandler = require('./export')
const styles = require('./styles')(browserSync)
const sync = require('./sync')(browserSync)
const fontsConvert = require('./fonts')
// function images(cb) {}
function fonts(cb) {}
function clean() {
  return del('./dist')
}

function createStructure(cb) {}
const exportLibs = exportHandler(args.exportLibs, output.libs)
const exportOther = exportHandler(`${source}/other/**/*.*`, `${output}/other`)

function defaultTask(cb) {
  wrongTask('dev, build')
  cb()
}

function watchTask() {
  const layoutExt = args.layoutExt
  const stylesExt = args.stylesExt

  watch(`${source.markdown}/*.${layoutExt}`, series(markdown))
  watch(`${source.styles}/**/*.${stylesExt}`, series(styles))
  watch(`${source.js}/**/*.js`, series(javascript))
  watch(`${source.images}/**/*.${args.imgExts}`, series(images))
}

const build = series(
  clean,
  parallel(markdown, styles, javascript, images, exportLibs, exportOther),
  fontsConvert
)
const develop = series(build, parallel(watchTask, sync))

exports.default = defaultTask
exports.build = build
exports.dev = develop
