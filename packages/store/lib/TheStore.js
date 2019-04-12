/**
 * Scoped redux store
 * @class TheStore
 * @param {Object} [options={}] - optional settings
 * @param {function} [options.reducer] - Custom reducer function
 * @param {string[]} [options.persists={}] - Scope names to persistize in local storage
 * @param {function} [options.middlewares=[]] - Redux middlewares
 */
'use strict'

const {
  applyMiddleware,
  create: createStore,
  devTool,
  hook,
  persistize,
} = require('bredux')
const { get } = require('bwindow')
const { flatten } = require('objnest')
const theAssert = require('@the-/assert').create
const { unlessProduction } = require('@the-/check')
const { scopes } = require('@the-/scope')
const helpers = require('./helpers')
const toStoreScopeClass = require('./toStoreScopeClass')

const assert = theAssert('the:store')
const { parseDef, setByNamepath } = helpers

const NAMEPATH_SEPARATOR = '.'

/** @lends TheStore */
class TheStore {
  constructor(options = {}) {
    let {
      enhancers = [],
      middlewares = [],
      persists = [],
      reducer: customReducer,
      scopes: scopeDefs = {},
      state: preloadedState = {},
      types = {},
    } = options

    const restored = persistize.regain(persists) || {}
    const restoredKeys = Object.keys(restored)

    preloadedState = { ...preloadedState, ...restored }

    this.scopes = {}
    this._preloadedState = preloadedState
    this._loadedReducers = restoredKeys.reduce(
      (reducers, name) => ({
        ...reducers,
        [name]: (state = restored[name]) => state,
      }),
      {},
    )
    const reducer = (state, action) => {
      if (customReducer) {
        state = customReducer(state, action)
      }
      for (const name of Object.keys(this._loadedReducers)) {
        const reducer = this._loadedReducers[name]
        const reduced = reducer(state[name], action)
        const changed = state[name] !== reduced
        if (changed) {
          state = {
            ...state,
            [name]: reduced,
          }
        }
      }
      return state
    }
    const store = createStore(reducer, preloadedState, [
      devTool && devTool({ name: `TheStore@${get('location.host')}` }),
      ...middlewares.map((middleware) => applyMiddleware(middleware)),
      ...enhancers,
    ])

    hook(store, persistize(persists))

    Object.assign(this, store, { store })

    store.subscribe(() => {
      const state = this.state
      for (const name of Object.keys(this.scopes)) {
        const scope = this.scopes[name]
        scope.$$setState(state[name])
      }
    })

    this.loadScopesFromDefs(scopeDefs, { types })
  }

  get state() {
    return this.store.getState()
  }

  /**
   * Load a scope
   * @param {function} ScopeClass - Scope class to instantiate
   * @param {...string} names - Name key path
   * @returns {TheStore.Scope} Loaded scope
   */
  load(ScopeClass, ...names) {
    unlessProduction(() => {
      assert(
        typeof ScopeClass !== 'string',
        'ScopeClass must be an constructor',
      )
      names.map((name) =>
        assert(typeof name === 'string', 'Names must be string'),
      )
    })

    const namepath = names.join(NAMEPATH_SEPARATOR)
    const duplicate = Boolean(this.scopes[namepath])
    if (duplicate) {
      throw new Error(
        `[TheStore] Scope with name "${namepath}" is already loaded!`,
      )
    }
    const isReservedName = this[namepath] || [].includes(namepath)
    if (isReservedName) {
      throw new Error(
        `[TheStore] Failed to load state with name "${namepath}" because it is reserved`,
      )
    }
    let {
      initialState = null,
      reducerFactories = {},
      subScopeClasses = {},
    } = ScopeClass

    if (this._preloadedState.hasOwnProperty(namepath)) {
      initialState = this._preloadedState[namepath]
    }

    const StoreScopeClass = toStoreScopeClass(ScopeClass, {
      dispatch: this.dispatch.bind(this),
      initialState,
      load: this.load.bind(this),
      name: namepath,
      reducerFactories: {
        $$init(values) {
          return () => values
        },
        ...reducerFactories,
      },
    })
    const scope = new StoreScopeClass(namepath)
    this.scopes[namepath] = scope
    setByNamepath(this, namepath, scope, NAMEPATH_SEPARATOR)
    this._loadedReducers[namepath] = StoreScopeClass.reducer
    scope.$$init(initialState)
    scope.$$store = this
    scope.scopeName = namepath

    for (const name of Object.keys(subScopeClasses || {})) {
      const SubScopeClass = subScopeClasses[name]
      scope.load(SubScopeClass, name)
    }

    return scope
  }

  /** @deprecated */
  loadFromDefaults(defaults, options = {}) {
    defaults = flatten(defaults)
    const namepaths = Object.keys(defaults).sort((a, b) => a.length - b.length)
    for (const namepath of namepaths) {
      const val = defaults[namepath]
      const names = namepath.split(NAMEPATH_SEPARATOR)
      let parent = this
      for (const name of names.slice(0, names.length - 1)) {
        if (!parent[name]) {
          parent.load(scopes.ScopeScope, name)
        }
        parent = parent[name]
      }
      const Scope = scopes.ValueScope.withDefault(val)
      this.load(Scope, namepath)
    }
  }

  /** @deprecated */
  loadFromDefs() {
    console.warn(
      '.loadFromDefs() is deprecated. Use .loadScopesFromDefs() instead.',
    )
    return this.loadScopesFromDefs(...arguments)
  }

  /**
   * Load scopes
   * @param {Object} defs - Defs
   * @param {Object} [options={}] - Optional settings
   */
  loadScopesFromDefs(defs, options = {}) {
    const { types = {} } = options
    defs = parseDef(defs)
    const namepaths = Object.keys(defs).sort((a, b) => a.length - b.length)
    for (const namepath of namepaths) {
      const typeName = defs[namepath]
      const Type = types[typeName]
      if (!Type) {
        throw new Error(`Unknown type: "${typeName}" for ${namepath}`)
      }
      const names = namepath.split(NAMEPATH_SEPARATOR)
      let parent = this
      for (const name of names.slice(0, names.length - 1)) {
        if (!parent[name]) {
          parent.load(scopes.ScopeScope, name)
        }
        parent = parent[name]
      }
      this.load(Type, namepath)
    }
  }

  /**
   * Sub scribe store change
   * @param listener
   * @returns {function}
   */
  subscribe(listener) {
    return this.store.subscribe(listener)
  }
}

Object.assign(TheStore, scopes, {})

module.exports = TheStore
