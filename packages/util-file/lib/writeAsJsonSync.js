/**
 * @function writeAsJsonSync
 * @param {string} filename
 * @param {Object} data
 */
'use strict'

const { writeFileSync } = require('fs')
const JSON5 = require('json5')
const mkdirp = require('mkdirp')
const path = require('path')
const sortProperties = require('./helpers/sortProperties')
const isJSON5File = require('./isJSON5File')

/** @lends writeAsJsonSync */
function writeAsJsonSync(filename, data) {
  mkdirp.sync(path.dirname(filename))
  data = sortProperties(data)
  const isJSON5 = isJSON5File(filename)
  const content = isJSON5
    ? JSON5.stringify(data, null, 2)
    : JSON.stringify(data, null, 2)
  writeFileSync(filename, content)
}

module.exports = writeAsJsonSync
