/**
 * Test for TheComponentDemo.
 * Runs with mocha.
 */
'use strict'

const TheComponentDemo = require('../shim/TheComponentDemo').default
const React = require('react')
const { build } = require('@the-/script-build')
const { ok, equal } = require('assert').strict

describe('the-component-demo', () => {
  before(() => {
  })

  after(() => {
  })

  it('Create a component', () => {
    const pkg = {
      name: 'hoge',
      version: '1.0.0'
    }
    const element = React.createElement(TheComponentDemo, { pkg })
    ok(element)
  })

  it('Build project', () => {
    return build(`${__dirname}/../misc/mocks/mock-project-01`)
  })
})

/* global describe, before, after, it */
