/**
 * Test for TheSeed.
 * Runs with mocha.
 */
'use strict'

const TheSeed = require('../lib/TheSeed')
const { ok, equal } = require('assert')

describe('the-seed', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(TheSeed)

    const seed = new TheSeed('ja', {
      vars: {
        foo: 'bar'
      }
    })

    const users = seed.explode({
      username: '#{name.firstName()}',
      num: '#{index+1}',
      hoge: ({ index }) => index,
    }, 100)
    for (const user of users) {
      ok(user.username)
    }
    equal(users.length, 100)

    equal(users[10].num, 11)
    equal(users[10].hoge, 10)

    {
      const data = seed.apply({
        image: '#{image.avatar()}'
      })
      ok(data.image)
    }
  })
})

/* global describe, before, after, it */
