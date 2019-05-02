/**
 * Abstract state
 * @memberof module:@the-/state.state
 * @abstract
 * @class State
 */
'use strict'

const theAssert = require('@the-/assert')
const assert = theAssert('TheState')

/** @lends module:@the-/state.state.State */
class State {
  constructor() {
    this.subscriptions = []
  }

  get state() {
    return this.$$state
  }

  /**
   * Delete value for name
   * @param {string} name
   */
  del(name) {
    this.$$state = Object.entries(this.$$state).reduce(
      (deleted, [k, v]) => ({
        ...deleted,
        ...(k === name ? {} : { [k]: v }),
      }),
      {},
    )
  }

  /**
   * Drop all values
   */
  drop() {
    this.$$state = {}
  }

  /**
   * Get value for name
   * @param {string} name
   * @returns {*}
   */
  get(name) {
    assert(!!name, `[TheState] name is required]`)
    return this.$$state[name]
  }

  /**
   * Get keys
   * @returns {string[]}
   */
  keys() {
    return Object.keys(this.$$state)
  }

  /**
   * Publish to subscriptions
   */
  publish() {
    for (const callback of this.subscriptions) {
      callback(this.$$state)
    }
  }

  /**
   * Set values
   * @param {Object} values
   * @returns {*}
   */
  set(values) {
    const current = this.$$state
    const skip =
      !!current && Object.entries(values).every(([k, v]) => current[k] === v)
    if (skip) {
      return
    }
    this.$$state = {
      ...current,
      ...values,
    }
  }

  /**
   * Subscribe changes
   * @param {Function} callback
   * @returns {Function} - unsubscribe function
   */
  subscribe(callback) {
    this.subscriptions = [...this.subscriptions, callback]
    const unsubscribe = this.unsubscribe.bind(this, callback)
    return unsubscribe
  }

  /**
   * Unsubscribe
   * @param {Function} callback
   */
  unsubscribe(callback) {
    this.subscriptions = this.subscriptions.filter(
      (filtering) => filtering !== callback,
    )
  }
}

module.exports = State
