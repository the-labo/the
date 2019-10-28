'use strict'

const { compose, createStore } = require('redux')
const { get } = require('@the-/window')

const createReduxStore = (reducer, preloadedState, enhancers) =>
  createStore(
    reducer,
    preloadedState,
    compose(...[].concat(enhancers).filter(Boolean)),
  )

const getReduxDevtool = (options) => {
  const devTool =
    get('__REDUX_DEVTOOLS_EXTENSION__') || get('devToolsExtension')
  return devTool ? devTool(options) : null
}

exports.createReduxStore = createReduxStore
exports.getReduxDevtool = getReduxDevtool

module.exports = {
  createReduxStore,
  getReduxDevtool,
}
