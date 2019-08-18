'use strict'

const proxy = require('./proxy')

/**
 * @memberof module:@the-/hash
 * @class TheHash
 * @param {Object} props
 */
class TheHash extends Object {
  constructor(props = {}) {
    super()
    this.set(props || {})
  }

  /**
   * Get value for key
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    return this[key]
  }

  /**
   * Has value for
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return this.hasOwnProperty(key)
  }

  /**
   * Set value for key
   * @param {string} key - Key to set
   * @param {*} value - Value to set
   */
  set(key, value) {
    const byObj = arguments.length === 1 && typeof arguments[0] === 'object'
    if (byObj) {
      for (const [k, v] of Object.entries(arguments[0])) {
        this.set(k, v)
      }
      return
    }

    this[key] = value
  }

  /**
   * Convert into proxy
   * @param {Object} [options={}]
   * @returns {*}
   */
  toProxy(options = {}) {
    return proxy(this, options)
  }
}

module.exports = TheHash
