const path = require('path')
const fs = require('fs')
const normalArg = (param) => param?.toLowerCase().trim() || null

const wrongConfigParam = (param) => {
  console.log(
    '\x1b[33m',
    'Wrong config parameter',
    '\x1b[0m',
    '\x1b[45m',
    `${param}`,
    '\x1b[0m',
    '\x1b[33m',
    'in file gulp.config.json',
    '\x1b[0m'
  )
  throw new Error('Custom parameter error')
}

const wrongTask = (availableTasks) => {
  console.log(
    '\x1b[41m',
    'Expected one of these tasks:',
    '\x1b[0m',
    '\x1b[45m',
    `${availableTasks}`,
    '\x1b[0m'
  )
  throw new Error('Wrong task name')
}

const reverseSlash = (path) => path.replace(/\\/g, '/')

const arrFromField = (value) => {
  if (typeof value === 'string') {
    return [value]
  } else if (value instanceof Array) {
    return value.map((item) => normalArg(item))
  } else {
    return []
  }
}

const createDir = (dirName) => {
  if (!fs.existsSync(path.join(dirName))) {
    fs.mkdirSync(path.join(dirName))
  }
}

const makeDir = (dirPath) => {
  const dirs = dirPath.split(/[\/\\]/g)

  if (dirs.length === 1) {
    createDir(dirs[0])
  } else if (dirs.length > 1) {
    for (let idx = 0; idx < dirs.length; idx++) {
      createDir(path.join(...dirs.slice(0, idx + 1)))
    }
  } else {
    console.error('Directory was not set')
  }
}

const writeFileTo = (pathTo, content) => {
  makeDir(path.join(...pathTo.split(/[\/\\]/g).slice(0, -1)))
  fs.writeFileSync(path.join(pathTo), Buffer.from(content))
  return pathTo
}

exports.normalArg = normalArg
exports.wrongConfigParam = wrongConfigParam
exports.wrongTask = wrongTask
exports.reverseSlash = reverseSlash
exports.arrFromField = arrFromField
exports.createDir = createDir
exports.makeDir = makeDir
exports.writeFileTo = writeFileTo
