const { src, dest } = require('gulp')
const args = require('../args')
const { source, output } = require('../paths')
const plumber = require('gulp-plumber')
const rs = require('../utils').reverseSlash
// const path = require('path')
const mozjpeg = require('imagemin-mozjpeg')
const optipng = require('imagemin-optipng')
const gifsicle = require('imagemin-gifsicle')
const imageminSvgo = require('imagemin-svgo')
const { extendDefaultPlugins } = require('svgo')

const imagemin = require('gulp-imagemin')
const { notifyHandler } = require('./plumbers')
const { ALL_IMAGES } = require('../../constants')

const optimizers = {
  png: optipng({
    optimizationLevel: 5,
  }),
  jpg: mozjpeg({
    progressive: true,
    quality: 65,
  }),
  jpeg: mozjpeg({
    progressive: true,
    quality: 65,
  }),
  gif: gifsicle({
    interlaced: true,
  }),
  svg: imageminSvgo({
    plugins: extendDefaultPlugins(['removeComments', 'removeEmptyAttrs']),
  }),
}

const optimized = ALL_IMAGES.filter((ext) => args.imgExts.includes(ext)).map(
  (ext) => optimizers[ext]
)

function images() {
  return src(`${source.images}/**/*.{${ALL_IMAGES.join(',')}}`)
    .pipe(
      plumber({
        errorHandler: notifyHandler('Images'),
      })
    )
    .pipe(
      imagemin(optimized, {
        verbose: args.isProduct || args.isDebug,
      })
    )
    .pipe(dest(output.images))
}

module.exports = images
