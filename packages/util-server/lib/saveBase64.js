/**
 * Save base64 string into file
 * @function saveBase64
 * @param {string} dirname - Directory name
 * @param {string} basename - Basename of saving file
 * @param {string} data
 * @returns {Promise}
 */
'use strict'

const amkdirp = require('amkdirp')
const fs = require('fs')
const path = require('path')
const util = require('util')
const isBase64 = require('./isBase64')
const writeFileAsync = util.promisify(fs.writeFile)

const TYPE_EXTRACT_PATTERN = /^data:.*\/([\w+]+);base64,([\s\S]+)/

const Extensions = {
  'jpeg': 'jpg',
  'quicktime': 'mov',
  'svg+xml': 'svg',
}

/** @lends saveBase64 */
async function saveBase64 (dirname, basename, data) {
  if (!isBase64(data)) {
    throw new Error(`[saveBase64] data must be base64`)
  }
  await amkdirp(dirname)
  const matched = data.match(TYPE_EXTRACT_PATTERN)
  if (!matched) {
    return null
  }
  const [, type, payload] = matched
  const filename = path.join(dirname, [basename, Extensions[type] || type].join('.'))
  await amkdirp(path.dirname(filename))
  await writeFileAsync(filename, payload, 'base64')
  return {
    filename,
  }
}

module.exports = saveBase64
