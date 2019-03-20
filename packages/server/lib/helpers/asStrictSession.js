/**
 * @function asStrictSession
 * @param {Object} session
 */
'use strict'

/** @lends asStrictSession */
function asStrictSession(session) {
  return new Proxy(session, {
    get(target, k) {
      const v = target[k]
      switch (typeof v) {
        case 'object': {
          if (v === null) {
            return v
          }
          return new Proxy(v, {
            set(target, innerKey) {
              throw new Error(
                `[TheServer][IMMUTABLE_VIOLATION] Failed to modify "${innerKey}" on ${k}`,
              )
            },
          })
        }
        default: {
          return v
        }
      }
    },
    set(target, k, v) {
      switch (typeof v) {
        case 'function': {
          throw new Error(`[TheServer] You cannot set session value`)
        }
        default: {
          target[k] = v
          return true
        }
      }
    },
  })
}

module.exports = asStrictSession
