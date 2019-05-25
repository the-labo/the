'use strict'
/**
 * Test for asController.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const asController = require('../lib/helpers/asController')

describe('as-controller', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const spec = { methods: {}, name: 'hog' }
    const ctrl = asController({}, spec, {})
    ok(ctrl)
    ctrl.setCallback('hoge', () => {})
    equal(Object.keys(ctrl.callbacks).length, 1)
    ctrl.delCallback('hoge')
    equal(Object.keys(ctrl.callbacks).length, 0)
  })
})

/* global describe, before, after, it */
