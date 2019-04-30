/**
 * Test for processJSDoc.
 * Runs with mocha.
 */
"use strict";

const processJSDoc = require("../lib/processors/processJSDoc");
const {equal} = require('assert').strict

describe("process-js-doc", () => {
  before(() => {});

  after(() => {});

  it("Do test", async () => {
    equal(
      await processJSDoc(`
      /**
       * @param {boolean} a
       * @function hoge
       * @example
       *  hoge (){}
       */
      module.exports = function hoge(){}
    `), `
      /**
       * @function hoge
       * @param {boolean} a
       * @example
       *  hoge (){}
       */
      module.exports = function hoge(){}
    `);
  });

  it('test02', async () => {
    equal(
      await processJSDoc(`
/**
 * @param {Object} [config={}] - Code config
 * @class TheCode
 * @memberof module:@the-/code
 */
'use strict'
`), `
/**
 * @class TheCode
 * @memberof module:@the-/code
 * @param {Object} [config={}] - Code config
 */
'use strict'
`)
  })
});

/* global describe, before, after, it */
