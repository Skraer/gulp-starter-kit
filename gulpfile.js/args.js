const rawArgs = process.argv.slice(2)
const { normalArg, arrFromField } = require('./utils')
require('dotenv').config()
const { env } = require('process')
const path = require('path')

const defaultConfig = require('./defaultConfig')
let externalConfig;
try {
  externalConfig = require(path.join(process.cwd(), 'gulp.config.json'))
} catch (e) {
  externalConfig = {}
}
const config = { ...defaultConfig, ...externalConfig }

process.env.NODE_ENV = rawArgs.includes('build') ? 'production' : 'development'

const ignoreImages = arrFromField(config.ignore_images)
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg']
  .filter((ext) => !ignoreImages.includes(ext))
  .join(',')

const args = {
  mode: env.NODE_ENV || 'development',
  sourceMaps: false,
  layoutExt: normalArg(config.layout_ext),
  stylesExt: normalArg(config.styles_ext),
  isDevelop: env.NODE_ENV === 'development',
  isProduct: env.NODE_ENV === 'production',
  minimize: arrFromField(config.minimize).map(str => str === 'javascript' ? 'js' : str),
  downgrade: false,
  imgExts: imageExtensions,
  init: false,
  isDebug: false,
  cloneFonts: config.other_fonts,
  port: config.port
}

if (rawArgs.includes('debug')) {
  args.isDebug = true
}

if (rawArgs.includes('-sm')) {
  args.sourceMaps = true
}

if (rawArgs.includes('-dg')) {
  args.downgrade = true
}

if (rawArgs.includes('init')) {
  args.init = true
}

module.exports = args
