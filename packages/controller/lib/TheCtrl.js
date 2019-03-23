/**
 * @class TheCtrl
 */
'use strict'

const debug = require('debug')('the:ctrl')
const passed = (date) => new Date() - date

/** @lends TheCtrl */
class TheCtrl {
  /**
   * Hook after invocation
   * @param {Invocation} invocation - Action invocation
   * @returns {Promise.<void>}
   */
  static async afterInvocation(invocation) {
    debug(
      `...action "${invocation.action}" with result: ${
        invocation.result
      }. (took ${passed(invocation.at)}ms)`,
    )
  }

  /**
   * Hook before invocation
   * @param {Invocation} invocation - Action invocation
   * @returns {Promise.<void>}
   */
  static async beforeInvocation(invocation) {
    debug(
      `Start action "${invocation.action}" with params: ${
        invocation.params
      }...`,
    )
  }

  /**
   * Hook rescue invocation error
   * @param {Invocation} invocation - Action invocation
   * @returns {Promise.<void>}
   */
  static async rescueInvocation(invocation) {
    debug(`Error ${invocation.error} on "${invocation.error}"`)
  }

  constructor(config = {}) {
    const {
      app = {},
      callbacks,
      client = {},
      connection,
      name = this.constructor.name,
      session,
      ...rest
    } = config
    this.app = Object.freeze(app)
    this.client = Object.freeze(client)
    this.name = name
    this.connection = connection
    this.session = session
    this.callbacks = callbacks

    const restKeys = Object.keys(rest)
    if (restKeys.length > 0) {
      console.warn(`[TheCtrl] Unknown config keys: ${restKeys}`)
    }
  }

  /** Callback after controller attached to a client */
  controllerDidAttach() {}

  /** Callback before a controller method invoked */
  controllerMethodDidInvoke() {}

  /** Callback after a controller method invoked */
  controllerMethodWillInvoke() {}

  /** Callback before controller detached from a client */
  controllerWillDetach() {}
}

module.exports = TheCtrl
