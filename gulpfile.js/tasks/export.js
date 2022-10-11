const { src, dest } = require('gulp')
const { notifyHandler } = require('./plumbers')
const plumber = require('gulp-plumber')
const { source, output } = require('../paths')

function exportHandler(from, to) {
  return function exportFiles() {
    return src(from)
      .pipe(
        plumber({
          errorHandler: notifyHandler('Export files'),
        })
      )
      .pipe(dest(to))
  }
}

exports.exportLibs = exportHandler(`${source.libs}/**/*.*`, `${output.libs}`)
exports.exportOther = exportHandler(`${source.other}/**/*.*`, `${output.other}`)
