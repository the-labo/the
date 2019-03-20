/**
 * Bud for predefined errors
 */
'use strict'

const errors = require('./.errors')
module.exports = errors.map(({ name, status }) => ({
  data: {
    errorName: name.replace(/^The/, ''),
    name: `${name}`,
    status,
  },
  force: true,
  mode: '444',
  path: `${name}.js`,
}))

if (!module.parent) {
  require('coz').render(__filename)
}
