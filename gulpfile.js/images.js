const { src, dest } = require('gulp')
const args = require('./args')
const { source, output } = require('./paths')
const plumber = require('gulp-plumber')

const imagemin = require('gulp-imagemin')
const { notifyHandler } = require('./plumbers')

function images() {
  return src(`${source.images}/**/*.{${args.imgExts}}`)
    .pipe(
      plumber({
        errorHandler: notifyHandler('Images'),
      })
    )
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({
            interlaced: true,
          }),
          imagemin.mozjpeg({
            progressive: true,
            quality: 65,
          }),
          imagemin.optipng({
            optimizationLevel: 5,
          }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ],
        {
          verbose: args.isProduct,
        }
      )
    )
    .pipe(dest(output.images))
}

module.exports = images
