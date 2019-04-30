/**
 * Define koa middleware function to do serverside rendering
 * @memberOf module:@the-/server.helpers
 * @function serverRendering
 * @param {function} Component - React component to render
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Koa middleware function
 */
'use strict'

const adigest = require('adigest')
const { mkdirpAsync, readFileAsync, writeFileAsync } = require('asfs')
const path = require('path')
const { createElement: c } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const rimraf = require('rimraf')
const debug = require('debug')('the:server:server-rendering')

const d = (module) => (module && module.default) || module

/** @function module:@the-/server.helpers.serverRendering */
function serverRendering(Html, options = {}) {
  const {
    appScope,
    cacheDir,
    defaultStatus = 200,
    prefix = '<!DOCTYPE html>',
  } = options

  const htmlCacheDir = path.join(cacheDir, 'the-html-cache')

  const render = async (match, props) => {
    const key = adigest(match, {
      algorithm: 'md5',
    })
    const cacheFilename = path.join(
      htmlCacheDir,
      key.substring(0, 2),
      `${key}.cache.html`,
    )
    const cached = await readFileAsync(cacheFilename).catch(() => null)
    if (cached) {
      return String(cached)
    }
    const element = c(d(Html), props)
    const generated = prefix + renderToStaticMarkup(element)

    // No wait for flush
    void (async () => {
      await mkdirpAsync(path.dirname(cacheFilename))
      await writeFileAsync(cacheFilename, generated)
    })().catch((e) => console.error(e))

    return generated
  }

  async function middleware(ctx, next) {
    const extname = path.extname(ctx.path)
    const mayHTML = !extname || ['.html', '.htm'].includes(extname)
    if (!mayHTML) {
      next()
      return
    }

    const renderingContext = Object.assign(
      {
        lang: ctx.lang,
        path: ctx.path,
        url: ctx.url,
      },
      ctx.injections,
    )

    const match = { lang: ctx.lang, url: ctx.url }
    const at = new Date()
    debug('render start')
    ctx.body = await render(match, { appScope, renderingContext })
    debug(`render end (${new Date() - at}ms)`)
    ctx.status = renderingContext.status || defaultStatus
  }

  middleware.clearCacheSync = () => rimraf.sync(htmlCacheDir)

  return middleware
}

module.exports = serverRendering
