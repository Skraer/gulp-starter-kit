const fs = require('fs')
const path = require('path')
const { source } = require('./paths')

function createStructure() {
  const srcDir = source.toString()
  // console.log(src)
  if (!fs.existsSync(path.join(srcDir))) {
    fs.mkdirSync(path.join(srcDir))
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
