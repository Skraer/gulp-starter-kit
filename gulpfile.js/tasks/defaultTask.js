const { wrongTask } = require('../utils')

function defaultTask(cb) {
  wrongTask('dev, build')
  cb()
}

module.exports = defaultTask