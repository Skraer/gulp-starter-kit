const path = require('path')

const root = path.join(process.cwd())
const srcDir = path.join(root, 'src')
const outputDir = path.join(root, 'dist')

const source = {
  toString() {
    return srcDir
  },
  markdown: path.join(srcDir),
  images: path.join(srcDir, 'img'),
  styles: path.join(srcDir, 'styles'),
  js: path.join(srcDir, 'js'),
  libs: path.join(srcDir, 'libs'),
  fonts: path.join(srcDir, 'fonts'),
  // markdown: `${root}${srcDir}`,
  // images: `${root}${srcDir}/img`,
  // styles: `${root}${srcDir}/styles`,
  // js: `${root}${srcDir}/js`,
  // libs: `${root}${srcDir}/libs`,
  // fonts: `${root}${srcDir}/fonts`,
}

const output = {
  toString() {
    return outputDir
  },
  html: path.join(outputDir),
  images: path.join(outputDir, 'img'),
  css: path.join(outputDir, 'css'),
  js: path.join(outputDir, 'js'),
  libs: path.join(outputDir, 'libs'),
  fonts: path.join(outputDir, 'fonts'),

  // html: `${root}${outputDir}`,
  // images: `${root}${outputDir}/img`,
  // css: `${root}${outputDir}/css`,
  // js: `${root}${outputDir}/js`,
  // libs: `${root}${outputDir}/libs`,
  // fonts: `${root}${outputDir}/fonts`,
}

exports.source = source
exports.output = output
