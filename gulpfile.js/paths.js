const srcDir = 'src'
const outputDir = 'dist'

const source = {
  toString() {
    return srcDir
  },
  markdown: `${srcDir}`,
  images: `${srcDir}/img`,
  styles: `${srcDir}/styles`,
  js: `${srcDir}/js`,
  libs: `${srcDir}/libs`,
  fonts: `${srcDir}/fonts`,
}

const output = {
  toString() {
    return outputDir
  },
  html: `${outputDir}`,
  images: `${outputDir}/img`,
  css: `${outputDir}/css`,
  js: `${outputDir}/js`,
  libs: `${outputDir}/libs`,
  fonts: `${outputDir}/fonts`,
}

exports.source = source
exports.output = output
