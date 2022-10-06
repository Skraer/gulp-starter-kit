import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

import { arrFromConfigField, normalArg } from './utils'
import { imageExtensionList } from 'default'
import { ArgsType, ConfigType, EnvModeType } from 'types'

const { env, argv } = process
const rawArgs = argv.slice(2)
const config = require(path.join(
  process.cwd(),
  'gulp.config.json'
)) as ConfigType

const envMode: EnvModeType = rawArgs.includes('build')
  ? 'production'
  : ('development' as EnvModeType)

const ignoreImages = arrFromConfigField(config.ignore_images)
const imageExtensions = imageExtensionList
  .filter((ext) => !ignoreImages.includes(ext))
  .join(',')

const args: ArgsType = {
  mode: envMode || 'development',
  sourceMaps: false,
  layoutExt: normalArg<ArgsType['layoutExt']>(config.layout_ext) || 'html',
  stylesExt: normalArg<ArgsType['stylesExt']>(config.styles_ext) || 'css',
  stylesType: 'css',
  isDevelop: env.NODE_ENV === 'development',
  isProduct: env.NODE_ENV === 'production',
  minimize: arrFromConfigField(config.minimize),
  downgrade: false,
  imgExts: imageExtensions,
  exportLibs: arrFromConfigField(config.export_libs),
  init: false,
}

if (args.stylesExt === 'scss' || args.stylesExt === 'sass') {
  args.stylesType = 'sass'
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
