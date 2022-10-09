const { src, dest } = require('gulp')
const pug = require('gulp-pug')
const preprocess = require('gulp-preprocess')
const gulpIf = require('gulp-if')
const fileinclude = require('gulp-file-include')

const args = require('../args')
const { source, output } = require('../paths')
const { wrongConfigParam } = require('../utils')

const extensions = ['pug', 'html']

const minimizeHtml = args.minimize.includes('html')
const renameCss = (args.isProduct && args.minimize.includes('css')) || undefined
const renameJs = (args.isProduct && args.minimize.includes('js')) || undefined

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
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
        indent: true,
      })
    )
    .pipe(
      preprocess({
        context: {
          STYLE_MIN: renameCss,
          JS_MIN: renameJs,
          IS_PRODUCTION: args.isProduct,
        },
      })
    )
    .pipe(dest(output.html))
}

module.exports = markdown
