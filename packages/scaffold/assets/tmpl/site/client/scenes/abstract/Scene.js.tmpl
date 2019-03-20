/**
 * Base scene
 * @abstract
 * @class Scene
 */
'use strict'

const { TheScene } = require('the-scene-base/shim')
const { withLocation } = require('the-scene-mixins/shim')
const { addUrlQuery, formatUrl } = require('the-url')

class SceneBase extends TheScene {}

/** @lends Scene */
@withLocation
class Scene extends SceneBase {
  catchEntryError (e) {
    try {
      return super.catchEntryError(e)
    } catch (e) {
      switch (e.name) {
        case 'NotFoundError': {
          return this.parseAppError(e, {
            defaultMessageKey: 'RESOURCE_NOT_FOUND_ERROR',
          })
        }
        case 'WrongPasswordError': {
          return this.parseAppError(e, {})
        }

        default:
          throw e
      }
    }
  }

  catchError (e) {
    const { l, store } = this
    try {
      return super.catchError(e)
    } catch (e) {
      store.toast.error.push(l('errors.UNEXPECTED_ERROR'))
    }
  }

  async goTo (url, params = {}, options = {}) {
    const { query = {}, reload = false } = options
    const href = addUrlQuery(formatUrl(url, params), query)
    const { app } = this.store
    app.busy.true()
    try {
      await super.goTo(href)
      if (reload) {
        await this.reloadLocation()
      }
    } finally {
      app.busy.false()
    }
  }
}

module.exports = Scene
