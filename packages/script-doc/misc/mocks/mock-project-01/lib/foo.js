/** @module mock-project-01 */
'use strict'

/**
 * @memberof module:mock-project-01
 * @function foo
 * @param {string} a1 - Argument 01
 */
async function foo() {}

/**
 * This is hoge
 * @memberof module:mock-project-01
 */
class Hoge {
  /** @param {string} msg */
  say(msg) {}
}

foo.Hoge = Hoge

/** @module hoge2 */
