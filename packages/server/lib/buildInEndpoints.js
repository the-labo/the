'use strict'

/**
 * Build in endpoints
 * @memberof module:@the-/server
 * @namespace buildInEndpoints
 */
/** @lends module:@the-/server.buildInEndpoints */
module.exports = {
  '/the/info': async (ctx) => {
    const { server } = ctx
    ctx.status = 200
    ctx.body = server.info()
  },
  '/the/ping': async (ctx) => {
    ctx.status = 200
    ctx.body = 'pong'
  },
}
