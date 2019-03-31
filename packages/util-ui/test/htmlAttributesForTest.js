/**
 * Test for htmlAttributesFor.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
const htmlAttributesFor = require('../lib/htmlAttributesFor')

describe('html-attributes-for', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const attributes = htmlAttributesFor({
      'data-hoge': 'hoge',
      foo: 'This is foo',
      title: 'The title',
    })
    deepEqual(attributes, { 'data-hoge': 'hoge', title: 'The title' })
  })
})

/* global describe, before, after, it */
