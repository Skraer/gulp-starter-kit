const fs = require('fs')
const path = require('path')
const { source } = require('./paths')
const defaultConfig = require('./defaultConfig')

function createConfig() {
  const fileName = 'gulp.config.json'
  const filePath = path.join(process.cwd(), fileName)
  const schemaPath = path.join('node_modules', 'skraer-starter-kit', 'config_schema.json')
  const defaultConfigWithSchema = Object.assign(
    {
      $schema: schemaPath,
    },
    defaultConfig
  )
  const json = JSON.stringify(defaultConfigWithSchema, undefined, 2)
  fs.writeFileSync(filePath, json)
}

function createStructure() {
  const srcDir = source.toString()
  if (!fs.existsSync(path.join(srcDir))) {
    fs.mkdirSync(path.join(srcDir))
  }
  for (let dir in source) {
    if (dir === 'toString') continue
    if (!fs.existsSync(path.join(source[dir]))) {
      fs.mkdirSync(path.join(source[dir]))
    }
  }

  createConfig()
}

module.exports = createStructure
