/**
 * Define koa middleware register ctx values
 * @memberof module:@the-/server.helpers
 * @function ctxInjector
 * @param {function()} creators
 * @returns {function()}
 */
'use strict'

const evalInjectors = require('./evalInjectors')

/** @lends module:@the-/server.helpers.ctxInjector */
function ctxInjector(creators) {
  return async function middleware(ctx, next) {
    const injections = evalInjectors(creators)
    Object.assign(ctx, injections, { injections })
    await next()
  }
}

module.exports = ctxInjector
