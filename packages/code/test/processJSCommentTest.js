/**
 * Test for processJSComment.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processJSComment = require('../lib/processors/processJSComment')

describe('process-comment', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSComment(`
    const a = '123'
    //----------------------------------- 
    // Sub Tasks for Debug
    //----------------------------------- 

    /** Run server for debug */
      `),
      `
    const a = '123'

    // -----------------------------------
    // Sub Tasks for Debug
    // -----------------------------------
    /** Run server for debug */
      `,
    )
  })
})

/* global describe, before, after, it */
