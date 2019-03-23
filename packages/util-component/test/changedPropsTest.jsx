/**
 * Test for changedProps.
 * Runs with mocha.
 */
'use strict'

const changedProps = require('../lib/changedProps')
const React = require('react')
const { deepEqual } = require('assert').strict

describe('changed-props', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    deepEqual(
      changedProps(
        { a: 'a0', b: 'b1' },
        { a: 'a1', b: 'b1' },
      ),
      { a: 'a1' }
    )
  })
})

/* global describe, before, after, it */
