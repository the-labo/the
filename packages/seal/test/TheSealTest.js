/**
 * Test for TheSeal.
 * Runs with mocha.
 */
'use strict'

const TheSeal = require('../lib/TheSeal')
const {ok, equal} = require('assert')

describe('the-seal', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(TheSeal)

    const SECRET_PASSWORD = 'xxxxxxxxxxxxxxxxx'
    const {seal, verify} = new TheSeal(SECRET_PASSWORD)

    const values = {name: 'Bess', age: 28}

    const proof = seal(values)
    equal(verify(proof, values), true)

    values.age = String(values.age)
    equal(verify(proof, values), true)

    values.age = 15
    equal(verify(proof, values), false)
  })
})

/* global describe, before, after, it */
