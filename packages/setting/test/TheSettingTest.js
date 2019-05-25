'use strict'
/**
 * Test for TheSetting.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const TheSetting = require('../lib/TheSetting')

describe('the-setting', function() {
  this.timeout(80000)
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheSetting)

    const setting = new TheSetting(`${__dirname}/../tmp/test-setting.json`, {
      foo: 1,
    })
    equal(setting.get('foo'), 1)

    setting.set('foo', 1)
    equal(setting.get('foo'), 1)
    setting.set('foo', 2)
    equal(setting.get('foo'), 2)

    setting.del('foo')
    equal(setting.get('foo'), undefined)

    ok(!setting.isLocked())
    setting.lock()
    ok(setting.isLocked())
    setting.unlock()
    ok(!setting.isLocked())
  })
})

/* global describe, before, after, it */
