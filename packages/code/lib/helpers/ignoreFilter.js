'use strict'

const fs = require('fs')
const ignore = require('ignore')
const { EOL } = require('os')
const path = require('path')

const toTrue = () => true

const toRelativePath = (pathname) => {
  if (/^\/./.test(pathname)) {
    return path.relative(process.cwd(), pathname)
  }

  return pathname
}

function ignoreFilter(filename) {
  if (!filename) {
    return toTrue
  }

  const patterns = String(fs.readFileSync(filename))
    .split(EOL)
    .filter(Boolean)
    .map((filename) => toRelativePath(filename))
  const ignoreFilter = ignore()
    .add(patterns)
    .createFilter()
  return function filter(filename) {
    filename = toRelativePath(filename)
    return ignoreFilter(filename)
  }
}

module.exports = ignoreFilter
