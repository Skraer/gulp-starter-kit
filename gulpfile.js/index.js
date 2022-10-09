const { series, parallel, watch } = require('gulp')
const browserSync = require('browser-sync').create()

const { source } = require('./paths')
const args = require('./args')
const { reverseSlash: rs } = require('./utils')

// tasks
const markdown = require('./tasks/markdown')
const javascript = require('./tasks/javascript')
const images = require('./tasks/images')
const { exportLibs, exportOther } = require('./tasks/export')
const styles = require('./tasks/styles')(browserSync)
const sync = require('./tasks/sync')(browserSync)
const fontsConvert = require('./tasks/fonts')
const clean = require('./tasks/clean')
const defaultTask = require('./tasks/defaultTask')

function watchTask() {
  const layoutExt = args.layoutExt
  const stylesExt = args.stylesExt

  watch(rs(`${source.markdown}/**/*.${layoutExt}`), series(markdown))
  watch(rs(`${source.styles}/**/*.${stylesExt}`), series(styles))
  watch(rs(`${source.js}/**/*.js`), series(javascript))
  watch(rs(`${source.images}/**/*.${args.imgExts}`), series(images))
}

const build = series(
  clean,
  parallel(
    fontsConvert,
    markdown,
    styles,
    javascript,
    images,
    exportLibs,
    exportOther
  )
)
const develop = series(build, parallel(watchTask, sync))

exports.default = defaultTask
exports.build = build
exports.dev = develop
