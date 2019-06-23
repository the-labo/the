'use strict'
/**
 * Test for processJSDoc.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
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

  it('Fix types 2', async () => {
    equal(
      await processJSDoc(`
/**
 *  @param {String}
 *  @param {String|Boolean}
 *  @returns {Promise.<void|Boolean>}
 */`),
      `
/**
 *  @param {string}
 *  @param {string|boolean}
 *  @returns {Promise<undefined|boolean>}
 */`,
    )
  })

  it('Handle default', async () => {
    equal(
      await processJSDoc(`/**
 * Alias of {@link module:@the-/cache.default}
 * @memberOf module:@the-/cache
 * @function default
 */`),
      `/**
 * Alias of {@link module:@the-/cache.default}
 * @memberof module:@the-/cache
 * @function default
 */`,
    )
  })

  it('Sort type def', async () => {
    equal(
      await processJSDoc(`
/**
 * @property {function()} cleanup
 * @property {Object} descriptor
 * @property {string} path - Filename
 * @typedef {Object} GenerateResult
 */
`),
      `
/**
 * @typedef {Object} GenerateResult
 * @property {Object} descriptor
 * @property {string} path - Filename
 * @property {function()} cleanup
 */
`,
    )
  })

  it('Handle any', async () => {
    equal(
      await processJSDoc(`
/**
 * @function hoge
 * @returns {Promise.<any>} 
 */
`),
      `
/**
 * @function hoge
 * @returns {Promise<*>} 
 */
`,
    )
  })
})

/* global describe, before, after, it */
