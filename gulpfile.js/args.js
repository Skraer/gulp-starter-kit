const rawArgs = process.argv.slice(2)
const { normalArg } = require('./utils')
require('dotenv').config()
const { env } = require('process')
const config = require('../gulp.config.json')

const arrFromConfigField = (value) => {
  if (typeof value === 'string') {
    return [value]
  } else if (value instanceof Array) {
    return value.map((item) => normalArg(item))
  } else {
    return []
  }
}

process.env.NODE_ENV = rawArgs.includes('build') ? 'production' : 'development'

const ignoreImages = arrFromConfigField(config.ignore_images)
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg']
  .filter((ext) => !ignoreImages.includes(ext))
  .join(',')

const args = {
  mode: env.NODE_ENV || 'development',
  sourceMaps: false,
  layoutExt: normalArg(config.layout_ext) || 'html',
  stylesExt: normalArg(config.styles_ext) || 'css',
  stylesType: 'css',
  isDevelop: env.NODE_ENV === 'development',
  isProduct: env.NODE_ENV === 'production',
  minimize: arrFromConfigField(config.minimize),
  downgrade: false,
  imgExts: imageExtensions,
  exportLibs: arrFromConfigField(config.export_libs),
}

if (args.tylesExt === 'scss' || args.stylesExt === 'sass') {
  args.stylesType = 'sass'
}

if (rawArgs.includes('-sm')) {
  args.sourceMaps = true
}

if (rawArgs.includes('-dg')) {
  args.downgrade = true
}

module.exports = args
