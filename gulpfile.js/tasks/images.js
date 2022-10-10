const { src, dest } = require('gulp')
const args = require('../args')
const { source, output } = require('../paths')
const plumber = require('gulp-plumber')
const rs = require('../utils').reverseSlash
// const path = require('path')
const mozjpeg = require('imagemin-mozjpeg')
const optipng = require('imagemin-optipng')
const gifsicle = require('imagemin-gifsicle')
const svgo = require('imagemin-svgo')

const imagemin = require('gulp-imagemin')
const { notifyHandler } = require('./plumbers')

function images() {
  const dir = `${source.images}/**/*.{${args.imgExts}}`
  return src(dir)
    .pipe(
      plumber({
        errorHandler: notifyHandler('Images'),
      })
    )
    .pipe(
      imagemin(
        [
          gifsicle({
            interlaced: true,
          }),
          mozjpeg({
            progressive: true,
            quality: 65,
          }),
          optipng({
            optimizationLevel: 5,
          }),
          svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ],
        {
          verbose: args.isProduct || args.isDebug,
        },
      )
    )
    .pipe(dest(output.images))
}

module.exports = images
