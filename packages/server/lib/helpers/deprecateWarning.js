'use strict'

const { unlessProduction } = require('@the-/check')

function deprecateWarning(key, message, ...args) {
  if (deprecateWarning.done[key]) {
    return
  }
  deprecateWarning.done[key] = true
  unlessProduction(() => {
    console.warn(`[@the-/server] ${message}`, ...args)
  })
}

deprecateWarning.done = {}

module.exports = deprecateWarning
