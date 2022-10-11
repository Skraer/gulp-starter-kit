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

exports.normalArg = normalArg
exports.wrongConfigParam = wrongConfigParam
exports.wrongTask = wrongTask
exports.reverseSlash = reverseSlash
exports.arrFromField = arrFromField