const args = require('./gulpfile.js/args')
const tasks = require('./gulpfile.js')
const init = require('./gulpfile.js/createStructure')
const { templateScss, templateCss, templateJs, templateHtml } = require('./gulpfile.js/template.js')

module.exports = () => {
  if (args.init) {
    init()
  } else if (args.tpl) {
    if (args.templates.includes('scss')) templateScss()
    if (args.templates.includes('css')) templateCss()
    if (args.templates.includes('js')) templateJs()
    if (args.templates.includes('html')) templateHtml()
  } else if (args.isProduct) {
    tasks.build()
  } else {
    tasks.dev()
  }
}
