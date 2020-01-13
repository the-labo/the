'use strict'

const fs = require('fs')
const ignore = require('ignore')
const { EOL } = require('os')

function ignoreFilter(filename) {
  if (!filename) {
    return null
  }

  const patterns = String(fs.readFileSync(filename)).split(EOL)
  return ignore()
    .add(patterns)
    .createFilter()
}

module.exports = ignoreFilter
