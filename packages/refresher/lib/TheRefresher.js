'use strict'

/**
 * @memberof module:@the-/refresher
 * @class TheRefresher
 */
const { EventEmitter } = require('events')
const debug = require('debug')('the:refresher')

/** @lends module:@the-/refresher.TheRefresher */
class TheRefresher extends EventEmitter {
  constructor(handler, options = {}) {
    super()
    const { interval = 300 } = options
    this._targets = new Set()
    this._refreshTimer = -1
    this._stopped = true
    this.interval = interval
    this.handler = handler
  }

  /**
   * Check the refresh has the target
   * @param {string} target
   * @returns {boolean}
   */
  has(target) {
    return this._targets.has(target)
  }

  /** Add refresh target */
  request(target) {
    this.emit('request')
    this._targets.add(target)
  }

  /**
   * Start ticking
   * @returns {*}
   */
  start() {
    if (this._refreshTimer !== -1) {
      throw new Error('Refresh loop already started')
    }
    const { handler, interval } = this
    this._stopped = false
    debug('start', { interval })
    this.emit('start')

    const tick = async function tickImpl() {
      if (this._stopped) {
        return
      }
      for (const target of this._targets.values()) {
        debug('target', target)
        await handler(target)
        this._targets.delete(target)
      }
      setTimeout(tick, interval).unref()
    }.bind(this)

    return tick()
  }

  /**
   * Stop ticking
   */
  stop() {
    debug('stop')
    this.emit('stop')
    this._stopped = true
    clearTimeout(this._refreshTimer)
    this._refreshTimer = -1
  }
}

module.exports = TheRefresher
