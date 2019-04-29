/**
 * Test for sendMock.
 * Runs with mocha.
 */
'use strict'

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
