const fs = require('fs')
const path = require('path')
const { source } = require('./paths')
const { writeFileTo } = require('./utils')

const templateScss = () => {
  const contentFonts = fs.readFileSync(path.join(__dirname, '../templates/landing/_fonts.scss'))
  writeFileTo(path.join(source.styles, '_fonts.scss'), contentFonts)
  const contentReset = fs.readFileSync(path.join(__dirname, '../templates/landing/_reset.scss'))
  writeFileTo(path.join(source.styles, '_reset.scss'), contentReset)
  const contentVars = fs.readFileSync(path.join(__dirname, '../templates/landing/_vars.scss'))
  writeFileTo(path.join(source.styles, '_vars.scss'), contentVars)
  const contentBase = fs.readFileSync(path.join(__dirname, '../templates/landing/_base.scss'))
  writeFileTo(path.join(source.styles, '_base.scss'), contentBase)
  const contentStyle = fs.readFileSync(path.join(__dirname, '../templates/landing/style.scss'))
  writeFileTo(path.join(source.styles, 'style.scss'), contentStyle)
}

const templateCss = () => {
  const content = fs.readFileSync(path.join(__dirname, '../templates/landing/style.css'))
  writeFileTo(path.join(source.styles, 'style.css'), content)
}

const templateJs = () => {
  const content = fs.readFileSync(path.join(__dirname, '../templates/landing/main.js'))
  writeFileTo(path.join(source.js, 'main.js'), content)
}

const templateHtml = () => {
  const content = fs.readFileSync(path.join(__dirname, '../templates/landing/index.html'))
  writeFileTo(path.join(source.markdown, 'index.html'), content)
}

exports.templateScss = templateScss
exports.templateCss = templateCss
exports.templateJs = templateJs
exports.templateHtml = templateHtml
