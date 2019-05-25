'use strict'
/**
 * Test for processJSExport.
 * Runs with mocha.
 */
const processJSExport = require('../lib/processors/processJSExport')

describe('process-js-export', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    console.log(
      await processJSExport(
        `
/** this is hoge */
function Hoge() {} 

export default Hoge
        `,
      ),
    )
  })
})

/* global describe, before, after, it */
