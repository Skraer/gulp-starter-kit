const { src, dest } = require('gulp')
const pug = require('gulp-pug')
const args = require('../args')
const { source, output } = require('../paths')
const preprocess = require('gulp-preprocess')
const { wrongConfigParam } = require('../utils')
const gulpIf = require('gulp-if')


const extensions = ['pug', 'html']

const minimizeHtml = !args.minimize.includes('html')
const renameCss = (args.isProduct && args.minimize.includes('css')) || undefined
const renameJs =
  (args.isProduct &&
    (args.minimize.includes('js') || args.minimize.includes('javascript'))) ||
  undefined

function markdown() {
  if (!extensions.includes(args.layoutExt)) {
    wrongConfigParam('layout_ext')
  }
  // console.log('path: ', `${source.markdown}/*.${args.layoutExt}`);
  return src(`${source.markdown}/*.${args.layoutExt}`)
    .pipe(
      gulpIf(
        args.layoutExt === 'pug',
        pug({
          pretty: minimizeHtml,
        })
      )
    )
    .pipe(preprocess({ context: { STYLE_MIN: renameCss, JS_MIN: renameJs } }))
    .pipe(dest(output.html))
}

module.exports = markdown
