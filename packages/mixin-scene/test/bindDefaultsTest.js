'use strict'
/**
 * Test for bindDefaults.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const bindDefaults = require('../lib/bindDefaults')

describe('bindDefaults', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const Class = bindDefaults({ foo: 'bar' })(class {})

    const instance = new Class()
    equal(instance.defaults.foo, 'bar')

    const Class2 = bindDefaults({
      foo2: 'bar2',
    })(Class)
    const instance2 = new Class2()
    equal(instance2.defaults.foo2, 'bar2')
  })
})

/* global describe, before, after, it */
