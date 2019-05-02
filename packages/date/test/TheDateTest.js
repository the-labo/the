/**
 * Test for TheDate.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert').strict
const TheDate = require('../lib/TheDate')

describe('the-date', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheDate)

    equal(
      new TheDate('2016/10/10', {
        lang: 'ja',
        timezone: 'Asia/Tokyo',
      }).format('lll'),
      '2016年10月10日 00:00',
    )

    ok(
      new TheDate('2016/10/10', {
        lang: 'ja',
        timezone: 'Asia/Tokyo',
      }).toString(),
    )

    equal(
      Number(new TheDate('2017/07/07 11:12:10').startOfDay().toDate()),
      Number(new Date('2017/07/07')),
    )

    equal(
      Number(new TheDate('2017/07/07 11:12:10').startOf('days').toDate()),
      Number(new TheDate('2017/07/07 11:12:10').startOf('day').toDate()),
    )

    equal(new TheDate('2017/07/07').getDate(), 7)

    equal(TheDate.with({ timezone: 'Asia/Tokyo' }).timezone, 'Asia/Tokyo')

    ok(new TheDate().fromNow())

    ok(!new TheDate(NaN).fromNow())

    equal(
      TheDate.with().format('YYYY-MM-DD'),
      TheDate.with().format('YYYY-MM-DD'),
    )

    equal(new TheDate(null, { lang: 'ja' }).format('YYYY/MM hh:mm'), null)
  })
})

/* global describe, before, after, it */
