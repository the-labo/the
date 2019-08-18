'use strict'

const { readFileAsync } = require('asfs')
const yaml = require('js-yaml')

/**
 * Read file as YAML
 * @memberof module:@the-/util-file
 * @function readAsYaml
 * @param filename
 * @param [options={}]
 * @returns {Promise<Object>} yaml data
 */
async function readAsYaml(filename, options = {}) {
  return yaml.safeLoad(await readFileAsync(filename))
}

module.exports = readAsYaml
