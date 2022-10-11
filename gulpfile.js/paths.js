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
  other: path.join(srcDir, 'other')
}

const output = {
  toString() {
    return outputDir
  },
  html: path.join(outputDir),
  images: path.join(outputDir, 'img'),
  css: path.join(outputDir, 'styles'),
  js: path.join(outputDir, 'js'),
  libs: path.join(outputDir, 'libs'),
  fonts: path.join(outputDir, 'fonts'),
  other: path.join(outputDir, 'other')
}

exports.source = source
exports.output = output
