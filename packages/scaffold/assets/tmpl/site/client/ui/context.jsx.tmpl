/**
 * UI Context
 */
'use strict'

import React from 'react'
import theAssert from '@the-/assert'
import { TheContext } from '@the-/context'

const assert = theAssert('context')
const context = new TheContext({})

/** Create stateless renderer */
context.stateless = function stateless() {
  const init = ({ l }) => ({ l })
  const noop = () => null
  return (renderer) => (
    <context.Entry init={init} pipe={noop}>
      {renderer}
    </context.Entry>
  )
}

/** Create stateful renderer */
context.stateful = function stateful(reduceState, reduceHandle) {
  assert(arguments.length === 2, 'Takes exactly two arguments')
  const init = ({ handle, history, l, lang }, pipedProxy) => ({
    history,
    l,
    lang,
    ...reduceHandle(handle, pipedProxy),
  })
  const pipe = ({ state }) => reduceState(state)
  return (renderer) => (
    <context.Entry init={init} pipe={pipe}>
      {renderer}
    </context.Entry>
  )
}

export default context
