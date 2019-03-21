/**
 * Test for seatAccess.
 * Runs with mocha.
 */
'use strict'

const seatAccess = require('../lib/seatAccess')
const theSeat = require('@the-/seat')
const {ok, equal, deepEqual} = require('assert')

describe('seat-access', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const seat = theSeat(`${__dirname}/../tmp/foo/testing-seat.json`)
    const {
      portNumberFor,
      portNumberRangeFor,
      containerNameFor,
      processNameFor,
      userNameFor,
      secretFor
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
