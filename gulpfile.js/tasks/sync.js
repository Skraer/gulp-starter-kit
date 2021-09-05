// const browserSync = require('browser-sync')
const { output } = require('../paths')

module.exports = function syncInit(browserSyncInstance) {
  return function sync() {
    browserSyncInstance.init({
      server: {
        baseDir: output.toString(),
      },
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
        location: false,
      },
      port: 3000,
    })
    browserSyncInstance
      .watch(`${output}/**/*.*`)
      .on('change', browserSyncInstance.reload)
  }
}
