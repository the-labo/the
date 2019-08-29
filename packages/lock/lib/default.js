'use strict'

const TheLock = require('./TheLock')

const lib = TheLock()

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheLock = TheLock

module.exports = Object.assign(lib, {
  TheLock,
})
