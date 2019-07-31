'use strict'

const { compose, createStore } = require('redux')
const { get } = require('@the-/window')

exports.createReduxStore = (reducer, preloadedState, enhancers) =>
  createStore(
    reducer,
    preloadedState,
    compose(...[].concat(enhancers).filter(Boolean)),
  )

exports.getReduxDevtool = (options) => {
  const devTool =
    get('__REDUX_DEVTOOLS_EXTENSION__') || get('devToolsExtension')
  return devTool ? devTool(options) : null
}
