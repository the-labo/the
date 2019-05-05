/**
 * Create an server instance
 * @memberof module:server
 * @function create
 * @returns {TheServer}
 */
'use strict'

const {
  Html,
  createClient,
  createHandle,
  createStore,
} = require('@self/client/shim')
const { isProduction } = require('@the-/check')
const theServer = require('@the-/server')
const { RedisConnections, WebApps } = require('../constants')
const mappings = require('../mappings')
const conf = require('../../conf')
const pkg = require('../../package')

const { ControllerMapping } = mappings
const defaultRedisConfig = {
  db: RedisConnections.Default.DB,
  host: RedisConnections.Default.HOST,
  port: RedisConnections.Default.PORT,
}

/** @lends module:server.create */
function create(config) {
  const {
    db,
    locales = conf.locales,
    redisConfig = defaultRedisConfig,
  } = config

  const buildNumber = isProduction() ? 0 : String(new Date().getTime())
  const app = {
    buildNumber,
    cdnUrl: isProduction() ? WebApps.Default.CDN_URL : null,
    db,
    locales,
    version: pkg.version,
  }

  return theServer({
    controllers: ControllerMapping,
    html: Html,
    info: { buildNumber },
    injectors: {
      app: () => app,
      client: () => createClient(),
      handle: () => createHandle(),
      store: () => createStore(),
    },
    langs: Object.keys(locales),
    redis: redisConfig,
    scope: app,
    static: isProduction() ? [] : [WebApps.Default.PUBLIC_DIR],
  })
}

module.exports = create
