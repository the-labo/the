'use strict'
const standardJSX = require('eslint-config-standard-jsx')

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ...standardJSX.parserOptions,
  },
  plugins: [...standardJSX.plugins],
  rules: {
    ...standardJSX.rules,
  },
}
