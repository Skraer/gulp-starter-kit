const del = require('del')
const { output } = require('../paths')

function clean() {
  return del(output.toString())
}

module.exports = clean