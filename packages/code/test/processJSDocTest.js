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
 * @param c
 * @param d
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
 * @property {object} descriptor
 * @property {string} path - Filename
 * @typedef {Object} GenerateResult
 */
`),
      `
/**
 * @typedef {Object} GenerateResult
 * @property {function()} cleanup
 * @property {Object} descriptor
 * @property {string} path - Filename
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

  it('Format js doc', async () => {
    equal(
      await processJSDoc(`
/**
 * @foo
 
 */
`),
      `
/**
 * @foo
 */
`,
    )
    equal(
      await processJSDoc(`
/**
 * @foo
 *
 *
 *
 */
`),
      `
/**
 * @foo
 */
`,
    )
  })

  it('Sort 2', async () => {
    await processJSDoc(`
  // x
  /**
   * This is hoge
   * @async
   * @function Hoge
   */
   function x () {}
`)
  })

  it('Sort 3', async () => {
    equal(
      await processJSDoc(`
  /**
   * @param foo
   * @param bar
   * @function hoge
   */
`),`
  /**
   * @function hoge
   * @param foo
   * @param bar
   */
`
    )
  })

  it('Complete jsdoc params', async () => {
    equal(
      await processJSDoc(`
  // x
  /**
   * This is hoge
   * @async
   * @function Hoge
   * @example hoge of hoge
   *
   */
  async function Hoge(foo, bar, value=x){
  }
  module.exports = function Hoge(){}
        `),
      `
  // x
  /**
   * This is hoge
   * @function Hoge
   * @async
   * @param foo
   * @param bar
   * @param [value=x]
   * @example hoge of hoge
   */
  async function Hoge(foo, bar, value=x){
  }
  module.exports = function Hoge(){}
        `,
    )
  })

  it('Complete jsdoc returns', async () => {
    equal(
      await processJSDoc(`
/**
 * @function
 * @param {number} x
 */
async function xx(x){
}
      `),
      `
/**
 * @function
 * @param {number} x
 */
async function xx(x){
}
      `,
    )
  })
})

/* global describe, before, after, it */
