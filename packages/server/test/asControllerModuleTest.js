'use strict'
/**
 * Test for asControllerModule.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const asControllerModule = require('../lib/asControllerModule')

describe('as-controller-module', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const m = asControllerModule(
      class Hoge {
        async sayYes() {}
      },
      {
        describeController: () => ({ methods: ['sayYes'] }),
        instantiateController: () => ({}),
      },
    )

    ok(m.sayYes)
    console.log(Object.getOwnPropertyDescriptors(m))
  })
})

/* global describe, before, after, it */
