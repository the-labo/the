/**
 * Test for htmlAttributesFor.
 * Runs with mocha.
 */
'use strict'

const htmlAttributesFor = require('../lib/htmlAttributesFor')
const React = require('react')
const { ok, deepEqual } = require('assert').strict

describe('html-attributes-for', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const attributes = htmlAttributesFor({
      foo: 'This is foo',
      title: 'The title',
      'data-hoge': 'hoge'
    })
    deepEqual(attributes, {title: 'The title', 'data-hoge': 'hoge'})
  })
})

/* global describe, before, after, it */
