/**
 * Test for TheSecret.
 * Runs with mocha.
 */
'use strict'

const { deepEqual, equal, ok } = require('assert')
const { readAsJsonSync, writeAsJsonSync } = require('@the-/util-file')
const TheSecret = require('../lib/TheSecret')

describe('the-secret', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheSecret)

    const filename = `${__dirname}/../tmp/foo/bar/secret.json`
    writeAsJsonSync(filename, { v1: 'this is v1' })
    const secret = new TheSecret(filename, 'hogehoge')
    secret.encrypt()
    ok(readAsJsonSync(filename).v1.match(/data/))
    equal(secret.get('v1'), 'this is v1')

    ok(readAsJsonSync(filename))
    secret.decrypt()
    secret.decrypt()
    secret.decrypt()
    const data = readAsJsonSync(filename)
    ok(data)
    deepEqual(data, { v1: 'this is v1' })
    secret.encrypt()
    secret.encrypt()
  })
})

/* global describe, before, after, it */
