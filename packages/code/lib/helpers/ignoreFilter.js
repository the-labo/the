'use strict'

const fs = require('fs')
const ignore = require('ignore')
const { EOL } = require('os')
const path = require('path')

const toTrue = () => true

function ignoreFilter(filename) {
  if (!filename) {
    return toTrue
  }

  const patterns = String(fs.readFileSync(filename))
    .split(EOL)
    .filter(Boolean)
    .map((pathname) => {
      if (/^\/./.test(path)) {
        return path.relative(process.cwd(), pathname)
      }

      return pathname
    })
  return ignore()
    .add(patterns)
    .createFilter()
}

module.exports = ignoreFilter
