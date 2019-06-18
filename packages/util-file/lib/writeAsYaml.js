/**
 * Read file as YAML
 * @memberof module:@the-/util-file
 * @function writeAsYaml
 * @param {string} filename
 * @param {Object} data
 * @returns {Promise<Object>} yaml data
 */
'use strict'

const { mkdirpAsync, writeFileAsync } = require('asfs')
const yaml = require('js-yaml')
const path = require('path')

/** @lends module:@the-/util-file.writeAsYaml */
async function writeAsYaml(filename, data, options = {}) {
  const content = yaml.safeDump(data)
  await mkdirpAsync(path.dirname(filename))
  await writeFileAsync(filename, content)
}

module.exports = writeAsYaml