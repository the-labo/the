'use strict'
/**
 * Context
 * @memberof @the-/context
 * @class TheContext
 * @param {Object} values
 * @param {Object} [options={}] - Optional settings
 */
const React = require('react')
const { TheState } = require('@the-/state')
const contextEntryFor = require('./helpers/contextEntryFor')
const contextRootFor = require('./helpers/contextRootFor')

/** @lends @the-/context.TheContext */
class TheContext {
  constructor(values = {}, options = {}) {
    const { store = new TheState({ defaults: values }) } = options
    const value = { store }
    const context = React.createContext(value)
    this.context = context
    this.store = store
    this.Entry = contextEntryFor(context, { store })
    this.Root = contextRootFor(context, { store, value })
    this.value = value
  }

  /**
   * Delete value from store
   * @param {string} name
   */
  del(name) {
    this.store.del(name)
  }

  /**
   * Get value from store
   * @param {string} name
   * @param {Object} [options={}] - Optional setting
   * @returns {*}
   */
  get(name, options = {}) {
    return this.store.get(name)
  }

  /**
   * Set values to store
   * @param {Object} values - Values to set
   */
  set(values) {
    this.store.set(values)
  }
}

module.exports = TheContext
