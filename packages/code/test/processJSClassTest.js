/**
 * Test for processJSClass.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert').strict
const processJSClass = require('../lib/processors/processJSClass')

describe('process-class', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSClass(`
    class foo {
     j () {}
     z () {}
     /** This is a */
     a () {}
     _j () {}
     XX () {}
     async k () {}
     constructor () {}
     static hoge () {}
     get nn () { return 'nn' }
     // This is nnn 
     static get nnn () { return 'nnn' } 
    }
    `),
      `
    class foo {
     // This is nnn 
     static get nnn () { return 'nnn' }
     static hoge () {}
     constructor () {}
     XX () {}
     get nn () { return 'nn' }
     /** This is a */
     a () {}
     j () {}
     z () {}
     async k () {}
     _j () {} 
    }
    `,
    )
  })

  it('Class as arg', async () => {
    equal(
      await processJSClass(`
      wrap(class A {
        z() {}
        n() {}
      })
      `),
      `
      wrap(class A {
        n() {}
        z() {}
      })
      `,
    )
  })

  it('Class get/set', async () => {
    ok(
      await processJSClass(`
class Rect extends Struct {
  constructor (x, y, width, height) {
    super()
    this.set({ height, width, x, y })
  }

  set bottom (bottom) {
    this.y = bottom - this.height
  }

  get bottom () {
    return this.y + this.height
  }

  set left (left) {
    this.x = left
  }

  get left () {
    return this.x
  }

  set right (right) {
    this.x = right - this.width
  }

  get right () {
    return this.x + this.width
  }

  get top () {
    return this.y
  }

  set top (top) {
    this.y = top
  }

  clone () {
    const { height, width, x, y } = this
    return new this.constructor(x, y, width, height)
  }

  contains (point) {
  }
}
      `),
    )
  })

  it('Dynamic method name', async () => {
    equal(
      await processJSClass(`
      const methodNames = {m1: 'nameOfM', m2: 'nameOfM2'}
      class X { 
        async * [methodNames.m2] () {return 'hoge'} 
        async * [methodNames.m1] () {return 'hoge2'} 
      }
      `),
      `
      const methodNames = {m1: 'nameOfM', m2: 'nameOfM2'}
      class X { 
        async * [methodNames.m1] () {return 'hoge2'} 
        async * [methodNames.m2] () {return 'hoge'} 
      }
      `,
    )
  })

  it('Sort methods with comments', async () => {
    equal(
      await processJSClass(`
        class X {
          /** This is b */
          b () {}
          /** This is a */
          a () {}
        }
      `),
      `
        class X {
          /** This is a */
          a () {}
          /** This is b */
          b () {}
        }
      `,
    )
  })

  it('Using private func', async () => {
    equal(
      await processJSClass(`
        class X {
          z () {}
          #e () {}
          static n () {}
          #b () {}
          a () {}
          static #f () {}
        }
      `),
      `
        class X {
          static #f () {}
          static n () {}
          #b () {}
          #e () {}
          a () {}
          z () {}
        }
      `,
    )
  })

  it('Sort class properties', async () => {
    equal(
      await processJSClass(`
        class X {
          g = () => console.log('this is B')
          y () {}
          get j () {}
          e () {} 
          a = () => console.log('this is A')
          static z = 'Z'
        }
      `),
      `
        class X {
          static z = 'Z'
          a = () => console.log('this is A')
          g = () => console.log('this is B')
          get j () {} 
          e () {}
          y () {}
        }
      `,
    )
  })
})

/* global describe, before, after, it */
