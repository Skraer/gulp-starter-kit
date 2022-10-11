const { output } = require('../paths')
const args = require('../args')

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
      port: args.port || 3000,
    })
    browserSyncInstance
      .watch(`${output}/**/*.*`)
      .on('change', browserSyncInstance.reload)
  }
}
