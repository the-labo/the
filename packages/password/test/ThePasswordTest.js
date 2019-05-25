'use strict'
/**
 * Test for ThePassword.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const ThePassword = require('../lib/ThePassword')

describe('the-password', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(ThePassword)

    const { digest, generatePassword, generateSalt } = new ThePassword()

    const salt = generateSalt()
    const password = generatePassword()
    console.time('digest')
    const hash = digest(password, salt)
    console.timeEnd('digest')
    ok(hash)
    equal(digest(password, salt), digest(password, salt))
  })
})

/* global describe, before, after, it */
