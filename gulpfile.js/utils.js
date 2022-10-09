exports.normalArg = (param) => param?.toLowerCase().trim() || null

exports.wrongConfigParam = (param) => {
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

exports.wrongTask = (availableTasks) => {
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

exports.reverseSlash = (path) => path.replace(/\\/g, '/')

exports.arrFromField = (value) => {
  if (typeof value === 'string') {
    return [value]
  } else if (value instanceof Array) {
    return value.map((item) => normalArg(item))
  } else {
    return []
  }
}