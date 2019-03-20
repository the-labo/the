/**
 * Build in endpoints
 * @module buildInEndpoints
 */
'use strict'

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
