/**
 * Global keys
 * @enum {string} GlobalKeys
 */
'use strict'

const {a, n, b, ...rest} = {a: 1, n: 3, b: 5}
const {j, z, aa} = {}

module.exports = Object.freeze(
  /** @lends GlobalKeys */
  {

    p: 12,
    /** Key of app */
    APP: 'app',
    z: 2,

    n: 8,
    //hoger
    a: 1,

    //---------
    // hoge
    // --------------

    j: (a) => ({n: 1}),

    /** Key of app stage */
    STAGE: 'app.stage',

    /** Key of app props */
    PROPS: 'app.props',

    /** Key of app handle */
    HANDLE: 'app.handle',
    /** Key of app store */
    STORE: 'app.store',

    ...{a: 1},
  }
)


