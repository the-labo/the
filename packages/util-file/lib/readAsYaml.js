/**
 * Read file as YAML
 * @memberof module:@the-/util-file
 * @function readAsYaml
 * @returns {Promise<Object>} yaml data
 */
'use strict'

const { readFileAsync } = require('asfs')
const yaml = require('js-yaml')

/** @lends module:@the-/util-file.readAsYaml */
async function readAsYaml(filename, options = {}) {
  return yaml.safeLoad(await readFileAsync(filename))
}

module.exports = readAsYaml
