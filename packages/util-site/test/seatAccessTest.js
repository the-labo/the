'use strict'

/**
 * Test for seatAccess.
 * Runs with mocha.
 */
const {
  strict: { deepEqual, equal },
} = require('assert')
const theSeat = require('@the-/seat')
const seatAccess = require('../lib/seatAccess')

describe('seat-access', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const seat = theSeat(`${__dirname}/../tmp/foo/testing-seat.json`)
    const {
      containerNameFor,
      portNumberFor,
      portNumberRangeFor,
      processNameFor,
      secretFor,
      userNameFor,
    } = seatAccess(seat)
    equal(portNumberFor('hoge'), portNumberFor('hoge'))
    equal(containerNameFor('hoge'), containerNameFor('hoge'))
    equal(processNameFor('hoge'), processNameFor('hoge'))
    equal(userNameFor('hoge'), userNameFor('hoge'))

    equal(secretFor('seal'), secretFor('seal'))

    deepEqual(portNumberRangeFor('hoge'), portNumberRangeFor('hoge'))
  })
})

/* global describe, before, after, it */
