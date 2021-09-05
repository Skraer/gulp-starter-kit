const { series, parallel, watch } = require('gulp')
const del = require('del')
const { source, output } = require('./paths')
const browserSync = require('browser-sync').create()
// require('dotenv').config()
const args = require('./args')
const rs = require('./utils').reverseSlash

const { wrongTask } = require('./utils')
const markdown = require('./tasks/markdown')
const javascript = require('./tasks/javascript')
const images = require('./tasks/images')
const exportHandler = require('./tasks/export')
const styles = require('./tasks/styles')(browserSync)
const sync = require('./tasks/sync')(browserSync)
const fontsConvert = require('./tasks/fonts')

function clean() {
  return del(output.toString())
}

// function createStructure(cb) {}
// const exportLibs = exportHandler(args.exportLibs, output.libs)
// const exportOther = exportHandler(`${source}/other/**/*.*`, `${output}/other`)

function defaultTask(cb) {
  wrongTask('dev, build')
  cb()
}

// const reverseSlash = (path) => path.replace(/\\/g, '/')

function watchTask() {
  const layoutExt = args.layoutExt
  const stylesExt = args.stylesExt
  
  watch(rs(`${source.markdown}/*.${layoutExt}`), series(markdown))
  watch(rs(`${source.styles}/**/*.${stylesExt}`), series(styles))
  watch(rs(`${source.js}/**/*.js`), series(javascript))
  watch(rs(`${source.images}/**/*.${args.imgExts}`), series(images))
}

const build = series(
  clean,
  parallel(markdown, styles, javascript, images),
  fontsConvert
)
const develop = series(build, parallel(watchTask, sync))

// console.log(true);

// if (args.isProduct) {
//   build()
// } else {
//   develop()
// }

exports.default = defaultTask
exports.build = build
exports.dev = develop
