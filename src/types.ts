export type ImageExtensionLiteralType =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'svg'
  | 'all'
export type LayoutExtensionLiteralType = 'html' | 'pug'

export type StylesExtensionLiteralType = 'sass' | 'stylus' | 'less'
export type StylesLiteralType = StylesExtensionLiteralType | 'css' | 'scss'

export type AllowMinimizeLiteralType = 'javascript' | 'js' | 'html' | 'css'

export type EnvModeType = 'production' | 'development'

export type ConfigType = {
  ignore_images: ImageExtensionLiteralType[]
  layout_ext: LayoutExtensionLiteralType
  styles_ext: StylesExtensionLiteralType
  minimize: AllowMinimizeLiteralType | AllowMinimizeLiteralType[]
  export_libs: string[]
}

export type ArgsType = {
  mode: EnvModeType
  sourceMaps: boolean
  layoutExt: LayoutExtensionLiteralType
  stylesExt: StylesExtensionLiteralType
  stylesType: StylesLiteralType
  isDevelop: boolean
  isProduct: boolean
  minimize: AllowMinimizeLiteralType[]
  downgrade: boolean
  imgExts: string // "jpg,jpeg,png" comma
  exportLibs: string[]
  init: boolean
}

export type RawArgsType =
  | 'build'
  | 'init'
  | '-sm' // source maps
  | '-dg' // downgrade
