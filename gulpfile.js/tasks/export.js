const { src, dest } = require('gulp')
const { notifyHandler } = require('./plumbers')
const plumber = require('gulp-plumber')


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

module.exports = exportHandler
