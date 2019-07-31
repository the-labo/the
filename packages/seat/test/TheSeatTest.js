'use strict'

/**
 * Test for TheSeat.
 * Runs with mocha.
 */
const {
  strict: { doesNotThrow, equal, notEqual, ok, throws },
} = require('assert')
const TheSeat = require('../lib/TheSeat')

describe('the-seat', function() {
  this.timeout(5000)
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheSeat)

    const seat = new TheSeat(`${__dirname}/../tmp/foo/testing-seal.json`)

    seat.drop()

    const myapp01 = seat.scope('port').bind('myapp01')
    ok(myapp01.canTake(3001))
    myapp01.take(3001)
    ok(myapp01.canTake(3001))
    equal(myapp01.get(), 3001)

    const myapp02 = seat.scope('port').bind('myapp02')
    equal(myapp02.canTake(3001), false)

    throws(() => myapp01.take(5000))
    myapp01.release(3001)
    myapp01.take(5000)
    doesNotThrow(() => myapp01.take(5000))

    {
      const ports = seat.scope('ports')
      const portFor = (name, portBase = 5000) => {
        const { acquireNumber } = ports.bind(name)
        return acquireNumber({ base: portBase })
      }

      equal(portFor('myapp/01'), portFor('myapp/01'))
      notEqual(portFor('myapp/01'), portFor('myapp/02'))
      notEqual(portFor('myapp/01'), portFor('myapp/03'))
      ok(portFor('myapp/01') > 5000)
      ok(portFor('myapp/02') > portFor('myapp/01'))
    }

    equal(seat.acquireString('hoge'), seat.acquireString('hoge'))

    ok(
      seat
        .acquireString('jj', { prefix: 'p-', suffix: '-s' })
        .match(/^p-.*-s$/),
    )
  })
})

/* global describe, before, after, it */
