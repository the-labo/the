/**
 * Test for TheCtrl.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert').strict
const TheCtrl = require('../lib/TheCtrl')

describe('the-ctrl', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const ctrl = new TheCtrl({
      app: {
        name: 'foo',
      },
      session: { a: 1 },
    })
    ok(ctrl)
    equal(ctrl.app.name, 'foo')

    ctrl.session.a += 1
    equal(ctrl.session.a, 2)
  })
})

/* global describe, before, after, it */
