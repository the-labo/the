'use strict'

/**
 * Name a file
 * @function nameFile
 * @param {Object} [options={}] - Optional settings
 * @param {string|string[]} [options.dir] - Directory name
 * @param {string} [options.name=uuid.v4()] - Name
 * @param {string} [options.type] -  Type of file
 * @returns {string}
 */
const mime = require('mime')
const path = require('path')
const { v4: uuid } = require('uuid')

/** @lends nameFile */
function nameFile(options = {}) {
  const { dir = [], ext, name = uuid(), type } = options

  return [
    path.join(...[...[].concat(dir || []), name].filter(Boolean)),
    ext || (type ? mime.getExtension(type) : null),
  ]
    .filter(Boolean)
    .join('.')
}

module.exports = nameFile
