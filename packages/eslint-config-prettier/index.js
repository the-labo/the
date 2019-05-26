'use strict'
/**
 * @module @the-/eslint-config-prettier
 */
const prettier = require('eslint-config-prettier')

module.exports = {
  plugins: ['prettier'],
  rules: {
    ...prettier.rules,
    'prettier/prettier': 'error',
  },
}
