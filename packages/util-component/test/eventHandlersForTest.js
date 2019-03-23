/**
 * Test for eventHandlersFor.
 * Runs with mocha.
 */
'use strict'

const eventHandlersFor = require('../lib/eventHandlersFor')
const React = require('react')
const { ok, deepEqual } = require('assert').strict

describe('event-handlers-for', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const onClick = () => {}
    const foo = () => {}
    let handlers = eventHandlersFor({
      foo,
      onClick
    })
    deepEqual(Object.keys(handlers), ['onClick'])
  })
})

/* global describe, before, after, it */
