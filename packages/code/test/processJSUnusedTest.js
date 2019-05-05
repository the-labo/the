/**
 * Test for processJSUnused.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processJSUnused = require('../lib/processors/processJSUnused')

describe('process-j-s-unused', () => {
  before(() => {})

  after(() => {})

  it('Remove unused declare', async () => {
    equal(
      await processJSUnused(
        `
const {a, b, 'e-e': ee, f} = { a:1, b:2, 'e-e':8, f:9 }
const c = 1
const c2 = 2, c3 = 'x', c4 = {}, c6 = null
const c5 = null
const d = 2
let j
let k
let n = 'j', n2 = 3, n4 = {}
let i = describe()
const i2 = 1 + 2 + j
const z = {kk:k}
console.log(a, d, n2, n4, ee)
      `.trim(),
      ),
      `
const {a, b, 'e-e': ee, f} = { a:1, b:2, 'e-e':8, f:9 }
const c4 = {}
const d = 2
let j
let k
let n2 = 3, n4 = {}
let i = describe()
const i2 = 1 + 2 + j
const z = {kk:k}
console.log(a, d, n2, n4, ee)
      `.trim(),
    )
  })

  it('Not removed used as component', async () => {
    equal(
      await processJSUnused(`
export default function HOC(Component) {
  return <Component foo="bar"/>
}
      `),
      `
export default function HOC(Component) {
  return <Component foo="bar"/>
}
      `,
    )
  })

  it('Remove unused import', async () => {
    equal(
      await processJSUnused(
        `
import a1 from 'aa'      
import a0 from 'aa0'      
import A2 from 'aa2'      
import A3, {x as jjj, y, z as zzzz} from 'aa3'      
import A4, {nn} from 'aa4'      
import {b1, B2} from 'bb'
import 'z'      
import c1, {d1, d2, d3, d4 as ddd} from 'c-and-d'
console.log(c1, d2, y, A4, zzzz)


const Z = () => {
  return <B2>{a1}</B2>
}
const Z2 = () => <A2 />
console.log(Z, Z2)  
      `.trim(),
      ),
      `
import a1 from 'aa'            
import A2 from 'aa2'      
import {y, z as zzzz} from 'aa3'      
import A4 from 'aa4'      
import {B2} from 'bb'
import 'z'      
import c1, {d2, } from 'c-and-d'
console.log(c1, d2, y, A4, zzzz)


const Z = () => {
  return <B2>{a1}</B2>
}
const Z2 = () => <A2 />
console.log(Z, Z2)
`.trim(),
    )
  })

  it('async with class property', async () => {
    equal(
      await processJSUnused(
        `
import React from 'react'
import context from '../../context'

class X extends React.Component {
  #stateful = context.stateful()
  render () {
    return this.#stateful(() => (
      <div>hoge</div>
    ))
  }
}
`.trim(),
      ),
      `
import React from 'react'
import context from '../../context'

class X extends React.Component {
  #stateful = context.stateful()
  render () {
    return this.#stateful(() => (
      <div>hoge</div>
    ))
  }
}
`.trim(),
    )
  })

  it('Keep react', async () => {
    equal(
      await processJSUnused(
        `
import React from 'react'
import React2 from 'react'

export default () => <div></div>
`.trim(),
      ),
      `
import React from 'react'

export default () => <div></div>
`.trim(),
    )
  })

  it('remove empty object pattern', async () => {
    equal(
      await processJSUnused(
        `
const {} = options, a = 1, b = 2
const {} = this.props
console.log(a)
const {} = fire()
const {} = hoge()
const {} = require("j")
      `.trim(),
      ),
      `
const a = 1
console.log(a)
const {} = fire()
const {} = hoge()
      `.trim(),
    )
  })

  it('remove unused require', async () => {
    equal(
      await processJSUnused(`
const x = require('x')
const x2 = require('x2')
require('x3')
console.log(x2)
`),
      `
const x2 = require('x2')
require('x3')
console.log(x2)
`,
    )
  })

  it('Used in decorator', async () => {
    equal(
      await processJSUnused(`
const X = require('X')
const Y = require('Y')

@X
class XX {}
`),
      `
const X = require('X')

@X
class XX {}
`,
    )
  })

  it('Import and export', async () => {
    equal(
      await processJSUnused(`
import Html from './Html'
import Hoge from './Hoge'
import Gaga from './Gaga'

export default Hoge
export { Html }
      `),
      `
import Html from './Html'
import Hoge from './Hoge'

export default Hoge
export { Html }
      `,
    )
  })

  //   it('Dynamic import', async () => {
  //     console.log(
  //       await processJSUnused(`
  // (async () => {
  //   const { default: client } = await import('../client')
  //   const { default: handle } = await import('../handle')
  //
  //   console.log(client)
  // })()
  //     `)
  //     )
  //   })

  it('As super class', async () => {
    equal(
      await processJSUnused(`
const A = require('A')
const B = require('B')
const C = require('C')
class A2 extends A{
  static B = B
}
      `),
      `
const A = require('A')
const B = require('B')
class A2 extends A{
  static B = B
}
      `,
    )
  })

  it('Nested destructing', async () => {
    equal(
      await processJSUnused(`
const {
  a,
  a: {
    b: {c, d},
    e,
    f,
  }
} = require('hoge')
console.log(a,c,f)
    `),
      `
const {
  a,
  a: {
    b: {c,},f,
  }
} = require('hoge')
console.log(a,c,f)
    `,
    )
  })

  it('destructing alias', async () => {
    equal(
      await processJSUnused(`
const {x: XX, y: YY} = options
console.log(XX)
      `),
      `
const {x: XX,} = options
console.log(XX)
      `,
    )
  })

  it('Top level ', async () => {
    equal(
      await processJSUnused(`
const SECRET_MASTER_PASSWORD = "x"
const SECRET_MASTER_PASSWORD2 = "x2"
const secret = theSecret(\`\${__dirname}\`, SECRET_MASTER_PASSWORD)
      `),
      `
const SECRET_MASTER_PASSWORD = "x"
const secret = theSecret(\`\${__dirname}\`, SECRET_MASTER_PASSWORD)
      `,
    )
  })

  it('Using new', async () => {
    equal(
      await processJSUnused(`
import X from 'X'

const x = new X()
      `),
      `
import X from 'X'

const x = new X()
      `,
    )
  })

  it('destructing wIth defaults', async () => {
    equal(
      await processJSUnused(`
const { a = 1, b = 2, c, d} = options
console.log(a, c)
      `),
      `
const { a = 1,c,} = options
console.log(a, c)
      `,
    )
  })

  it('Remove empty destructuring in arrow func', async () => {
    equal(
      await processJSUnused(`
const a = ({}) => console.log('x')
const b = ({}, hoge) => console.log('x')
const c = ({z}) => console.log('x', z)
const d = ({z}) => console.log('x')
console.log(a, b, c, d)
      `),
      `
const a = () => console.log('x')
const b = () => console.log('x')
const c = ({z}) => console.log('x', z)
const d = () => console.log('x')
console.log(a, b, c, d)
      `,
    )
  })

  it('Remove empty destructuring in func', async () => {
    equal(
      await processJSUnused(`
const a = function () { return console.log('x') }
const b = function ({}, hoge) { return console.log('x') }
const c = function ({z}) { return console.log('x', z) }
const d = function ({z}) { return console.log('x') }
      `),
      `
const a = function () { return console.log('x') }
const b = function () { return console.log('x') }
const c = function ({z}) { return console.log('x', z) }
const d = function () { return console.log('x') }
      `,
    )
  })

  it('Remove empty destructuring in func declare', async () => {
    equal(
      await processJSUnused(`
function a () { return console.log('x') }
function b ({}, hoge) { return console.log('x') }
function c ({z}) { return console.log('x', z) }
function d ({z}) { return console.log('x') }
      `),
      `
function a () { return console.log('x') }
function b () { return console.log('x') }
function c ({z}) { return console.log('x', z) }
function d () { return console.log('x') }
      `,
    )
  })

  it('in other scope', async () => {
    equal(
      await processJSUnused(`
const a = ({ x, y }) => console.log(x)
const b = ({ x, y }) => console.log(y)
console.log(a,b)
      `),
      `
const a = ({ x,}) => console.log(x)
const b = ({ y }) => console.log(y)
console.log(a,b)
      `,
    )
  })

  it('Object methods', async () => {
    equal(
      await processJSUnused(`
const x = {
  a({ x, y }) { console.log(x) },
  b({ x, y }) { console.log(y) },
  c: ({ x, y }) => { console.log(y) },
}
      `),
      `
const x = {
  a({ x,}) { console.log(x) },
  b({ y }) { console.log(y) },
  c: ({ y }) => { console.log(y) },
}
      `,
    )
  })

  it('Process js unused', async () => {
    equal(
      await processJSUnused(`
const a = ( x ,  y, z,) => { console.log(x) } 
      `),
      `
const a = ( x) => { console.log(x) } 
      `,
    )
  })

  it('With destructing alias', async () => {
    equal(
      await processJSUnused(`
  function a({ x: XX = null, y: YY, z: ZZ }) {
    console.log(XX, ZZ)
  }
      `),
      `
  function a({ x: XX = null,z: ZZ }) {
    console.log(XX, ZZ)
  }
      `,
    )
  })

  it('cleanup object pattern', async () => {
    equal(
      await processJSUnused(`const b = ({x,y})=>console.log(y)`),
      `const b = ({y})=>console.log(y)`,
    )
  })

  it('Cleanup function args', async () => {
    equal(
      await processJSUnused(`
const a = ([x,y]) => console.log(y) 
const b = ({ x, y}) => console.log(y) 
const c = (x,y) => console.log(y) 
    `),
      `
const a = ([,y]) => console.log(y) 
const b = ({ y}) => console.log(y) 
const c = (x,y) => console.log(y) 
    `,
    )
  })

  it('process unused array pattern', async () => {
    equal(
      await processJSUnused(`
const [a,b,c,d,...e] = [1,2,3,4]
console.log(b,c,e)
      `),
      `
const [,b,c,,...e] = [1,2,3,4]
console.log(b,c,e)
      `,
    )
  })

  it('process unused rest element pattern', async () => {
    equal(
      await processJSUnused(`
const [a,b,c,d,...e] = [1,2,3,4]
console.log(b,c)
      `),
      `
const [,b,c,,] = [1,2,3,4]
console.log(b,c)
      `,
    )
  })

  it('Remove empty array pattern', async () => {
    equal(
      await processJSUnused(`
const a = ([]) => console.log('b')
const b = ([,y]) => console.log('b', y)
      `),
      `
const a = () => console.log('b')
const b = ([,y]) => console.log('b', y)
      `,
    )
  })

  it('Empty nested object pattern', async () => {
    equal(
      await processJSUnused(`
const {a: {}, a, b, c: {x}, d: {y = 2, yy = 4 }} = options
console.log(a, b, x, y)
      `),
      `
const {a, b, c: {x}, d: {y = 2,}} = options
console.log(a, b, x, y)
      `,
    )
  })

  it('In nested jsx function', async () => {
    equal(
      await processJSUnused(`
class X {
  render () {
    return this.#stateful(({a, b}) => {
      return (
        <Y renderItem={() => {
           return <Z a={a}/>            
        }}/>
      )
    })
  }
}
`),
      `
class X {
  render () {
    return this.#stateful(({a,}) => {
      return (
        <Y renderItem={() => {
           return <Z a={a}/>            
        }}/>
      )
    })
  }
}
`,
    )
  })

  it('Process unused array pattern on loop', async () => {
    equal(
      await processJSUnused(`
class X {
  a () {
    for (const [name, scene] of scenes) {
      scene.init()
    }
  }
  b () {
    for (const [name, scene] of scenes) {
      scene.init()
    }
  }
}`),
      `
class X {
  a () {
    for (const [, scene] of scenes) {
      scene.init()
    }
  }
  b () {
    for (const [, scene] of scenes) {
      scene.init()
    }
  }
}`,
    )
  })
})

/* global describe, before, after, it */
