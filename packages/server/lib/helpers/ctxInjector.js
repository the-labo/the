/**
 * Define koa middleware register ctx values
 * @memberof module:@the-/server.helpers
 * @function ctxInjector
 * @param {function()} creators
 * @returns {function()}
 */
'use strict'

/** @lends module:@the-/server.helpers.ctxInjector */
function ctxInjector(injector) {
  return async function middleware(ctx, next) {
    Object.assign(ctx, injector(ctx))
    await next()
  }
}

module.exports = ctxInjector
