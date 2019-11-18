'use strict'

const React = require('react')
const { TheState } = require('@the-/state')
const contextEntryFor = require('./helpers/contextEntryFor')
const contextRootFor = require('./helpers/contextRootFor')

/**
 * Context
 * @memberof module:@the-/context
 * @class TheContext
 * @param {Object} values
 * @param {Object} [options={}] - Optional settings
 */
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

  defineEntry(displayName = 'ContextEntry') {
    const { context, store } = this
    const Entry = contextEntryFor(context, { store })
    Entry.displayName = displayName
    return Entry
  }

  defineEntryRenderer({ displayName, init, pipe }) {
    const Entry = this.defineEntry(displayName)
    const renderer = (content) =>
      React.createElement(Entry, { init, pipe }, content)
    renderer.Entry = Entry
    renderer.setDisplayName = (displayName) => {
      Entry.displayName = displayName
    }
    return renderer
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
