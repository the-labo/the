'use strict'

function handleUnknownOptions(values) {
  const keys = Object.keys(values)
  if (keys.length > 0) {
    console.warn(`[TheMail] Unknown options`, keys)
  }
}

module.exports = handleUnknownOptions
