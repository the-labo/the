'use strict'

const path = require('path')

module.exports = {
  sourceTypeOf(filename) {
    switch (path.extname(filename)) {
      case '.js':
        return 'unambiguous'
      case '.jsx':
      case '.mjs':
        return 'module'
      default:
    }
  },
  typeOf(filename) {
    switch (path.extname(filename)) {
      case '.css':
      case '.pcss':
        return 'stylesheet'
      case '.js':
      case '.mjs':
      case '.jsx':
      case '.bud':
        return 'javascript'
      case '.json':
        return 'json'
      case '.yml':
      case '.yaml':
        return 'yaml'
      default:
        return 'text'
    }
  },
}
