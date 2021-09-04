const fs = require('fs')
const path = require('path')
const { source } = require('./paths')

function createStructure() {
  const src = source.toString()
  // console.log(src)
  if (!fs.existsSync(path.join(src))) {
    fs.mkdirSync(path.join(src))
  }
  for (let dir in source) {
    if (dir === 'toString') continue
    if (!fs.existsSync(path.join(source[dir]))) {
      fs.mkdirSync(path.join(source[dir]))
    }
  }
}
createStructure()

module.exports = createStructure
