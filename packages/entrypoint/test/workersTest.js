'use strict'

/**
 * Test for workers.
 * Runs with mocha.
 */
const injectmock = require('injectmock')
const workers = require('../lib/workers')

describe('workers', () => {
  before(() => {
    injectmock(global, {})
  })

  after(() => {
    injectmock.restoreAll()
  })

  it('Do test', () => {
    workers({
      '/': '/a.js',
    })
  })
})

/* global describe, before, after, it */
