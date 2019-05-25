'use strict'
/**
 * Test for TheSeed.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const TheSeed = require('../lib/TheSeed')

describe('the-seed', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheSeed)

    const seed = new TheSeed('ja', {
      vars: {
        foo: 'bar',
      },
    })

    const users = seed.explode(
      {
        hoge: ({ index }) => index,
        num: '#{index+1}',
        username: '#{name.firstName()}',
      },
      100,
    )
    for (const user of users) {
      ok(user.username)
    }
    equal(users.length, 100)

    equal(users[10].num, 11)
    equal(users[10].hoge, 10)

    {
      const data = seed.apply({
        image: '#{image.avatar()}',
      })
      ok(data.image)
    }
  })
})

/* global describe, before, after, it */
