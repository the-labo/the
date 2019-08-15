'use strict'

const globals = require('globals')
const { JSDocPreferredTypes } = require('@the-/const-code')

const definedTypes = [
  ...Object.keys(globals.builtin),
  ...Object.keys(globals.browser),
  ...Object.keys(globals.serviceworker),
]

module.exports = {
  Settings: {
    jsdoc: {
      preferredTypes: {
        ...JSDocPreferredTypes,
      },
    },
  },
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jsdoc'],
  rules: {
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-examples': 'off',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-syntax': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/newline-after-description': ['error', 'never'],
    'jsdoc/no-undefined-types': [
      'error',
      {
        definedTypes,
      },
    ],
    'jsdoc/require-example': 'off',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-param': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns-type': 'error',
    'jsdoc/valid-types': 'error',
  },
}
