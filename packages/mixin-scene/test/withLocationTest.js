/**
 * Test for withLocation.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const injectmock = require('injectmock')
const withLocation = require('../lib/withLocation')

describe('with-location', () => {
  before(() => {})

  after(() => {
    injectmock.restoreAll()
  })

  it('Do test', () => {
    injectmock(global, 'window', {
      location: {
        href: '/foo/bar',
      },
    })
    const L = withLocation(class {})
    const l = new L()
    equal(l.location.href, '/foo/bar')
  })
})

/* global global,describe, before, after, it */
