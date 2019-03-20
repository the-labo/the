/**
 * Test for TheError.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const TheError = require('../lib/TheError')

describe('the-error', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheError)
    const error = new TheError('foo', { bar: 'baz' })
    equal(error.message, 'foo')
    equal(error.detail.bar, 'baz')
  })

  it('With name', () => {
    const MyError = TheError.withName('HogeError', { status: 404 })
    equal(new MyError('hogehoge').name, 'HogeError')
    equal(new MyError('hogehoge').status, 404)
  })
})

/* global describe, before, after, it */
