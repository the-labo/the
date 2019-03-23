/**
 * Test for isResourceClass.
 * Runs with mocha.
 */
'use strict'

const isResourceClass = require('../lib/isResourceClass')
const TheResource = require('../lib/TheResource')
const {ok, equal} = require('assert')

describe('is-resource-class', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(isResourceClass(TheResource))
    ok(isResourceClass(class extends TheResource {}))
    ok(
      isResourceClass(
        class C1 extends (class C2 extends (class TheResource {}) {}) {}
      )
    )

    ok(
      !isResourceClass(
        class C1 extends (class C2 extends (class NotTheResource {}) {}) {}
      )
    )
  })
})

/* global describe, before, after, it */
