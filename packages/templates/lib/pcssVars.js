'use strict'

const { spinalcase } = require('stringcase')
const _tmpl = require('./_tmpl')

const defaultKeyParser = (name) => spinalcase(String(name).toLowerCase())

/**
 * Variables for pcss
 * @memberof module:@the-/templates
 * @function pcssVars
 * @param {Object} config
 * @param {Object} config.values
 * @returns {Object}
 */
function pcssVars(config) {
  const { keyParser = defaultKeyParser, src, values } = config
  return {
    data: {
      src,
      values: Object.keys(values).reduce(
        (reduced, name) =>
          Object.assign(reduced, {
            [keyParser ? keyParser(name) : name]: values[name],
          }),
        {},
      ),
    },
    force: true,
    mode: '444',
    tmpl: _tmpl('pcss_vars.hbs'),
  }
}

module.exports = pcssVars
