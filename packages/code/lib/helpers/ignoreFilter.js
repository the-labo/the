'use strict'

const fs = require('fs')
const ignore = require('ignore')
const { EOL } = require('os')

const toTrue = () => true

function ignoreFilter(filename) {
  if (!filename) {
    return toTrue
  }

  const patterns = String(fs.readFileSync(filename)).split(EOL)
  return ignore()
    .add(patterns)
    .createFilter()
}

module.exports = ignoreFilter
