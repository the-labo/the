'use strict'

/**
 * Error page
 * @memberof module:@the-/templates
 * @function vhost
 * @param {Object} config
 * @returns {Object}
 */
const assert = require('assert')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.vhost */
function vhost(config) {
  const { certDir = '/etc/letsencrypt/live', domain, port } = config
  assert(domain, 'domain is required')
  assert(port, 'port is required')
  return {
    data: {
      certDir,
      domain,
      port,
    },
    force: true,
    mode: '444',
    path: `${domain}`,
    tmpl: _tmpl('vhost.hbs'),
  }
}

module.exports = vhost
