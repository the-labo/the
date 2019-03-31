/**
 * Define koa middleware register ctx values
 * @function ctxInjector
 * @param {function} creators
 * @returns {function}
 */
'use strict'

/** @lends ctxInjector */
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

export default ctxInjector
