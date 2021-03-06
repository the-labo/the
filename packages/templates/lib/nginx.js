'use strict'

const _tmpl = require('./_tmpl')

const TMPL_PATH = _tmpl('nginx.hbs')

/**
 * Define bud for nginx conf file
 * @memberof module:@the-/templates
 * @function nginx
 * @param {Object} config
 * @returns {Object}
 */
function nginx(config) {
  const {
    cert = '/etc/nginx/certs/server.cert',
    certKey = '/etc/nginx/certs/server.cert.key',
    domain = 'the-app.example.com',
    hostname = 'localhost',
    httpPort = 80,
    httpsPort = 443,
    name = 'the-app',
    port = 3000,
    publicDir,
  } = config
  return {
    data: {
      cert,
      certKey,
      domain,
      hostname,
      httpPort,
      httpsPort,
      name,
      port,
      publicDir,
    },
    force: true,
    mode: '444',
    tmpl: TMPL_PATH,
  }
}

module.exports = nginx
