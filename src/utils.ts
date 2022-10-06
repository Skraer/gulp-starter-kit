export const normalArg = <Expected = string>(param: string): Expected | null =>
  param ? (param.toLowerCase().trim() as Expected) : null

export const reverseSlash = (path: string) => path.replace(/\\/g, '/')

export const arrFromConfigField = (value: string | string[]) => {
  if (typeof value === 'string') {
    return [value]
  } else if (value instanceof Array) {
    return value.map((item) => normalArg(item))
  }
  return []
}

export const wrongConfigParam = (param: string) => {
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

export const wrongTask = (availableTasks: string) => {
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
