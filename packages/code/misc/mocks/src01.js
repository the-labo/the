'use strict'

const p1 = 'P1'
const d = {
  a: 1,
  b: 2,

  c: {
    ['p3']: `This is ${Object.keys({ f2: 2, f5: 5 }).join(',')}p3`,
    [p1]: 'This is p1',
    p2: 'This is p2',

    z: {
      aaa: 8777,
      dd: 1,
      jj: 234,
    },
    ...{ b: 1 },

    notDoSomething() {},

    // HOGE HOGE
    x: {
      get ao() {},
      c: 1,
      d: 2,
      /* hogehoge */
      hogehoge: 1234,
      oooo() {},
    },

    ...{ a: 1 },
    ...{ c: 2 },

    doSomething() {},
  },
}
