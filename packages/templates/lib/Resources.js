/**
 * @function Resources
 */
'use strict'

const _tmpl = require('./_tmpl')

/** @lends Resources */
function Resources(config) {
  const {
    ResourceMapping,
    pathPrefix = 'server/db/resources/',
    pathSuffix = 'Resource.js',
  } = config
  return {
    data: {
      Resources: ResourceMapping,
      pathPrefix,
      pathSuffix,
    },
    force: true,
    mode: '444',
    tmpl: _tmpl('Resources.hbs'),
  }
}

module.exports = Resources