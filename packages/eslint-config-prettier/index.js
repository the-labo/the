/**
 * @module @the-/eslint-config-prettier
 */
'use strict'

const prettier = require('eslint-config-prettier')

module.exports = {
  plugins: ['prettier'],
  rules: {
    ...prettier.rules,
    'prettier/prettier': 'error',
  },
}
