const src02 = require('../tmp/src02')

const p1 = 'P1'
let d = {
  b: 2,
  a: 1,


  c: {
    'p2': 'This is p2',
    [p1]: 'This is p1',
    z: {
      dd: 1, jj: 234, aaa: 8777
    },

    ['p3']: `This is ${Object.keys({f5: 5, f2: 2}).join(',')}p3`,
    ...{b: 1},

    notDoSomething () {},

    // HOGE HOGE
    x: {
      get ao () {},
      oooo () {},
      c: 1,
      d: 2,
      /* hogehoge */
      hogehoge: 1234,
    },

    ...{a: 1},
    ...{c: 2},

    doSomething () {

    },
  }
}

