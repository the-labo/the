/**
 * Convert into store scope class
 * @memberof module:@the-/store
 * @function toStoreScopeClass
 * @param {Function} BaseClass
 * @returns {Function}
 */
'use strict'

/** @lends module:@the-/store.toStoreScopeClass */
function toStoreScopeClass(BaseClass, config = {}) {
  const { dispatch, initialState, load, name, reducerFactories } = config

  class StoreScopeClass extends BaseClass {
    /**
     * Load sub scopes
     * @param {Function} ScopeClass - Scope class to load
     * @param {...string} names - Sub names
     */
    load(ScopeClass, ...names) {
      return load(ScopeClass, this.name, ...names)
    }

    /**
     * Load sub scopes from scope class mapping
     * @param {Object<string, Function>} mapping - Scope classes
     * @returns {Object} Loaded scopes
     */
    loadFromMapping(mapping) {
      const loaded = {}
      for (const [name, ScopeClass] of Object.entries(mapping)) {
        loaded[name] = this.load(ScopeClass, name)
      }
      return loaded
    }
  }

  const reducers = []
  const operations = Object.keys(reducerFactories)
  for (const operation of operations) {
    const actionType = [name, operation].join('/')
    const factory = reducerFactories[operation]
    const reducer = function operationReducer(state = initialState, action) {
      switch (action.type) {
        case actionType:
          return factory(...action.payload)(state)
        default:
          return state
      }
    }
    reducers.push(reducer)
    if (StoreScopeClass.prototype[operation]) {
      throw new Error(`[TheStore] Name conflict: "${operation}" on ${name}`)
    }

    StoreScopeClass.prototype[operation] = function dispatchAction(...args) {
      dispatch({
        meta: { name, operation },
        payload: args,
        type: actionType,
      })
    }
  }
  StoreScopeClass.reducer = (state, action) =>
    reducers.reduce((state, reducer) => reducer(state, action), state)
  return StoreScopeClass
}

module.exports = toStoreScopeClass
