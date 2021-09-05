exports.normalArg = (param) => param?.toLowerCase().trim() || null
exports.wrongConfigParam = (param) => {
  console.log(
    '\x1b[33m',
    'Вероятно, неверно указан параметр',
    '\x1b[0m',
    '\x1b[45m',
    `${param}`,
    '\x1b[0m',
    '\x1b[33m',
    'в файле gulp.config.json',
    '\x1b[0m'
  )
  throw new Error('Custom parameter error')
}
exports.wrongTask = (availableTasks) => {
  console.log(
    '\x1b[41m',
    'Укажите один из представленных тасков:',
    '\x1b[0m',
    '\x1b[45m',
    `${availableTasks}`,
    '\x1b[0m'
  )
  throw new Error('Wrong task name')
}
exports.reverseSlash = (path) => path.replace(/\\/g, '/')