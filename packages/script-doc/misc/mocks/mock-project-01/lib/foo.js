/** @module mock-project-01 */
/**
 * @memberof module:mock-project-01
 * @function foo
 * @param {string} a1 - Argument 01
 */
'use strict'

/** @lends foo */
async function foo() {}

/** This is hoge */
class Hoge {
  /** @param {string} msg */
  say(msg) {}
}

foo.Hoge = Hoge

/** @module hoge2 */
