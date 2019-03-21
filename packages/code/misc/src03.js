/**
 * Global keys
 * @enum {string} GlobalKeys
 */
'use strict'

const { a, b, n, ...rest } = { a: 1, b: 5, n: 3 }
const { j, z } = {}

module.exports = Object.freeze(
  /** @lends GlobalKeys */
  {
    /** Key of app */
    APP: 'app',
    /** Key of app handle */
    HANDLE: 'app.handle',
    /** Key of app props */
    PROPS: 'app.props',

    /** Key of app stage */
    STAGE: 'app.stage',
    /** Key of app store */
    STORE: 'app.store',

    //hoger
    a: 1,

    // -----------------------------------
    // hoge
    // -----------------------------------
    j: () => ({ n: 1 }),

    n: 8,

    p: 12,
    z: 2,

    ...{ a: 1 },
  },
)
