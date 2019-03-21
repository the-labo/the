/**
 * Test for workers.
 * Runs with mocha.
 */
'use strict'

const workers = require('../lib/workers')
const {ok, equal} = require('assert')
const injectmock = require('injectmock')

describe('workers', () => {
  before(() => {
    injectmock(global, {})
  })

  after(() => {
    injectmock.restoreAll()
  })

  it('Do test', () => {
    workers({
      '/': '/a.js'
    })
  })
})

/* global describe, before, after, it */
