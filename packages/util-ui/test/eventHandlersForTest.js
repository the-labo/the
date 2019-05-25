'use strict'
/**
 * Test for eventHandlersFor.
 * Runs with mocha.
 */
const { deepEqual } = require('assert').strict
const eventHandlersFor = require('../lib/eventHandlersFor')

describe('event-handlers-for', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const onClick = () => {}
    const foo = () => {}
    const handlers = eventHandlersFor({
      foo,
      onClick,
    })
    deepEqual(Object.keys(handlers), ['onClick'])
  })
})

/* global describe, before, after, it */
