/**
 * Test for processJSDoc.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processJSDoc = require('../lib/processors/processJSDoc')

describe('process-js-doc', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSDoc(`
      /**
       * @param {boolean} a
       * @function hoge
       * @example
       *  hoge (){}
       */
      module.exports = function hoge(){}
    `),
      `
      /**
       * @function hoge
       * @param {boolean} a
       * @example
       *  hoge (){}
       */
      module.exports = function hoge(){}
    `,
    )
  })

  it('test02', async () => {
    equal(
      await processJSDoc(`
/**
 * @param {Object} [config={}] - Code config
 * @class TheCode
 * @memberof module:@the-/code
 */
'use strict'
`),
      `
/**
 * @memberof module:@the-/code
 * @class TheCode
 * @param {Object} [config={}] - Code config
 */
'use strict'
`,
    )
  })

  it('keep order for same types', async () => {
    equal(
      await processJSDoc(`
/**
 * @param c
 * @example a
 * s
 * @param d
 * @function hoge
 * @param a
 */`),
      `
/**
 * @function hoge
 * @param d
 * @param c
 * @param a
 * @example a
 * s
 */`,
    )
  })

  it('Replace synonyms', async () => {
    equal(
      await processJSDoc(`
/** 
 * @func hoge
 * @memberOf X 
 */
`),
      `
/** 
 * @memberof X 
 * @function hoge
 */
`,
    )
  })

  it('Fix types', async () => {
    equal(
      await processJSDoc(`
/**
 *  @param {String}
 *  @returns {Promise.<void>}
 */`),
      `
/**
 *  @param {string}
 *  @returns {Promise<undefined>}
 */`,
    )
  })
})

/* global describe, before, after, it */
