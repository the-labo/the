/**
 * Test for asController.
 * Runs with mocha.
 */
'use strict'

const asController = require('../lib/helpers/asController')
const {ok, equal} = require('assert')

describe('as-controller', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const spec = {name: 'hog', methods: {}}
    const ctrl = asController({}, spec, {})
    ok(ctrl)
    ctrl.setCallback('hoge', () => {})
    equal(Object.keys(ctrl.callbacks).length, 1)
    ctrl.delCallback('hoge')
    equal(Object.keys(ctrl.callbacks).length, 0)
  })
})

/* global describe, before, after, it */
