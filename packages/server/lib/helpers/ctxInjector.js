/**
 * Define koa middleware register ctx values
 * @memberof module:@the-/server.helpers
 * @function ctxInjector
 * @param {function} creators
 * @returns {function}
 */
'use strict'

/** @lends module:@the-/server.helpers.ctxInjector */
function ctxInjector(creators) {
  return async function middleware(ctx, next) {
    const injections = Object.assign(
      {},
      ...Object.keys(creators).map((name) => ({
        [name]: creators[name](ctx),
      })),
    )
    Object.assign(ctx, injections, { injections })
    await next()
  }
}

module.exports = ctxInjector
