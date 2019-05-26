'use strict'
/**
 * Test for htmlAttributesFor.
 * Runs with mocha.
 */
const {
  strict: { deepEqual },
} = require('assert')
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
