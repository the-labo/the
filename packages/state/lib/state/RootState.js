'use strict'

const { get } = require('bwindow')
const ScopedState = require('./ScopedState')
const ActionTypes = require('../constants/ActionTypes')
const { createReduxStore, getReduxDevtool } = require('../helpers/reduxHelper')

/**
 * State works as root
 * @memberof module:@the-/state.state
 * @class RootState
 * @augments module:@the-/state.state.State
 * @param {Object} [options={}] - Optional settings
 * @param {Object} [options.defaults={}] - Default values
 */
class RootState extends ScopedState {
  static reduceStoreAction(state = {}, action) {
    switch (action.type) {
      case ActionTypes.DEL:
        return Object.entries(state)
          .filter(([k]) => !action.payload.includes(k))
          .reduce((reduced, [k, v]) => ({ ...reduced, [k]: v }), {})
      case ActionTypes.DROP:
        return {}
      case ActionTypes.SET:
        return { ...state, ...action.payload }
      default:
        return state
    }
  }

  constructor(options = {}) {
    const { name = '@@root' } = options
    super(name, {})
  }

  set $$state(values) {
    const { store } = this
    store.dispatch({
      payload: values,
      type: ActionTypes.SET,
    })
    this.publish()
  }

  get $$state() {
    const { store } = this
    return store.getState()
  }

  $$init() {
    this.store = createReduxStore(RootState.reduceStoreAction, {}, [
      getReduxDevtool({
        name: `TheState@${get('location.host')}`,
      }),
    ])
  }

  del(name) {
    const { store } = this
    store.dispatch({
      payload: [].concat(name),
      type: ActionTypes.DEL,
    })
    this.publish()
  }

  drop() {
    const { store } = this
    store.dispatch({ type: ActionTypes.DROP })
    this.publish()
  }
}

module.exports = RootState
