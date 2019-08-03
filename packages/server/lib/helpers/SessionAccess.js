'use strict'

function SessionAccess(sessionStore, cid) {
  const state = {
    needsToSaveSession: false,
    session: {},
  }
  const sessionAccess = {
    proxy: new Proxy(state.session, {
      set(target, k, v) {
        target[k] = v
        state.needsToSaveSession = true
        return true
      },
    }),
    state,
    async clear() {
      await sessionStore.set(cid, {})
      await sessionAccess.reload()
    },
    /**
     * Reload session from store
     * @returns {Promise<boolean>}
     */
    async reload() {
      // TODO Do some cache
      const loaded = (await sessionStore.get(cid)) || {}
      for (const key of Object.keys(state.session)) {
        const deleted = !(key in loaded)
        if (deleted) {
          delete state.session[key]
        }
      }
      Object.assign(state.session, loaded)
    },
    /**
     * Save session
     * @param {Object} [options={}] - Optional settings
     * @returns {Promise<undefined>}
     */
    async save(options = {}) {
      const { force = false } = options
      const skip = !force && !state.needsToSaveSession
      if (skip) {
        return
      }

      await sessionStore.set(cid, Object.assign({}, state.session))
      state.needsToSaveSession = false
    },
  }

  Object.freeze(sessionAccess)

  return sessionAccess
}

module.exports = SessionAccess
