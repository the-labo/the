'use strict'
/**
 * Test for sendMock.
 * Runs with mocha.
 */
const sendMock = require('../lib/sending/sendMock')

describe('send-mock', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    sendMock({
      content: 'hoge',
    })
  })
})

/* global describe, before, after, it */
