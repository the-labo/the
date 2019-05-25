'use strict'
const path = require('path')
const { TypeNamings, Types } = require('../constants')

module.exports = {
  sourceTypeOf(filename) {
    switch (path.extname(filename)) {
      case '.js':
        return 'unambiguous'
      case '.jsx':
      case '.mjs':
        return 'module'
      default:
        break
    }
  },
  typeOf(filename) {
    const extname = path.extname(filename)
    const basename = path.basename(filename)
    for (const [type, basenames] of Object.entries(TypeNamings.Basenames)) {
      const hit = basenames.split(',').includes(basename)
      if (hit) {
        return type
      }
    }
    for (const [type, extnames] of Object.entries(TypeNamings.Extensions)) {
      const hit = extnames.split(',').includes(extname)
      if (hit) {
        return type
      }
    }
    return Types.TEXT
  },
}
