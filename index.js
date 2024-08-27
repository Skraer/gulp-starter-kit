const args = require('./gulpfile.js/args')
const tasks = require('./gulpfile.js')
const init = require('./gulpfile.js/createStructure')

module.exports = () => {
  if (args.init) {
    init()
  } else if (args.isProduct) {
    tasks.build()
  } else {
    tasks.dev()
  }
}
